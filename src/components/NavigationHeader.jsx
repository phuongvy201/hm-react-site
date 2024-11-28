import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import postService from "../service/PostService";
import categoryService from "../service/CategoryService";

export default function NavigationHeader() {
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState("");
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getAllParentCategories();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (err) {
      setError("Không thể tải danh sách danh mục");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await postService.getAllTopics();
      if (response.data.success) {
        setTopics(response.data.data);
      }
    } catch (err) {
      setError("Không thể tải danh sách chủ đề");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await postService.getPages();
      if (response.data.success) {
        setPages(response.data.data);
      }
    } catch (err) {
      setError("Không thể tải danh sách trang");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchTopics();
    fetchPages();
  }, []);
  return (
    <div className="col-1 d-flex justify-content-center d-sm-none">
      <button
        className="btn-header-navigation-mobile"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <img
          className=""
          height={25}
          src="https://cdn-icons-png.flaticon.com/128/10513/10513594.png"
          alt="listmenu"
        />
      </button>
      <div
        className="offcanvas offcanvas-start w-75"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <div className="header-mobile">
            <div className="logo-mobile">
              <img
                alt="Printerval logo"
                height={50}
                src="./public/img/logo.svg"
                width={150}
              />
            </div>
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <ul className="item-list-mobile">
            <li className="item-list-group-mobile">
              <div className="icon-wrapper-mobile icon-pink">
                <i className="fas fa-box" />
              </div>
              <div className="item-text-mobile">
                <Link to="#">Order Tracking</Link>
              </div>
            </li>
            <li className="item-list-group-mobile">
              <div className="icon-wrapper-mobile icon-green">
                <i className="fas fa-box" />
              </div>
              <div className="item-text-mobile">
                <Link to="/products">Products</Link>
              </div>
            </li>
            <li className="item-list-group-mobile">
              <div className="icon-wrapper-mobile icon-green">
                <i className="fas fa-tags" />
              </div>
              <div className="item-text-mobile dropdown">
                <span
                  className="d-flex align-items-center"
                  data-bs-toggle="collapse"
                  data-bs-target="#categoriesSubmenu"
                  aria-expanded="false"
                >
                  Categories
                  <i className="fas fa-chevron-down ms-2"></i>
                </span>
                <div className="collapse" id="categoriesSubmenu">
                  <ul className="submenu-list">
                    {categories.map((category) => (
                      <li>
                        <Link to={`/category/${category?.slug}`}>
                          {category?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
            <li className="item-list-group-mobile">
              <div className="icon-wrapper-mobile icon-pink">
                <i className="fas fa-gift" />
              </div>
              <div className="item-text-mobile">
                <Link to="#">Gift Guides</Link>
              </div>
            </li>
            <li className="item-list-group-mobile">
              <div className="icon-wrapper-mobile icon-pink">
                <i className="fas fa-tree" />
              </div>
              <div className="item-text-mobile">
                <Link to="#">Christmas</Link>
              </div>
            </li>
            <li className="item-list-group-mobile">
              <div className="icon-wrapper-mobile icon-green">
                <i className="fas fa-question-circle" />
              </div>
              <div className="item-text-mobile dropdown">
                <span
                  className="d-flex align-items-center"
                  data-bs-toggle="collapse"
                  data-bs-target="#helpCenterSubmenu"
                  aria-expanded="false"
                >
                  Help Center
                  <i className="fas fa-chevron-down ms-2"></i>
                </span>
                <div className="collapse" id="helpCenterSubmenu">
                  <ul className="submenu-list">
                    {pages.map((page) => (
                      <li>
                        <Link to={`/page/${page?.slug}`}>{page?.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
            <li className="item-list-group-mobile">
              <div className="icon-wrapper-mobile icon-green">
                <i className="fas fa-blog" />
              </div>
              <div className="item-text-mobile dropdown">
                <span
                  className="d-flex align-items-center"
                  data-bs-toggle="collapse"
                  data-bs-target="#blogsSubmenu"
                  aria-expanded="false"
                >
                  Blogs
                  <i className="fas fa-chevron-down ms-2"></i>
                </span>
                <div className="collapse" id="blogsSubmenu">
                  <ul className="submenu-list">
                    {topics.map((topic) => (
                      <li>
                        <Link to={`/topic/${topic?.slug}`}>
                          {topic?.name}
                        </Link>
                      </li>
                    ))}
                  
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
