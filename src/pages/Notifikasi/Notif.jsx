import React from 'react'
import { Link } from 'react-router-dom'

function Notif() {
  return (
    <div>
      <div
        className='text-center bg-image p-3 mb-4'
        style={{ backgroundImage: 'url("/assets/images/header.png")' }}
      >
        <div>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h2>Notifikasi</h2>
            </div>
          </div>
        </div>
      </div>
      <div className='row justify-content-center p-3'>
        <div className='col-sm-2'>
          <div className='card'>
            <div className='card-body p-3'>
              <div className='card-title mb-3'>
                <div className='badge bg-success p-3' style={{ width: 150 }}>
                  Tandai Yang Dibaca
                </div>
              </div>
              <div>
                <div className='fw-bold mb-3'>
                  Status
                  <div className='form-check'>
                    <input
                      className='form-check-input me-2'
                      type='checkbox'
                      name='listNotif'
                      value=''
                      id='firstNotif'
                    />
                    <label
                      className='form-check-label text-Capitalize fw-normal'
                      htmlFor='firstNotif flexCheckDefault'
                    >
                      Sudah Dibaca
                    </label>
                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input me-2'
                      type='checkbox'
                      name='listNotif'
                      value=''
                      id='firstNotif'
                    />
                    <label
                      className='form-check-label text-Capitalize fw-normal'
                      htmlFor='firstNotif flexCheckDefault'
                    >
                      Belum Dibaca
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <div className='fw-bold'>
                  Urut Berdasarkan
                  <div className='form-check'>
                    <input
                      className='form-check-input me-2'
                      type='checkbox'
                      name='listNotif'
                      value=''
                      id='firstNotif'
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
                      type='checkbox'
                      name='listNotif'
                      value=''
                      id='firstNotif'
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
        </div>
        <div className=' col-sm-5'>
          <div className='card g-3 p-3' style={{ height: 400 }}>
            <div className='col-12'>
              <div className='d-flex justify-content-center'>
                <img
                  src='/assets/images/amplop.png'
                  style={{ width: 200, height: 200 }}
                />
              </div>
              <div className='d-flex justify-content-center'>
                <div className='text-secondary text-center'>
                  <h3>Belum ada notifikasi baru untuk Anda</h3>
                </div>
              </div>
              <div className='d-flex justify-content-center p-3'>
                <div className='position-absolute bottom-0 end-0 p-3'>
                  <Link to='#' className='btn btn-primary'>
                    Kembali ke Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notif
