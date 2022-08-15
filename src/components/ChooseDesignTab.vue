<template>
    <p>Choose one of the designs from our collections:</p>
    <select
        id="select_designer"
        v-model="default_wallpaper.designer"
        @change="default_wallpaper.category = ''"
    >
        <option selected value="">By designer</option>
        <option
            v-for="(designer, index) in default_wallpaper.designers_list"
            :key="index"
            :value="designer"
        >
            {{ designer }}
        </option>
    </select>
    <select
        id="select_category"
        v-model="default_wallpaper.category"
        @change="default_wallpaper.designer = ''"
    >
        <option selected value="">By category</option>
        <option
            v-for="(category, index) in default_wallpaper.categories_list"
            :key="index"
            :value="category"
        >
            {{ category }}
        </option>
    </select>
    <div class="flex default-images">
        <div
            v-for="({ src }, index) in default_wallpaper.selected_images"
            :key="index"
            class="image_preview"
        >
            <img :src="src" alt="" @click="getWallpaper(src)" />
        </div>
    </div>
    <div class="flex upload">
        <div>
            <label for="upload__image" id="upload__btn"
                >Upload image <img src="../assets/cloud_upload.svg" alt=""
            /></label>
            <input
                type="file"
                id="upload__image"
                accept="image/*"
                @change="getWallpaper"
            />
            <p>
                Upload a custom photo or image and configure it via the
                wallpaper configurator.
            </p>
            <p>Accepted file formats:JPG, PNG</p>
        </div>
        <div class="image_info flex" v-show="wall_dimensions.image_url">
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
                    ><span>Quality: </span> {{ image_desc.custom_image }}</small
                >
            </div>
        </div>
        <AddToCartBtn />
    </div>
</template>

<script setup>
import { inject } from "vue";
import AddToCartBtn from "./AddToCartBtn.vue";

const { wall_dimensions, image_desc, total, constants, default_wallpaper } =
    inject("store");

async function getWallpaper(src) {
    const fileInput = document.getElementById("upload__image");
    const file = fileInput.files[0] || (await getDefaultImage(src));

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
        total.image_uploaded = false;
    }
}

async function getDefaultImage(src) {
    const img = await fetch(src);
    const blob = await img.blob();
    const filename =
        src.split(".")[0].split("/")[2] + ".jpg" || "default_image.jpg";
    const file = new File([blob], filename, {
        type: blob.type,
    });
    return file;
}
</script>

<style>
#select_designer,
#select_category {
    font-size: 1.1rem;
    padding: 0.5rem;
    min-width: 300px;
    margin-right: 1rem;
    color: #495057;
    outline: none;
}
.default-images {
    margin: 2rem 0;
    justify-content: start !important;
    gap: 1.5rem;
    flex-wrap: wrap;
}
.default-images .image_preview {
    margin-right: 0;
}
.default-images .image_preview img {
    width: 100% !important;
}
.upload {
    margin-bottom: 3rem;
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
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}
#upload__btn:hover,
#upload__btn:focus {
    background-color: #434340;
}
.upload .image_info {
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
    object-fit: cover;
    cursor: pointer;
}
.image_info small {
    display: block;
    line-height: 1.6;
}
</style>
