// import logo from './logo.svg';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './Pages/Home';
import AddNewEmployee from './Pages/AddNewEmployee';
import View from './Pages/View';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer position='top-center'/>
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/addnewemployee' Component={AddNewEmployee}/>
      <Route path='/update/:id' Component={AddNewEmployee}/>
      <Route path='/view/:id' Component={View}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
