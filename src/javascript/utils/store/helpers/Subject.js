class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers = [...this.observers, observer];
    const observerIndex = this.observers.length - 1;

    return () => {
      this.removerObserverByIndex(observerIndex);
    };
  }


  removerObserverByIndex(index) {
    this.observers.splice(index, 1);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

export default Subject;