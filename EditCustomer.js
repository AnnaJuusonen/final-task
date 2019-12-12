import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const EditCustomer = (props) => {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState(
    {firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''}
    );


    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        })
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleChange = (event) => {
          setCustomer({...customer, [event.target.name]: event.target.value })
      };

     
      const editCustomer = () => {
        props.editCustomer(customer, props.customer.links[0].href);
        handleClose();

      };
    
      
    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit the customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the customer info.
          </DialogContentText>
          <TextField
                autoFocus
                margin="dense"
                name="firstname"
                value={customer.firstname}
                onChange={e => handleChange(e)}
                label="Firstname"
                fullWidth
          />
            <TextField
                margin="dense"
                name="lastname"
                value={customer.lastname}
                onChange={e => handleChange(e)}
                label="Lastname"
                fullWidth
          />
           <TextField
                margin="dense"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={e => handleChange(e)}
                label="Street Address"
                fullWidth
            />
             <TextField
                margin="dense"
                name="postcode"
                value={customer.postcode}
                onChange={e => handleChange(e)}
                label="Postcode"
                fullWidth
            />
              <TextField
                margin="dense"
                name="city"
                value={customer.city}
                onChange={e => handleChange(e)}
                label="City"
                fullWidth
          />
            <TextField
                margin="dense"
                name="email"
                value={customer.email}
                onChange={e => handleChange(e)}
                label="e-mail"
                fullWidth
          />
           <TextField
                margin="dense"
                name="phone"
                value={customer.phone}
                onChange={e => handleChange(e)}
                label="Phone number"
                fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editCustomer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

        </div>
    );
};

export default EditCustomer;