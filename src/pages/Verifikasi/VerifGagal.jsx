import React from 'react'
import { Link } from 'react-router-dom'
// import '/style.css'
import { useSelector } from 'react-redux';

function VerifGagal() {
  const { getHistoryData } = useSelector(state => state.historyReducer)
  return (
    <div>
      <div className='row justify-content-center p-3'>
        <div className=' col-sm-5'>
          <div className='card g-3 p-3 kotak'>
            <div className='col-12'>
              <div className='d-flex justify-content-center p-3'>
                <img src='./assets/images/logo.png' className='logo' />
              </div>
              <div className='d-flex justify-content-center'>
                <hr
                  className='hr hr-blurry'
                  style={{ width: 404, height: 2 }}
                ></hr>
              </div>
              <div className='d-flex justify-content-center p-3'>
                <img src='./assets/images/warn.png' className='warn' />
              </div>
              <div className='d-flex justify-content-center mb-3'>
                <div
                  className='text-danger text-center'
                >
                  <h3 className=''>Terjadi Kesalahan</h3>
                </div>
              </div>
              <div className='d-flex justify-content-center mb-3'>
                <div className='text-center' style={{ width: 518, height: 60 }}>
                  <p>
                    Email kamu tidak berhasil di verifikasi, silahkan klik
                    button di bawah untuk mengulangi inputan data di menu
                    sebelumnya
                  </p>
                </div>
              </div>
              <div className='d-flex justify-content-center'>
                <div className='text-center' style={{ width: 518, height: 60 }}>
                  <Link to={getHistoryData ? getHistoryData : '/'} className='btn btn-danger'>
                    Kembali ke Halaman
                  </Link>
                </div>
              </div>
              <div className='d-flex justify-content-center mb-3'>
                <div
                  className='text-center text-secondary'
                  style={{ width: 434, height: 60 }}
                >
                  <p>
                    Ada kesalahan saat menginputkan data, silahkan coba lagi di
                    halaman sebelumnya
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

export default VerifGagal
