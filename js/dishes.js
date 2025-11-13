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
        image: "sources/menu/main_course/chickencutletsandmashedpotatoes.jpg",
        kind: "meat"
    },
    {
        keyword: "ribnaja_cutlets",
        name: "Рыбная котлета с рисом и спаржей",
        price: 320,
        category: "main_course",
        count: "270 г",
        image: "sources/menu/main_course/fishrice.jpg",
        kind: "fish"
    },
    {
        keyword: "pizza_margarita",
        name: "Пицца Маргарита",
        price: 450,
        category: "main_course",
        count: "470 г",
        image: "sources/menu/main_course/pizza.jpg",
        kind: "meat"
    },
    {
        keyword: "shrimppasta",
        name: "Паста с креветками",
        price: 290,
        category: "main_course",
        count: "300 г",
        image: "sources/menu/main_course/shrimppasta.jpg",
        kind: "fish"
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
        keyword: "frenchfries1",
        name: "Картофель-фри с чесночным соусом",
        price: 390,
        category: "salad",
        count: "240 г",
        image: "sources/menu/salads_starters/frenchfries1.jpg",
        kind: "veg"
    },
    {
        keyword: "frenchfries2",
        name: "Картофель-фри с кетчупом",
        price: 280,
        category: "salad",
        count: "200 г",
        image: "sources/menu/salads_starters/frenchfries2.jpg",
        kind: "veg"
    },
    {
        keyword: "caprese",
        name: "Капрезе",
        price: 260,
        category: "salad",
        count: "180 г",
        image: "sources/menu/salads_starters/caprese.jpg",
        kind: "veg"
    },
    {
        keyword: "tunasalad",
        name: "Салат с тунцом",
        price: 330,
        category: "salad",
        count: "200 г",
        image: "sources/menu/salads_starters/tunasalad.jpg",
        kind: "fish"
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
        keyword: "cappuccino",
        name: "Каппучино",
        price: 180,
        category: "beverage",
        count: "250 мл",
        image: "sources/menu/beverages/cappuccino.jpg",
        kind: "hot"
    },
    {
        keyword: "greentea",
        name: "Зелёный чай",
        price: 90,
        category: "beverage",
        count: "300 мл",
        image: "sources/menu/beverages/greentea.jpg",
        kind: "hot"
    },
    {
        keyword: "tea",
        name: "Чёрный чай",
        price: 90,
        category: "beverage",
        count: "300 мл",
        image: "sources/menu/beverages/tea.jpg",
        kind: "hot"
    },

    //desert
    {
        keyword: "donuts",
        name: "Пончики на компанию",
        price: 290,
        category: "dessert",
        count: "200 г",
        image: "sources/menu/desserts/donuts.jpg",
        kind: "large"
    },
    {
        keyword: "donuts2",
        name: "Пончики для одного",
        price: 260,
        category: "dessert",
        count: "180 г",
        image: "sources/menu/desserts/donuts2.jpg",
        kind: "medium"
    },
    {
        keyword: "chocolatecheesecake",
        name: "Шоколадный чизкейк",
        price: 270,
        category: "dessert",
        count: "150 г",
        image: "sources/menu/desserts/chocolatecheesecake.jpg",
        kind: "small"
    },
    {
        keyword: "chocolatecake",
        name: "Шоколадный торт",
        price: 450,
        category: "dessert",
        count: "160 г",
        image: "sources/menu/desserts/chocolatecake.jpg",
        kind: "small"
    },
    {
        keyword: "checheesecake",
        name: "Чизкейк",
        price: 370,
        category: "dessert",
        count: "140 г",
        image: "sources/menu/desserts/checheesecake.jpg",
        kind: "small"
    },
    {
        keyword: "baklava",
        name: "Пахлава",
        price: 590,
        category: "dessert",
        count: "350 г",
        image: "sources/menu/desserts/baklava.jpg",
        kind: "medium"
    }
];
