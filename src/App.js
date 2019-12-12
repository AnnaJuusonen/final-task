import React from 'react';
import './App.css';
import { BrowserRouter} from 'react-router-dom';
// import CustomerList from './components/CustomerList';
// import TrainingList from './components/TrainingList';
import Navigator from './components/Navigator';
// import AddCustomer from './components/AddCustomer';



function App() {
  return (
   
    <BrowserRouter>
    <div>
    <Navigator />
    </div>
    </BrowserRouter>
  );
}

export default App;
