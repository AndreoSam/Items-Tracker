import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
// import Registration from '../Components/Registration'
import Register from '../Components/Register'
import Login from '../Components/Login/Login'
import View from '../Components/View/View'
// import Single from '../Components/Single/Single'
import Create from '../Components/Create/Create'
import Edit from '../Components/Edit/Edit'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Single from '../Components/Single/Single'
import Profile from '../Components/Profile/Profile'


const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Register />} />
                <Route path='/user/dashboard' element={<Profile />} />
                <Route path='/login' element={<Login />} />
                <Route path='/view' element={<View />} />
                <Route path='/single/:id' element={<Single />} />
                <Route path='/create/product' element={<Create />} />
                <Route path='/edit/product/:id' element={<Edit />} />

                {/* <Route path='/' element={<Register />} />
                <Route path='view' element={<View />} />
                <Route path='login' element={<Login />} />
                <Route path='*' element={<Error />} /> */}
            </Routes>
        </Router>
    )
}

export default Routing