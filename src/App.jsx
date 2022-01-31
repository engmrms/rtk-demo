import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Contacts from './Pages/Contacts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="container">
      <ToastContainer />
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
          textAlign: 'center',
          paddingTop: '1rem',
        }}>
        <Link to="/">Home</Link> | <Link to="/contacts">Contacts</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contacts/*" element={<Contacts />} />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
