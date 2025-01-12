import React, { useState, useEffect } from "react";
import "../../assets/css/bulkorder.css";
import { Link } from "react-router-dom";
import bulkService from "../../service/BulkService";

export default function BulkOrder() {
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    var file = document.getElementById("upload");

    console.log(
      "iwsedjweoidiw",
      quantity,
      products,
      name,
      email,
      company,
      phone,
      file
    );
    const formData = new FormData();
    formData.append("quantity", quantity);
    formData.append("products", products);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("company", company);
    formData.append("phone", phone);
    formData.append("file_path", file.files.length > 0 ? file.files[0] : null);

    await bulkService.submitForm(formData).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach((item) => {
      item.addEventListener("click", () => {
        const answer = item.nextElementSibling;
        const icon = item.querySelector(".faq-icon");
        if (answer.style.display === "none" || answer.style.display === "") {
          answer.style.display = "block";
          icon.classList.remove("fa-chevron-down");
          icon.classList.add("fa-chevron-up");
        } else {
          answer.style.display = "none";
          icon.classList.remove("fa-chevron-up");
          icon.classList.add("fa-chevron-down");
        }
      });
    });

    // Cleanup function to remove event listeners
    return () => {
      faqQuestions.forEach((item) => {
        item.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link className="text-decoration-none text-dark" to="/">
                  Home
                </Link>
              </li>
              <li aria-current="page" className="breadcrumb-item active">
                Bulk Orders
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row hero-section">
        <div className="col-md-7 position-relative">
          <img
            alt="Three students in uniform sitting on a bench and talking"
            src="https://i.etsystatic.com/37795650/r/il/1db823/5509611285/il_794xN.5509611285_qpzz.jpg"
          />
        </div>
        <div className="col-md-5 hero-text">
          <h1 className="fw-semibold">
            Printed Merchandise at Wholesale Prices
          </h1>
          <p>Buy in bulk without the stress</p>
          <button className="btn rounded-pill">
            Buy in bulk without the stress
          </button>
        </div>
      </div>
      <div>
        <div className="container contact-section">
          <h2>Got Questions? Reach Out!</h2>
          <div className="email-box">
            <i className="fas fa-envelope" />
            <span>admin@bluprinter.com</span>
            <p>Email any inquiries, and we'll respond ASAP</p>
          </div>
          <p>Find answers to your query</p>
        </div>
        <div className="container form-section">
          <div className="row">
            <div className="col-12 text-center">
              <h3>Need a Quote? Then Fill in the Request Form Below.</h3>
              <p>
                We'll do special batches on request. Your contact person will
                get in touch.
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <h4>Your Products</h4>
              <div className="form-group">
                <label htmlFor="quantity">
                  Quantity of products required{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  id="quantity"
                  placeholder="Quantity of products required"
                />
              </div>
              <div className="form-group">
                <label htmlFor="products">
                  Products requested <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="products"
                  value={products}
                  onChange={(e) => setProducts(e.target.value)}
                  id="products"
                  placeholder="Product (type, color, etc.)"
                />
              </div>
              <div className="form-group upload-file">
                <input
                  type="file"
                  id="upload"
                  name="file"
                  value={file}
                  onChange={(e) => setFile(e.target.value)}
                />
                <label htmlFor="upload">Upload file</label>
                <span>image size max. 5 MB</span>
              </div>
              <p className="small">
                Supported files: jpg, png, gif, pdf, psd, gif
              </p>
            </div>
            <div className="col-md-6">
              <h4>Your Contact Information</h4>
              <div className="form-group">
                <label htmlFor="name">
                  Your Name <span className="text-danger">*</span>
                </label>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Your Email <span className="text-danger">*</span>
                </label>
                <input
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company/Organization</label>
                <input
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  type="text"
                  className="form-control"
                  id="company"
                  placeholder="Company/Organization"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Number we can reach you at</label>
                <input
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Number we can reach you at"
                />
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 text-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" faq-section">
        <div className="row">
          <div className="faq-title text-center">
            FAQ - Find answers to your query
          </div>
          <div className="col-md-6">
            <div className="faq-item">
              <div className="faq-question">
                What qualifies as a bulk order?{" "}
                <i className="fas fa-chevron-down faq-icon" />
              </div>
              <div className="faq-answer" style={{ display: "none" }}>
                An order containing 50 or more pieces of the same product (front
                and back).
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                What will I expect once I submit a bulk inquiry?{" "}
                <i className="fas fa-chevron-down faq-icon" />
              </div>
              <div className="faq-answer">
                Someone will contact you within 48 hours, and they will provide
                you with a formal quote or will ask for additional information.
                When submitting an inquiry, it is important that you provide as
                much information as possible, including: your full shipping
                address, a high-resolution graphic, product selection, quantity,
                expected delivery date and applicable link (if the product was
                found on the Bluprinter site). If you’d rather place a re-order,
                contact your bulk representative or shoot us an email.
              </div>
            </div>
            <div className="faq-item">  
              <div className="faq-question">
                What products and colors are available?{" "}
                <i className="fas fa-chevron-down faq-icon" />
              </div>
              <div className="faq-answer">
                Browse through our wide-ranging product offering and choose the
                items that best suit your needs. Additional products and colors
                are available upon special request.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                What print types do you offer?{" "}
                <i className="fas fa-chevron-down faq-icon" />
              </div>
              <div className="faq-answer">
                Screen, flex, flock, glow-in-the-dark, glitter, metallic,
                embroidery, full-color digital and sublimation.
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="faq-item">
              <div className="faq-question">
                What is the best format in which to submit my graphic file?{" "}
                <i className="fas fa-chevron-down faq-icon" />
              </div>
              <div className="faq-answer">
                We recommend high-resolution graphics, including ai, pdf, eps,
                png or jpeg, with a minimum of 300 dpi.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                Do you offer a general price list? What payment methods do you
                accept? <i className="fas fa-chevron-down faq-icon" />
              </div>
              <div className="faq-answer">
                We do not offer a general price list, as all quotes are
                individually priced. However, we do offer price breaks once
                certain quantities have been met. We accept all major credit
                cards, PayPal, check and international wire transfers. Payment
                is due prior to production.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                Where do you ship to? What is the turnaround time?{" "}
                <i className="fas fa-chevron-down faq-icon" />
              </div>
              <div className="faq-answer">
                USA, Canada, Australia, APO addresses and Asia. Additional
                locations may be available upon request. The turnaround time
                will vary based on quantity, product availability and print
                type. Our average handling time is 5-10 business days.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                Can I order sample products?{" "}
                <i className="fas fa-chevron-down faq-icon" />
              </div>
              <div className="faq-answer">
                In some cases, sample products can be purchased. However, it
                will depend upon the product and product.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
