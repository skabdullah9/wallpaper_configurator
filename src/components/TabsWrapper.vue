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
            </ul>
        </div>
        <canvas height="500"></canvas>
        <slot />
    </div>
</template>

<script>
import { ref, provide, onMounted, watch } from "vue";

export default {
    props: ["dimensions"],
    setup(props, { slots }) {
        const tabTitles = ref(slots.default().map((tab) => tab.props.title));
        const activeTab = ref(tabTitles.value[0]);
        provide("activeTab", activeTab);
        let canvas;
        let c;

        onMounted(() => {
            canvas = document.querySelector("canvas");
            c = canvas.getContext("2d");
            canvas.width = Math.floor((props.dimensions.wall_width * 38) / 10) / 2
            canvas.height = Math.floor((props.dimensions.wall_height * 38) / 10) / 2
        });
        watch(props, () => {
            if (props.dimensions.image_url) {
                let img = new Image();
                img.onload = function () {
                    if (props.dimensions.wallpaper_type === "photo") {
                        c.clearRect(0, 0, canvas.width, canvas.height);
                        c.drawImage(img, 0, 0, canvas.width, canvas.height);
                    } else if (props.dimensions.wallpaper_type === "pattern") {
                        c.clearRect(0, 0, canvas.width, canvas.height);
                        let pattern = c.createPattern(img, "repeat");

                        c.fillStyle = pattern;
                        c.fillRect(0, 0, 50,50);
                        c.fillRect(0, 0, 50,50);
                    }
                };
                img.src = props.dimensions.image_url;
            }

                canvas.width = Math.floor((props.dimensions.wall_width * 38) / 10) / 2
                canvas.height = Math.floor((props.dimensions.wall_height * 38) / 10) / 2

        });
        return { tabTitles, activeTab };
    },
};
</script>

<style>
.tabs__header {
    display: flex;
    list-style-type: none;
}
.tabs__header li {
    padding: 0.5rem 2rem;
    background-color: white;
    color: black;
    margin: 2rem 0.2rem;
    cursor: pointer;
}

.tabs__header li.active {
    background-color: #3d8bb9;
    color: white;
}
canvas {
    border: 1px solid white;
    aspect-ratio: auto 1120 / 469;
    margin: 2rem auto;
    display: block;
    background-color: #ccc;
}
</style>
