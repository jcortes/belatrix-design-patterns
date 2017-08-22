interface Quackable {
  quack();
}

interface Honkable {
  honk();
}

class MallardDuck implements Quackable {
  constructor(){}
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

class DuckSimulator {

  simulate(): void {
    const mallardDuck: Quackable = new MallardDuck();
    const redheadDuck: Quackable = new RedheadDuck();
    const duckCall: Quackable = new DuckCall();
    const rubberCall: Quackable = new RubberDuck();

    this.simulate2(mallardDuck);
    this.simulate2(redheadDuck);
    this.simulate2(duckCall);
    this.simulate2(rubberCall);
  }

  simulate2(duck: Quackable): void {
    duck.quack();
  }
}

const duckSimulator = new DuckSimulator();

duckSimulator.simulate();