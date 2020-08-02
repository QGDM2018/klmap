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
  methods: {
    click() {},
    add() {}
  },
  mounted() {
    if (!force.ifInit) {
      force.init();
      force.addNodes({ name: "test", id: "1"});
      force.addNodes({ name: "test2", id: "2"});
      force.addNodes({ name: "test3", id: "3", source: 0 });
      force.addEdges({ source: 0, target: 1, relation: "2" });
      force.addEdges({ source: 0, target: 2, relation: "3" });
    }
  }
};
</script>
