import React from "react"
import {useNavigate} from "react-router-dom"
import { fetchReport } from "../Requests/api"

export default function TravelInfo() {
    const navigate = useNavigate()
    
// State
    const [error, setError] = React.useState("");
    const [formData, setFormData] = React.useState({
        numberOfTravellers: "",
        flyingFrom: "",
        flyingTo: "",
        dateFrom: "",
        dateTo: "",
        budget: "",
    })

// Change Function
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            if (name === "numberOfTravellers") {
                let intValue = parseInt(value, 10)
                intValue = intValue > 0 ? intValue : ""
                return {...prevFormData, [name]: intValue } 
            }
            return {...prevFormData, [name]: value }
        })
        setError("")
    }
  
//Submit Function 
    function handleSubmit(event) {
        event.preventDefault()
        
        for (let key in formData) {
            if (formData[key] === "") {
                setError("All fields are required!")
                return
            }
        }
        
        setError("")
        fetchReport(formData).then((response) => {
            navigate("/trip-details", {state: {...formData, apiResponse: response} })
        }).catch(error => {
            console.error("Failed to fetch report:", error);
            setError("Failed to process the data, please try again!");
        })
    }


    
    return (
        <div className="container">
            <h1> Plan Your Trip </h1>
            <form className="form" onSubmit={handleSubmit}>
                
                <label htmlFor="people" className="form-label"> Number of travellers </label>
                <input className="form-input"
                    type="number"
                    id="people"
                    onChange={handleChange}
                    name="numberOfTravellers"
                    value={formData.numberOfTravellers}
                />
                <br />
        
                
                <br />
                <label htmlFor="fly-from" className="form-label"> Flying From </label>
                <input className="form-input"
                    type="text"
                    id="fly-from"
                    onChange={handleChange}
                    name="flyingFrom"
                    value={formData.flyingFrom}
                />
                <br />
                <label htmlFor="fly-to" className="form-label"> Flying To </label>
                <input className="form-input"
                    type="text"
                    id="fly-to"
                    onChange={handleChange}
                    name="flyingTo"
                    value={formData.flyingTo}
                />
                <br />  
                 
                <label htmlFor="date-from" className="form-label"> From Date </label>
                <input className="form-input"
                    type="date"
                    id="date-from"
                    onChange={handleChange}
                    name="dateFrom"
                    value={formData.dateFrom}
                />
                <br />
                <label htmlFor="date-to" className="form-label"> To Date </label>
                <input className="form-input"
                    type="date"
                    id="date-to"
                    onChange={handleChange}
                    name="dateTo"
                    value={formData.dateTo}
                />
                <br />
                
                <label htmlFor="budget" className="form-label"> Budget </label>
                <input className="form-input"
                    type="text"
                    id="budget"
                    onChange={handleChange}
                    name="budget"
                    value={formData.budget}
                />
                <br />

                <button type="submit" className="click-btn trip-btn"> Plan my Trip! </button>
                {error && <p className="error-message"> {error} </p>}
                
            </form>
        </div>
    )
}
