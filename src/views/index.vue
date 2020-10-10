<style lang="scss" scoped>

</style>

<template>
  <div class="index">
      <search v-show='indexType=="search"'></search>
      <myMap v-show='indexType=="myMap"'></myMap>
      <myChart v-show='indexType=="myChart"'></myChart>
  </div>
</template>

<script>
import search from '@/components/search/search.vue';
import myMap from '@/components/myMap/myMap.vue';
import myChart from '@/components/myChart/myChart.vue';
export default {
  components: {
      search,
      myMap,
      myChart
  },
  computed: {
    indexType: function() {
      return this.$store.state.indexType;
    }
  }
};
</script>

