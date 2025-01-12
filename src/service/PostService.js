import httpAxios from "../httpAxios";

const postService = {
  getPosts: () => {
    return httpAxios.get(`/posts`);
  },
  getLatestPosts: () => {
    return httpAxios.get(`/posts/latest`);
  },
  getAllTopics: () => {
    return httpAxios.get(`/topics`);
  },
  getPostsByTopic: (slug, page) => {
    return httpAxios.get(`/posts/topic/${slug}?page=${page}`);
  },
  getPostBySlug: (slug) => {
    return httpAxios.get(`/post/slug/${slug}`);
  },
  getRelatedPosts: (slug) => {
    return httpAxios.get(`/posts/related/${slug}`);
  },
  getPages: () => {
    return httpAxios.get(`/posts/pages`);
  },
  getPageBySlug: (slug) => {
    return httpAxios.get(`/post/page/${slug}`);
  },
  getOtherPages: (slug) => {
    return httpAxios.get(`/posts/other-pages/${slug}`);
  },
};

export default postService;
