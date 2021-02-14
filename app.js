const COLORS = ['#2d9e6d', '#f7d2b5', '#8cc1f3', '#e38cf3', '#f38cb1']

// DOM Elements
const canvas_container = document.querySelector('.canvas-container');
const canvas_el = document.querySelector('#main-canvas');
const algo_name = document.querySelector('#algo-name');
const control_panel = document.querySelector('#controls');

// Drawing Context
const ctx = canvas_el.getContext('2d');

class Sketch {
  constructor() {
    this.animating = false;
    this.k = 2000;
    this.fps = 6;
    this.setSize();
    this.paused = true;
    this.sortFunc = selectionSort;
    this.state = {
      sortComplete: false,
      sortMemory: [],
      array: this.newArray()
    }
    this.newArray();
  }
  animate() {
    if (!this.animating) {
      this.draw();
      this.animating = true;
    } else {
      this.update();
    }
  }
  update() {
    if (this.paused || this.state.sortComplete) {
      return;
    }
    counter++;
    this.state = this.sortFunc(this.state);
    this.draw();
  }
  draw() {
    ctx.clearRect(0, 0, this.w, this.h)
    this.state.array.forEach((item, index) => {
      ctx.fillStyle = item.color;
      item.color = COLORS[0];
      const barHeight = item.value / this.k * this.h;
      const y = this.h - barHeight;
      // ctx.fillRect(index, y, 1, barHeight);
      ctx.fillRect(index*30, y, 30, barHeight);
    });
  }
  playPause() {
    this.paused = !this.paused;
    return this.paused ? 'Play' : 'Pause';
  }
  setAlgo(func) {
    if (this.sortFunc !== func) {
      this.state.sortComplete = false;
      this.state.sortMemory = [];
      this.sortFunc = func;
    }
  }
  setSize() {
    this.w = canvas_container.offsetWidth -4;
    this.h = Math.floor(this.w * 0.6);
    canvas_el.width = this.w-4;
    canvas_el.height = this.h-4;
  }
  newArray() {
    const arr = [];
    // for (let i = 0; i < this.w; i++) {
    for (let i = 0; i < 10; i++) {
      arr.push({
        value: Math.ceil(Math.random() * this.k),
        color: COLORS[0]
      });
    }
    return arr;
  }
}

const sketch = new Sketch();
loadEventListeners(sketch);

let counter = 0;
let then = Date.now();
f = function() {
  requestAnimationFrame(f);
  let now = Date.now();
  if (now - then > (1000/sketch.fps)) {
    then = Date.now();
    if (counter < 10000) {
      sketch.animate();
    }
  }
};
requestAnimationFrame(f);

// Sort Algorithm Functions
function selectionSort(s) {
  let { sortMemory, array } = s;

  let complete = false;
  const mem = [{ start: 0 }];

  if (sortMemory.length > 0) mem[0].start = sortMemory[0].start;
  if (mem[0].start >= array.length) complete = true;
  
  let startInd = mem[0].start;
  let minInd = array[startInd].value;
  mem[0].start++;

  for (let i = startInd + 1; i < array.length; i++) {
    if (array[i].value < minInd) minInd = i;
  }
  const start = {};
  const min = {};
  Object.assign(start, array[startInd]);
  Object.assign(min, array[minInd]);
  start.color = COLORS[1];
  min.color = COLORS[1];

  const newArr = array.map((x, i) => {
    if (i === startInd) {
      return min;
    } else if (i === minInd) {
      return start;
    } else return x;
  })

  const newState = {}
  newState.sortComplete = complete;
  newState.sortMemory = mem;
  newState.array = newArr;

  console.log(newState);

  return newState;

}



// Event Listeners
function loadEventListeners(s) {
  window.addEventListener('resize', () => {
    s.reset();
  });
  control_panel.addEventListener('click', (e) => {
    const isButton = e.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }
    const id = e.target.id;
    if ( id === 'play-pause') {
      e.target.innerText = s.playPause();
      counter = 0;
    }
  })
}