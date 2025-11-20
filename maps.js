const urlParams = new URLSearchParams(window.location.search);
const place = urlParams.get('place') || 'Tankulan';

function initMap() {

  // Temporary initial map
  const map = L.map('map').setView([0, 0], 2);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  fetch('maps.json')
    .then(res => res.json())
    .then(data => {

      const pin = data.find(p => p.barangay === place);

      if (!pin) {
        console.error("Barangay not found:", place);
        return;
      }

      // ✅ Center map EXACTLY on selected barangay
      map.setView([pin.lat, pin.lng], 17);

      // Add marker
      const marker = L.marker([pin.lat, pin.lng]).addTo(map);
      marker.bindPopup(`<b>${pin.title}</b><br>${pin.description}`).openPopup();

    })
    .catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", initMap);