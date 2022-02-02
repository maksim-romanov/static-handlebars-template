import Subject from './Subject';

class State extends Subject {
  constructor(initialState = {}) {
    super();
    this.state = initialState;
  }

  update(data = {}) {
    this.state = { ...this.state, ...data };
    this.notify(this.state);
  }

  get() { return this.state; }
}

export default State;