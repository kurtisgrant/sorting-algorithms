import domCanvas from './domCanvas';

const c = domCanvas();

window.addEventListener('resize', () => {
  c.resize();
});