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
                    class="add_cart_btn_sm"
                    :class="{ active: wall_dimensions.image_url }"
                >
                    Add to cart
                </button>
            </ul>
        </div>
        <canvas class="main" height="500"></canvas>
        <canvas class="second" height="500" style="display: none;"></canvas>
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
        const { wall_dimensions, pattern_config } = inject("store");
        let canvas;
        let c;

        onMounted(() => {
            canvas = document.querySelector("canvas.main");
            c = canvas.getContext("2d");
            canvas.width =
                Math.floor((wall_dimensions.wall_width * 38) / 10) / 2;
            canvas.height =
                Math.floor((wall_dimensions.wall_height * 38) / 10) / 2;
        });

        watch([wall_dimensions, pattern_config], () => {
          if (wall_dimensions.image_url) {
            let img = new Image();
            img.onload = function () {
              if (wall_dimensions.wallpaper_type === "photo") {
                c.clearRect(0, 0, canvas.width, canvas.height);
                c.drawImage(img, 0, 0, canvas.width, canvas.height);
              } else if (wall_dimensions.wallpaper_type === "pattern") {
                c.clearRect(0, 0, canvas.width, canvas.height);

                const secondCanvas = document.querySelector("canvas.second");
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
                c.fillRect(0, 0, canvas.width, canvas.height);
              }
            };
            img.src = wall_dimensions.image_url;
          }

          canvas.width = Math.floor((wall_dimensions.wall_width * 38) / 10) / 2;
          canvas.height = Math.floor((wall_dimensions.wall_height * 38) / 10) / 2;
        }); 
        return { tabTitles, activeTab, wall_dimensions };
    },
};
</script>

<style>
.tabs__header {
    display: flex;
    list-style-type: none;
}
.tabs__header li,
.add_cart_btn_sm {
    padding: 0.5rem 2rem;
    background-color: white;
    color: black;
    margin: 2rem 0.2rem;
    cursor: pointer;
}
.add_cart_btn_sm {
    border: none;
    outline: none;
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
    border: 1px solid white;
    aspect-ratio: auto 1120 / 469;
    margin: 2rem auto;
    display: block;
    background-color: #ccc;
}
</style>
