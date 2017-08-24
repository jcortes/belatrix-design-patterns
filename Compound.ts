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
  numberOfQuacks: number = 0;

  constructor(public duck: Quackable) {
    this.duck = duck;
  }

  quack() {
    this.numberOfQuacks += 1;
    return this.duck.quack();
  }

  getNumberOfQuacks() {
    return this.numberOfQuacks;
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
    const redheadDuck = new RedheadDuck();
    const duckCall = new DuckCall();
    const rubberDuck = new RubberDuck();
    const goose = new QuackToHonkAdapter(new Goose());

    this.runSimulate(mallardDuck);
    this.runSimulate(redheadDuck);
    this.runSimulate(duckCall);
    this.runSimulate(rubberDuck);
    this.runSimulate(goose);

    console.log("mallardDuck", mallardDuck.getNumberOfQuacks());
  }

  runSimulate(duck: Quackable): void {
    // console.log("\Duck", duck.name);
    console.log(duck.quack());
  }
}

const simulator = new AnimalSimulator();
simulator.simulate();

