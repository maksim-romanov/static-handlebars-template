const createTextElement = (text) => ({
  type: 'TEXT_ELEMENT',
  props: {
    nodeValue: text,
    children: []
  }
});

export const createElement = (type, props = {}, ...children) => {
  const childrenResolver = (child) => {
    if (typeof child === 'object') return child;
    return createTextElement(children);
  };

  return ({
    type,
    props: {
      ...props,
      children: children.map(childrenResolver)
    }
  });
};

export const render = (element, container) => {
  if (!element) return;

  const elementResolver = (el) => {
    if (el.type == 'TEXT_ELEMENT') return document.createTextNode('');
    return document.createElement(el.type);
  };

  const domElement = elementResolver(element);

  Object
    .keys(element.props)
    .filter((key) => key !== 'children') // ток проперти
    .forEach((name) => { domElement[name] = element.props[name]; }); // назначаем проперти

  element.props.children.forEach((child) => {
    if(Array.isArray(child)) return render(child[0], domElement);
    render(child, domElement);
  });

  container.appendChild(domElement);
};