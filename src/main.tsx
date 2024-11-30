import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './assets/store/store';
import './index.css';
import Home from './assets/pages/HomePage/Home';
import Footer from './assets/companents/Footer/Footer';
import Header from './assets/companents/Header/Header';
import Login from './assets/pages/Login/Login';
import Register from './assets/pages/Register/Register';
import Admin from './assets/pages/Admin/Admin';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<><Header /><Home /><Footer /></>} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />}/>
          <Route path='/admin' element={<Admin />}/>
        </Routes>
      </Router>
    </Provider>
  );
} else {
  console.error('Root element not found');
}
