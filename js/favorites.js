// ===== FAVORITES STATE =====
let favorites = JSON.parse(localStorage.getItem('wl_favorites') || '[]');

// ===== TOGGLE FROM CARD BUTTON =====
function toggleFav(e, id) {
  e.stopPropagation();
  toggleFavById(id);
}

// ===== CORE TOGGLE LOGIC =====
function toggleFavById(id) {
  const idx = favorites.indexOf(id);
  if (idx === -1) {
    favorites.push(id);
    showToast('Added to favorites! ❤️', 'success');
  } else {
    favorites.splice(idx, 1);
    showToast('Removed from favorites', 'info');
  }

  localStorage.setItem('wl_favorites', JSON.stringify(favorites));
  document.getElementById('favCount').textContent = favorites.length;

  // Re-render destinations to update heart button state
  const activeBtn = document.querySelector('.filter-btn.active');
  const cat = activeBtn ? activeBtn.textContent.trim().toLowerCase() : 'all';
  renderDestinations(cat === 'all' ? destinations : destinations.filter(d => d.category === cat));

  renderFavorites();
}

// ===== RENDER FAVORITES GRID =====
function renderFavorites() {
  const grid = document.getElementById('favoritesGrid');
  const favDests = destinations.filter(d => favorites.includes(d.id));

  if (!favDests.length) {
    grid.innerHTML = '<div class="empty-state full-width"><i class="fas fa-heart"></i><p>No favorites yet.<br/>Click the heart on any destination!</p></div>';
    return;
  }

  grid.innerHTML = favDests.map(d => `
    <div class="fav-card">
      <img src="${d.img}" alt="${d.name}" loading="lazy"/>
      <div class="fav-card-overlay"></div>
      <div class="fav-card-info">
        <div>
          <h4>${d.name}</h4>
          <p>${d.country}</p>
        </div>
        <button class="remove-fav" onclick="toggleFavById(${d.id})" title="Remove">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `).join('');
}
