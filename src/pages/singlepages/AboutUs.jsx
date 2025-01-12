import React from "react";

export default function AboutUs() {
  
  return (
    <div className="about-us-section">

      {/* Hero Banner Section */}
      <div className="about-hero-banner">
        <img
          src="https://cdn.printerval.com/unsafe/1500x0/printerval.com/assets/images/about-page/cover-about-us.jpg"
          alt="About Bluprinter"
        />
      </div>
      {/* About Content */}
      <div className="about-content">
        <p className="about-text mt-2">
          Established in 2021 in Vietnam, <strong>Bluprinter</strong> has a
          straightforward mission: to offer independent artists a meaningful
          avenue for selling their creations. Presently, our platform connects
          more than 500,000 artists and designers worldwide with millions of
          enthusiastic fans. We provide a revolutionary space for
          self-expression and creativity, creating a bold new world for artists
          to showcase their work.
        </p>
      </div>
      {/* Two Banner Section */}
      <div className="banner-section">
        <div className="banner-container">
          <div className="banner-large">
            <img
              src="https://cdn.printerval.com/unsafe/1500x0/printerval.com/assets/images/about-page/about-screen-video.jpg"
              alt="Explore Gift Ideas"
            />
          </div>
          <div className="banner-small">
            <img
              src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/about-page-3.jpg"
              alt="Explore Present Ideas"
            />
          </div>
        </div>
      </div>
      {/* Powers Section */}
      <div className="about-section">
        <div className="about-content">
          <div className="about-header">
            <h1>About us</h1>
            <div className="underline" />
            <p className="about-description">
              <strong>Bluprinter</strong> is a global online marketplace, where
              people come together to make, sell, buy, and collect unique items.
              There's no <strong>Bluprinter</strong> warehouse – just
              independent sellers selling the things they love. We make the
              whole process easy, helping you connect directly with makers to
              find something extraordinary.
            </p>
          </div>
        </div>
        <div className="cards-container">
          {/* Marketplace Card */}
          <div className="card">
            <div className="card-image">
              <img
                src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/power-1.jpg"
                alt="Marketplace"
              />
            </div>
            <div className="card-content">
              <h4 className="card-title marketplace-title">Marketplace</h4>
              <p className="card-text">
                We're a marketplace that connects Customers, Creators, and
                Makers, powering the creation of almost anything.
              </p>
            </div>
          </div>
          {/* Technology Card */}
          <div className="card">
            <div className="card-image">
              <img
                src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/power-2.jpg"
                alt="Technology"
              />
            </div>
            <div className="card-content">
              <h4 className="card-title technology-title">Technology</h4>
              <p className="card-text">
                We're built on a foundation of innovation, and our integrated
                creation technology provides a seamless experience from
                visualization to production.
              </p>
            </div>
          </div>
          {/* Create Made Easy Card */}
          <div className="card">
            <div className="card-image">
              <img
                src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/power-3.jpg"
                alt="Create Made Easy"
              />
            </div>
            <div className="card-content">
              <h4 className="card-title create-title">Create Made Easy</h4>
              <p className="card-text">
                We allow customers to discover, customize, and purchase designs
                and products that express their unique interests and preferences
                — the combinations are nearly endless!
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Statistics Section */}
      <div className="statistics-section">
        <div className="statistics-header">
          <h1>By the numbers</h1>
          <div className="underline" />
          <p className="subtitle">
            We're growing proudly each day in diverse ways.
          </p>
        </div>
        <div className="statistics-grid">
          {/* Easy Design Tool */}
          <div className="stat-item">
            <div className="stat-header">
              <h1 className="stat-number primary">1</h1>
              <img
                src="https://printerval.com/assets/images/about-page/statistic-1.svg"
                alt="Easy design"
                className="stat-icon"
              />
            </div>
            <p className="stat-text">
              Easy design tool with near infinite ways to design
            </p>
          </div>
          {/* Years Old */}
          <div className="stat-item">
            <div className="stat-header">
              <h1 className="stat-number success">4</h1>
              <img
                src="https://printerval.com/assets/images/about-page/statistic-2.svg"
                alt="Growing"
                className="stat-icon"
              />
            </div>
            <p className="stat-text">Years old and growing</p>
          </div>
          {/* Domains */}
          <div className="stat-item">
            <div className="stat-header">
              <h1 className="stat-number warning">16</h1>
              <img
                src="https://printerval.com/assets/images/about-page/statistic-3.svg"
                alt="Explore"
                className="stat-icon"
              />
            </div>
            <p className="stat-text">Domains and expanding</p>
          </div>
          {/* Customers */}
          <div className="stat-item">
            <div className="stat-header">
              <h1 className="stat-number info">30M</h1>
              <img
                src="https://printerval.com/assets/images/about-page/statistic-5.svg"
                alt="Satisfaction ratings"
                className="stat-icon"
              />
            </div>
            <p className="stat-text">
              Customers since launch and strong satisfaction ratings
            </p>
          </div>
          {/* Patents */}
          <div className="stat-item">
            <div className="stat-header">
              <h1 className="stat-number danger">142M</h1>
              <img
                src="https://printerval.com/assets/images/about-page/statistic-6.svg"
                alt="Patents"
                className="stat-icon"
              />
            </div>
            <p className="stat-text">Patents and more to come</p>
          </div>
        </div>
      </div>
      <div className="about-how-works">
        <div className="how-works-container">
          <div className="how-works-header">
            <h1>How Bluprinter works</h1>
            <div className="underline" />
          </div>
          <div className="how-works-grid">
            <div className="how-works-item">
              <div className="icon-wrapper">
                <img
                  src="https://printerval.com/modules/seller/images/upload.svg"
                  alt="upload products"
                  width={170}
                  height={170}
                />
              </div>
              <p>Sellers upload products to their shop</p>
            </div>
            <div className="how-works-item">
              <div className="icon-wrapper">
                <img
                  src="https://printerval.com/modules/seller/images/customers.svg"
                  alt="purchase products"
                  width={170}
                  height={170}
                />
              </div>
              <p>Customers find and purchase products they love</p>
            </div>
            <div className="how-works-item">
              <div className="icon-wrapper">
                <img
                  src="https://printerval.com/modules/seller/images/products.svg"
                  alt="worldwide"
                  width={170}
                  height={170}
                />
              </div>
              <p>Products will be shipped worldwide</p>
            </div>
            <div className="how-works-item">
              <div className="icon-wrapper">
                <img
                  src="https://printerval.com/modules/seller/images/paid.svg"
                  alt="Sellers earn money"
                  width={170}
                  height={170}
                />
              </div>
              <p>Customer get awesome products, and Sellers earn money</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="about-content"
        style={{
          backgroundImage:
            'url("../cdn.printerval.com/unsafe/1500x0/printerval.com/assets/images/about-page/empowered-bg-5.jpg")',
        }}
      >
        <div className="site-w">
          <div className="wrapp-80">
            <h1>Empowered by people</h1>
            <div className="underline" />
            <div className="subtitle-box">
              Our Customers, Creators, Makers all play a part in our powerful
              marketplace.
            </div>
            <div className="list-empowered">
              <div className="empowered-col empowered-col1">
                <div
                  className="empowered-item"
                  data-aos="fade-right"
                  data-aos-offset={500}
                  data-aos-easing="ease-in-sine"
                  data-aos-delay={0}
                >
                  <div className="image">
                    <picture>
                      <img
                        src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/empowered-1.jpg"
                        alt="30M customers from every corner of the globe"
                      />
                    </picture>
                  </div>
                  <div className="content">
                    <div className="title-item" style={{ color: "#9235e3" }}>
                      Happy CUSTOMERS
                    </div>
                    <div className="dessc-item">
                      There are more than 30M customers from every corner of the
                      globe
                    </div>
                  </div>
                </div>
                <div
                  className="empowered-item"
                  data-aos="fade-right"
                  data-aos-offset={500}
                  data-aos-easing="ease-in-sine"
                  data-aos-delay={200}
                >
                  <div className="image">
                    <picture>
                      <img
                        src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/empowered-2.jpg"
                        alt="There are 150+ manufacturers who produce and ship orders"
                      />
                    </picture>
                  </div>
                  <div className="content">
                    <div className="title-item" style={{ color: "#04d189" }}>
                      Mighty MAKERS
                    </div>
                    <div className="dessc-item">
                      There are 150+ manufacturers who produce and ship orders
                      directly to customers in 194 countries worldwide.
                    </div>
                  </div>
                </div>
              </div>
              <div className="empowered-col empowered-col2">
                <div
                  className="empowered-item"
                  data-aos="fade-left"
                  data-aos-offset={500}
                  data-aos-easing="ease-in-sine"
                  data-aos-delay={200}
                >
                  <div className="image">
                    <picture>
                      <img
                        src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/empowered-3.jpg"
                        alt="300 million designs."
                      />
                    </picture>
                  </div>
                  <div className="content">
                    <div className="title-item" style={{ color: "#faae03" }}>
                      Inspiring CREATORS
                    </div>
                    <div className="dessc-item">
                      Our robust community of over 900,000 independent creators
                      has contributed to a collection exceeding 300 million
                      designs.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="reviews-wrapper">
        <div className="reviews-content-wrapper content-wrapper-swiper">
          <div className="flex-b flex-dc">
            <div className="reviews-content-title-box">
              26K+ Clients Reviews
            </div>
            <div className="rating-stars">
              <img
                src="https://printerval.com/images/4star.png"
                alt="4.1 out of 5 stars"
                width={120}
                height={25}
              />
              <span className="rating-text">4.1/5</span>
            </div>
          </div>
          <div className="swiper-button">
            <div className="swiper-button-prev">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
              </svg>
            </div>
            <div className="swiper-button-next">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
                <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
              </svg>
            </div>
          </div>
          <div className="list-reviews">
            <div className="swiper-wrapper">
              <div className="review-item ">
                <div className="content-header">
                  <span className="content-avatar">P</span>
                  <div className="name-reviewer">
                    <strong>Peter Noga Jr</strong>
                    <div className="reviewer-location">
                      <img
                        src="https://printerval.com/images/5star.png"
                        alt="5 out of 5 stars"
                        width={100}
                        height={20}
                      />
                      <span className="location">US</span>
                    </div>
                  </div>
                </div>
                <div className="title-review">The Dark Knight Returns Tee</div>
                <div className="content-review">
                  As far as ordering goes, it was a quick and easy process. I
                  may need to adjust this once the shirt arrives and I see the
                  quality and condition of the...
                </div>
              </div>
              <div className="review-item">
                <div className="content-header">
                  <span className="content-avatar">H</span>
                  <div className="name-reviewer">
                    <strong>Haremscarem</strong>
                    <div className="reviewer-location">
                      <img
                        src="https://printerval.com/images/5star.png"
                        alt="5 out of 5 stars"
                        width={100}
                        height={20}
                      />
                      <span className="location">US</span>
                    </div>
                  </div>
                </div>
                <div className="title-review">Wonderful selection!</div>
                <div className="content-review">
                  I found the site very easy to use. I believe they had a
                  wonderful selection of shirts and it was easy to compare the
                  styles. Individual artists design all the...
                </div>
              </div>
              <div className="review-item">
                <div className="content-header">
                  <span className="content-avatar">P</span>
                  <div className="name-reviewer">
                    <strong>Philip McGuinness</strong>
                    <div className="reviewer-location">
                      <img
                        src="https://printerval.com/images/5star.png"
                        alt="5 out of 5 stars"
                        width={100}
                        height={20}
                      />
                      <span className="location">US</span>
                    </div>
                  </div>
                </div>
                <div className="title-review">
                  I received my order on December 6th.My...
                </div>
                <div className="content-review">
                  I received my order on December 6th.My order arrived in ten
                  days.I have ordered from Bluprinter in the past.I
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="our-values-wrapper" className="about-content" />
      <div className="value-grid-images">
        <div className="value-grid-image value-grid-image-1">
          <img
            className="value-image"
            src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/value/1.jpg"
            alt="our values 1"
          />
        </div>
        <div className="value-grid-image value-grid-image-2">
          <img
            className="value-image"
            src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/value/2.jpg"
            alt="our values 2"
          />
        </div>
        <div className="value-grid-image value-grid-image-3">
          <img
            className="value-image"
            src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/value/3.jpg"
            alt="our values 3"
          />
        </div>
        <div className="value-grid-image value-grid-image-4">
          <img
            className="value-image"
            src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/value/4.jpg"
            alt="our values 4"
          />
        </div>
        <div className="value-grid-image value-grid-image-5">
          <img
            className="value-image"
            src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/value/5.jpg"
            alt="our values 5"
          />
        </div>
        <div className="value-grid-image value-grid-image-6">
          <img
            className="value-image"
            src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/value/6.jpg"
            alt="our values 6"
          />
        </div>
        <div className="value-grid-image value-grid-image-7">
          <img
            className="value-image"
            src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/value/7.jpg"
            alt="our values 7"
          />
        </div>
        <div className="value-grid-image value-grid-image-8">
          <img
            className="value-image"
            src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/value/8.jpg"
            alt="our values 8"
          />
        </div>
        <div className="value-grid-image value-grid-image-9">
          <img
            className="value-image"
            src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/value/9.jpg"
            alt="our values 9"
          />
        </div>
        <div className="value-grid-image value-grid-image-10">
          <img
            className="value-image"
            src="https://cdn.printerval.com/unsafe/540x540/printerval.com/assets/images/about-page/value/10.jpg"
            alt="our values 10"
          />
        </div>
      </div>
      <div className="press-section">
        <div className="press-header ">
          <div className="header-content">
            <h1>The press talks about us</h1>
            <div className="press-underline" />
          </div>
          <div className="press-navigation">
            <button className="press-prev">
              <svg width={24} height={24} viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button className="press-next">
              <svg width={24} height={24} viewBox="0 0 24 24">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="press-slider swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="press-logo">
                <img
                  src="https://cdn.printerval.com/unsafe/160x160/printerval.com/assets/images/about-page/news/worldtimes.png"
                  alt="World Times"
                />
              </div>
            </div>
            <div className="swiper-slide">
              <div className="press-logo">
                <img
                  src="https://printerval.com/assets/images/about-page/news/myvipon.svg"
                  alt="Vipon"
                />
              </div>
            </div>
            <div className="swiper-slide">
              <div className="press-logo">
                <img
                  src="https://cdn.printerval.com/unsafe/160x160/printerval.com/assets/images/about-page/news/minimalistfocus.png"
                  alt="INSC Digital Magazine"
                />
              </div>
            </div>
            <div className="swiper-slide">
              <div className="press-logo">
                <img
                  src="https://cdn.printerval.com/unsafe/160x160/printerval.com/assets/images/about-page/news/fundly.png"
                  alt="Fundly"
                />
              </div>
            </div>
            <div className="swiper-slide">
              <div className="press-logo">
                <img
                  src="https://cdn.printerval.com/unsafe/160x160/printerval.com/assets/images/about-page/news/urbansplatter.png"
                  alt="Blocks"
                />
              </div>
            </div>
            <div className="swiper-slide">
              <div className="press-logo">
                <img
                  src="https://cdn.printerval.com/unsafe/160x160/printerval.com/assets/images/about-page/news/digitaljournal.png"
                  alt="Newsfreak"
                />
              </div>
            </div>
            <div className="swiper-slide">
              <div className="press-logo">
                <img
                  src="https://printerval.com/assets/images/about-page/news/ventsmagazine.svg"
                  alt="Vents Magazine"
                />
              </div>
            </div>
            <div className="swiper-slide">
              <div className="press-logo">
                <img
                  src="https://cdn.printerval.com/unsafe/160x160/printerval.com/assets/images/about-page/news/businesstomark.jpg"
                  alt="BTM"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-section">
        <div className="contact-container">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Contact us</h2>
            <div className="underline" />
            <div className="contact-details">
              {/* Email */}
              <div className="contact-item email">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="#ff5722"
                  >
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="info">
                  <span>Email:</span>
                  <a href="mailto:admin@bluprinter.com">admin@bluprinter.com</a>
                </div>
              </div>
              {/* Phone Numbers */}
              <div className="contact-item">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="#ff5722"
                  >
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                  </svg>
                </div>
                <div className="info phone-numbers">
                  <a href="tel:+84903446430">+84 903 446 430</a>
                  <a href="tel:+13396661686">+1 339 666 1686</a>
                  <a href="tel:+14786661686">+1 478 666 1686</a>
                </div>
              </div>
              {/* Social Media */}
              <div className="social-media">
                <a href="#" className="social-icon facebook">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
                <a href="#" className="social-icon twitter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
                <a href="#" className="social-icon instagram">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="social-icon youtube">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Google Map */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6763231428774!2d105.84077731476292!3d21.007273386010126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac428c3336e5%3A0xe5e9b4c6e276e5!2s6%20P.%20L%C3%AA%20V%C4%83n%20Thi%C3%AAm%2C%20Thanh%20Xu%C3%A2n%20Trung%2C%20Thanh%20Xu%C3%A2n%2C%20H%C3%A0%20N%E1%BB%99i%2C%20Vietnam!5e0!3m2!1sen!2s!4v1647850294567!5m2!1sen!2s"
              width="100%"
              height={450}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      {/* ... continue with other sections using Bootstrap classes ... */}
      {/* Bootstrap JS and Popper */}
    </div>
  );
}
