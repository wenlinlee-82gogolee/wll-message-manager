<template>
  <div class="note">
    <Post />
    <Footer />
  </div>
</template>

<script>
import Post from './components/Post.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Post,
    Footer,
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
  background-color: #132c33;
  color: #d8e3e7;
}
.note {
  min-height: 100vh;
}
/* width */
::-webkit-scrollbar {
  width: 0.5rem;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px #ffd124;
  border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #ffd124;
  border-radius: 0.5rem;
}
</style>
