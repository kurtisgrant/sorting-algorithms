// const COLORS = {
//   'p': ['#2D9E6D', '#2DCC85', '#8DE3BE'],
//   'a': ['#41269E', '#4729CC', '#9C8DE3'],
//   'b': ['#9E3D2C', '#CC4129', '#E3998D'],
//   'c': ['#9E912C', '#CCB929', '#E3D983'],
// }
const COLORS = {
  'p': ['#2D9E6D', '#41269E', '#1F6E4C'],
  'h': ['#9C8DE3', '#E3998D', '#42A77B']

}
const COLORS2 = {
  'p': ['#🟢', '#GGG', '#🖤'],
  'a': ['# PP', '#🟪', '# P '],
  'b': ['# OO', '#🟧 ', '#🔶']
}


// DOM Elements
const canvas_container = document.querySelector('.canvas-container');
const canvas_el = document.querySelector('#main-canvas');
const algo_header_el = document.querySelector('#algo-name');

// Controls
const control_panel = document.querySelector('#controls');
const play_pause_btn = document.querySelector('#play-pause');

const process_btn = document.querySelector('#process');
const efficiency_btn = document.querySelector('#efficiency');

const selection_btn = document.querySelector('#selection');
const insertion_btn = document.querySelector('#insertion');
const bubble_btn = document.querySelector('#bubble');
const merge_btn = document.querySelector('#merge');
const counting_btn = document.querySelector('#counting');
const quick_btn = document.querySelector('#quick');

// Drawing Context
const ctx = canvas_el.getContext('2d');

const MODES = {
  'dev': {
    id: 'dev',
    fps: 60,
    k: 2000,
    bWidth: 3,
    sortsPerFrame: 100,
  },
  'process': {
    id: 'process',
    fps: 14,
    k: 200,
    bWidth: 20,
    sortsPerFrame: 1,
    btn: process_btn
  },
  'efficiency': {
    id: 'efficiency',
    fps: 60,
    k: 2000,
    bWidth: 1,
    sortsPerFrame: 500,
    btn: efficiency_btn
  }
}