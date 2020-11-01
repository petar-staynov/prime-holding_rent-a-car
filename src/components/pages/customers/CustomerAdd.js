import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {VehicleTypes} from "../../../types/VehicleTypes";
import VehicleFuelTypes from "../../../types/VehicleFuelTypes";
import VehicleModel from "../../../models/VehicleModel";
import CustomerModel from "../../../models/CustomerModel";
import {useHistory} from "react-router-dom";
import {projectFirestore} from "../../../firebase/config";

const CustomerAdd = (props) => {
    // Form data states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    // Refs
    const history = useHistory();
    const customersRef = projectFirestore.collection('customers');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            alert("Please type a brand");
            return;
        }
        if (!email) {
            alert("Please type a model");
            return;
        }
        if (!phone) {
            alert("Please enter a valid year");
            return;
        }

        const customer = new CustomerModel(
            name,
            email,
            phone,
        );

        customersRef
            .add(Object.assign({}, customer))
            .then((docRef) => {
                history.push('/customers');
            }).catch((err) => {
            alert("Error");
            console.log(err)
        })
    };

    return (
        <div className="text-center">
            <h1>Add Customer</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="brand"
                    placeholder="Name..."
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br/>

                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Email..."
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPhone(e.target.value)}
                />

                <hr/>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
};

export default CustomerAdd;