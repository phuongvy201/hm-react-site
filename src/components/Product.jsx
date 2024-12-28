import React from "react";
import { Link } from "react-router-dom";
import { urlImage } from "../config";

export default function Product({ product }) {
  if (!product) return null;

  return (
    <div className="col-6 col-md-6 col-lg-3">
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
              style={{ objectFit: "cover", width: "100%",  }} // Thêm thuộc tính object-fit
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
                {parseFloat(
                  product.price -
                    (product.price * product.sale.discount_value) / 100
                ).toFixed(2)}
              </span>
              <span
                style={{ fontSize: 16, textDecoration: "line-through" }}
                className="span ms-3"
              >
                ${parseFloat(product.price).toFixed(2)}
              </span>
            </>
          ) : (
            <span
              style={{ color: "#c52c29", fontSize: 16, fontWeight: 600 }}
              className="span"
            >
              ${parseFloat(product.price).toFixed(2)}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
