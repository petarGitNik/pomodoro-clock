// Global (yuck!) variables
let timerId;
let isTimerOn = false;
let isPaused = false;
let currentTime; // [sec]

let defaultTime = 25; // [min]
let defaultBreak = 5; // [min]

// Functions
function getMMSS(time) {
  /*
   * The input time is in seconds i.e. the input of 1470 returns [27, 30]
   */
  let hours = Math.floor(time / 3600);
  let remainder = time % 3600;

  let minutes = Math.floor(remainder / 60);
  let seconds = Math.floor(remainder % 60);

  return [hours, minutes, seconds];
}


function padding(number) {
  /*
   * pad a digit on the left with the zero, if number leave it as is
   * keep in mind that in case of digit it returns a string, and in case of
   * a number it returns it with original type (could be number, could be string)
   */
  if (number.toString().length === 1) {
    return '0' + number;
  } else {
    return number;
  }
}


function prettifyTimer(hours, minutes, seconds) {
  /*
   * Return time in the 'HH:MM:SS' or 'MM:SS' format
   */
  if (hours !== 0) {
    return `${padding(hours)}:${padding(minutes)}:${padding(seconds)}`;
  } else {
    return `${padding(minutes)}:${padding(seconds)}`;
  }
}


function changeTimer(time, timerObject) {
  /*
   * Change the timer on the webpage, timerObject is jQuery object
   */
   if (time < 60 && time >= 30) {
    timerObject.css({'color': '#FFD900'});
   } else if (time < 30) {
    timerObject.css({'color': '#F34826'});
   } else {
    isPaused || isTimerOn ? timerObject.css({'color': '#00CCD6'}) : timerObject.css({'color': '#EFEFEF'});
   }

  let timeMMSS = getMMSS(time);
  timerObject.text(prettifyTimer(timeMMSS[0], timeMMSS[1], timeMMSS[2]));
}


function countdown(timerObject) {
  /*
   * Decrement timer and display it on page.
   */
  currentTime--;
  if (currentTime >= 0) {
    changeTimer(currentTime, timerObject);
  }
}


$(document).ready(function() {

  // jQuery increase-decrease functions
  function increaseSessionTime() {
    $('#session-time').text(Number($('#session-time').text()) + 1);
    let timeInSeconds = Number($('#session-time').text()) * 60;
    changeTimer(timeInSeconds, $('#clock'))
  }

  function increaseBreakTime() {
    $('#break-time').text(Number($('#break-time').text()) + 1);
  }

  function decreaseSessionTime() {
    let sessionTime = Number($('#session-time').text());
    if (sessionTime > 1) {
      $('#session-time').text(sessionTime - 1);
      let timeInSeconds = Number($('#session-time').text()) * 60;
      changeTimer(timeInSeconds, $('#clock'))
    }
  }

  function decreaseBreakTime() {
    let breakTime = Number($('#break-time').text());
    if (breakTime > 1) {
      $('#break-time').text(breakTime - 1);
    }
  }

  function attachSessionBreakControls() {
    $('#increase-session').on('click', increaseSessionTime);
    $('#increase-break').on('click', increaseBreakTime);
    $('#decrease-session').on('click', decreaseSessionTime);
    $('#decrease-break').on('click', decreaseBreakTime);
  }

  function detachSessionBreakControls() {
    $('#increase-session').off();
    $('#increase-break').off();
    $('#decrease-session').off();
    $('#decrease-break').off();
  }

  attachSessionBreakControls();

  $('#play').on('click', function() {
    if (!currentTime) {
      // if session, then current time == sessionTime
      // else, if break then current time == breakTime
      currentTime = Number($('#session-time').text()) * 60;
    }
    if (!isTimerOn) {
        isTimerOn = true;
        isPaused = false;
        timerId = setInterval(countdown, 1000, $('#clock'));
    }
    detachSessionBreakControls();
  });

  $('#pause').on('click', function() {
    isPaused = true;
    isTimerOn = false;
    clearInterval(timerId);
  });

  $('#stop').on('click', function() {
    isPaused = false;
    isTimerOn = false;
    clearInterval(timerId);

    let timeInSeconds = Number($('#session-time').text()) * 60;
    currentTime = timeInSeconds;
    changeTimer(timeInSeconds, $('#clock'));
    attachSessionBreakControls();
  });

  $('#reset').on('click', function() {
    isPaused = false;
    isTimerOn = false;
    clearInterval(timerId);

    $('#session-time').text(defaultTime);
    $('#break-time').text(defaultBreak);

    currentTime = defaultTime * 60;
    changeTimer(defaultTime * 60, $('#clock'));
    attachSessionBreakControls();
  });

});
