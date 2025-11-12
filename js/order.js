// order.js
let currentOrder = {}; // { category: dishObject }

document.addEventListener('DOMContentLoaded', () => {
    createOrderDisplayContainer();
    updateOrderDisplay();
    attachFormHandlers();
});

function createOrderDisplayContainer() {
    const formColumns = document.querySelectorAll('.form-column');
    if (!formColumns || formColumns.length === 0) return;
    const orderColumn = formColumns[0];
    if (!orderColumn) return;
    if (orderColumn.querySelector('.order-display-root')) return;

    const root = document.createElement('div');
    root.className = 'order-display-root';
    root.innerHTML = `
        <div class="order-message">Ничего не выбрано</div>
        <div class="order-items" style="display:none;"></div>
    `;
    const h3 = orderColumn.querySelector('h3');
    if (h3) h3.insertAdjacentElement('afterend', root);
    else orderColumn.prepend(root);
}

function addToOrder(dish) {
    // Снять выделение предыдущего элемента в этой категории
    if (currentOrder[dish.category]) {
        const prevKey = currentOrder[dish.category].keyword;
        const prevCard = document.querySelector(`.dish-card[data-dish="${prevKey}"]`);
        if (prevCard) prevCard.classList.remove('selected');
    }

    currentOrder[dish.category] = dish;

    // Выделить текущую карточку
    const curCard = document.querySelector(`.dish-card[data-dish="${dish.keyword}"]`);
    if (curCard) curCard.classList.add('selected');

    updateOrderDisplay();
    updateFormSelects();
}

function updateOrderDisplay() {
    const root = document.querySelector('.order-display-root');
    if (!root) return;
    const msg = root.querySelector('.order-message');
    const items = root.querySelector('.order-items');

    const categoriesOrder = [
        { key: 'soup', label: 'Суп' },
        { key: 'main_course', label: 'Главное блюдо' },
        { key: 'salad', label: 'Салат/стартер' },
        { key: 'beverage', label: 'Напиток' },
        { key: 'dessert', label: 'Десерт' }
    ];

    if (Object.keys(currentOrder).length === 0) {
        msg.textContent = 'Ничего не выбрано';
        msg.style.display = 'block';
        items.style.display = 'none';
        hidePriceBlock();
        return;
    }

    msg.style.display = 'none';
    items.style.display = 'block';
    items.innerHTML = '';

    categoriesOrder.forEach(c => {
        const div = document.createElement('div');
        div.className = 'order-category';

        if (currentOrder[c.key]) {
            div.innerHTML = `<p><strong>${c.label}:</strong> ${currentOrder[c.key].name} — ${currentOrder[c.key].price}₽</p>`;
        } else {
            // плейсхолдеры
            let placeholder = 'Блюдо не выбрано';
            if (c.key === 'beverage') placeholder = 'Напиток не выбран';
            if (c.key === 'soup') placeholder = 'Суп не выбран';
            if (c.key === 'main_course') placeholder = 'Главное блюдо не выбрано';
            if (c.key === 'salad') placeholder = 'Салат/стартер не выбран';
            if (c.key === 'dessert') placeholder = 'Десерт не выбран';
            div.innerHTML = `<p>${placeholder}</p>`;
        }
        items.appendChild(div);
    });

    updateTotalPrice();
}

function updateTotalPrice() {
    const total = Object.values(currentOrder).reduce((s, d) => s + (d.price || 0), 0);
    const root = document.querySelector('.order-display-root');
    if (!root) return;
    let priceBlock = root.querySelector('.order-price');
    if (!priceBlock) {
        priceBlock = document.createElement('div');
        priceBlock.className = 'order-price';
        priceBlock.style.marginTop = '10px';
        root.querySelector('.order-items').appendChild(priceBlock);
    }
    if (total > 0) {
        priceBlock.innerHTML = `<p><strong>Стоимость заказа:</strong> ${total}₽</p>`;
        priceBlock.style.display = 'block';
    } else {
        priceBlock.style.display = 'none';
    }
}

function hidePriceBlock() {
    const root = document.querySelector('.order-display-root');
    if (!root) return;
    const priceBlock = root.querySelector('.order-price');
    if (priceBlock) priceBlock.style.display = 'none';
}

/**
 * Записывает keyword'ы выбранных блюд в select'ы формы, если они там есть.
 * mapping: soup -> id "soup", main_course -> "main_dish", beverage -> "beverage",
 * salad -> "salad", dessert -> "dessert"
 */
function updateFormSelects() {
    const mapping = {
        soup: 'soup',
        main_course: 'main_dish',
        beverage: 'beverage',
        salad: 'salad',
        dessert: 'dessert'
    };
    Object.keys(mapping).forEach(cat => {
        const sel = document.getElementById(mapping[cat]);
        if (!sel) return;
        if (currentOrder[cat]) sel.value = currentOrder[cat].keyword;
        else sel.value = '';
    });
}

function attachFormHandlers() {
    const orderForm = document.getElementById('orderForm');
    if (!orderForm) return;

    orderForm.addEventListener('submit', (e) => {
        updateFormSelects();
        // форма дальше отправляется стандартно
    });

    orderForm.addEventListener('reset', () => {
        setTimeout(() => {
            currentOrder = {};
            document.querySelectorAll('.dish-card.selected').forEach(el => el.classList.remove('selected'));
            updateOrderDisplay();
            updateFormSelects();
        }, 0);
    });
}

// стиль выделения карточки (можно переместить в css)
(function addSelectionStyle() {
    const style = document.createElement('style');
    style.textContent = `
    .dish-card.selected {
        border: 2px solid tomato !important;
    }
    .order-display-root { margin-top: 12px; }
    .order-category { margin: 6px 0; }
    .order-price { background: #f9f9f9; padding: 8px; border-radius: 6px; }
    `;
    document.head.appendChild(style);
})();
