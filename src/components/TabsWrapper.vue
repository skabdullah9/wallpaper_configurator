<template>
    <div>
        <div class="tabs">
            <ul class="tabs__header">
                <li
                    v-for="tab in tabTitles"
                    :key="tab"
                    @click="activeTab = tab"
                    :class="{ active: tab == activeTab }"
                >
                    {{ tab }}
                </li>
                <button
                    id="add_cart_btn_sm"
                    class="add_cart_btn_sm"
                    :class="{ active: wall_dimensions.image_url }"
                >
                    Add to cart
                </button>
            </ul>
        </div>
        <div class="canvas-container mx-auto">
            <div>
                <canvas class="outer" height="500" width="660"></canvas>
                <canvas class="main" height="500" width="660"></canvas>
                <canvas
                    class="second"
                    height="500"
                    style="display: none"
                ></canvas>
            </div>

            <img class="lady-png" src="../assets/lady.svg" alt="" />
        </div>

        <slot />
    </div>
</template>

<script>
import { ref, provide, onMounted, watch, inject } from "vue";

export default {
    setup(props, { slots }) {
        const tabTitles = ref(slots.default().map((tab) => tab.props.title));
        const activeTab = ref(tabTitles.value[0]);
        provide("activeTab", activeTab);
        const { wall_dimensions, pattern_config, total } = inject("store");
        let cmToPx = (dimensions = 70) => Math.floor((dimensions * 38) / 9) / 2;
        let canvas;
        let c;
        let outerCanvas;
        let outerC;
        let img;
        let wallpaperCopy = new Image();
        let wallpaperOffsetX = ref(0);
        let wallpaperOffsetY = ref(0);

        const renderCanvas = () => {
            canvas.width = cmToPx(wall_dimensions.wall_width);
            canvas.height = cmToPx(wall_dimensions.wall_height);

            outerCanvas.width = total.strips_used * cmToPx();
            outerCanvas.height = canvas.height + 10;

            const container = document.querySelector(".canvas-container");
            const canvasContainer = document.querySelector(
                ".canvas-container > div"
            );
            const ladyPNG = document.querySelector(".lady-png");

            container.style.width = outerCanvas.width + "px";
            container.style.height = outerCanvas.height + "px";
            if (wall_dimensions.wall_width > 500) {
                container.style.marginLeft = -total.strips_used * 1.5 + "%";
            } else {
                container.style.marginLeft = "22%";
            }

            let relativeLeft =
                canvasContainer.getBoundingClientRect().left -
                container.getBoundingClientRect().left;
            ladyPNG.style.left = canvas.width + relativeLeft + "px";

            renderStripLabels(outerCanvas, outerC);

            c.fillStyle = "#DEDEDE";
            c.fillRect(0, 0, canvas.width, canvas.height);
            c.lineWidth = "2";
            c.strokeStyle = "black";
            c.strokeRect(0, 20, canvas.width, canvas.height - 20);
        };
        const drawWallpaper = () => {
            const wallpaperWidth =
                img.width >= canvas.width ? img.width : canvas.width;
            const wallpaperHeight =
                img.height >= canvas.height ? img.height : canvas.height;
            const maxMoveX = Math.abs(wallpaperWidth - canvas.width);
            const maxMoveY = Math.abs(wallpaperHeight - canvas.height);

            if (wallpaperOffsetX.value < 0) wallpaperOffsetX.value = 1;
            if (wallpaperOffsetY.value < 0) wallpaperOffsetY.value = 1;
            if (wallpaperOffsetX.value >= maxMoveX) {
                wallpaperOffsetX.value = maxMoveX;
            }
            if (wallpaperOffsetY.value >= maxMoveY) {
                wallpaperOffsetY.value = maxMoveY;
            }
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.drawImage(
                img,
                wallpaperOffsetX.value,
                wallpaperOffsetY.value,
                wallpaperWidth,
                wallpaperHeight,
                0,
                0,
                wallpaperWidth,
                wallpaperHeight
            );
        };
        const renderWallpaper = () => {
            if (wallpaperOffsetX.value < 0) wallpaperOffsetX.value = 0;
            else if (wall_dimensions.image_url) {
                img = new Image();
                img.classList.add("wallpaper-canvas");

                img.onload = function () {
                    if (wall_dimensions.wallpaper_type === "photo") {
                        requestAnimationFrame(drawWallpaper);
                    } else if (wall_dimensions.wallpaper_type === "pattern") {
                        c.clearRect(0, 0, canvas.width, canvas.height);

                        const secondCanvas =
                            document.querySelector("canvas.second");
                        const secondC = secondCanvas.getContext("2d");
                        // draw img on secondC and resize it to 30px

                        const adjustedPatternWidth = Math.floor(
                            (pattern_config.pattern_repeat_width /
                                wall_dimensions.wall_width) *
                                canvas.width
                        );
                        secondCanvas.width = adjustedPatternWidth;
                        secondCanvas.height = Math.floor(
                            (adjustedPatternWidth / img.width) * img.height
                        );

                        secondC.drawImage(
                            img,
                            0,
                            0,
                            secondCanvas.width,
                            secondCanvas.height
                        );

                        let pattern = c.createPattern(secondCanvas, "repeat");
                        c.fillStyle = pattern;

                        c.translate(
                            pattern_config.horizontal_offset_pct * 2,
                            pattern_config.vertical_offset_pct * 2
                        );
                        c.fillRect(
                            -canvas.width,
                            -canvas.height,
                            canvas.width * 3,
                            canvas.height * 3
                        );
                    }
                    wallpaperCopy.src = canvas.toDataURL("image/jpeg");
                    wallpaperCopy.classList.add("wallpaper-copy", "mt-10");
                    if (!document.querySelector(".wallpaper-copy")) {
                        // document
                        //     .querySelector(".container")
                        //     .appendChild(wallpaperCopy);
                    }
                };
                img.src = wall_dimensions.image_url;
            }

            renderCanvas();
        };
        const renderStripLabels = (canvas, c) => {
            let offset = canvas.width / total.strips_used;
            c.fillStyle = "white";
            c.fillRect(0, 0, canvas.width, 20);

            c.strokeStyle = "#575651";
            c.beginPath(); // Start a new path
            c.moveTo(0, 20);
            c.lineTo(canvas.width, 20); // Draw a line to
            c.stroke();

            c.beginPath(); // Start a new path
            c.moveTo(0, canvas.height - 10);
            c.lineTo(canvas.width, canvas.height - 10); // Draw a line to
            c.stroke();

            for (let i = 1; i <= total.strips_used; i++) {
                c.strokeStyle = "black";
                c.fillStyle = "black";
                c.setLineDash([5, 3]);
                c.beginPath(); // Start a new path
                c.moveTo(offset, 0); // Move the pen
                c.lineTo(offset, canvas.height); // Draw a line to
                c.stroke();

                c.strokeStyle = "white";
                c.setLineDash([3, 5]);
                c.beginPath(); // Start a new path
                c.moveTo(offset, 0); // Move the pen
                c.lineTo(offset, canvas.height); // Draw a line to
                c.stroke();

                c.fillStyle = "black";
                c.font = "12px serif";
                c.textAlign = "center";
                c.fillText(
                    "Strip " + i,
                    offset - +(canvas.width / total.strips_used).toFixed(0) / 2,
                    15
                );
                offset += +(canvas.width / total.strips_used).toFixed(0);
            }
        };
        onMounted(() => {
            canvas = document.querySelector("canvas.main");
            c = canvas.getContext("2d");
            outerCanvas = document.querySelector("canvas.outer");
            outerC = outerCanvas.getContext("2d");
            renderCanvas();
            const dragable = ref(false);
            const startX = ref(0);
            const startY = ref(0);

            outerCanvas.addEventListener("mousedown", (e) => {
                startX.value = e.offsetX;
                startY.value = e.offsetY;
                dragable.value = true;
            });
            outerCanvas.addEventListener("mousemove", (e) => {
                if (!dragable.value) return;

                if (wallpaperOffsetX.value < 0) return;
                if (wallpaperOffsetY.value < 0) return;
                if (startX.value > e.offsetX) {
                    const currentX = startX.value - e.offsetX;
                    wallpaperOffsetX.value += currentX;
                }
                if (startY.value > e.offsetY) {
                    const currentY = startY.value - e.offsetY;
                    wallpaperOffsetY.value += currentY;
                }
                if (startX.value <= e.offsetX) {
                    const currentX = e.offsetX - startX.value;
                    wallpaperOffsetX.value -= currentX;
                }
                if (startY.value <= e.offsetY) {
                    const currentY = e.offsetY - startY.value;
                    wallpaperOffsetY.value -= currentY;
                }
                startX.value = e.offsetX;
                startY.value = e.offsetY;
            });
            outerCanvas.addEventListener("mouseup", () => {
                dragable.value = false;
            });
            outerCanvas.addEventListener("mouseout", () => {
                dragable.value = false;
            });
            renderWallpaper();
        });

        watch([wall_dimensions, pattern_config], renderWallpaper);
        watch([wallpaperOffsetX, wallpaperOffsetY], drawWallpaper);
        return { tabTitles, activeTab, wall_dimensions };
    },
};
</script>

<style>
.tabs__header {
    display: flex;
    list-style-type: none;
    margin-bottom: 4rem;
}
.tabs__header li,
#add_cart_btn_sm {
    padding: 0.5rem 2rem;
    background-color: white;
    color: black;
    margin: 2rem 0.2rem;
    cursor: pointer;
}
.add_cart_btn_sm {
    border: none;
    outline: none;
    padding: 0.5rem 3rem;
    font-size: 1rem;
    font-family: "Karla", sans-serif;
}
.tabs__header li.active {
    background-color: #3d8bb9;
    color: white;
}
.add_cart_btn_sm.active {
    background-color: #ef233c;
    cursor: pointer;
    color: #fff;
}
canvas {
    display: block;
    background-color: transparent;
}

.canvas-container > div {
    position: relative;
    background-color: white;
    overflow: visible;
    width: 100%;
    height: 100%;
}
canvas.outer {
    position: absolute;
    bottom: 0rem;
    left: 0;
    z-index: 99;
    background-color: transparent;
    border: 1px solid white;
}

.canvas-container {
    display: flex;
    align-items: end;
    justify-content: center;
    margin: 2rem auto;
    /* margin-left: -10%; */
    position: relative;
    overflow: visible;
}

.canvas-container img {
    height: 350px;
    position: absolute;
    bottom: 0.7rem;
    left: 0.5rem;
    /* transform: translateX(140%); */
    -webkit-filter: drop-shadow(2px 2px 2px rgba(255, 255, 255, 0.4));
    filter: drop-shadow(3px 3px 3px rgba(255, 255, 255, 0.4))
        drop-shadow(-2px -2px 2px rgba(255, 255, 255, 0.4));
}
</style>
