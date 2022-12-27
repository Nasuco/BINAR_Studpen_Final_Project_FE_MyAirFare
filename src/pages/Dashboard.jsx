import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="position-relative">
        <div className="d-flex justify-content">
          <img
            alt="banner"
            className="img-fluid"
            src="/assets/img/image 40.svg"
            style={{ width: "100%", zIndex: "-1" }}
          />
        </div>
      </div>
      <div
        className="position-relative"
        style={{ backgroundImage: "url('/assets/images/image-38@2x.png')" }}
      >
        {/* <img alt='spliter' className='img-fluid' src='/assets/images/image-38@2x.png' width={"100%"} /> */}
        <div className="text-center">
          <div className="">
            <div className="row pt-5 pb-5">
              <div className="col-md-6 text-md-end mb-2 mt-2">
                <Link className="active" to="/schedule">
                  <button className="btn btn-kiri text-light fw-bold">
                    LIHAT PENERBANGAN
                  </button>
                </Link>
              </div>
              <div className="col-md-6 text-md-start mb-2 mt-2">
                <Link className="active" to="/search-ticket">
                  <button className="btn btn-kanan text-light fw-bold">
                    PESAN TIKET
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="pt-3 pb-3 position-relative more"
        style={{ backgroundImage: "url('/assets/img/travel-safely 1.svg')" }}
      >
        {/* <img alt='banner-mid'
          className='img-fluid logo'
          src='/assets/img/travel-safely 1.svg' width={"100%"}
        ></img> */}
        <div className="text-center ">
          <img
            alt="icon"
            className="img-fluid pesawat"
            src="/assets/img/Group 10.svg"
          ></img>
          <h2 className="text-dark fw-bold text-more">
            kami mengerti anda
            <br /> karena kami peduli
          </h2>
          <button className="btn btn-transparent border-dark text-dark">
            Selengkapnya
          </button>
        </div>
      </div>
      <div className="container">
        <div className="row kartu mt-5 mx-auto">
          <div className="col-md-4 mt-2">
            <div className="card text-center text-light">
              <img src="/assets/img/image 1.svg" alt="img1"></img>
              <div className="card-body bg-choose">
                <p>Pilot, Cabin Crew</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="card text-center text-light">
              <img src="/assets/img/image 3.svg" alt="img3"></img>
              <div className="card-body b bg-choose">
                <p>Our Healthy Food</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="card text-center text-light">
              <img src="/assets/img/image 2.svg" alt="img2"></img>
              <div className="card-body b bg-choose">
                <p>Passenger Comfort</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container partner-maskapai">
        <div className="row mt-5 pt-5  d-flex ">
          <h4 className="text-center fw-bold partner">Partner Maskapai</h4>
          <div className="col-lg-6 col-md-12 mt-5">
            <h3 className="fw-bold">Airline Partner</h3>
            <p>Domestic & International Airline Partners</p>
            <p>
              Kami bermitra dengan berbagai maskapai penerbangan di seluruh
              dunia untuk membawa Anda ke mana pun Anda inginkan
            </p>
          </div>
          <div className="col-lg-6 col-md-12 mt-5 ">
            <div className="row p-3">
              <div className="col-3">
                <img src="/assets/img/image 5.svg" alt="img5"></img>
              </div>
              <div className="col-3">
                <img src="/assets/img/image 4.svg" alt="img4"></img>
              </div>
              <div className="col-3">
                <img src="/assets/img/image 6.svg" alt="img6"></img>
              </div>
              <div className="col-3">
                <img src="/assets/img/image 10.svg" alt="img10"></img>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-3">
                <img src="/assets/img/image 9.svg" alt="img9"></img>
              </div>
              <div className="col-3">
                <img src="/assets/img/image 12.svg" alt="img12"></img>
              </div>
              <div className="col-3">
                <img src="/assets/img/image 11.svg" alt="img11"></img>
              </div>
              <div className="col-3">
                <img src="/assets/img/image 8.svg" alt="img8"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="skyteam">
        <div className="container text-center mt-5 pt-5">
          <img src="/assets/img/image 14.svg" alt="img14"></img>
          <p className="mt-5">
            MyAIRFARE adalah maskapai penerbangan Indonesia <br></br>yang
            bergabung dengan SkyTeam
          </p>
          <button className="btn btn-transparent border-primary text-primary mt-5">
            selengkapnya
          </button>
        </div>
      </div>
      <div className="container text-center mt-5 tentang-kami">
        <h2 className="fw-bold " id="tentangkami">
          Tentang Kami
        </h2>
        <div className="row mt-5">
          <div className="col-lg-3 col-md-6 mt-3">
            <div className="card">
              <img
                src="/assets/img/image 15.jpg"
                className="card-img"
                alt="img15"
              ></img>
              <div className="card-img-overlay mb-5">
                <h5 className="card-text">Profil Perusahaan</h5>
                <button className="btn btn-light text-primary">
                  selengkapnya
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-3">
            <div className="card">
              <img
                src="/assets/img/image 16.jpg"
                className="card-img"
                alt="img16"
              ></img>
              <div className="card-img-overlay mb-5">
                <h5 className="card-text">Unit Bisnis Strategis</h5>
                <button className="btn btn-light text-primary">
                  selengkapnya
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-3">
            <div className="card">
              <img
                src="/assets/img/image 17.jpg"
                className="card-img"
                alt="img17"
              ></img>
              <div className="card-img-overlay mb-5">
                <h5 className="card-text">Hubungan Investor</h5>
                <button className="btn btn-light text-primary">
                  selengkapnya
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-3">
            <div className="card">
              <img
                src="/assets/img/image 18.jpg"
                className="card-img"
                alt="img18"
              ></img>
              <div className="card-img-overlay mb-5">
                <h5 className="card-text">CSR</h5>
                <button className="btn btn-light text-primary">
                  selengkapnya
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
