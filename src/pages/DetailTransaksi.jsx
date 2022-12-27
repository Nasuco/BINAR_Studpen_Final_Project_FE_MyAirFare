import React from 'react'
import { useNavigationType, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from './Loading'

let userToken = localStorage.getItem('x-access-token')

const ajaxGetTrx = async (trxId) => {
  let response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/v1/transactions/${trxId}`, {
    method: "GET",
    headers: {
      "x-access-token": userToken,
      'Content-Type': 'application/json'
    }
  })
  return response
}

const ajaxDeleteTrx = async (trxId) => {
  let response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/v1/user-transactions/${trxId}`, {
    method: "DELETE",
    headers: {
      "x-access-token": userToken,
      'Content-Type': 'application/json'
    }
  })
  console.log(await response.json());
  return response
}

function DetailTransaksi() {
  const action = useNavigationType()
  const location = useLocation()
  const pathname = location.pathname
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [counter, setCounter] = useState(0)

  userToken = localStorage.getItem('x-access-token')

  let trxId = localStorage.getItem('trx-id')

  const handleDelete = () => {
    ajaxDeleteTrx(trxId).then(() => {
      navigate('/my-ticket')
    }).catch(() => {
      navigate('/my-ticket')
    })
  }

  useEffect(() => {
    if (action !== 'POP') {
      window.scrollTo(0, 0)
    }
  }, [action])

  useEffect(() => {
    let title = ''
    let metaDescription = ''

    //TODO: Upate meta titles and description below
    switch (pathname) {
      case '/':
        title = ''
        metaDescription = ''
        break
    }

    if (title) {
      document.title = title
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      )
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription
      }
    }
  }, [pathname])

  useEffect(() => {
    if (trxId == null || trxId == undefined) {
      navigate('/my-ticket')
    }
    if(counter == 0){
      ajaxGetTrx(trxId).then(res => {
        if (res.status == 200) {
          res.json().then(json => {
            console.log(json);
            setData(json.transaction)
          })
        }else{
          navigate('/my-ticket')
        }
      }).catch(() => {
        navigate('/my-ticket')
      })
      setCounter(counter + 1)
    }
  })

  return (
    data !== null ? (
      <div>
        <div
          className='text-center bg-image p-3 mb-3'
          style={{ backgroundImage: 'url("/assets/images/image-38@2x.png")' }}
        >
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div>
              <h3 className='text-light fw-bold'>
                Detail Pemesanan Tiket pesawat
              </h3>
            </div>
          </div>
        </div>
        <div className='row d-flex justify-content-center align-content-center p-3'>
          <div className="col-md-3 p-3 pt-0">
            <div className="row">
              {data.carts.map((value, index) => {
                return (
                  <div key={index} className='col-md-12 mb-3'>
                    <div className='p-2 bg-primary text-light text-center fs-4 border-0 d-flex justify-content-center align-items-center'>
                      <div className='col-md-3 my-2'>
                        <img
                          className='p-2 d-flex justify-content-center'
                          src='/assets/images/Vector.svg' alt='icon-pesawat'
                        ></img>
                      </div>
                      <div className='col-md-8 my-2'>{value.ticket.from} - {value.ticket.dest}</div>
                    </div>
                    <div className='p-2 bg-secondary fs-5 border-0 justify-content-center align-items-center bg-opacity-50'>
                      <div className='p-3'>
                        Keberangkatan : <br />
                        {new Date(value.ticket.date_air).toLocaleString()}
                      </div>
                      <div className='p-3'>
                        Kedatangan : <br />
                        {new Date(value.ticket.estimated_up_dest).toLocaleString()}
                      </div>
                      <div className='p-3 fw-bold'>{value.ticket.flight_number}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className='col-md-7'>
            <div className='p-3 bg-secondary text-primary fw-bold text-center bg-opacity-25 fs-4 border border-secondary border-bottom-0'>
              Detail Pesanan
            </div>
            <div className='card g-3 p-5 mx-auto rounded-0 border border-secondary border-top-0'>
              <div className='text-primary fw-bold fs-4'>Booking Anda</div>
              <div className='shadow mb-5 bg-body rounded'>
                <img className='p-3' src='/assets/images/Group 146.svg' />
                Anda login sebagai {data.user.username}
              </div>
              <div className='text-primary fw-bold fs-4'>
                Info Detail Untuk Tiket
              </div>
              <form className='col-12'>
                <div
                  className='row pt-1 p-2 mb-5 align-content-center justify-content-center'
                >
                  <div className='col-md-6 my-3'>
                    <label htmlFor='namaDepan' className='form-label'>
                      Nama Depan
                    </label>
                    <input
                      type='text'
                      className='rounded-0 form-control'
                      id='namaDepan'
                      placeholder='Masukkan Nama Depan Anda' value={data.user.f_name} readOnly
                    />
                  </div>
                  <div className='col-md-6 my-3'>
                    <label htmlFor='namaBelakang' className='form-label'>
                      Nama Belakang
                    </label>
                    <input
                      type='text'
                      className='rounded-0 form-control'
                      id='namaBelakang'
                      placeholder='Masukkan Nama Belakang Anda' value={data.user.l_name} readOnly
                    />
                  </div>
                  <div className='col-md-12 my-3'>
                    <label htmlFor='email' className='form-label'>
                      Email
                    </label>
                    <input
                      type='email'
                      className='rounded-0 form-control'
                      id='email'
                      placeholder='Masukkan Email Anda' value={data.user.email} readOnly
                    />
                  </div>
                </div>
              </form>
              <div className='text-primary fw-bold fs-4'>Pesanan Detail</div>

              <div className='col-12 mb-3'>
                <div className='fs-5 fw-bold mb-4'>
                  Tipe Perjalanan : {data.count == 2 ? 'Round Trip' : 'Single Trip'}
                </div>
                {data.carts.map((value, index) => {
                  return (
                    <div key={index} className="row mb-3">
                      <div className="col-md-4">
                        <div className='fs-5 fw-bold'>Maskapai : {value.ticket.name}</div>
                        <img width={"100%"} src={process.env.REACT_APP_API_SERVER_URL + value.ticket.logo} alt="logo" />
                        <p>Flight Number : <b>{value.ticket.flight_number}</b></p>
                      </div>
                      <div className="col-md-4">
                        <label className='form-label'>Nomor Kursi : </label>
                        <input className='form-control' type="text" readOnly value={value.chair_number}/>
                        <label className='form-label'>Kelas : </label>
                        <input className='form-control' type="text" readOnly value={value.ticket.ticketClass.name}/>
                        <label className='form-label'>Penumpang : </label>
                        <input className='form-control' type="text" readOnly value={value.ticket.passenger.passenger}/>
                      </div>
                      <div className="col-md-4">
                        <button className={"btn "+ (value.status == 'pending-payment' ? 'btn-warning' : (value.status == 'expired' ? 'btn-danger' : 'btn-success')) }>{value.status}</button>
                      </div>
                      <hr className='mt-3' />
                    </div>
                  )
                })}
              </div>

              <div className='d-flex fw-bold'>
                <Link className='btn btn-primary w-100' to={'/my-ticket'}>Kembali</Link>
              </div>
              <div className='d-flex fw-bold'>
                {data.status == 'pending-payment' || data.status == 'expired' ? (
                  <button className='btn btn-danger mt-3 w-100' onClick={handleDelete}>Batalkan Transaksi</button>
                ) : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (<Loading></Loading>)
  )
}

export default DetailTransaksi
