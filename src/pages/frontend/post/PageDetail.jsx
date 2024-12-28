import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import postService from "../../../service/PostService";
import { urlImage } from "../../../config";

export default function PageDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState([]);
  const [otherPages, setOtherPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latestPosts, setLatestPosts] = useState([]);
  const [error, setError] = useState("");
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postService.getPageBySlug(slug);
      if (response.data.success) {
        setPost(response.data.data);
        console.log(response.data.data);
      }
    } catch (err) {
      setError("Không thể tải danh sách bài viết");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchOtherPages = async () => {
    try {
      setLoading(true);
      const response = await postService.getOtherPages(slug);
      if (response.data.success) {
        setOtherPages(response.data.data);
        console.log(response.data.data);
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
    fetchOtherPages();
  }, [slug]);
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
        <span>{post?.title}</span>
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
        </div>
        <div className="col-12 col-md-4 col-lg-4 mt-5">
          <div className="featured-articles">
            <h2>Other articles</h2>
            {otherPages.map((item) => (
              <div className="article">
                <div className="details">
                  <Link to={`/page/${item?.slug}`}>{item?.title}</Link>
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
