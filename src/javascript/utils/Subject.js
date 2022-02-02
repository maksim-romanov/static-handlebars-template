class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers = [...this.observers, observer];
  }

  removerObserver(observer) {
    this.observers = this.observers.filter((_observer) => _observer !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

export default Subject;