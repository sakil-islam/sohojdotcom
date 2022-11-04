
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import OrderReview from './components/OrderReview/OrderReview';

import Inventory from './components/Inventory/Inventory'
import NotFound from './components/NotFound/NotFound';
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>Email : {loggedInUser.email}</p>
      <Header></Header>
      <Router>
        <Routes >
          <Route exact path="/" element={<Shop />} />
          <Route path="/orders" element= {<OrderReview />} />
          <Route path="/inventory" element= {<Inventory />} />
          <Route path="/login" element= {<Login />} />
          <Route path="/shipment" element= {<Shipment />} />
          <Route path="/product/:productKey" element= {<ProductDetails />} />
          <Route path="*" element= {<NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;