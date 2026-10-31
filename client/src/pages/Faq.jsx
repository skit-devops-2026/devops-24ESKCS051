export default function Faq() {
  return (
    <main className="container">
      <section className="faq-box">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h3>Who can book a room?</h3>
          <p>Any signed-up student or teacher can submit a booking request.</p>
        </div>

        <div className="faq-item">
          <h3>How long can I book a room for?</h3>
          <p>Bookings must be between 2 and 3 hours long.</p>
        </div>

        <div className="faq-item">
          <h3>How do I know if my request is approved?</h3>
          <p>
            Check the "My Requests" section on the Booking page — it shows the
            live status (pending, approved, or rejected) of every request you've made.
          </p>
        </div>

        <div className="faq-item">
          <h3>Who approves requests?</h3>
          <p>An admin reviews every request and approves or rejects it.</p>
        </div>

        <div className="faq-item">
          <h3>Can I cancel a request?</h3>
          <p>
            Not yet from this interface — contact the admin directly if you need
            to cancel an approved booking.
          </p>
        </div>
      </section>
    </main>
  );
}
