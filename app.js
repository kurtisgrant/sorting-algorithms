const COLORS = ['#2d9e6d', '#4cbd8c', '#8cc1f3', '#e38cf3', '#f38cb1']

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
    this.fps = 40;
    this.paused = true;

    // List creation variables
    this.k = 2000; // (Range of array values)
    this.bWidth = 2;

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
        color: COLORS[0]
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
      item.color = COLORS[0];

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

t = setInterval((() => {
  if (!sketch.paused && !sketch.sorted) {
    for (let i = 0; i < 500; i++) {
      sketch.update();
    }
  }
}), 1);

let counter = 0;
let then = Date.now();
f = function() {
  requestAnimationFrame(f);
  let now = Date.now();
  if (now - then > (1000/sketch.fps)) {
  // if (true) {
    then = Date.now();
    if (counter < 300) {
      sketch.animate();
    }
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
    if (list[m.min] !== list[m.comp]) {
      const shelf = { ...list[m.cur] };
      list[m.cur] = { ...list[m.min] };
      list[m.min] = { ...shelf };
    }
    m.cur = m.cur + 1;
    if (m.cur > m.len - 2) {
      completed = true;
    }
    m.comp = m.cur;
    m.min = m.cur;
    m.minVal = list[m.cur].value;
  } else {
    if (list[m.comp].value < m.minVal) {
      m.min = m.comp;
      m.minVal = list[m.min].value;
    }
  } 

  list[m.cur].color = COLORS[2];
  // list[m.comp].color = COLORS[1];
  list[m.min].color = COLORS[3];

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
      const shelf = { ...list[m.cur] };
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

  list[m.cur].color = COLORS[3];
  // list[m.comp].color = COLORS[2];

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
  list[m.a].color = COLORS[2];
  list[m.b].color = COLORS[2];

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