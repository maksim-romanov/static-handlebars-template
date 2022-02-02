import Observer from './Observer';

class Logger extends Observer {
  constructor(name ='Default') {
    super();
    this.name = name;
  }

  update(state) { console.log(`%c Logger - ${this.name}`, 'color: #f0abfc', state); }
}

export default Logger;