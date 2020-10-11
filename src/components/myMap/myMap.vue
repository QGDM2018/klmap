<style lang="scss">
  .myMap {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;

    .swith {
      position: absolute;
      top: 20vh;
      right: 50%;
      font-size: 18px;
      font-weight: bold;
      transform: translateX(50vh);
    }

    .upload {
      display: flex;
      align-items: center;
      position: absolute;
      top: 20vh;
      left: 50%;
      height: 2em;
      line-height: 2em;
      font-size: 18px;
      font-weight: bold;
      transform: translateX(-50vh);

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
          color: #fff;
          font-weight: normal;
          font-family: 'title';
          letter-spacing: 0.1em;
        }

      }

      .info {
        position: relative;
        margin-left: 1em;

        input {
          position: absolute;
          z-index: 1;
          height: 100%;
          width: 100%;
          background-color: #f40;
          overflow: hidden;
          opacity: 0;
          border: 1px solid #000;
        }

        span {
          color: #333;
          font-size: 15px;
          font-weight: normal;
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
      <span>展示全部图谱&nbsp</span>
      <i-switch v-model="showAll"></i-switch>
    </div>
    <div class="upload">
      <div class="button" @click="sureUpload">
        <img src="../../assets/upload.png">
        <div>上传</div>
      </div>
      <div class="info">
        <input type="file" @change="upLoadFile" ref="input">
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

  let myMap_file = null;
  let isUpload = false;
  export default {
    name: "myMap",
    data() {
      return {
        showAll: false,
        upLoadInfo: '选择文件更新图谱',
      };
    },
    methods: {
      upLoadFile(e) {
        myMap_file = this.$refs.input.files[0];
        this.upLoadInfo = myMap_file.name;
      },
      sureUpload() {
        if (isUpload) {
          this.$Message.warning('正在上传，请不要频繁操作哦');
          return;
        }
        if (!myMap_file) {
          this.$Message.warning('请选择一个文件');
          return;
        }
        let formData = new window.FormData();
        formData.append("file", myMap_file, myMap_file.name);
        this.$Modal.confirm({
          title: '上传文件更新图谱',
          content: `你确定要上传文件"${myMap_file.name}"`,
          onOk: () => {

            this.httpUpload(formData);
          },
        });
      },
      httpUpload(formData) {
        isUpload = true; // 正在上传
        this.$Spin.show(); // 显示遮罩
        setTimeout(()=>{
          // 上传
          // 上传完毕后，刷新页面
          this.$Spin.hide();
          window.location.reload();

          // isUpload = false;
          // // 上传完毕
          // myMap_file = null;
          // // myMap_file 文件置空
          // this.$refs.input.value = ''
          // // input 的 file 置空
          // this.upLoadInfo = '选择文件更新图谱';
          // // 更新 info 文本提示
          // this.$Spin.hide();
          // // 关闭遮罩
          // this.$Message.info('上传成功');
        }, 1000)

      }
    },
    mounted() {
      myMap1.drawStart();
      myMap2.drawAll();
    }
  };
</script>
