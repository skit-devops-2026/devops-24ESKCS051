import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Booking() {
  // dropdown options, loaded once
  const [rooms, setRooms] = useState([]);

  // the booking form fields
  const [roomId, setRoomId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [purpose, setPurpose] = useState('');

  // my existing requests, so I can see what I already asked for
  const [myBookings, setMyBookings] = useState([]);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // load rooms + my past bookings together when the page opens
  useEffect(() => {
    Promise.all([api.get('/api/rooms'), api.get('/api/bookings/my')])
      .then(([roomsRes, bookingsRes]) => {
        setRooms(roomsRes.data);
        setMyBookings(bookingsRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  function refreshMyBookings() {
    api.get('/api/bookings/my').then((res) => setMyBookings(res.data));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await api.post('/api/bookings', {
        room: roomId,
        date,
        startTime,
        endTime,
        purpose,
      });
      setMessage('Request submitted! Wait for the admin to approve it.');
      // clear the form
      setRoomId('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setPurpose('');
      refreshMyBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit the request');
    }
  }

  if (loading) {
    return (
      <main className="container">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="booking-box">
        <h2>Book a Room</h2>
        <p>Pick a room, date, and time slot (2-3 hours), then submit for approval.</p>

        {error && <p className="form-error">{error}</p>}
        {message && <p className="form-success">{message}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="room">Room</label>
          <select
            id="room"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
          >
            <option value="">-- choose a room --</option>
            {rooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.name} ({room.type})
              </option>
            ))}
          </select>

          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label htmlFor="startTime">Start Time</label>
          <input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />

          <label htmlFor="endTime">End Time</label>
          <input
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />

          <label htmlFor="purpose">Purpose</label>
          <input
            id="purpose"
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="e.g. Club meeting, extra class"
            required
          />

          <button type="submit">Submit Request</button>
        </form>
      </section>

      <section className="my-requests-box">
        <h2>My Requests</h2>
        {myBookings.length === 0 ? (
          <p>You haven't made any requests yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Room</th>
                <th>Date</th>
                <th>Time</th>
                <th>Purpose</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.room?.name}</td>
                  <td>{b.date}</td>
                  <td>{b.startTime} - {b.endTime}</td>
                  <td>{b.purpose}</td>
                  <td>
                    <span className={`status-badge status-${b.status}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
