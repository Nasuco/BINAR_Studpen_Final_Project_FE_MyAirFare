import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useState } from 'react'

function NotifAda({ notifications }) {

  const [order, setOrder] = useState(0)

  const handleOrder = (evt) => {
    setOrder(evt.target.value)
  }

  return (
    <div>
      <div
        className='text-center bg-image p-3 mb-3'
        style={{ backgroundImage: 'url("/assets/images/image-38@2x.png")' }}
      >
        <div className='d-flex justify-content-center align-items-center h-100'>
          <div>
            <h3 className='text-light fw-bold'>
              Notifikasi
            </h3>
          </div>
        </div>
      </div>
      <div className='row d-flex justify-content-center align-content-center p-3'>
        <div className='col-md-3 p-3 pt-0'>

          <div className='p-3 bg-white fs-5 border border-secondary justify-content-center align-items-center bg-opacity-50'>
            <div className='p-2 bg-success text-light text-center fs-4 border-0 d-flex justify-content-center align-items-center'>
              <div className='col-md-8 my-2 fs-5'>Urutkan Notifikasi</div>
            </div>

            <div>
              <div className='fw-bold'>
                Urut Berdasarkan
                <div className='form-check'>
                  <input
                    className='form-check-input me-2'
                    type='radio'
                    name='listNotif'
                    value={0}
                    id='firstNotif'
                    defaultChecked
                    onClick={handleOrder}
                  />
                  <label
                    className='form-check-label text-Capitalize fw-normal'
                    htmlFor='firstNotif flexCheckDefault'
                  >
                    Terbaru
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input me-2'
                    type='radio'
                    name='listNotif'
                    value={1}
                    id='firstNotif'
                    onClick={handleOrder}
                  />
                  <label
                    className='form-check-label text-Capitalize fw-normal'
                    htmlFor='firstNotif flexCheckDefault'
                  >
                    Terlama
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-7'>
          <div className='card g-3 p-5 mx-auto rounded-0 border bg-danger bg-opacity-10'>
            {order == 0 ? 
              Array.from(notifications).reverse().map((notif, index) => (
                <div key={index} className='shadow mb-3 bg-body rounded p-3'>
                  {/* <div className='text-primary fs-5'>Pembelian Tiket</div> */}
                  {notif}
                </div>
              ))
             : 
              notifications.map((notif, index) => (
                <div key={index} className='shadow mb-3 bg-body rounded p-3'>
                  {/* <div className='text-primary fs-5'>Pembelian Tiket</div> */}
                  {notif}
                </div>
              ))
            }
            <div className='d-flex justify-content-center p-3'>
              <div className='position-absolute bottom-0 end-0 p-4'>

                <Link to='/' className='btn btn-primary'>
                  Kembali ke Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

NotifAda.propTypes = {
  notifications: PropTypes.node.isRequired
}

export default NotifAda
