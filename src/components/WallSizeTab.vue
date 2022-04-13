<template>
    <div class="flex">
        <div class="wall_dimensions">
            <div class="wall_width">
                <small class="bold">Wall width:</small>
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
                        <img src="@/assets/minus_black.svg" alt="" />
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
                <small class="bold">Wall height:</small>
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
                                ? (wall_dimensions.wall_height -= 20)
                                : ''
                        "
                    >
                        <img src="@/assets/minus_black.svg" alt="" />
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
                                ? (wall_dimensions.wall_height += 20)
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
                Total width: {{ 70 * total.strips_used }} cm ({{
                    total.strips_used
                }}
                strips x 70cm)
            </p>
            <p>
                Total height of each wallpaper strip:
                {{ wall_dimensions.wall_height + 5 }} cm
            </p>
        </div>
        <AddToCartBtn />
    </div>
</template>

<script setup>
import {inject} from 'vue'
import AddToCartBtn from './AddToCartBtn.vue'
const {wall_dimensions, total} = inject("store")
</script>

<style>

</style>
