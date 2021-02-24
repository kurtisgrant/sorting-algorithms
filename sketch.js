class Sketch {
  constructor() {
    // Set defaults
    this.mode = MODES['dev']; // MODES: ['dev', 'process', 'efficiency']
    this.algo = ALGOS['selection']; 

    this.setup();
  }
  setup() {
    this.playPause('pause');
    // Set w & h to canvas container
    this.w = canvas_container.offsetWidth -4;
    this.h = Math.floor(this.w * 0.6);

    // Size canvas according to w & h
    canvas_el.width = this.w-4;
    canvas_el.height = this.h-4;

    this.setMode(this.mode.id);

    // Populate list
    const items = Math.floor(this.w / this.bWidth);
    const nList = [];
    for (let i = 0; i < items; i++) {
      nList.push({
        value: Math.ceil(Math.random() * this.k),
        color: 0,
        highlight: 0
      });
    }
    this.list = nList;

    this.setAlgo(this.algo.id);
    this.draw();
  }
  setMode(newModeKey) {
    if (this.mode && this.mode.btn) this.mode.btn.classList.remove('active');
    this.mode = MODES[newModeKey];
    if (this.mode.btn) this.mode.btn.classList.add('active');

    // Animation variables
    this.fps = this.mode.fps; // 20fps = 50ms/fm | 60fps = 16ms/fm <-- ~60fps is upper limit
    this.sortsPerFrame = this.mode.sortsPerFrame;

    // List creation variables
    this.k = this.mode.k; // (Range of array values)
    this.bWidth = this.mode.bWidth;
  }
  setAlgo(newAlgoKey) {
    if (this.algo) this.algo.btn.classList.remove('active');
    this.algo = ALGOS[newAlgoKey];
    this.algo.btn.classList.add('active');

    algo_header_el.innerText = this.algo.name;

    // New list iterator
    const iterator = ALGOS[this.algo.id].generator(this.list, 2); ////////// HARD CODED
    this.nextList = iterator;

    this.done = false;
  }
  animate() {
    if (this.paused) return;
    for (let i = 0; i < this.sortsPerFrame; i++) {
      if (this.done) return;
      this.update();
    }
    this.draw();
  }
  update() {
    if (this.paused || this.done) return;

    // Iterate list by one step
    const { done } = this.nextList.next();

    // Stop if done 
    if (done) {
      this.done = true;
      this.playPause('pause');
      this.draw(); // Clear highlights
      this.draw(); // Draw final sorted list
    }
  }
  draw() {
    // Clear canvas
    ctx.clearRect(0, 0, this.w, this.h)

    // Draw out list items
    this.list.forEach((item, index) => {
      // Set drawing color to 'highlight' else 'color'
      if (item.highlight > 0) {
        ctx.fillStyle = COLORS.h[item.highlight -1];
        // Clear highlight
        item.highlight = 0;
      } else {
        ctx.fillStyle = COLORS.p[item.color];
      }

      // Draw bar
      const w = this.bWidth;
      const h = item.value / this.k * this.h;
      const y = this.h - h;
      const x = index * w;
      ctx.fillRect(x, y, w, h);
    });
  }
  playPause(choice) {
    if (choice === 'play') {
      this.paused = false;
      play_pause_btn.innerText = 'Pause';
    } else if (choice === 'pause') {
      this.paused = true;
      play_pause_btn.innerText = 'Play';
    } else {
      this.paused = !this.paused;
      play_pause_btn.innerText = this.paused ? 'Play' : 'Pause';
    }
    if (!this.paused && this.done) {
      this.newListIterator();
      this.done = false;
    }
  }
}