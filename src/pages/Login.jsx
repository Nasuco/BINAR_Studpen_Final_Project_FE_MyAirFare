// ======================== Catatan =========================================

// Sistem navigate redirect back ini mmasih basic, diperlukan tahap selanjutnya menggunakan redux untuk mendaoatkan history page yang sebelumnya dibuka

// ==========================================================================
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import '../css/login.css'
// const dotenv = require('dotenv').config();
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useSelector } from 'react-redux';

async function ajaxLogin(email, password) {
  const data = {
    email, password
  }
  const url = `${process.env.REACT_APP_API_SERVER_URL}`
  // console.log(process.env.REACT_APP_API_SERVER, process.env.REACT_APP_ENDPOINT_BASE_URL, url);
  const response = await fetch(`${url}/api/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  })

  return response
}

export default function Login() {
  const navigate = useNavigate()
  const email = useRef(null)
  const password = useRef(null)

  const [isLoading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)
  const { getHistoryData } = useSelector(state => state.historyReducer)

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let response = await ajaxLogin(email.current.value, password.current.value)
      let JSONRes = await response.json()
      if (response.status === 200) {
        localStorage.setItem('x-access-token', JSONRes.token);
        setLoading(false)
        console.log(JSONRes.user.access_level);
        if (JSONRes.user.active == true) {
          console.log(getHistoryData);
          if(getHistoryData)  navigate(getHistoryData)
          else  navigate('/')
        }
      } else {
        setLoading(false)
        setAlert(JSONRes.errors)
      }
    } catch (error) {
      setLoading(false)
      setAlert(error)
    }

  }

  useEffect(() => {
    console.log(getHistoryData);
  })

  const loginGoogle = async (response) => {
    // const userData = jwt(response.credential)
    setLoading(true)
    console.log((response));
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/v1/loginRegGoogle`
    const res = await fetch(
      url,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          credential: response.credential
        })
      }
    )

    res.json().then(json => {
      if (res.status === 200) {
        console.log(json);
        localStorage.setItem('x-access-token', json.token);
        setLoading(false)
        if (json.user.active === true) {
          if(getHistoryData) navigate(getHistoryData)
          else  navigate('/')
        }
        else if(json.user.active === false) navigate('/please-verify')
      } else {
        setLoading(false)
        setAlert(json.errors)
      }
    }).catch(err => {
      setLoading(false)
      setAlert(err)
    })
  }

  const handleGoogleFailure = (response) => {
    console.log(response);
    setLoading(false)
    setAlert(response)
  }

  return (
    localStorage.getItem('x-access-token') === null ? (
      <div>
      <div
        className='bg-image p-3 mb-4'
        style={{ backgroundImage: 'url("/assets/images/image-25@2x.png")' }}
      >
        <div className='d-flex justify-content-center p-3'>
          <img
            style={{ width: 200 }}
            src='/assets/images/logo.png'
            className='logo'
          />
        </div>
        <div className='row justify-content-center p-3'>
          <div className='col-sm-5'>
            <div className='card g-3 p-3'>
              <div className='col-12'>
                <div
                  className='text-primary text-center'
                  style={{ fontSize: 30 }}
                >
                  Login Member
                </div>
                {alert != null ? (<div className="alert alert-danger mt-3 mb-3" role="alert">
                  `{alert}`
                </div>) : ''}
                <form action='' className='row g-3 p-3' onSubmit={onSubmit}>
                  <div className='col-12'>
                    <label htmlFor='Email' className='form-label'>
                      Email
                    </label>
                    <input
                      ref={email}
                      type='email'
                      placeholder='Masukkan Email'
                      id='Email'
                      className='form-control'
                      required
                    />
                  </div>
                  <div className='col-12 mb-5'>
                    <label htmlFor='Password' className='form-label'>
                      Password
                    </label>
                    <input
                      ref={password}
                      type='password'
                      placeholder='Masukkan Password'
                      id='Password'
                      className='form-control'
                      required
                    />
                  </div>
                  <div className='col-12 justify-content-center text-center'>
                    <div className='fw-bold'>
                      {isLoading ? (<button className="btn btn-primary mb-3 disabled" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                      </button>) : (<div className='text-center'><input
                        type='submit'
                        value={'Login'}
                        className='btn-login p-2 mb-3 bg-primary text-white fw-bold border-0'
                      />
                        <GoogleOAuthProvider className="text-center" clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                          <GoogleLogin theme='filled_black' logo_alignment='center' shape='pill' onSuccess={(credentialRes) => { loginGoogle(credentialRes) }} onError={() => { handleGoogleFailure('Error google login') }}></GoogleLogin>
                        </GoogleOAuthProvider>
                      </div>
                      )}
                    </div>
                    <div className='signup-link text-center text-decoration-none'>
                      Belum memiliki akun :
                      <Link to='/register' style={{ textDecoration: 'none' }}>
                        Register
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    ) : (
      <Navigate to={'/'}></Navigate>
    )
  )
}
