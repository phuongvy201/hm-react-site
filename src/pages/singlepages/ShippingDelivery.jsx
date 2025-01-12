import React from "react";

export default function ShippingDelivery() {
  return (
    <div
      className="container"
      style={{
        fontFamily: "Arial, sans-serif",
        marginTop: "30px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ color: "#333" }}>
        <strong>Shipping & Delivery</strong>
      </h1>
      <div
        className="post-info"
        style={{ marginBottom: "20px", fontSize: "14px", color: "#555" }}
      >
        <span>
          <i className="far fa-clock"></i> Jan, 3 2025
        </span>
        <span style={{ marginLeft: "10px" }}>
          <i className="fas fa-user"></i> Posted by Dr. Wilhelmine Brakus
        </span>
      </div>
      <p className="mt-2" style={{ lineHeight: "1.6", color: "#555" }}>
        Your product will enter the processing stage as soon as your order is
        placed.
      </p>
      <p style={{ lineHeight: "1.6", color: "#555" }}>
        To estimate when you can expect your order, please consider the
        following factors:
      </p>
      <strong style={{ color: "#333" }}>Processing Time:</strong>
      <p style={{ lineHeight: "1.6", color: "#555" }}>
        After your payment is confirmed, your order will enter the processing
        stage and usually takes 1 - 7 days depending on the product you
        purchase.
      </p>
      <strong style={{ color: "#333" }}>Shipping Time:</strong>
      <p style={{ lineHeight: "1.6", color: "#555" }}>
        Once the processing is complete, your order will be shipped and will
        take a few more days to reach your address.
      </p>
      <div className="table-responsive">
        <table
          className="table table-bordered table-striped mt-3"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead className="table-dark">
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
              >
                Product
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
                colSpan={2}
              >
                Standard Delivery (business days)
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
                colSpan={2}
              >
                Premium Delivery (business days)
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
                colSpan={2}
              >
                Express Delivery (business days)
              </th>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
              ></td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
              >
                Handling Time
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
              >
                Transit Time
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
              >
                Handling Time
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
              >
                Transit Time
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
              >
                Handling Time
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
              >
                Transit Time
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                2D Apparel
              </td>
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 5" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "2 - 7" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 5" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "2 - 5" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 4" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "2 - 3" }}
              />
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                Mugs
              </td>
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 5" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "2 - 9" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 5" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "2 - 7" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 4" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "2 - 5" }}
              />
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                3D Hoodies
              </td>
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 5" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "4 - 12" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 5" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "4 - 7" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 4" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "2 - 5" }}
              />
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                Pillows
              </td>
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 5" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "4 - 12" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 5" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "4 - 7" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 4" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "2 - 5" }}
              />
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                Hats
              </td>
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 5" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "4 - 12" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 5" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "4 - 7" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 4" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "2 - 5" }}
              />
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                Fleece Blankets
              </td>
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 5" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "4 - 12" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "Not Available" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "Not Available" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "Not Available" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "Not Available" }}
              />
            </tr>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                Wooden
              </td>
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 5" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "4 - 12" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 5" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "4 - 7" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "1 - 4" }}
              />
              <td
                style={{ border: "1px solid #ddd", padding: "12px" }}
                dangerouslySetInnerHTML={{ __html: "2 - 5" }}
              />
            </tr>
          </tbody>
        </table>
      </div>

      <br />
      <p>
        Once your order has been processed, you will receive an email
        notification with your tracking details.
      </p>
      <br />
      <strong style={{ color: "#333" }}>Shipping Methods and Times</strong>
      <p>
        BluPrinter offers shipping services worldwide. Delivery times and costs
        vary based on your location and the shipping option you choose at
        checkout.{" "}
      </p>
      <p>Please NOTE that: </p>
      <p>
        * Shipping to Alaska, Hawaii, Puerto Rico, and unincorporated
        territories of the United States can take an additional 7 – 12 business
        days.
      </p>
      <p>
        * Shipping times are approximate and may vary due to external factors
        like customs delays, weather conditions, or local courier issues.
      </p>
      <p>
        * Fulfillers ship only to single destination shipping. If you wish to
        ship to multiple locations, please order separately with separate
        addresses.
      </p>
      <p>
        * You can have your order shipped to PO boxes and military APO/ FPO.
        Shipment to APOs can take up to 40-45 days to be delivered. Once your
        parcel has entered the army area, we will not be able to update the
        status of shipping for security reasons. ONLY AVAILABLE for POX box or
        Military APO/FPO within the US.
      </p>
      <p> ONLY AVAILABLE for POX box or Military APO/FPO within the US.</p>
      <strong style={{ color: "#333" }}>Shipping Costs</strong>
      <p>
        The handling fee is the fulfillment fee. This is the fee you pay to
        process an order. At BluPrinter, the handling fee is 7%.
      </p>
      <p>
        The handling fee is the fulfillment fee. This is the fee you pay to
        process an order. At BluPrinter, the handling fee is 7%.
      </p>
      <p>
        Below is an estimate of delivery costs for different products WITHIN THE
        USA:
      </p>
      <div className="table-responsive">
        <table
          className="table table-bordered table-striped mt-3"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead className="table-dark">
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
              >
                Merch
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
              >
                Amt
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
              >
                Standard (3-12 business days)
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
              >
                Premium (3-10 business days)
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  backgroundColor: "#2f466c",
                  color: "white",
                }}
              >
                Express (3-7 business days)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                rowSpan={2}
                style={{ border: "1px solid #ddd", padding: "12px" }}
              >
                T-Shirts
              </td>
              <td>1st</td>
              <td>$4.9</td>
              <td>$12.99</td>
              <td>$28.99</td>
            </tr>
            <tr>
              <td>Adding item</td>
              <td>$1</td>
              <td>$2</td>
              <td>$2</td>
            </tr>
            <tr>
              <td
                rowSpan={2}
                style={{ border: "1px solid #ddd", padding: "12px" }}
              >
                Tank tops
              </td>
              <td>1st</td>
              <td>$5.99</td>
              <td>$12.99</td>
              <td>$28.99</td>
            </tr>
            <tr>
              <td>Adding item</td>
              <td>$1</td>
              <td>$2</td>
              <td>$2</td>
            </tr>
            <tr>
              <td
                rowSpan={2}
                style={{ border: "1px solid #ddd", padding: "12px" }}
              >
                Long sleeves
              </td>
              <td>1st</td>
              <td>$6.99</td>
              <td>$13.99</td>
              <td>$28.99</td>
            </tr>
            <tr>
              <td>Adding item</td>
              <td>$1</td>
              <td>$2</td>
              <td>$2</td>
            </tr>
            <tr>
              <td
                rowSpan={2}
                style={{ border: "1px solid #ddd", padding: "12px" }}
              >
                Hoodies
              </td>
              <td>1st</td>
              <td>$9.99</td>
              <td>$13.99</td>
              <td>$28.99</td>
            </tr>
            <tr>
              <td>Adding item</td>
              <td>$1</td>
              <td>$2</td>
              <td>$2</td>
            </tr>
            <tr>
              <td
                rowSpan={2}
                style={{ border: "1px solid #ddd", padding: "12px" }}
              >
                Mugs
              </td>
              <td>1st</td>
              <td>$6.99</td>
              <td>$10.99</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Adding item</td>
              <td>$1</td>
              <td>$3</td>
              <td>-</td>
            </tr>
            <tr>
              <td
                rowSpan={2}
                style={{ border: "1px solid #ddd", padding: "12px" }}
              >
                Hats
              </td>
              <td>1st</td>
              <td>$6.99</td>
              <td>$10.99</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Adding item</td>
              <td>$1</td>
              <td>$2</td>
              <td>-</td>
            </tr>
            <tr>
              <td
                rowSpan={2}
                style={{ border: "1px solid #ddd", padding: "12px" }}
              >
                Stickers
              </td>
              <td>1st</td>
              <td>$5.99</td>
              <td>$8.99</td>
              <td>$28.99</td>
            </tr>
            <tr>
              <td>Adding item</td>
              <td>$0</td>
              <td>$1</td>
              <td>$2</td>
            </tr>
          </tbody>
        </table>
        <strong style={{ color: "#333" }}>Order Tracking</strong>
        <p>
          Once your order has been shipped, you will receive a tracking number
          via email. You can use this number to monitor your shipment’s progress
          through our tracking portal or the courier's website.
        </p>
        <strong style={{ color: "#333" }}>Customs, Duties, and Taxes</strong>
        <p>
          Orders shipped outside of the USA may be subject to customs duties,
          taxes, and fees imposed by the destination country.
        </p>
        <p>
          These charges are the customer’s responsibility and will vary
          depending on the country’s regulations
        </p>
        <strong style={{ color: "#333" }}>
          Failed Deliveries and Address Issues
        </strong>
        <p>
          BluPrinter is not responsible for packages that are delayed, lost, or
          returned due to incorrect or incomplete shipping addresses provided by
          the customer. Please ensure your shipping information is accurate
          before placing your order.
        </p>
        <p>
          If a package is returned to us due to an incorrect address, additional
          shipping fees may apply to resend the package.
        </p>
        <strong style={{ color: "#333" }}>Delayed or Missing Shipments</strong>
        <p>
          If your order has not arrived within the estimated delivery time,
          please check your tracking information or contact us at [insert
          customer service email]. We will work with our shipping partners to
          resolve any issues.
        </p>
        <strong>Contact Us</strong>
        <p>
          If you have any questions or concerns about your shipment, feel free
          to reach out to our customer service team at [insert contact email].
          We’re here to help!
        </p>
        <p>
          At BluPrinter, customer satisfaction is our priority. Thank you for
          choosing us for your shopping needs!
        </p>
      </div>
    </div>
  );
}
