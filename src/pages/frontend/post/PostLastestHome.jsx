import React, { useState, useEffect } from "react";
import postService from "../../../service/PostService";
import PostCard from "../../../components/PostCard";

export default function PostLastestHome() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postService.getLatestPosts();
      if (response.data.status === "success") {
        setPosts(response.data.data);
      }
    } catch (err) {
      setError("Không thể tải danh sách bài viết");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="container">
      <div className="blog">
        <h4 className="component-heading">Fresh from the blog</h4>
        <div className="row">
          {posts.map((post) => (
           <PostCard post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
