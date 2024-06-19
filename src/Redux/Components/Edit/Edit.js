import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { singleProducts, updateProducts } from '../../Reducer/mediaSlice';
import Header from '../Header/Header';
import "./Edit.css"
import Footer from '../Footer/Footer';

const Edit = () => {
    let [state, setState] = useState({
        name: "",
        price: "",
        description: "",
        brand: ""
    });

    const [img, setImg] = useState({});
    let [imgerror, setImgerror] = useState(false);
    let [nameerror, setnameError] = useState(false);
    let [priceerror, setpriceError] = useState(false);
    let [decriptionerror, setdecriptionError] = useState(false);
    let [branderror, setbrandError] = useState(false);

    let { id } = useParams()
    // console.log("ID: ", id);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const getData = (() => {
        dispatch(singleProducts(id))
            .then((res) => {
                // console.log("result: ", res.payload.data);
                if (res.payload.message === "get Product") {
                    setState({
                        name: res.payload.data.name,
                        price: res.payload.data.price, description: res.payload.data.description, brand: res.payload.data.brand
                    });
                    setImg(res.payload.data.image);
                }
            })
    })

    useEffect(() => {
        getData()
    }, [dispatch, id])

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
    // console.log("State: ", state);
    console.log("Image: ", img);

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

            dispatch(updateProducts({ id, prod: formData }))
                .then((res) => {
                    console.log("Res:", res.payload.message);

                    if (res.payload.message === "update successfully") {
                        // console.log("response: ", res);
                        navigate("/view");
                    }
                })
                .catch((err) => {
                    // console.log("Dispatch error: ", err);
                });
        }
        // console.log("submitted value: ", state, img);
    }

    // console.log("state: ", state);

    return (
        <div>
            <Header />
            <div className='create_main_form_css' onSubmit={submitHandler}>
                <form>
                    <div className='create_form_css'>
                        <p className="create_header_css">Edit Data</p>
                        <label className='label_css'>Name:
                            <input type="text" className="input_label_css" placeholder={state.name} name="name" label="name" onChange={handleChange} />
                        </label>
                        <label className='label_css'>Price:
                            <input type="number" className="input_label_css" placeholder={state.price} name="price" label="price" onChange={handleChange} />
                        </label>
                        <label className='label_css'>Description:
                            <input type="text" className="input_label_css" placeholder={state.description} name="description" label="description" onChange={handleChange} />
                        </label>
                        <label className='label_css'>Brand:
                            <input type="text" className="input_label_css" placeholder={state.brand} name="brand" label="brand" onChange={handleChange} />
                        </label>
                        <label style={{ color: "black", display: "flex", justifyContent: "space-around" }}>
                            <input type="file" name='img' className="input_label_css" onChange={(event) => setImg(event.target.files[0])} />
                            <img src={img} alt="" style={{ width: "40px", height: "40px" }} />
                        </label>
                        <div>
                            <Button type="submit" className='registration_icon'>
                                update
                            </Button>
                        </div>
                        <div>
                            {nameerror ? (
                                <p className="error-message">*First name should be between 1 and 10 characters.</p>
                            ) : (
                                ""
                            )}
                            {priceerror ? (
                                <p className="error-message">*Please enter the price.</p>
                            ) : (
                                ""
                            )}
                            {decriptionerror ? (
                                <p className="error-message">*Please enter the description.</p>
                            ) : (
                                ""
                            )}
                            {branderror ? (
                                <p className="error-message">*Please enter the brand.</p>
                            ) : (
                                ""
                            )}
                            {imgerror ? (
                                <p className="error-message">*please add an image.</p>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Edit