import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { createProducts } from '../../Reducer/mediaSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import "./Create.css"
import Footer from '../Footer/Footer';

const Create = () => {
    let [state, setState] = useState({
        name: "",
        price: "",
        description: "",
        brand: ""
    });

    const [img, setImg] = useState("");
    let [imgerror, setImgerror] = useState(false);
    let [nameerror, setnameError] = useState(false);
    let [priceerror, setpriceError] = useState(false);
    let [decriptionerror, setdecriptionError] = useState(false);
    let [branderror, setbrandError] = useState(false);


    const navigate = useNavigate()
    const dispatch = useDispatch();

    //handle Change
    const handleChange = (event) => {
        let { value, name } = event.target;
        let error = "";
        // console.log(name, value);

        switch (name) {
            case "name":
                if (!value) {
                    setnameError(true);
                    error = "Name should be between 1 and 16 characters.";
                } else {
                    setnameError(false);
                }
                break;

            case "price":
                if (!value) {
                    setpriceError(true);
                    error = "Enter the price";
                } else {
                    setpriceError(false);
                }
                break;

            case "description":
                if (!value) {
                    setdecriptionError(true);
                    error = "Enter the description";
                } else {
                    setdecriptionError(false);
                }
                break;

            case "brand":
                if (!value) {
                    setbrandError(true);
                    error = "Enter the brand";
                } else {
                    setbrandError(false);
                }
                break;

            default:
                break;
        }
        if (!error) {
            setState({ ...state, [name]: value });
        }
    }

    //handle submit
    const submitHandler = (event) => {
        event.preventDefault();
        if (!state.name && !state.price && !state.description && !state.brand && !img) {
            if (!state.name) {
                setnameError(true);
            }
            else if (!state.price) {
                setpriceError(true);
            }
            else if (!state.description) {
                setdecriptionError(true);
            }
            else if (!state.brand) {
                setbrandError(true);
            }
            else if (!img) {
                setImgerror(true);
            }
        }
        else {
            let formData = new FormData();
            formData.append('name', state.name);
            formData.append('price', state.price);
            formData.append('description', state.description);
            formData.append('brand', state.brand);
            formData.append('image', img);

            dispatch(createProducts(formData))
                .then((res) => {
                    if (res.payload.message === "product added successfully") {
                        console.log("response: ", res);
                        navigate("/view");
                    }
                })
                .catch((err) => {
                    console.log("Dispatch error: ", err);
                });
        }
        console.log("submitted value: ", state, img);
    }

    return (
        <div>
            <Header />
            <div className='create_main_form_css' onSubmit={submitHandler}>
                <form>
                    <div className='create_form_css'>
                        <p className="create_header_css" >Create Data</p>
                        <label className='label_css'>Name:
                            <input type="text" className="input_label_css" placeholder='Name' name="name" label="name" onChange={handleChange} />
                        </label>
                        <label className='label_css'>Price:
                            <input type="number" className="input_label_css" placeholder='Price' name="price" label="price" onChange={handleChange} />
                        </label>
                        <label className='label_css'>Description:
                            <input type="text" className="input_label_css" placeholder='Description' name="description" label="description" onChange={handleChange} />
                        </label>
                        <label className='label_css'>Brand:
                            <input type="text" className="input_label_css" placeholder='Brand' name="brand" label="brand" onChange={handleChange} />
                        </label>
                        <div className='imageupload_css'>
                            <label style={{ color: "black" }} >
                                <input type="file" name='img' className="input_label_css" onChange={(event) => setImg(event.target.files[0])} />
                            </label>
                        </div>
                        <div>
                            <Button type="submit" className='registration_icon'>
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Create