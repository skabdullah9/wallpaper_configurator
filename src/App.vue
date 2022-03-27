<template>
    <div class="container">
        <TabsWrapper>
            <Tab title="1. Adjust wall size">
                <WallSizeTab />
            </Tab>
            <Tab title="2. Choose design">
                <ChooseDesignTab />
            </Tab>
            <Tab title="3. Adjust pattern repeat">
                <AdjustPatternTab />
            </Tab>
        </TabsWrapper>

    </div>
</template>

<script setup>
import TabsWrapper from "./components/TabsWrapper.vue";
import Tab from "./components/Tab.vue";
import WallSizeTab from './components/WallSizeTab.vue'
import ChooseDesignTab from './components/ChooseDesignTab.vue'
import AdjustPatternTab from './components/AdjustPatternTab.vue'
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
.add_to_cart_sm {
    padding: 0.5rem 2rem;
    background-color: white;
    color: black;
    margin: 2rem 0.2rem;
    cursor: pointer;
}
</style>
