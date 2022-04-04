<template>
  <div class="container">
    <h1>WLL's Message Manager</h1>
    <div class="create-post" v-if="!loading">
      <input
        type="text"
        id="create-post"
        v-model="text"
        placeholder="Ｍessage WLL"
      />
      <button @click="createPost">Post!</button>
    </div>

    <div v-if="loading">Loading...</div>

    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container" v-if="!loading">
      <div
        class="post"
        v-for="(post, index) in posts"
        :key="post._id"
        :item="post"
        :index="index"
        @dblclick="deletePost(post._id)"
      >
        <div class="created-at">
          {{
            `${post.createdAt.getFullYear()}/${
              post.createdAt.getMonth() + 1
            }/${post.createdAt.getDate()}`
          }}
        </div>

        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService';
export default {
  name: 'Post',
  data() {
    return {
      allPosts: [],
      posts: [],
      error: '',
      text: '',
      loading: false,
    };
  },
  async created() {
    try {
      this.loading = true;
      this.allPosts = await PostService.getPosts();
      this.posts = await this.allPosts.reverse();
      this.loading = false;
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      this.loading = true;
      await PostService.insertPost(this.text);
      this.allPosts = await PostService.getPosts();
      this.posts = await this.allPosts.reverse();
      this.text = '';
      this.loading = false;
    },
    async deletePost(id) {
      this.loading = true;
      await PostService.deletePost(id);
      this.allPosts = await PostService.getPosts();
      this.posts = await this.allPosts.reverse();

      this.loading = false;
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
}
div.container {
  max-width: 70rem;
  margin: 0 auto;
}

p.error {
  background-color: #aa3a3a;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 1rem;
  color: #f4f4f4;
  font-size: 1.5rem;
}

div.post {
  position: relative;
  background-color: #a4b787;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px 10px 30px 10px;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  color: #f4f4f4;
}

div.created-at {
  position: absolute;
  top: -5;
  left: 0;
  padding: 0.5rem 1rem;
  background-color: #66806a;
  border-radius: 1rem;
  color: #eee;
  font-size: 1.2rem;
  transform: rotateZ(-6deg);
}

p.text {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0;
}
.container {
  padding-bottom: 5rem;
}
create-post {
  display: flex;
  flex-direction: column;
}
input {
  padding: 0.5rem;
  margin: 2rem auto;
  border-radius: 1rem;
  border: 1px solid #eee;
  font-size: 1.5rem;
}
input::placeholder {
  color: #a4b787;
}
button {
  background-color: #66806a;
  border-radius: 1rem;
  padding: 0.5rem;
  color: #eee;
  border: none;
  margin-left: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-bottom: 0.5rem;
}
button:hover {
  background-color: #a4b787;
}
</style>
