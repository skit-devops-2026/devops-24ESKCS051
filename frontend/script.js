// Campus Room Booking - Phase 2 basic interactivity
// Client-side only for now (no backend/database yet).

document.addEventListener('DOMContentLoaded', function () {

  // ---- Booking form (booking.html) ----
  var bookingForm = document.querySelector('.form-box form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var startInput = document.getElementById('start-time');
      var endInput = document.getElementById('end-time');
      var dateInput = document.getElementById('date');
      var nameInput = document.getElementById('name');

      if (!nameInput.value.trim()) {
        alert('Please enter your name.');
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

      alert('Request submitted! It will be sent to the admin for approval.');
      bookingForm.reset();
    });
  }

  // ---- Admin panel (admin.html) ----
  var approveButtons = document.querySelectorAll('.approve-btn:not([disabled])');
  var rejectButtons = document.querySelectorAll('.reject-btn:not([disabled])');

  approveButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      updateRowStatus(btn, 'approved', 'Approved');
    });
  });

  rejectButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      updateRowStatus(btn, 'rejected', 'Rejected');
    });
  });

  function updateRowStatus(button, className, label) {
    var row = button.closest('tr');
    if (!row) return;

    var statusCell = row.querySelector('.status');
    if (statusCell) {
      statusCell.classList.remove('pending', 'approved', 'rejected');
      statusCell.classList.add(className);
      statusCell.textContent = label;
    }

    var actionButtons = row.querySelectorAll('.actions button');
    actionButtons.forEach(function (b) {
      b.disabled = true;
    });
  }

  function getDurationInMinutes(start, end) {
    var startParts = start.split(':').map(Number);
    var endParts = end.split(':').map(Number);
    var startMinutes = startParts[0] * 60 + startParts[1];
    var endMinutes = endParts[0] * 60 + endParts[1];
    return endMinutes - startMinutes;
  }

});
