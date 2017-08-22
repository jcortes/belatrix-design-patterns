interface Quackable {
  quack();
}

interface Honkable {
  honk();
}

class Animal {
  quackType: Quackable;
  honkType: Honkable;

  constructor(public name: string) {
    this.name = name;
  }

  tryToQuack() {
    return this.quackType.quack();
  }

  tryToHonk() {
    return this.honkType.honk();
  }

  setQuackAbility(newQuackType: Quackable) {
    this.quackType = newQuackType;
  }

  setHonkAbility(newHonkType: Honkable) {
    this.honkType = newHonkType;
  }
}

class ItQuacks implements Quackable {
  quack() {
    return "It Quacks";
  }
}

class CantQuack implements Quackable {
  quack() {
    return "Can't Quack";
  }
}

class ItHonks implements Honkable {
  honk() {
    return "It Honks";
  }
}

class CantHonk implements Honkable {
  honk() {
    return "Can't Honk";
  }
}

class MallardDuck extends Animal implements Quackable {
  constructor() {
    super("MallardDuck");
    this.honkType = new CantHonk();
    this.quackType = new ItQuacks();
  }

  quack() {
    return "MallardDuck Quack";
  }
}

class RedheadDuck extends Animal implements Quackable {
  constructor() {
    super("RedheadDuck");
    this.honkType = new CantHonk();
    this.quackType = new ItQuacks();
  }

  quack() {
    return "RedheadDuck Quack";
  }
}

class DuckCall extends Animal implements Quackable {
  constructor() {
    super("DuckCall");
    this.honkType = new CantHonk();
    this.quackType = new ItQuacks();
  }

  quack() {
    return "DuckCall Quack";
  }
}

class RubberDuck extends Animal implements Quackable {
  constructor() {
    super("RubberDuck");
    this.honkType = new CantHonk();
    this.quackType = new ItQuacks();
  }

  quack() {
    return "RubberDuck Quack";
  }
}

class Goose extends Animal implements Honkable {
  constructor() {
    super("Goose");
    this.honkType = new ItHonks();
    this.quackType = new CantQuack();
  }

  honk() {
    return "Goose Honk";
  }
}

class DuckSimulator {

  simulate(): void {
    const mallardDuck: Animal = new MallardDuck();
    const redheadDuck: Animal = new RedheadDuck();
    const duckCall: Animal = new DuckCall();
    const rubberDuck: Animal = new RubberDuck();
    const goose: Animal = new Goose();

    this.runSimulate(mallardDuck);
    this.runSimulate(redheadDuck);
    this.runSimulate(duckCall);
    this.runSimulate(rubberDuck);
    this.runSimulate(goose);
  }

  runSimulate(animal: Animal): void {
    console.log("\nAnimal", animal.name);
    console.log(animal.tryToHonk());
    console.log(animal.tryToQuack());
  }
}

const duckSimulator = new DuckSimulator();

duckSimulator.simulate();