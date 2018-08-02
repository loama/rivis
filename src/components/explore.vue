<template>
  <div class="explore">

    <carousel :autoplay="true"
              :autoplayTimeout="10000"
              :loop="true"
              :navigationEnabled="false"
              :paginationEnabled="false"
              :perPageCustom="[[320, 1], [564, 2], [1024, 3]]">

      <slide>
        <div class="explore-slide"></div>
      </slide>

      <slide>
        <div class="explore-slide">Slide 2 Content</div>
      </slide>

      <slide>
        <div class="explore-slide">slide 3 content</div>
      </slide>

      <slide>
        <div class="explore-slide">slide 4 Content</div>
      </slide>
    </carousel>

    <div id="filters">
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
      return this.$store.state.nonProfits
    }
  },
  data () {
    return {
      map: false,
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
  height: 10000px;
}

.explore-slide {
  position: absolute;
  top: 0;
  left: 4px;
  height: 100%;
  width: calc(100% - 8px);
  border-radius: 2px;
  background: gray;
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
  position: sticky;
  z-index: 999;
  top: 56px;
  left: 10vw;
  margin-top: 40px;
  height: 120px;
  width: 80vw;
  box-shadow: 0 1px 3px #D0D0D0;
  border-radius: 4px;
  background: #FFFFFF;
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
