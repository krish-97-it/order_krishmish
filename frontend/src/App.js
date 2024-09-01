import './App.css';
import './style/footer.css';
import './style/header.css';
import './style/home.css';
import './style/food-item-card.css';
import './style/my-cart.css';
import './style/combo-page.css';
import './style/user-profile.css'
import AppFunction from './controller/app-function';

function App() {
  return (
    <div className="App" id="app-theme" dark-theme="off">
      <AppFunction/>
    </div>
  );
}

export default App;
