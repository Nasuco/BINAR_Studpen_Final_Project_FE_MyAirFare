import React from 'react'
import { useNavigationType, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from './Loading'

let chairs = []

// const ajaxGetTrx = async (trxId) => {
//   let response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/v1/transactions/${trxId}`, {
//     method: "GET",
//     headers: {
//       "x-access-token": userToken,
//       'Content-Type': 'application/json'
//     }
//   })
//   return response
// }

// const ajaxDeleteTrx = async (trxId) => {
//   let response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/v1/user-transactions/${trxId}`, {
//     method: "DELETE",
//     headers: {
//       "x-access-token": userToken,
//       'Content-Type': 'application/json'
//     }
//   })
//   console.log(await response.json());
//   return response
// }

const ajaxGetTicket = async (arrTicket) => {

  let tickets = []
  for (let i = 0; i < arrTicket.length; i++) {
    let response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/v1/${arrTicket[i]}/ticket`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let json = await response.json()
    if (response.status == 200) tickets.push(json.ticket)
  }
  return tickets
}

function DetailTransaksi() {
  const action = useNavigationType()
  const location = useLocation()
  const pathname = location.pathname
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [counter, setCounter] = useState(0)

  let dataDetail = localStorage.getItem('detail-d')
  let totalPrice = 0

  const handleNextPay = () => {
    let dataDetailJSON = JSON.parse(dataDetail)

    localStorage.setItem('trx-d', JSON.stringify({
      tickets_id: dataDetailJSON.tickets,
      chairs_number: chairs
    }))
    
    localStorage.removeItem('detail-d')
    window.location.replace('/my-ticket')
  }

  const handleToChart = () => {
    let dataDetailJSON = JSON.parse(dataDetail)

    localStorage.setItem('chart-d', JSON.stringify({
      tickets: dataDetailJSON.tickets
    }))
    
    localStorage.removeItem('detail-d')
    window.location.replace('/my-chart')
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
    if (counter == 0) {
      if (dataDetail == null || dataDetail == undefined) {
      navigate('/search-ticket')
    }

      let dataDetailJSON = JSON.parse(dataDetail)
      chairs = dataDetailJSON.chairs
      ajaxGetTicket(dataDetailJSON.tickets).then(res => {
        console.log(dataDetailJSON, res);
        if (res.length > 0) {
          console.log(res);
          setData(res)
        } else {
          navigate('/search-ticket')
        }
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
              {data.map((value, index) => {
                return (
                  <div key={index} className='col-md-12 mb-3'>
                    <div className='p-2 bg-primary text-light text-center fs-4 border-0 d-flex justify-content-center align-items-center'>
                      <div className='col-md-3 my-2'>
                        <img
                          className='p-2 d-flex justify-content-center'
                          src='/assets/images/Vector.svg' alt='icon-pesawat'
                        ></img>
                      </div>
                      <div className='col-md-8 my-2'>{value.from} - {value.dest}</div>
                    </div>
                    <div className='p-2 bg-secondary fs-5 border-0 justify-content-center align-items-center bg-opacity-50'>
                      <div className='p-3'>
                        Keberangkatan : <br />
                        {new Date(value.date_air).toLocaleString()}
                      </div>
                      <div className='p-3'>
                        Kedatangan : <br />
                        {new Date(value.estimated_up_dest).toLocaleString()}
                      </div>
                      <div className='p-3 fw-bold'>{value.flight_number}</div>
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
              <div className='text-primary fw-bold fs-4'>Pesanan Detail</div>

              <div className='col-12 mb-3'>
                <div className='fs-5 fw-bold mb-4'>
                  Tipe Perjalanan : {data.length === 2 ? 'Round Trip' : 'Single Trip'}
                </div>
                {data.map((value, index) => {
                  totalPrice += value.price
                  return (
                    <div key={index} className="row mb-3">
                      <div className="col-md-6">
                        <div className='fs-5 fw-bold'>Maskapai : {value.name}</div>
                        <img width={"100%"} src={process.env.REACT_APP_API_SERVER_URL + value.logo} alt="logo" />
                        <p>Flight Number : <b>{value.flight_number}</b></p>
                      </div>
                      <div className="col-md-6">
                        <label className='form-label'>Nomor Kursi : </label>
                        <input className='form-control' type="text" readOnly value={chairs[index]} />
                        <label className='form-label'>Kelas : </label>
                        <input className='form-control' type="text" readOnly value={value.ticketClass.name} />
                        <label className='form-label'>Penumpang : </label>
                        <input className='form-control' type="text" readOnly value={value.passenger.passenger} />
                      </div>
                      <hr className='mt-3' />
                    </div>
                  )
                })}
                {}
                <div>Total Harga : <b>Rp. {totalPrice},-</b></div>
              </div>

              <div className='d-flex fw-bold'>
                <button className="btn btn-warning w-100 mb-3" onClick={handleToChart}>Simpan ke Keranjang</button>
              </div>
              <div className='d-flex fw-bold'>
                <button className="btn btn-primary w-100 mb-3" onClick={handleNextPay}>Lanjutkan Transaksi</button>
              </div>
              <div className='d-flex fw-bold'>
                <Link className="btn btn-danger w-100 mb-3" to={'/search-ticket'}>Batalkan</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (<Loading></Loading>)
  )
}

export default DetailTransaksi
