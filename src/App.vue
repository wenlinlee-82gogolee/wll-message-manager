<template>
  <Post />
</template>

<script>
import Post from './components/Post.vue';

export default {
  name: 'App',
  components: {
    Post,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 3rem;
}
body {
  background-color: #f4f4f4;
  color: #66806a;
}
</style>
