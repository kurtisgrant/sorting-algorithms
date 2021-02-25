

class Sketch {
  constructor() {
    this.mode = 'process'
    // Animation variables
    this.fps = MODES[this.mode].fps; // 20fps = 50ms/fm | 40fps = 25ms/fm | 60fps = 16ms/fm <-- ~60fps is about the upper limit
    this.sortsPerFrame = MODES[this.mode].sortsPerFrame;
    this.paused = true;

    // List creation variables
    this.k = MODES[this.mode].k; // (Range of array values)
    this.bWidth = MODES[this.mode].bWidth;

    // Sorting variables
    this.algoId = 'selection';
    this.algo = selectionSort;
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
  setAlgo(id) {
    ALGOS[this.algoId].element.classList.toggle('active');
    this.algoId = id;
    this.algo = ALGOS[id].func;
    ALGOS[this.algoId].element.classList.toggle('active');
    algo_name.innerText = ALGOS[this.algoId].name;
    this.mem = {};
    this.draw();
  }
  animate() {
    if (this.paused) return;
    for (let i = 0; i < this.sortsPerFrame; i++) {
      this.update();
    }
    this.draw();
  }
  update() {
    if (this.paused) return;

    // Get new list from sorting algorithm
    const res = this.algo(
      copyList(this.list), this.mem);
    this.list = res[1];
    if (res[0]) {
      this.draw();
      this.mem = {};
      this.playPause();
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
    play_pause_btn.innerText = this.paused ? 'Play' : 'Pause';
  }
  toggleMode() {
    if (this.mode === 'process') {
      this.mode = 'efficiency';
      mode_btn.innerText = 'Visualize Process';
    } else {
      this.mode = 'process'
      mode_btn.innerText = 'Visualize Efficiency';
    }
    this.fps = MODES[this.mode].fps;
    this.sortsPerFrame = MODES[this.mode].sortsPerFrame;
    this.k = MODES[this.mode].k; 
    this.bWidth = MODES[this.mode].bWidth;
    this.setup();
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
    if (m.min !== m.cur) {
      const shelf = { ...list[m.cur] };
      list[m.cur] = { ...list[m.min] };
      list[m.cur].color = COLORS.a[2];
      list[m.min] = { ...shelf };
      list[m.min].color = COLORS.a[2];
    }
    m.cur = m.cur + 1;
    if (m.cur > m.len - 2) {
      return [completed = true, list];
    } else {
      m.comp = m.cur;
      m.min = m.cur;
      m.minVal = list[m.cur].value;
    }

  } else {
    if (list[m.comp].value < m.minVal) {
      m.min = m.comp;
      m.minVal = list[m.min].value;
    }
  } 

  list[m.comp].color = COLORS.c[0];
  list[m.min].color = COLORS.a[2];
  list[m.cur].color = COLORS.a[1];

  return [completed, list];
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


      if (m.cur === list.length) {
        return [completed = true, list];
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

  return [completed, list];
}


function bubbleSort(list, m) {

  // Initialize memory
  if (!m.hasOwnProperty('unsorted')) {
    m.unsorted = list.length;
    m.swap = false;
    m.a = 0;
  }

  // If done
  if (m.unsorted === 0) return [completed = true, list];

  // Start next loop through if done previous
  if (m.a > m.unsorted - 2) {
    m.a = 0;
    m.unsorted = m.unsorted - 1;
  }

  // Swap 'a' with next if 'a' is larger
  if (list[m.a].value > list[m.a + 1].value) {
    const shelf = { ...list[m.a] };
    list[m.a] = { ...list[m.a + 1] };
    list[m.a + 1] = { ...shelf };
  }

  list[m.a+1].color = COLORS.b[1];
  
  m.a = m.a + 1;
  return [completed = false, list];
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
      s.playPause();
    } else if ( id === 'mode-toggle' ) {
      s.toggleMode();
    } else if ( id === 'shuffle' ) {
      s.setup();
    } else {
      s.setAlgo(id)
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