import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {projectFirestore, projectStorage} from "../../../firebase/config";
import CustomerModel from "../../../models/CustomerModel";
import {Button, Form} from "react-bootstrap";
import {EmailPattern} from "../../../regex/RegexPatterns";

const CustomerDelete = (props) => {
    const {match} = props;
    const customerId = match.params.id;

    //State
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

    const handleBtnView = () => {
        history.push(`/customers/view/${customerId}`);
    };

    const handleBtnDelete = () => {
        history.push(`/customers/delete/${customerId}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await customersRef
            .doc(customerId)
            .delete()
            .then(() => {
                alert('Customer deleted!')
                history.push(`/customers`);
            }).catch((err) => {
                alert(err);
                console.log(err)
            })
    };

    if (customerData) {
        const {name, email, phone} = customerData;

        return (
            <div className="text-center">
                <h1>DELETE CUSTOMER</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="brand"
                        placeholder="Name..."
                        disabled
                        value={name}
                    />
                    <br/>

                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email..."
                        disabled
                        value={email}
                        pattern={EmailPattern}
                    />
                    <br/>

                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Phone number..."
                        disabled
                        value={phone}
                    />
                    <hr/>

                    <Button variant="danger" size="lg" type="submit">Delete</Button>
                </Form>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-primary mr-1" onClick={handleBtnView}>View</button>
                        <button type="button" className="btn btn-warning mr-1" onClick={handleBtnDelete}>Edit</button>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
    return (<div className="text-center">Loading...</div>);
};

export default CustomerDelete;