const RANGE = 2000;
const COLORS = ['#2d9e6d', '#f7d2b5', '#8cc1f3', '#e38cf3', '#f38cb1']

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

// Drawing Context
const ctx = canvas_el.getContext('2d');

class Sketch {
  constructor() {
    this.bars = [];
    this.resize();
    this.setArrProps();
    this.paused = true;
    // this.sort_algo = selectionAlgo;  TODO

    for (let i = 0; i < this.arrLen; i++) {
      this.bars.push({
        index: i,
        width: this.barWidth,
        maxHeight: this.h,
        height: (Math.trunc(Math.random()*RANGE)) / RANGE * this.h,
        color: COLORS[0],
        draw: function() {
          ctx.fillStyle = this.color;
          ctx.fillRect(
            this.index * this.width,
            this.maxHeight - this.height,
            this.width,
            this.height
          );
          console.log(
            this.index * this.width,
            this.maxHeight - this.height,
            this.width,
            this.height
          );
        }
      })
    }


    this.drawBars();
  

  }
  drawBars() {
    this.bars.forEach(bar => {
      bar.draw();
    })
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
  }
  setArrProps() {
    const maxArrLen = this.w;
    const minArrLen = 8;
    this.arrLen = Math.ceil(length_slider.value / 100 * (maxArrLen - minArrLen) + minArrLen);
    this.barWidth = this.w / this.arrLen;
  }
}

const sketch = new Sketch();

// Event Listeners
window.addEventListener('resize', () => {
  sketch.resize();
  sketch.setArrProps();
  sketch.drawBars();
})