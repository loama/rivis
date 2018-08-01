<template>
  <div class="navbar">
    <router-link to="/explore">
      <div class="logo">RIVIS</div>
      <div class="slogan">|&nbsp; donations in the digital era</div>
    </router-link>

    <div class="links">
      <router-link to="/explore">explore</router-link>
      <router-link to="/publish">publish</router-link>
      <router-link to="/myaccount">my account</router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'navbar',
  mounted () {
  },
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 48px;
  width: 100vw;
  background: #FFFFFF;
  box-shadow: rgba(5, 45, 73, 0.07) 0px 2px 0px 0px;
  color: #002D4B;
}

.logo {
  position: absolute;
  top: 12px;
  left: 20px;
  color: #002D4B;
  font-family: 'America-Medium';
  font-size: 18px;
  letter-spacing: 1px;
}

.slogan {
  position: absolute;
  top: 13px;
  left: 80px;
}

.router-link-active, a:visited {
  color: inherit;
}

.links {
  position: absolute;
  top: 0;
  right: 0;
}

.links > a {
  display: inline-block;
  padding: 0 16px;
  font-size: 13px;
  line-height: 48px;
  cursor: pointer;
  font-family: 'America-Medium';
  text-decoration: none;
}

.links > a:visited {
  color: #002D4B;
}

.links > a:hover {
  text-decoration: underline;
}

.links > a:last-child {
  padding-right: 32px;
}

.links > a.router-link-active {
  color: #1EDA9F;
}
</style>
