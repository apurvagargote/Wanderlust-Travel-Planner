// ===== FUZZY CITY LOOKUP =====
function fuzzyFindCity(input) {
  const q = input.toLowerCase().trim().replace(/\s+/g, ' ');

  if (weatherMock[q]) return weatherMock[q];

  const startMatch = Object.keys(weatherMock).find(k => k.startsWith(q));
  if (startMatch) return weatherMock[startMatch];

  const containsMatch = Object.keys(weatherMock).find(k => k.includes(q));
  if (containsMatch) return weatherMock[containsMatch];

  const reverseMatch = Object.keys(weatherMock).find(k => q.includes(k) && k.length > 3);
  if (reverseMatch) return weatherMock[reverseMatch];

  return Object.values(weatherMock).find(v =>
    v.city.toLowerCase().includes(q) || q.includes(v.city.toLowerCase())
  ) || null;
}

// ===== AUTOCOMPLETE SUGGESTIONS =====
function getSuggestions(input) {
  const q = input.toLowerCase().trim();
  if (!q) return [];
  const seen = new Set();
  return Object.values(weatherMock).filter(v => {
    const key = v.city + v.country;
    if (seen.has(key)) return false;
    if (v.city.toLowerCase().includes(q) || v.country.toLowerCase().includes(q)) {
      seen.add(key); return true;
    }
    return false;
  }).slice(0, 5);
}

// ===== FETCH WEATHER =====
function getWeather() {
  const input = document.getElementById('weatherCity').value.trim();
  if (!input) { showToast('Please enter a city name', 'error'); return; }

  hideSuggestions();
  const result = document.getElementById('weatherResult');
  result.innerHTML = '<div class="weather-placeholder"><i class="fas fa-spinner" style="animation:spin 1s linear infinite;font-size:2rem;color:var(--primary)"></i><p>Fetching weather...</p></div>';

  setTimeout(() => {
    const data = fuzzyFindCity(input);

    if (!data) {
      const allCities = [...new Set(Object.values(weatherMock).map(v => v.city))].sort();
      result.innerHTML = `
        <div class="weather-placeholder">
          <i class="fas fa-exclamation-circle" style="color:#ff4757;font-size:2.5rem"></i>
          <p style="font-size:1rem;font-weight:600;color:#ff4757">"${input}" not found</p>
          <p style="font-size:0.82rem;line-height:1.8">
            Try one of these cities:<br/>
            <span style="color:var(--secondary)">${allCities.join(' · ')}</span>
          </p>
        </div>`;
      showToast(`"${input}" not found. See suggestions below.`, 'error');
      return;
    }

    result.innerHTML = `
      <div class="weather-display">
        <div class="weather-icon">${data.icon}</div>
        <div class="weather-city">${data.city}, ${data.country}</div>
        <div class="weather-temp">${data.temp}°C</div>
        <div class="weather-desc">${data.desc}</div>
        <div class="weather-details">
          <div class="weather-detail-item"><i class="fas fa-thermometer-half"></i><strong>${data.feels}°C</strong><span>Feels Like</span></div>
          <div class="weather-detail-item"><i class="fas fa-tint"></i><strong>${data.humidity}%</strong><span>Humidity</span></div>
          <div class="weather-detail-item"><i class="fas fa-wind"></i><strong>${data.wind} km/h</strong><span>Wind</span></div>
          <div class="weather-detail-item"><i class="fas fa-sun"></i><strong>${data.uv}/10</strong><span>UV Index</span></div>
        </div>
      </div>
    `;
    showToast(`Weather loaded for ${data.city} ☁️`, 'success');
  }, 600);
}

// ===== QUICK CITY BUTTONS =====
function quickWeather(city) {
  document.getElementById('weatherCity').value = city;
  hideSuggestions();
  getWeather();
}

// ===== HIDE SUGGESTIONS DROPDOWN =====
function hideSuggestions() {
  const box = document.getElementById('weatherSuggestions');
  if (box) box.innerHTML = '';
}

// ===== SETUP AUTOCOMPLETE =====
function setupWeatherAutocomplete() {
  const input = document.getElementById('weatherCity');
  if (!input) return;

  let suggestBox = document.getElementById('weatherSuggestions');
  if (!suggestBox) {
    suggestBox = document.createElement('div');
    suggestBox.id = 'weatherSuggestions';
    suggestBox.style.cssText = 'position:absolute;top:100%;left:0;right:0;background:#112240;border:1px solid rgba(255,255,255,0.15);border-radius:0 0 12px 12px;z-index:100;overflow:hidden;';
    input.parentElement.style.position = 'relative';
    input.parentElement.appendChild(suggestBox);
  }

  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (q.length < 2) { suggestBox.innerHTML = ''; return; }

    const matches = getSuggestions(q);
    if (!matches.length) { suggestBox.innerHTML = ''; return; }

    suggestBox.innerHTML = matches.map(m => `
      <div onclick="document.getElementById('weatherCity').value='${m.city}';hideSuggestions();getWeather();"
        style="padding:0.6rem 1rem;cursor:pointer;font-size:0.85rem;border-bottom:1px solid rgba(255,255,255,0.07);transition:background 0.2s"
        onmouseover="this.style.background='rgba(255,107,53,0.2)'"
        onmouseout="this.style.background='transparent'">
        ${m.icon} <strong>${m.city}</strong>
        <span style="color:var(--secondary);font-size:0.78rem">${m.country}</span>
      </div>
    `).join('');
  });

  document.addEventListener('click', e => {
    if (!input.parentElement.contains(e.target)) hideSuggestions();
  });
}
