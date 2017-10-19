class pomodoroClock {
  constructor (seconds, timeString, session) {
    this._timeInSeconds = seconds;
    this._timeString = timeString;
    this._session = session;
    this._break = !session;
  }

  get timeInSeconds() {
    return this._timeInSeconds;
  }

  get timeString() {
    return this._timeString;
  }

  get session() {
    return this._session;
  }

  get break() {
    return this._break;
  }

  set session(info) {
    this._session = info;
    this._break = !info;
  }

  changeTime(seconds) {
    // seconds -> e.g. 1470 seconds
    // timerSeconds -> remainder for the clock 30 seconds
    this._timeInSeconds = seconds;

    let hours = Math.floor(seconds / 3600);
    let remainder = seconds % 3600;

    let minutes = Math.floor(remainder / 60);
    let timerSeconds = Math.floor(remainder % 60);

    this._timeString = pomodoroClock.prettifyTimer(minutes, timerSeconds);
  }

  static padding(time) {
    if (time.toString().length === 1) {
      return '0' + time;
    } else {
      return time;
    }
  }

  static prettifyTimer(minutes, seconds) {
    return `${pomodoroClock.padding(minutes)}:${pomodoroClock.padding(seconds)}`;
  }

}


function changeTimer(time) {
  /* Change the timer on the webpage */
  let hours = Math.floor(time / 3600);
  let remainder = time % 3600;

  let minutes = Math.floor(remainder / 60);
  let seconds = Math.floor(remainder % 60);

  document.getElementById('timer').innerHTML = pomodoroClock.prettifyTimer(minutes, seconds);
}


function decrementTime(timeObject) {
  /* Decrement internal time of the pomodoroClock object */
  let currentTime = timeObject.timeInSeconds;
  if (currentTime > 0) {
    timeObject.changeTime(currentTime - 1);
    changeTimer(timeObject.timeInSeconds);
  } else {
    timeObject.changeTime(300);
  }
}


function changeAndDecrement(timeObject) {
  /* Decrement the time of the pomodoroClock object, and change the display */
  decrementTime(timeObject);
  changeTimer(timeObject.timeInSeconds);
}


// Set event listeners when the page loads
function onLoad() {

  let timerOn = false;
  let pomodoro = new pomodoroClock(25, '25:00', true);

  // Incremment session time
  document.getElementById('up-session').addEventListener('click', function() {
    let timeInMinutes = Number(document.getElementById('time-session').innerHTML) + 1;
    document.getElementById('time-session').innerHTML = timeInMinutes;
    changeTimer(timeInMinutes * 60);
  });

  // Increment break time
  document.getElementById('up-break').addEventListener('click', function() {
    document.getElementById('time-break').innerHTML = Number(document.getElementById('time-break').innerHTML) + 1;
  });


  // Decrement session time
  document.getElementById('down-session').addEventListener('click', function() {
    let sessionTime = document.getElementById('time-session').innerHTML;
    if (sessionTime > 0) {
      let timeInMinutes = Number(document.getElementById('time-session').innerHTML) - 1;
      document.getElementById('time-session').innerHTML = timeInMinutes;
      changeTimer(timeInMinutes * 60)
    } else {
      document.getElementById('time-session').innerHTML = 0;
    }
  });

  // Decrement break time
  document.getElementById('down-break').addEventListener('click', function() {
    let sessionTime = document.getElementById('time-break').innerHTML;
    if (sessionTime > 0) {
        document.getElementById('time-break').innerHTML = Number(document.getElementById('time-break').innerHTML) - 1;
    } else {
      document.getElementById('time-break').innerHTML = 0;
    }
  });

  // Start the clock
  document.getElementById('start').addEventListener('click', function() {
    if (!timerOn) {
      timerOn = true;

      let time = Number(document.getElementById('time-session').innerHTML) * 60;
      pomodoro.changeTime(time);
      setInterval(changeAndDecrement, 1000, pomodoro);
    }
  });

}

document.addEventListener('DOMContentLoaded', onLoad, false);
