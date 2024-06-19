import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { singleProducts } from '../../Reducer/mediaSlice';
import { Button } from 'react-bootstrap';
import Header from '../Header/Header';

const Single = () => {
    const [state, setState] = useState([])
    const dispatch = useDispatch();

    const { id } = useParams()
    // console.log("ID: ", id);

    useEffect(() => {
        dispatch(singleProducts(id))
            .then((res) => {
                console.log("Result", res);
                if (res.payload.message === "get Product") {
                    setState(res.payload.data)
                }
            })
            .catch((err) => {
                console.log("dispatch viewProducts error: ", err);
            })
    }, [dispatch, id]);

    console.log("State: ", state);

    return (
        <div style={{ height: "90vh" }}>
            <Header />
            <h1 style={{ backgroundColor: "blue", color: "white" }}>View Page</h1>
            <img src={state.image} alt="" width="200px" height="200px" />
            <h2>ID: {id}</h2>
            <h2>Name: {state.name}</h2>
            <h2>Price: {state.price}</h2>
            <h2>Description: {state.description}</h2>
            <h2>Brand: {state.brand}</h2>
            <Button >
                <Link to={"/view"} style={{ textDecoration: "none" }}>
                    Back
                </Link>
            </Button>
        </div>
    )
}

export default Single