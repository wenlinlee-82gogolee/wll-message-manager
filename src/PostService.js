import axios from 'axios';

const url = 'http://localhost:3000/api/posts/';

//static means we dont need to create a instance in order to use the class
class PostService {
  //get Posts
  static getPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt),
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  //create posts
  static insertPost(text) {
    return axios.post(url, { text });
  }
  //delete posts
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
