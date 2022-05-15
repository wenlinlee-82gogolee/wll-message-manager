<template>
  <div class="container">
    <h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
      >
        <path
          d="M10 13h-4v-1h4v1zm2.318-4.288l3.301 3.299-4.369.989 1.068-4.288zm11.682-5.062l-7.268 7.353-3.401-3.402 7.267-7.352 3.402 3.401zm-6 8.916v.977c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362v-20h14.056l1.977-2h-18.033v24h10.189c3.163 0 9.811-7.223 9.811-9.614v-3.843l-2 2.023z"
        /></svg
      >Quick Note
    </h1>
    <p class="error" v-if="error">Error: {{ error }}</p>
    <div class="create-post" v-if="!loading">
      <textarea
        id="create-post"
        v-model="text"
        placeholder="add a note"
      ></textarea>

      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          @click="createPost"
        >
          <path
            d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
            fill-rule="nonzero"
          />
        </svg>
      </div>
    </div>

    <div v-if="loading" class="loading">Data Loading...</div>

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
          {{ ` ${post.createdAt.getHours()}:${post.createdAt.getMinutes()}` }}
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
  margin-bottom: 4rem;
}
div.container {
  max-width: 50rem;
  margin: 0 auto;
}

p.error {
  background-color: #aa3a3a;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 1rem;
  color: #d8e3e7;
  font-size: 1.5rem;
}

div.post {
  position: relative;
  border: 2px solid #ffd124;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  color: #d8e3e7;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;
  color: #66806a;
  font-size: 1rem;
  font-weight: 700;
}

p.text {
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 1.5rem;
  word-wrap: break-word;
  text-align: left;
}
.container {
  padding-bottom: 5rem;
  max-width: 50rem;
}
.create-post {
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.create-post svg {
  fill: #d8e3e7;
  cursor: pointer;
}
textarea {
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid #d8e3e7;
  font-size: 1.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  outline: none;
  resize: none;
  color: #66806a;
  background-color: #d8e3e7;
  word-wrap: break-word;
  max-width: 80%;
  margin: 0 auto;
  margin-bottom: 0.5rem;
}
textarea::placeholder {
  color: #a4b787;
  font-size: 1rem;
}

h1 svg {
  fill: #d8e3e7;
}
.loading {
  font-size: 2rem;
  margin-top: 10rem;
  color: #ffd124;
  min-height: 100vh;
}
</style>
