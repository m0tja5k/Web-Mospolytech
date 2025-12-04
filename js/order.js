let currentOrder = {};

const categoriesOrder = [
    { key: 'soup', label: 'Суп' },
    { key: 'main-course', label: 'Главное блюдо' },
    { key: 'salad', label: 'Салат/стартер' },
    { key: 'drink', label: 'Напиток' },
    { key: 'dessert', label: 'Десерт' }
];

function loadOrder() {
    // Проверяем что dishes загружены
    if (!dishes || dishes.length === 0) {
        return;
    }
    const saved = localStorage.getItem('currentOrder');
    if (!saved) return;
    const orderKeywords = JSON.parse(saved);
    Object.keys(orderKeywords).forEach(cat => {
        const keyword = orderKeywords[cat];
        const dish = dishes.find(d => d.keyword === keyword);
        if (dish) {
            currentOrder[cat] = dish;
            const card = document.querySelector(`.dish-card[data-dish="${keyword}"]`);
            if (card) card.classList.add('selected');
        }
    });
}

function saveOrder() {
    const orderKeywords = {};
    Object.keys(currentOrder).forEach(cat => {
        orderKeywords[cat] = currentOrder[cat].keyword;
    });
    localStorage.setItem('currentOrder', JSON.stringify(orderKeywords));
}

function addToOrder(dish) {
    if (currentOrder[dish.category]) {
        const prevKey = currentOrder[dish.category].keyword;
        const prevCard = document.querySelector(`.dish-card[data-dish="${prevKey}"]`);
        if (prevCard) prevCard.classList.remove('selected');
    }

    currentOrder[dish.category] = dish;

    const curCard = document.querySelector(`.dish-card[data-dish="${dish.keyword}"]`);
    if (curCard) curCard.classList.add('selected');

    saveOrder();
    updateOrderSummary();
    if (window.pageType === 'orders') renderSelectedDishes();
}

function removeFromOrder(cat) {
    if (currentOrder[cat]) {
        const keyword = currentOrder[cat].keyword;
        const card = document.querySelector(`.dish-card[data-dish="${keyword}"]`);
        if (card) card.classList.remove('selected');
        delete currentOrder[cat];
        saveOrder();
        updateOrderSummary();
        if (window.pageType === 'orders' && typeof renderSelectedDishes === 'function') {
            renderSelectedDishes().then(() => {
                // После обновления списка блюд обновляем summary
                updateOrderSummary();
            });
        }
    }
}

function createOrderDisplayContainer() {
    const orderColumn = document.querySelectorAll('.form-column')[0];

    const root = document.createElement('div');
    root.className = 'order-display-root';
    root.innerHTML = `
        <div class="order-message">Ничего не выбрано</div>
        <div class="order-items" style="display:none;"></div>
        <div class="order-price" style="margin-top:10px;"></div>
    `;
    const h3 = orderColumn.querySelector('h3');
    if (h3) h3.insertAdjacentElement('afterend', root);
    else orderColumn.prepend(root);
}

function createCheckoutPanel() {
    const panel = document.createElement('div');
    panel.id = 'checkoutPanel';
    panel.className = 'checkout-panel';
    panel.innerHTML = `
        <div class="checkout-panel-content">
            <span id="totalPriceText" class="checkout-price">Стоимость заказа: 0₽</span>
            <a id="checkoutLink" href="orders.html" class="checkout-button">Перейти к оформлению</a>
        </div>
    `;
    document.body.appendChild(panel);
}

function updateOrderSummary() {
    const total = Object.values(currentOrder).reduce((sum, dish) => sum + (dish ? dish.price : 0), 0);
    const validation = validateOrder();

    // For orders.html: Update order display in form
    const root = document.querySelector('.order-display-root');
    if (root) {
        const msg = root.querySelector('.order-message');
        const items = root.querySelector('.order-items');
        const priceBlock = root.querySelector('.order-price');

        // Всегда показываем список категорий, даже если ничего не выбрано
        msg.style.display = 'none';
        items.style.display = 'block';
        items.innerHTML = '';
        
        categoriesOrder.forEach(c => {
            const div = document.createElement('div');
            div.className = 'order-category';
            if (currentOrder[c.key]) {
                div.innerHTML = `<p><strong>${c.label}:</strong> ${currentOrder[c.key].name} — ${currentOrder[c.key].price}₽</p>`;
            } else {
                let placeholder = 'Не выбран';
                if (c.key === 'main-course' || c.key === 'salad' || c.key === 'dessert') placeholder = 'Не выбрано';
                div.innerHTML = `<p><strong>${c.label}:</strong> ${placeholder}</p>`;
            }
            items.appendChild(div);
        });
        
        priceBlock.innerHTML = `<p><strong>Стоимость заказа:</strong> ${total}₽</p>`;
        priceBlock.style.display = 'block';
    }

    // For lunch.html: Update sticky panel
    const panel = document.getElementById('checkoutPanel');
    if (panel) {
        const hasItems = Object.keys(currentOrder).length > 0;
        panel.style.display = hasItems ? 'block' : 'none';
        if (hasItems) {
            document.getElementById('totalPriceText').textContent = `Стоимость заказа: ${total}₽`;
            const link = document.getElementById('checkoutLink');
            
            if (validation.valid) {
                link.classList.remove('disabled');
                link.href = 'orders.html';
            } else {
                link.classList.add('disabled');
                link.href = '#';
            }
        }
    }
}

function attachFormHandlers() {
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const validationResult = validateOrder();
        if (!validationResult.valid) {
            showNotification(validationResult.message);
            return;
        }

        // Add hidden inputs for dishes
        Object.keys(currentOrder).forEach(cat => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = cat;
            input.value = currentOrder[cat].keyword;
            orderForm.appendChild(input);
        });

        orderForm.submit();
    });
    orderForm.addEventListener('reset', () => {
        showNotification('Ничего не выбрано. Выберите блюда для заказа');
        setTimeout(() => {
            currentOrder = {};
            localStorage.removeItem('currentOrder');
            document.querySelectorAll('.dish-card.selected').forEach(el => el.classList.remove('selected'));
            updateOrderSummary();
            if (window.pageType === 'orders') renderSelectedDishes();
        }, 0);
    });
}

function validateOrder() {
    const hasSoup = !!currentOrder.soup;
    const hasMain = !!currentOrder['main-course'];
    const hasSalad = !!currentOrder.salad;
    const hasBeverage = !!currentOrder.drink;

    const validCombos = [
        hasSoup && hasMain && hasSalad && hasBeverage,
        hasSoup && hasMain && hasBeverage, 
        hasSoup && hasSalad && hasBeverage,
        hasMain && hasSalad && hasBeverage,
        hasMain && hasBeverage
    ];

    if (validCombos.some(v => v)) {
        return { valid: true };
    }

    const selectedCount = Object.keys(currentOrder).length - (currentOrder.dessert ? 1 : 0);

    if (selectedCount === 0) {
        return { valid: false, message: 'Ничего не выбрано. Выберите блюда для заказа' };
    }
    if (!hasBeverage && selectedCount > 0) {
        return { valid: false, message: 'Выберите напиток' };
    }
    if (hasSoup && !hasMain && !hasSalad) {
        return { valid: false, message: 'Выберите главное блюдо/салат/стартер' };
    }
    if ((hasSalad || hasBeverage) && !hasSoup && !hasMain) {
        return { valid: false, message: 'Выберите суп или главное блюдо' };
    }
    if ((hasBeverage || currentOrder.dessert) && !hasMain && !hasSoup) {
        return { valid: false, message: 'Выберите главное блюдо' };
    }

    return { valid: false, message: 'Выберите полный ланч согласно доступным вариантам' };
}

function showNotification(message) {
    let overlay = document.querySelector('.notification-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'notification-overlay';
        document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
        <div class="notification-box">
            <p>${message}</p>
            <button>Окей👌</button>
        </div>
    `;

    overlay.style.display = 'flex';

    const button = overlay.querySelector('button');
    button.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('orderForm')) {
        createOrderDisplayContainer();
        attachFormHandlers();
    } else {
        createCheckoutPanel();
    }
});