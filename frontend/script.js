// Campus Room Booking - Phase 2: localStorage-backed booking system
// No backend yet - all data lives in the browser's localStorage.

const STORAGE_KEY = 'campusBookings';

function getBookings() {
  var raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

function getDurationInMinutes(start, end) {
  var startParts = start.split(':').map(Number);
  var endParts = end.split(':').map(Number);
  var startMinutes = startParts[0] * 60 + startParts[1];
  var endMinutes = endParts[0] * 60 + endParts[1];
  return endMinutes - startMinutes;
}

function formatStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

document.addEventListener('DOMContentLoaded', function () {

  // ---- Booking form + My Requests table (booking.html) ----
  var bookingForm = document.querySelector('.form-box form');
  var requestsBody = document.querySelector('.status-box tbody');

  function renderMyRequests() {
    if (!requestsBody) return;
    var bookings = getBookings();
    requestsBody.innerHTML = '';

    if (bookings.length === 0) {
      var emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="4">No requests yet. Submit the form above to create one.</td>';
      requestsBody.appendChild(emptyRow);
      return;
    }

    bookings.slice().reverse().forEach(function (booking) {
      var row = document.createElement('tr');
      row.innerHTML =
        '<td>' + booking.roomNumber + '</td>' +
        '<td>' + booking.date + '</td>' +
        '<td>' + booking.startTime + ' - ' + booking.endTime + '</td>' +
        '<td class="status ' + booking.status + '">' + formatStatus(booking.status) + '</td>';
      requestsBody.appendChild(row);
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = document.getElementById('name');
      var requesterTypeInput = document.getElementById('requester-type');
      var roomTypeInput = document.getElementById('room-type');
      var roomNumberInput = document.getElementById('room-number');
      var dateInput = document.getElementById('date');
      var startInput = document.getElementById('start-time');
      var endInput = document.getElementById('end-time');
      var purposeInput = document.getElementById('purpose');

      if (!nameInput.value.trim()) {
        alert('Please enter your name.');
        return;
      }
      if (!roomNumberInput.value.trim()) {
        alert('Please enter a room number or auditorium name.');
        return;
      }
      if (!dateInput.value) {
        alert('Please choose a date.');
        return;
      }
      if (!startInput.value || !endInput.value) {
        alert('Please choose both a start and end time.');
        return;
      }

      var duration = getDurationInMinutes(startInput.value, endInput.value);

      if (duration <= 0) {
        alert('End time must be after start time.');
        return;
      }
      if (duration < 120 || duration > 180) {
        alert('Bookings must be between 2 and 3 hours long.');
        return;
      }

      var bookings = getBookings();
      bookings.push({
        id: Date.now().toString(),
        name: nameInput.value.trim(),
        requesterType: requesterTypeInput.value,
        roomType: roomTypeInput.value,
        roomNumber: roomNumberInput.value.trim(),
        date: dateInput.value,
        startTime: startInput.value,
        endTime: endInput.value,
        purpose: purposeInput.value.trim(),
        status: 'pending'
      });
      saveBookings(bookings);

      alert('Request submitted! It will be sent to the admin for approval.');
      bookingForm.reset();
      renderMyRequests();
    });

    renderMyRequests();
  }

  // ---- Admin panel (admin.html) ----
  var adminBody = document.querySelector('.admin-table-box tbody');

  function renderAdminTable() {
    if (!adminBody) return;
    var bookings = getBookings();
    adminBody.innerHTML = '';

    if (bookings.length === 0) {
      var emptyRow = document.createElement('tr');
      emptyRow.innerHTML = '<td colspan="8">No booking requests yet.</td>';
      adminBody.appendChild(emptyRow);
      updateSummaryCounts(bookings);
      return;
    }

    bookings.slice().reverse().forEach(function (booking) {
      var row = document.createElement('tr');
      row.dataset.id = booking.id;

      var actionsHtml;
      if (booking.status === 'pending') {
        actionsHtml =
          '<button class="approve-btn">Approve</button>' +
          '<button class="reject-btn">Reject</button>';
      } else {
        actionsHtml =
          '<button class="approve-btn" disabled>Approve</button>' +
          '<button class="reject-btn" disabled>Reject</button>';
      }

      row.innerHTML =
        '<td>' + booking.name + '</td>' +
        '<td>' + (booking.requesterType.charAt(0).toUpperCase() + booking.requesterType.slice(1)) + '</td>' +
        '<td>' + booking.roomNumber + '</td>' +
        '<td>' + booking.date + '</td>' +
        '<td>' + booking.startTime + ' - ' + booking.endTime + '</td>' +
        '<td>' + booking.purpose + '</td>' +
        '<td class="status ' + booking.status + '">' + formatStatus(booking.status) + '</td>' +
        '<td class="actions">' + actionsHtml + '</td>';

      adminBody.appendChild(row);
    });

    updateSummaryCounts(bookings);
  }

  function updateSummaryCounts(bookings) {
    var counts = { pending: 0, approved: 0, rejected: 0 };
    bookings.forEach(function (b) { counts[b.status] = (counts[b.status] || 0) + 1; });

    var cards = document.querySelectorAll('.summary-card .count');
    if (cards.length >= 3) {
      cards[0].textContent = counts.pending;
      cards[1].textContent = counts.approved;
      cards[2].textContent = counts.rejected;
    }
  }

  if (adminBody) {
    adminBody.addEventListener('click', function (e) {
      var button = e.target.closest('button');
      if (!button || button.disabled) return;

      var row = button.closest('tr');
      var id = row.dataset.id;
      var bookings = getBookings();
      var booking = bookings.find(function (b) { return b.id === id; });
      if (!booking) return;

      if (button.classList.contains('approve-btn')) {
        booking.status = 'approved';
      } else if (button.classList.contains('reject-btn')) {
        booking.status = 'rejected';
      }

      saveBookings(bookings);
      renderAdminTable();
    });

    renderAdminTable();
  }

});
