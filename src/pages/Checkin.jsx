import React from "react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Html5QrcodePlugin from "../components/HTML5QRCodePlugin";

export default function Checkin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState(null);
  const ticketid = useRef(null);
  const orderid = useRef(null);

  const onClick = async (e) => {
    e.preventDefault();
    setLoading(true)

    console.log(ticketid.current.value);
    console.log(orderid.current.value);

    const data = {
      ticketid: ticketid.current.value,
      orderid: orderid.current.value,
    };

    const aksestoken = localStorage.getItem("x-access-token");

    const isiorder = {
      ticket_id: data.ticketid,
      order_id: data.orderid,
    };
    try {
      const url = `${process.env.REACT_APP_API_SERVER_URL}`;
      const response = await fetch(`${url}/api/v1/checkin-manual`, {
        method: "POST",
        headers: {
          "x-access-token": aksestoken,
          "Content-type": "application/json",
        },
        body: JSON.stringify(isiorder),
      });

      const json = await response.json();
      console.log(json.errors);
      console.log(isiorder);
      // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiODczYjJkNzUtOGM5NS00NDQ5LWI2Y2YtMDA5M2RmMzYzZWRkIiwiaWF0IjoxNjcwMjU5NTg4fQ.gxPNw68L1Nf5kdX9I1Fc535qDNbtLRezq3JmECVjr9A"
      // { token: string, user: any }
      if (response.status === 200) {
        localStorage.setItem("tkt-detail", JSON.stringify(json));
        navigate("/checkin-result");
        setLoading(false)
      } else if (response.status == 400) {
        setErrMsg(["Nomor E-Ticket yang anda inputkan tidak valid"]);
        setLoading(false)
      } else {
        setErrMsg(json.errors);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setErrMsg(error);
      setLoading(false)
    }
  };

  const qrCheckinHandler = async (decodedText, decodedResult) => {
    try {
      console.log(decodedResult);
      const aksestoken = localStorage.getItem("x-access-token");
      const url = `${process.env.REACT_APP_API_SERVER_URL}`;
      const response = await fetch(`${url}/api/v1/checkin-auto`, {
        method: "POST",
        headers: {
          "x-access-token": aksestoken,
          "Content-type": "application/json",
        },
        body: JSON.stringify({flight_number: decodedText}),
      });

      const json = await response.json();
      console.log(json.errors);
      // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiODczYjJkNzUtOGM5NS00NDQ5LWI2Y2YtMDA5M2RmMzYzZWRkIiwiaWF0IjoxNjcwMjU5NTg4fQ.gxPNw68L1Nf5kdX9I1Fc535qDNbtLRezq3JmECVjr9A"
      // { token: string, user: any }
      if (response.status === 200) {
        localStorage.setItem("tkt-detail", JSON.stringify(json));
        navigate("/checkin-result");
        setLoading(false)
      } else if (response.status == 400) {
        setErrMsg(["Nomor E-Ticket yang anda inputkan tidak valid"]);
        window.scrollTo(0, 0)
        setLoading(false)
      } else {
        setErrMsg(json.errors);
        window.scrollTo(0, 0)
        setLoading(false)
      }
      document.getElementById('html5-qrcode-button-camera-stop').click()
    } catch (error) {
      console.log(error);
      setErrMsg(error);
      setLoading(false)
    }
  }

  return (
    <div>
      <div
        className="text-center
                      bg-image
                      p-3 mb-4"
        style={{ backgroundImage: 'url("/assets/images/image-38@2x.png")' }}
      >
        <div
          className="d-flex 
                        justify-content-center
                        align-items-center h-100"
        >
          <div>
            <h2 className="text-light fw-bold">IDENTIFIKASI</h2>
            <div className="text-light">
              Mulai check-in dengan tanggal keberangkatan dan referensi
              pemesanan atau nomor e-tiket Anda
            </div>
          </div>
        </div>
      </div>
      {errMsg != null ? (
        <div className="alert alert-danger mt-3 mb-3" role="alert">
          {errMsg}
        </div>
      ) : (
        ""
      )}

      <div className="row pt-3 d-flex justify-content-center align-content-center p-3">
        <div className="col-sm-8">
          <div className="card bg-danger bg-opacity-10  p-3 mx-auto">
            <div className="col-12  p-3">
              <div
                className="text-center text-primary fw-bold"
                style={{ fontSize: 30 }}
              >
                Detail Anda
              </div>
              <div className="row justify-content-center align-content-center">
                <div action="" className="col-md-5  p-3">

                  <div className="mb-3">
                    <label
                      htmlFor="nomorTicket"
                      className="form-label text-primary"
                    >
                      Nomor E-Ticket
                    </label>
                    <input
                      ref={ticketid}
                      type="text"
                      className="form-control"
                      id="nomorTicket"
                      placeholder="Masukkan Nomor E-Ticket"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="nomorRef"
                      className="form-label text-primary"
                    >
                      Nomor Order
                    </label>
                    <input
                      ref={orderid}
                      type="text"
                      className="form-control"
                      id="nomorRef"
                      placeholder="Masukkan Nomor Order"
                    />
                  </div>
                  <div className="text-center">
                    {loading ? (<button className="btn btn-primary mb-3 disabled" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Loading...
                    </button>) : (<Link className="fw-bold">
                      <button
                        onClick={onClick}
                        className="btn p-2 mb-3 btn-primary text-white fw-bold border-0"
                      >
                        Periksa Tiket
                      </button>
                    </Link>)}
                  </div>
                </div>
                <div className="col-md-2 d-flex text-center">
                  <h5 className="my-auto mx-auto text-center">ATAU</h5>
                </div>
                <div className="col-md-5 pt-5 text-center">
                  <h5 className="text-primary fw-bold text-center">SCAN QR</h5>
                  <div className="p-3">
                    {/* <img
                      className="mb-10"
                      src="/assets/img/Group 11.svg"
                      alt="group11"
                    /> */}
                    <Html5QrcodePlugin
                      fps={10}
                      qrbox={250}
                      disableFlip={false}
                      qrCodeSuccessCallback={qrCheckinHandler} />
                  </div>
                  <h5 className="text-secondary fw-bold text-center p-3">
                    Scan QR menggunakan HP anda
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
