const urlParams = new URLSearchParams(window.location.search);
const place = urlParams.get('place') || 'Tankulan';

function initMap() {
  const map = L.map('map').setView([8.360053, 124.868342], 17);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  fetch('maps.json')
    .then(res => res.json())
    .then(data => {
      data.forEach(pin => {
        if(pin.barangay === place){
          const marker = L.marker([pin.lat, pin.lng]).addTo(map);
          marker.bindPopup(`<b>${pin.title}</b><br>${pin.description}`);
        }
      });
    })
    .catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", initMap);
