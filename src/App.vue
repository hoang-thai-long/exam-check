<template>
  <exam-data lesson-id="5e8ca6a9c01ad7190cdab57f" class-id="5e652e05fd6d8e01304cd67c"></exam-data>
  <!-- <router-view/> -->
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script lang="ts" setup>
import ExamData from './components/ExamData.vue'
</script>
