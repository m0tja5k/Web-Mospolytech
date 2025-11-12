const dishes = [
    {
        keyword: "gaspacho",
        name: "Гаспачо",
        price: 195,
        category: "soup",
        count: "350 г",
        image: "sources/menu/soups/gazpacho.jpg",
        kind: "veg"
    },
    {
        keyword: "mushroom_soup",
        name: "Грибной суп-пюре",
        price: 185,
        category: "soup",
        count: "330 г",
        image: "sources/menu/soups/mushroom_soup.jpg",
        kind: "veg"
    },
    {
        keyword: "norwegian_soup",
        name: "Норвежский суп",
        price: 270,
        category: "soup",
        count: "330 г",
        image: "sources/menu/soups/norwegian_soup.jpg",
        kind: "fish"
    },
    {
        keyword: "ramen",
        name: "Рамен",
        price: 375,
        category: "soup",
        count: "425 г",
        image: "sources/menu/soups/ramen.jpg",
        kind: "fish"
    },
    {
        keyword: "chicken_soup",
        name: "Куриный суп",
        price: 330,
        category: "soup",
        count: "350 г",
        image: "sources/menu/soups/chicken_soup.jpg",
        kind: "meat"
    },
    {
        keyword: "tom-jam",
        name: "Том-ям с креветками",
        price: 650,
        category: "soup",
        count: "500 г",
        image: "sources/menu/soups/tomyum.jpg",
        kind: "meat"
    },
  //glavbluda
    {
        keyword: "fried_potatoes_mushrooms",
        name: "Жареная картошка с грибами",
        price: 150,
        category: "main_course",
        count: "250 г",
        image: "sources/menu/main_course/friedpotatoeswithmushrooms1.jpg",
        kind: "veg"
    },
    {
        keyword: "lasagna",
        name: "Лазанья",
        price: 385,
        category: "main_course",
        count: "310 г",
        image: "sources/menu/main_course/lasagna.jpg",
        kind: "meat"
    },
    {
        keyword: "chicken_cutlets",
        name: "Котлеты из курицы с картофельным пюре",
        price: 225,
        category: "main_course",
        count: "280 г",
        image: "sources/menu/main_course/chickencutletsandmashedpotatoes.jpg"
    },
    {
        keyword: "ribnaja_cutlets",
        name: "Рыбная котлета с рисом и спаржей",
        price: 320,
        category: "main_course",
        count: "270 г",
        image: "sources/menu/main_course/fishrice.jpg",
        kind: "meat"
    },
    {
        keyword: "pizza_margarita",
        name: "Пицца Маргарита",
        price: 450,
        category: "main_course",
        count: "470 г",
        image: "sources/menu/main_course/pizza.jpg",
        kind: "fish"
    },
    {
        keyword: "shrimppasta",
        name: "Паста креветками",
        price: 290,
        category: "main_course",
        count: "300 г",
        image: "sources/menu/main_course/shrimppasta.jpg",
        kind: "veg"
    },
    //salatb1
    {
        keyword: "caesar",
        name: "Цезарь с цыпленком",
        price: 370,
        category: "salad",
        count: "220 г",
        image: "sources/menu/salads_starters/caesar.jpg",
        kind: "meat"
    },
    {
        keyword: "saladwithegg",
        name: "Корейский салат с овощами и яйцом",
        price: 350,
        category: "salad",
        count: "230 г",
        image: "sources/menu/salads_starters/saladwithegg.jpg",
        kind: "veg"
    },
    {
        keyword: "salmon_salad",
        name: "Салат с лососем и авокадо",
        price: 390,
        category: "salad",
        count: "240 г",
        image: "sources/menu/salads_starters/salmon_avocado.jpg",
        kind: "fish"
    },
    {
        keyword: "vegetable_salad",
        name: "Овощной салат с оливковым маслом",
        price: 280,
        category: "salad",
        count: "200 г",
        image: "sources/menu/salads_starters/vegetable_salad.jpg",
        kind: "veg"
    },
    {
        keyword: "bruschetta_tomato",
        name: "Брускетта с томатами и базиликом",
        price: 260,
        category: "salad",
        count: "180 г",
        image: "sources/menu/salads_starters/bruschetta_tomato.jpg",
        kind: "veg"
    },
    {
        keyword: "caprese",
        name: "Капрезе с моцареллой",
        price: 330,
        category: "salad",
        count: "200 г",
        image: "sources/menu/salads_starters/caprese.jpg",
        kind: "veg"
    },

    //napitki
    {
        keyword: "orange_juice",
        name: "Апельсиновый сок",
        price: 120,
        category: "beverage",
        count: "300 мл",
        image: "sources/menu/beverages/orangejuice.jpg",
        kind: "cold"
    },
    {
        keyword: "apple_juice",
        name: "Яблочный сок",
        price: 90,
        category: "beverage",
        count: "300 мл",
        image: "sources/menu/beverages/applejuice.jpg",
        kind: "cold"
    },
    {
        keyword: "carrot_juice",
        name: "Морковный сок",
        price: 110,
        category: "beverage",
        count: "300 мл",
        image: "sources/menu/beverages/carrotjuice.jpg",
        kind: "cold"
    },
    {
        keyword: "latte",
        name: "Кофе латте",
        price: 180,
        category: "beverage",
        count: "250 мл",
        image: "sources/menu/beverages/latte.jpg",
        kind: "hot"
    },
    {
        keyword: "green_tea",
        name: "Зелёный чай",
        price: 90,
        category: "beverage",
        count: "300 мл",
        image: "sources/menu/beverages/green_tea.jpg",
        kind: "hot"
    },
    {
        keyword: "black_tea",
        name: "Чёрный чай",
        price: 90,
        category: "beverage",
        count: "300 мл",
        image: "sources/menu/beverages/black_tea.jpg",
        kind: "hot"
    },

    //desert
    {
        keyword: "tiramisu",
        name: "Тирамису",
        price: 290,
        category: "dessert",
        count: "200 г",
        image: "sources/menu/desserts/tiramisu.jpg",
        kind: "medium"
    },
    {
        keyword: "honey_cake",
        name: "Медовик",
        price: 260,
        category: "dessert",
        count: "180 г",
        image: "sources/menu/desserts/honey_cake.jpg",
        kind: "medium"
    },
    {
        keyword: "chocolate_cake",
        name: "Шоколадный чизкейк",
        price: 270,
        category: "dessert",
        count: "150 г",
        image: "sources/menu/desserts/chocolate_cake.jpg",
        kind: "small"
    },
    {
        keyword: "mini_donuts",
        name: "Мини-пончики (6 шт.)",
        price: 450,
        category: "dessert",
        count: "160 г",
        image: "sources/menu/desserts/mini_donuts.jpg",
        kind: "small"
    },
    {
        keyword: "waffle_tower",
        name: "Вафельный торт",
        price: 370,
        category: "dessert",
        count: "140 г",
        image: "sources/menu/desserts/waffle_tower.jpg",
        kind: "small"
    },
    {
        keyword: "big_cake",
        name: "Пирог на компанию",
        price: 590,
        category: "dessert",
        count: "350 г",
        image: "sources/menu/desserts/big_cake.jpg",
        kind: "large"
    }
];
