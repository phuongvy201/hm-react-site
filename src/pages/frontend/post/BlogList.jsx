import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import postService from "../../../service/PostService";
import { urlImage } from "../../../config";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postService.getPostsByTopic(slug, currentPage);
      if (response.data.success) {
        setPosts(response.data.data.items);
        setTotalPages(response.data.data.pagination.last_page);
      }
    } catch (err) {
      setError("Không thể tải danh sách bài viết");
      console.error("Error:", err);
    } finally {
      setLoading(false);
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
  }, [slug, currentPage]);
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
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <Link
            key={i}
            to="#"
            className={currentPage === i ? "active" : ""}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Link>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <span key={i} className="dots">
            ...
          </span>
        );
      }
    }
    return pages;
  };
  return (
    <div className="container py-5">
      <div className="container-blog">
        <div className="row">
          <h4 className="gift-title ">Gift Ideas</h4>
          <div className="col-12 col-md-8 col-lg-8 row my-3">
            {posts.map((post) => (
              <div className="col-6 col-md-6 col-lg-4">
                <div className="gift-grid">
                  <div className="gift-card">
                    <img
                      alt="Thanksgiving dinner with text 'THANKS GIVING'"
                      height={250}
                      src={urlImage + post.image}
                      style={{ objectFit: "cover", width: "100%" }}
                    />
                    <div className="gift-card-content">
                      <div className="gift-category">
                        <Link to={`/blog/${post.topic.slug}`}>
                          {post.topic.name}
                        </Link>
                      </div>
                      <h2 className="gift-heading">
                        <Link
                          className="text-decoration-none text-dark"
                          to={`/blog/${post.slug}`}
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <div className="gift-meta small">
                        <span>
                          <i className="far fa-clock" />
                          {formatDate(post.created_at)}
                        </span>
                        <span>Posted by {post.user.name}</span>
                      </div>
                    </div>
                  </div>
                  {/* Repeat other cards here */}
                </div>
              </div>
            ))}

            <div className="blog-pagination-container">
              <hr />
              <div className="blog-pagination">
                <Link
                  to="#"
                  className="arrow"
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                >
                  ←
                </Link>
                {renderPagination()}
                <Link
                  to="#"
                  className="arrow"
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                >
                  →
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-4  ">
            <div className="featured-articles">
              <h2>Lastest Articles</h2>
              {latestPosts.map((post) => (
                <div className="article">
                  <img
                    alt={post.title}
                    height={50}
                    src={urlImage + post.image}
                    width={50}
                  />
                  <div className="details">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    <div className="date">
                      <i className="fas fa-clock"></i>
                      {formatDate(post.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
