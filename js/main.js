function padding(time) {
  if (time.toString().length === 1) {
    return '0' + time;
  } else {
    return time;
  }
}


function prettifyTimer(minutes, seconds) {
  return `${padding(minutes)}:${padding(seconds)}`;
}


function changeTimer(time) {
  let hours = Math.floor(time / 3600);
  let remainder = time % 3600;

  let minutes = Math.floor(remainder / 60);
  let seconds = Math.floor(remainder % 60);

  document.getElementById('timer').innerHTML = prettifyTimer(minutes, seconds);
}


function onLoad() {

  // Incremment session time
  document.getElementById('up-session').addEventListener('click', function() {
    let timeInMinutes = Number(document.getElementById('time-session').innerHTML ) + 1;
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
      let timeInMinutes = Number(document.getElementById('time-session').innerHTML ) - 1;
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

  });

}

document.addEventListener('DOMContentLoaded', onLoad, false);
