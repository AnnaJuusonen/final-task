import React from 'react';
import {  Switch, Link, Route } from 'react-router-dom';
// import AppBar from '@material-ui/core/AppBar';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';



const Navigator = () => {
    return (
      <div style={{textAlign: "center"}}>
       
        <Link to="/">
        <Button variant="contained" color="secondary" linkButton={true} style={{marginLeft:'10px'}}>
            Customers
        </Button>
        </Link>
        <Link to="/TrainingList">
        <Button variant="contained" color="secondary" linkButton={true} style={{marginLeft:'10px'}}>
            Trainings
        </Button>
        </Link>
        <Switch>
          <Route exact path="/" component={CustomerList} />
          <Route path="/TrainingList" component={TrainingList} />
        </Switch>
   
      </div>

    );
};

export default Navigator;