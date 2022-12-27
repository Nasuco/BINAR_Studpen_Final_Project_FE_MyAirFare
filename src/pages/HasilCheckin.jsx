import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const generatePdf = () => {
  html2canvas(document.querySelector('#doc-print'),
    { scale: 1 }
  ).then(canvas => {
    const pdf = new jsPDF('l', 'px', [986, 637]);
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 968, 673);
    pdf.save('checkin-myairfare.pdf');
  });
}

export default function HasilCheckin() {
  const [JSONTrx, setJSONTrx] = useState([])
  const [counter, setCOunter] = useState(0)
  const navigate = useNavigate()
  const { getUserData } = useSelector(state => state.userReducer)

  console.log(localStorage.getItem('tkt-detail'), getUserData);

  useEffect(() => {
    if(counter === 0){
      if (localStorage.getItem('tkt-detail') == null) {
        localStorage.removeItem('tkt-detail')
        navigate('/checkin')
      }else{
        setJSONTrx(JSON.parse(localStorage.getItem('tkt-detail')).trxs)
        localStorage.removeItem('tkt-detail')
      }
      setCOunter(counter+1)
    }
  })

  return (
    <div className="hasilcheckin">
      {/* Header */}
      <div className="text-center bg-image p-3 mb-4" style={{ backgroundImage: 'url("/assets/images/image-38@2x.png")' }} >
        <div className="d-flex  justify-content-center align-items-center  h-100" >
          <div>
            <h2
              className="text-light fw-bold">
              Tiket Anda
            </h2>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        className="col-md-12 d-flex justify-content-center align-items-center p-3">
        <div className="col-md-8 my-3">
          <img
            style={{ width: 200 }}
            src="/assets/images/logo.png"
            className="logo"
            alt="logo"
          />
        </div>
        <div
          className="d-flex justify-content-center align-items-center p-3">
          <div className="col-md-4 my-3">
            <h3>E-Ticket</h3>
          </div>
        </div>
      </div>

      {/* Body-Rectangle */}
      <div
        className="row d-flex justify-content-center align-content-center p-3">
        <div className="col-sm-10">
          <div id="doc-print" className="card g-3 p-3 mx-auto">

            {/* Looping map untuk view ticket */}
            {JSONTrx !== null ? (
              JSONTrx.map((trx, index) => {
                return (
                  <div key={index} className="col-12">
                    <div
                      className="row pt-4 justify-content-center align-content-center p-3">
                      <div className="col-md-3 my-3">
                        <img
                          style={{ width: 130 }}
                          src="/assets/images/logo.png"
                          className="logo"
                          alt="logo"
                        />
                      </div>
                      <div
                        className="col-md-2 
                                  my-3"
                      >
                        <div className="fw-bold">Nama Pemesan</div>
                        <div>{getUserData.username}</div>
                      </div>
                      <div
                        className="col-md-3 
                                  my-3"
                      >
                        <div className="fw-bold">Tanggal Pesan</div>
                        <div>{new Date(trx.createdAt).toLocaleString()}</div>
                      </div>
                      <div
                        className="col-md-2 
                                  my-3"
                      >
                        <div className="fw-bold">Nomor E-Ticket</div>
                        <div
                          className="fw-bold 
                                    text-primary"
                        >
                          {trx.carts[0].ticket.id}
                        </div>
                      </div>
                      <div
                        className="row
                                pt-3
                                mb-4"
                      >
                        <div
                          className="col-md-4 
                                  my-3"
                        >
                          <div
                            className="card g-3 p-3 mb-1 
                                    text-center 
                                    fw-bold 
                                    bg-secondary 
                                    bg-opacity-25 
                                    text-primary"
                          >
                            Nomor Penerbangan
                          </div>
                          <div
                            className="card g-3 p-3 
                                    bg-secondary 
                                    bg-opacity-10"
                          >
                            <div><b>{trx.carts[0].ticket.name}</b> ({trx.carts[0].ticket.flight_number})</div>
                            <div>Kelas : {trx.carts[0].ticket.ticketClass.name}</div>
                          </div>
                        </div>
                        <div className="col-md-4 my-3">
                          <div
                            className="card g-3 p-1 mb-1 
                                    text-center 
                                    fw-bold 
                                    bg-secondary 
                                    bg-opacity-25"
                          >
                            <div className=" text-primary">Keberangkatan</div>
                            <div>{new Date(trx.carts[0].ticket.date_air).toLocaleString()}</div>
                          </div>
                          <div
                            className="card g-3 p-3 
                                    bg-secondary 
                                    bg-opacity-10"
                          >
                            <div>
                              {trx.carts[0].ticket.from}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 my-3">
                          <div
                            className="card g-3 p-1 mb-1 
                                    text-center 
                                    fw-bold 
                                    bg-secondary 
                                    bg-opacity-25"
                          >
                            <div className=" text-primary">Kedatangan</div>
                            <div>{new Date(trx.carts[0].ticket.estimated_up_dest).toLocaleString()}</div>
                          </div>
                          <div
                            className="card g-3 p-3 
                                    bg-secondary 
                                    bg-opacity-10"
                          >
                            <div>{trx.carts[0].ticket.dest}</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="p-3 mb-2 
                            bg-primary 
                            text-white 
                            fw-bold 
                            text-center"
                      >
                        Detail Penumpang
                      </div>
                      <table
                        className="col-md-3 table 
                                  justify-content-center 
                                  align-content-center 
                                  mb-5"
                      >
                        <thead
                          className="table-primary 
                                    text-primary"
                        >
                          <tr>
                            <th scope="col">Order ID</th>
                            <th scope="col">Nama Penumpang</th>
                            <th scope="col">Kelas</th>
                            <th scope="col">No.Kursi</th>
                            <th scope="col">Status Transaksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="col">{trx.order_id}</th>
                            <th scope="col">{getUserData.username}</th>
                            <th scope="col">{trx.carts[0].ticket.ticketClass.name}</th>
                            <th scope="col">{trx.carts[0].chair_number}</th>
                            <th scope="col">{trx.status}</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="text-center">
                      MyAIRFARE INDONESIA, JALAN RAYA SIRIH NO. 21 JAKARTA
                    </div>
                  </div>
                )
              })
            ) : ('')}

          </div>
          <div
            className="col-md-12 d-flex 
                              justify-content-center 
                              align-items-center
                              p-3"
          >
            <div className="col-md-8 my-3">
              Anda dapat menyimpan / ccetak tiket anda dalam file PDF
            </div>
            <div
              className="row pt-10 d-flex
                                  justify-content-center
                                  align-items-center
                                  p-3"
            >

              <div className="col-lg-4 my-3">
                {/* <img src='/assets/img/image 36.svg'></img> */}
                <button
                  className="btn btn-primary
                                      btn-checkin" onClick={generatePdf}
                >
                  Simpan PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
