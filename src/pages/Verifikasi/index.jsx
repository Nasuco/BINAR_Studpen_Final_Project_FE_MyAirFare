import { Link } from 'react-router-dom'
// import './style.css'
import { useSelector } from 'react-redux';
import React from 'react'

function Verif() {
  const { getHistoryData } = useSelector(state => state.historyReducer)
  return (
    <div>
      <div></div>
      <div className='row justify-content-center p-3'>
        <div className=' col-sm-5'>
          <div className='card g-3 p-3 kotak'>
            <div className='col-12'>
              <div className='d-flex justify-content-center p-3'>
                <img src='/assets/images/logo.png' className='logo' />
              </div>
              <div className='d-flex justify-content-center'>
                <hr
                  className='hr hr-blurry'
                  style={{ width: 404, height: 2 }}
                ></hr>
              </div>
              <div className='d-flex justify-content-center p-3'>
                <img src='/assets/images/amplopVerif.png' className='amplop' />
              </div>
              <div className='d-flex justify-content-center mb-3'>
                <div
                  className='text-primary text-center'
                >
                  <h3 className=''>Verifikasi Email Kamu</h3>
                </div>
              </div>
              <div className='d-flex justify-content-center mb-3'>
                <div className='text-center' style={{ width: 518, height: 60 }}>
                  <p>
                    Email kamu berhasil di verifikasi, silahkan klik button di
                    bawah untuk melanjutkan ke menu utama
                  </p>
                </div>
              </div>
              <div className='d-flex justify-content-center'>
                <div className='text-center' style={{ width: 518, height: 60 }}>
                  <Link to={getHistoryData ? getHistoryData : '/'}>
                    <button className='btn btn-primary'>
                      Kembali ke Dashboard
                    </button>
                  </Link>
                </div>
              </div>
              <div className='d-flex justify-content-center mb-3'>
                <div className='text-center' style={{ width: 506, height: 60 }}>
                  <p>
                    Jika button di atas tidak berfungsi, anda juga bisa klik{' '}
                    <Link to={getHistoryData ? getHistoryData : '/'} className='text-primary'>
                      disini
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verif
