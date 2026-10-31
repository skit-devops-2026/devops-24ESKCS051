import { Link } from 'react-router-dom';

export default function Home() {
  const steps = [
    'Sign up or log in.',
    'Browse available rooms, then fill the booking request form.',
    'Request is sent to the admin with room, date, and time details.',
    'Admin checks if the room is free and approves or rejects it.',
    'If approved, the room is officially allotted to you.',
  ];

  return (
    <main>
      <section className="hero">
        <span className="hero-eyebrow">Zenith</span>
        <h2>Campus room booking, without the back-and-forth</h2>
        <p>
          Students and teachers can request an empty classroom or the
          auditorium for a couple of hours. Submit a request, an admin
          approves it, and the room is yours.
        </p>
        <div className="hero-actions">
          <Link to="/rooms" className="cta-button">Browse Rooms</Link>
          <Link to="/signup" className="cta-button cta-button-ghost">Get Started</Link>
        </div>
      </section>

      <section className="container">
        <h3 className="section-heading">How it works</h3>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <div className="step-card" key={i}>
              <span className="step-number">{i + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
