let currentOrder = {};

document.addEventListener('DOMContentLoaded', () => {
    createOrderDisplayContainer();
    updateOrderDisplay();
    attachFormHandlers();
});

function createOrderDisplayContainer() { //создание контейнера с отображением заказа
    const orderColumn = document.querySelectorAll('.form-column')[0];//берётся 1 колонка флекса

    const root = document.createElement('div');
    root.className = 'order-display-root';
    root.innerHTML = `
        <div class="order-message">Ничего не выбрано</div>
        <div class="order-items" style="display:none;"></div>
    `;
    const h3 = orderColumn.querySelector('h3');
    if (h3) h3.insertAdjacentElement('afterend', root);//если заголовок есть, то конт вставляется после afterend, если нет, то в начало колонки(prepend)
    else orderColumn.prepend(root);
}

function addToOrder(dish) {
    //если в этой категории уже выбрано, то ищет какое keyword, потом ищет по нему карточку и убирает selected
    if (currentOrder[dish.category]) {
        const prevKey = currentOrder[dish.category].keyword;
        const prevCard = document.querySelector(`.dish-card[data-dish="${prevKey}"]`);
        if (prevCard) prevCard.classList.remove('selected');
    }

    currentOrder[dish.category] = dish;

    // по keyword ищет карточку и делает selected
    const curCard = document.querySelector(`.dish-card[data-dish="${dish.keyword}"]`);
    if (curCard) curCard.classList.add('selected');

    updateOrderDisplay();
    updateFormSelects();
}

function updateOrderDisplay() {
    const root = document.querySelector('.order-display-root');
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
        const priceBlock = root.querySelector('.order-price');
        if (priceBlock) priceBlock.style.display = 'none';
        return;
    }

    msg.style.display = 'none';
    items.style.display = 'block';
    items.innerHTML = '';
    //идёт по категориям и для каждой меняет заказ
    categoriesOrder.forEach(c => {
        const div = document.createElement('div');
        div.className = 'order-category';

        if (currentOrder[c.key]) {
            div.innerHTML = `<p><strong>${c.label}:</strong> ${currentOrder[c.key].name} — ${currentOrder[c.key].price}₽</p>`;
        } else {
            // добавление заглушки не выбрано
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
    const total = Object.values(currentOrder).reduce((s, d) => s + (d.price || 0), 0);//reduce сворачивает массив в значение с помощью функции
    //array.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue]) 
    //callback — функция, которая будет вызываться для каждого элемента массива (кроме первого элемента, если не указано значение initialValue).
    const root = document.querySelector('.order-display-root');
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

//добавление обработки кнопок формы
function attachFormHandlers() {
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', (e) => {
        updateFormSelects();
    });
    orderForm.addEventListener('reset', () => {
        setTimeout(() => {
            currentOrder = {};
            document.querySelectorAll('.dish-card.selected').forEach(el => el.classList.remove('selected'));
            updateOrderDisplay();
            updateFormSelects();
        }, 0);//setTimeout(, 0) - надо, чтобы браузер успел сбросить форму
    });
}

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
