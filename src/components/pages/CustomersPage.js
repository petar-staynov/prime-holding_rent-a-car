import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {projectFirestore} from "../../firebase/config";
import {useCollectionData} from "react-firebase-hooks/firestore";


const CustomersPage = (props) => {
    const [customersData, setCustomersData] = useState(null);

    // Refs and hooks
    const customersRef = projectFirestore.collection('customers');
    const history = useHistory();

    const [customers] = useCollectionData(customersRef, {idField: 'id'});

    const handleAddNewCustomer = () => {
        history.push(`/customers/add`);
    };

    const TableRow = ({customerObj}) => {
        const {id, name, email, phone} = customerObj;

        const handleCustomerRowClick = () => {
            history.push(`/customers/view/${id}`);
        };

        return (
            <tr onClick={handleCustomerRowClick} style={{cursor: 'pointer'}}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
            </tr>
        )
    };

    if (customers) {
        return (
            <div>
                <h1 className="text-center">Customers</h1>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={handleAddNewCustomer}>Add new customer</button>
                </div>
                <hr/>
                <table className="table table-responsive-md">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        customers.map((customerObj, index) => <TableRow key={index} customerObj={customerObj}/>)
                    }
                    </tbody>
                </table>
            </div>
        )
    }

    return (<h1 className='text-center'>LOADING...</h1>)
};

export default CustomersPage;