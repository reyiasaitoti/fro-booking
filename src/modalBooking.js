document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("booking-modal");
  const closeModal = document.getElementById("close-modal");
  const form = document.getElementById("booking-form");

  closeModal.onclick = () => {
    modal.style.display = "none";
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      tent_id: document.getElementById("tent_id").value,
      check_in: document.getElementById("check_in").value,
      check_out: document.getElementById("check_out").value,
    };

    const apiUrl = import.meta.env.VITE_API_URL;


    fetch(`${apiUrl}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || "Booking successful!");
        modal.style.display = "none";
        form.reset();
      })
      .catch((error) => {
        console.error("Booking failed:", error);
      });
  });

  document.querySelectorAll(".book-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const tentId = this.getAttribute("data-tent-id");
      document.getElementById("tent_id").value = tentId;
      modal.style.display = "flex";
    });
  });
});
