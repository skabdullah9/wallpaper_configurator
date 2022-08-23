<template>
  <div>
    <div v-if="total.image_uploaded" class="total">
      <p>Price breakdown:</p>
      <h4>25,24 €/m² x 6,600 m²</h4>
      <h3>
        Total price:
        {{ total.total_cost.toFixed(0).toLocaleString() }} €
      </h3>
      <small>Incl. 19% VAT</small>
    </div>
    <button
      @click="handleAddToCart"
      class="addToCart"
      :class="{ active: total.image_uploaded }"
    >
      Add to cart
    </button>
  </div>
</template>

<script setup>
import { inject } from "vue";
const { total, wall_dimensions, pattern_config, constants } = inject("store");

function handleAddToCart() {
  const payload = {
    image_url: "1",
    wall_width: wall_dimensions.wall_width,
    wall_height: wall_dimensions.wall_height,
    wallpaper_type: "ab",
    strip_width: constants.strip_width,
    strip_height: constants.strip_height,
    strips_used: total.strips_used,
    image_uploaded: "1",
    pattern_repeat_width: pattern_config.pattern_repeat_width,
    horizontal_offset_pct: pattern_config.horizontal_offset_pct,
    vertical_offset_pct: pattern_config.vertical_offset_pct,
  };

  // POST
  fetch("/wp-admin/admin-ajax.php?action=handle_cart_item_from_xhr", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "payload=" + JSON.stringify(payload),
  }).then((response) => {
    window.location.href = "/basket";
    response.json();
  });
}
</script>

<style scoped>
.addToCart {
  padding: 1.2rem 5.5rem;
  background-color: #ddd;
  font-size: 1rem;
  color: #fff;
  box-shadow: 0 12px 18px -6px rgb(0 0 0 / 20%);
  border: none;
  outline: none;
  font-family: "Karla", sans-serif;
}

.addToCart.active {
  background-color: #ef233c;
  cursor: pointer;
  transition: 0.2s;
}
.addToCart.active:focus,
.addToCart.active:hover {
  filter: contrast(120%);
}
h3,
h4,
p {
  margin: 0.2rem;
}
h3 {
  margin-top: 1.5rem;
  font-size: 1.3rem;
}
.total {
  margin-bottom: 2rem;
}
</style>
