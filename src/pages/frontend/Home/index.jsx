import { Link } from "react-router-dom";
import ProductPopular from "../products/ProductPopular";
import ProductNew from "../products/ProductNew";
import CategoryHome from "../CategoryHome";
import PostLastestHome from "../post/PostLastestHome";
import BubbleCategory from "../../../components/BubbleCategory";

const Home = () => {
  return (
    <section className="content">
      <div className="container mt-4">
        <BubbleCategory />
        <div className="container d-md-none">
          {" "}
          {/* Only visible on small screens */}
        </div>
      </div>
      <CategoryHome />
      <ProductPopular />
      <ProductNew />

      <div className="mt-4">
        <div className="fit-guarantee">
          <div className="container">
            <div className="title text-center pt-5">
              Our Perfect Fit Guarantee
            </div>
            <div className="subtitle text-center">
              Complimentary On All Orders
            </div>
            <div className="row">
              <div className="col-12 col-md-12 col-lg-4">
                <div className="guarantee-item row">
                  <div className="col-3 col-md-3 col-lg-12 d-flex align-items-center">
                    <img
                      className="mx-auto"
                      alt="Illustration of a measuring tape"
                      height={100}
                      src="https://cdn.printerval.com/unsafe/540x540/printerval.com/images/alterations.png"
                      width={100}
                    />
                  </div>
                  <div className="col-9 col-md-9 col-lg-12">
                    <div className="guarantee-title">Exchange</div>
                    <div className="guarantee-description">
                      If your item doesn’t fit perfectly and requires
                      significant adjustments, we will correct and remake your
                      item free of charge, at no extra cost.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-4 row">
                <div className="guarantee-item row">
                  <div className="col-9 col-md-9 col-lg-12">
                    <div className="guarantee-title">Refund</div>
                    <div className="guarantee-descriptionb ">
                      Something wrong with your item? Contact our Support Team.
                      Our well-trained and friendly Support Team is available
                      via email and hotline to help you fix this case directly.
                    </div>
                  </div>
                  <div className="col-3 col-md-3 col-lg-12 d-flex align-items-center">
                    <img
                      alt="Illustration of a delivery truck"
                      height={100}
                      className="mx-auto"
                      src="https://cdn.printerval.com/unsafe/540x540/printerval.com/images/return.png"
                      width={100}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-4">
                <div className="guarantee-item row">
                  <div className="col-3 col-md-3 col-lg-12 d-flex align-items-center">
                    <img
                      alt="Illustration of a sewing machine"
                      height={100}
                      className="mx-auto"
                      src="https://cdn.printerval.com/unsafe/540x540/printerval.com/images/return.png"
                      width={100}
                    />
                  </div>
                  <div className="col-9 col-md-9 col-lg-12">
                    <div className="guarantee-title">Pre- or post-purchase</div>
                    <div className="guarantee-description">
                      At Bluprinter, we put the customer first because we ensure
                      the quality of the customer experience. Feel free to
                      contact us
                      <Link to="#">here</Link>, we are always available to
                      assist with your case.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="printerval-fandom mt-3">
          <h4 className="component-heading">#Bluprinter Fandom</h4>
          <div className="row">
            <div className="col-6 col-md-6 col-lg-3 mt-3">
              <Link to="#">
                <img
                  className="img-fluid rounded mt-2"
                  src="https://i.etsystatic.com/iap/0ed2d6/6576098541/iap_300x300.6576098541_n1afl9rz.jpg?version=0"
                  alt=""
                />
              </Link>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mt-3">
              <Link to="#">
                <img
                  className="img-fluid rounded mt-2"
                  src="https://i.etsystatic.com/iap/9dab84/6585628985/iap_300x300.6585628985_327ldb66.jpg?version=0"
                  alt=""
                />
              </Link>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mt-3">
              <Link to="#">
                <img
                  className="img-fluid rounded mt-2"
                  src="https://i.etsystatic.com/iap/b56d5b/6524772236/iap_300x300.6524772236_k368u75a.jpg?version=0"
                  alt=""
                />
              </Link>
            </div>
            <div className="col-6 col-md-6 col-lg-3 mt-3">
              <Link to="#">
                <img
                  className="img-fluid rounded mt-2"
                  src="https://i.etsystatic.com/iap/d6ddac/5880841590/iap_600x600.5880841590_oa1pdae8.jpg?version=0"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="banner">
          <div className="row">
            <div className="col-6 col-md-6 col-lg-6">
              <img
                className="img-fluid festival-theme"
                src="https://cdn.printerval.com/unsafe/1500x0/asset.prtvstatic.com/2024/10/18/halloween-4-a968e89fe98475e000414cda675aa7e7.jpg"
                alt=""
              />
            </div>
            <div className="col-6 col-md-6 col-lg-6">
              <img
                className="img-fluid festival-theme"
                src="https://cdn.printerval.com/unsafe/1500x0/asset.prtvstatic.com/2024/10/18/christmas-dad8d93e4b58f654fbc97e33c500edb2.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: "rgb(249, 236, 249)" }}
        className="about-us mt-4"
      >
        <div className="container pb-4">
          <p className="pt-5 ">
            At Bluprinter, we embark on a journey fueled by a simple yet
            profound mission: to ignite creativity and bring artists and
            customers together on a platform where imagination knows no bounds.
            Established in the heart of Vietnam in 2021, Bluprinter swiftly
            emerged as a global online marketplace, championing the cause of
            independent artists and designers from all corners of the world.
          </p>
          <h2>24/7 Customer Assistance - Always by Your Side</h2>
          <p>
            Our unwavering commitment to customer satisfaction is evident in our
            24/7 customer assistance. We understand that questions may arise,
            needs may change, and in those moments, we are here for you. Whether
            it's a simple query or a complex concern, our dedicated team is at
            your service round the clock, accessible through chat, email, or a
            friendly phone call. Our priority is your peace of mind.
          </p>
          <h2>Order Tracking - Keeping You Informed</h2>
          <p>
            We believe in transparency, and that's why we provide you with an{" "}
            <Link to="#">order tracking system</Link> that allows you to stay in
            the loop, every step of the way. With Bluprinter, you'll never
            wonder where your order is. Real-time order monitoring is at your
            fingertips, ensuring you know exactly when to expect your carefully
            crafted creation.
          </p>
          <h2>Easy Refurns and Refunds - Your Satisfaction Matters</h2>
          <p>
            Bluprinter's commitment to transparency extends to{" "}
            <Link to="#">our</Link> return and <Link to>refund policy</Link>.
            We've designed it to be straightforward and hassle-free. We
            understand that sometimes, things don't go as planned. In such
            cases, our clear refund process ensures that you're never left in
            the dark, because your satisfaction matters.
          </p>
          <h2>Bluprinter Mobile App - Your Creative Companion</h2>
          <p>
            The Bluprinter Mobile App is not just an app; it's your creative
            companion. We've integrated innovation into every aspect to provide
            you with a seamless and enjoyable shopping experience. With
            personalized recommendations, easy customization options, exclusive
            offers, and timely alerts, the app transforms shopping into an
            adventure of self-expression.
            <br />
            Download the Bluprinter Mobile App today and experience a world of
            inspiration at your fingertips:{" "}
            <Link to="#">iOS App | Android App</Link>
          </p>
          <h2>Customization Beyond Imagination - Your Unique Creations</h2>
          <p>
            Empower your world with Bluprinter! Explore a diverse range of
            customizable products that ignite your creativity. From
            one-of-a-kind T-shirts and cozy Hoodies to stylish Caps,{" "}
            <Link to="#">Mugs</Link>, and exquisite jewelry, we offer a plethora
            of possibilities. Whether you're{" "}
            <Link to="#">personalizing Flags</Link>, crafting captivating{" "}
            <Link to="#">Poster designs</Link>, setting the mood with{" "}
            <Link to="#">Candles</Link>, showcasing your style with{" "}
            <Link to="#">Masks</Link>, adding charm with{" "}
            <Link to="#">Coasters</Link>, sipping from durable{" "}
            <Link to="#">Tumblers</Link>, <Link to="#">sporting 3D Shorts</Link>
            , staying cozy in <Link to="#">Sweatshirts</Link>, embracing trends
            with <Link to="#">Tank Tops</Link>, exuding elegance in{" "}
            <Link to="#">Polo shirts</Link>, enjoying comfort in Slippers,
            staying fashionable with Sandals, finding support with{" "}
            <Link to="#">Sport Bras</Link>, keeping warm in Jackets, carrying
            your essentials in versatile Bags, protecting your car seats with
            stylish covers, stepping out in trendy Shoes, pampering your pets
            with adorable Hoodies, wearing iconic Buckey Hats, adorning with
            vibrant Pin Buttons, or enhancing your workspace with practical
            Mouse Pads and stylish Laptop Skins, Bluprinter brings your creative
            vision to life. Explore, create, and inspire with us!
          </p>
          <h2>Easy Returns and Refunds - Your Satisfaction Matters</h2>
        </div>
      </div>
      <PostLastestHome />
    </section>
  );
};

export default Home;
