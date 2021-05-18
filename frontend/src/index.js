import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import Chart from './Chart';
import Overlay from './Overlay';
import Delete from './Delete';

import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <header className="App-header">
        <Login />
        <Chart />
        <Overlay />
        <Delete />
      </header>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);


(function() {

  var yearEl = document.getElementById('year'),
      monthEl = document.getElementById('month'),
      dayEl = document.getElementById('day'),
      items = document.querySelectorAll('.chart li'),
      body = document.getElementById('overlayBody'),
      addBtn = document.getElementById('addBtn'),
      logIn = document.getElementById('logIn'),
      register = document.getElementById('register'),
      todayDate = new Date(),
      today = new Date(todayDate.getFullYear(),todayDate.getMonth(), todayDate.getDate()),
      fname = document.getElementById("fname").value,
      lname = document.getElementById("lname").value,
      birthday,
      deleteAll = document.getElementById("delete"),

      current = -1,

      itemCount,
      COLOR = 'red',
      KEY = {
          UP: 38,
          DOWN: 40
      };
      // console.log(lname)
  // Set listeners
  yearEl.addEventListener('input', _handleDateChange);
  yearEl.addEventListener('keydown', _handleUpdown);
  yearEl.addEventListener('blur', _unhideValidationStyles);
  monthEl.addEventListener('change', _handleDateChange);
  dayEl.addEventListener('input', _handleDateChange);
  dayEl.addEventListener('blur', _unhideValidationStyles);
  body.addEventListener('mousedown', off);
  addBtn.addEventListener('mousedown', newElement);
  deleteAll.addEventListener('mousedown', deleteAllFun);
  logIn.addEventListener('mousedown', login);
  register.addEventListener('mousedown', registerFun);

  // Ensure the month is unselected by default.
  monthEl.selectedIndex = -1;
  populateCalendar()
  logInSuccess()

  function registerFun() {
    fname = document.getElementById("fname").value
    lname = document.getElementById("lname").value
    const data = {
      fname: fname,
      lname: lname,
    }
    let options ={
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
    fetch('https://week-calendar-back.herokuapp.com/login', options).then(function (response)
  {
    if(response.status === 400)
    {alert("First name and Last name combination already taken");}
    else {
      console.log(response.json())
      logInSuccess()
    }
  })
  }

  function login() {
    fname = document.getElementById("fname").value
    lname = document.getElementById("lname").value

    let options ={
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
    },
  }

  fetch('https://week-calendar-back.herokuapp.com/login/?' + new URLSearchParams({fname: fname, lname: lname}), options).then(function (response)
  {
    if(response.status === 404)
    {
      alert("First name and Last name combination does not exist");
      return 404
  }
    else {
      return response.json()
    }
  }).then(function (data)
  {
    if (data !== 404)
    {
      // console.log(data)
      birthday = data.birthday
      logInSuccess()
    }
  }
  )
}

  function deleteAllFun() {
    const data = {
      fname: fname,
      lname: lname,
    }
    let options ={
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
    fetch('https://week-calendar-back.herokuapp.com/delete/', options);

  }


function logInSuccess() {
  if (fname !== "")
  {
    document.getElementsByClassName("welcome")[0].innerHTML = "Welcome " + fname + " " + lname;
    document.getElementById("fname").setAttribute('value', fname);
    document.getElementById("lname").setAttribute('value', lname);

    if (birthday !== "")
    {
      var temp = new Date(birthday);
      yearEl.setAttribute('value', temp.getFullYear());
      monthEl.selectedIndex = temp.getMonth();
      dayEl.setAttribute('value', temp.getDate());
      _handleDateChange()
    }
  }
}

function _dateChangePut(){
  const data = {
    _id: fname+lname,
    fname: fname,
    lname: lname,
    birthday: _getDateOfBirth().toString()
  }
  let options ={
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}

  fetch('https://week-calendar-back.herokuapp.com/dateUpdate/', options);
}

  function _handleDateChange(e) {
      if (_dateIsValid()) {
          itemCount = calculateElapsedTime();
          if (itemCount !== 0)
          {
              _repaintItems(0);
          }
          _repaintItems(itemCount);
          _dateChangePut()
      } else {
          _repaintItems(0);
      }
  }

  function _handleUpdown(e) {
      var newNum;
      // A crossbrowser keycode option.
      var thisKey = e.keyCode || e.which;
      if (e.target.checkValidity()) {
          if (thisKey === KEY.UP) {
              newNum = parseInt(e.target.value, 10);
              e.target.value = newNum += 1;
              // we call the date change function manually because the input event isn't
              // triggered by arrow keys, or by manually setting the value, as we've done.
              _handleDateChange();
          } else if (thisKey === KEY.DOWN) {
              newNum = parseInt(e.target.value, 10);
              e.target.value = newNum -= 1;
              _handleDateChange();
          }
      }
  }

  function _unhideValidationStyles(e) {
      e.target.classList.add('touched');
  }

  function calculateElapsedTime() {
      var currentDate = new Date(),
          dateOfBirth = _getDateOfBirth(),
          diff = currentDate.getTime() - dateOfBirth.getTime(),
          elapsedTime;

      elapsedTime = (Math.floor(diff / (1000 * 60 * 60 * 24 * 7)));
      return elapsedTime;
  }

  function _dateIsValid() {
      if(dayEl.value > 31)
      {
          alert("ERROR\nDay is Wrong or over 31")
          return false;
      }
      else if (yearEl >= 1932)
      {
          alert("ERROR\nYears can only be before  1932")
          return false;
      }
      else if(today.getTime() === _getDateOfBirth().getTime())
      {
          alert("ERROR \nYou were born today?")
          return false;
      }
      return monthEl.checkValidity() && dayEl.checkValidity() && yearEl.checkValidity();
  }

  function _getDateOfBirth() {
      return new Date(yearEl.value, monthEl.value, dayEl.value);
  }

  function _repaintItems(number) {
      items = document.querySelectorAll('.chart li');

      for (var i = 0; i < items.length; i++) {
          if (i < number) {
              items[i].style.backgroundColor = COLOR;
          } else {
              items[i].style.backgroundColor = '';
          }
      }
  }

  function listClick(i)
  {
      current = i;
      var currentWeek = i % 52 + 1,
      currentYear = Math.floor(i / 52);
      // alert("Clicked item: " + i + "\nCurrent Year: " + currentYear + "\nCurrent Week: " +currentWeek)
      on(currentWeek, currentYear)
  }

  function on(currentWeek, currentYear) {
      document.getElementById("yearLabel").innerHTML = "Year:" + currentYear;
      document.getElementById("weekLabel").innerHTML = "&emsp; Week:"+ currentWeek;
      let options ={
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      }
    }
    if (fname !== "" && lname !== "")
    {
      fetch('https://week-calendar-back.herokuapp.com/weekGet?' + new URLSearchParams({fname:fname, lname:lname, weekNum:current}),options).then (function (response)
      {
        if(response.status === 404)
        {
          return 404
      }
        else {
          return response.json()
        }
      }).then(function (data)
      {
        if (data !== 404)
        {
            document.getElementById("journal").value = data.journal;
            document.getElementById("myUL").innerHTML = data.list;
        }
      }
      )
    }
      document.getElementById("overlay").style.display = "block";
  }

  function saveWeek(journal,list){
    const data = {
      fname:fname,
      lname:lname,
      weekNum: current+fname+lname,
      journal: journal,
      list: list,
    }
    let options ={
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",

    },
    body: JSON.stringify(data)
  }
    if (fname !== "" && lname !== "")
    {
      fetch('https://week-calendar-back.herokuapp.com/weekUpdate/', options).then(response => response.text()).then(data => console.log(data));
    }
  }

  function off() {
      document.getElementById("overlay").style.display = "none";
      // console.log("Journal " + document.getElementById("journal").value)
      saveWeek(document.getElementById("journal").value, document.getElementById("myUL").innerHTML)
      document.getElementById("journal").value = "";
      var test = document.getElementById("myUL");
      test.innerHTML = '';
  }

  //4680 list elements
  function populateCalendar() {
      for (var i = 0; i < 90; i++) {
          document.getElementsByClassName("chart weeks group")[0].innerHTML += "<li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>"
      }
      items = document.querySelectorAll('.chart li');
      for (i = 0; i < items.length; i++) {
          items[i].addEventListener('click', listClick.bind(this,i), false);
      }
  }

  function newElement() {
      var li = document.createElement("li");
      var inputValue = document.getElementById("myInput").value;
      var t = document.createTextNode(inputValue);
      li.appendChild(t);
      if (inputValue === '') {
          alert("You must write something!");
      } else {
          document.getElementById("myUL").appendChild(li);
      }
          document.getElementById("myInput").value = "";

      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);
      var close = document.getElementsByClassName("close");

      for (var i = 0; i < close.length; i++) {
          close[i].onclick = function() {
              var div = this.parentElement;
              div.remove();
          }
      }
  }
})();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
