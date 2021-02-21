const COLORS = {
  'p': ['#2D9E6D', '#2DCC85', '#8DE3BE'],
  'a': ['#41269E', '#4729CC', '#9C8DE3'],
  'b': ['#9E3D2C', '#CC4129', '#E3998D'],
  'c': ['#9E912C', '#CCB929', '#E3D983'],
}
const COLORS2 = {
  'p': ['#🟢', '#GGG', '#🖤'],
  'a': ['# PP', '#🟪', '# P '],
  'b': ['# OO', '#🟧 ', '#🔶']
}

const MODES = {
  'process': {
    fps: 14,
    k: 200,
    bWidth: 20,
    sortsPerFrame: 1
  },
  'efficiency': {
    fps: 60,
    k: 2000,
    bWidth: 1,
    sortsPerFrame: 500
  }
}

// DOM Elements
const canvas_container = document.querySelector('.canvas-container');
const canvas_el = document.querySelector('#main-canvas');
const algo_name = document.querySelector('#algo-name');
const mode_btn = document.querySelector('#mode-toggle');
const play_pause_btn = document.querySelector('#play-pause');
const control_panel = document.querySelector('#controls');

// Drawing Context
const ctx = canvas_el.getContext('2d');