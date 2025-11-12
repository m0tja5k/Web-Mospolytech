// display.js
document.addEventListener('DOMContentLoaded', function() {
    // Определение категорий
    const categories = {
        soup: "Супы",
        main_course: "Главные блюда",
        beverage: "Напитки"
    };

    // Сортировка блюд по алфавиту в каждой категории
    const sortedDishes = {};
    for (const cat in categories) {
        sortedDishes[cat] = dishes.filter(dish => dish.category === cat).sort((a, b) => a.name.localeCompare(b.name));
    }

    // Очистка основного контента (удаление статичных блоков)
    const main = document.querySelector('main');
    main.innerHTML = '';

    // Создание секций для каждой категории
    for (const cat in categories) {
        const section = document.createElement('section');
        const h2 = document.createElement('h2');
        h2.textContent = categories[cat];
        section.appendChild(h2);

        const grid = document.createElement('div');
        grid.className = 'dishes-grid';

        // Создание карточек блюд для текущей категории
        sortedDishes[cat].forEach(dish => {
            const card = createDishCard(dish);
            grid.appendChild(card);
        });

        section.appendChild(grid);
        main.appendChild(section);
    }

    // Инициализация событий добавления
    initializeAddButtons();
});

function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.setAttribute('data-dish', dish.keyword);

    card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="price">${dish.price}₽</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button>Добавить</button>
    `;

    return card;
}

function initializeAddButtons() {
    const buttons = document.querySelectorAll('.dish-card button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.dish-card');
            const keyword = card.getAttribute('data-dish');
            const dish = dishes.find(d => d.keyword === keyword);
            addToOrder(dish);
        });
    });
}