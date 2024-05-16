import React from "react"
import {useNavigate} from "react-router-dom"
import mainIcon from "../Assets/travel-agent.png"

export default function StartView() {
    const navigate = useNavigate()
    
    // State

    
    function handleSubmit(event) {
        navigate(`/info`)
    }
    
    
    return (
        <div className="container">
            <img className="image" src={mainIcon} />
            <button type="submit" className="click-btn" onClick={handleSubmit}> Let's Begin </button>
        </div>
    )
}
