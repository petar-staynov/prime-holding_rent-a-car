import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {projectFirestore, projectStorage} from "../../../firebase/config";
import CustomerModel from "../../../models/CustomerModel";
import {Button, Form} from "react-bootstrap";

const CustomerEdit = (props) => {
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

        const {
            name,
            email,
            phone,
        } = customerData;

        // Form data validation
        if (!customerData.name) alert("Please type a valid name");
        if (!customerData.email) alert("Please type a valid email");
        if (!customerData.phone) alert("Please type a valid phone number");

        // Store entity in Firebase
        const customer = new CustomerModel(name, email, phone);

        customersRef
            .doc(customerId)
            .update(Object.assign({}, customer))
            .then((docRef) => {
                console.log("Document successfully updated!");
                history.push(`/customers/view/${customerId}`);
            }).catch((err) => {
            alert("Error");
            console.log(err)
        })
    };

    if (customerData) {
        const {name, email, phone} = customerData;

        return (
            <div className="text-center">
                <h1>EDIT CUSTOMER</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="brand"
                        placeholder="Name..."
                        required
                        value={name}
                        onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                    />
                    <br/>

                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email..."
                        required
                        value={email}
                        onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                    />
                    <br/>

                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Phone number..."
                        minlength={10}
                        maxlength={20}
                        required
                        value={phone}
                        onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                    />
                    <hr/>

                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-primary mr-1" onClick={handleBtnView}>View</button>
                        <button type="button" className="btn btn-danger mr-1" onClick={handleBtnDelete}>Delete</button>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
    return (<div className="text-center">Loading...</div>);
};

export default CustomerEdit;