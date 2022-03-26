<template>
    <div class="container">
        <TabsWrapper :dimensions="wall_dimensions">
            <Tab title="1. Adjust wall size">
                <div class="flex">
                    <div class="wall_dimensions">
                        <div class="wall_width">
                            <small>Wall width:</small>
                            <div>
                                <button
                                    id="minus"
                                    @click="
                                        wall_dimensions.wall_width > 65 &&
                                            wall_dimensions.wall_width--
                                    "
                                >
                                    <img src="@/assets/minus.svg" alt="" />
                                </button>
                                <button
                                    id="minus_black"
                                    @click="
                                        wall_dimensions.wall_width > 65
                                            ? (wall_dimensions.wall_width -= 70)
                                            : ''
                                    "
                                >
                                    <img
                                        src="@/assets/minus_black.svg"
                                        alt=""
                                    />
                                </button>
                                <input
                                    type="text"
                                    id="wall_width"
                                    v-model="wall_dimensions.wall_width"
                                />
                                <button
                                    id="plus_black"
                                    @click="
                                        wall_dimensions.wall_width < 695
                                            ? (wall_dimensions.wall_width += 70)
                                            : ''
                                    "
                                >
                                    <img src="@/assets/plus_black.svg" alt="" />
                                </button>
                                <button
                                    id="plus"
                                    @click="
                                        wall_dimensions.wall_width < 695 &&
                                            wall_dimensions.wall_width++
                                    "
                                >
                                    <img src="@/assets/plus.svg" alt="" />
                                </button>
                            </div>
                        </div>
                        <div class="wall_height">
                            <small>Wall height:</small>
                            <div>
                                <button
                                    id="minus"
                                    @click="
                                        wall_dimensions.wall_height > 100 &&
                                            wall_dimensions.wall_height--
                                    "
                                >
                                    <img src="@/assets/minus.svg" alt="" />
                                </button>
                                <button
                                    id="minus_black"
                                    @click="
                                        wall_dimensions.wall_height > 100
                                            ? (wall_dimensions.wall_height -= 70)
                                            : ''
                                    "
                                >
                                    <img
                                        src="@/assets/minus_black.svg"
                                        alt=""
                                    />
                                </button>
                                <input
                                    type="text"
                                    id="wall_heigth"
                                    v-model="wall_dimensions.wall_height"
                                />
                                <button
                                    id="plus_black"
                                    @click="
                                        wall_dimensions.wall_height < 400
                                            ? (wall_dimensions.wall_height += 70)
                                            : ''
                                    "
                                >
                                    <img src="@/assets/plus_black.svg" alt="" />
                                </button>
                                <button
                                    id="plus"
                                    @click="
                                        wall_dimensions.wall_height < 400 &&
                                            wall_dimensions.wall_height++
                                    "
                                >
                                    <img src="@/assets/plus.svg" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="wallpaper_dimensions">
                        <p class="bold">Wallpaper dimensions:</p>
                        <p>
                            Total width: {{ wall_dimensions.wall_width }} cm ({{
                                Math.ceil(wall_dimensions.wall_width / 70)
                            }}
                            strips x 70cm)
                        </p>
                        <p>
                            Total height of each wallpaper strip:
                            {{ wall_dimensions.wall_height }} cm
                        </p>
                    </div>
                    <AddToCartBtn :total="total" />
                </div>
            </Tab>
            <Tab title="2. Choose design">
                <p>Choose one of the designs from our collections:</p>
                <select id="select_designer">
                    <option value="">By designer</option>
                    <option value="">undefined</option>
                </select>
                <select id="select_category">
                    <option value="">By category</option>
                    <option value="">undefined</option>
                </select>
                <div class="flex upload">
                    <div>
                        <label for="upload__image" id="upload__btn"
                            >Upload image</label
                        >
                        <input
                            type="file"
                            id="upload__image"
                            accept="image/*"
                            @change="getWallpaper"
                        />
                        <p>
                            Upload a custom photo or image and configure it via
                            the wallpaper configurator.
                        </p>
                        <p>Accepted file formats:JPG, PNG</p>
                    </div>
                    <div
                        class="image_info flex"
                        v-show="wall_dimensions.image_url"
                    >
                        <div class="image_preview">
                            <img
                                :src="wall_dimensions.image_url"
                                id="image_preview"
                                alt=""
                            />
                        </div>
                        <div>
                            <small
                                ><span>custom image:</span>
                                {{ image_desc.custom_image }}</small
                            >
                            <small
                                ><span>Price / m²:</span>
                                {{ constants.strip_cost }} €</small
                            >
                            <small
                                ><span>Image size: </span>
                                {{ image_desc.image_size }}</small
                            >
                            <small
                                ><span>Resolution: </span>
                                {{ image_desc.custom_image }}</small
                            >
                            <small
                                ><span>Quality: </span>
                                {{ image_desc.custom_image }}</small
                            >
                        </div>
                    </div>
                    <AddToCartBtn :total="total" />
                </div>
            </Tab>
            <Tab title="3. Adjust pattern repeat">
                <div class="flex adjust_pattern">
                    <div v-if="wall_dimensions.wallpaper_type === 'pattern'">
                        <small>Pattern repeat width:</small>
                        <div class="repeat_width">
                            <button
                                id="minus_black"
                                @click="pattern_config.pattern_repeat_width > 3.5 ? pattern_config.pattern_repeat_width -= 70 : ''"
                            >
                                <img src="@/assets/minus_black.svg" alt="" />
                            </button>
                            <input
                                type="text"
                                id="pattern_repeat_width"
                                v-model="pattern_config.pattern_repeat_width"
                            />
                            <button
                                id="plus_black"
                                @click="pattern_config.pattern_repeat_width < 210 ? pattern_config.pattern_repeat_width += 70 : ''"
                            >
                                <img src="@/assets/plus_black.svg" alt="" />
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <p>Photo wallpaper</p>
                        <p>
                            The selected photo expands over the whole wall
                            surface area. Please make sure the photo has a
                            sufficiently high resolution - see the "Quality"
                            Indicator under the "Choose Design" Tab.
                        </p>
                    </div>
                    <div
                        v-if="wall_dimensions.wallpaper_type === 'pattern'"
                        id="repeat_offset"
                        class="flex"
                    >
                        <div>
                            <small>Vertical Offset:</small>
                            <div>
                                <button
                                    id="minus_black"
                                    @click="pattern_config.vertical_offset_pct--"
                                >
                                    <img
                                        src="@/assets/minus_black.svg"
                                        alt=""
                                    />
                                </button>
                                <input
                                    type="text"
                                    id="vertical_offset"
                                    v-model="pattern_config.vertical_offset_pct"
                                />
                                <button
                                    id="plus_black"
                                    @click="pattern_config.vertical_offset_pct++"
                                >
                                    <img src="@/assets/plus_black.svg" alt="" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <small>Horizontal offset:</small>
                            <div>
                                <button
                                    id="minus_black"
                                    @click="pattern_config.horizontal_offset_pct--"
                                >
                                    <img
                                        src="@/assets/minus_black.svg"
                                        alt=""
                                    />
                                </button>
                                <input
                                    type="text"
                                    id="wall_width"
                                    v-model="pattern_config.horizontal_offset_pct"
                                />
                                <button
                                    id="plus_black"
                                    @click="pattern_config.horizontal_offset_pct++"
                                >
                                    <img src="@/assets/plus_black.svg" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>Adjust your image</p>
                        <p>
                            You can use the mouse (or touch if you're on tablet
                            / mobile) to scale and move the image on the wall.
                        </p>
                    </div>

                    <div>
                        <p>Change wallpaper type</p>
                        <select
                            id="select_wallpaper_type"
                            @change="setWallpaperType($event)"
                        >
                            <option value="photo">Photo wallpaper</option>
                            <option value="pattern">Pattern repeat</option>
                        </select>
                    </div>
                </div>
                <div class="flex">
                    <AddToCartBtn :total="total" style="margin-left: auto" />
                </div>
            </Tab>
            <Tab title="Add to cart">Hello from tab 4</Tab>
        </TabsWrapper>
    </div>
</template>

<script setup>
import TabsWrapper from "./components/TabsWrapper.vue";
import Tab from "./components/Tab.vue";
import AddToCartBtn from "./components/AddToCartBtn.vue";
import { reactive, computed } from "vue";

const wall_dimensions = reactive({
    wall_width: 275, // min 65
    wall_height: 240, // min 100
    image_url: null,
    wallpaper_type: "photo",
});
const constants = reactive({
    strip_width: 70,
    strip_height: 245,
    price_per_meter_sq: 23,
    strip_cost: 23,
});
const total = reactive({
    strips_used: 4,
    total_cost: computed(
        () =>
            ((wall_dimensions.wall_width * wall_dimensions.wall_height) / 100) *
            constants.strip_cost
    ),
    image_uploaded: false,
});
const pattern_config = reactive({
    pattern_repeat_width: 3.5, // min 3.5
    horizontal_offset_pct: 0, // ranges from -50 to +50
    vertical_offset_pct: 0, // ranges from -50 to +50
});
const image_desc = reactive({
    custom_image: null,
    image_size: null
});

function getWallpaper() {
    const fileInput = document.getElementById("upload__image");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            wall_dimensions.image_url = this.result;
            image_desc.custom_image = file.name;
            let img = new Image();
            img.onload = function () {
                image_desc.image_size = `${this.width} x ${this.height} px (${(
                    file.size / 1e6
                ).toFixed(1)} MB)`;
            };
            img.src = this.result;
        });
        reader.readAsDataURL(file);
        total.image_uploaded = true;
    } else {
        wall_dimensions.image_url = null;
        total.image_uploaded = false
    }
}
function setWallpaperType(e) {
    wall_dimensions.wallpaper_type = e.target.value;
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Karla&display=swap");
html {
    font-size: 15px;
}
body {
    background-color: #2e2e2e;
    color: white;
    font-family: "Karla", sans-serif;
}
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    margin: 60px 0;
}
.container {
    max-width: 1140px;
    margin: 0 auto;
}
.flex {
    display: flex;
    align-items: start;
    justify-content: space-between;
}
.bold {
    font-weight: 700;
}
.wall_dimensions button,
.adjust_pattern button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0.2rem;
}
.wall_dimensions img,
.adjust_pattern img {
    height: 20px;
    width: 20px;
}
.wall_dimensions input,
.adjust_pattern input {
    font-size: 0.85rem;
    width: 60px;
    padding: 0.25rem;
}

.wallpaper_dimensions {
    line-height: 0.5;
}

.wall_width div,
.wall_height div,
#repeat_offset div div,
.repeat_width {
    margin: 0.5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

#select_designer,
#select_category {
    font-size: 1.1rem;
    padding: 0.5rem;
    min-width: 300px;
    margin-right: 1rem;
    color: #495057;
}
.upload {
    margin-top: 5rem;
}
.upload div:first-of-type {
    max-width: 30ch;
}
#upload__image {
    display: none;
}
#upload__btn {
    background-color: #292927;
    box-shadow: 0 12px 18px -6px rgb(0 0 0 / 20%);
    transition: 0.2s;
    cursor: pointer;
    outline: none;
    border: none;
    color: white;
    padding: 1rem 3rem;
    margin-bottom: 1rem;
    display: inline-block;
}
#upload__btn:hover,
#upload__btn:focus {
    background-color: #434340;
}
.adjust_pattern {
    margin-bottom: 1.5rem;
}
.adjust_pattern > div {
    max-width: 30ch;
}
.adjust_pattern > div:nth-child(2) {
    margin-right: auto;
    margin-left: 2rem;
}
#repeat_offset {
    justify-content: space-evenly;
    flex: 1;
    margin-right: 0;
    max-width: initial;
}
#select_wallpaper_type {
    width: 190px;
    font-size: 0.9rem;
    padding: 0.2rem;
    color: #495057;
    margin-right: 3rem;
}
.image_info {
    flex: 1;
    justify-content: center;
}
.image_info span {
    display: inline-block;
    min-width: 13ch;
}
.image_preview {
    width: 200px;
    height: 100px;
    margin-right: 3rem;
}
.image_preview img {
    height: 100%;
    width: 100%;
    display: block;
    object-fit: contain;
}
.image_info small {
    display: block;
    line-height: 1.6;
}
</style>
