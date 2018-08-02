<template>
  <div class="explore">

    <carousel :autoplay="true"
              :autoplayTimeout="10000"
              :loop="true"
              :navigationEnabled="false"
              :paginationEnabled="false"
              :perPageCustom="[[320, 1]]">

      <slide>
        <div class="explore-slide" style="backgroundImage: url(https://firebasestorage.googleapis.com/v0/b/rivis-dd844.appspot.com/o/mexhead.jpg?alt=media)">
          <div class="title">Mexico Earthquake</div>
          <div class="date">September, 2017</div>
        </div>
      </slide>

      <slide>
        <div class="explore-slide" style="backgroundImage: url(https://firebasestorage.googleapis.com/v0/b/rivis-dd844.appspot.com/o/indonesia.jpg?alt=media)">
          <div class="title">Indonesia Earthquake</div>
          <div class="date">July, 2018</div>
        </div>
      </slide>

      <slide>
        <div class="explore-slide" style="backgroundImage: url(https://firebasestorage.googleapis.com/v0/b/rivis-dd844.appspot.com/o/japan.jpg?alt=media)">
          <div class="title">Japan Tsunami</div>
          <div class="date">March, 2011</div>
        </div>
      </slide>

      <slide>
        <div class="explore-slide" style="backgroundImage: url(https://firebasestorage.googleapis.com/v0/b/rivis-dd844.appspot.com/o/tornadocanada.jpg?alt=media)">
          <div class="title">Tornado in Ontario</div>
          <div class="date">June, 2018</div>
        </div>
      </slide>
    </carousel>

    <div id="filters">
      <ul>
        <li v-bind:class="{active: filter.active === 'all'}" v-on:click="filter.active = 'all'">all</li>
        <li v-bind:class="{active: filter.active === 'kids'}" v-on:click="filter.active = 'kids'">kids</li>
        <li v-bind:class="{active: filter.active === 'environment'}" v-on:click="filter.active = 'environment'">environment</li>
        <li v-bind:class="{active: filter.active === 'food'}" v-on:click="filter.active = 'food'">food</li>
        <li v-bind:class="{active: filter.active === 'rights'}" v-on:click="filter.active = 'rights'">rights</li>
        <li v-bind:class="{active: filter.active === 'health'}" v-on:click="filter.active = 'health'">health</li>
        <li v-bind:class="{active: filter.active === 'arts'}" v-on:click="filter.active = 'arts'">arts</li>
      </ul>
      <div class="map" v-on:click="map = !map">
        <span v-if="map">list</span>
        <span v-if="!map">map</span>
      </div>
    </div>

    <div id="nonProfits">
      <div class="nonProfit"
           v-for="nonProfit in nonProfits" v-bind:key="nonProfit.id"
           v-on:click="$router.push('/campaign/' + nonProfit.wikipedia_title)">
        <div class="image" v-bind:style="{backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/rivis-dd844.appspot.com/o/' + nonProfit.posting_img_url + '?alt=media)'}"></div>
        <div class="details">
          <div class="logo"
                  v-bind:style="{backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/rivis-dd844.appspot.com/o/' + nonProfit.logo_url + '?alt=media)'}"></div>
          <div class="description">
            <div class="title">{{nonProfit.name}}</div>
            <div class="short">{{nonProfit.description_short}}</div>
          </div>
        </div>
      </div>
    </div>

    <div id="mapContainer" v-bind:class="{show: map}"></div>

  </div>
</template>

<script>
import Vue from 'vue'
import VueCarousel from 'vue-carousel'
import VueScript2 from 'vue-script2'

Vue.use(VueCarousel)

Vue.use(require('vue-script2'))

export default {
  name: 'explore',
  computed: {
    nonProfits () {
      var all = this.$store.state.nonProfits
      if (this.filter.active === 'all') {
        return all
      } else {
        var filtered = []
        for (var i = 0; i < all.length; i++) {
          if (all[i].category === this.filter.active) {
            filtered.push(all[i])
          }
        }
        return filtered
      }
    },
    nonProfitsAll () {
      return this.$store.state.nonProfits
    }
  },
  data () {
    return {
      map: false,
      filter: {
        active: 'all'
      },
      postings: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 5
        },
        {
          id: 6
        }
      ]
    }
  },
  mounted () {
    VueScript2.load('https://js.api.here.com/v3/3.0/mapsjs-core.js').then(function () {
      VueScript2.load('https://js.api.here.com/v3/3.0/mapsjs-service.js').then(function () {
        VueScript2.load('https://js.cit.api.here.com/v3/3.0/mapsjs-mapevents.js').then(function () {
          /* eslint-disable */
          var platform = new H.service.Platform({
            'app_id': 'kdP9M4AJwRrqi9oBFbYa',
            'app_code': 'QxJ3RqVxjbkq0HF85rE9yA',
            'useHTTPS': true
          })

          // Obtain the default map types from the platform object:
          var defaultLayers = platform.createDefaultLayers()

          // Instantiate (and display) a map object:
          var map = new H.Map(
            document.getElementById('mapContainer'),
            defaultLayers.terrain.map,
            {
              type: 'terrain',
              zoom: 13,
              center: { lat: 52.5, lng: 13.4 }
            })

          var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

          var animatedSvg = '<a href="#/campaign/2"><div class="markerIcon" style="height:200px; width: 200px; background: #F00"></div></a>';

          // Create an icon, an object holding the latitude and longitude, and a marker:
          var icon = new H.map.DomIcon(animatedSvg),
            coords = {lat: 52.53075, lng: 13.3851},
            marker = new H.map.DomMarker(coords, {icon: icon})

          // Add the marker to the map and center the map at the location of the marker:
          map.addObject(marker)
          map.setCenter(coords)
          /* eslint-enable */
        })
      })
    })
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.explore {
  padding-bottom: 80px;
}

.explore-slide {
  position: absolute;
  top: 0;
  left: 4px;
  height: 100%;
  width: calc(100% - 8px);
  border-radius: 2px;
  background: gray;
  background-size: cover;
  background-position: center;
}

.explore-slide .title {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 72px;
  padding-left: 32px;
  width: calc(100vw - 40px);
  text-align: left;
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0, 0.1));
  font-size: 32px;
  color: #FFFFFF;
}

.explore-slide .date {
  position: absolute;
  bottom: 12px;
  left: 34px;
  font-size: 16px;
  color: #FFFFFF;
}

#mapContainer {
  position: fixed;
  z-index: 990;
  top: 48px;
  left: 0;
  height: calc(100vh - 48px);
  width: 100vw;
  background: #E0E6E9;
  transform: translate3d(0, -100vh, 0);
}

#mapContainer.show {
  transform: translate3d(0, 0, 0);
}

.markerIcon {
  height: 20px;
  width: 20px;
  background: red;
}

#filters {
  position: fixed;
  z-index: 999;
  top: 8px;
  left: 0;
  margin-top: 40px;
  height: 40px;
  width: 100vw;
  box-shadow: 0 1px 3px #D0D0D0;
  border-radius: 0 0 4px 4px;
  background: #FFFFFF;
  line-height: 24px;
}

#filters ul {
  padding: 0 16px;
  margin: 0;
  list-style: none;
  text-align: left;
}

#filters ul li {
  display: inline-block;
  margin: 8px 0;
  padding: 0 16px;
  cursor: pointer;
  border-radius: 4px;
  height: 24px;
}

#filters ul li.active {
  border: 1px solid #002D4B;
  background: rgba(44, 62, 80, 0.8);
  color: white;
}

#filters .map {
  position: absolute;
  top: 0;
  right: 16px;
  cursor: pointer;
}

#nonProfits {
  width: calc(100vw - 16px);
  margin-left: 8px;
  margin-top: 20px;
  text-align: left;
}

.nonProfit {
  display: inline-block;
  height: 200px;
  width: 50%;
  box-shadow: 0 1px 2px #D0D0D0;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.15s;
  background: #FFFFFF;
}

.nonProfit:hover {
  box-shadow: 0 1px 8px #AAA;
}

.nonProfit .image {
  top: 0;
  left: 0;
  height: 128px;
  width: 100%;
  border-radius: 4px 4px 0 0;
  background: gray;
  background-size: cover;
  background-position: center;
}

.nonProfit .details {
  height: 72px;
  width: 100%;
}

.nonProfit .details .logo {
  display: inline-block;
  margin: 4px;
  height: 64px;
  width: 64px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.nonProfit .details .description {
  display: inline-block;
  height: 64px;
  width: calc(100% - 84px);
}

.nonProfit .details .description div {
  float: left;
}

.nonProfit .details .description div.title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
}

.nonProfit .details .description div.short {
  font-size: 13px;
  max-height: 40px;
  line-height: 20px;
  overflow: hidden;
}

@media screen and (min-width: 568px) {
  .nonProfit {
    width: 33%;
  }
}

@media screen and (min-width: 1024px) {
  .nonProfit {
    width: calc(25% - 8px);
  }
}
</style>
