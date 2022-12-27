import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// let notifications = []

function PopUpNotifikasi({ notifications }) {

  return (
    <div className='p-3 justify-content-center position-absolute end-0' style={{ zIndex: "2" }}>
      {/* <div className='col-sm-7'> */}
      <div className='card shadow-lg' style={{width: "350px", height: "300px", overflowY: "auto"}}>
        <div className='card-body p-3'>
          <div className="d-flex">
            <h5 className='card-title mb-1'>Notifikasi</h5>
            <button id='notif-close' className="btn btn-danger rounded-circle ms-auto">
              X
            </button>
          </div>
          <div className='d-flex justify-content-center'>
            <hr
              className='hr hr-blurry'
              style={{ width: 404, height: 2 }}
            ></hr>
          </div>

          <div className='d-flex justify-content-center text-secondary mb-1'>
            {notifications.length === 0 ? (
              <>
                <div className='row'>
                  <div className="col-12 text-center">
                    <img
                      src='/assets/images/amplop.png'
                      alt='amplop'
                      style={{ height: 80, width: 80 }}
                    />
                  </div>
                  <div className="col-12 text-center">
                    <p className='text-center'>
                      Belum ada notifikasi baru untuk anda
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="row">
                {
                  Array.from(notifications).reverse().map((notif, index) => (
                    <div key={index} className="col-12">
                      <div className="alert alert-warning" role="alert">
                        {notif}
                      </div>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
          
        </div>
        <div className='card-body p-3 d-flex justify-content-center text-primary'>
            <Link to='/notifications' className='text-center text-decoration-none'>
              Lihat Semua Notifikasi &gt;&gt;
            </Link>
          </div>
      </div>
      {/* </div> */}
    </div>
  )
}

PopUpNotifikasi.propTypes = {
  notifications: PropTypes.node.isRequired
}

export default PopUpNotifikasi
