
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
    } else if ( id === 'shuffle' ) {
      s.setup();
    } else {
      if (e.target.classList.contains('algo')) {
        s.setAlgo(id);
        s.cleanList();
      } else if (e.target.classList.contains('mode')) {
        s.setMode(id);
        s.setup();
      }
    }
  })
}