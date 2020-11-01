import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {projectFirestore, projectStorage} from "../../../firebase/config";
import ImageDisplay from "../../shared/ImageDisplay";
import {FirebaseTimestampToDate, FirebaseTimestampToHtmlDate} from "../../../utils/DateUtils";
import VehicleFuelTypes from "../../../types/VehicleFuelTypes";
import {Button, Form} from "react-bootstrap";
import {VehicleTypes} from "../../../types/VehicleTypes";
import VehicleModel from "../../../models/VehicleModel";
import ImageTypes from "../../../types/ImageTypes";

const VehicleEdit = (props) => {
    const {match} = props;
    const vehicleId = match.params.id;

    //State
    const [vehicleData, setVehicleData] = useState(null);
    const [file, setFile] = useState(null);

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

    const handleBtnView = () => {
        history.push(`/vehicles/view/${vehicleId}`);
    };

    const handleBtnDelete = () => {
        history.push(`/vehicles/delete/${vehicleId}`);
    };

    const handleFileChange = (e) => {
        const targetFile = e.target.files[0];

        if (targetFile && Object.values(ImageTypes).includes(targetFile.type)) {
            setFile(targetFile);
        } else {
            setFile(null);
            alert("Invalid image")
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            brand,
            model,
            year,
            type,
            fuelType,
            seats,
            price,
            count,
        } = vehicleData;

        const submitDocument = (imgUrl) => {
            if (!imgUrl) {
                imgUrl = vehicleData.picture;
            }

            // Store entity in Firebase
            const vehicle = new VehicleModel(
                brand,
                model,
                year,
                type,
                fuelType,
                seats,
                price,
                count,
                imgUrl
            );

            vehiclesRef
                .doc(vehicleId)
                .update(Object.assign({}, vehicle))
                .then((docRef) => {
                    console.log("Document successfully updated!");
                    history.push(`/vehicles/view/${vehicleId}`);
                }).catch((err) => {
                alert(err);
                console.log(err)
            })
        };


        // Form data validation
        if (!brand) alert("Please type a brand");
        if (!model) alert("Please type a model");
        if (!year) alert("Please enter a valid year");
        if (!type) alert("Please select a vehicle type");
        if (!fuelType) alert("Please select a fuel type");
        if (!seats) alert("Please enter a valid number of seats");
        if (!price) alert("Please enter a valid price");
        if (!count) alert("Please enter a valid amount of available vehicles");

        //Image upload
        if (file) {
            await projectStorage.ref(file.name).put(file)
                .on('state_changed', (snapshot) => {
                    // console.log(snapshot)
                }, (err) => {
                    alert("ERROR");
                    console.log(err);
                }, async () => {
                    const imgUrl = await projectStorage.ref().child(file.name).getDownloadURL();
                    submitDocument(imgUrl);
                });
            return;
        }
        submitDocument();
    };

    if (vehicleData) {
        const {brand, model, year, type, fuelType, price, seats, picture, count} = vehicleData;

        return (
            <div className="text-center">
                <h1 onClick={() => {
                    console.log(vehicleData)
                }}>EDIT VEHICLE</h1>
                <ImageDisplay picture={vehicleData.picture} css={{maxHeight: "24rem"}}/>

                <Form onSubmit={handleSubmit}>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type="text"
                        name="brand"
                        placeholder="Brand..."
                        required
                        value={brand}
                        onChange={(e) => setVehicleData({...vehicleData, brand: e.target.value})}/>
                    <br/>

                    <Form.Label>Model</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Model..."
                        required
                        value={model}
                        onChange={(e) => setVehicleData({...vehicleData, model: e.target.value})}/>
                    <br/>

                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Construction year..."
                        min="1980-01-01"
                        required
                        value={FirebaseTimestampToHtmlDate(year)}
                        onChange={(e) => setVehicleData({...vehicleData, year: e.target.value})}/>
                    <br/>

                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        as="select"
                        required
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
                        value={seats}
                        onChange={(e) => setVehicleData({...vehicleData, count: Number(e.target.value)})}/>
                    <br/>

                    <Form.Label>Rent price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Rent price..."
                        min={1}
                        required
                        value={price}
                        onChange={(e) => setVehicleData({...vehicleData, price: e.target.value})}/>
                    <br/>

                    <Form.Label>Available vehicles</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Available vehicles..."
                        min={1}
                        required
                        value={count}
                        onChange={(e) => setVehicleData({...vehicleData, count: e.target.value})}/>
                    <br/>

                    <Form.Label>New image</Form.Label>
                    <br/>
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
                    <hr/>

                    <Button variant="success" type="submit">Submit</Button>
                </Form>
                <hr/>
                <div className="row">
                    <div className="col-12">
                        <button type="button" className="btn btn-primary mr-1" onClick={handleBtnView}>View</button>
                        <button type="button" className="btn btn-danger mr-1" onClick={handleBtnDelete}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }
    return (<div className="text-center">Loading...</div>);
};

export default VehicleEdit;