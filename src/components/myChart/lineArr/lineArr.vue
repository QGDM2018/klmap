<style lang="scss" scoped>
  .lineArr {
    position: absolute;
    bottom: 2vh;
    height: 23em;
    width: 100vw;

    .lineChart {
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -17.5em;
      height: 23em;
      width: 35em;
      z-index: 0;
      opacity: 0.7;
      transition: all 0.5s;
      border-radius: 5px;
      background-color: #fff;
      transform-origin: 50% 80%;
      box-shadow: 0 0 15px 2px #aaa;
      transform: translateX(0%) scale(0.5);
    }

    .lineChart:hover {
      background-color: rgba(240, 240, 240, 0.9);
    }

    .show1 {
      opacity: 0.7;
      z-index: 1;
      transform: translateX(-120%) scale(0.6);
    }

    .show2 {
      opacity: 0.9;
      z-index: 2;
      transform: translateX(-70%) scale(0.8);
    }

    .show3 {
      opacity: 1;
      z-index: 3;
      transform: translateX(0%) scale(1);
    }

    .show4 {
      opacity: 0.9;
      z-index: 2;
      transform: translateX(70%) scale(0.8);
    }

    .show5 {
      opacity: 0.7;
      z-index: 1;
      transform: translateX(120%) scale(0.6);
    }

  }
</style>

<template>
  <div class="lineArr" @mouseenter="mouseOver" @mouseleave="mouseOut">
    <div class="lineChart" v-for="(num, index) in chartNum" :id="'lineChart'+index"
         :class="{show1: (showIndex + chartNum - 2) % chartNum == index,
                  show2: (showIndex + chartNum - 1) % chartNum == index,
                  show3: showIndex == index,
                  show4: (showIndex + chartNum + 1) % chartNum == index,
                  show5: (showIndex + chartNum + 2) % chartNum == index}"
         @click="changePage(index)"
    >{{index}}
    </div>
  </div>
</template>

<script>
  import {getLineOptions} from "../getChartOptions";

  let clickLimit = false;
  export default {
    data() {
      return {
        chartNum: 0,
        showIndex: 0,
        controlInterval: null
      }
    },
    methods: {
      init(data) {
        console.log(data)
        this.chartNum = data.dataArr.length;
        for (let i = 0; i < this.chartNum; i++) {
          setTimeout(() => {
            this.initChart(`lineChart${i}`, data.dataArr[i])
          })
        }
        this.mouseOut();
      },
      initChart(id, lineData) {
        let lineChart = this.$echarts.init(document.getElementById(id));
        lineChart.setOption(getLineOptions(lineData));
      },
      changePage(index) {
        if (index == this.showIndex) {
          return;
        }
        if (clickLimit) {
          this.$Message.info("点击频繁")
          return;
        }
        clickLimit = true;
        setTimeout(() => {
          clickLimit = false;
        }, 800)
        this.showIndex = index;
      },
      mouseOver() {
        if (!this.controlInterval) {
            return;
        }
        window.clearInterval(this.controlInterval);
        this.controlInterval = null;
      },
      mouseOut() {
        if (this.controlInterval) {
          return;
        }
        this.controlInterval = window.setInterval(()=>{
          this.showIndex = (this.showIndex + 1) % this.chartNum;
        }, 2000)
      }
    },
    mounted() {
    }
  };
</script>