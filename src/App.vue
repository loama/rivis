<template>
  <div id="app">
    <navbar />
    <keep-alive>
      <router-view/>
    </keep-alive>
    <div id="donate-modal" v-bind:class="{active: modal.active}">
      <div class="title">{{modal.name}}</div>
      <form v-on:submit.prevent="payment">
        <input id="amount" type="number" placeholder="amount" v-model="card.amount">
        <input id="cardnumber" type="tel" placeholder="0000 0000 0000 0000" v-model="card.number">
        <input id="cvv" type="tel" placeholder="CVV" v-model="card.cvv">
        <input id="month" type="tel" placeholder="MM" v-model="card.month">
        <input id="year" type="tel" placeholder="YY" v-model="card.year">
        <input type="submit" value="Make donation" v-bind:class="{active: canPay}">
      </form>
    </div>
    <div id="overlay"  v-on:click="modalChange(false, '')" v-bind:class="{active: modal.active}"></div>
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
  computed: {
    modal () {
      return this.$store.state.modal
    },
    canPay () {
      if (this.card.amount !== null && this.card.year !== null && this.card.month !== null && this.card.cvv !== null && this.card.number !== null) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      card: {
        amount: null,
        number: null,
        cvv: null,
        month: null,
        year: null
      }
    }
  },
  methods: {
    modalChange (to) {
      var json = {active: to}
      this.$store.commit('modal', json)
    },
    payment () {
      if (this.canPay) {
        console.log('a')
        axios.post('https://rivis.app/payments', {
          'expirationYear': this.card.year,
          'amount': this.card.amount,
          'number': this.card.number,
          'securityCode': this.card.cvv,
          'expirationMonth': this.card.month
        })
          .then(function (response) {
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
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
  margin-top: 96px;
  background: #F2F4F7;
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
  height: 50vh;
  border-radius: 2px;
  cursor: pointer;
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

#donate-modal {
  position: fixed;
  top: 100px;
  left: calc(50vw - 160px);
  height: 320px;
  width: 320px;
  background: #FFFFFF;
  border-radius: 4px;
  transform: translate3d(0, -100vh, 0);
  transition: transform 0.3s;
  z-index: 10002;
}

#donate-modal .title {
  margin: 16px;
}

#amount {
  position: absolute;
  top: 48px;
  left: 110px;
  width: 80px;
  text-align: center;
}

#cardnumber {
  position: absolute;
  top: 88px;
  left: 60px;
  text-align: center;
  width: 180px;
}

#cvv {
  position: absolute;
  top: 120px;
  left: 60px;
  width: 48px;
  text-align: center;
}

#month {
  position: absolute;
  top: 120px;
  left: 158px;
  text-align: center;
  width: 40px;
}

#year {
  position: absolute;
  top: 120px;
  left: 208px;
  text-align: center;
  width: 32px;
}

input[type="submit"] {
  position: absolute;
  top: 180px;
  left: 76px;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  border: 1px solid #E5E5E5;
  border-radius: 4px;
}

input[type="submit"].active {
  background: green;
  color: white;
}

input {
  font-size: 16px;
  outline: none;
  border: 1px solid #E5E5E5;
  border-radius: 2px;
  margin: 8px;
}

#donate-modal.active {
  transform: translate3d(0, 0, 0);
}

#overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba( 0, 0, 0, 0.8);
  display: none;
  z-index: 10001;
}

#overlay.active {
  display: block;
}
</style>
