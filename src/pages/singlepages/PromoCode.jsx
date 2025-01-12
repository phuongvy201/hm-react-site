import React from "react";
import "../../assets/css/promocode.css";
export default function PromoCode() {
  return (
    <div className="container py-5">
      <div className="promo-banner">
        <h1>SAVE UP TO 70% OFF</h1>
        <button
          style={{ background: "#05567c" }}
          className="offer-button text-white"
        >
          GET YOUR DISCOUNT NOW
        </button>
      </div>
      <div className="coupons">
        <div className="coupon">
          <span className="code">JUNE24</span>
          <br />
          <span className="discount">5% OFF</span>
          <br />
          <p>on orders over $50.00</p>
          <br />
          <button className="btn btn-danger">Copy Code</button>
        </div>
        <div className="coupon">
          <span className="code">SE5</span>
          <br />
          <span className="discount">5% OFF</span>
          <br />
          <p>on orders over $50.00</p>
          <br />
          <button className="btn btn-danger">Copy Code</button>
        </div>
        <div className="coupon">
          <span className="code">SE10</span>
          <br />
          <span className="discount">10% OFF</span>
          <br />
          <p>on orders over $100.00</p>
          <br />
          <button className="btn btn-danger">Copy Code</button>
        </div>
      </div>
      <footer>
        <p>Promo codes and discounts on Bluprinter 2025</p>
      </footer>

      <div className="container mt-5">
        <div className="faq-header">How can we help you today?</div>
        <div className="accordion" id="faqAccordion">
          <div className="faq-item">
            <p class="d-inline-flex gap-1">
              <div
                className="faq-question"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample1"
                aria-expanded="false"
                aria-controls="collapseExample1"
              >
                <i class="fa-solid fa-circle-question  me-2"></i>
                How do Bluprinter promo codes work?
                <i className="fas fa-chevron-down icon ms-2"></i>
              </div>
            </p>
            <div class="collapse" id="collapseExample1">
              <div class="card card-body">
                Bluprinter promo codes work by providing a discount on your
                purchase. You can enter the promo code at checkout to apply the
                discount.
              </div>
            </div>
          </div>
          <div className="faq-item">
            <p class="d-inline-flex gap-1">
              <div
                className="faq-question"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample2"
                aria-expanded="false"
                aria-controls="collapseExample2"
              >
                <i class="fa-solid fa-circle-question  me-2"></i>
                How do I redeem a coupon code on Bluprinter?
                <i className="fas fa-chevron-down icon ms-2"></i>
              </div>
            </p>
            <div class="collapse" id="collapseExample2">
              <div class="card card-body">
                To redeem a coupon code on Bluprinter, enter the code at
                checkout in the designated coupon code field and click "Apply".
              </div>
            </div>
          </div>
          <div className="faq-item">
            <p class="d-inline-flex gap-1">
              <div
                className="faq-question"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample3"
                aria-expanded="false"
                aria-controls="collapseExample3"
              >
                <i class="fa-solid fa-circle-question  me-2"></i>
                How can I obtain Bluprinter promo code?
                <i className="fas fa-chevron-down icon ms-2"></i>
              </div>
            </p>
            <div class="collapse" id="collapseExample3">
              <div class="card card-body">
                You can obtain Bluprinter promo codes by subscribing to our
                newsletter, following us on social media, or checking our
                website for special promotions.
              </div>
            </div>
          </div>
          <div className="faq-item">
            <p class="d-inline-flex gap-1">
              <div
                className="faq-question"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample4"
                aria-expanded="false"
                aria-controls="collapseExample4"
              >
                <i class="fa-solid fa-circle-question  me-2"></i>
                Why isn’t my coupon working?
                <i className="fas fa-chevron-down icon ms-2"></i>
              </div>
            </p>
            <div class="collapse" id="collapseExample4">
              <div class="card card-body">
                If your coupon isn't working, it may be expired, not applicable
                to the items in your cart, or you may have entered it
                incorrectly. Please check the terms and conditions of the
                coupon.
              </div>
            </div>
          </div>
          <div className="faq-item">
            <p class="d-inline-flex gap-1">
              <div
                className="faq-question"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample5"
                aria-expanded="false"
                aria-controls="collapseExample5"
              >
                <i class="fa-solid fa-circle-question  me-2"></i>
                Are there any seasonal or holiday-themed coupon codes on
                Bluprinter.com?
                <i className="fas fa-chevron-down icon ms-2"></i>
              </div>
            </p>
            <div class="collapse" id="collapseExample5">
              <div class="card card-body">
                Yes, Bluprinter.com often offers seasonal or holiday-themed
                coupon codes. Be sure to check our website or subscribe to our
                newsletter for updates.
              </div>
            </div>
          </div>
          <div className="faq-item">
            <p class="d-inline-flex gap-1">
              <div
                className="faq-question"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample6"
                aria-expanded="false"
                aria-controls="collapseExample6"
              >
                <i class="fa-solid fa-circle-question  me-2"></i>
                What types of coupon codes does Bluprinter.com offer?
                <i className="fas fa-chevron-down icon ms-2"></i>
              </div>
            </p>
            <div class="collapse" id="collapseExample6">
              <div class="card card-body">
                Bluprinter.com offers various types of coupon codes, including
                percentage discounts, fixed amount discounts, and free shipping
                codes.
              </div>
            </div>
          </div>
          <div className="faq-item">
            <p class="d-inline-flex gap-1">
              <div
                className="faq-question"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample7"
                aria-expanded="false"
                aria-controls="collapseExample7"
              >
                <i class="fa-solid fa-circle-question  me-2"></i>
                How often does Bluprinter.com offer promo codes?
                <i className="fas fa-chevron-down icon ms-2"></i>
              </div>
            </p>
            <div class="collapse" id="collapseExample7">
              <div class="card card-body">
                Bluprinter.com offers promo codes regularly. Be sure to check
                our website or subscribe to our newsletter for the latest
                offers.
              </div>
            </div>
          </div>
          <div className="faq-item">
            <p class="d-inline-flex gap-1">
              <div
                className="faq-question"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample8"
                aria-expanded="false"
                aria-controls="collapseExample8"
              >
                <i class="fa-solid fa-circle-question  me-2"></i>
                Can I use coupon codes on all products available on
                Bluprinter.com?
                <i className="fas fa-chevron-down icon ms-2"></i>
              </div>
            </p>
            <div class="collapse" id="collapseExample8">
              <div class="card card-body">
                Coupon codes can be used on most products available on
                Bluprinter.com, but some exclusions may apply. Please check the
                terms and conditions of the coupon.
              </div>
            </div>
          </div>
          <div className="faq-item">
            <p class="d-inline-flex gap-1">
              <div
                className="faq-question"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample9"
                aria-expanded="false"
                aria-controls="collapseExample9"
              >
                <i class="fa-solid fa-circle-question  me-2"></i>
                Are there any specific requirements for using coupon codes on
                Bluprinter.com, such as a minimum order amount?
                <i className="fas fa-chevron-down icon ms-2"></i>
              </div>
            </p>
            <div class="collapse" id="collapseExample9">
              <div class="card card-body">
                Some coupon codes may have specific requirements, such as a
                minimum order amount. Please check the terms and conditions of
                the coupon for details.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
