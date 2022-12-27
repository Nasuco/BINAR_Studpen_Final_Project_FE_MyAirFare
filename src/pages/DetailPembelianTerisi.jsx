import React from 'react'


function DetailPembelianTerisi() {


  return (
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
        <div className='col-md-3 p-3 pt-0'>
          <div className='p-2 bg-primary text-light text-center fs-4 border-0 d-flex justify-content-center align-items-center'>
            <div className='col-md-3 my-2'>
              <img
                className='p-2 d-flex justify-content-center'
                src='/assets/images/Vector.svg'
              ></img>
            </div>
            <div className='col-md-8 my-2'>JAKARTA - BALI</div>
          </div>
          <div className='p-2 bg-secondary fs-5 border-0 justify-content-center align-items-center bg-opacity-50'>
            <div className='p-3'>
              Keberangkatan : <br />
              19/20/2022
            </div>
            <div className='p-3'>
              Kedatangan : <br />
              19/20/2022
            </div>
            <div className='p-3 fw-bold'>GA 640/GA 7640</div>
          </div>
          {/* <div className='p-2 bg-danger text-light fw-bold text-center fs-6 border-0 justify-content-center align-items-center bg-opacity-75'>
            Reschedule not available
          </div> */}
        </div>
        <div className='col-md-7'>
          <div className='p-3 bg-secondary text-primary fw-bold text-center bg-opacity-25 fs-4 border border-secondary border-bottom-0'>
            Detail Pesanan
          </div>
          <div className='card g-3 p-5 mx-auto rounded-0 border border-secondary border-top-0'>
            <div className='text-primary fw-bold fs-4'>Booking Anda</div>
            <div className='shadow mb-5 bg-body rounded'>
              <img className='p-3' src='/assets/images/Group 146.svg' />
              Anda login sebagai nama user
            </div>
            <div className='text-primary fw-bold fs-4'>
              Info Detail Untuk Tiket
            </div>
            <form action='' className='col-12'>
              <div
                action=''
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
                    placeholder='Masukkan Nama Depan Anda'
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
                    placeholder='Masukkan Nama Belakang Anda'
                  />
                </div>
                <div className='col-md-6 my-3'>
                  <label htmlFor='nomorTelepon' className='form-label'>
                    Nomor Telepon
                  </label>
                  <input
                    type='text'
                    className='rounded-0 form-control'
                    id='nomorTelepon'
                    placeholder='Masukkan Nomor Telepon Anda'
                  />
                </div>
                <div className='col-md-6 my-3'>
                  <label htmlFor='email' className='form-label'>
                    Email
                  </label>
                  <input
                    type='email'
                    className='rounded-0 form-control'
                    id='email'
                    placeholder='Masukkan Email Anda'
                  />
                </div>
              </div>
            </form>
            <div className='text-primary fw-bold fs-4'>Pesanan Detail</div>
            <form action='' className='col-12 mb-3'>
              <div className='row pt-1 p-2 mb-5 align-content-center justify-content-center'>
                <div className='col-md-4 my-4'>
                  <label htmlFor='Title' className='form-label'>
                    Title
                  </label>
                  <select
                    name=''
                    id='Title'
                    className='rounded-0 form-select-sm form-select'
                  >
                    <option selected disabled>
                      -Title-
                    </option>
                    <option value='Mr'>Mr</option>
                    <option value='Mrs'>Mrs</option>
                  </select>
                </div>
                <div className='col-md-4 my-4'>
                  <label htmlFor='noKursi' className='form-label'>
                    No. Kursi
                  </label>
                  <select
                    name=''
                    id='noKursi'
                    className='rounded-0 form-select-sm form-select'
                  >
                    <option selected disabled>
                      -No. Kursi-
                    </option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                  </select>
                </div>
                <div className='col-md-4 my-4'>
                  <label htmlFor='tglLahir' className='form-label'>
                    Tanggal Lahir
                  </label>
                  <input
                    type='date'
                    className='rounded-0 form-control'
                    id='tglLahir'
                    placeholder='Masukkan Tanggal Lahir Anda'
                  />
                </div>
              </div>
            </form>
            <div className='d-flex fw-bold'>
              <input
                type='submit'
                label='Selanjutnya'
                value={'Selanjutnya'}
                className='col-4 p-2 mb-3 bg-primary text-white fw-bold rounded border-0 position-absolute bottom-10 end-0 translate-middle'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPembelianTerisi
