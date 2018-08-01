import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router'
/* import VueFirestore from 'vue-firestore'
import Firebase from 'firebase'

require('firebase/firestore')

Vue.use(VueFirestore)

var firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyAschYnBqgkXznU9o5II9RRBwimlJc8vlA',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: 'rivis-dd844'
})

const firestore = firebaseApp.firestore()
*/

Vue.use(Vuex)

const state = {
  user: {
    loggedIn: false,
    displayName: '',
    photoURL: '',
    token: ''
  },
  nonProfits: []
}

const mutations = {
  login (state, payload) {
    state.user.loggedIn = true
  },
  nonProfits (state, payload) {
    this.state.nonProfits = payload
  }
}

const actions = {
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
