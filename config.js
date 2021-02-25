const COLORS = {
  'p': ['#2D9E6D', '#41269E', '#1F6E4C'],
  'h': ['#9C8DE3', '#E3998D', '#42A77B', '#E3D983']

}

// DOM Elements
const canvas_container = document.querySelector('.canvas-container');
const canvas_el = document.querySelector('#main-canvas');
const algo_header_el = document.querySelector('#algo-name');

// Controls
const control_panel = document.querySelector('#controls');
const play_pause_btn = document.querySelector('#play-pause');

const slow_btn = document.querySelector('#slow');
const medium_btn = document.querySelector('#medium');
const fast_btn = document.querySelector('#fast');

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
    fps: 2,
    k: 200,
    bWidth: 40,
    sortsPerFrame: 1,
    stepsPerUpdate: 2
  },
  'slow': {
    id: 'slow',
    fps: 4,
    k: 200,
    bWidth: 40,
    sortsPerFrame: 1,
    stepsPerUpdate: 2,
    btn: slow_btn
  },
  'medium': {
    id: 'medium',
    fps: 60,
    k: 1000,
    bWidth: 15,
    sortsPerFrame: 3,
    stepsPerUpdate: 2,
    btn: medium_btn
  },
  'fast': {
    id: 'fast',
    fps: 30,
    k: 2000,
    bWidth: 2,
    sortsPerFrame: 500,
    stepsPerUpdate: 2,
    btn: fast_btn
  }
}