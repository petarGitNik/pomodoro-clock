// Global (yuck!) variables
let timerId;
let isTimerOn = false;
let isPaused = false;
let currentTime; // [sec]

let isSession;
let isBreak;

let defaultTime = 25; // [min]
let defaultBreak = 5; // [min]

let userTime; // [min]
let userBreak; // [min]

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
   * Pad a digit on the left with the zero, if number leave it as is
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


function countdown(timerObject, indicatorObject) {
  /*
   * Decrement timer and display it on page.
   */
  if (currentTime < 0) {
    [isSession, isBreak] = [isBreak, isSession];
    currentTime = isBreak ? userBreak * 60 : userTime * 60;
    playSound('sound/chinese-gong-daniel-simon');
  }
  if (currentTime >= 0) {
    isBreak ? indicatorObject.text('Break') : indicatorObject.text('Session');
    changeTimer(currentTime, timerObject);
    currentTime--;
  }
}


function playSound(filename) {
  /*
   * Play the sound located with the given filename
   * This function is taken from:
   * https://stackoverflow.com/questions/10105063/how-to-play-a-notification-sound-on-websites
   * archived version:
   * https://archive.is/2rFhf
   */
  document.getElementById('sound').innerHTML = '<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3" /></audio>';
}


$(document).ready(function() {

  function clearAndDefault() {
    isPaused = false;
    isTimerOn = false;
    clearInterval(timerId);
    $('#indicator').text('Session');
    attachSessionBreakControls();
  }


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


  // Session and break controls
  attachSessionBreakControls();

  // Pomodoro clock controls
  $('#play').on('click', function() {
    currentTime = isPaused ? currentTime : Number($('#session-time').text()) * 60;

    userTime = Number($('#session-time').text());
    userBreak = Number($('#break-time').text());

    if (typeof isSession === 'undefined') {
      isSession = true;
      isBreak = !isSession;
    }

    if (!isTimerOn) {
        isTimerOn = true;
        isPaused = false;
        timerId = setInterval(countdown, 1000, $('#clock'), $('#indicator'));
    }

    detachSessionBreakControls();
  });

  $('#pause').on('click', function() {
    isPaused = true;
    isTimerOn = false;
    clearInterval(timerId);
  });

  $('#stop').on('click', function() {
    clearAndDefault();

    let timeInSeconds = Number($('#session-time').text()) * 60;
    currentTime = timeInSeconds;
    changeTimer(timeInSeconds, $('#clock'));
  });

  $('#reset').on('click', function() {
    clearAndDefault();

    $('#session-time').text(defaultTime);
    $('#break-time').text(defaultBreak);

    currentTime = defaultTime * 60;
    changeTimer(defaultTime * 60, $('#clock'));
  });

});
