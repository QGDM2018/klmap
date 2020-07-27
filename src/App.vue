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
  padding: 0;
  margin: 0;
  width: 100vw;
  min-width: 1080px;
  color: #fff;
  background-color: #5b08c3;
  overflow-x: hidden;
  .top {
    text-align: center;
    font-family: "title";
    .title {
      display: flex;
      justify-content: center;
      letter-spacing: 0.1em;
      svg {
        height: 2em;
        width: 20em;
        font-size: 50px;
      }
      .text-line {
        letter-spacing: 0.1em;
      }
      .anim-shape {
        transform: translate(0, 0);
        animation: moving-panel 1s ease-in-out infinite alternate;
      }
      .shadow {
        transform: translate(0.05em, 0.05em);
      }
      .anim-shape--shadow {
        fill: #000;
        fill-opacity: 0.3;
      }
    }
    .nav {
      position: relative;
      margin: 0 auto;
      width: 25em;
      height: 2em;
      font-size: 30px;
      line-height: 2em;
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
        height: 2em;
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
        border-width: 2em 2em 0 0;
        border-style: solid;
        border-color: transparent #000;
      }
      .bg:after {
        content: "";
        position: absolute;
        top: 0;
        right: -1.97em;
        border-width: 0 0 2em 2em;
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
@keyframes moving-panel {
  0% {
    transform: translate(-1.1em, 0);
  }
  100% {
    transform: translate(1.1em, 0);
  }
}
</style>
<template>
  <div id="app">
    <div class="top">
      <div class="title">
        <svg>
          <clipPath id="cp-text">
            <text
              text-anchor="middle"
              x="50%"
              y="50%"
              dy=".35em"
              class="text-line"
            >构建民航业知识图谱并实现语义查询</text>
          </clipPath>
          <g clip-path="url(#cp-text)" class="shadow">
            <rect width="100%" height="100%" class="anim-shape anim-shape--shadow" />
          </g>
          <g clip-path="url(#cp-text)" class="colortext">
            <rect width="100%" height="100%" fill="#9E1826" class="anim-shape" />
            <rect width="80%" height="100%" fill="#111111" class="anim-shape" />
            <rect width="60%" height="100%" fill="#65BFA6" class="anim-shape" />
            <rect width="40%" height="100%" fill="#F2CD5C" class="anim-shape" />
            <rect width="20%" height="100%" fill="#F26444" class="anim-shape" />
          </g>
        </svg>
      </div>
      <div class="nav">
        <div class="con">
          <div class="left" @click="toMap">知识图谱</div>
          <div class="right" @click="toSearch">语义查询</div>
        </div>
        <div class="bg" :class="bgClass">
          <span v-show="router=='404'" style="font-weight: bold">404</span>
          <div class="leftline" style="left: -20em; bottom: 0; width: 19em"></div>
          <div class="rightline" style="right: -20em; top: 0; width: 19em"></div>
        </div>
      </div>
    </div>
    <router-view class="bottom" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      router: "map"
    };
  },
  methods: {
    toMap() {
      this.router = "map";
      this.$router.replace({ name: "map" });
    },
    toSearch() {
      this.router = "search";
      this.$router.replace({ name: "search" });
    }
  },
  computed: {
    bgClass: function() {
      if (this.router == "map") {
        return "showLeft";
      } else if (this.router == "search") {
        return "showRight";
      } else {
        return "showMiddle";
      }
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if(val.name == 404) {
          this.router = '404';
        }
      },
      deep: true
    }
  }
};
</script>


