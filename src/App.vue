<style lang="scss">
@font-face {
  font-family: "title";
  src: url("./assets/title.ttf");
}
* {
  padding: 0;
  margin: 0;
}
#app {
  position: relative;
  padding: 0;
  margin: 0;
  width: 100vw;
  min-width: 1280px;
  height: 100vh;
  color: #000;
  background-image: url(./assets/bg2.jpg);
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  .top {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-family: "title";
    height: 18vh;
    .nav {
      position: relative;
      margin: 0 auto;
      width: 25em;
      height: 8vh;
      font-size: 4vh;
      line-height: 8vh;
      overflow: hidden;
      .con {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        height: 100%;
        width: 100%;
        .left,
        .right {
          cursor: pointer;
          padding: 0 1em;
        }
      }
      .bg {
        position: relative;
        height: 8vh;
        width: 6em;
        background: #000;
        transition: transform 0.3s;
        .leftline,
        .rightline {
          position: absolute;
          height: 5px;
          background: #000;
        }
      }
      .bg::before {
        content: "";
        position: absolute;
        top: 0;
        left: -1.97em;
        border-width: 8vh 2em 0 0;
        border-style: solid;
        border-color: transparent #000;
      }
      .bg:after {
        content: "";
        position: absolute;
        top: 0;
        right: -1.97em;
        border-width: 0 0 8vh 2em;
        border-style: solid;
        border-color: transparent #000;
      }
      .showLeft {
        transform: translateX(-0.5em);
      }
      .showRight {
        transform: translateX(19.5em);
      }
      .showMiddle {
        transform: translateX(9.5em);
      }
    }
  }
}
</style>
<template>
  <div id="app">
    <div class="top">
      <svgTitle msg="构建民航业知识图谱并实现语义查询"></svgTitle>
      <div class="nav">
        <div class="con">
          <div class="left" @click="toMap" :style="{color: nowPage=='myMap'?'#fff':'#000'}">知识图谱</div>
          <div
            class="right"
            @click="toSearch"
            :style="{color: nowPage=='search'?'#fff':'#000'}"
          >语义查询</div>
        </div>
        <div class="bg" :class="bgClass">
          <span v-show="nowPage=='404'" style="font-weight: bold;color:#fff">404</span>
          <div class="leftline" style="left: -20em; bottom: 0; width: 19em"></div>
          <div class="rightline" style="right: -20em; top: 0; width: 19em"></div>
        </div>
      </div>
    </div>
    <router-view class="bottom" />
  </div>
</template>

<script>
import svgTitle from "@/components/svgTitle.vue";
export default {
  components: {
    svgTitle
  },
  methods: {
    toMap() {
      this.$store.commit("switchIndx", "myMap");
      this.toIndex()
    },
    toSearch() {
      this.$store.commit("switchIndx", "search");
      this.toIndex()
    },
    toIndex() {
      if (this.$route.name != "index") {
        this.$router.replace({ name: "index" });
      }
    }
  },
  computed: {
    nowPage: function() {
      if (this.$route.name == "index") {
        return this.$store.state.indexType;
      } else {
        return "404";
      }
    },
    bgClass: function() {
      if (this.nowPage == "myMap") {
        return "showLeft";
      } else if (this.nowPage == "search") {
        return "showRight";
      } else {
        return "showMiddle";
      }
    }
  }
  // watch: {
  //   $route: {
  //     handler: function(val, oldVal) {
  //       this.router = val.name;
  //     },
  //     deep: true
  //   }
  // }
};
</script>


