// ===== BUDGET STATE =====
let customExpenses = [];

// ===== ADD CUSTOM EXPENSE =====
function addExpense() {
  const name   = document.getElementById('expenseName').value.trim();
  const amount = parseFloat(document.getElementById('expenseAmount').value);

  if (!name || isNaN(amount) || amount <= 0) {
    showToast('Enter valid expense name and amount', 'error');
    return;
  }

  customExpenses.push({ id: Date.now(), name, amount });
  document.getElementById('expenseName').value   = '';
  document.getElementById('expenseAmount').value = '';
  renderExpenses();
}

// ===== REMOVE CUSTOM EXPENSE =====
function removeExpense(id) {
  customExpenses = customExpenses.filter(e => e.id !== id);
  renderExpenses();
}

// ===== RENDER EXPENSE LIST =====
function renderExpenses() {
  document.getElementById('budgetItemsList').innerHTML = customExpenses.map(e => `
    <div class="expense-item">
      <span>${e.name}</span>
      <span>$${e.amount.toFixed(2)}</span>
      <button onclick="removeExpense(${e.id})"><i class="fas fa-times"></i></button>
    </div>
  `).join('');
}

// ===== CALCULATE BUDGET =====
function calculateBudget() {
  const dest   = document.getElementById('budgetDest').value.trim() || 'Your Trip';
  const days   = parseInt(document.getElementById('budgetDays').value)   || 7;
  const people = parseInt(document.getElementById('budgetPeople').value) || 1;
  const style  = document.getElementById('budgetStyle').value;

  const rates = {
    budget: { hotel: 40,  food: 25,  transport: 15,  activities: 20  },
    mid:    { hotel: 120, food: 60,  transport: 40,  activities: 60  },
    luxury: { hotel: 400, food: 150, transport: 120, activities: 150 }
  };

  const r          = rates[style];
  const hotel      = r.hotel      * days * Math.ceil(people / 2);
  const food       = r.food       * days * people;
  const transport  = r.transport  * days * people;
  const activities = r.activities * days * people;
  const extras     = customExpenses.reduce((s, e) => s + e.amount, 0);
  const subtotal   = hotel + food + transport + activities + extras;
  const buffer     = Math.round(subtotal * 0.1);
  const total      = subtotal + buffer;

  const tips = {
    budget: '💡 Book hostels early and use local transport to save more!',
    mid:    '💡 Mix free attractions with paid ones for the best experience.',
    luxury: '💡 Book premium experiences in advance for the best availability.'
  };

  document.getElementById('budgetResult').innerHTML = `
    <div class="budget-result-content">
      <div class="budget-dest-title">✈️ ${dest}</div>
      <div style="text-align:center;margin-bottom:1rem;color:var(--text-light);font-size:0.85rem">
        ${days} days · ${people} traveler(s) · ${style.charAt(0).toUpperCase() + style.slice(1)}
      </div>
      <div class="budget-breakdown">
        <div class="budget-line"><span>🏨 Accommodation</span><strong>$${hotel.toLocaleString()}</strong></div>
        <div class="budget-line"><span>🍽️ Food & Dining</span><strong>$${food.toLocaleString()}</strong></div>
        <div class="budget-line"><span>🚌 Transport</span><strong>$${transport.toLocaleString()}</strong></div>
        <div class="budget-line"><span>🎭 Activities</span><strong>$${activities.toLocaleString()}</strong></div>
        ${extras > 0 ? `<div class="budget-line"><span>📦 Custom Expenses</span><strong>$${extras.toLocaleString()}</strong></div>` : ''}
        <div class="budget-line"><span>🛡️ Emergency Buffer (10%)</span><strong>$${buffer.toLocaleString()}</strong></div>
      </div>
      <div class="budget-total">
        <span>💰 Total Estimated</span><span>$${total.toLocaleString()}</span>
      </div>
      <div class="budget-tip">${tips[style]}</div>
    </div>
  `;
  showToast('Budget calculated! 💰', 'success');
}
