<style lang="scss" scoped>
.dialogCon {
  position: relative;
  height: 75vh;
  width: 40em;
  font-size: 2.5vh;
  overflow-y: auto;
  .dialog {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 1em;
    .logo {
      height: 2.5em;
      width: 2.5em;
      border-radius: 50%;
      background-position: center;
      background-repeat: no-repeat;
    }
    .message {
      margin: 0 0.5em;
      padding: 0.5em 0.8em;
      max-width: 30em;
      line-height: 1.5em;
      text-align: justify;
      border-radius: 5px;
      word-break: break-all;
    }
  }
  .left {
    flex-direction: row;
    .logo {
      background-size: 90% auto;
      background-image: url(../../../assets/plane.png);
    }
    .message {
      background-color: #fff;
    }
  }
  .right {
    flex-direction: row-reverse;
    .logo {
      background-size: 80% auto;
      background-image: url(../../../assets/qglogo.png);
    }
    .message {
      background-color: #9eea6a;
    }
  }
}
.dialogCon::-webkit-scrollbar {
  display: none;
}
</style>

<template>
  <div class="dialogCon">
    <div
      class="dialog"
      v-for="(data, index) in dialogArr"
      :key="index"
      :class="{'right': data.type=='right', 'left': data.type=='left'}"
    >
      <div class="logo"></div>
      <div class="message">{{data.message}}</div>
    </div>
    <div ref="dialogEnd"></div>
  </div>
</template>

<script>
export default {
  computed: {
    dialogArr: function() {
      return this.$store.state.dialogArr;
    }
  },
  methods: {
    scrollIntoEnd() {
      setTimeout(() => {
        this.$refs.dialogEnd.scrollIntoView();
      }, 100);
    }
  }
};
</script>

