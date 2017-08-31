interface Quackable {
  quack();
}

interface Honkable {
  honk();
}

class MallardDuck implements Quackable {

  quack() {
    return "MallardDuck Quack";
  }
}

class RedheadDuck implements Quackable {

  quack() {
    return "RedheadDuck Quack";
  }
}

class DuckCall implements Quackable {

  quack() {
    return "DuckCall Quack";
  }
}

class RubberDuck implements Quackable {

  quack() {
    return "RubberDuck Quack";
  }
}

class Goose implements Honkable {

  honk() {
    return "Goose Honk";
  }
}

class QuackCounter implements Quackable {
  static numberOfQuacks: number = 0;

  constructor(public duck: Quackable) {
    this.duck = duck;
  }

  quack() {
    QuackCounter.numberOfQuacks += 1;
    return this.duck.quack();
  }

  static getNumberOfQuacks() {
    return QuackCounter.numberOfQuacks;
  }
}

class QuackToHonkAdapter implements Quackable {

  constructor(public goose: Honkable) {
    this.goose = goose;
  }

  quack() {
    return this.goose.honk();
  }
}

class AnimalSimulator {

  simulate(): void {
    
    const mallardDuck = new QuackCounter(new MallardDuck());
    const redheadDuck = new QuackCounter(new RedheadDuck());
    const duckCall = new QuackCounter(new DuckCall());
    const rubberDuck = new QuackCounter(new RubberDuck());
    const goose = new QuackCounter(new QuackToHonkAdapter(new Goose()));

    this.runSimulate(mallardDuck);
    this.runSimulate(redheadDuck);
    this.runSimulate(duckCall);
    this.runSimulate(rubberDuck);
    this.runSimulate(goose);

    console.log("Number of Quacks is", QuackCounter.getNumberOfQuacks());
  }

  runSimulate(duck: Quackable): void {
    console.log(duck.quack());
  }
}

const simulator = new AnimalSimulator();
simulator.simulate();

