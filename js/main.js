function onLoad() {

  // Incremment session time
  document.getElementById('up-session').addEventListener('click', function() {
    document.getElementById('time-session').innerHTML = Number(document.getElementById('time-session').innerHTML) + 1;
  });

  // Increment break time
  document.getElementById('up-break').addEventListener('click', function() {
    document.getElementById('time-break').innerHTML = Number(document.getElementById('time-break').innerHTML) + 1;
  });


  // Decrement session time
  document.getElementById('down-session').addEventListener('click', function() {
    let sessionTime = document.getElementById('time-session').innerHTML;
    if (sessionTime > 0) {
        document.getElementById('time-session').innerHTML = Number(document.getElementById('time-session').innerHTML) - 1;
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
