document.addEventListener('DOMContentLoaded', () => {
    const categories = {
        soup: "Супы",
        main_course: "Главные блюда",
        beverage: "Напитки"
    };

    const sortedDishesByCategory = {};
    Object.keys(categories).forEach(cat => {
        sortedDishesByCategory[cat] = dishes
            .filter(d => d.category === cat)
            .sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    });
    const main = document.querySelector('main');
    main.innerHTML = '';

    Object.keys(categories).forEach(cat => {
        const section = document.createElement('section');

        const h2 = document.createElement('h2');
        h2.textContent = categories[cat];
        section.appendChild(h2);

        const grid = document.createElement('div');
        grid.className = 'dishes-grid';

        sortedDishesByCategory[cat].forEach(dish => {
            const card = createDishCard(dish);
            grid.appendChild(card);
        });

        if (grid.children.length === 0) {
            const msg = document.createElement('p');
            msg.textContent = 'В категории нет блюд';
            section.appendChild(msg);
        } else {
            section.appendChild(grid);
        }

        main.appendChild(section);
    });

    initAddButtons();
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
        <button type="button">Добавить</button>
    `;
    return card;
}

function initAddButtons() {
    const buttons = document.querySelectorAll('.dish-card button');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.dish-card');
            const keyword = card.getAttribute('data-dish');
            const dish = dishes.find(d => d.keyword === keyword);
            if (dish) {
                if (typeof addToOrder === 'function') {
                    addToOrder(dish);
                } else {
                    console.warn('addToOrder function not found. Подключите order.js после display.js');
                }
            }
        });
    });
}
