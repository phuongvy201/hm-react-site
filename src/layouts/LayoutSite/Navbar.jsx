import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryService from "../../service/CategoryService";
import postService from "../../service/PostService";
const Navbar = () => {
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
    <section className="navbar">
      <div className="container justify-content-center ">
        <div className="d-flex flex-wrap align-items-center justify-content-center menu-navbar">
          <div className="navigation-box">
            <Link to="/" className="navigation-link">
              Homepage
              <span></span>
            </Link>
          </div>

          <div className="navigation-box">
            <Link to className="navigation-link">
              Categories &nbsp;
              <span>
                <i className="fa-solid fa-chevron-down small" />
              </span>
            </Link>
            <div className="navigation-content ">
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
              {categories.map((category) => (
                <div className="navigation-item">
                  <Link to={`/category/${category.slug}`}>{category.name}</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="navigation-box">
            <Link to="/products" className="navigation-link">
              Products
            </Link>
          </div>

          <div className="navigation-box">
            <Link to className="navigation-link">
              Help Center &nbsp;
              <span>
                <i className="fa-solid fa-chevron-down small" />
              </span>
            </Link>
            <div className="navigation-content ">
              {pages.map((page) => (
                <div className="navigation-item">
                  <Link to={`/page/${page.slug}`}>{page.title}</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="navigation-box">
            <Link to className="navigation-link">
              Blog &nbsp;
              <span>
                <i className="fa-solid fa-chevron-down small" />
              </span>
            </Link>

            <div className="navigation-content ">
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
              {topics.map((topic) => (
                <div className="navigation-item">
                  <Link to={`/topic/${topic.slug}`}>{topic.name}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
