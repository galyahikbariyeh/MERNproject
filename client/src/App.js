import logo from './logo.svg';
import './App.css';
import DashboardLayoutSlots from './components/dash';
import {BrowserRouter , Route,Routes} from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Logout from './components/logout';
import Home from './components/home';
import UserProfile from './components/userProfile';
import Cart from './components/cart';
import Orders from './components/orders';
import ProductDetail from './components/productDetails';
import Footer from './components/footer';
import Favorite from './components/fav';
import ArchivedOrders from './components/archive';
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login/>}/>
      <Route path="/dash" element={<DashboardLayoutSlots/>}/>
      <Route path="/createUser" element={<Register/>}/>
       {/* <Route path="/logout" element={<Logout/>}/> */}
        <Route path="/home" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order" element={<Orders/>}/>
         <Route path="/details/:id" element={<ProductDetail/>}/>
     
         <Route path="/userpro" element={<UserProfile/>}/>
         <Route path="/fave" element={<Favorite/>}/>
        
  <Route path="/arch" element={<ArchivedOrders/>}/>
      </Routes>
    
    
    
    </BrowserRouter>
  
   // <DashboardLayoutSlots/>
  );
}

export default App;
