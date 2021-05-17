import React from 'react';
import './index.css';

class Chart extends React.Component {
    constructor(props) {
        super()
        this.props = props
    }

    render() {

    return(
  <>
    <form className="dob" action="#">
      <p className="instruction">Enter your Date of Birth</p>
      <label htmlFor="month" className="visuallyhidden">Month</label>
      <select name="month" className="month" id="month" required>
        <option value="0">January</option>
        <option value="1">February</option>
        <option value="2">March</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5">June</option>
        <option value="6">July</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="11">December</option>
      </select>
      <label htmlFor="day" className="visuallyhidden">Day</label>
      <input type="text" className="day" id="day" placeholder="31" pattern="\d{0,2}" required></input>
      <label htmlFor="year" className="visuallyhidden">Year</label>
      <input type="text" className="year" id="year" placeholder="1999" pattern="\d{4}" required></input>
    </form>
    <div className="chart">
      <ol className="chart weeks group">
        <div className="x-axis">
        <label className="weeks--x-label">Week of the Year</label>
          <div className="markers weeks--x-markers">
            <span>1</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
            <span>25</span>
            <span>30</span>
            <span>35</span>
            <span>40</span>
            <span>45</span>
            <span>50</span>
          </div>
        </div>
        <div className="y-axis">
        <label className="weeks--y-label">Age</label>
          <div className="markers weeks--y-markers">
            <span>0</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
            <span>25</span>
            <span>30</span>
            <span>35</span>
            <span>40</span>
            <span>45</span>
            <span>50</span>
            <span>55</span>
            <span>60</span>
            <span>65</span>
            <span>70</span>
            <span>75</span>
            <span>80</span>
            <span>85</span>
            <span>90</span>
          </div>
        </div>
      </ol>
    </div>
  </>
  )
}
}

export default Chart;
