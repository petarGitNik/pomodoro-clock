/* A class would probbably be an overkill, but it is something worth considering
 * since it would eliminate global variables.
 */
class pomodoroClock {
  constructor(defaultSession, defaultBreak) {
    this._sessionTime = defaultSession;
    this._breakTime = defaultBreak;

    this._currentTime = defaultSession;

    this._timerId;

    this._isTimerOn = false;
    this._isPaused = false;

    this._session = true;
    this._break = false;
  }

  get sessionTime() {
    return this._sessionTime;
  }

  get breakTime() {
    return this._breakTime;
  }

  get currentTime() {
    return this._currentTime;
  }
}

// Use import/export
