// display.js
document.addEventListener('DOMContentLoaded', () => {
    const categories = {
        soup: { title: "Супы", filters: [ {label:"рыбный", kind:"fish"}, {label:"мясной", kind:"meat"}, {label:"вегетарианский", kind:"veg"} ] },
        main_course: { title: "Главные блюда", filters: [ {label:"рыбное", kind:"fish"}, {label:"мясное", kind:"meat"}, {label:"вегетарианское", kind:"veg"} ] },
        beverage: { title: "Напитки", filters: [ {label:"холодный", kind:"cold"}, {label:"горячий", kind:"hot"} ] },
        salad: { title: "Салаты и стартеры", filters: [ {label:"рыбный", kind:"fish"}, {label:"мясной", kind:"meat"}, {label:"вегетарианский", kind:"veg"} ] },
        dessert: { title: "Десерты", filters: [ {label:"маленькая порция", kind:"small"}, {label:"средняя порция", kind:"medium"}, {label:"большая порция", kind:"large"} ] }
    };

    // Сортируем блюда внутри каждой категории по name
    const grouped = {};
    Object.keys(categories).forEach(cat => {
        grouped[cat] = dishes
            .filter(d => d.category === cat)
            .sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    });

    // Очищаем main и создаём секции
    const main = document.querySelector('main');
    main.innerHTML = '';

    // состояние активного фильтра на категорию: {category: activeKind|null}
    const activeFilters = {};

    Object.keys(categories).forEach(cat => {
        const section = document.createElement('section');

        // Заголовок
        const h2 = document.createElement('h2');
        h2.textContent = categories[cat].title;
        section.appendChild(h2);

        // Блок фильтров (кнопки)
        const filtersWrapper = document.createElement('div');
        filtersWrapper.className = 'filters-wrapper';
        categories[cat].filters.forEach(f => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'filter-btn';
            btn.textContent = f.label;
            btn.setAttribute('data-kind', f.kind);
            btn.setAttribute('data-cat', cat);
            // стили можно настроить через css
            btn.addEventListener('click', () => {
                const current = activeFilters[cat] || null;
                if (current === f.kind) {
                    // снять фильтр
                    activeFilters[cat] = null;
                    btn.classList.remove('active');
                    // снять активность у других кнопок этой категории
                    const sibs = filtersWrapper.querySelectorAll('.filter-btn');
                    sibs.forEach(s => s.classList.remove('active'));
                } else {
                    // включить этот фильтр — снять у остальных
                    activeFilters[cat] = f.kind;
                    const sibs = filtersWrapper.querySelectorAll('.filter-btn');
                    sibs.forEach(s => s.classList.remove('active'));
                    btn.classList.add('active');
                }
                applyFilterToCategory(cat);
            });
            filtersWrapper.appendChild(btn);
        });
        section.appendChild(filtersWrapper);

        // Grid с карточками
        const grid = document.createElement('div');
        grid.className = 'dishes-grid';
        grid.setAttribute('data-cat', cat);

        // Добавляем карточки (каждая карточка имеет data-dish и data-kind)
        grouped[cat].forEach(d => {
            const card = createDishCard(d);
            grid.appendChild(card);
        });

        section.appendChild(grid);
        main.appendChild(section);

        // начальный фильтр пустой
        activeFilters[cat] = null;
    });

    // После рендера карточек — повесим обработчики "Добавить" (order.js содержит addToOrder)
    initAddButtons();
});

/**
 * Создает HTML карточку блюда. Карточка получает data-dish (keyword) и data-kind.
 */
function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.setAttribute('data-dish', dish.keyword);
    card.setAttribute('data-kind', dish.kind);

    card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="price">${dish.price}₽</p>
        <p class="name">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button type="button">Добавить</button>
    `;
    return card;
}

/**
 * Повесить обработчики на все кнопки "Добавить".
 */
function initAddButtons() {
    const buttons = document.querySelectorAll('.dish-card button');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.dish-card');
            const keyword = card.getAttribute('data-dish');
            const dish = dishes.find(d => d.keyword === keyword);
            if (!dish) return;
            if (typeof addToOrder === 'function') {
                addToOrder(dish);
            } else {
                console.warn('addToOrder not found. Подключите order.js после display.js');
            }
        });
    });
}

/**
 * Применяет текущий фильтр к категории: показывает/скрывает карточки.
 * ВАЖНО: выбранные позиции (currentOrder) не трогаются — они остаются в памяти.
 */
function applyFilterToCategory(cat) {
    // найти контейнер категорийных фильтров, получить активную кнопку
    const section = document.querySelector(`.dishes-grid[data-cat="${cat}"]`);
    if (!section) return;
    // ищем активную кнопочку в секции
    const filtersParent = section.closest('section').querySelector('.filters-wrapper');
    const activeBtn = filtersParent ? filtersParent.querySelector('.filter-btn.active') : null;
    const activeKind = activeBtn ? activeBtn.getAttribute('data-kind') : null;

    const cards = section.querySelectorAll('.dish-card');
    cards.forEach(card => {
        const kind = card.getAttribute('data-kind');
        if (!activeKind) {
            card.style.display = ''; // показать
        } else {
            card.style.display = (kind === activeKind) ? '' : 'none';
        }
    });
}
