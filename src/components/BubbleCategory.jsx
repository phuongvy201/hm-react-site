import React from "react";
import { Link } from "react-router-dom";

export default function BubbleCategory() {
  return (
    <div className="category-bubble container">
      <div
        className="d-flex flex-row justify-content-start overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://cdn.printerval.com/unsafe/960x960/asset.prtvstatic.com/printerval-mirror/2023-09-27/1e8cc6533c9825e5a2b0f66aea861ebc_1948.jpg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">Christmas Gifts</div>
          </Link>
        </div>
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://cdn.printerval.com/unsafe/960x0/asset.prtvstatic.com/2024/10/31/thanksgiving-day-49f9cf01b226fe60d6e5d076abe92ad6.jpg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">Thanksgiving Day</div>
          </Link>
        </div>
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://cdn.printerval.com/unsafe/960x960/asset.prtvstatic.com/2024/03/16/bella-canvas-tee-mockup-of-a-man-and-his-father-posing-in-a-camping-decorated-setting-m34977-aba4b961b83e072ac1ae61ea39f00199.png"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">
              Disney Vacation 2024
            </div>
          </Link>
        </div>
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://cdn.printerval.com/image/540x540/socks-1,black,print-2024-08-20_7ad0afd9-f20f-436d-8ac3-af2375040f95,2d2d2d.jpeg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">Trump</div>
          </Link>
        </div>
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2024/05/28/432659c519f14adcc292cb2c0ad8e9f1.jpg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">Baseball Jersey</div>
          </Link>
        </div>
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2023/11/23/1f55118bb6dcf23f44a62db56392d7d7-248a421e59c9569df36a6e64cbf8193e.jpg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">3D Sweater</div>
          </Link>
        </div>
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://cdn.printerval.com/unsafe/540x540/asset.prtvstatic.com/2024/11/01/pullover-hoodie-mockup-featuring-an-autumn-outfit-m1272-049d2b3292c711914b30c3ab0d7016d0.png"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">Hoodie</div>
          </Link>
        </div>
        <div className="p-2">
          <Link to="#" className="text-decoration-none text-dark small">
            <div className="d-flex justify-content-center">
              <img
                className="rounded-circle"
                src="https://cdn.printerval.com/unsafe/540x540/storage.googleapis.com/printerval-us/2022/01/08/premium-matte-vertical-posters-cb5db98c1a81f0953f09b52faaa1955f.jpg"
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="text-center p-3 fw-semibold">
              Premium Poster Vertical Posters
            </div>
          </Link>
        </div>
      </div>
      <style>
        {`
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
