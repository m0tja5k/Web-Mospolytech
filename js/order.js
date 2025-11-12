// order.js
let currentOrder = {};

function addToOrder(dish) {
    // Определение текущего блюда в категории
    if (currentOrder[dish.category]) {
        // Снятие выделения с предыдущего блюда
        const prevKeyword = currentOrder[dish.category].keyword;
        const prevCard = document.querySelector(`.dish-card[data-dish="${prevKeyword}"]`);
        if (prevCard) {
            prevCard.classList.remove('selected');
        }
    }

    // Сохранение нового блюда
    currentOrder[dish.category] = dish;

    // Выделение текущего блюда
    const currentCard = document.querySelector(`.dish-card[data-dish="${dish.keyword}"]`);
    if (currentCard) {
        currentCard.classList.add('selected');
    }

    // Обновление отображения заказа
    updateOrderDisplay();

    // Обновление формы
    updateForm();
}

function updateOrderDisplay() {
    const orderDiv = document.querySelector('.form-column h3').nextElementSibling; // Находим первый .form-group после h3
    let orderContainer = orderDiv;
    
    // Проверяем, есть ли уже контейнер для заказа
    let existingContainer = orderContainer.querySelector('.order-display-container');
    if (!existingContainer) {
        existingContainer = document.createElement('div');
        existingContainer.className = 'order-display-container';
        orderContainer.appendChild(existingContainer);
    }
    
    const container = existingContainer;
    container.innerHTML = ''; // Очистка перед обновлением

    const categories = {
        soup: "Суп",
        main_course: "Главное блюдо",
        beverage: "Напиток"
    };

    for (const cat in categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'order-category';
        
        if (currentOrder[cat]) {
            categoryDiv.innerHTML = `
                <p><strong>${categories[cat]}:</strong> ${currentOrder[cat].name} - ${currentOrder[cat].price}₽</p>
            `;
        } else {
            const placeholder = cat === 'beverage' ? 'Напиток не выбран' : (cat === 'soup' ? 'Суп не выбран' : 'Блюдо не выбрано');
            categoryDiv.innerHTML = `<p>${placeholder}</p>`;
        }
        
        container.appendChild(categoryDiv);
    }

    // Обновление стоимости
    updateTotalPrice();
}

function updateTotalPrice() {
    const total = Object.values(currentOrder).reduce((sum, dish) => sum + dish.price, 0);
    
    // Находим или создаем блок стоимости
    let priceContainer = document.querySelector('.order-price-container');
    if (total > 0) {
        if (!priceContainer) {
            priceContainer = document.createElement('div');
            priceContainer.className = 'order-price-container';
            document.querySelector('.order-display-container').appendChild(priceContainer);
        }
        priceContainer.innerHTML = `<p><strong>Стоимость заказа:</strong> ${total}₽</p>`;
        priceContainer.style.display = 'block';
    } else {
        if (priceContainer) {
            priceContainer.style.display = 'none';
        }
    }
}

function updateForm() {
    // Обновление значений в select'ах формы
    Object.keys(currentOrder).forEach(cat => {
        const select = document.getElementById(cat === 'main_course' ? 'main_dish' : cat);
        if (select) {
            select.value = currentOrder[cat].keyword;
        }
    });
}

// Добавление CSS для выделения
const style = document.createElement('style');
style.textContent = `
    .dish-card.selected {
        border: 2px solid tomato;
    }
    .order-display-container {
        margin: 15px 0;
    }
    .order-category {
        margin: 8px 0;
    }
    .order-price-container {
        margin-top: 15px;
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 5px;
    }
`;
document.head.appendChild(style);

// Обработка отправки формы
document.getElementById('orderForm').addEventListener('submit', function(e) {
    // Убедимся, что отправляются keyword'ы
    Object.keys(currentOrder).forEach(cat => {
        const select = document.getElementById(cat === 'main_course' ? 'main_dish' : cat);
        if (select && currentOrder[cat]) {
            select.value = currentOrder[cat].keyword;
        }
    });
});