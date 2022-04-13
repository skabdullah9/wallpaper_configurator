<template>
  <div class="flex adjust_pattern">
                    <div v-if="wall_dimensions.wallpaper_type === 'pattern' && wall_dimensions.image_url">
                        <small>Pattern repeat width:</small>
                        <div class="repeat_width">
                            <button
                                id="minus_black"
                                @click="pattern_config.pattern_repeat_width > 3.5 ? pattern_config.pattern_repeat_width -= 1 : ''"
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
                                    @click="pattern_config.pattern_repeat_width < 70 ? pattern_config.pattern_repeat_width += 1 : ''"
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
                        v-if="wall_dimensions.wallpaper_type === 'pattern' && wall_dimensions.image_url"
                        id="repeat_offset"
                        class="flex"
                    >
                        <div>
                            <small>Vertical Offset:</small>
                            <div>
                                <button
                                    id="minus_black"
                                    @click="pattern_config.vertical_offset_pct > -50 && pattern_config.vertical_offset_pct--"
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
                                    @click="pattern_config.vertical_offset_pct < 50 && pattern_config.vertical_offset_pct++"
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
                                    @click="pattern_config.horizontal_offset_pct > -50 && pattern_config.horizontal_offset_pct--"
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
                                    @click="pattern_config.horizontal_offset_pct < 50 && pattern_config.horizontal_offset_pct++"
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
                    <AddToCartBtn style="margin-left: auto" />
                </div>
</template>

<script setup>
import {inject} from 'vue';
import AddToCartBtn from './AddToCartBtn.vue'
const {wall_dimensions, pattern_config} = inject('store')

function setWallpaperType(e) {
    wall_dimensions.wallpaper_type = e.target.value;
}
</script>

<style>
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
</style>