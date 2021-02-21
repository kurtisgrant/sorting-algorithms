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