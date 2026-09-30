// ===== ITINERARY STATE =====
let itinerary = JSON.parse(localStorage.getItem('wl_itinerary') || '[]');

const categoryIcons = {
  sightseeing: '🏛️',
  food:        '🍽️',
  adventure:   '🧗',
  relaxation:  '🧘',
  shopping:    '🛍️',
  transport:   '✈️'
};

// ===== ADD ACTIVITY =====
function addItineraryItem() {
  const name     = document.getElementById('tripName').value.trim();
  const date     = document.getElementById('tripDate').value;
  const activity = document.getElementById('tripActivity').value.trim();
  const category = document.getElementById('tripCategory').value;
  const notes    = document.getElementById('tripNotes').value.trim();

  if (!name || !date || !activity) {
    showToast('Please fill in trip name, date and activity', 'error');
    return;
  }

  itinerary.push({ id: Date.now(), name, date, activity, category, notes });
  localStorage.setItem('wl_itinerary', JSON.stringify(itinerary));

  document.getElementById('tripActivity').value = '';
  document.getElementById('tripNotes').value    = '';

  renderItinerary();
  showToast('Activity added to itinerary! 🗺️', 'success');
}

// ===== DELETE ACTIVITY =====
function deleteItineraryItem(id) {
  itinerary = itinerary.filter(i => i.id !== id);
  localStorage.setItem('wl_itinerary', JSON.stringify(itinerary));
  renderItinerary();
  showToast('Activity removed', 'info');
}

// ===== RENDER ITINERARY (grouped by trip name, sorted by date) =====
function renderItinerary() {
  const list = document.getElementById('itineraryList');

  if (!itinerary.length) {
    list.innerHTML = '<div class="empty-state"><i class="fas fa-map-marked-alt"></i><p>Your itinerary is empty.<br/>Start adding activities!</p></div>';
    return;
  }

  const sorted  = [...itinerary].sort((a, b) => new Date(a.date) - new Date(b.date));
  const grouped = sorted.reduce((acc, item) => {
    if (!acc[item.name]) acc[item.name] = [];
    acc[item.name].push(item);
    return acc;
  }, {});

  list.innerHTML = Object.entries(grouped).map(([tripName, items]) => `
    <div style="margin-bottom:1rem">
      <h4 style="color:var(--secondary);font-size:0.85rem;margin-bottom:0.5rem;letter-spacing:1px;text-transform:uppercase">
        <i class="fas fa-suitcase" style="margin-right:6px;color:var(--primary)"></i>${tripName}
      </h4>
      ${items.map(item => `
        <div class="itinerary-item">
          <div class="itinerary-icon">${categoryIcons[item.category] || '📍'}</div>
          <div class="itinerary-info">
            <h4>${item.activity}</h4>
            <p>${item.notes || 'No notes added'}</p>
            <span class="itinerary-date">
              <i class="fas fa-calendar-alt"></i>
              ${new Date(item.date).toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' })}
            </span>
          </div>
          <button class="delete-btn" onclick="deleteItineraryItem(${item.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `).join('')}
    </div>
  `).join('');
}

// ===== PRE-FILL FROM MODAL =====
function prefillItinerary(name) {
  document.getElementById('tripName').value = name;
  document.getElementById('itinerary').scrollIntoView({ behavior: 'smooth' });
}
