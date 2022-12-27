import React from "react"

const Footer = () => {
  return (
    <div className='foot'>
      <div className='container mb-5'>
        <div className='row'>
          <div className='col-md-3'>
            <h2 className='fw-bold'>MyAIRFARE</h2>
          </div>
          <div className='col-md-3'>
            <p>Tentang BeLight</p>
            <p>Procurement Online</p>
            <p>Hubungan Investor</p>
            <p>Sales Office</p>
            <p>Group Reservasi</p>
            <p>Syarat & Ketentuan</p>
            <p>PPID MyAIRFARE</p>
            <p>Pasca Homologasi</p>
          </div>
          <div className='col-md-3'>
            <p>Mitra</p>
            <p>Corporate Privilege</p>
            <p>Customer Care Polic</p>
            <p>Karir</p>
            <p>CSR</p>
            <p>FAQ</p>
            <p>Peta Situs</p>
            <p>Hubungi Kami</p>
          </div>
          <div className='col-md-3 before-end'>
            <h5>Connect With Us</h5>
            <img
              src='/assets/img/image 19.svg'
              className='mt-5'
              style={{ maxWidth: '100%' }}
            ></img>
            <br />
            <img
              src='/assets/img/image 20.svg'
              className='mt-5'
              style={{ maxWidth: '100%' }}
            ></img>
          </div>
        </div>
      </div>

      <div className='bg-primary m-0 p-5'>
        <div className='row'>
          <div className='col-md-4'>
            <img
              src='/assets/img/Group 10.svg'
              style={{ width: '100%' }}
              className='group-10'
            ></img>
          </div>
          <div className='col-md-4 mt-3'>
            <img
              src='/assets/img/image 21.svg'
              style={{ width: '100%' }}
              className='group-11'
            ></img>
          </div>
          <div className='col-md-4 mt-3'>
            <img
              src='/assets/img/image 22.svg'
              style={{ width: '100%' }}
              className='group-11'
            ></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
