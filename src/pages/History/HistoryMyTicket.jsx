// import { Button, Icon } from "@mui/material"
import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getHeapSnapshot } from "v8";
import Loading from "../Loading";
// import "../../css/History/HistoryMenungguPembayaran.css";
// import "./responsiveHistory.css";

let userToken = localStorage.getItem('x-access-token')

const ajaxGetAllTrx = async () => {
  let response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/v1/user-transactions`, {
    method: "GET",
    headers: {
      "x-access-token": userToken,
      'Content-Type': 'application/json'
    }
  })
  return response
}

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

const ajaxCreateTrx = async (ticketsId, chairsNumber) =>  {
  let response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/v1/user-transactions`, {
    method: "POST",
    headers: {
      "x-access-token": userToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tickets_id: ticketsId,
      chairs_number: chairsNumber
    })
  })
  return response
}

const splitTrxs = (trxs) => {
  let arrTrxsWait = []
  let arrTrxsFinish = []
  let arrTrxsExp = []

  for (let i = 0; i < trxs.length; i++) {
    if (trxs[i].status == 'pending-payment') {
      arrTrxsWait.push(trxs[i])
    } else if (trxs[i].status == 'finished') {
      arrTrxsFinish.push(trxs[i])
    } else if (trxs[i].status == 'expired') {
      arrTrxsExp.push(trxs[i])
    }
  }

  return [arrTrxsWait, arrTrxsFinish, arrTrxsExp]
}

const HistoryMyTicket = () => {

  const [counter, setCounter] = useState(0)
  const [datas, setDatas] = useState([[], [], []])
  const [isLoading, setLoaading] = useState(true)
  const [msg, setMsg] = useState(null)
  const [pyLoading, setPayLoading] = useState(false)
  const navigate = useNavigate()

  userToken = localStorage.getItem('x-access-token')

  const handleDetail = (trxId) => {
    localStorage.setItem('trx-id', trxId)
    navigate('/detail-transaction')
  }

  const handleBtnPay = (trxId) => {
    setPayLoading(true)
    ajaxGetTrx(trxId).then(response => {
      if (response.status == 200) {
        response.json().then(json => {
          console.log(json)
          if (json.transaction.status == 'pending-payment') {
            document.getElementById('mid-tkn').value = json.transaction.token_trx
            document.getElementById('pay-button').click()
            setPayLoading(false)
          }else if(json.transaction.status == 'finished'){
            window.location.reload()
          } else {
            setMsg("Transaksi yang anda pilih telah berstatus " + json.transaction.status)
            setTimeout(() => {
              setMsg(null)
            }, 5000)
            setPayLoading(false)
          }
        })
      } else {
        setMsg("Data gagal dimuat ke server, silahkan coba lagi")
        setTimeout(() => {
          setMsg(null)
        }, 5000)
        setPayLoading(false)
      }
    })
  }

  const handleDelete = (trxId) => {
    setLoaading(true)
    ajaxDeleteTrx(trxId).then(() => {
      setCounter(0)
    }).catch(() => {
      setCounter(0)
    })
  }

  useEffect(() => {
    let trxDelayed = localStorage.getItem('trx-d')
    if (trxDelayed !== null) {
      // Lakukan hit endpoint create trx
      trxDelayed = JSON.parse(trxDelayed)
      ajaxCreateTrx(trxDelayed.tickets_id, trxDelayed.chairs_number).then(res => {
        if(res.status == 200){
            setLoaading(true)
            setCounter(0)
        }else{
          setMsg("Transaksi gagal di proses. Silahkan coba lakukan transaksi ulang")
        }
    })
    localStorage.removeItem('trx-d');
    // console.log(JSON.stringify({
    //   tickets_id: trxDelayed.tickets_id,
    //   chairs_number: trxDelayed.chairs_number
    // }))
    }

    // {"tickets_id":["087ec46b-7993-4626-8e8f-e8146193c1f6","2eb3be01-ce08-4943-ac88-0f89a31441ed"], "chairs_number":[10,12]}

    if (counter === 0) {
      ajaxGetAllTrx().then(response => {
        if (response.status == 200) {
          response.json().then(json => {
            setDatas(splitTrxs(json.transaction))
            // console.log(datas);
            setCounter(counter + 1)
            setLoaading(false)
          })
          setLoaading(false)
        }
      }).catch(() => {
        setLoaading(false)
      })
    }
  })

  async function handleClickTab(idTarget) {
    // setLoaading(true)
    // setCounter(0)
    document.querySelectorAll('.tab-content').forEach((tab) => {
      tab.classList.add('d-none')
    })
    document.querySelectorAll(".tab-label").forEach((tab) => {
      try {
        tab.classList.remove('border-bottom')
        tab.classList.remove('border-primary')
      } catch {
        ''
      }
    })
    document.querySelector(`#content-${idTarget}`).classList.remove('d-none')
    document.querySelector(`#${idTarget}`).classList.add('border-bottom')
    document.querySelector(`#${idTarget}`).classList.add('border-primary')
  }
  return (
    isLoading ? (<Loading></Loading>) : (
      <div style={{ backgroundImage: "url('/assets/images/image-25@2x.png')" }}>
        {console.log(datas)}
        <div className="row text-center">
          <div className="col-12 mb-5 p-3" style={{ backgroundImage: "url('/assets/images/image-38@2x.png')" }}>
            <h3 className="text-light">
              My Ticket
            </h3>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row text-center bg-white rounded-5 p-2">
            <div className="col-12">
              <div className="row">
                <div className="col-4">
                  <button className="btn row" onClick={function () { handleClickTab('tab-wait-payment') }}>
                    <div className="col-12">
                      <img
                        className=""
                        alt=""
                        src="/assets/images/flatcoloriconsexpired.svg"
                      />
                    </div>
                    <div id="tab-wait-payment" className="col-12 tab-label border-bottom border-primary">
                      Menunggu Pembayaran
                    </div>
                  </button>
                </div>
                <div className="col-4">
                  <button className="btn row" onClick={function () { handleClickTab('tab-wait-depart') }}>
                    <div className="col-12">
                      <img
                        className=""
                        alt=""
                        src="/assets/images/group-45.svg"
                      />
                    </div>
                    <div id="tab-wait-depart" className="col-12 tab-label">
                      Penerbangan Akan Datang / Pembayaran Selesai
                    </div>
                  </button>
                </div>
                <div className="col-4">
                  <button className="btn row" onClick={function () { handleClickTab('tab-expired-depart') }}>
                    <div className="col-12">
                      <img
                        className=""
                        alt=""
                        src="/assets/images/vector.svg"
                      />
                    </div>
                    <div id="tab-expired-depart" className="col-12 tab-label">
                      Pembayaran Terlewat
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div id="content-tab-wait-payment" className="col-12 tab-content mt-5">
              <div className="row p-5">

                {/* <ReactMidtrans clienttKey={'SB-Mid-client-PNsh99KUzG2488ln'} token={'bdba023a-ad28-4f98-94d2-a7d1071f89ba'}>
                  <button> pay </button>
                </ReactMidtrans>
                ,document.getElementById('app') */}

                {msg !== null ? (<div className="alert alert-danger mt-3 mb-3" role="alert">
                  {msg}
                </div>) : ''}

                {datas[0].length == 0 ? (
                  <div>
                    <h4>Belum Ada Data Transaksi</h4>
                  </div>
                ) : (datas[0].map((data, index) => {
                  return (
                    <div key={index} className="col-12 shadow p-3 mb-5 bg-body rounded">
                      <div className="row">
                        <div className="col-12 text-start">
                          <img src="/assets/images/airplane-icon.png" alt="logo" />
                          <div>Order ID: {data.order_id} | {data.count == 2 ? 'Round Trip' : 'Single Trip'}</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-8">
                          {/* Row ticket */}
                          {data.carts.map((cart, index) => {
                            return (
                              <div key={index} className="row">
                                <div className="col-12 text-start">
                                  <div className="fw-bolder">{cart.ticket.from} <img className="" alt="" src="/assets/images/2-way-arrow.png" /> {cart.ticket.dest}</div>

                                  <img width={"30%"} src={process.env.REACT_APP_API_SERVER_URL + cart.ticket.logo} alt="" />
                                  <p className="fw-bolder">{cart.ticket.name}</p>

                                </div>
                                <div className="col-md-6 text-start">{cart.ticket.passenger.passenger}</div>
                                <div className="col-md-3 text-start">| <img alt="" src="/assets/img/plane-1.png" /> {new Date(cart.ticket.date_air).toLocaleString()}</div>
                                <div className="col-md-3 text-start mb-2">| <img alt="" src="/assets/img/plane-2.png" /> {new Date(cart.ticket.estimated_up_dest).toLocaleString()}</div>
                                <hr />
                              </div>
                            )
                          })}

                        </div>
                        <div className="col-lg-2 d-flex">
                          <div className="row">
                            <div className="col-12 mb-2 d-flex">
                              {pyLoading ? (<button className="btn btn-primary mt-auto" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                              </button>) : (<button
                                className="btn btn-primary mt-auto" onClick={() => {
                                  handleBtnPay(data.id)
                                }}
                              >
                                Pilih Metode Pembayaran
                              </button>)}

                            </div>
                            <div className="col-12 mt-2 d-flex">
                              <button
                                className="btn btn-danger mb-auto" onClick={() => {
                                  handleDelete(data.id)
                                }}
                              >
                                Batalkan Transaksi
                              </button>
                            </div>
                          </div>
                        </div>
                        <a className="col-lg-2 text-end text-primary fw-bolder text-decoration-none my-auto" onClick={() => { handleDetail(data.id) }}>
                          Lihat detail <img src="/assets/images/arrow-right-blue.png" alt="" />
                        </a>
                      </div>
                    </div>
                  )
                }))}

              </div>
            </div>

            <div id="content-tab-wait-depart" className="col-12 tab-content mt-5 d-none">
              <div className="row p-5">

                {datas[1].length == 0 ? (
                  <div className="text-center">
                    <h4>Belum Ada Transaksi Selesai</h4>
                  </div>
                ) : (
                  datas[1].map((data, index) => {
                    return (
                      <div key={index} className="col-12 shadow p-3 mb-5 bg-body rounded">
                        <div className="row">
                          <div className="col-12 text-start">
                            <img src="/assets/images/airplane-icon.png" alt="logo" />
                            <div>Order ID: {data.order_id} | {data.count == 2 ? 'Round Trip' : 'Single Trip'}</div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-8">
                            {/* Row ticket */}
                            {data.carts.map((cart, index) => {
                              return (
                                <div key={index} className="row">
                                  <div className="col-12 text-start">
                                    <div className="fw-bolder">{cart.ticket.from} <img className="" alt="" src="/assets/images/2-way-arrow.png" /> {cart.ticket.dest}</div>

                                    <img width={"30%"} src={process.env.REACT_APP_API_SERVER_URL + cart.ticket.logo} alt="" />
                                    <p className="fw-bolder">{cart.ticket.name}</p>

                                  </div>
                                  <div className="col-md-6 text-start">{cart.ticket.passenger.passenger}</div>
                                  <div className="col-md-3 text-start">| <img alt="" src="/assets/img/plane-1.png" /> {new Date(cart.ticket.date_air).toLocaleString()}</div>
                                  <div className="col-md-3 text-start mb-2">| <img alt="" src="/assets/img/plane-2.png" /> {new Date(cart.ticket.estimated_up_dest).toLocaleString()}</div>
                                  <hr />
                                </div>
                              )
                            })}

                          </div>
                          <div className="col-lg-2 d-flex">
                            <div className="row">
                              <div className="col-12 mb-2 d-flex">
                                <button
                                  className="btn btn-success mt-auto"
                                >
                                  Pembayaran Sukses
                                </button>
                              </div>
                              <div className="col-12 mt-2 d-flex">
                                {new Date() <= new Date(data.carts[data.carts.length - 1].ticket.date_air) ? (
                                  <button
                                    className="btn btn-warning mb-auto"
                                  >
                                    Akan Terbang
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-danger mb-auto"
                                  >
                                    Telah Terbang
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <a className="col-lg-2 text-end text-primary fw-bolder text-decoration-none my-auto" onClick={() => { handleDetail(data.id) }}>
                            Lihat detail <img src="/assets/images/arrow-right-blue.png" alt="" />
                          </a>
                        </div>
                      </div>
                    )
                  })
                )}

              </div>
            </div>

            <div id="content-tab-expired-depart" className="col-12 tab-content mt-5 d-none">
              <div className="row p-5">

                {datas[2].length == 0 ? (
                  <div className="text-center">
                    <h4>Belum Ada Transaksi Terlewat</h4>
                  </div>
                ) : (datas[2].map((data, index) => {
                  return (
                    <div key={index} className="col-12 shadow p-3 mb-5 bg-body rounded">
                      <div className="row">
                        <div className="col-12 text-start">
                          <img src="/assets/images/airplane-icon.png" alt="logo" />
                          <div>Order ID: {data.order_id} | {data.count == 2 ? 'Round Trip' : 'Single Trip'}</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-8">
                          {/* Row ticket */}
                          {data.carts.map((cart, index) => {
                            return (
                              <div key={index} className="row">
                                <div className="col-12 text-start">
                                  <div className="fw-bolder">{cart.ticket.from} <img className="" alt="" src="/assets/images/2-way-arrow.png" /> {cart.ticket.dest}</div>

                                  <img width={"30%"} src={process.env.REACT_APP_API_SERVER_URL + cart.ticket.logo} alt="" />
                                  <p className="fw-bolder">{cart.ticket.name}</p>

                                </div>
                                <div className="col-md-6 text-start">{cart.ticket.passenger.passenger}</div>
                                <div className="col-md-3 text-start">| <img alt="" src="/assets/img/plane-1.png" /> {new Date(cart.ticket.date_air).toLocaleString()}</div>
                                <div className="col-md-3 text-start mb-2">| <img alt="" src="/assets/img/plane-2.png" /> {new Date(cart.ticket.estimated_up_dest).toLocaleString()}</div>
                                <hr />
                              </div>
                            )
                          })}

                        </div>
                        <div className="col-lg-2 d-flex">
                          <div className="row">
                            <div className="col-12 mb-2 d-flex">
                              <button
                                className="btn btn-danger mt-auto"
                              >
                                Pembayaran Terlewat
                              </button>
                            </div>
                            <div className="col-12 mt-2 d-flex">
                              <button
                                className="btn btn-danger mb-auto" onClick={() => {
                                  handleDelete(data.id)
                                }}
                              >
                                Hapus Transaksi
                              </button>
                            </div>
                          </div>
                        </div>
                        <a className="col-lg-2 text-end text-primary fw-bolder text-decoration-none my-auto" onClick={() => { handleDetail(data.id) }}>
                          Lihat detail <img src="/assets/images/arrow-right-blue.png" alt="" />
                        </a>
                      </div>
                    </div>
                  )
                }))}

              </div>
            </div>

          </div>
        </div>
      </div>
    )

  );
};

export default HistoryMyTicket;
