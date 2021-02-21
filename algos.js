
// DEV //////////////////////////////////////
const devListLen = 30;
const devList = [];
for (let i = 0; i < devListLen; i++) {
  devList.push({
    id: Math.random().toString().slice(2),
    value: Math.ceil(Math.random() * 200),
    color: COLORS2.p[0]
  });
  devList[Symbol.iterator] = valColIterator;
  function valColIterator() {
    let i = -1;
    return {
      next: () => {
        i = i + 1;
        if (typeof this[i] != "undefined") {
          return { value: `[${this[i].value} ${this[i].color.slice(1)}]`, done: false }
        } else {
          return { value: undefined, done: true }
        }
      }
    }
  }
}

// DEV //////////////////////////////////////

let ALGOS = {
  'selection': {
    name: 'Selection Sort',
    generator: getSelectionSorter
  },
  'insertion': {
    name: 'Insertion Sort'
  },
  'bubble': {
    name: 'Bubble Sort'
  }
}


for (let algoId in ALGOS) {
  ALGOS[algoId].element = document.querySelector(`#${algoId}`);
}

// Sort Algorithm Functions
function* getSelectionSorter(list) {
  const wList = copyList(list);

  // Number of yields throughout sorting (0-3)
  let stepsShown = yield;

  // Outer loop
  for (let iCur = 0; iCur < wList.length; iCur++) {
    let cur = wList[iCur];
    if (iCur > 0) wList[iCur -1].color = COLORS2.b[2];
    cur.color = COLORS2.a[1];
    let min = cur;

    // Inner loop
    for (let iComp = iCur + 1; iComp < wList.length; iComp++) {
      let comp = wList[iComp];

      // Save if lowest seen
      if (comp.value < min.value) {
        min.color = COLORS2.p[0];
        cur.color = COLORS2.a[1];
        min = comp;
        if (stepsShown > 1) {
          min.color = COLORS2.b[1];
          stepsShown = yield wList;
        }
      } else {
        if (stepsShown > 2) {
          comp.color = COLORS2.p[2];
          stepsShown = yield wList;
          comp.color = COLORS2.p[0];
        }
      }
    }
    // After each inner loop, swap if necessary
    if (cur.value > min.value) {
      swapBarData(cur, min);
      min.color = COLORS2.p[0];
    }
  }
  yield wList;
}

function selectionSort(list) {

  for (let iCur = 0; iCur < list.length; iCur++) {
    let cur = list[iCur];
    let min = cur;
    for (let iComp = iCur + 1; iComp < list.length; iComp++) {
      let comp = list[iComp];
      if (comp.value < min.value) min = comp;
    }
    if (cur.value > min.value) swapBarData(cur, min)
  }
}


function* getInsertionSorter(list) {
}


function* getBubbleSorter(list) {
}

const selectionSorter = getSelectionSorter(devList);
setInterval(() => {
  const { value: sorted, done } = selectionSorter.next(2);
  
  if (!done) {
    sorted[Symbol.iterator] = valColIterator;
    console.log(...sorted);
  } else console.log('done');
}, 5);