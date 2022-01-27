import './styles/index.sass';

// import Handlebars from 'handlebars';

import handleMarsMain from './views/index.hbs';

function App() {
  const rootContaoner = document.getElementById('root');
  rootContaoner.innerHTML = handleMarsMain();
}

App();