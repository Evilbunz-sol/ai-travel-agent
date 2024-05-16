import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom"
import StartView from "./Components/StartView"
import TravelInfo from "./Components/TravelInfo"
import TripDetails from "./Components/TripDetails"


function App() {
    return (
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<StartView />} />
              <Route path="/info" element={<TravelInfo />} />
              <Route path="/trip-details" element={<TripDetails />} />
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)