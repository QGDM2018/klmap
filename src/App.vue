<style lang="scss">
  @font-face {
    font-family: title;
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
    height: 100vh;
    min-width: 1280px;
    color: #000;
    background-image: url(./assets/bg2.jpg);
    background-size: 100% auto;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;

    .top {
      position: absolute;
      z-index: 1000;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      height: 18vh;
      width: 100vw;
      font-family: title;
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
          .right,
          .middle {
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
          <div class="middle" @click="toChart" :style="{color: nowPage=='myChart'?'#fff':'#000'}">图表分析</div>
          <div class="right" @click="toSearch" :style="{color: nowPage=='search'?'#fff':'#000'}">语义查询</div>
        </div>
        <div class="bg" :class="bgClass">
          <div class="leftline" style="left: -20em; bottom: 0; width: 19em"></div>
          <div class="rightline" style="right: -20em; top: 0; width: 19em"></div>
        </div>
      </div>
    </div>
    <index></index>
  </div>
</template>

<script>
  import svgTitle from "@/components/svgTitle.vue";
  import index from "@/views/index.vue";
  export default {
    components: {
      svgTitle,
      index
    },
    methods: {
      toMap() {
        this.$store.commit("switchIndx", "myMap");
      },
      toSearch() {
        this.$store.commit("switchIndx", "search");
      },
      toChart() {
        this.$store.commit("switchIndx", "myChart");
      },
    },
    computed: {
      nowPage: function () {
        return this.$store.state.indexType;
      },
      bgClass: function () {
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


