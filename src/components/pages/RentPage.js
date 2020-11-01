import React, {useEffect, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useHistory} from "react-router-dom";
import {projectFirestore} from "../../firebase/config";
import {VehicleTypes} from "../../types/VehicleTypes";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {FirebaseTimestampToYear, JsDateToHtmlDate} from "../../utils/DateUtils";
import {MaximumDate} from "../../Constants";
import {selectCount} from "../../features/counter/counterSlice";
import RentModel from "../../models/RentModel";

const RentPage = (props) => {
    // State
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [finalRentPrice, setFinalRentPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    // Refs
    const history = useHistory();
    const customersRef = projectFirestore.collection('customers');
    const vehiclesRef = projectFirestore.collection('vehicles');
    const rentsRef = projectFirestore.collection('rents');

    const [customers] = useCollectionData(customersRef, {idField: 'id'});
    const [vehicles] = useCollectionData(vehiclesRef, {idField: 'id'});

    // Effects
    /* Default vehicle and customer select */
    useEffect(() => {
        if (vehicles) {
            setSelectedVehicle(vehicles[0]);
        }
        if (customers) {
            setSelectedCustomer(customers[0]);
        }
    }, [vehicles, customers]);


    /* Price calculation */
    useEffect(() => {
        if (startDate && endDate) {
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);

            const datesTimeDifference = endDateObj.getTime() - startDateObj.getTime();
            const datesDaysDifference = Math.ceil(datesTimeDifference / (1000 * 3600 * 24));

            let rentPrice = datesDaysDifference * selectedVehicle.price;

            if (datesDaysDifference >= 10) {
                rentPrice = rentPrice - (rentPrice * 0.10);
                setDiscount(10);
            } else if (datesDaysDifference >= 7) {
                rentPrice = rentPrice - (rentPrice * 0.07);
                setDiscount(7);
            } else if (datesDaysDifference >= 3) {
                rentPrice = rentPrice - (rentPrice * 0.03);
                setDiscount(3);
            } else {
                setDiscount(0);
            }

            setFinalRentPrice(rentPrice);
        }
    }, [startDate, endDate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!setSelectedVehicle) {
            alert("Please select a vehicle")
            return;
        }
        if (!selectedCustomer) {
            alert("Please select a customer");
            return;
        }
        if (!startDate) {
            alert("Please select a start date");
            return;
        }
        if (!endDate) {
            alert("Please select an end date");
            return;
        }
        if (finalRentPrice <= 0) {
            alert("You need to rent the vehicle for at least one day");
            return;
        }

        const rentObj = new RentModel(
            new Date(startDate),
            new Date(endDate),
            selectedCustomer.id,
            selectedVehicle.id,
        )

        rentsRef
            .add(Object.assign({}, rentObj))
            .then((docRef) => {
                console.log('Rent event created!')

                console.log(selectedVehicle.id);
                vehiclesRef
                    .doc(selectedVehicle.id)
                    .update({
                        count: selectedVehicle.count - 1,
                    }).then(() => {
                    history.push('/rents');
                });
            }).catch((err) => {
            alert("Error");
            console.log(err)
        })
    };

    if (!customers || !vehicles) {
        return (<h1 className='text-center'>LOADING...</h1>)
    }
    if (customers.length === 0 || vehicles.length === 0) {
        return (<h1 className='text-center'>Not enough customers or vehicles available.</h1>)
    }

    if (customers.length > 0 && vehicles.length > 0) {
        return (
            <div>
                <h1 className="text-center">Rent a car</h1>
                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col col-auto">
                            <p>Select a customer:</p>
                            <Form.Control
                                as="select"
                                required
                                value={selectedCustomer}
                                onChange={(e) => setSelectedCustomer(e.target.value)}>
                                {
                                    customers.map((customer, index) => {
                                        return (<option key={index} value={customer}>{customer.name}</option>)
                                    })
                                }
                            </Form.Control>
                        </div>
                        <div className="col col-auto">
                            <p>Select a vehicle:</p>
                            <Form.Control
                                as="select"
                                required
                                value={selectedVehicle}
                                onChange={(e) => setSelectedVehicle(e.target.value)}>
                                {
                                    vehicles.map((vehicle, index) => {
                                        return (
                                            <option key={index} value={vehicle}>
                                                {vehicle.brand} {vehicle.model} {FirebaseTimestampToYear(vehicle.year)} - {vehicle.count}
                                            </option>
                                        )
                                    })
                                }
                            </Form.Control>
                        </div>
                        <div className="col col-auto">
                            <p>Start Date:</p>
                            <Form.Control
                                type="date"
                                required
                                value={startDate}
                                max={MaximumDate}
                                onChange={(e) => setStartDate(e.target.value)}>
                            </Form.Control>
                        </div>
                        <div className="col col-auto">
                            <p>End Date:</p>
                            <Form.Control
                                type="date"
                                min={startDate ? JsDateToHtmlDate(new Date(startDate)) : JsDateToHtmlDate(new Date(Date.now()))}
                                max={MaximumDate}
                                required
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}>
                            </Form.Control>
                        </div>
                        <div className="col col-auto">
                            <p>Price</p>
                            <span>{finalRentPrice}</span>
                        </div>
                    </div>
                    <br/>
                    <div className="text-center">
                        <p>Discount: {discount}%</p>
                        <br/>
                        <Button variant="primary" type="submit">Rent</Button>
                    </div>
                </Form>
            </div>
        )
    }

};

export default RentPage;