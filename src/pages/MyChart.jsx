import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

let userToken = localStorage.getItem('x-access-token')

const ajaxGetCart = async () => {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/v1/wait-list`
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "x-access-token": userToken,
            'Content-Type': 'application/json'
        }
    })
    return response
}

const ajaxSetCart = async (dataJSON) => {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/v1/wait-list`
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "x-access-token": userToken,
            'Content-Type': 'application/json'
        },
        body: dataJSON
    })
    return response
}
// Catatan logic sistem :
// 1. Ketika masuk my-chart, check apakah transaksi atau cart di localstorage
// 2. Jika ada lakukan terlebih dahulu cart / trasaksi yang tertunda
// 3. Jika tidak, dapatkan data cart
// 4. Proses diatas lakukan pada setiap page dibuka, bukan dengan useEffect

// let datas = []
// let counter = 0
export default function MyChart() {

    const [isLoading, setLoading] = useState(true)
    const [datas, setDatas] = useState([])
    const [counter, setCounter] = useState(0)
    const [msg, setMsg] = useState(null)
    const navigate = useNavigate()

    userToken = localStorage.getItem('x-access-token')


    const handleDelete = async (trxId) => {
        setLoading(true)
        let response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/v1/wait-list/${trxId}`, {
            method: "DELETE",
            headers: {
                "x-access-token": userToken,
                'Content-Type': 'application/json'
            }
        })

        if(response.status != 200){
            let json = await response.json()
            setMsg(json.errors)
        }
        setTimeout(() => {
            setMsg(null)
        }, 10000)
        setCounter(0)
    }
    
    const handleCheckout = async (trxId, arrChartId) => {
        setLoading(true)
        let chairNUmbers = []
        for (let i = 0; i < arrChartId.length; i++) {
            chairNUmbers.push(document.getElementById(`chair-${arrChartId[i]}`).value)
        }
        let response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/v1/user-transactions`, {
            method: "POST",
            headers: {
                "x-access-token": userToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wait_list_id: trxId,
                chairs_number: arrChartId
            })
        })
        if(response.status != 200){
            let json = await response.json()
            setMsg(json.errors)
            setTimeout(() => {
                setMsg(null)
            }, 10000)
            setLoading(false)
        }else{
            navigate('/my-ticket')
        }
        // console.log(chairNUmbers);
    }

    useEffect(() => {

        let chartDelayed = localStorage.getItem('chart-d')

        if (chartDelayed != null) {
            // Lakukan create cart ke endpoint
            let data = JSON.parse(chartDelayed)
            ajaxSetCart(JSON.stringify({
                tickets_id: data.tickets
            })).then(res => {
                if(res.status == 200){
                    setCounter(0)
                }
            })
            localStorage.removeItem('chart-d');
            // console.log(JSON.stringify({
            //     tickets_id: data.tickets
            // }));
        }

        // Get all data chart dari user

        // {"tickets":["087ec46b-7993-4626-8e8f-e8146193c1f6","2eb3be01-ce08-4943-ac88-0f89a31441ed"]}

        // console.log(datas)
        if(counter === 0){
            ajaxGetCart().then(res => {
                // setParamShow(false)
                if (res.status == 200) {
                    res.json().then(cartsData => {
                        console.log(cartsData);
                        setCounter(counter+1)
                        console.log('data di set Baru cart', counter,'hghj');
                        setDatas(cartsData.wait_list)
                        setLoading(false)
                    })
                }
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            })
        }


    })

    return (
        isLoading ? (
            <Loading></Loading>
        ) : (
            <div>
                {msg !== null ? (<div className="alert alert-danger mt-3 mb-3" role="alert">
                  `{msg}`
                </div>) : ''}
                {/* judul */}
                <div className="row text-center">
                    <div className="col-12 mb-5 p-3" style={{ backgroundImage: "url('/assets/images/image-38@2x.png')" }}>
                        <h3 className="text-light">
                            My Chart
                        </h3>
                    </div>
                </div>
                {/* isi */}
                <div className="container mt-5">

                    {datas.length === 0 ? (
                        <div className="text-center">
                            <img className="mb-5" width="70px" src="/assets/images/cart.png" alt="cart-icon" />
                            <h5>Belum Ada Tiket Di Keranjang Anda</h5>
                        </div>
                    ) : (
                        <div>
                            {datas.map((trx, index) => {
                                let tottalPrice = 0
                                let arrCartId = []
                                return (<div className="shadow p-3 mb-5 bg-body rounded" key={index}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><span className="text-black-50">Tanggal : {new Date(trx.createdAt).toLocaleString()} | {trx.trip_type}</span></p>
                                        </div>
                                        <div className="col-md-6 text-end">
                                            <button className="btn btn-danger px-5 mb-3" onClick={() => {handleDelete(trx.id)}}>Hapus</button> <br></br>
                                            {/* <a className="text-primary text-decoration-none mt-3">Lihat Detail -&gt;</a> */}
                                        </div>
                                    </div>

                                    {trx.carts.map((cart, index) => {
                                        tottalPrice += cart.ticket.price
                                        arrCartId.push(cart.id)
                                        // console.log(cart.ticket, "ini");
                                        return (<div className="card-body card-satu" key={index}>
                                            <div className="hasilFilter d-flex mt-4 mb-3">
                                                <div className="card shadow-sm" style={{ width: '1030px' }}>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-12 col-lg-3 px-5 pt-3">
                                                                <p className="fw-bolder">{cart.ticket.name}</p>
                                                                <img width={"100%"} src={process.env.REACT_APP_API_SERVER_URL + cart.ticket.logo} alt="" />

                                                                <p className="fw-bolder"> {cart.ticket.from} <img src="/assets/images/2-way-arrow.png" alt="double-arrow" srcSet="" /> {cart.ticket.dest}</p>
                                                            </div>
                                                            <div className="col-12 col-lg-3">
                                                                <h6 className="text-black-50">{cart.ticket.passenger.passenger}</h6><br />
                                                                <p>Berangkat  : {new Date(cart.ticket.date_air).toLocaleString()} <br />
                                                                    Sampai : {new Date(cart.ticket.estimated_up_dest).toLocaleString()}
                                                                </p>
                                                            </div>
                                                            <div className="col-12 col-lg-3 text-center">
                                                                <h4 className="text-danger fw-bolder pt-5 ">Rp. {cart.ticket.price}</h4>
                                                            </div>
                                                            <div className="col-12 col-lg-3 text-center ">
                                                                <label htmlFor={"chair-" + cart.id}>Pilih Nomor Kursi :</label>
                                                                <select name="chair" className="form-select" style={{ height: "unset" }} id={"chair-" + cart.id}>
                                                                    {cart.ticket.available.map((value, index) => {
                                                                        return (
                                                                            <option key={index} value={value.chair_number}>{value.chair_number}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)


                                    })}

                                    <h4 className="fw-bolder text-end px-5">Total : <span className="text-danger">Rp. {tottalPrice}</span></h4>
                                    <div className="tombol text-end px-5 pt-3">
                                        <button className="btn btn-primary mb-3" onClick={() => {handleCheckout(trx.id, arrCartId)}}>Checkout</button>
                                    </div>
                                </div>)
                            })}
                        </div>
                    )}

                </div>

            </div>
        )
    );
}