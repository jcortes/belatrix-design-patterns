interface MenuItem {
    key: string,
    value: { desc: string, vegetarian: boolean, price: number }
}

interface IIterator {
    hasNext(): boolean,
    next(): Object
}

interface Menu {
    createIterator(menuItems: Object): CafeMenuIterator
}

class CafeMenuIterator implements IIterator {
    menuItems: Array<MenuItem>;
    index: number = 0;

    constructor(menuItems) {
        this.menuItems =  Object.keys(menuItems)
            .map(key => ({ key, value: menuItems[key] }));
    }

    hasNext(): boolean {
        return this.menuItems.length > this.index;
    }

    next(): Object {
        const item = this.menuItems[this.index];
        this.index += 1;
        return item;
    }
}

class CafeMenu implements Menu {
    menuItems: Object = {};
    myIterator: IIterator;

    constructor() {
        this.addItem("key1", "Name 1", true, 3.99);
        this.addItem("key2", "Name 2", false, 3.69);
        this.addItem("key3", "Name 3", true, 4.29);
        this.myIterator = this.createIterator();
    }
    
    public addItem(key: string, desc: string, vegetarian: boolean, price: number): void {
        this.menuItems[key] = { desc, vegetarian, price };
    }

    createIterator() {
        return new CafeMenuIterator(this.menuItems);
    }

    showItems() {
        while (this.myIterator.hasNext()) {
            const item = <MenuItem>this.myIterator.next();
            console.log('--------------------------');
            console.log(`Description: ${item.value.desc}`);
            console.log(`Vegetarian: ${item.value.vegetarian}`);
            console.log(`Price: ${item.value.price}`);
        }
    }
}

const menu = new CafeMenu();
menu.showItems();