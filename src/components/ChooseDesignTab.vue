<template>
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
                    <AddToCartBtn />
                </div>
</template>

<script setup>
import {inject} from 'vue'
import AddToCartBtn from './AddToCartBtn.vue'
const {wall_dimensions, image_desc, total, constants} = inject("store")
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
</script>

<style>
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
    object-fit: contain;
}
.image_info small {
    display: block;
    line-height: 1.6;
}
</style>