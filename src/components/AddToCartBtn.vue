<template>
    <div>
        <div v-if="total.image_uploaded" class="total">
            <p>Price breakdown:</p>
            <h4>25,24 €/m² x 6,600 m²</h4>
            <h3>Total price: {{total.total_cost.toFixed(0).toLocaleString()}} €</h3>
            <small>Incl. 19% VAT</small>
        </div>
        <button class="addToCart" :class="{active : total.image_uploaded}">Add to cart</button>
    </div>
</template>

<script setup>
import { inject} from 'vue'
const {total} = inject("store")
</script>

<style scoped>
.addToCart {
    margin-top: 2rem;
    padding: 1.2rem 5.5rem;
    background-color: #ddd;
    font-size: 1rem;
    color:#fff;
    box-shadow: 0 12px 18px -6px rgb(0 0 0 / 20%);
    border:none;
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
  filter: contrast(120%)
}
h3, h4, p {
  margin:0.2rem;
}
h3 {
  margin-top: 1.5rem;
  font-size: 1.3rem;
}
</style>
