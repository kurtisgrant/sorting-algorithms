// DOM Elements
const canvas_container = document.querySelector('.canvas-container');
const canvas_el = document.querySelector('#main-canvas');
// Text Elements
const algo_name = document.querySelector('#algo-name');
const info_intro = document.querySelector('#into-intro');
const info_process = document.querySelector('#info-process');
const time_complexity = document.querySelector('#time-complexity');
const time_notes = document.querySelector('#time-notes');
const space_complexity = document.querySelector('#space-complexity');
const space_notes = document.querySelector('#space-notes');
// Controls
const play_btn = document.querySelector('#play_btn');
const shuffle_btn = document.querySelector('#shuffle-btn');
const speed_slider = document.querySelector('#speed-slider');
const length_slider = document.querySelector('#length-slider');
// Algorithm Selector Buttons
const algo_btns = document.querySelectorAll('.algo-btn');

class Sketch {
  constructor() {
    this.resize();
    this.paused = true;
    // this.sort_algo = selectionAlgo;  TODO

  }
  playPause() {
    this.paused = !this.paused;
  }
  clear() {
    // TODO
  }
  setAlgo() {
    // TODO
  }
  setSpeed() {
    // TODO
  }
  setLength() {
    // TODO
  }
  resize() {
    this.w = canvas_container.offsetWidth -4;
    this.h = Math.floor(this.w * 0.7);
    canvas_el.width = this.w;
    canvas_el.height = this.h;

    this.maxArrLen = this.w;
    this.minArrLen = 8;
    this.minBarW = 1;
    this.maxBarW = Math.floor(this.w / this.minArrLen);
    this.barWidth = Math.ceil(length_slider.value/100 * this.maxBarW);
    this.arrLen = Math.floor(this.maxArrLen / this.barWidth);
    console.log(length_slider.value, this);
  }
}

const sketch = new Sketch();

// Event Listeners
window.addEventListener('resize', () => {
  sketch.resize();
})