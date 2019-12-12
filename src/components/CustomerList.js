import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Container from '@material-ui/core/Container';
// import AppBar from '@material-ui/core/AppBar';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import EditCustomer from './EditCustomer';


const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, [])

    const handleClose = (event, reason) => {
        setOpen(false);
        }

        // haetaan asiakkaat customers-endpointista
    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(responseData => setCustomers(responseData.content))
        .catch(err => console.error(err))
    }

    //asiakkaan tietojen tallennus, toimii
    const saveCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        }
        )
        .then(res => fetchCustomers())
        .catch(err => console.error(err))
      } 
     
      //asiakkaan poisto, toimii
      const deleteCustomer = (link) => {
        if(window.confirm('Are you sure?')){
        fetch(link, {method: 'DELETE'})
        .then(res => fetchCustomers())
        .then(res => setOpen(true))
        .catch(err => console.error(err))
        }
    }

    //asiakkaan muokkaus, toimii
    const editCustomer = (customer, link) => {
        fetch(link, 
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
             body:   JSON.stringify(customer)       // mikä tulee parametriksi että saan avattua editointi dialogin, voinko käyttää vaan add
            }
            )
        .then(console.log(customer))
        .then(() => fetchCustomers())
        .catch(err => console.error(err))
    }
    
    // taulukon sarakkeet, activity-tulostaa vain linkin asiakkaan treeneihin
    const columns = [
        {
            Header:'Firstname',
            accessor: 'firstname'
        },
        {
            Header:'Lastname',
            accessor: 'lastname'
        },
        {
            Header:'Activity',
            accessor: 'links[2].href'
        },
        {
            Cell: row => (
            <EditCustomer customer={row.original} editCustomer={editCustomer} />
            ),
            filterable: false,
            sortable: false,
            width: 100
    
        },
        {
            Cell: ({value}) => <Button variant="contained" color="secondary" onClick={() => deleteCustomer(value)}>Delete</Button>,
            accessor: 'links[0].href',
            filterable: false,
            sortable: false,
            width: 100
    
        },
    ]


    return (
        <div>
            <AddCustomer saveCustomer={saveCustomer} />
            <AddTraining saveCustomer={saveCustomer} customers={customers} />
            <Container maxWidth="md">
            
            <ReactTable columns={columns} data={customers} defaultPageSize={10} pageSizeOptions={[10, 15, 30]} filterable={true}/>
            </Container>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message='Customer deleted.'/>
        </div>
    );
};


export default CustomerList;