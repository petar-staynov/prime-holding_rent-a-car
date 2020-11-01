import React from 'react';
import {projectFirestore} from "../../firebase/config";
import {useHistory} from "react-router-dom";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {
    CalculateFirebaseTimestampDayDifference, FirebaseTimestampToHtmlDate,
} from "../../utils/DateUtils";

const RentsPage = (props) => {
    // Refs and hooks
    const rentsRef = projectFirestore.collection('rents');
    const vehiclesRef = projectFirestore.collection('vehicles');
    const customersRef = projectFirestore.collection('customers');

    const [rents] = useCollectionData(rentsRef, {idField: 'id'});
    const [vehicles] = useCollectionData(vehiclesRef, {idField: 'id'});
    const [customers] = useCollectionData(customersRef, {idField: 'id'});


    const TableRow = ({rentObj}) => {
        const {startDate, endDate, customerId, vehicleId, rentPrice} = rentObj;


        return (
            <tr style={{cursor: 'pointer'}}>
                <td>{customerId}</td>
                <td>{vehicleId}</td>
                <td>{FirebaseTimestampToHtmlDate(startDate)}</td>
                <td>{FirebaseTimestampToHtmlDate(endDate)}</td>
                <td>{CalculateFirebaseTimestampDayDifference(startDate, endDate)}</td>
                <td>{rentPrice}</td>
            </tr>
        )
    };

    if (rents) {
        return (
            <div>
                <h1 className="text-center">Rents:</h1>
                <hr/>
                <table className="table table-responsive-md">
                    <thead>
                    <tr>
                        <th scope="col">Customer</th>
                        <th scope="col">Vehicle</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Days</th>
                        <th scope="col">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        rents.map((rentObj, index) => <TableRow key={index} rentObj={rentObj}/>)
                    }
                    </tbody>
                </table>
            </div>
        )
    }

    return (<h1 className='text-center'>LOADING...</h1>)
};

export default RentsPage;