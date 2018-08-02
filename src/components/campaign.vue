<template>
  <div class="campaign">
    <div class="donate-div"></div>

    <div class="header-image" v-bind:style="{backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/rivis-dd844.appspot.com/o/' + nonProfit.posting_img_url + '?alt=media)'}"></div>

    <div class="header">
      <span class="title" id="articleTitle">{{nonProfit.name}}</span>
      <hr class="title" id="articleLine">
      <span class="source" id="articleSource">From Wikipedia, the free encyclopedia</span>

      <div class="logo" v-bind:style="{backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/rivis-dd844.appspot.com/o/' + nonProfit.logo_url + '?alt=media)'}">
      </div>
    </div>

    <div class="article" v-html="this.article.rawContent">
    </div>

    <div class="hover-article"
      v-bind:style="{left: hoverArticle.left, top: hoverArticle.top}"
      v-bind:class="{fadeInFromNone: hoverArticle.show, fadeOutToNone: !hoverArticle.show}">
      <div class="loading-screen" v-bind:class="{hide: !hoverArticle.loading}">
        <div class="loader"></div>
      </div>
      <div class="img" v-bind:style="{backgroundImage: 'url(' + hoverArticle.src + ')' }">
      </div>

      <div class="title">{{hoverArticle.title}}</div>
      <div class="description">{{hoverArticle.description}}</div>
    </div>

  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'campaign',
  computed: {
    nonProfit () {
      for (var i = 0; i < this.$store.state.nonProfits.length; i++) {
        if (this.$store.state.nonProfits[i].wikipedia_title === this.$route.params.id) {
          var nonProfit = this.$store.state.nonProfits[i]
        }
      }
      return nonProfit
    }
  },
  data () {
    return {
      article: {
        rawTitle: '',
        parsedTitle: '',
        rawContent: '',
        headerImgSrc: ''
      },
      hoverArticle: {
        left: 0,
        top: 0,
        show: false,
        title: '',
        description: '',
        src: '/static/article_preview.png',
        loading: true
      }
    }
  },
  methods: {
    loadArticle () {
      this.article.parsedTitle = this.$route.params.id
      var wikiurl = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page='
      this.$jsonp(wikiurl + this.article.parsedTitle).then(json => {
        this.article.rawContent = json.parse.text['*']
        var fullPath = json.parse.text['*'].split('<img')[2].split('src="//')[1].split('"')[0].replace('/thumb', '')
        var lastPath = fullPath.split('/')[fullPath.split('/').length - 1]
        var realPath = fullPath.replace('/' + lastPath, '')
        this.article.headerImgSrc = 'https://' + realPath
      }).catch(err => {
        console.log(err)
        this.article.parsedTitle = 'we couldn´t find that article :('
      })
    },
    loadHoverArticle (title, link) {
      this.hoverArticle.loading = true
      this.hoverArticle.title = title
      var wikiurl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&exintro&explaintext&titles='
      this.$jsonp(wikiurl + link).then(json => {
        // console.log(wikiurl + link)
        this.hoverArticle.title = json.query.pages[Object.keys(json.query.pages)[0]].title
        this.hoverArticle.description = json.query.pages[Object.keys(json.query.pages)[0]].extract
        if (json.query.pages[Object.keys(json.query.pages)[0]].thumbnail !== undefined) {
          this.hoverArticle.src = json.query.pages[Object.keys(json.query.pages)[0]].thumbnail.source
        } else {
          this.hoverArticle.src = '/static/article_preview.png'
        }
        this.hoverArticle.loading = false
        // remove title from anchors to not get the anoying tag
        var anchors = document.getElementsByTagName('a')
        var i
        for (i = 0; i < anchors.length; i++) {
          anchors[i].removeAttribute('title')
        }
      }).catch(err => {
        console.log(err)
        this.article.parsedTitle = 'we couldn´t find that article :('
      })
    }
  },
  mounted () {
    var it = this
    window.onclick = function (e) {
      if (e.target.tagName === 'A') {
        console.log(e.target.href)
        e.preventDefault()
        window.open('https://wikipedia.org/en' + e.target.href.split('wiki')[1], '_blank')
      }
    }
    this.loadArticle()
    setTimeout(function () {
      document.addEventListener('mouseover', function (e) {
        if (e.target.nodeName === 'A') {
          var title = e.target.title
          var link = e.target.pathname.split('/wiki/')[1]
          it.loadHoverArticle(title, link)
          it.hoverArticle.left = (e.layerX - 40) + 'px'
          it.hoverArticle.top = (e.layerY + 24) + 'px'
          it.hoverArticle.show = true
        } else {
          it.hoverArticle.title = ''
          it.hoverArticle.description = ''
          it.hoverArticle.src = '/static/article_preview.png'
          it.hoverArticle.show = false
        }
      })
    }, 1000)
  },
  watch: {
    '$route' (to, from) {
      router.push(to.path)
      this.loadArticle()
      // console.log(this.$route.params.wikiarticle)
    }
  }
}
</script>

<style scoped>
.campaign {
  text-align: left;
  padding: 156px 12px 24px 24px;
  background: #FFFFFF;
}

.header-image {
  position: absolute;
  top: 0;
  left: 0;
  height: 200px;
  width: 100vw;
  background-position: center;
  background-size: cover;
}

span.title {
  font-family: 'America-Regular';
  font-size: 1.5rem;
}

hr.title {
  height: 0;
  border-top: 1px solid #aaa;
  margin: 0;
}

span.source {
  font-size: 0.875rem;
  color: #4a4a4a;
}

div.article {
  margin-top: 24px;
  font-size: 0.875rem;
  max-width: calc(100vw - 280px);
}

div.hover-article {
  width: 400px;
  height: auto;
  max-height: 208px;
  border: 1px solid #e5e5e5;
  border-radius: 2px;
  background: white;
  position: absolute;
  z-index: 100;
}

div.hover-article:after {
    content: '';
    display: block;
    position: absolute;
    top: -8px;
    left: 40px;
    width: 16px;
    height: 16px;
    background: #FFFFFF;
    border-right:1px solid #e5e5e5;
    border-bottom:1px solid #e5e5e5;
    -moz-transform:rotate(-135deg);
    -webkit-transform:rotate(-135deg);
}

div.hover-article div.img {
  min-width: 56px;
  max-width: 80px;
  min-height: 56px;
  height: auto;
  float: right;
  background-size: contain;
  background-position: top left;
  margin: 48px 8px 8px 8px;
  position: relative;
  z-index: 200;
  background-repeat: no-repeat;
}

div.hover-article div.title {
  font-family: 'America-Medium';
  color: #191919;
  padding: 8px;
  border-bottom: 1px solid #e5e5e5;
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;
}

div.hover-article div.description {
  padding: 8px 8px 10px 8px;
  max-height: 140px;
  overflow: hidden;
}

div.hover-article div.loading-screen {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 303;
  width: 400px;
  height: 200px;
  background: white;
  border-radius: 2px;
}

.logo {
  position: absolute;
  top: 216px;
  left: 24px;
  height: 56px;
  width: 80px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.donate-div {
  position: sticky;
  float: right;
  top: 56px;
  left: calc(100vw - 180px);
  margin-top: 8px;
  height: 200px;
  width: 240px;
  background: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0 1px 3px #D0D0D0;
}

</style>
