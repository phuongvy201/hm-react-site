import React from "react";
import { Link } from "react-router-dom";
import { urlImage } from "../config";

export default function ProductCardSm({ product }) {
  if (!product) return null;

  return (
    <div className="col-6 col-md-4 col-lg-2">
      <div className="product-box">
        <Link to={`/product/${product.slug}`} className="product-link">
          <div className="box-image">
            <img
              src={
                product.image instanceof File
                  ? URL.createObjectURL(product.image)
                  : product.image?.startsWith("http")
                  ? product.image
                  : urlImage + product.image
              }
              className="img-product"
              alt={product.name || "Product image"}
            />
          </div>
          <div className="card-body-product">
            <h5 className="product-item-title mt-2">
              {product.name || "Unnamed Product"}
            </h5>
          </div>
        </Link>
        <p>
          {product.sale ? (
            <>
              <span
                style={{ color: "#c52c29", fontSize: 16, fontWeight: 600 }}
                className="span"
              >
                $
                {product.price -
                  (product.price * product.sale.discount_value) / 100}
              </span>
              <span
                style={{ fontSize: 16, textDecoration: "line-through" }}
                className="span ms-3"
              >
                ${product.price}
              </span>
            </>
          ) : (
            <span
              style={{ color: "#c52c29", fontSize: 16, fontWeight: 600 }}
              className="span"
            >
              ${product.price}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
