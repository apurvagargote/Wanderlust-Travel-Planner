// ===== HERO SLIDESHOW =====
let heroIndex = 0;

function startHeroSlideshow() {
  const el = document.getElementById('heroSlideshow');
  function setSlide() {
    el.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
    heroIndex = (heroIndex + 1) % heroImages.length;
  }
  setSlide();
  setInterval(setSlide, 5000);
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE NAV TOGGLE =====
document.getElementById('navToggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// ===== HERO SEARCH =====
function searchDestinations() {
  const q = document.getElementById('heroSearch').value.toLowerCase().trim();
  if (!q) { renderDestinations(destinations); return; }

  const filtered = destinations.filter(d =>
    d.name.toLowerCase().includes(q)     ||
    d.country.toLowerCase().includes(q)  ||
    d.category.toLowerCase().includes(q) ||
    d.tags.some(t => t.toLowerCase().includes(q))
  );

  document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
  renderDestinations(filtered);
  showToast(`Found ${filtered.length} destination(s) for "${q}"`, 'info');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('heroSearch').addEventListener('keypress', e => {
    if (e.key === 'Enter') searchDestinations();
  });
});
