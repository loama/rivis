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
        {{posting.id}}
      </div>
    </div>

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

#filters {
  position: sticky;
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
  box-shadow: 0 1px 3px #D0D0D0;
  margin: 4px;
  border-radius: 4px;
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
