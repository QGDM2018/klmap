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

    .upload {
      display: flex;
      align-items: center;
      position: absolute;
      top: 20vh;
      right: 50%;
      height: 2em;
      line-height: 2em;
      font-size: 18px;
      font-weight: bold;
      transform: translateX(50vh);
      .button {
        display: flex;
        cursor: pointer;
        align-items: center;
        padding: 0 0.5em;
        background-color: #000;
        img {
          width: 1.5em;
        }
        div {
          margin-left: 0.3em;
          font-size: 0.9em;
          color: #fff;
        }

      }
      .info {
        position: relative;
        input {
          position: absolute;
          z-index: 1;
          height: 100%;
          width: 100%;
          background-color: #f40;
          overflow: hidden;
          opacity: 0.3;
        }
        span {
          line-height: 1.5em;
          color: #666;
        }
      }
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
    <div class="upload">
      <div class="button" @click="sureUpload">
        <img src="../../assets/upload.png">
        <div>上传</div>
      </div>
      <div class="info">
        <input type="file" @change="upLoadFile">
        <span>{{upLoadInfo}}</span>
      </div>
    </div>
    <div class="use_tip">
      <p>· 图谱可用鼠标进行拖拽移动</p>
      <p>· 可以用鼠标滚轮对图谱进行缩放</p>
      <p>· 点击结点，可查看该节点的子图谱</p>
      <p>· 鼠标悬浮于结点，可以显示结点信息</p>
    </div>
    <svg class="myMap1" v-show="!showAll" xmlns="http://www.w3.org/2000/svg"/>
    <svg class="myMap2" v-show="showAll" xmlns="http://www.w3.org/2000/svg"/>
  </div>
</template>

<script>
  import myMap1 from "@/utils/myMap1.js";
  import myMap2 from "@/utils/myMap2.js";
  export default {
    name: "myMap",
    data() {
      return {
        showAll: false,
        upLoadInfo: '上传文件更新图谱',
      };
    },
    methods: {
      upLoadFile() {
        let file = e.target.files[0];
        // 校验文件类型
        let judgeResult = this.judgeFile(file);
        if (judgeResult !== 'OK') {
          this.$Modal.warning({
            title: "错误提示",
            content: judgeResult
          });
          e.target.value = "";
          return;
        } else {
          // 校验成功，放入formdata
          let formData = new window.FormData();
          formData.append("file", file, file.name);
        }
        // 清空input
        e.target.value = "";
      },
      sureUpload() {

      }
    },
    mounted() {
      // myMap1.drawStart();
      // myMap2.drawAll();
    }
  };
</script>
