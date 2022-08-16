import { reactive, computed } from "vue";

const wall_dimensions = reactive({
    wall_width: 275, // min 65
    wall_height: 240, // min 100
    image_url: null,
    wallpaper_type: "photo",
});
let constants = reactive({});

const total = reactive({
    strips_used: computed(() =>
        Math.ceil((wall_dimensions.wall_width + 5) / 70)
    ),
    total_cost: computed(
        () =>
            ((wall_dimensions.wall_width * wall_dimensions.wall_height) / 100) *
            constants.strip_cost
    ),
    image_uploaded: false,
});
const pattern_config = reactive({
    pattern_repeat_width: 35, // min 3.5
    horizontal_offset_pct: 0, // ranges from -50 to +50
    vertical_offset_pct: 0, // ranges from -50 to +50
});
const image_desc = reactive({
    custom_image: null,
    image_size: null,
});
async function fetchConstants() {
    try {
        const response = await fetch(
            "https://wallworthy.originalpeople-dev.com/wp-admin/admin-ajax.php?action=get_wallpaper_config_constants"
        );

        const data = await response.json();

        constants = data;
    } catch (error) {
        console.log(error);
        constants = {
            strip_width: 70,
            strip_height: 245,
            price_per_meter_sq: 23,
            strip_cost: 23,
        };
    }
}
fetchConstants();
const all_images = reactive([
    // {
    //     designer: "William Morris",
    //     category: "forest",
    //     src: require('./assets/image5.jpg'),
    // },
    // {
    //     designer: "William Morris",
    //     category: "mountains",
    //     src: require('./assets/image1.jpg'),
    // },
]);
const default_wallpaper = reactive({
    designers_list: [...new Set(all_images.map((img) => img.designer))],
    categories_list: [...new Set(all_images.map((img) => img.category))],
    designer: "",
    category: "",
    selected_images: computed(() =>
        all_images.filter(
            (img) =>
                img.category == default_wallpaper.category ||
                img.designer == default_wallpaper.designer
        )
    ),
});
export default {
    wall_dimensions,
    constants,
    total,
    pattern_config,
    image_desc,
    all_images,
    default_wallpaper,
};
