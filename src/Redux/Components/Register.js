import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextField, Typography } from '@mui/material';
import "./Register.css"
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
// import axios from 'axios';
import { registerUser } from '../Reducer/mediaSlice';

const Register = () => {

    const [img, setImg] = useState("");
    let [state, setState] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        first_school: "",
        errors: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            first_school: ""
        },
    });

    let [nameerror, setnameError] = useState(false);
    let [emailerror, setemailError] = useState(false);
    let [mobileerror, setmobileError] = useState(false);
    let [passworderror, setpasswordError] = useState(false);
    let [first_schoolerror, setfirst_schoolError] = useState(false);
    let [imgerror, setImgerror] = useState(false);

    // const navigate = useNavigate()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // validation for email and password
    const isEmail = (email) =>
        /^([a-z0-9.-]+)@([a-z]{5,12}).([a-z.]{2,20})$/i.test(email);
    const isPassword = (pass) =>
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,20}$/i.test(pass);

    // const getAuthToken = () => {
    //     return localStorage.getItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE2Mzk3NWIyMTYwOTBkZTFjYzZmZWUiLCJpYXQiOjE3MTI3MzI1MzQsImV4cCI6MTcxMjc3NTczNH0.D0-6Ri8-O04Xjo4rcKfHC60BGNMZVfqDZ74Aj-Uu2mw");
    // };

    //handle Change
    const handleChange = (event) => {
        let { value, name } = event.target;
        let error = "";
        // console.log(name, value);
        switch (name) {
            case "name":
                if (!value || value.length < 1 || value.length > 16) {
                    setnameError(true);
                    error = "Name should be between 1 and 16 characters.";
                } else {
                    setnameError(false);
                }
                break;

            case "email":
                if (!isEmail(value)) {
                    setemailError(true);
                    error = "Invalid email. Please re-enter.";
                } else {
                    setemailError(false);
                }
                break;

            case "mobile":
                if (!value || value.length !== 10) {
                    setmobileError(true);
                    error = "Enter a 10-digit phone number.";
                } else {
                    setmobileError(false);
                }
                break;

            case "password":
                if (!isPassword(value)) {
                    setpasswordError(true);
                    error = "Invalid password format.";
                } else {
                    setpasswordError(false);
                }
                break;

            case "first_school":
                if (!value || value.length < 1) {
                    setfirst_schoolError(true);
                    error = "School name should be between 1 and 15 characters.";
                } else {
                    setfirst_schoolError(false);
                }
                break;

            default:
                break;
        }
        if (!error) {
            setState({ ...state, [name]: value });
        }
    };

    //handle image
    const handleImage = ((file) => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            if (fileReader.result === 0) {
                setImgerror(true);
                console.log("no image found", fileReader.result);
            } else {
                setImgerror(false);
                setImg(fileReader.result);
                // console.log("uploaded image", fileReader.result);
            }
        })
        fileReader.readAsDataURL(file);
    })

    //submit handler
    const submitHandler = (event) => {
        event.preventDefault();

        // Fetch the token
        // const authToken = getAuthToken();

        if (!state.name && !state.email && !state.mobile && !state.password && !state.first_school && !img) {
            if (!state.name) {
                setnameError(true);
            }
            else if (!state.email) {
                setemailError(true);
            }
            else if (!state.mobile) {
                setmobileError(true);
            }
            else if (!state.password) {
                setpasswordError(true);
            }
            else if (!state.first_school) {
                setfirst_schoolError(true);
            }
            else if (!img) {
                setImgerror(true);
            }
        }
        else {
            let prod = new FormData();
            prod.append('name', state.name);
            prod.append('email', state.email);
            prod.append('mobile', state.mobile);
            prod.append('password', state.password);
            prod.append('first_school', state.first_school);
            prod.append('image', img);

            // console.log("Prod: ", prod);
            // console.log("State before submission: ", state);

            // dispatch(registerUser({ data: prod, token: authToken }))
            dispatch(registerUser({ data: prod }))
                .then((res) => {
                    // console.log("Dispatch sent: ", res);
                    // console.log("Submitted Value: ", state, img);
                    // console.log("Message: ", res.payload.data.message);
                    const responseData = res.payload.data.token;
                    console.log("Token: ", responseData);
                    window.sessionStorage.setItem("token", res.payload.data.token)
                    alert(res.payload.data.message);
                    navigate("/login")
                })
                .catch((err) => {
                    console.log("Dispatch error: ", err);
                });
        }

    };

    return (
        <div className='form_css_main'
            onSubmit={submitHandler}
        >
            <form>
                <div className='form_css_main_2'>
                    <div>
                        <Typography className='register_heading_css'>Create a New Account</Typography>
                    </div>
                    <div className='form_css'>
                        <TextField
                            className="input_data_css" type="text" name="name" label="name" onChange={handleChange}
                        />

                        <TextField
                            className="input_data_css" type="text" name="email" label="email" onChange={handleChange}
                        />
                        <TextField
                            className="input_data_css" type="number" name="mobile" label="mobile" onChange={handleChange}
                        />
                        <TextField
                            className="input_data_css" type="password" name="password" label="password" onChange={handleChange}
                        />
                        <TextField
                            className="input_data_css" type="text" name="first_school" label="first_school" onChange={handleChange}
                        />
                        <div>
                            <label style={{ color: "black" }} >Please upload an image:
                                <input type="file" name='img' onChange={(event) => {
                                    handleImage(event.target.files[[0]])
                                }} />
                            </label>
                        </div>
                        <div>
                            {nameerror ? (
                                <p className="error-message">*First name should be between 1 and 10 characters.</p>
                            ) : (
                                ""
                            )}

                            {emailerror ? (
                                <p className="error-message">*Email is invalid.Pleae re-enter..</p>
                            ) : (
                                ""
                            )}

                            {mobileerror ? (
                                <p className="error-message">*Enter 10 digit phone number..</p>
                            ) : (
                                ""
                            )}
                            {passworderror ? (
                                <p className="error-message">*Invalid Password: Minimum length of 8 characters. Include at least one uppercase letter, lowercase letter, number. special character (e.g., !, @, #, $).</p>
                            ) : (
                                ""
                            )}
                            {first_schoolerror ? (
                                <p className="error-message">*School name should be between 1 and 10 characters.</p>
                            ) : (
                                ""
                            )}
                            {imgerror ? (
                                <p className="error-message">*Please upload an image!</p>
                            ) : (
                                ""
                            )}
                        </div>
                        <Button type="submit" className='registration_icon'>
                            Submit
                        </Button>

                        <Link to="login" className="link_css" >
                            Already have an account?
                        </Link>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default Register