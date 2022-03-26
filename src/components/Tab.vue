<template>
    <div v-show="title == activeTab"><slot/></div>
</template>

<script>
import {inject} from 'vue'
export default {
    props: ['title'],
    setup() {
        const activeTab = inject('activeTab')

        return {
            activeTab
        }
    }
}
</script>

<style>

</style>