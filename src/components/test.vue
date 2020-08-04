<template>
  <div class="ttttt">
    {{data}}
    <button @click="fun">点击按钮</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: ""
    };
  },
  methods: {
    fun() {
      fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.data = json;
        });
    }
  }
};
</script>

