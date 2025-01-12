import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import postService from "../../../service/PostService";
import { urlImage } from "../../../config";

export default function BlogDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const [post, setPost] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestPosts, setLatestPosts] = useState([]);
  const [error, setError] = useState("");
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postService.getPostBySlug(slug);
      if (response.data.success) {
        setPost(response.data.data);
        console.log(response.data.data);
        if (response.data.data?.topic?.id) {
          fetchRelatedPosts(response.data.data.topic.id);
        }
      }
    } catch (err) {
      setError("Không thể tải danh sách bài viết");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchRelatedPosts = async (topicId) => {
    try {
      const response = await postService.getRelatedPosts(slug);
      if (response.data.success) {
        const filteredPosts = response.data.data.filter(
          (p) => p.id !== post.id
        );
        setRelatedPosts(filteredPosts);
      }
    } catch (err) {
      setError("Không thể tải danh sách bài viết liên quan");
      console.error("Error:", err);
    }
  };
  const fetchLatestPosts = async () => {
    try {
      setLoading(true);
      const response = await postService.getLatestPosts();
      if (response.data.status === "success") {
        setLatestPosts(response.data.data);
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
    fetchLatestPosts();
  }, [slug]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${
      months[date.getMonth()]
    }, ${date.getDate()} ${date.getFullYear()}`;
  };
  return (
    <div className="container">
      <div className="blogdetail-breadcrumb">
        <Link to="#">Home</Link> / <Link to="#">Blog</Link> /{" "}
        <span>{post?.topic?.name}</span>
      </div>
      <div className="row">
        <div className="col-12 col-md-8 col-lg-8">
          <div className="blogdetail-title mt-5">{post?.title}</div>
          <div className="blogdetail-meta">
            <span>
              <i className="far fa-clock" /> {formatDate(post?.created_at)}
            </span>
            <span>
              <i className="fas fa-user" /> Posted by{" "}
              <Link to="#">{post?.user?.name}</Link>
            </span>
            <span>
              <i className="fas fa-folder" /> {post?.topic?.name}
            </span>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: post?.detail }}
            className="blog-content py-5"
          />
          <h1 className="blogdetail-h1 mt-4">Related articles</h1>
          <div className="row">
            {relatedPosts.map((item) => (
              <div className="col-6 col-md-6 col-lg-4 mt-4">
                <div className="blogdetail-post">
                  <img
                    alt="Illustration of a person with a review and rating stars"
                    height={200}
                    style={{ width: "100%", objectFit: "cover" }}
                    src={urlImage + item?.image}
                    width={300}
                  />
                  <div className="blogdetail-post-content">
                    <div className="blogdetail-post-title fw-semibold">
                      <Link to={`/blog/${item?.slug}`}>{item?.title}</Link>
                    </div>
                    <div className="blogdetail-post-date">
                      <i className="far fa-clock"></i> &nbsp;
                      {formatDate(item?.created_at)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-4">
          <div className="featured-articles">
            <h2>Latest articles</h2>
            {latestPosts.map((item) => (
              <div className="article">
                <img
                  alt={item?.title}
                  height={50}
                  src={urlImage + item?.image}
                  width={50}
                />
                <div className="details">
                  <Link to={`/blog/${item?.slug}`}>{item?.title}</Link>
                  <div className="date">
                    <i className="fas fa-clock"></i>
                    {formatDate(item?.created_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
