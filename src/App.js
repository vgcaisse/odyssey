import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";

function App() {
  const [startDate, setStartDate] = useState("");
  const [daysOutOfHome, setDaysOutOfHome] = useState("");
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [error, setError] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  const handleCalculate = () => {
    if (!isFormCompleted) {
      return;
    }

    if (isNaN(daysOutOfHome)) {
      setError("Are you coming back home today?!");
      setDaysRemaining(0);
      return;
    }

    if (daysOutOfHome < 0) {
      setError("Time travelling not allowed!");
      setDaysRemaining(0);
      return;
    }

    const start = moment(startDate, "YYYY-MM-DD");
    const current = moment();
    const elapsedDays = current.diff(start, "days");
    const remainingDays = Math.max(0, daysOutOfHome - elapsedDays);

    if (remainingDays < 1) {
      setError("Are you coming back home today?!");
      setDaysRemaining(0);
      return;
    }

    setError("");
    setDaysRemaining(remainingDays);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;

    switch (id) {
      case "start-date":
        setStartDate(value);
        setIsDateSelected(true);
        break;
      case "days-out":
        if (isDateSelected) {
          const intValue = parseInt(value);
          setDaysOutOfHome(intValue >= 0 ? intValue : 0);
        }
        break;
      default:
        break;
    }

    setIsFormCompleted(isDateSelected && id === "days-out" && value !== "");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleCalculate();
    }, 1000 * 60 * 60 * 24); // Run the calculation once every 24 hours

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    handleCalculate();
  }, [startDate, daysOutOfHome]);

  return (
    <div className="App">
      <div className="container">
        <h1>Place Tracker</h1>
        <div className="form-group">
          <label htmlFor="start-date">Start Date:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="days-out">Days out of Home:</label>
          <input
            type="number"
            id="days-out"
            value={daysOutOfHome}
            onChange={handleChange}
            disabled={!isDateSelected}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div>
          <p>Days Remaining: {isNaN(daysRemaining) ? null : daysRemaining}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
