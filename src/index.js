import './styles/index.sass';

import handleMarsMain from './views/index.hbs';

(function App() {
  const rootContaoner = document.getElementById('root');
  rootContaoner.innerHTML = handleMarsMain();
})();