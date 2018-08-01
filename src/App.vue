<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import navbar from './components/navbar.vue'

export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>

<style>

html, body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'America-Regular', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@font-face {
  font-family: 'America-Regular';
  src: url('assets/fonts/america/regular.ttf');
}

@font-face {
  font-family: 'America-Medium';
  src: url('assets/fonts/america/medium.ttf');
}

.explore .VueCarousel {
  max-width: 100vw;
}

.explore .VueCarousel-slide {
  position: relative;
  height: 180px;
  border-radius: 2px;
}
</style>
