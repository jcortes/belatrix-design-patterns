interface ISubjectProxy {
  report(): void;
}

interface IState {
  gumballMachine: GumballMachine;
  insertQuarter();
  ejectsQuarter();
  turnsCranck();
  dispenseGumball();
}

class GumballMachine implements ISubjectProxy {
  currentState: IState;
  noQuarterState: IState;
  hasQuarterState: IState;
  gumballSoldState: IState;
  outOfGumballsState: IState;
  numberOfGumballs: number = 0;
  totalNumberOfGumballs: number = 0;
  numberOfCranks: number = 0;
  twoGumballsPosition: number = 0;
  location: string;
  FREQUENCY: number = 10;

  constructor(numberOfGumballs: number, location: string) {
    this.totalNumberOfGumballs = numberOfGumballs;
    this.numberOfGumballs = numberOfGumballs;
    this.location = location;
    this.noQuarterState = new NoQuarterState(this);
    this.hasQuarterState = new HasQuarterState(this);
    this.gumballSoldState = new GumballSoldState(this);
    this.outOfGumballsState = new OutOfGumballsState(this);

    if (numberOfGumballs < 1) {
      this.setState(this.outOfGumballsState);
    } else {
      this.setState(this.noQuarterState);
    }
  }

  /**
   * Set a number between 0 and 9 that will be the number of crancks
   * to give two Gumballs
   */
  setTwoGumballsPosition() {
    this.twoGumballsPosition = Math.floor(Math.random() * this.FREQUENCY);
  }

  isTwoGumballsPosition(): boolean {
    return this.twoGumballsPosition === this.getNumberOfCranks();
  }

  setNumberOfCranks(numberOfCranks: number) {
    this.numberOfCranks = numberOfCranks;
  }

  getNumberOfCranks(): number {
    return this.numberOfCranks;
  }

  setNumberOfGumballs(numberOfGumballs: number) {
    this.numberOfGumballs = numberOfGumballs;
  }

  getNumberOfGumballs(): number {
    return this.numberOfGumballs;
  }

  getTotalNumberOfGumballs(): number {
    return this.totalNumberOfGumballs;
  }

  getLocation(): string {
    return this.location;
  }

  setState(state: IState) {
    this.currentState = state;
  }

  getState(): IState {
    return this.currentState;
  }

  report(): void {
    const gumballsSold = this.getTotalNumberOfGumballs() - this.getNumberOfGumballs();
    console.log("\nLocation is", this.getLocation());
    console.log("Total Number of Gumballs are", this.getTotalNumberOfGumballs());
    console.log("Number of Gumballs sold is", gumballsSold);
  }
}

class NoQuarterState implements IState {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log('\nQuarter has been inserted!');
    this.gumballMachine.setState(this.gumballMachine.hasQuarterState);
  }

  ejectsQuarter() {
    console.log('\nIs not possible to ejects anything');
  }

  turnsCranck() {
    console.log('\nInsert a quarter first');
  }

  dispenseGumball() {
    console.log('\nInsert a quarter first');
  }
}

class HasQuarterState implements IState {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log('Quarter has been already inserted')
  }

  ejectsQuarter() {
    console.log('Quarter has benn ejected');
    this.gumballMachine.setState(this.gumballMachine.noQuarterState);
  }

  turnsCranck() {
    console.log('Im about to enjoy a gumball');
    const numberOfCranks = this.gumballMachine.getNumberOfCranks() + 1;
    this.gumballMachine.setNumberOfCranks(numberOfCranks);
    this.gumballMachine.setState(this.gumballMachine.gumballSoldState);

    /**
     * This should happen every FREQUENCY cranks to calculate
     * the new two gumball position
     */
    if (numberOfCranks < 2) {
      this.gumballMachine.setTwoGumballsPosition();

    } else if (numberOfCranks === this.gumballMachine.FREQUENCY) {
      this.gumballMachine.setNumberOfCranks(0);
    }
  }

  dispenseGumball() {
    console.log('You should first turns you crack');
  }
}

class GumballSoldState implements IState {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log('Action is not possible');
  }

  ejectsQuarter() {
    console.log('Action is not possible');
  }

  turnsCranck() {
    console.log('Action is not possible');
  }

  dispenseGumball() {
    let numberOfGumballs = this.gumballMachine.getNumberOfGumballs() - 1;    

    if (this.gumballMachine.isTwoGumballsPosition() && numberOfGumballs > 1) {
      console.log('You have won an additional gumball!!');
      numberOfGumballs -= 1;
    }

    this.gumballMachine.setNumberOfGumballs(numberOfGumballs);

    console.log('Enjoy your Gumball bud!');

    if (numberOfGumballs < 1) {
      console.log('We ran out of gumballs, please call us to supply with more!');
      this.gumballMachine.setState(this.gumballMachine.outOfGumballsState);

    } else {
      console.log(`There are ${this.gumballMachine.getNumberOfGumballs()} more left!`);
      this.gumballMachine.setState(this.gumballMachine.noQuarterState);
    }
  }
}

class OutOfGumballsState implements IState {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log('Action is not possible');
  }
  ejectsQuarter() {
    console.log('Action is not possible');
  }
  turnsCranck() {
    console.log('Action is not possible');
  }
  dispenseGumball() {
    console.log('Action is not possible');
  }
}

class GumballMachineMonitor implements IState, ISubjectProxy {
  gumballMachine: GumballMachine;
  
  constructor(public numberOfGumballs: number, public location: string) {
    this.gumballMachine = new GumballMachine(numberOfGumballs, location);
  }

  insertQuarter() {
    this.gumballMachine.getState().insertQuarter();
  }

  ejectsQuarter() {
    this.gumballMachine.getState().ejectsQuarter();
  }

  turnsCranck() {
    this.gumballMachine.getState().turnsCranck();
  }

  dispenseGumball() {
    this.gumballMachine.getState().dispenseGumball();
  }

  report(): void {
    this.gumballMachine.report();
  }
}

const gumballMachine = new GumballMachineMonitor(22, "Bogota");

for (let i = 0; i < 20; i += 1) {
  gumballMachine.insertQuarter();
  gumballMachine.turnsCranck();
  gumballMachine.dispenseGumball();
}

gumballMachine.report();