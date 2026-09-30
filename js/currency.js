// ===== CURRENCY DATA =====
const currencies = [
  { code:'USD', name:'US Dollar',           flag:'🇺🇸', symbol:'$'  },
  { code:'EUR', name:'Euro',                flag:'🇪🇺', symbol:'€'  },
  { code:'GBP', name:'British Pound',       flag:'🇬🇧', symbol:'£'  },
  { code:'JPY', name:'Japanese Yen',        flag:'🇯🇵', symbol:'¥'  },
  { code:'AUD', name:'Australian Dollar',   flag:'🇦🇺', symbol:'A$' },
  { code:'CAD', name:'Canadian Dollar',     flag:'🇨🇦', symbol:'C$' },
  { code:'CHF', name:'Swiss Franc',         flag:'🇨🇭', symbol:'Fr' },
  { code:'CNY', name:'Chinese Yuan',        flag:'🇨🇳', symbol:'¥'  },
  { code:'INR', name:'Indian Rupee',        flag:'🇮🇳', symbol:'₹'  },
  { code:'AED', name:'UAE Dirham',          flag:'🇦🇪', symbol:'د.إ'},
  { code:'IDR', name:'Indonesian Rupiah',   flag:'🇮🇩', symbol:'Rp' },
  { code:'THB', name:'Thai Baht',           flag:'🇹🇭', symbol:'฿'  },
  { code:'MYR', name:'Malaysian Ringgit',   flag:'🇲🇾', symbol:'RM' },
  { code:'SGD', name:'Singapore Dollar',    flag:'🇸🇬', symbol:'S$' },
  { code:'NZD', name:'New Zealand Dollar',  flag:'🇳🇿', symbol:'NZ$'},
  { code:'MXN', name:'Mexican Peso',        flag:'🇲🇽', symbol:'$'  },
  { code:'BRL', name:'Brazilian Real',      flag:'🇧🇷', symbol:'R$' },
  { code:'ZAR', name:'South African Rand',  flag:'🇿🇦', symbol:'R'  },
  { code:'TRY', name:'Turkish Lira',        flag:'🇹🇷', symbol:'₺'  },
  { code:'MAD', name:'Moroccan Dirham',     flag:'🇲🇦', symbol:'د.م'},
  { code:'EGP', name:'Egyptian Pound',      flag:'🇪🇬', symbol:'£'  },
  { code:'KRW', name:'South Korean Won',    flag:'🇰🇷', symbol:'₩'  },
  { code:'HKD', name:'Hong Kong Dollar',    flag:'🇭🇰', symbol:'HK$'},
  { code:'SEK', name:'Swedish Krona',       flag:'🇸🇪', symbol:'kr' },
  { code:'NOK', name:'Norwegian Krone',     flag:'🇳🇴', symbol:'kr' },
  { code:'DKK', name:'Danish Krone',        flag:'🇩🇰', symbol:'kr' },
  { code:'PLN', name:'Polish Zloty',        flag:'🇵🇱', symbol:'zł' },
  { code:'CZK', name:'Czech Koruna',        flag:'🇨🇿', symbol:'Kč' },
  { code:'HUF', name:'Hungarian Forint',    flag:'🇭🇺', symbol:'Ft' },
  { code:'RON', name:'Romanian Leu',        flag:'🇷🇴', symbol:'lei'},
  { code:'BGN', name:'Bulgarian Lev',       flag:'🇧🇬', symbol:'лв' },
  { code:'HRK', name:'Croatian Kuna',       flag:'🇭🇷', symbol:'kn' },
  { code:'RUB', name:'Russian Ruble',       flag:'🇷🇺', symbol:'₽'  },
  { code:'PKR', name:'Pakistani Rupee',     flag:'🇵🇰', symbol:'₨'  },
  { code:'BDT', name:'Bangladeshi Taka',    flag:'🇧🇩', symbol:'৳'  },
  { code:'LKR', name:'Sri Lankan Rupee',    flag:'🇱🇰', symbol:'₨'  },
  { code:'NPR', name:'Nepalese Rupee',      flag:'🇳🇵', symbol:'₨'  },
  { code:'MVR', name:'Maldivian Rufiyaa',   flag:'🇲🇻', symbol:'Rf' },
  { code:'PEN', name:'Peruvian Sol',        flag:'🇵🇪', symbol:'S/' },
  { code:'ARS', name:'Argentine Peso',      flag:'🇦🇷', symbol:'$'  },
  { code:'CLP', name:'Chilean Peso',        flag:'🇨🇱', symbol:'$'  },
  { code:'COP', name:'Colombian Peso',      flag:'🇨🇴', symbol:'$'  },
  { code:'PHP', name:'Philippine Peso',     flag:'🇵🇭', symbol:'₱'  },
  { code:'VND', name:'Vietnamese Dong',     flag:'🇻🇳', symbol:'₫'  },
  { code:'TWD', name:'Taiwan Dollar',       flag:'🇹🇼', symbol:'NT$'},
  { code:'SAR', name:'Saudi Riyal',         flag:'🇸🇦', symbol:'﷼'  },
  { code:'QAR', name:'Qatari Riyal',        flag:'🇶🇦', symbol:'﷼'  },
  { code:'KWD', name:'Kuwaiti Dinar',       flag:'🇰🇼', symbol:'د.ك'},
  { code:'BHD', name:'Bahraini Dinar',      flag:'🇧🇭', symbol:'.د.ب'},
  { code:'OMR', name:'Omani Rial',          flag:'🇴🇲', symbol:'﷼'  },
  { code:'JOD', name:'Jordanian Dinar',     flag:'🇯🇴', symbol:'JD' },
  { code:'ILS', name:'Israeli Shekel',      flag:'🇮🇱', symbol:'₪'  },
  { code:'NGN', name:'Nigerian Naira',      flag:'🇳🇬', symbol:'₦'  },
  { code:'KES', name:'Kenyan Shilling',     flag:'🇰🇪', symbol:'KSh'},
  { code:'GHS', name:'Ghanaian Cedi',       flag:'🇬🇭', symbol:'₵'  },
  { code:'TZS', name:'Tanzanian Shilling',  flag:'🇹🇿', symbol:'TSh'},
  { code:'UGX', name:'Ugandan Shilling',    flag:'🇺🇬', symbol:'USh'},
  { code:'ETB', name:'Ethiopian Birr',      flag:'🇪🇹', symbol:'Br' },
];

// Rates relative to USD (approximate mid-market)
const rates = {
  USD:1,      EUR:0.92,   GBP:0.79,   JPY:149.5,  AUD:1.53,
  CAD:1.36,   CHF:0.89,   CNY:7.24,   INR:83.1,   AED:3.67,
  IDR:15650,  THB:35.1,   MYR:4.72,   SGD:1.34,   NZD:1.63,
  MXN:17.15,  BRL:4.97,   ZAR:18.63,  TRY:32.1,   MAD:10.05,
  EGP:30.9,   KRW:1325,   HKD:7.82,   SEK:10.42,  NOK:10.55,
  DKK:6.88,   PLN:3.97,   CZK:22.8,   HUF:355,    RON:4.57,
  BGN:1.80,   HRK:6.93,   RUB:91.5,   PKR:278,    BDT:110,
  LKR:320,    NPR:133,    MVR:15.4,   PEN:3.72,   ARS:870,
  CLP:950,    COP:3950,   PHP:56.5,   VND:24500,  TWD:31.8,
  SAR:3.75,   QAR:3.64,   KWD:0.307,  BHD:0.376,  OMR:0.385,
  JOD:0.709,  ILS:3.68,   NGN:1550,   KES:129,    GHS:12.5,
  TZS:2530,   UGX:3780,   ETB:56.5,
};

// Rate board pairs to display
const boardPairs = [
  { from:'USD', to:'EUR' }, { from:'USD', to:'GBP' },
  { from:'USD', to:'JPY' }, { from:'USD', to:'AED' },
  { from:'USD', to:'INR' }, { from:'USD', to:'IDR' },
  { from:'EUR', to:'GBP' }, { from:'GBP', to:'JPY' },
  { from:'USD', to:'AUD' }, { from:'USD', to:'CAD' },
];

function getCurrency(code) { return currencies.find(c => c.code === code); }

function convert(amount, from, to) {
  const inUSD = amount / rates[from];
  return inUSD * rates[to];
}

function formatAmount(val, code) {
  const c = getCurrency(code);
  if (!c) return val.toFixed(2);
  if (val >= 1000000) return c.symbol + (val / 1000000).toFixed(2) + 'M';
  if (val >= 1000)    return c.symbol + val.toLocaleString('en-US', { maximumFractionDigits: 2 });
  return c.symbol + val.toFixed(val < 1 ? 4 : 2);
}

function populateSelects() {
  const from = document.getElementById('fromCurrency');
  const to   = document.getElementById('toCurrency');
  currencies.forEach(c => {
    const opt1 = new Option(`${c.flag}  ${c.code} – ${c.name}`, c.code);
    const opt2 = new Option(`${c.flag}  ${c.code} – ${c.name}`, c.code);
    from.add(opt1);
    to.add(opt2);
  });
  from.value = 'USD';
  to.value   = 'EUR';
}

function updateFlags() {
  const fromCode = document.getElementById('fromCurrency').value;
  const toCode   = document.getElementById('toCurrency').value;
  document.getElementById('fromFlag').textContent = getCurrency(fromCode)?.flag || '';
  document.getElementById('toFlag').textContent   = getCurrency(toCode)?.flag   || '';
  document.getElementById('fromSymbol').textContent = getCurrency(fromCode)?.symbol || '$';
}

function convertCurrency() {
  updateFlags();
  const amount   = parseFloat(document.getElementById('currencyAmount').value) || 0;
  const fromCode = document.getElementById('fromCurrency').value;
  const toCode   = document.getElementById('toCurrency').value;
  const result   = convert(amount, fromCode, toCode);
  const rate1    = convert(1, fromCode, toCode);

  const fromC = getCurrency(fromCode);

  const el = document.getElementById('resultAmount');
  el.textContent = formatAmount(result, toCode);
  el.classList.remove('result-pulse');
  void el.offsetWidth;
  el.classList.add('result-pulse');

  document.getElementById('resultRate').textContent =
    `1 ${fromC?.symbol || ''}${fromCode} = ${formatAmount(rate1, toCode)} ${toCode}`;
}

function swapCurrencies() {
  const from = document.getElementById('fromCurrency');
  const to   = document.getElementById('toCurrency');
  [from.value, to.value] = [to.value, from.value];
  convertCurrency();
}

function setQuickPair(from, to) {
  document.getElementById('fromCurrency').value = from;
  document.getElementById('toCurrency').value   = to;
  convertCurrency();
}

const trendSeeds = [1,0,1,0,1,1,0,1,0,1]; // decorative up/down indicators

function buildRateBoard() {
  const board = document.getElementById('rateBoard');
  board.innerHTML = boardPairs.map((p, i) => {
    const fromC  = getCurrency(p.from);
    const toC    = getCurrency(p.to);
    const rate   = convert(1, p.from, p.to);
    const isUp   = trendSeeds[i % trendSeeds.length];
    const trend  = isUp
      ? `<span class="rate-trend up">▲ ${(Math.random()*0.4+0.05).toFixed(2)}%</span>`
      : `<span class="rate-trend down">▼ ${(Math.random()*0.4+0.05).toFixed(2)}%</span>`;
    return `
      <div class="rate-row" style="animation-delay:${i * 0.06}s">
        <div class="rate-pair">
          <span class="rate-flags">${fromC.flag}${toC.flag}</span>
          <div>
            <div class="rate-label">${p.from} / ${p.to}</div>
            <div class="rate-sub">${fromC.name}</div>
          </div>
        </div>
        <div style="text-align:right">
          <div class="rate-value">${formatAmount(rate, p.to)} ${trend}</div>
          <div class="rate-sub">per 1 ${p.from}</div>
        </div>
      </div>`;
  }).join('');
}

function spawnCurrencyParticles() {
  const container = document.getElementById('currencyParticles');
  if (!container) return;
  const symbols = ['$','€','£','¥','₹','₿','Fr','₩','฿','₺'];
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('span');
    s.textContent = symbols[i % symbols.length];
    s.style.cssText = `left:${Math.random()*100}%;animation-duration:${8+Math.random()*12}s;animation-delay:${Math.random()*10}s;font-size:${1+Math.random()*1.2}rem;`;
    container.appendChild(s);
  }
}

// Init
(function initCurrency() {
  populateSelects();
  convertCurrency();
  buildRateBoard();
  spawnCurrencyParticles();
})();
