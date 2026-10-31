import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  function loadBookings() {
    setLoading(true);
    api
      .get('/api/bookings')
      .then((res) => setBookings(res.data))
      .catch(() => setError('Could not load bookings'))
      .finally(() => setLoading(false));
  }

  // called when the admin clicks Approve or Reject
  async function updateStatus(id, status) {
    setError('');
    try {
      await api.patch(`/api/bookings/${id}`, { status });
      // update that one row locally instead of refetching everything
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update the request');
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
      <section className="admin-box">
        <h2>Admin: All Booking Requests</h2>
        <p>Approve or reject the pending requests below.</p>

        {error && <p className="form-error">{error}</p>}

        <table>
          <thead>
            <tr>
              <th>Requested By</th>
              <th>Room</th>
              <th>Date</th>
              <th>Time</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.user?.name} ({b.user?.email})</td>
                <td>{b.room?.name}</td>
                <td>{b.date}</td>
                <td>{b.startTime} - {b.endTime}</td>
                <td>{b.purpose}</td>
                <td>
                  <span className={`status-badge status-${b.status}`}>
                    {b.status}
                  </span>
                </td>
                <td>
                  {b.status === 'pending' ? (
                    <div className="admin-actions">
                      <button onClick={() => updateStatus(b._id, 'approved')}>
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => updateStatus(b._id, 'rejected')}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span>No action needed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
