import React from "react"
import {useNavigate, useLocation} from "react-router-dom"
import "../index.css"


export default function TripDetails() {
    const navigate = useNavigate()
    const location = useLocation()
    const formData = location.state || {}
    const {flyingFrom, flyingTo, dateFrom, dateTo, apiResponse } = location.state || {};
    const isTripDetailsPage = location.pathname === "/trip-details"


// State
    const [isFlightBooked, setIsFlightBooked] = React.useState(false)
    const [isHotelBooked, setIsHotelBooked] = React.useState(false)

// Change Function
    function handleBookFlight() {
        setIsFlightBooked(true)
    }
    
    function handleBookHotel() {
        setIsHotelBooked(true)
    }

// Submit Function
    function handleSubmit(event) {
        navigate(`/`)
    }
    
    
    return (
        <div className="container">
            <h1> Your Trip Details </h1>
            
            <div className="flex">
                <div className="result-container date">
                    <p> → {dateFrom} </p>
                </div>
                <div className="result-container date">
                    <p>{dateTo} ← </p>
                </div>
            </div>
            <div className="result-container location">
                <p> {flyingFrom} → {flyingTo} </p>
            </div>

            
            <h2 className="trip-details-info-margin"> Weather </h2>
            <div className="result-container container-margin">
                <p>{apiResponse.weather}</p>
            </div>
            
            <h2 className="trip-details-info-margin"> Flights </h2>
            <div className="result-container container-margin">
                <p> {apiResponse.flight}  </p>
                {isFlightBooked ? (<p className="booked">Flight Booked</p>) :(
                <button 
                    className={`click-btn ${isTripDetailsPage ? "trip-details-page" : ""}`} 
                    onClick={handleBookFlight}> 
                    Book 
                </button>)}
            </div>
            
            <h2 className="trip-details-info-margin"> Hotel </h2>
            <div className="result-container container-margin">
                <p> {apiResponse.hotel} </p>
                {isHotelBooked ? (<p className="booked"> Hotel Booked </p>) : ( 
                <button 
                    className={`click-btn ${isTripDetailsPage ? "trip-details-page" : ""}`}
                    onClick={handleBookHotel}> 
                    Book 
                </button>)}
            </div>
            
            <h2 className="trip-details-info-margin"> Activities </h2>
            <div className="result-container container-margin">
                <p> 1. {apiResponse.activity_1} </p>
                <p> 2. {apiResponse.activity_2} </p>
                <p> 3. {apiResponse.activity_3} </p>
            </div>
            
            <button type="submit" onClick={handleSubmit} className="click-btn trip-btn"> 
                Home 
            </button>
        </div>
    )
}

