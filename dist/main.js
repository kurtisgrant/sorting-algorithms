(()=>{"use strict";const t=new class{constructor(){this.container=document.querySelector(".canvas-container"),this.el=document.querySelector("#main-canvas"),this.w=this.container.offsetWidth,this.h=Math.round(.7*this.w),this.el.width=this.w,this.el.height=this.h,console.log(this)}resize(){this.w=this.container.offsetWidth,this.h=Math.round(.7*this.w),this.el.width=this.w,this.el.height=this.h}};window.addEventListener("resize",(()=>{t.resize()}))})();