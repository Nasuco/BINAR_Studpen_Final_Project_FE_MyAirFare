import React from "react"

export default function Loading() {
    return (
        <div className="text-center mt-5 ">
            <div className="spinner-grow text-primary mt-3 mb-3 ms-3 me-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary mt-3 mb-3 ms-3 me-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-info mt-3 mb-3 ms-3 me-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-light mt-3 mb-3 ms-3 me-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-dark mt-3 mb-3 ms-3 me-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h3>
                Loading Content ...
            </h3>
        </div>
    )
}