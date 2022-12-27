import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Select from 'react-select'
import Loading from '../Loading';

const splitAirportName = (schedule) => {
  console.log(schedule)
  let airportsF = []
  let airportsL = []
  for (let i = 0; i < schedule.length; i++) {
    console.log(schedule[i].from, schedule[i].dest)
    const foundF = airportsF.some(item => item.value === schedule[i].from)
    const foundL = airportsL.some(item => item.value === schedule[i].dest)
    if (!foundF) airportsF.push({ value: schedule[i].from, label: schedule[i].from })
    if (!foundL) airportsL.push({ value: schedule[i].dest, label: schedule[i].dest })
  }
  return { airportsF, airportsL }
}

const getAllAirport = (callbackState, callbackLoading) => {
  fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/v1/tickets`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resData => {
    if (resData.status == 200) {
      resData.json().then(res => {
        let airports = splitAirportName(res.tickets)
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

const getSchedule = (params, callbackData, callbackLoading) => {
  callbackLoading(true)
  let url = `${process.env.REACT_APP_API_SERVER_URL}/api/v1/get-schedule?from=${params.fromAirport}&destination=${params.destAirport}&depart=${params.dateAir.current.value}`;
  console.log(url)
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
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

// filter jadwal penerbangan
function Jadwal() {
  const [isLoaading, setLoading] = useState(false)
  const [airports, setAirports] = useState({ airportsF: [], airportsL: [] })
  const [counter, setCounter] = useState(0)

  const typeTrip = "single"
  const [fromAirport, setFrom] = useState(null)
  const [destAirport, setDest] = useState(null)
  const dateAir = useRef(null)

  // Animasi kontrol & final result data
  const [dataLoading, setDataLoading] = useState(false)
  const [schedule, setSchedule] = useState(null)

  const handleSubmit = (evt) => {
    setDataLoading(true)
    evt.preventDefault()
    console.log(fromAirport,
      destAirport,
      dateAir.current.value);

    getSchedule({
      typeTrip, fromAirport,
      destAirport,
      dateAir,
    }, setSchedule, setDataLoading)
  }

  const handleReset = () => {
    setLoading(true)
    setCounter(0)
    setSchedule(null)
  }

  useEffect(() => {
    if (counter == 0) {
      getAllAirport(setAirports, setLoading)
      setCounter(counter + 1)
    }
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} >
      <div style={{ backgroundImage: 'url("/assets/images/image-25@2x.png")' }}>
        <div
          className='text-center bg-image p-3 mb-4'
          style={{ backgroundImage: 'url("/assets/images/header.png")' }}
        >
          <div>
            <div className='d-flex justify-content-center align-items-center h-100'>
              <div>
                <h2 className='text-light'>Jadwal Penerbangan</h2>
              </div>
            </div>
          </div>
        </div>
        <div className='row justify-content-center p-3 mb-1'>
          <div className='col-sm-8 p-3'>
            <div className='card p-3 shadow rounded'>
              <div className='card-body'>
                {isLoaading ? (<Loading></Loading>) : (<form onSubmit={handleSubmit}>
                  <div className='row d-flex align-content-center align-items-center justify-content-center'>
                    <div className='col-md-4 my-1'>
                      <label htmlFor='jadwalTerbang' className='label'>
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
                    </div>
                    <div className='col-md-4 my-1'>
                      <label htmlFor='jadwalTerbang' className='label'>
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
                    </div>
                    <div className='col-md-4 my-1'>
                      <label htmlFor='jadwalTerbang' className='label'>
                        Depart / Berangkat
                      </label>
                      <input
                        ref={dateAir}
                        className='form-control'
                        type='date'
                        name=''
                        id='depart'
                        placeholder='Tanggal Keberangkatan'
                        required
                      />
                    </div>
                    <div className="col-12 text-center">
                      <input
                        type='submit'
                        value={'Cari Jadwal'}
                        className='btn btn-primary ms-2 me-2 mt-3'
                      />
                      <input
                        onClick={handleReset}
                        type='submit'
                        value={'Hapus Input'}
                        className='btn btn-danger ms-2 me-2 mt-3'
                      />
                    </div>
                  </div>
                </form>)}
              </div>
            </div>
          </div>
        </div>

        <div className="container container-fluid">
          <div className='d-flex justify-content-center'>
            {dataLoading ? (
              <Loading></Loading>
            ) : (
              <div className="row w-100">
                <div className="col-12" style={{overflowX: "auto"}}>
                  <table className="table table-striped bg-white rounded shadow">
                    <thead className='table-primary'>
                      <tr>
                        <th scope='col'>Flight</th>
                        <th>Keberangkatan</th>
                        <th>Waktu Keberangkatan</th>
                        <th>Kedatangan</th>
                        <th>Waktu Kedatangan</th>
                        <th>Nomor Penerbangan</th>
                      </tr>
                    </thead>
                    {schedule === null ? ('') : (
                      
                      <tbody>
                        {console.log(schedule)}
                        {schedule.go.map((schedule, index) => {
                          return (
                            <tr key={index} className='text-center'>
                              <td>
                                <img width={"100px"} src={`${process.env.REACT_APP_API_SERVER_URL}${schedule.logo}`} alt="" />
                                <br/><b>{schedule.name}</b>
                              </td>
                              <td>{schedule.from}</td>
                              <td>{schedule.date_air}</td>
                              <td>{schedule.dest}</td>
                              <td>{schedule.estimated_up_dest}</td>
                              <td>{schedule.flight_number}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    )}

                  </table>
                </div>
                <div className="col-12">
                  {schedule === null ? (<h5 className='text-center mt-4'>Belum Ada Pencarian</h5>) : ( schedule.go.length === 0 ? (<h5 className='text-center mt-4'>Jadwal Tidak Ditemukan</h5>) : ('') )}
                </div>
              </div>)}
          </div>
        </div>
      </div>

    </LocalizationProvider >
  )
}

export default Jadwal