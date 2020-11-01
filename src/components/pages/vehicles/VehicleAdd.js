import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import ImageTypes from "../../../types/ImageTypes";
import {Form, Button} from 'react-bootstrap';
import VehicleFuelTypes from "../../../types/VehicleFuelTypes";
import {projectFirestore, projectStorage} from "../../../firebase/config";
import {VehicleTypes} from "../../../types/VehicleTypes";
import VehicleModel from "../../../models/VehicleModel";

const VehicleAdd = (props) => {
    // Form data states
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [type, setType] = useState("economy");
    const [fuelType, setFuelType] = useState("petrol");
    const [seats, setSeats] = useState(null);
    const [price, setPrice] = useState(null);
    const [count, setCount] = useState(null);
    const [file, setFile] = useState(null);

    const [imgUrl, setImgUrl] = useState(null);

    // Refs
    const history = useHistory();
    const vehiclesRef = projectFirestore.collection('vehicles');

    const handleFileChange = (e) => {
        const targetFile = e.target.files[0];

        if (targetFile && Object.values(ImageTypes).includes(targetFile.type)) {
            setFile(targetFile);
        } else {
            setFile(null);
            alert("Invalid image")
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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
        projectStorage.ref(file.name).put(file)
            .on('state_changed', (snapshot) => {
                console.log(snapshot)
            }, (err) => {
                alert("ERROR");
                console.log(err);
            }, () => {
                projectStorage.ref().child(file.name).getDownloadURL()
                    .then((url) => {
                        setImgUrl(url);
                    })
            })

        debugger;

        // Store entity in Firebase
        const vehicle = new VehicleModel(
            brand,
            model,
            new Date(year),
            type,
            fuelType,
            seats,
            price,
            count,
            imgUrl,
        );

        console.log(vehicle);

        vehiclesRef
            .add(Object.assign({}, vehicle))
            .then((docRef) => {
                history.push('/vehicles');
            }).catch((err) => {
                alert(err);
                console.log(err)
            })
    };

    return (
        <div className="text-center">
            <h1>ADD VEHICLE</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                    type="text"
                    name="brand"
                    placeholder="Brand..."
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}/>
                <br/>

                <Form.Label>Model</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Model..."
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}/>
                <br/>

                <Form.Label>Year</Form.Label>
                <Form.Control
                    type="date"
                    placeholder="Construction year..."
                    min="1980-01-01"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}/>
                <br/>

                <Form.Label>Type</Form.Label>
                <Form.Control
                    as="select"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}>
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
                    onChange={(e) => setFuelType(e.target.value)}>
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
                    onChange={(e) => setSeats(Number(e.target.value))}/>
                <br/>

                <Form.Label>Rent price</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Rent price..."
                    min={1}
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}/>
                <br/>

                <Form.Label>Available vehicles</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Available vehicles..."
                    min={1}
                    required
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}/>
                <br/>

                <Form.Label>Image</Form.Label>
                <br/>
                <input
                    type="file"
                    required
                    onChange={handleFileChange}
                />
                <hr/>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
};

export default VehicleAdd;