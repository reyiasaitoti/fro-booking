document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = window.VITE_API_URL;

  fetch(`${apiUrl}/api/tents`)
    .then(response => response.json())
    .then(tents => {
      const pricingGrid = document.getElementById('pricing-grid');

      if (pricingGrid) {
        pricingGrid.innerHTML = '';

        tents.forEach(tent => {
          const tentCard = document.createElement('div');
          tentCard.classList.add('tent-card');

          const tentImage = document.createElement('img');
          tentImage.src = `${apiUrl}/${tent.image.replace(/\\/g, '/')}`; // 👈 Correct dynamic backend image path
          tentImage.alt = tent.title;

          const tentTitle = document.createElement('h3');
          tentTitle.textContent = tent.title;

          const tentDescription = document.createElement('p');
          tentDescription.textContent = tent.description;

          const tentPrice = document.createElement('span');
          tentPrice.classList.add('price');
          tentPrice.textContent = `From $${tent.price}/night`;

          const bookBtn = document.createElement('a');
          bookBtn.href = "#";
          bookBtn.classList.add('book-btn');
          bookBtn.textContent = 'Book Now';
          bookBtn.setAttribute('data-tent-id', tent.id);
          bookBtn.addEventListener('click', function () {
            console.log("Tent ID clicked:", tent.id);
            document.getElementById('tent_id').value = tent.id;
            document.getElementById('booking-modal').style.display = 'flex';
          });

          tentCard.appendChild(tentImage);
          tentCard.appendChild(tentTitle);
          tentCard.appendChild(tentDescription);
          tentCard.appendChild(tentPrice);
          tentCard.appendChild(bookBtn);

          pricingGrid.appendChild(tentCard);
        });
      }
    })
    .catch(error => {
      console.error('Error loading tents:', error);
    });

  const pricingSection = document.querySelector('.pricing');
  if (pricingSection) {
    pricingSection.style.backgroundColor = "#f4f4f4";
  }
});
