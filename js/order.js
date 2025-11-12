let currentOrder = {};

document.addEventListener('DOMContentLoaded', () => {
    createOrderDisplayContainer();
    updateOrderDisplay();
    attachFormHandlers();
});

function createOrderDisplayContainer() {
    const formColumns = document.querySelectorAll('.form-column');
    if (!formColumns || formColumns.length === 0) return;

    const orderColumn = formColumns[0];
    const existing = orderColumn.querySelector('.order-display-root');
    if (existing) return;

    const root = document.createElement('div');
    root.className = 'order-display-root';

    root.innerHTML = `
        <div class="order-message">Ничего не выбрано</div>
        <div class="order-items" style="display:none;">
            <!-- сюда будем вставлять выбранные по категориям -->
        </div>
    `;
    const h3 = orderColumn.querySelector('h3');
    if (h3) h3.insertAdjacentElement('afterend', root);
    else orderColumn.prepend(root);
}

function addToOrder(dish) {
    if (currentOrder[dish.category]) {
        const prevKeyword = currentOrder[dish.category].keyword;
        const prevCard = document.querySelector(`.dish-card[data-dish="${prevKeyword}"]`);
        if (prevCard) prevCard.classList.remove('selected');
    }

    currentOrder[dish.category] = dish;
    const curCard = document.querySelector(`.dish-card[data-dish="${dish.keyword}"]`);
    if (curCard) curCard.classList.add('selected');

    updateOrderDisplay();
    updateFormSelects();
}

function updateOrderDisplay() {
    const root = document.querySelector('.order-display-root');
    if (!root) return;

    const msg = root.querySelector('.order-message');
    const itemsContainer = root.querySelector('.order-items');

    const categoryLabels = {
        soup: 'Суп',
        main_course: 'Главное блюдо',
        beverage: 'Напиток'
    };

    if (Object.keys(currentOrder).length === 0) {
        msg.textContent = 'Ничего не выбрано';
        msg.style.display = 'block';
        itemsContainer.style.display = 'none';
        hidePriceBlock();
        return;
    }


    msg.style.display = 'none';
    itemsContainer.style.display = 'block';
    itemsContainer.innerHTML = '';

    const orderCats = ['soup', 'main_course', 'beverage'];
    let anySelected = false;
    orderCats.forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = 'order-category';

        if (currentOrder[cat]) {
            anySelected = true;
            catDiv.innerHTML = `<p><strong>${categoryLabels[cat]}:</strong> ${currentOrder[cat].name} — ${currentOrder[cat].price}₽</p>`;
        } else {
            let placeholder = 'Блюдо не выбрано';
            if (cat === 'beverage') placeholder = 'Напиток не выбран';
            if (cat === 'soup') placeholder = 'Суп не выбран';
            if (cat === 'main_course') placeholder = 'Главное блюдо не выбрано';
            catDiv.innerHTML = `<p>${placeholder}</p>`;
        }
        itemsContainer.appendChild(catDiv);
    });

    updateTotalPrice();
}

function updateTotalPrice() {
    const total = Object.values(currentOrder).reduce((sum, d) => sum + (d.price || 0), 0);
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

function updateFormSelects() {
    const mapping = {
        soup: 'soup',
        main_course: 'main_dish',
        beverage: 'beverage'
    };

    Object.keys(mapping).forEach(cat => {
        const selectId = mapping[cat];
        const select = document.getElementById(selectId);
        if (!select) return;

        if (currentOrder[cat]) {
            select.value = currentOrder[cat].keyword;
        } else {
            select.value = '';
        }
    });
}

function attachFormHandlers() {
    const orderForm = document.getElementById('orderForm');
    if (!orderForm) return;

    orderForm.addEventListener('submit', (e) => {
        updateFormSelects();
    });

    orderForm.addEventListener('reset', (e) => {
        setTimeout(() => {
            currentOrder = {};
            document.querySelectorAll('.dish-card.selected').forEach(el => el.classList.remove('selected'));
            updateOrderDisplay();
            updateFormSelects();
        }, 0);
    });
}
