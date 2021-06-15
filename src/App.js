import './App.css';
import Questions from './Questions/Questions.js';
import { Provider } from 'react-redux';
import { store } from './Questions/store';

function App() {
  return (
    <Provider store={store}>
      <Questions />
    </Provider>
  );
}

export default App;
