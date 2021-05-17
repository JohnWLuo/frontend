import React from 'react';
import './index.css';

class Overlay extends React.Component {
    constructor(props) {
        super()
        this.props = props
    }
    render() {

    return(
    <>
  <div id="overlay">
      <div id = "overlayBody"></div>
      <div id="Overlaytext">
          <div>
              <p id="yearLabel"></p>
          </div>
          <div>
              <p id="weekLabel"></p>
          </div>
          <hr></hr>
          <form>
              <div>
                  <label>Journal</label>
                  <br></br>
                  <textarea id="journal" rows="30" cols="35"></textarea>
              </div>
              <div>
                  <label>To Do List</label>
                  <br></br>
                  <input type="text" id="myInput" placeholder="Title..."></input>
                  <button type="button" id="addBtn">Add</button>
                  <ul id="myUL"></ul>
              </div>
          </form>
      </div>
      <div id="overlayInput">
      </div>
  </div>
    </>
  )
}
}

export default Overlay;
