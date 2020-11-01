import React, {useEffect, useState} from 'react';
import ImageDisplay from "../../shared/ImageDisplay";
import {Button, Form} from "react-bootstrap";
import {FirebaseTimestampToHtmlDate} from "../../../utils/DateUtils";
import {VehicleTypes} from "../../../types/VehicleTypes";
import VehicleFuelTypes from "../../../types/VehicleFuelTypes";
import {useHistory} from "react-router-dom";
import {projectFirestore} from "../../../firebase/config";

const VehicleDelete = (props) => {
    const {match} = props;
    const vehicleId = match.params.id;

    //State
    const [vehicleData, setVehicleData] = useState(null);

    // Refs
    const history = useHistory();
    const vehiclesRef = projectFirestore.collection('vehicles');

    useEffect(() => {
        vehiclesRef
            .doc(vehicleId)
            .get()
            .then(res => {
                setVehicleData(res.data());
            });
    }, []);

    const handleBtnEdit = () => {
        history.push(`/vehicles/edit/${vehicleId}`);
    };

    const handleBtnView = () => {
        history.push(`/vehicles/view/${vehicleId}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await vehiclesRef
            .doc(vehicleId)
            .delete()
            .then(() => {
                alert('Vehicle deleted!')
                history.push(`/vehicles`);
            }).catch((err) => {
                alert("Error");
                console.log(err)
            })
    };

    if (vehicleData) {
        const {brand, model, year, type, fuelType, price, seats, picture, count} = vehicleData;

        return (
            <div className="text-center">
                <h1>DELETE VEHICLE</h1>
                <ImageDisplay picture={vehicleData.picture} css={{maxHeight: "24rem"}}/>

                <Form onSubmit={handleSubmit}>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type="text"
                        name="brand"
                        placeholder="Brand..."
                        disabled
                        value={brand}
                    />
                    <br/>

                    <Form.Label>Model</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Model..."
                        disabled
                        value={model}
                    />
                    <br/>

                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Construction year..."
                        disabled
                        value={FirebaseTimestampToHtmlDate(year)}
                    />
                    <br/>

                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        as="select"
                        required
                        disabled
                        value={type}>
                        <option key={type} value={VehicleTypes[type]}>{VehicleTypes[type]}</option>
                    </Form.Control>
                    <br/>

                    <Form.Label>Fuel type</Form.Label>
                    <Form.Control
                        as="select"
                        required
                        disabled
                        value={fuelType}>
                        <option key={fuelType} value={VehicleFuelTypes[fuelType]}>{VehicleFuelTypes[fuelType]}</option>
                    </Form.Control>
                    <br/>

                    <Form.Label>Number of seats</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Number of seats..."
                        disabled
                        value={seats}
                    />
                    <br/>

                    <Form.Label>Rent price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Rent price..."
                        disabled
                        value={price}
                    />
                    <br/>

                    <Form.Label>Available vehicles</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Available vehicles..."
                        disabled
                        value={count}
                    />
                    <br/>

                    <Button variant="danger" size="lg" type="submit">Delete</Button>
                </Form>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-primary mr-1" onClick={handleBtnView}>View</button>
                        <button type="button" className="btn btn-warning mr-1" onClick={handleBtnEdit}>Edit</button>
                    </div>
                </div>
                <br/>
            </div>
        )
    }
    return (<div className="text-center">Loading...</div>);
};

export default VehicleDelete;