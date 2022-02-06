import Subject from './Subject';

class State extends Subject {
  constructor(initialState = {}) {
    super();
    this.state = initialState;
  }

  update(getState) {
    this.state = getState(this.state);
    this.notify(this.state);
  }

  get() { return this.state; }
}

export default State;