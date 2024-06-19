import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { userProfile } from '../../Reducer/mediaSlice'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import "./Profile.css"

const Profile = () => {
    const [state, setState] = useState("")
    const [img, setImg] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userProfile())
            .then((res) => {
                console.log(res.payload.data[0]);
                setState(res.payload.data[0])
                setImg("uploads/" + res.payload.data[0].image)
                // const imageUrl = URL.createObjectURL(new Blob([res.payload.data[0].image]));
                // setImg("uploads/" + imageUrl);
            })
    }, [dispatch])

    console.log("State: ", state);
    console.log("Image: ", img);

    return (
        <div>
            <Header />
            <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <h1>This is the Profile Page</h1>
                <div className='profile_main_css'>
                    <div className='profile_main_css_2'>
                        <div className='profile_picture_css'>
                            <img src={img} alt="no img" />
                        </div>
                        <div className='profile_description_css'>
                            <p className='profile_description_css_p_tag'>ID: {state._id}</p>
                            <p className='profile_description_css_p_tag'>Name: {state.name}</p>
                            <p className='profile_description_css_p_tag'>Email: {state.email}</p>
                            <p className='profile_description_css_p_tag'>Mobile: {state.mobile}</p>
                            <p className='profile_description_css_p_tag'>Role: {state.role}</p>
                            <p className='profile_description_css_p_tag'>First School: {state.first_school}</p>
                        </div>
                    </div>
                    <div>
                        <Button>
                            <Link style={{ textDecoration: "none" }} to={"/view"}>
                                Back
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile