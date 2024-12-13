import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <section style={{ backgroundColor: "#2f466c" }} className="footer mt-5">
      <div className="container">
        <div className="policy-wrapper py-4">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="d-flex flex-row mb-3">
                <div className="p-2 d-flex justify-content-center align-items-center">
                  <Link to="#">
                    <img
                      className="img-fluid"
                      src="https://printerval.com/assets/images/support/shipping-2.svg?v=20241028070512"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="p-2 d-flex flex-column mt-2">
                  <div className="p-2 ">
                    <b>Worldwide Shipping</b>
                    <p>Available as Standard or Express delivery</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="d-flex flex-row mb-3">
                <div className="p-2 d-flex justify-content-center align-items-center">
                  <Link to="#">
                    <img
                      className="img-fluid"
                      src="https://printerval.com/assets/images/support/security-3.svg?v=20241028070512"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="p-2 d-flex flex-column mt-2">
                  <div className="p-2 ">
                    <b>Secure Payments</b>
                    <p>100% Secure payment with 256-bit SSL Encryption</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="d-flex flex-row mb-3">
                <div className="p-2 d-flex justify-content-center align-items-center">
                  <Link to="#">
                    <img
                      className="img-fluid"
                      src="https://printerval.com/assets/images/support/free-return-2.svg?v=20241028070512"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="p-2 d-flex flex-column mt-2">
                  <div className="p-2 ">
                    <b>Free Return</b>
                    <p>Exchange or money back guarantee for all orders</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="d-flex flex-row mb-3">
                <div className="p-2 d-flex justify-content-center align-items-center">
                  <Link to="#">
                    <img
                      className="img-fluid"
                      src="https://printerval.com/assets/images/support/support-2.svg?v=20241028070512"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="p-2 d-flex flex-column mt-2">
                  <div className="p-2 ">
                    <b>Local Support</b>
                    <p>24/7 Dedicated support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-nav-list ">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="p-2 footer-logo">
                <img
                  className="img-fluid"
                  style={{ color: "#DDFFBB" }}
                  src="./public/img/logo.svg"
                  alt="logo"
                />
              </div>
              <div style={{ color: "white" }} className="p-2 mt-2">
                <p>
                  Printerval.com is an global online marketplace, where people
                  come together to make, sell, buy, and collect unique items.
                  There’s no Printerval warehouse – just independent sellers
                  selling the things they love. We make the whole process easy,
                  helping you connect directly with makers to find something
                  extraordinary.
                </p>
              </div>
              <div style={{ color: "white" }} className="p-2">
                <h5>Follow us:</h5>
                <div className="d-flex flex-row mb-3">
                  <div className="p-2">
                    <Link to="#">
                      <img
                        src="https://printerval.com/assets/images/social/facebook.svg?v=31102023"
                        alt="facebook"
                      />
                    </Link>
                  </div>

                  <div className="p-2">
                    <Link to="#">
                      <img
                        src="https://printerval.com/assets/images/social/instagram.svg?v=31102023"
                        alt="facebook"
                      />
                    </Link>
                  </div>
                  <div className="p-2">
                    <Link to="#">
                      <img
                        src="https://printerval.com/assets/images/social/youtube.svg?v=31102023"
                        alt="facebook"
                      />
                    </Link>
                  </div>
                  <div className="p-2">
                    <Link to="#">
                      <img
                        src="https://printerval.com/assets/images/social/tiktok.svg?v=31102023"
                        alt="facebook"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3 col-lg-3 single-page mt-3">
              <div className="d-flex flex-column mb-3">
                <div className="p-2 title-single-page">Company</div>
                <div className="p-2">
                  <Link to="#">About Us</Link>
                </div>
                <div className="p-2">
                  <Link to="#">Privacy Policy</Link>
                </div>
                <div className="p-2">
                  <Link to="#">Terms of Service</Link>
                </div>
                <div className="p-2">
                  <Link to="#">Payment methods</Link>
                </div>
                <div className="p-2">
                  <Link to="#">Contact Us</Link>
                </div>
                <div className="p-2">
                  <Link to="#">Help Center</Link>
                </div>
                <div className="p-2">
                  <Link to="#">Sitemap</Link>
                </div>
                <div className="p-2">
                  <Link to="#">Blog</Link>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3 col-lg-3 single-page mt-3">
              <div className="d-flex flex-column mb-3">
                <div className="p-2 title-single-page">Company</div>
                <div className="p-2">
                  <Link to="#">About Us</Link>
                </div>
                <div className="p-2">
                  <Link to="#">Privacy Policy</Link>
                </div>
                <div className="p-2">
                  <Link to="#">Terms of Service</Link>
                </div>
                <div className="p-2">
                  <Link to="#">Payment methods</Link>
                </div>
                <div className="p-2">
                  <Link to="#">Contact Us</Link>
                </div>
                <div className="p-2">
                  <Link to="#">Help Center</Link>
                </div>
                <div className="p-2">
                  <Link to="#">Sitemap</Link>
                </div>
                <div className="p-2">
                  <Link to="#">Blog</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
