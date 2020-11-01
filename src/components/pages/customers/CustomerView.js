import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {projectFirestore} from "../../../firebase/config";
import ImageDisplay from "../../shared/ImageDisplay";
import {FirebaseTimestampToYear} from "../../../utils/DateUtils";

const CustomerView = (props) => {
    const {match} = props;
    const customerId = match.params.id;

    const [customerData, setCustomerData] = useState(null);

    // Refs
    const history = useHistory();
    const customersRef = projectFirestore.collection('customers');

    useEffect(() => {
        customersRef
            .doc(customerId)
            .get()
            .then(res => {
                setCustomerData(res.data());
            });
    }, []);
    
    const handleBtnEdit = () => {
        history.push(`/customers/edit/${customerId}`);
    };

    const handleBtnDelete = () => {
        history.push(`/customers/delete/${customerId}`);
    };

    if (customerData) {
        const {name, email, phone} = customerData;
        return (
            <div className="text-center">
                <div className="row">
                    <div className="col-6 text-right">
                        <h2>Name:</h2>
                    </div>
                    <div className="col-6 text-left">
                        <h2>{name}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-right">
                        <h2>Email:</h2>
                    </div>
                    <div className="col-6 text-left">
                        <h2>{email}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-right">
                        <h2>Phone number:</h2>
                    </div>
                    <div className="col-6 text-left">
                        <h2>{phone}</h2>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-warning mr-1" onClick={handleBtnEdit}>Edit</button>
                        <button type="button" className="btn btn-danger mr-1" onClick={handleBtnDelete}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
    return (<div className="text-center">Loading...</div>);
};

export default CustomerView;