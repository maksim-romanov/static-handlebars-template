const createTextElement = (text) => ({
  type: 'TEXT_ELEMENT',
  props: {
    nodeValue: text,
    children: []
  }
});

export const createElement = (type, props = {}, ...children) => {
  const childrenResolver = (children) => {
    if (typeof children === 'object') return children;
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
  const elementResolver = (el) => {
    if (el.type == 'TEXT_ELEMENT') return document.createTextNode('');
    return document.createElement(el.type);
  };

  const domElement = elementResolver(element);

  Object
    .keys(element.props)
    .filter((key) => key !== 'children') // ток проперти
    .forEach((name) => { domElement[name] = element.props[name]; }); // назначаем проперти

  element.props.children.forEach((child) => render(child, domElement));

  container.appendChild(domElement);
};