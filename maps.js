const urlParams = new URLSearchParams(window.location.search);
const place = urlParams.get('place') || 'Tankulan';

function initMap() {

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

      
      map.setView([pin.lat, pin.lng], 17);

      
      const truckIcon = L.icon({
        iconUrl: 'truck.png.png',  
        iconSize: [40, 40],     
        iconAnchor: [20, 40],   
        popupAnchor: [0, -40]
      });

      
      L.marker([pin.lat, pin.lng], { icon: truckIcon })
        .addTo(map)
        .bindPopup(`<b>${pin.barangay}</b><br>Garbage truck location`);

    })
    .catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", initMap);
