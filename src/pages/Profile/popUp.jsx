import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PopUp() {

    const { getUserData } = useSelector(state => state.userReducer)

    const destroyToken = (token) => {
        if (token !== '') {
            localStorage.removeItem('x-access-token');
        }
    }

    function handleLogout(){
        let token = localStorage.getItem('x-access-token');
        destroyToken(token)
        window.location.replace('/')
    }

    return (
        <div className='p-3 justify-content-center position-absolute end-0' style={{ zIndex: "2" }}>
            {/* <div className='col-sm-7'> */}
            <div className='card shadow-lg'>
                <div className='card-body p-3'>
                    {/* <h5 className='card-title mb-1'>Notifikasi</h5> */}
                    <div className='text-center fw-bold'>
                        {getUserData.username} | {getUserData.email}
                    </div>
                    <div className='d-flex justify-content-center'>
                        <hr
                            className='hr hr-blurry'
                            style={{ width: 300, height: 2 }}
                        ></hr>
                    </div>
                    <Link to="/profile" className='text-decoration-none'>
                        <div className='w-100 p-1 fw-bold'>
                            My Profile
                        </div>
                    </Link>
                    <div className='d-flex justify-content-center'>
                        <hr
                            className='hr hr-blurry'
                            style={{ width: 300, height: 2 }}
                        ></hr>
                    </div>
                    <div className='d-flex justify-content-center w-100'>
                        <div className='text-center text-decoration-none w-100'>
                            <button className="btn btn-danger w-100" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default PopUp
