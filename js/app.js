// ===== TOAST NOTIFICATION =====
function showToast(msg, type = 'info') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== APP INIT =====
document.addEventListener('DOMContentLoaded', () => {
  startHeroSlideshow();
  renderDestinations(destinations);
  renderItinerary();
  renderFavorites();
  setupWeatherAutocomplete();
  document.getElementById('favCount').textContent = favorites.length;
});
