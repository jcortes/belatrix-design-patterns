interface IIterator {
    hasNext(): boolean,
    next(): Object
}

interface IMenu {
    createIterator(): MenuIterator
}

abstract class MenuComponent {

    constructor(
        public name: string,
        public desc: string,
        public vegetarian?: boolean,
        public price?: number,
        public menuComponents?: Array<MenuComponent>
    ) {
        this.name = name;
        this.desc = desc;
        this.vegetarian = vegetarian;
        this.price = price;
        this.menuComponents = menuComponents || [];
    }

    getName(): string {
        return this.name;
    }

    getDesc(): string {
        return this.desc;
    }

    getPrice(): number {
        return this.price;
    }

    isVegetarian(): boolean {
        return this.vegetarian;
    }

    abstract print(): void;

    add(component: MenuComponent) {
        this.menuComponents = this.menuComponents.concat(component);
    }

    remove(component: MenuComponent) {
        const idx = this.menuComponents.indexOf(component);
        this.menuComponents = this.menuComponents.filter((_, index) => index !== idx);
    }

    getChild(leaf: number): MenuComponent {
        return this.menuComponents[leaf];
    }
}

class MenuIterator implements IIterator {
    private index: number = 0;

    constructor(public menuItems: Array<MenuComponent>) {
        this.menuItems =  menuItems;
    }

    hasNext(): boolean {
        return this.menuItems.length > this.index;
    }
    next(): MenuComponent {
        const item = this.menuItems[this.index];
        this.index += 1;
        return item;
    }
}

class MenuItem extends MenuComponent {

    constructor(name: string, desc: string, vegetarian: boolean, price: number) {
        super(name, desc, vegetarian, price);   
    }

    public print(): void {
        console.log('--------------------------');
        console.log(`Name: ${this.getName()}`);
        if (this.isVegetarian()) {
            console.log("(v)");
        }
        console.log(`Price: ${this.getPrice()}`);
        console.log(`Description: ${this.getDesc()}`);
    }
}

class Menu extends MenuComponent implements IMenu {

    constructor(name, desc) {
        super(name, desc);
    }

    createIterator(): MenuIterator {
        return new MenuIterator(this.menuComponents);
    }

    public print(): void {
        console.log('--------------------------');
        console.log(`Name: ${this.getName()}`);
        console.log(`Description: ${this.getDesc()}`);

        const iterator = this.createIterator();
        while (iterator.hasNext()) {
            const menuComponent = <MenuComponent>iterator.next();
            menuComponent.print();
        }
    }
}

class Waitress {

    constructor(public allMenus: MenuComponent) {
        this.allMenus = allMenus;
    }

    public printMenu() {
        this.allMenus.print();
    }
}

const allMenus = new Menu("All Menus", "All Menus Description");

const dinerMenu = new Menu("Diner Menu", "Diner Menu Description");
const dinerMenuItem1 = new MenuItem(
    "Vegetarian BLT",
    "(Fakin') Bacon with lettuce & tomato on whole wheat", true, 2.99
);
const dinerMenuItem2 = new MenuItem(
    "BLT",
    "Bacon with lettuce & tomato on whole wheat", false, 2.99
);
const dinerMenuItem3 = new MenuItem(
    "Soup of the day",
    "Soup of the day, with a side of potato salad", true, 3.29
);
const dinerMenuItem4 = new MenuItem(
    "Hotdog",
    "A Hotdog, with saurkraut, relish, onions, topped with cheese", true, 3.05
);

const dessertMenu = new Menu("Dessert SubMenu", "Dessert SubMenu Description");
const dessertMenuItem1 = new MenuItem(
    "Dessert 1",
    "Dessert 1 Description", true, 2.99
);
const dessertMenuItem2 = new MenuItem(
    "Dessert 2",
    "Dessert 2 Description", false, 2.99
);
const dessertMenuItem3 = new MenuItem(
    "Dessert 3",
    "Dessert 3 Description", true, 3.29
);
const dessertMenuItem4 = new MenuItem(
    "Dessert 4",
    "Dessert 4 Description", true, 3.05
);

const cafeMenu = new Menu("Cafe Menu", "Cafe Menu Description");
const cafeMenuItem1 = new MenuItem(
    "Veggie Burger and Air Fries",
    "Veggie burger on a whole wheat bun, lettuce, tomato, and fries", true, 3.99
);
const cafeMenuItem2 = new MenuItem(
    "Soup of the day",
    "A coup of the soup of the day, with a side salad", false, 3.69
);
const cafeMenuItem3 = new MenuItem(
    "Burrito",
    "A large burrito, with whole potato beans, salsa, guacamole", true, 4.29
);

dessertMenu.add(dessertMenuItem1);
dessertMenu.add(dessertMenuItem2);
dessertMenu.add(dessertMenuItem3);
dessertMenu.add(dessertMenuItem4);

dinerMenu.add(dinerMenuItem1);
dinerMenu.add(dinerMenuItem2);
dinerMenu.add(dinerMenuItem3);
dinerMenu.add(dinerMenuItem4);
dinerMenu.add(dessertMenu);

cafeMenu.add(cafeMenuItem1);
cafeMenu.add(cafeMenuItem2);
cafeMenu.add(cafeMenuItem3);

allMenus.add(dinerMenu);
allMenus.add(cafeMenu);

const waitress = new Waitress(allMenus);
waitress.printMenu();
