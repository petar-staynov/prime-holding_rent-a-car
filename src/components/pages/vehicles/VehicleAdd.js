import React, {useEffect, useState} from 'react';
import ImageTypes from "../../../types/ImageTypes";
import {Form, Button} from 'react-bootstrap';
import VehicleFuelTypes from "../../../types/VehicleFuelTypes";
import useStorage from "../../../hooks/useStorage";
import {projectFirestore} from "../../../firebase/config";
import {useCollectionData} from "react-firebase-hooks/firestore";

const VehicleAdd = (props) => {

    const [imgFile, setImgFile] = useState(null);

    const changeHandler = (e) => {
        const file = e.target.files[0];

        if (file && Object.values(ImageTypes).includes(file.type)) {
            setImgFile(file);
        } else {
            setImgFile(null);
            alert("Invalid image")
        }
    }

    const handleSubmit = () => {
        // const {url, progress, error} = useStorage(imgFile);
        //
        // if (error) {
        //     alert(error);
        //     return;
        // }
        //
        // const collectionRef = projectFirestore.collection('vehicles');
        //
        // collectionRef.add()
        // console.log(url);

    };



    return (
        <div className="text-center">
            <h1>ADD VEHICLE</h1>
            <Form>
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" placeholder="Brand..."/>
                <br/>
                <Form.Label>Model</Form.Label>
                <Form.Control type="text" placeholder="Model..."/>
                <br/>
                <Form.Label>Year</Form.Label>
                <Form.Control type="date" placeholder="Construction year..."/>
                <br/>
                <Form.Label>Fuel type</Form.Label>
                <Form.Control as="select">
                    {
                        Object.entries(VehicleFuelTypes).map(([key, value]) => {
                            return (<option>{value}</option>)
                        })
                    }
                </Form.Control>
                <br/>
                <Form.Label>Number of seats</Form.Label>
                <Form.Control type="number" placeholder="Number of seats..."/>
                <br/>
                <Form.Label>Image</Form.Label>
                <br/>
                <input type="file" onChange={changeHandler}/>
                <hr/>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
};

export default VehicleAdd;