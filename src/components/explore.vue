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
    </div>

    <div id="postings">
      <div class="posting" v-for="posting in postings" v-bind:key="posting.id">
        <div class="image"></div>
        <div class="details">
          {{posting.id}}
        </div>
      </div>
    </div>

    <div id="mapContainer"></div>

  </div>
</template>

<script>
import Vue from 'vue'
import VueCarousel from 'vue-carousel'

Vue.use(VueCarousel)

export default {
  name: 'explore',
  data () {
    return {
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
    var platform = new H.service.Platform({
      'app_id': 'kdP9M4AJwRrqi9oBFbYa',
      'app_code': 'QxJ3RqVxjbkq0HF85rE9yA'
    })

    // Obtain the default map types from the platform object:
    var defaultLayers = platform.createDefaultLayers()

    // Instantiate (and display) a map object:
    var map = new H.Map(
      document.getElementById('mapContainer'),
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: 52.5, lng: 13.4 }
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
  position: absolute;
  top: 100px;
  left: 50px;
  height: 400px;
  width: calc(100vw - 100px);
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

#postings {
  width: calc(100vw - 16px);
  margin-left: 8px;
  margin-top: 20px;
  text-align: left;
}

.posting {
  display: inline-block;
  height: 200px;
  width: 50%;
  box-shadow: 0 1px 2px #D0D0D0;
  margin: 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.15s;
}

.posting:hover {
  box-shadow: 0 1px 8px #AAA;
}

.posting .image {
  top: 0;
  left: 0;
  height: 128px;
  width: 100%;
  border-radius: 4px 4px 0 0;
  background: gray;
}

.posting .details {
  height: 72px;
  width: 100%;
}

@media screen and (min-width: 568px) {
  .posting {
    width: 33%;
  }
}

@media screen and (min-width: 1024px) {
  .posting {
    width: calc(25% - 8px);
  }
}
</style>
