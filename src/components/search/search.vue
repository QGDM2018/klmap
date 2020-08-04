<style lang="scss" scoped>
.search {
  position: relative;
  margin: 18vh auto 0 auto;
  height: 82vh;
  width: 25em;
  font-size: 4vh;
  position: relative;
  background: rgba(0, 0, 0, 0.1);
  .bottom {
    display: flex;
    justify-content: space-between;
    height: 6vh;
    // font-size: 20px;
    border-bottom: 5px solid #000;
    input {
      background: none;
      outline: none;
      border: none;
      color: #fff;
      width: 80%;
      font-size: 2.5vh;
      text-indent: 1em;
    }
    input::-webkit-input-placeholder {
      color: #ccc;
    }
    .sure {
      position: relative;
      height: 6vh;
      padding: 0 1em 0 0.5em;
      line-height: 6vh;
      color: #fff;
      font-size: 4vh;
      cursor: pointer;
      font-family: "title";
      background: #000;
    }
    .sure::before {
      content: "";
      position: absolute;
      z-index: 100;
      top: 0;
      left: -1.6em;
      border-width: 6vh 1.6em 0 0;
      border-style: solid;
      border-color: transparent #000;
    }
  }
}
</style>

<template>
  <div class="search">
    <dialogCon class="dialogCon" ref="dialogCon"></dialogCon>
    <div class="bottom">
      <input type="text" placeholder="请输入你想查询的语句" v-model="inputStr" @keyup.enter="send" />
      <div class="sure" @click="send">发送</div>
    </div>
  </div>
</template>

<script>
import dialogCon from "./dialogCon/dialogCon.vue";
export default {
  data() {
    return {
      inputStr: ""
    };
  },
  methods: {
    send() {
      // 发送信息
      let sendStr = this.inputStr.replace(/\s*/g, "");
      if (!sendStr) {
        this.$Message.warning("输入不能为空");
        return;
      }
      this.$store.commit("addDiaLog", {
        type: "right",
        message: sendStr
      });
      this.$refs.dialogCon.scrollIntoEnd();
      this.inputStr = "";
      this.reply(sendStr);
    },
    reply(sendStr) {
      // 回复信息
      this.$axios
        .post(this.$httpUrl + "/qa/", {
          question: sendStr
        })
        .then(res => {
          if (res.data.code == 100) {
            this.$store.commit("addDiaLog", {
              type: "left",
              message: res.data.data.answer
            });
            this.$refs.dialogCon.scrollIntoEnd();
          } else {
            this.$Message.warning(res.data.msg);
          }
        });
    }
  },
  components: {
    dialogCon
  }
};
</script>
