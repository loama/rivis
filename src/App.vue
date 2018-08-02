<template>
  <div id="app">
    <navbar />
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import axios from 'axios'
import navbar from './components/navbar.vue'

export default {
  name: 'app',
  components: {
    navbar
  },
  mounted () {
    var self = this
    axios
      .get('https://rivis.app/nonProfits')
      .then(function (response) {
        self.$store.commit('nonProfits', response.data)
        console.log(response.data)
      })

    /* var apiKey = '9J8SI59QGCK0KODPUTHS21wizipqk3emCHTBBZUb9dMPTbv0E'
    var baseUri = 'cybersource/'
    var resourcePath = 'payments/v1/authorizations'
    var queryParams = 'apikey=' + apiKey */
    // visaAPIClient.doXPayRequest(baseUri, resourcePath, queryParams, paymentAuthorizationRequest, 'POST', {}
  }
}
</script>

<style>

html, body {
  margin: 0;
  padding: 0;
}

.plainlinks.metadata.ambox.ambox-content.ambox-Update {
  display: none;
}

.thumbinner {
  clear: right;
  float: right;
  margin: 8px 8px 24px 16px;
}

.thumbimage {
  border-radius: 4px;
}

.mw-editsection {
  display: none;
}

.reference {
  display: none;
}

.article a {
  text-decoration: none;
  color: blue;
}

#app {
  font-family: 'America-Regular', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #F0F0F0;
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

.hide, .fadeOutToNone {
  display: none;
}

span.source {
  display: none;
}

.infobox.vcard {
  display: none;
}

#toc {
  display: none;
}

#articleSource {
  display: block;
  margin-left: 88px;
}

#articleTitle {
  margin-left: 88px;
}

#articleLine {
  margin-left: 80px;
}
</style>
