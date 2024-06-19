import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url, create_url, delete_url, login_url, profile_url, register_url, single_url, update_url, view_url } from "../../api/api";

let reg_url = base_url + register_url;
let log_url = base_url + login_url;
let prod_url = base_url + view_url;
let singleProduct_url = base_url + single_url;
let createProduct_url = base_url + create_url;
let updateProduct_url = base_url + update_url;
let deleteProduct_url = base_url + delete_url;
let UserProfile_url = base_url + profile_url;
// console.log("update", updateProduct_url);

//registration
export const registerUser = createAsyncThunk("post/registerUser", async ({ data }) => {
    try {
        const res = await axios.post(reg_url, data);
        // console.log("data:", data);
        console.log("Registration Slice: ", res.data);
        return { status: true, message: "success", data: res.data };
    } catch (error) {
        console.error("Error in registration: ", error);
        if (error.response.status === 500) {
            console.log("Status: ", error.response.status);
            alert("User already Exists!")
        }
        return { status: false, message: "Error in registration", data: null };
    }
})


//login
export const loginUser = createAsyncThunk("post/loginUser", async ({ data }) => {
    try {
        const res = await axios.post(log_url, data);
        // console.log("data:", data);
        console.log("Login Slice: ", res.data);
        window.localStorage.setItem("token", res.data.token);
        return { status: true, message: "success", data: res.data };
    } catch (error) {
        console.error("Error in login: ", error);
        return { status: false, message: "Error in login", data: null };
    }
})

//view products
export const viewProducts = createAsyncThunk("get/viewProducts", async () => {
    let res = await axios.get(prod_url, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    // console.log('axios response for crud view:', res.data.data);
    return res?.data
})

//create products
export const createProducts = createAsyncThunk("get/createProducts", async (formData) => {
    let res = await axios.post(createProduct_url, formData, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    return res?.data
})

//update products
export const updateProducts = createAsyncThunk("get/updateProducts", async ({ id, prod }) => {
    let res = await axios.post(`${updateProduct_url}/${id}`, prod, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    console.log("Response:", res);
    return res?.data
})

//delete products
export const deleteProducts = createAsyncThunk("get/deleteProducts", async (id) => {
    let res = await axios.delete(`${deleteProduct_url}/${id}`, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    return res?.data
})

//profile
export const userProfile = createAsyncThunk("get/userProfile", async () => {
    let res = await axios.get(`${UserProfile_url}`, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    return res?.data
})

//single products
export const singleProducts = createAsyncThunk("get/singleProducts", async (id) => {
    let res = await axios.get(`${singleProduct_url}/${id}`, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    return res?.data
})

//logout
export const logoutUser = createAsyncThunk("logoutUser", async () => {
    window.localStorage.removeItem('token')
    return null
})

const initialValues = {
    userData: [],
    loading: false,
    error: null,
};

export const mediaSlice = createSlice({
    name: "slice",
    initialState: initialValues,

    extraReducers: (builder) => {
        //Registration
        builder.addCase(registerUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //Login
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //View products
        builder.addCase(viewProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(viewProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(viewProducts.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //create products
        builder.addCase(createProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(createProducts.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //delete products
        builder.addCase(deleteProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(deleteProducts.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //single products
        builder.addCase(singleProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(singleProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(singleProducts.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //Logout User
        builder.addCase(logoutUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });
    }
})

export default mediaSlice.reducer;