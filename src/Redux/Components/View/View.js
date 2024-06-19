import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteProducts, viewProducts } from '../../Reducer/mediaSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from 'bootstrap';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "./View.css"

const View = () => {
    const [state, setState] = useState([])
    const [img, setImg] = useState([""])

    const dispatch = useDispatch();

    const viewData = (() => {
        dispatch(viewProducts())
            .then((res) => {
                if (res.payload.message === "All Product fetch Successfully") {
                    console.log("dispatch viewProducts: ", res.payload.data);
                    setState(res.payload.data);
                    // setImg(res.payload.data.image)
                }
            })
            .catch((err) => {
                console.log("dispatch viewProducts error: ", err);
            })
    })

    console.log("Image uploaded", img);

    useEffect(() => {
        viewData()
    }, [dispatch]);

    //delete data
    const deleteItem = (id) => {
        console.log("User ID to be deleted: ", id);
        dispatch(deleteProducts(id))
            .then((res) => {
                viewData();
            })
            .catch((err) => console.log("Error: ", err))
    }

    return (
        <div className='view_css'>
            <div>
                <Header />
            </div>
            <div className='tablecontainer_css'>
                <TableContainer style={{ height: "100%" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>ID</TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>Name</TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>Brand</TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>Image</TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>Price</TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "20px" }}>Edit</TableCell>
                                <TableCell >
                                    <button>
                                        <Link style={{ textDecoration: "none" }} to={"/create/product"}>
                                            Create
                                        </Link>
                                    </button>
                                </TableCell>
                                <TableCell >

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                state.map((data, index) => (
                                    <TableRow key={data._id}>
                                        <TableCell >
                                            {index + 1}
                                        </TableCell>
                                        <TableCell >
                                            {data.name}
                                        </TableCell>
                                        <TableCell >
                                            {data.brand}
                                        </TableCell>
                                        <TableCell >
                                            <img src={data.image} alt="" width="50px" height="50px" />
                                        </TableCell>
                                        <TableCell >
                                            $ {data.price}
                                        </TableCell>
                                        {/* <TableCell >
                                        <button>
                                            <Link style={{ textDecoration: "none" }} to={`/edit/product/${data._id}`}>
                                                More
                                            </Link>
                                        </button>
                                    </TableCell> */}
                                        <TableCell >
                                            <button>
                                                <Link style={{ textDecoration: "none" }} to={`/edit/product/${data._id}`}>
                                                    Edit
                                                </Link>
                                            </button>
                                        </TableCell>
                                        <TableCell >
                                            <button onClick={() => deleteItem(data._id)}>
                                                delete
                                            </button>
                                        </TableCell>
                                        <TableCell >
                                            <Link style={{ textDecoration: "none" }} to={`/single/${data._id}`}>
                                                More Details
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer >
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default View