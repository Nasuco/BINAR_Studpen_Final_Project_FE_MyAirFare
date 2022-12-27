import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './PageCariTiketPP.css';
import Select from 'react-select'
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';

const splitAirportName = (ticket) => {
  let airportsF = []
  let airportsL = []
  for (let i = 0; i < ticket.length; i++) {
    const foundF = airportsF.some(item => item.value === ticket[i].from)
    const foundL = airportsL.some(item => item.value === ticket[i].dest)
    if (!foundF) airportsF.push({ value: ticket[i].from, label: ticket[i].from })
    if (!foundL) airportsL.push({ value: ticket[i].dest, label: ticket[i].dest })
  }
  return { airportsF, airportsL }
}

const getAllAirport = (callbackState, callbackLoading) => {
  fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/v1/tickets`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.status == 200) {
      response.json().then(res => {
        let airports = splitAirportName(res.tickets)
        console.log(airports, res);
        callbackState(airports)
        callbackLoading(false)
        // return splitAirportName(res)
      }).catch(() => {
        callbackState({ airportsF: [], airportsL: [] })
        callbackLoading(false)
        // return {airportsF:[],airportsL:[]}
      })
    } else {
      callbackState({ airportsF: [], airportsL: [] })
      callbackLoading(false)
      // return {airportsF:[],airportsL:[]}
    }
  }).catch(() => {
    callbackState({ airportsF: [], airportsL: [] })
    callbackLoading(false)
    // return {airportsF:[],airportsL:[]}
  })
}

const getTickets = (params, callbackData, callbackLoading) => {
  // console.log(params);
  callbackLoading(true)
  let url = `${process.env.REACT_APP_API_SERVER_URL}/api/v1/filter-ticket?from=${params.fromAirport}&destination=${params.destAirport}&depart=${params.dateAir.current.value}&kelas=${params.classTicket}&type_passenger[]=${params.passenger}${params.typeTrip === "rounded" ? '&return=' + params.dateReturn.current.value : ''}`
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.status == 200) {
      response.json().then(res => {
        callbackData(res.tickets)
        callbackLoading(false)
      })
    } else {
      callbackData(null)
      callbackLoading(false)
    }
  }).catch(() => {
    callbackData(null)
    callbackLoading(false)
  })
}

const PageCariTiketPP = () => {
  const [isLoaading, setLoading] = useState(true)
  const [airports, setAirports] = useState({ airportsF: [], airportsL: [] })
  const [counter, setCounter] = useState(0)

  // Data untuk filter
  const [typeTrip, setTypeTrip] = useState("single")
  const [fromAirport, setFrom] = useState(null)
  const [destAirport, setDest] = useState(null)
  const [classTicket, setClass] = useState(null)
  const [passenger, setPass] = useState(null)
  const dateAir = useRef(null)
  const dateReturn = useRef(null)

  // Animasi kontrol & final result data
  const [dataLoading, setDataLoading] = useState(false)
  const [tickets, setTickets] = useState(null)
  const navigate = useNavigate()

  let selectedTicketF = null
  let selectedTicketL = null
  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]

  const handleCLickTypeTrip = (evt) => {
    setTypeTrip(evt.target.value)
    // console.log(evt.target.value, typeTrip);
  }

  const handleClickTicket = (evt) => {
    document.querySelectorAll('.ticket-go').forEach(target => {
      target.classList.remove('ticket-active')
    })
    evt.target.parentElement.classList.add('ticket-active')
    selectedTicketF = evt.target.value
  }

  const handleClickTicket2 = (evt) => {
    document.querySelectorAll('.ticket-return').forEach(target => {
      target.classList.remove('ticket-active')
    })
    evt.target.parentElement.classList.add('ticket-active')
    selectedTicketL = evt.target.value
  }

  const handleSubmit = (evt) => {
    setDataLoading(true)
    evt.preventDefault()
    console.log(fromAirport,
      destAirport,
      classTicket,
      passenger,
      dateAir.current.value,
      typeTrip === "rounded" ? dateReturn.current.value : 'Kosong');

    // Tampilkan data di banner tengah putih
    getTickets({
      typeTrip, fromAirport,
      destAirport,
      classTicket,
      passenger,
      dateAir,
      dateReturn
    }, setTickets, setDataLoading)
  }

  const handleReset = () => {
    setLoading(true)
    setCounter(0)
    setTickets(null)
  }

  const handleNextButton = () => {
    let chairs = []
    let tickets = []
    if(selectedTicketF !== null) {
      chairs.push(document.getElementById(`chair_${selectedTicketF}`).value)
      tickets.push(selectedTicketF)
    }
    if(selectedTicketL !== null) {
      chairs.push(document.getElementById(`chair_${selectedTicketL}`).value)
      tickets.push(selectedTicketL)
    }
    localStorage.setItem('detail-d', JSON.stringify({tickets, chairs}))
    if(tickets.length > 0) navigate('/purchase-detail')
  }

  useEffect(() => {
    if (counter == 0) {
      getAllAirport(setAirports, setLoading)
      setCounter(counter + 1)
    }
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} >
      {/* navbar */}
      <section className="jumbotron">
        <div
          className='text-center bg-image p-3 pb-3'
          style={{ backgroundImage: 'url("/assets/images/image-38@2x.png")' }}
        >
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div>
              <h3 className='text-light fw-bold'>
                Pesan Tiket
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* boxfilter */}
      <section style={{ backgroundImage: 'url("/assets/images/image-25@2x.png")' }}>
        <div className="container pt-5  mx-auto">
          {isLoaading ? (<Loading></Loading>) : (<form onSubmit={handleSubmit} className='shadow p-3 mb-5 bg-body rounded p-3'>
            <h5>Cari Tiket Pesawat Murah Disini</h5>
            <div className="row p-2">
              <div className="col-md-5">
                <div className="form-check form-check-inline ">
                  <input className="form-check-input" type="radio" name="type_trip" id="trip_type_1" onChange={handleCLickTypeTrip} value={"rounded"} />
                  <label className="form-check-label" htmlFor="trip_type_1">
                    Pulang Pergi
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="type_trip" id="trip_type_2" onChange={handleCLickTypeTrip} value={"single"} />
                  <label className="form-check-label" htmlFor="trip_type_2">
                    Sekali Jalan
                  </label>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="Dari" className="form-label">
                      Dari
                    </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      // defaultValue={options[0]}
                      isDisabled={false}
                      isClearable={true}
                      isSearchable={true}
                      name="color"
                      options={airports.airportsF}
                      onChange={(choice) => {
                        setFrom(choice.value)
                        console.log(choice.value);
                      }}
                    />
                    {/* <input type="email" className="form-control" id="inputEmail4" placeholder="Bandara keberangkatan" /> */}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="Tujuan" className="form-label">
                      Tujuan
                    </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      // defaultValue={options[0]}
                      isDisabled={false}
                      isClearable={true}
                      isSearchable={true}
                      name="color"
                      options={airports.airportsL}
                      onChange={(choice) => {
                        setDest(choice.value)
                        console.log(choice.value);
                      }}
                    />
                    {/* <input type="Tujuan" className="form-control" id="inputEmail4" placeholder="Bandara tujuan" /> */}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="class-input" className="form-label">
                      kelas
                    </label>
                    <Select
                      id='class-input'
                      className="basic-single"
                      classNamePrefix="select"
                      // defaultValue={{ value: 'EKONOMI', label: 'EKONOMI' }}
                      isDisabled={false}
                      isClearable={true}
                      isSearchable={true}
                      name="color"
                      options={[
                        { value: 'ECONOMY', label: 'ECONOMY' },
                        { value: 'BUSSINESS', label: 'BUSSINESS' }
                      ]}
                      onChange={(choice) => {
                        setClass(choice.value)
                        console.log(choice.value);
                      }}
                    />
                    {/* <input list="form-control" className="form-control" id="inputEmail4" placeholder="kelas tempat duduk -" />
                    <datalist id="form-control">
                      <option value="Bisnis" />
                      <option value="Ekonomi" />
                    </datalist> */}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="pasenger-id" className="form-label">
                      Penumpang
                    </label>
                    <Select
                      id='pasenger-id'
                      className="basic-single"
                      classNamePrefix="select"
                      // defaultValue={{ value: 'DEWASA', label: 'DEWASA' }}
                      isDisabled={false}
                      isClearable={true}
                      isSearchable={true}
                      name="color"
                      options={[
                        { value: 'DEWASA', label: 'DEWASA' },
                        { value: 'ANAK-ANAK', label: 'ANAK-ANAK' }
                      ]}
                      onChange={(choice) => {
                        setPass(choice.value)
                        console.log(choice.value);
                      }}
                    />
                    {/* <input list="form-control" className="form-control" id="inputEmail4" placeholder="Orang" />
                    <datalist id="form-control">
                      <option value="Dewasa" />
                      <option value="Anak-Anak" />
                    </datalist> */}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputEmail4" className="form-label">
                      Pergi
                    </label>
                    <input type="date" className="form-control" id="inputEmail4" ref={dateAir} />
                  </div>
                  <div className="col-md-4">
                    {typeTrip === "rounded" ? (<div>
                      <label htmlFor="inputEmail4" className="form-label">
                        Kembali / Return
                      </label>
                      <input type="date" className="form-control" id="inputEmail4" ref={dateReturn} />
                    </div>) : ''}
                  </div>
                </div>
              </div>
              <div className="col-12 text-center">
                {dataLoading ? (
                  <button className="btn btn-primary mt-3 ms-2 me-2 disabled" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                  </button>
                ) : (
                  <button type='submit' className="btn btn-primary mt-3 ms-2 me-2" href="#">
                    Cari Penerbangan
                  </button>
                )}
                <a className="btn btn-danger mt-3 ms-2 me-2" onClick={handleReset} >
                  Hapus Input
                </a>
              </div>
            </div>
          </form>)}
        </div>
        {/*  boxfilter hasil cari*/}
        {dataLoading ? (
          <Loading></Loading>
        ) : (
          <>
            <section>
              <div className="container p-4">
                {tickets !== null ? (
                  <div className="row shadow mb-5 bg-body rounded">
                    {typeTrip === "single" ? (
                      <div className="col-12 offset-md-1">
                        <p className='mt-3'>
                          {fromAirport} &nbsp; <img className="vector" alt="" src="../assets/img/group2.svg" />
                          &nbsp; &nbsp;{destAirport}
                        </p>
                        <p>{dateAir.current.value} &nbsp;|&nbsp;{passenger}&nbsp;| &nbsp;{classTicket}</p>
                      </div>
                    ) : (
                      <div>
                        <div className="col-12 offset-md-1">
                          Go :
                          <p className='mt-3'>
                            {fromAirport} &nbsp; <img className="vector" alt="" src="../assets/img/group2.svg" />
                            &nbsp; &nbsp;{destAirport}
                          </p>
                          <p>{dateAir.current.value} &nbsp;|&nbsp;{passenger}&nbsp;| &nbsp;{classTicket}</p>
                        </div>
                        <div className="col-12 offset-md-1">
                          Return :
                          <p>
                            {destAirport} &nbsp; <img className="vector" alt="" src="../assets/img/group2.svg" />
                            &nbsp; &nbsp;{fromAirport}
                          </p>
                          <p>{dateAir.current.value} &nbsp;|&nbsp;{passenger}&nbsp;| &nbsp;{classTicket}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : ''}
              </div>
            </section>

            {/* hasil filter */}
            {tickets === null ? (<h4 className='text-center'>Belum Ada Data Pencarian</h4>) : (
              <section>
                <div className="tiket">
                  <div className="container p-4 fs-7 fw-normal">

                    {/* Untuk Go */}
                    {typeTrip === 'rounded' ? (<div className="alert alert-success mt-3 mb-3" role="alert">
                      Ticket Untuk Berangkat :
                    </div>) : ''}
                    {tickets.go.map((ticket, index) => {
                      return (
                        <label key={index} htmlFor={`go-${ticket.id}`} className="row ticket-go shadow p-3 mb-3 bg-body rounded">
                          <input type="radio" className='d-none' name="go" id={`go-${ticket.id}`} onChange={handleClickTicket} value={ticket.id} />
                          <div className="col-lg-3 d-flex">
                            <img width={"200px"} className="my-auto mx-auto" alt="" src={`${process.env.REACT_APP_API_SERVER_URL}${ticket.logo}`} />
                          </div>
                          <div className="col-lg-2 mt-3">
                            <img width={"30px"} alt="" src="/assets/images/airplane-icon.png" />
                            <p>
                              {ticket.from} &nbsp; <img alt="" src="../assets/img/group2.svg" />
                              &nbsp; &nbsp;{ticket.dest}
                            </p>
                          </div>
                          <div className="col-lg-3 mt-3">
                            <p>{ticket.passenger.passenger}</p>
                            <p>
                              <img className="vector2" alt="" src="../assets/img/departure-43.svg" />
                              &nbsp; &nbsp; {new Date(ticket.date_air).toLocaleString()}
                            </p>
                          </div>
                          <div className="col-lg-2 mt-3">
                            <label htmlFor={'chair_' + ticket.id}>Pilih Kursi : </label>
                            <select id={'chair_' + ticket.id} className="form-select" style={{ height: "unset" }}>
                              {ticket.available.map((chair, index) => {
                                return (
                                  <option key={index} value={chair.chair_number
                                  }>{chair.chair_number
                                    }</option>
                                )
                              })}
                            </select>
                          </div>
                          <div className="col-lg-2 mt-5 ">
                            <h6>Rp. {ticket.price}</h6>
                          </div>

                        </label>
                      )
                    })}

                    {typeTrip === 'rounded' ? (<div className="alert alert-warning mt-5 mb-3" role="alert">
                      Ticket Untuk Perjalanan Kembali :
                    </div>) : ''}
                    {tickets.return_flight ? (
                      tickets.return_flight.map((ticket, index) => {
                        return (
                          <label key={index} htmlFor={`return-${ticket.id}`} className="row ticket-return shadow p-3 mb-3 bg-body rounded">
                            <input type="radio" className='d-none' name="return" id={`return-${ticket.id}`} onChange={handleClickTicket2} value={ticket.id} />
                            <div className="col-lg-3 d-flex">
                              <img width={"200px"} className="my-auto mx-auto" alt="" src={`${process.env.REACT_APP_API_SERVER_URL}${ticket.logo}`} />
                            </div>
                            <div className="col-lg-2 mt-3">
                              <img width={"30px"} alt="" src="/assets/images/airplane-icon.png" />
                              <p>
                                {ticket.from} &nbsp; <img alt="" src="../assets/img/group2.svg" />
                                &nbsp; &nbsp;{ticket.dest}
                              </p>
                            </div>
                            <div className="col-lg-3 mt-3">
                              <p>{ticket.passenger.passenger}</p>
                              <p>
                                <img className="vector2" alt="" src="../assets/img/departure-43.svg" />
                                &nbsp; &nbsp; {new Date(ticket.date_air).toLocaleString()}
                              </p>
                            </div>
                            <div className="col-lg-2 mt-3">
                              <label htmlFor={'chair_' + ticket.id}>Pilih Kursi : </label>
                              <select id={'chair_' + ticket.id} className="form-select" style={{ height: "unset" }}>
                                {ticket.available.map((chair, index) => {
                                  return (
                                    <option key={index} value={chair.chair_number
                                    }>{chair.chair_number
                                      }</option>
                                  )
                                })}
                              </select>
                            </div>
                            <div className="col-lg-2 mt-5 ">
                              <h6>Rp. {ticket.price}</h6>
                            </div>

                          </label>
                        )
                      })

                    ) : ''}

                  </div>
                </div>
                <div className="container p-5">
                  <button className="btn btn-primary w-100" onClick={handleNextButton}> Lanjutkan </button>
                </div>
              </section>
            )}
          </>
        )}
      </section>


    </LocalizationProvider>
  );
};

export default PageCariTiketPP;
