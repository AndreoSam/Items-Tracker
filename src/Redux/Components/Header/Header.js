import React, { useEffect, useState } from 'react'
import "./Header.css"
import { useDispatch } from 'react-redux'
import { logoutUser, userProfile } from '../../Reducer/mediaSlice'
// import { Button } from 'react-bootstrap'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link, useNavigate } from 'react-router-dom';
const Header = () => {
  const [state, setState] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userProfile())
      .then((res) => {
        // console.log(res.payload.data[0]);
        setState(res.payload.data[0])
      })
  }, [dispatch])
  const navigate = useNavigate();

  //logout
  const handleLogout = () => {
    dispatch(logoutUser())
      .then((res) => {
        navigate("/login")
      })
      .catch((err) => { console.log(err); })
  }

  return (
    <div className='header_css'>
      <div>Test Server</div>
      <div>
        Welcome Mr.{state.name}
      </div>
      <div>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Link variant="contained" style={{ color: "white", textDecoration: "none" }} {...bindTrigger(popupState)}>
                Profile
                <img src={state.image} />
              </Link>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>
                  <Link to={"/user/dashboard"} style={{ textDecoration: "none" }}>
                    My Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
      {/* <Button>
        Logout
      </Button> */}
    </div>
  )
}

export default Header