import React, { useState } from "react"
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

const DateSlider = ({onDateChange,onFilterChange}) => {
    const[dataRange, setDateRange] = useState({
        startDate: undefined,
        endDate: undefined,
        key: "selection"
    })

    const handleSelect = (ranges) => {
        setDateRange(ranges.selection)
        onDateChange(ranges.selection.startDate,ranges.selection.endDate)
        onFilterChange(ranges.selection.startDate,ranges.selection.endDate)
    }

    const handleClearFilter = () => {
        setDateRange({
            startDate: undefined,
            endDate: undefined,
            key: "selection"
        })
        onDateChange(null,null)
        onFilterChange(null,null)

    }
    return(
        <>
        <h5>Filter by Date:</h5>
        <DateRangePicker ranges={[dataRange]} onChange={handleSelect} className="mb-4" />
        <button className="btn btn-outline-secondary" onClick={handleClearFilter}>
            Clear Filter
        </button>

        </>
    )
}

export default DateSlider;