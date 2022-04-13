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
    <div class="canvas-container">
      <div>
        <canvas class="outer" height="500" width="660"></canvas>
        <canvas class="main" height="500" width="660"></canvas>
        <canvas class="second" height="500" style="display: none"></canvas>
      </div>

      <img src="../assets/lady.svg" alt="" />
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
    let canvas;
    let c;
    let outerCanvas;
    let outerC;
    let wallpaperCopy = new Image();
    const renderStripLabels = (canvas, c) => {
      let offset = canvas.width / total.strips_used;
      c.fillStyle = "white";
      c.fillRect(0, 0, canvas.width, 20);
      for (let i = 1; i <= total.strips_used; i++) {
        c.strokeStyle = "black";
        c.fillStyle = "black";
        c.setLineDash([5, 3]);
        c.beginPath(); // Start a new path
        c.moveTo(offset, 0); // Move the pen to (30, 50)
        c.lineTo(offset, canvas.height); // Draw a line to (150, 100)
        c.stroke();

        c.strokeStyle = "white";
        c.setLineDash([3, 5]);
        c.beginPath(); // Start a new path
        c.moveTo(offset, 0); // Move the pen to (30, 50)
        c.lineTo(offset, canvas.height); // Draw a line to (150, 100)
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
      canvas.width = Math.floor((wall_dimensions.wall_width * 38) / 10) / 2;
      canvas.height = Math.floor((wall_dimensions.wall_height * 38) / 10) / 2;
      outerCanvas.width = canvas.width;
      outerCanvas.height = canvas.height + 20;
      renderStripLabels(outerCanvas, outerC);
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
          document.body.appendChild(wallpaperCopy);
        };
        img.src = wall_dimensions.image_url;
      }

      canvas.width = Math.floor((wall_dimensions.wall_width * 38) / 10) / 2;
      canvas.height = Math.floor((wall_dimensions.wall_height * 38) / 10) / 2;
      outerCanvas.width = canvas.width;
      outerCanvas.height = canvas.height + 20;
      renderStripLabels(outerCanvas, outerC);
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
  display: block;
  background-color: #ccc;
}
.canvas-container > div {
  position: relative;
  background-color: rgba(255, 255, 255, 0.4);
}
canvas.outer {
  position: absolute;
  bottom: 0rem;
  left: 0;
  z-index: 99;
  background-color: transparent;
}

.canvas-container {
  display: flex;
  align-items: end;
  justify-content: center;
  margin: 2rem 0;
}
.canvas-container img {
  height: 350px;
  position: relative;
  bottom: 0.5rem;
  left: 0rem;
  -webkit-filter: drop-shadow(2px 2px 2px rgba(255, 255, 255, 0.4));
  filter: drop-shadow(3px 3px 3px rgba(255, 255, 255, 0.4))
    drop-shadow(-2px -2px 2px rgba(255, 255, 255, 0.4));
}
</style>
