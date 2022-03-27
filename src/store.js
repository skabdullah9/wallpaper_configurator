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


export default {
    wall_dimensions, constants, total, pattern_config, image_desc
}