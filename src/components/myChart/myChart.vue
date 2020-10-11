<style lang="scss" scoped>
  .myChart {
    position: relative;
    height: 100vh;
    width: 100vw;
    #barChart {
      position: absolute;
      top: 5vh;
      right: 1em;
      height: 30em;
      width: 28em;
    }
    #pieChart {
      position: absolute;
      top: 10vh;
      left: 1em;
      height: 25em;
      width: 40em;
    }
  }
</style>

<template>
  <div class="myChart">
    <div id="barChart"></div>
    <div id="pieChart"></div>
    <lineArr ref="lineArr"></lineArr>
  </div>
</template>

<script>
  import {getBarOptions, getPieOptions, testData} from "./getChartOptions";
  import lineArr from "./lineArr/lineArr";

  export default {
    components: {
      lineArr
    },
    mounted() {
      this.getData();
    },
    data() {
      return {
      }
    },
    methods: {
      getData() {
        setTimeout(()=>{
          this.initBar(testData.bar);
          this.initPie(testData.pie);
          this.initLineArr(testData.lineArr);
        }, 1000);
      },
      initBar(barData) {
        let barChart = this.$echarts.init(document.getElementById('barChart'));
        barChart.setOption(getBarOptions(barData));
      },
      initPie(pieData) {
        let pieChart = this.$echarts.init(document.getElementById('pieChart'));
        pieChart.setOption(getPieOptions(pieData));
      },
      initLineArr(lineArrDate) {
        this.$refs.lineArr.init(lineArrDate)
      }
    }
  };
</script>