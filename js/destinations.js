// ===== RENDER DESTINATION CARDS =====
function renderDestinations(list) {
  const grid = document.getElementById('destinationsGrid');
  if (!list.length) {
    grid.innerHTML = '<div class="empty-state full-width"><i class="fas fa-search"></i><p>No destinations found.</p></div>';
    return;
  }
  grid.innerHTML = list.map((d, i) => `
    <div class="dest-card fade-in" style="animation-delay:${i * 0.08}s" onclick="openModal(${d.id})">
      <img src="${d.img}" alt="${d.name}" loading="lazy"/>
      <div class="dest-card-overlay"></div>
      <span class="dest-tag">${d.tag}</span>
      <button class="fav-btn ${favorites.includes(d.id) ? 'active' : ''}" onclick="toggleFav(event,${d.id})">
        <i class="fas fa-heart"></i>
      </button>
      <div class="dest-card-info">
        <h3>${d.name}</h3>
        <p class="country"><i class="fas fa-map-marker-alt"></i> ${d.country}</p>
        <div class="dest-card-meta">
          <span class="dest-rating"><i class="fas fa-star"></i> ${d.rating}</span>
          <span class="dest-price">From ${d.price}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== FILTER BY CATEGORY =====
function filterDest(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filtered = cat === 'all' ? destinations : destinations.filter(d => d.category === cat);
  renderDestinations(filtered);
}

// ===== DESTINATION MODAL =====
let _modalMap = null; // unused, kept for compatibility

function openModal(id) {
  const d = destinations.find(x => x.id === id);
  if (!d) return;
  const isFav = favorites.includes(d.id);

  document.getElementById('modalContent').innerHTML = `
    <img class="modal-img" src="${d.img}" alt="${d.name}"/>
    <div class="modal-body">
      <h2>${d.name}</h2>
      <p class="modal-country"><i class="fas fa-map-marker-alt"></i> ${d.country} &nbsp;|&nbsp; <i class="fas fa-tag"></i> ${d.category}</p>
      <div class="modal-actions">
        <button class="btn-add-fav" onclick="toggleFavModal(${d.id})">
          <i class="fas fa-heart"></i> ${isFav ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
        <button class="btn-plan" onclick="prefillItinerary('${d.name}'); closeModal()">
          <i class="fas fa-map"></i> Plan Trip
        </button>
      </div>

      <!-- TABS -->
      <div class="modal-tabs">
        <button class="tab-btn active" onclick="switchTab(event,'tab-overview')"><i class="fas fa-info-circle"></i> Overview</button>
        <button class="tab-btn" onclick="switchTab(event,'tab-attractions')"><i class="fas fa-map-pin"></i> Attractions</button>
        <button class="tab-btn" onclick="switchTab(event,'tab-food')"><i class="fas fa-utensils"></i> Food</button>
        <button class="tab-btn" onclick="switchTab(event,'tab-culture')"><i class="fas fa-globe"></i> Culture</button>
        <button class="tab-btn" onclick="switchTab(event,'tab-gallery')"><i class="fas fa-images"></i> Gallery</button>
      </div>

      <!-- TAB: OVERVIEW -->
      <div class="tab-panel active" id="tab-overview">
        <p>${d.desc}</p>
        <div class="modal-tags">${d.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}</div>
        <div class="modal-meta">
          <div><i class="fas fa-calendar" style="color:var(--primary)"></i> <strong>Best Time:</strong> <span style="color:var(--secondary)">${d.best}</span></div>
          <div><i class="fas fa-thermometer-half" style="color:var(--primary)"></i> <strong>Avg Temp:</strong> <span style="color:var(--secondary)">${d.temp}</span></div>
          <div><i class="fas fa-star" style="color:#ffd700"></i> <strong>Rating:</strong> <span style="color:var(--secondary)">${d.rating}/5</span></div>
        </div>
        <div id="modalMap" class="modal-map"><iframe id="modalMapFrame" style="width:100%;height:100%;border:0" loading="lazy" allowfullscreen></iframe></div>
      </div>

      <!-- TAB: ATTRACTIONS -->
      <div class="tab-panel" id="tab-attractions">
        ${d.attractions.map(a => `
          <div class="attraction-item">
            <span class="attraction-icon">${a.icon}</span>
            <div>
              <strong>${a.name}</strong>
              <p>${a.desc}</p>
            </div>
          </div>`).join('')}
      </div>

      <!-- TAB: FOOD -->
      <div class="tab-panel" id="tab-food">
        <div class="food-grid">
          ${d.food.map(f => `
            <div class="food-item">
              <span class="food-icon">${f.icon}</span>
              <div class="food-info">
                <strong>${f.dish}</strong>
                <div class="food-meta">
                  <span class="food-price">${f.price}</span>
                  <span class="food-rating"><i class="fas fa-star"></i> ${f.rating}</span>
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <!-- TAB: CULTURE -->
      <div class="tab-panel" id="tab-culture">
        <div class="culture-badges">
          <span><i class="fas fa-coins"></i> ${d.culture.currency}</span>
          <span><i class="fas fa-comment"></i> ${d.culture.language}</span>
          <span><i class="fas fa-place-of-worship"></i> ${d.culture.religion}</span>
        </div>
        <ul class="culture-tips">
          ${d.culture.tips.map(t => `<li><i class="fas fa-lightbulb"></i> ${t}</li>`).join('')}
        </ul>
      </div>

      <!-- TAB: GALLERY -->
      <div class="tab-panel" id="tab-gallery">
        <div class="gallery-grid">
          ${d.gallery.map((g, i) => `
            <div class="gallery-item" onclick="openLightbox('${g}','${d.name}')">
              <img src="${g}" alt="${d.name} photo ${i+1}" loading="lazy"/>
            </div>`).join('')}
        </div>
      </div>
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('active');
  if (d.coords) {
    const [lat, lng] = d.coords;
    document.getElementById('modalMapFrame').src =
      `https://maps.google.com/maps?q=${lat},${lng}&z=12&output=embed&hl=en`;
  }
}

function switchTab(e, tabId) {
  const body = e.target.closest('.modal-body');
  body.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  body.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  e.target.closest('.tab-btn').classList.add('active');
  body.querySelector('#' + tabId).classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

function openLightbox(src, alt) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxImg').alt = alt;
  lb.classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

function toggleFavModal(id) {
  toggleFavById(id);
  openModal(id);
}
