const COLORS = {
  'p': ['#2D9E6D', '#2DCC85', '#8DE3BE'],
  'a': ['#41269E', '#4729CC', '#9C8DE3'],
  'b': ['#9E3D2C', '#CC4129', '#E3998D'],
  'c': ['#9E912C', '#CCB929', '#E3D983'],
}

// DOM Elements
const canvas_container = document.querySelector('.canvas-container');
const canvas_el = document.querySelector('#main-canvas');
const algo_name = document.querySelector('#algo-name');
const control_panel = document.querySelector('#controls');

// Drawing Context
const ctx = canvas_el.getContext('2d');

class Sketch {
  constructor() {
    // Animation variables
    this.fps = 60; // 20fps = 50ms/fm | 40fps = 25ms/fm | 60fps = 16ms/fm <-- ~60fps is about the upper limit
    this.sortsPerFrame = 1000;
    this.paused = true;

    // List creation variables
    this.k = 2000; // (Range of array values)
    this.bWidth = 1;

    // Sorting variables
    this.algo = selectionSort;
    this.sorted = false;
    this.list = [];
    this.mem = {};

    // Setup w & h and create
    this.setup();
  }
  setup() {
    // Set w & h to canvas container
    this.w = canvas_container.offsetWidth -4;
    this.h = Math.floor(this.w * 0.6);
    // Size canvas according to w & h
    canvas_el.width = this.w-4;
    canvas_el.height = this.h-4;
    // Populate list
    const items = Math.floor(this.w / this.bWidth);
    const nList = [];
    for (let i = 0; i < items; i++) {
      nList.push({
        value: Math.ceil(Math.random() * this.k),
        color: COLORS.p[0]
      });
    }
    this.list = nList;
    this.mem = {};
    this.draw();
  }
  setAlgo(algo) {
    this.algo = algo;
    this.sorted = false;
    this.mem = {};
  }
  animate() {
    for (let i = 0; i < this.sortsPerFrame; i++) {
      this.update();
    }
    this.draw();
  }
  update() {
    if (this.sorted || this.paused) return;

    // Get new list from sorting algorithm
    const res = this.algo(
      copyList(this.list), this.mem);
    this.list = res[1];
    this.mem = res[2];
    if (res[0]) {
      this.sorted = true;
      this.draw();
    }
  }
  draw() {
    // Clear canvas
    ctx.clearRect(0, 0, this.w, this.h)

    // Draw out list items
    this.list.forEach((item, index) => {
      // Set drawing color
      ctx.fillStyle = item.color;

      // Reset item color
      item.color = COLORS.p[0];

      // Draw bar
      const w = this.bWidth;
      const h = item.value / this.k * this.h;
      const y = this.h - h;
      const x = index * w;
      ctx.fillRect(x, y, w, h);
    });
  }
  playPause() {
    this.paused = !this.paused;
    return this.paused ? 'Play' : 'Pause';
  }
}

const algos = {
  'selection': selectionSort,
  'shuffle': shuffle,
  'insertion': insertionSort
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
    sketch.animate();
  }
};
requestAnimationFrame(f);

// Sort Algorithm Functions
function selectionSort(list, m) {
  let completed = false;
  if (!m.hasOwnProperty('cur')) {
    m.cur = 0;
    m.comp = 0;
    m.len = list.length;
    m.min = 0;
    m.minVal = list[0].value;
  }
  m.comp = m.comp + 1;

  // SWAP turn
  if (m.comp > m.len - 1) {

    // SWAP if min wasn't already in the right spot
    if (list[m.min] !== list[m.comp]) {
      const shelf = { ...list[m.cur] };
      list[m.cur] = { ...list[m.min] };
      list[m.cur].color = COLORS.a[1];
      list[m.min] = { ...shelf };
    }
    m.cur = m.cur + 1;
    if (m.cur > m.len - 2) completed = true;
    m.comp = m.cur;
    m.min = m.cur;
    m.minVal = list[m.cur].value;
  } else {
    if (list[m.comp].value < m.minVal) {
      m.min = m.comp;
      m.minVal = list[m.min].value;
    }
  } 

  list[m.cur].color = COLORS.a[2];
  list[m.comp].color = COLORS.c[0];
  list[m.min].color = COLORS.a[1];

  return [completed, list, m];
}


function insertionSort(list, m) {
  let completed = false;
  if (!m.hasOwnProperty('cur')) {
    m.cur = 1;
    m.comp = 0;
  }

  if (m.comp < m.cur) {
    if (list[m.comp].value >= list[m.cur].value) {

      // Insert
      let shelf = { ...list[m.cur] };
      shelf.color = COLORS.a[1];
      for (i = m.cur; i > m.comp; i--) {
        list[i] = { ...list[i-1] };
      }
      list[m.comp] = { ...shelf };
      m.cur = m.cur + 1;
      m.comp = 0;


      if (m.cur === list.length -1) {
        completed = true;
      }
    } else {
      m.comp = m.comp + 1;
    }
  } else {
    m.cur = m.cur + 1;
    m.comp = 0;
  }

  list[m.cur].color = COLORS.a[2];
  list[m.comp].color = COLORS.c[0];

  return [completed, list, m];
}


function shuffle(list, m) {
  let completed = false;
  if (!m.hasOwnProperty('num')) {
    m.num = 3000
  }
  
  m.num = m.num - 1;
  m.a = Math.floor(Math.random() * list.length);
  m.b = Math.floor(Math.random() * list.length);
  const shelf = { ...list[m.a] };
  list[m.a] = { ...list[m.b] };
  list[m.b] = { ...shelf };
  list[m.a].color = COLORS.a[1];
  list[m.b].color = COLORS.a[1];

  if (m.num < 1) completed = true;
  
  return [completed, list, m];
}


// Event Listeners
function loadEventListeners(s) {
  window.addEventListener('resize', () => {
    s.setup();
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
    } else {
      s.setAlgo(algos[id])
    }
  })
}


// Helper Functions
function copyList(list) {
  const nList = [];
  list.forEach(item => {
    const nItem = {
      value: item.value,
      color: item.color
    }
    nList.push(nItem);
  })
  return nList;
}