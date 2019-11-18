import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Navigator from './components/Navigator';



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
