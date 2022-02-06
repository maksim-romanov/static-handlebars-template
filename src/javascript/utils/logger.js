const createLogger = (name = 'Default') => {
  return (msg) => console.log(`%c Logger - ${name}`, 'color: #f0abfc', msg);
};

export { createLogger };
export default createLogger();