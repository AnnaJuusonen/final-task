import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';


const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, [])

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(responseData => setCustomers(responseData.content))
        .catch(err => console.error(err))

    }

    const columns = [
        {
            Header:'Firstname',
            accessor: 'firstname'
        },
        {
            Header:'Lastname',
            accessor: 'lastname'
        },
    ]


    return (
        <div>
            <Container maxWidth="md">
            <ReactTable columns={columns} data={customers} filterable={true}/>
            </Container>
        </div>
    );
};

export default CustomerList;