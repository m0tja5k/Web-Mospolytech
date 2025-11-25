function renderDishes() {
    const categories = {
        soup: { title: "Супы", filters: [{label:"рыбный", kind:"fish"}, {label:"мясной", kind:"meat"}, {label:"вегетарианский", kind:"veg"}] },
        main_course: { title: "Главные блюда", filters: [{label:"рыбное", kind:"fish"}, {label:"мясное", kind:"meat"}, {label:"вегетарианское", kind:"veg"}] },
        beverage: { title: "Напитки", filters: [{label:"холодный", kind:"cold"}, {label:"горячий", kind:"hot"}] },
        salad: { title: "Салаты и стартеры", filters: [{label:"рыбный", kind:"fish"}, {label:"мясной", kind:"meat"}, {label:"вегетарианский", kind:"veg"}] },
        dessert: { title: "Десерты", filters: [{label:"маленькая порция", kind:"small"}, {label:"средняя порция", kind:"medium"}, {label:"большая порция", kind:"large"}] }
    };

    const grouped = {};
    Object.keys(categories).forEach(cat => {
        grouped[cat] = dishes.filter(d => d.category === cat).sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    });

    const main = document.querySelector('main');
    main.innerHTML = '';

    const activeFilters = {};

    Object.keys(categories).forEach(cat => {
        const section = document.createElement('section');
        const h2 = document.createElement('h2');
        h2.textContent = categories[cat].title;
        section.appendChild(h2);

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
                activeFilters[cat] = activeFilters[cat] === f.kind ? null : f.kind;
                document.querySelectorAll(`.filter-btn[data-cat="${cat}"]`).forEach(b => b.classList.toggle('active', b.getAttribute('data-kind') === activeFilters[cat]));
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
}


document.addEventListener('DOMContentLoaded', () => {
    loadDishes();
    createLunchVariantsSection();
});

async function loadDishes() {
    try {
        const response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        dishes = data.map(item => ({
            keyword: item.keyword,
            name: item.name,
            price: item.price,
            category: item.category,
            count: item.count || "1 порция",
            image: item.image.startsWith('http') 
                ? item.image 
                : `http://lab7-api.std-900.ist.mospolytech.ru/images/${item.category}s/${item.keyword}`, // fallback
            kind: item.kind || "veg"
        }));

        renderDishes();
        console.log('Блюда успешно загружены с сервера:', dishes.length);
    } 
    catch (error) {
        console.error('Ошибка загрузки блюд:', error);
        document.querySelector('main').innerHTML = `
            <section style="text-align:center; padding:50px; color:#d63031;">
                <h2>Не удалось загрузить меню</h2>
                <p>Проверьте подключение к интернету и попробуйте обновить страницу.</p>
            </section>
        `;
    }
}

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

function createLunchVariantsSection() {
    const main = document.querySelector('main');
    const section = document.createElement('section');
    section.className = 'lunch-options-section';

    section.innerHTML = `
        <h2>Доступные варианты ланча</h2>
        <div class="lunch-variants-grid" id="lunchVariantsGrid"></div>
    `;


    const firstCategorySection = main.querySelector('section');
    if (firstCategorySection) {
        main.insertBefore(section, firstCategorySection);
    } else {
        main.prepend(section);
    }

    const grid = section.querySelector('#lunchVariantsGrid');
    const variants = [
        ['soup', 'main_course', 'salad', 'beverage'],
        ['soup', 'main_course', 'beverage'],
        ['soup', 'salad', 'beverage'],
        ['main_course', 'salad', 'beverage'],
        ['main_course', 'beverage'],
        ['dessert']
    ];

    const exampleImages = {
        soup:        "sources/icons/soup.png",
        main_course: "sources/icons/main.png",
        salad:       "sources/icons/salad.png",
        beverage:    "sources/icons/drink.png",
        dessert:     "sources/icons/desert.png"
    };

    const labels = {
        soup: "Суп",
        main_course: "Главное блюдо",
        salad: "Салат",
        beverage: "Напиток",
        dessert: "Десерт"
    };


    variants.forEach(variant => {
        const variantBlock = document.createElement('div');
        variantBlock.className = 'lunch-variant';

        variant.forEach(cat => {
            const dishBlock = document.createElement('div');
            dishBlock.className = 'dish-block';

            dishBlock.innerHTML = `
                <img src="${exampleImages[cat]}" alt="${labels[cat]}">
                <p>${labels[cat]}</p>
            `;
            if (cat==='dessert') {
                dishBlock.innerHTML = `
                <img src="${exampleImages[cat]}" alt="${labels[cat]}">
                <p>${labels[cat]}</p>
                <p>(Добавлять можно к любому заказу))</p>
            `;
            }

            variantBlock.appendChild(dishBlock);
        });

        grid.appendChild(variantBlock);
    });
}
