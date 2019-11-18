import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';


const TrainingList = () => {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, [])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(responseData => setTrainings(responseData.content))
        .catch(err => console.error(err))

    }

    const columns = [
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
    ]

    return (
        <div>
            <ReactTable columns={columns} data={trainings} filterable={true}/>
        </div>
    );
};

export default TrainingList;