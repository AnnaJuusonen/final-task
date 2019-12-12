import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import AddTraining from './AddTraining';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Container from '@material-ui/core/Container';

const TrainingList = () => {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchTrainings();
    }, [])

        const handleClose = (event, reason) => {
        setOpen(false);
        }

        //haetaan treenit ja asiakkaat gettraining endpointista
        const fetchTrainings = () => {
            fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(responseData => {
                setTrainings(responseData);
            })
            .catch(err => console.error(err))
            
            
        }
        //tallennetaan uusi treeni
    const saveTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        }
        )
        .then(res => fetchTrainings())
        .catch(err => console.error(err))
      }
      //treenin poistaminen ei toimi
       const deleteTraining = (link) => {
        if(window.confirm('Are you sure?')){
        fetch(link, {method: 'DELETE'})
        .then(res => fetchTrainings())
        .then(res => setOpen(true))
        .catch(err => console.error(err))
        }
    }

    const columns = [
        {
            Header: 'ID', 
            accessor: 'id'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            id: 'date',
            Header: 'Date',
            accessor: d => {
                return moment(d.date)
                .format("DD-MM-YYYY")
            }
        },

        {
            Header: 'Customer',
            accessor: 'customer.firstname'
        },

        {
            Cell: ({value}) => <Button variant="contained" color="default">Edit</Button>,
            accessor: 'links[0].href',
            filterable: false,
            sortable: false,
            width: 100
    
        },

        {
            Cell: ({value}) => <Button variant="contained" color="default" onClick={() => deleteTraining(value)}>Delete</Button>,
            accessor: 'links[0].href',
            filterable: false,
            sortable: false,
            width: 100
    
        },
    ]

    return (
        <div>
            <AddTraining saveTraining={saveTraining} />
            <Container maxWidth="md">
            <ReactTable columns={columns} data={trainings} defaultPageSize={10} pageSizeOptions={[10, 15, 30]} filterable={true}/>
            </Container>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message='Training deleted.'/>
        </div>
    );
};

export default TrainingList;