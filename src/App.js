
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


function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Routes >
          <Route exact path="/" element={<Shop />} />
          <Route path="/orders" element= {<OrderReview />} />
          <Route path="/inventory" element= {<Inventory />} />
          <Route path="/product/:productKey" element= {<ProductDetails />} />
          <Route path="*" element= {<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;