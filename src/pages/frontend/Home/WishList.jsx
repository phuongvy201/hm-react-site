import React from "react";

export default function WishList() {
  return (
    <div className="container my-5">
      <h4>Wishlist</h4>
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="wishlist-product-card">
            <button className="wishlist-close-btn">
              <i className="fas fa-times"></i>
            </button>
            <img
              alt="Spirits Nothing More T-Shirts"
              height={300}
              src="https://storage.googleapis.com/a1aa/image/RllaS6K1FYY1NhPDptT3oepaNKzjMrIwctHqAFvikDf0rgsTA.jpg"
              width={300}
            />
            <div className="wishlist-product-info">
              <p className="roboto-medium">Spirits Nothing More T-Shirts</p>
              <p>By whetstone</p>
              <p>Black, Size: S, Men, Heavyweight</p>
              <p className="wishlist-price fw-medium">
                $13.95
                <span className="wishlist-original-price">$27.90</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
