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
                alert(err);
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
                        required
                        disabled
                        value={brand}
                        onChange={(e) => setVehicleData({...vehicleData, brand: e.target.value})}/>
                    <br/>

                    <Form.Label>Model</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Model..."
                        required
                        disabled
                        value={model}
                        onChange={(e) => setVehicleData({...vehicleData, model: e.target.value})}/>
                    <br/>

                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Construction year..."
                        min="1980-01-01"
                        required
                        disabled
                        value={FirebaseTimestampToHtmlDate(year)}
                        onChange={(e) => setVehicleData({...vehicleData, year: e.target.value})}/>
                    <br/>

                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        as="select"
                        required
                        disabled
                        value={type}
                        onChange={(e) => setVehicleData({...vehicleData, type: e.target.value})}>
                        {
                            Object.entries(VehicleTypes).map(([key, value]) => {
                                return (<option key={key} value={key}>{value}</option>)
                            })
                        }
                    </Form.Control>
                    <br/>

                    <Form.Label>Fuel type</Form.Label>
                    <Form.Control
                        as="select"
                        required
                        disabled
                        value={fuelType}
                        onChange={(e) => setVehicleData({...vehicleData, fuelType: e.target.value})}>
                        {
                            Object.entries(VehicleFuelTypes).map(([key, value]) => {
                                return (<option key={key} value={key}>{value}</option>)
                            })
                        }
                    </Form.Control>
                    <br/>

                    <Form.Label>Number of seats</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Number of seats..."
                        min={1}
                        max={7}
                        required
                        disabled
                        value={seats}
                        onChange={(e) => setVehicleData({...vehicleData, count: Number(e.target.value)})}/>
                    <br/>

                    <Form.Label>Rent price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Rent price..."
                        min={1}
                        required
                        disabled
                        value={price}
                        onChange={(e) => setVehicleData({...vehicleData, price: e.target.value})}/>
                    <br/>

                    <Form.Label>Available vehicles</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Available vehicles..."
                        min={1}
                        required
                        disabled
                        value={count}
                        onChange={(e) => setVehicleData({...vehicleData, count: e.target.value})}/>
                    <br/>

                    <Button variant="danger" type="submit">Delete</Button>
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