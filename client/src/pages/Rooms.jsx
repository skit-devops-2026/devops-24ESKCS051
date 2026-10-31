import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/rooms')
      .then((res) => setRooms(res.data))
      .finally(() => setLoading(false));
  }, []);

  const classrooms = rooms.filter((r) => r.type === 'classroom');
  const auditoriums = rooms.filter((r) => r.type === 'auditorium');

  if (loading) {
    return (
      <main className="container">
        <p className="loading-text">Loading rooms...</p>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="page-intro">
        <h2>Available Rooms</h2>
        <p>Browse classrooms and auditoriums, then book whichever fits your needs.</p>
      </section>

      <section>
        <h3 className="section-heading">Classrooms</h3>
        <div className="room-grid">
          {classrooms.map((room) => (
            <div className="room-card" key={room._id}>
              <div className="room-card-top">
                <span className="room-type-badge room-type-classroom">Classroom</span>
              </div>
              <h4>{room.name}</h4>
              <p className="room-capacity">Capacity: {room.capacity} people</p>
              <p className="room-facilities">{room.facilities}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="section-heading">Auditoriums</h3>
        <div className="room-grid">
          {auditoriums.map((room) => (
            <div className="room-card" key={room._id}>
              <div className="room-card-top">
                <span className="room-type-badge room-type-auditorium">Auditorium</span>
              </div>
              <h4>{room.name}</h4>
              <p className="room-capacity">Capacity: {room.capacity} people</p>
              <p className="room-facilities">{room.facilities}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rooms-cta">
        <p>Found a room that works for you?</p>
        <Link to="/booking" className="cta-button">Book a Room</Link>
      </section>
    </main>
  );
}
