import { Link } from "react-router-dom";
import logo from "../../assets/imgs/bluprinter logo.png";
const Footer = () => {
  return (
    <section style={{ backgroundColor: "#2f466c" }} className="footer">
      <div className="container">
        <div className="policy-wrapper py-4">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="d-flex flex-row mb-3">
                <div className="p-2 d-flex justify-content-center align-items-center">
                  <Link to="/shipping-delivery">
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
                  <Link to="/security-payment">
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
                  <Link to="/page/free-return">
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
                  <Link to="/page/local-support">
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
            <div className="col-12 col-md-4 col-lg-4">
              <div className="p-2 footer-logo">
                <img
                  className="img-fluid"
                  style={{ color: "#DDFFBB" }}
                  src={logo}
                  alt="logo"
                />
              </div>
              <div style={{ color: "white" }} className="p-2 mt-2">
                <p>
                  Bluprinter.com is a global online marketplace, where people
                  come together to make, sell, buy, and collect unique items.
                  There’s no Bluprinter warehouse – just independent sellers
                  selling the things they love. We make the whole process easy,
                  helping you connect directly with makers to find something
                  extraordinary.
                </p>
              </div>
              <div style={{ color: "white" }} className="p-2">
                <h5>Follow us:</h5>
                <div className="d-flex flex-row mb-3">
                  <div className="p-2">
                    <Link to="https://www.facebook.com/profile.php?id=61571564261584">
                      <img
                        className="img-fluid"
                        src="https://printerval.com/assets/images/social/facebook.svg?v=31102023"
                        alt="facebook"
                      />
                    </Link>
                  </div>
                  <div className="p-2">
                    <Link to="https://www.instagram.com/blu.printer">
                      <img
                        className="img-fluid"
                        src="https://printerval.com/assets/images/social/instagram.svg?v=31102023"
                        alt="instagram"
                      />
                    </Link>
                  </div>
                  <div className="p-2">
                    <Link to="https://www.youtube.com/@BLUPRINTER">
                      <img
                        className="img-fluid"
                        src="https://printerval.com/assets/images/social/youtube.svg?v=31102023"
                        alt="youtube"
                      />
                    </Link>
                  </div>
                  <div className="p-2">
                    <Link to="https://www.tiktok.com/@blu.printer">
                      <img
                        className="img-fluid"
                        src="https://printerval.com/assets/images/social/tiktok.svg?v=31102023"
                        alt="tiktok"
                      />
                    </Link>
                  </div>
                  <div className="p-2">
                    <Link to="https://www.pinterest.com/bluprinter/">
                      <img
                        className="img-fluid"
                        src="https://printerval.com/assets/images/social/pinterest.svg?v=31102023"
                        alt="pinterest"
                      />
                    </Link>
                  </div>
                  <div className="p-2">
                    <Link to="https://x.com/Bluprinter25">
                      <img
                        className="img-fluid"
                        src="https://printerval.com/assets/images/social/twitter.svg?v=31102023"
                        alt="twitter"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-2 col-lg-2 single-page mt-3">
              <div className="d-flex flex-column mb-3">
                <div className="p-2 title-single-page">Company</div>
                <div className="p-2">
                  <Link to="/page/about-us">About Us</Link>
                </div>
                <div className="p-2">
                  <Link to="/page/privacy-policy">Privacy Policy</Link>
                </div>
                <div className="p-2">
                  <Link to="/page/terms-of-service">Terms of Service</Link>
                </div>
                <div className="p-2">
                  <Link to="/page/secure-payments">Secure Payments</Link>
                </div>
                <div className="p-2">
                  <Link to="/contact-us">Contact Us</Link>
                </div>
                <div className="p-2">
                  <Link to="/help-center">Help Center</Link>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-2 col-lg-2 single-page mt-3">
              <div className="d-flex flex-column mb-3">
                <div className="p-2 title-single-page">Get Help</div>

                <div className="p-2">
                  <Link to="/page/faqs">FAQs</Link>
                </div>
                <div className="p-2">
                  <Link to="/order-tracking">Order Tracking</Link>
                </div>
                <div className="p-2">
                  <Link to="/shipping-delivery">Shipping & Delivery</Link>
                </div>
                <div className="p-2">
                  <Link to="/page/cancelchange-order">Cancel/Change Order</Link>
                </div>
                <div className="p-2">
                  <Link to="/page/refund-policy">Refund Policy</Link>
                </div>
                <div className="p-2">
                  <Link to="/page/returns-exchanges-policy">
                    Returns & Exchanges Policy
                  </Link>
                </div>
                <div className="p-2">
                  <Link to="/page/dmca">DMCA</Link>
                </div>
                <div className="p-2">
                  <Link to="/page/our-intellectual-property-policy">
                    Our Intellectual Property Policy
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-2 col-lg-2 single-page mt-3">
              <div className="d-flex flex-column mb-3">
                <div className="p-2 title-single-page">Shop</div>

                <div className="p-2">
                  <Link to="/bulk-order">Bulk Order</Link>
                </div>
                <div className="p-2">
                  <Link to="/promo-code">Promo Code</Link>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-2 col-lg-2 single-page mt-3">
              <div className="d-flex flex-column mb-3">
                <div className="p-2">
                  <Link to="https://www.dmca.com/Protection/Status.aspx?id=7afce096-ea62-47a0-8c3b-a3fbd663bf4d&refurl=https%3a%2f%2fbluprinter.com%2f&rlo=true">
                    <img
                      src="https://images.dmca.com/Badges/DMCA_logo-grn-btn150w.png?ID=005e124c-c682-4f1d-a564-1bc657921504"
                      alt="logo"
                    />
                  </Link>
                </div>

                {/* Trustpilot Widget */}
                <div className="p-2 ">
                  <div
                    className="trustpilot-widget"
                    data-locale="en-US"
                    data-template-id="56278e9abfbbba0bdcd568bc"
                    data-businessunit-id="678110cc4775333e5320365e"
                    data-style-height="52px"
                    data-style-width="100%"
                  >
                    <Link
                      to="https://www.trustpilot.com/review/bluprinter.com"
                      target="_blank"
                      rel="noopener"
                    >
                      Trustpilot
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-12">
              <div
                style={{
                  color: "white",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <h5>Never miss out on a moment</h5>
                <p>
                  Stay updated with the latest trends, exclusive offers, and
                  exciting updates by signing up for our newsletter. Secret
                  privileges for your purchase will be delivered straight to
                  your inbox.
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    style={{
                      flex: "1",
                      padding: "10px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      marginRight: "10px",
                    }}
                  />
                  <button
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fas fa-envelope"></i>
                  </button>
                </div>
                <p style={{ fontSize: "12px", marginTop: "10px" }}>
                  By clicking Subscribe, you agree to our{" "}
                  <Link to="/page/privacy-policy" style={{ color: "#007bff" }}>
                    Privacy Policy
                  </Link>{" "}
                  and to receive our promotional emails (opt out anytime).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
