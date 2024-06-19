import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material'
import { loginUser } from '../../Reducer/mediaSlice';
import axios from 'axios';
// import axios from 'axios';

const Login = () => {
    let [emailerror, setemailError] = useState(false);
    let [passworderror, setpasswordError] = useState(false);
    const [state, setState] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate()
    const dispatch = useDispatch();

    //handle Change
    const changeHandler = (event) => {
        let { name, value } = event.target;
        // console.log(`${name}: ${value}`);

        switch (name) {
            case "email":
                if (!value) {
                    setemailError(true);
                } else {
                    setemailError(false);
                }
                break;

            case "password":
                if (!value) {
                    setpasswordError(true);
                } else {
                    setpasswordError(false);
                }
                break;

            default:
                break;
        }
        setState({ ...state, [name]: value });
    }


    //Submit Button:
    let submitHandler = (event) => {
        event.preventDefault();

        let prod = new FormData();
        prod.append("email", state.email);
        prod.append("password", state.password);

        // console.log("Prod: ", prod);
        // console.log("State before submission: ", state);

        if (!state.email && !state.password) {
            if (!state.email) {
                setemailError(true)
            }
            if (!state.password) {
                setpasswordError(true)
            }
        } else {
            dispatch(loginUser({
                data: { email: state.email, password: state.password }
            }))
                .then((res) => {
                    if (res.payload.message === "success") {
                        window.localStorage.setItem("token", res.payload.data.token);
                        alert("login successful")
                        console.log('Dispatch sent: ', res);
                        navigate('/view')
                    }
                    else{
                        alert("User is not registered, please sign up!")
                        navigate("/")
                    }
                })
                .catch((err) => console.log('axios post error:', err.response.data))
        }
    };


    return (
        <div className='form_css_main'
            onSubmit={submitHandler}
        >
            <form>
                <div className='form_css_main_2'>
                    <div>
                        <Typography className='register_heading_css'>Login</Typography>
                    </div>
                    <div className='form_css'>
                        <TextField
                            className="input_data_css" type="text" name="email" label="email" onChange={changeHandler}
                        />
                        {emailerror ? (
                            <p className="error-message">**Please enter your email...!</p>
                        ) : (
                            ""
                        )}
                        <TextField
                            className="input_data_css" type="password" name="password" label="password" onChange={changeHandler}
                        />
                        {passworderror ? (
                            <p className="error-message">**Please enter your password...!</p>
                        ) : (
                            ""
                        )}
                        <Button type="submit" className='registration_icon'>
                            Login
                        </Button>

                        <Link to="/" className="link_css"
                        >
                            Don't have an account?
                        </Link>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default Login