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
        grouped[cat] = dishes.filter(d => d.category === cat).sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    });

    // очистка main
    const main = document.querySelector('main');//querySelector - первый элемент, который имеет заданный селектор
    main.innerHTML = '';//вставка внутрь элемента

    // состояние фильтров 
    const activeFilters = {};
    //создание секций для каждой категории
    Object.keys(categories).forEach(cat => {
        const section = document.createElement('section');

        //заголовок категории
        const h2 = document.createElement('h2');
        h2.textContent = categories[cat].title;
        section.appendChild(h2);//добавление в конец

        // блок фильтров
        const filtersWrapper = document.createElement('div');
        filtersWrapper.className = 'filters-wrapper';
        categories[cat].filters.forEach(f => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'filter-btn';
            btn.textContent = f.label;
            btn.setAttribute('data-kind', f.kind);
            btn.setAttribute('data-cat', cat);
            btn.addEventListener('click', () => {
                const current = activeFilters[cat];
                if (current === f.kind) {//нажатие активного фильтра
                    activeFilters[cat] = null;
                    btn.classList.remove('active');
                    const sibs = filtersWrapper.querySelectorAll('.filter-btn');
                    sibs.forEach(s => s.classList.remove('active'));//убрать класс active для всех кнопок в этом div-е
                } else {//включение фильтра
                    activeFilters[cat] = f.kind;
                    const sibs = filtersWrapper.querySelectorAll('.filter-btn');
                    sibs.forEach(s => s.classList.remove('active'));//убрать класс active для всех кнопок в этом div-е
                    btn.classList.add('active');//Сделать данную кнопку активной
                }
                applyFilterToCategory(cat);
            });
            filtersWrapper.appendChild(btn);
        });
        section.appendChild(filtersWrapper);

        const grid = document.createElement('div');
        grid.className = 'dishes-grid';
        grid.setAttribute('data-cat', cat);

        grouped[cat].forEach(d => {
            const card = createDishCard(d);
            grid.appendChild(card);
        });

        section.appendChild(grid);
        main.appendChild(section);
        activeFilters[cat] = null;
    });
    initAddButtons();
});


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

//добавляет обработчик нажатий
function initAddButtons() {
    const buttons = document.querySelectorAll('.dish-card button');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();//предотвращает распространение события по DOM-дереву и блокирует его обработку на родительских или дочерних элементах
            const card = btn.closest('.dish-card');//поднимается по DOM-дереву вверх и ищет ближайший перент элемент
            const keyword = card.getAttribute('data-dish');
            const dish = dishes.find(d => d.keyword === keyword);
            if (!dish) return;
            if (typeof addToOrder === 'function') {
                addToOrder(dish);//из файла order
            } else {
                console.warn('addToOrder not found. Подключите order.js после display.js');
            }
        });
    });
}

//применение к карточкам
function applyFilterToCategory(cat) {
    const section = document.querySelector(`.dishes-grid[data-cat="${cat}"]`);
    const filtersParent = section.closest('section').querySelector('.filters-wrapper');
    const activeBtn = filtersParent ? filtersParent.querySelector('.filter-btn.active') : null;// условие ? если тру : если фолс
    const activeKind = activeBtn ? activeBtn.getAttribute('data-kind') : null;

    const cards = section.querySelectorAll('.dish-card');
    cards.forEach(card => {
        const kind = card.getAttribute('data-kind');
        if (!activeKind) {
            card.style.display = ''; // если фильтр не выбран
        } else {
            card.style.display = (kind === activeKind) ? '' : 'none';// условие ? если тру : если фолс
        }
    });
}
