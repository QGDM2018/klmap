<style lang="scss">
.myMap {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .swith {
    position: absolute;
    top: 20vh;
    left: 50%;
    font-size: 18px;
    font-weight: bold;
    transform: translateX(-50vh);
  }
  .use_tip {
    position: absolute;
    left: 0.5em;
    bottom: 1em;
    color: #fff;
    cursor: pointer;
    font-size: 23px;
    line-height: 1.3em;
    font-weight: lighter;
    font-family: "title";
    text-shadow: 2px 2px 2px #000;
    opacity: 0.3;
    transition: opacity 0.5s;
  }
  .use_tip:hover {
    opacity: 1;
  }
  .myMap1 {
    height: 100vh;
    width: 100vw;
  }
  .myMap2 {
    height: 100vh;
    width: 100vw;
  }
  .d3_tips {
    font-size: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    .left {
      display: block;
      width: 30%;
    }
    .right {
      display: block;
      width: 70%;
    }
  }
}
</style>
<template>
  <div class="myMap">
    <div class="swith">
      <i-switch v-model="showAll"></i-switch>
      <span>&nbsp;展示全部图谱</span>
    </div>
    <div class="use_tip">
      <p>· 图谱可用鼠标进行拖拽移动</p>
      <p>· 可以用鼠标滚轮对图谱进行缩放</p>
      <p>· 点击结点，可查看该节点的子图谱</p>
      <p>· 鼠标悬浮于结点，可以显示结点信息</p>
    </div>
    <svg class="myMap1" v-show="!showAll" xmlns="http://www.w3.org/2000/svg" />
    <svg class="myMap2" v-show="showAll" xmlns="http://www.w3.org/2000/svg" />
  </div>
</template>

<script>
import myMap1 from "@/utils/myMap1.js";
import myMap2 from "@/utils/myMap2.js";
export default {
  name: "myMap",
  data() {
    return {
      showAll: false
    };
  },
  methods: {},
  mounted() {
    myMap1.drawStart();
    myMap2.drawAll();
  }
};
</script>
