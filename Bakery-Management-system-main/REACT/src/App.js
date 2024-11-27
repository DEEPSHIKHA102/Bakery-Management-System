
import './App.css';

// import AuthUser from './components/AuthUser';
// import Guest from './components/navbar/Guest';
// import Auth from './components/navbar/auth';  
//import aboutus from './components/AboutUs';
import AdminViewOrder from './components/AdminViewOrder';
import CardHome from './components/CardHome';
import CartPage from './components/CheckoutPage';
import ConfirmOrderPage from './components/ConfirmOrderPage';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import NewPageProduct from './components/NewPageProduct';
import YourComplainPlaced from './components/YourComplainPlaced';
import YourOrderPlaced from './components/YourOrderPlaced';
function App() {
  return (
    <div>
      <CardHome />
      <CartPage/>
      <ConfirmOrderPage/>
      <AdminViewOrder/>
      
      <Dashboard/>
      <Home/>
      <NewPageProduct/>
      <YourComplainPlaced/>
      <YourOrderPlaced/>
      
      
    </div>
  )

}

export default App;