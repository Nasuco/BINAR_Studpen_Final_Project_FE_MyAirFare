import React from 'react'
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

// Update Profile

function Pribadi() {
  const [profileOpn, setOpenProfile] = useState(true)
  let iconProfile = document.getElementById('popup-profile')
  const { getUserData } = useSelector(state => state.userReducer)
  const formData = new FormData();

  const username = useRef(null)
  const nama_depan = useRef(null)
  const nama_belakang = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const konfirmPass = useRef(null)
  const photo = useRef(null)
  const title = useRef(null)
  const visanumber = useRef(null)
  const [errMsg, setErrMsg] = useState(null)
  const [loading, setLoading] = useState(false)



  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      username: username.current.value,
      nama_depan: nama_depan.current.value,
      nama_belakang: nama_belakang.current.value,
      email: email.current.value,
      password: password.current.value,
      konfirmPass: konfirmPass.current.value,
      photo: photo.current.value,
      title: title.current.value,
      visanumber: visanumber.current.value
    }
    console.log(data)

    formData.append('username', username.current.value);
    formData.append('f_name', nama_depan.current.value);
    formData.append('l_name', nama_belakang.current.value);
    formData.append('email', email.current.value);
    formData.append('password', password.current.value);
    formData.append('re_type_pass', konfirmPass.current.value);
    formData.append('image', document.getElementById('photo').files[0]);
    formData.append('title', title.current.value);
    formData.append('visa_number', visanumber.current.value);

    try {
      const url = `${process.env.REACT_APP_API_SERVER_URL}`
      fetch(`${url}/api/v1/update-profile`, {
        method: 'PUT',
        body: formData,
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'x-access-token': localStorage.getItem('x-access-token')
        }
      }).then((response) => {
        response.json().then((result) => {
          if (response.status == 200) {
            window.location.reload()
            setLoading(false)
          }
          else {
            setErrMsg(result.errors)
            setLoading(false)
          }
        })
      }).catch((error) => {
        console.log(error)
        setLoading(false)
      })

    } catch (error) {
      setErrMsg(error)
      setLoading(false)
    }

    //   try {
    //     const url = `${process.env.REACT_APP_API_SERVER_URL}`
    //     const response = await fetch(`${url}/api/v1/update-profile`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //         'x-access-token': localStorage.getItem('x-access-token')
    //       },
    //       body: JSON.stringify({
    //         username: data.username,
    //         f_name: data.nama_depan,
    //         l_name: data.nama_belakang,
    //         email: data.email,
    //         password: data.password,
    //         re_type_pass: data.konfirmPass,
    //         photo: data.photo,
    //         title: data.title,
    //         visa_number: data.visanumber
    //       })
    //     })
    //     const json = await response.json()
    //     console.log(json)
    // } catch (error) {
    //   setErrMsg(error)
    //   setLoading(false)
    // }
  }

  function handleClickProfile() {
    iconProfile = document.getElementById('popup-profile')
    try {
      if (profileOpn) {
        iconProfile.classList.remove('d-none')
      } else {
        iconProfile.classList.add('d-none')
      }
      setOpenProfile(!profileOpn)
    } catch (error) {
      console.log(error);
    }
  }

  const destroyToken = (token) => {
    if (token !== '') {
      localStorage.removeItem('x-access-token');
    }
  }

  function handleLogout() {
    let token = localStorage.getItem('x-access-token');
    destroyToken(token)
    window.location.replace('/')
  }

  return (
    <div className='pt-5 row justify-content-center jarak p-3' style={{ backgroundImage: 'url("/assets/images/image-25@2x.png")' }}>
      <div className='col-md-2 pt-5'>
        <div className='card shadow'>
          <div className='card-body p-3'>
            <div id='icon-profile' className='mb-2'>
              <a className='nav-link rounded-circle' href='#' onClick={handleClickProfile}>
                <img width={"40px"} src={process.env.REACT_APP_API_SERVER_URL + getUserData.photo} alt='' />
              </a>
            </div>
            <div className='col-md-10 mb-3'>
              <h5>{getUserData.username}</h5>
            </div>
            <div className='col-md-8 mb-3'>
              <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-6 pt-5'>
        <div className='card shadow'>
          <div className='card-header'>
            <ul className='nav nav-tabs card-header-tabs'>
              <li className='nav-item'>
                <Link
                  to='/settingData'
                  className='nav-link active text-primary'
                  aria-current='true'
                >
                  Data Pribadi
                </Link>
              </li>
            </ul>
          </div>
          {errMsg != null ? (<div className="alert alert-danger mt-3 mb-3" role="alert">
            `{errMsg}`
          </div>) : ''}
          <form className='row g-3 p-3' onSubmit={onSubmit}>
            <div className='col-12'>
              <label htmlFor='inputNamaPengguna' className='form-label'>
                Username
              </label>
              <input
                ref={username}
                type='text'
                className='form-control'
                id='inputNama'
                placeholder={getUserData.username}
                required
              />
            </div>
            <div className='col-md-6'>
              <label htmlFor='inputNama' className='form-label'>
                Nama Depan
              </label>
              <input
                ref={nama_depan}
                type='text'
                className='form-control'
                id='inputNama'
                placeholder={getUserData.f_name}
                required
              />
            </div>
            <div className='col-md-6'>
              <label htmlFor='inputNama' className='form-label'>
                Nama Belakang
              </label>
              <input
                ref={nama_belakang}
                type='text'
                className='form-control'
                id='inputNama'
                placeholder={getUserData.l_name}
                required
              />
            </div>
            <div className='col-12'>
              <label htmlFor='inputEmail' className='form-label'>
                Email
              </label>
              <input
                ref={email}
                type='email'
                className='form-control'
                id='email'
                placeholder={getUserData.email}
                required
              />
            </div>
            <div className='col-md-6'>
              <label htmlFor='newPassword'>Password Baru</label>
              <input
                ref={password}
                type='password'
                className='form-control'
                id='newPassword'
                placeholder='Masukkan Password Baru'
              />
            </div>
            <div className='col-md-6'>
              <label htmlFor='konfirmPass'>Konfirmasi Password</label>
              <input
                ref={konfirmPass}
                type='password'
                className='form-control'
                id='konfirmPass'
                placeholder='Konfirmasi Password'
              />
            </div>
            <div className='col-md-12'>
              <label htmlFor='photo'>Foto</label>
              <input
                ref={photo}
                type='file'
                className='form-control'
                id='photo'
                placeholder={getUserData.photo}
              />
            </div>
            <div className='col-md-6'>
              <label htmlFor='title'>Title</label>
              <select
                ref={title}
                name=''
                id='title'
                className='form-select-sm form-select'
                required
                defaultValue={getUserData.title}
              >
                <option value='Mr'>Mr</option>
                <option value='Mrs'>Mrs</option>
              </select>
            </div>
            <div className='col-md-6'>
              <label htmlFor='visanumber'>Nomor Visa</label>
              <input
                ref={visanumber}
                type='text'
                className='form-control'
                id='visanumber'
                placeholder={getUserData.visa_ID}
                required
              />
            </div>
            <div className='col-12 d-flex justify-content-center align-content-center p-3'>
                {loading ? (
                  <button className="btn btn-primary disabled mb-2 ms-2 me-2" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                  </button>) : (<input
                    type='submit'
                    value={'Simpan'}
                    className='btn btn-primary mb-2 ms-2 me-2'
                  />)}
                <a href='/' type='delete' className='btn btn-danger mb-2 ms-2 me-2'>
                  Batal
                </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Pribadi