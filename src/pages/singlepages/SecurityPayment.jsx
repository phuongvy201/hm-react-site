import { Link } from "react-router-dom";

export default function SecurityPayment() {
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
        <strong>Security & Payment</strong>
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

      <strong style={{ color: "#333" }}>Payment Methods </strong>
      <p style={{ lineHeight: "1.6", color: "#555" }}>
        At BluPrinter, we strive to provide convenient and secure payment
        options for our customers. Below is a detailed list of available payment
        methods:
      </p>
      <strong style={{ color: "#333" }}>Accepted Payment Methods</strong>

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
                Payment Method
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
                Availability
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                Visa, Mastercard, American Express (credit/debit cards and
                prepaid cards via Stripe)
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                Worldwide – See the full list of supported countries
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                Buy Now, Pay Later: Afterpay, Affirm, Klarna (via Stripe)
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                United States*
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                Apple Pay, Google Pay (via Stripe)
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                See the list of supported countries
              </td>
            </tr>
            <tr>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                PayPal
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                }}
              >
                See the list of supported countries
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <br />

      <i style={{ color: "#333" }}>Important Notes:</i>
      <br />
      <ol class="payment-list mt-2">
        <li>
          <p>Billing Address Requirement:</p>
          <p>
            All online transactions must be linked to a valid billing address.
          </p>
          <p>
            Ensure that the billing address provided matches the one associated
            with your credit card, prepaid card, or bank account.
          </p>
        </li>
        <li>
          <p>Buy Now, Pay Later (BNPL):</p>
          <p>
            Currently, Buy Now, Pay Later is only available in the United
            States.
          </p>
          <p>
            European customers will soon have access to this feature. For
            updates, please visit our BNPL information page.
          </p>
        </li>
        <li>
          <p>Affirm Payment Option:</p>
          <ul>
            <li>
              Payment options through Affirm are subject to eligibility and may
              not be available in all U.S. states.
            </li>
            <li>
              Loans provided through Affirm are subject to approval by their
              lending partners. For details, visit{" "}
              <Link className="text-danger" to="https://www.affirm.com/lenders">
                affirm.com/lenders
              </Link>
              .
            </li>
            <li>
              For California residents: Loans by Affirm Loan Services, LLC are
              issued under a California Finance Lenders Law license.
            </li>
          </ul>
        </li>
      </ol>
      <strong> Secure Payment Guarantee</strong>
      <p>
        At BluPrinter, we prioritize the safety and security of your personal
        data and payment information. Below is a comprehensive overview of how
        we handle your information and ensure secure transactions:
      </p>
      <p>a) Personal Data for Order Processing</p>
      <p>
        To complete your order, it is necessary to provide personal data
        required for processing.
      </p>
      <i>Mandatory vs. Voluntary Data:</i>
      <p>
        Mandatory fields are clearly marked and essential for fulfilling your
        order.
      </p>
      <p>
        Additional data fields are voluntary and help us improve your
        experience.
      </p>
      <i>User Accounts:</i>
      <ul>
        <li>
          You may create a password-protected account to save your data for
          future purchases.
        </li>
        <li>
          You can delete your account and data at any time via your account
          settings.
        </li>
      </ul>
      <p>
        <i>Data Encryption:</i> To prevent unauthorized access, the entire order
        process is encrypted using TLS (Transport Layer Security) technology.
      </p>
      <i>Third-Party Data Sharing:</i>
      <p>
        Personal data may be shared with our production partners or shipping
        companies to ensure order fulfillment and delivery.
      </p>
      <p>Payment processing is handled securely via PayPal and Stripe.</p>
      <ul>
        <li>
          PayPal: For details on data protection, refer to PayPal’s Privacy
          Policy.
        </li>
        <li>
          Stripe: For details on data protection, refer to Stripe’s Privacy
          Policy.
        </li>
      </ul>
      <i>Order Tracking:</i>
      <p>
        For trackable shipments, your order and address details may be shared
        with Printify Inc to facilitate parcel tracking and delivery updates.
      </p>
      <i>Data Retention:</i>
      <p>
        In compliance with tax and commercial regulations, order, address, and
        payment data is stored for 10 years.
      </p>
      <p> b) Fraud Prevention</p>
      <i>Fraud Checks via Stripe:</i>
      <p>
        During the checkout process, Stripe uses your IP address for geolocation
        and fraud detection. If a payment method is declined, it may be due to
        fraud prevention measures.
      </p>
      <i>Right to Appeal:</i>
      <p>
        You can challenge automated decisions (e.g., rejected payment methods)
        by contacting us for a manual review.
      </p>
      <p>c) Address Auto-Completion</p>
      <p>To enhance the ordering process, we use Google Maps Autocomplete.</p>
      <i>Feature Benefits:</i>
      <p>
        Automatically completes your address to reduce errors and ensure
        accurate deliveries.
      </p>
      <i>Google Data Handling:</i>
      <p>
        Google may collect data during this process, including geolocation via
        your IP address. For details, refer to Google’s Privacy Policy and the
        Terms of Use for Google Maps.
      </p>
      <p>d) Feedback Requests</p>
      <p>We use feedback tools to improve our services.</p>
      <i>Trustpilot Reviews:</i>
      <p>
        After your purchase, you may receive an email invitation to rate your
        experience.
      </p>
      <p>
        We share limited data (e.g., name, order number) with Trustpilot to
        generate a feedback link.
      </p>
      <p>For more information, visit Trustpilot’s Privacy Policy.</p>
      <i>Google Customer Reviews:</i>
      <p>
        With your consent, Google may send a review request after your order.
      </p>
      <p>For details, refer to Google’s Privacy Policy.</p>
      <p>
        You can opt out of review requests anytime via the unsubscribe link in
        the email.
      </p>
      <p>e) Consent to Privacy Policy and Terms</p>
      <p>
        By completing a transaction, you agree to our Privacy Policy and Terms
        of Service.
      </p>
      <p>
        For further questions about our secure payment process, feel free to
        contact us at <i>support@bluprinter.com.</i>
      </p>
    </div>
  );
}
