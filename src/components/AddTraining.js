import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


//TODO lisää asiakas dropdown valikkoon (props customerlististä???), datan resetointi, muut toiminnallisuudet, mitä????

const AddTraining = (props) => { // lisätään propsit
    const [open, setOpen] = useState(false);
   const [training, setTraining] = useState(
        {date: '', duration: '', activity: '', customer:'https://customerrest.herokuapp.com/api/customers/377'}
        ); // eri state treenille ja asiakkaalle? vai kuuluvatko he yhteen olioon?
    const [customer, setCustomer] = useState(
      {id: '', firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''}
    ); 
    //TODO missä asiakas lisätään?

    const handleClickOpen = () => {
        setOpen(true);
      };
 

    
      const handleClose = () => {
        setOpen(false);
      };

      const handleChange = (event) => {
          setTraining({...training, [event.target.name]: event.target.value });
      //    setCustomer({...customer, [event.target.name]: event.target.value });
         console.log(training)
      };

      const addTraining = () => {
        props.saveTraining(training); // TODO: props.saveTraining toimiiko? 
    //    props.saveCustomer(customer);
        handleClose();
      };
     

    return (
        <div>
        <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
    Add training to a customer 
  </Button>
  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Add training</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Fill in the info for the training.
      </DialogContentText>
      <TextField
            autoFocus
            id="date"
            margin="dense"
            name="date"
            type="date"
            defaultValue="2017-05-24"
            value={training.date}
            InputLabelProps={{
                shrink: true,
              }}
            onChange={e => handleChange(e)}
            label="Date"
            fullWidth
      />
        <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={e => handleChange(e)}
            label="Duration"
            fullWidth
      />
       <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleChange(e)}
            label="Name of the activity"
            fullWidth
        />

    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={addTraining} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
        </div>
    );
};

export default AddTraining;