
const domCanvas = function() {
  class domCanvas {
    constructor() {
      this.container = document.querySelector('.canvas-container');
      this.el = document.querySelector('#main-canvas');
      this.w = this.container.offsetWidth;
      this.h = Math.round(this.w * 0.7);
      this.el.width = this.w;
      this.el.height = this.h;
      console.log(this);
    }
    resize() {
      this.w = this.container.offsetWidth;
      this.h = Math.round(this.w * 0.7);
      this.el.width = this.w;
      this.el.height = this.h;
    }
  }
  return new domCanvas();
};

export default domCanvas;