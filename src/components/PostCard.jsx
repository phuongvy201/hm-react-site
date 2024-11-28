import React from "react";
import { urlImage } from "../config";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="col-6 col-md-6 col-lg-4">
      <div className="d-flex flex-column mb-3">
        <div className="py-2">
          <img
            className="img-fluid"
            src={urlImage + post.image}
            alt="picture.png"
          />
        </div>
        <div className="">
          <Link style={{ fontSize: 16 }} to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </div>
        <div className="">
          <p>{post.description}</p>
        </div>
        <div className="">
          <Link
            className="text-decoration-none btn-title-topic text-success"
            to="#"
          >
            {post.topic.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
