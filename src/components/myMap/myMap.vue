<style lang="scss" scoped>
.myMap {
  height: 100%;
  width: 100%;
  overflow: hidden;
  // background: rgba(1, 1, 1, 0.1);
}
</style>
<template>
  <div class="myMap"></div>
</template>

<script>
import force from "@/utils/force.js";
export default {
  name: "myMap",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    force.init();
    force.addNodes({ id: 0, name: "民用航空", label: "民航", clicked: false });
  }
};
</script>
