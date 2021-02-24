
// DEV //////////////////////////////////////
// const devListLen = 30;
// const devList = [];
// for (let i = 0; i < devListLen; i++) {
//   devList.push({
//     value: Math.ceil(Math.random() * 200),
//     color: COLORS2.p[0]
//   });
//   devList[Symbol.iterator] = valColIterator;
//   function valColIterator() {
//     let i = -1;
//     return {
//       next: () => {
//         i = i + 1;
//         if (typeof this[i] != "undefined") {
//           return { value: `[${this[i].value} ${this[i].color.slice(1)}]`, done: false }
//         } else {
//           return { value: undefined, done: true }
//         }
//       }
//     }
//   }
// }

// DEV //////////////////////////////////////

let ALGOS = {
  'selection': {
    id: 'selection',
    name: 'Selection Sort',
    generator: selectionGen,
    btn: selection_btn
  },
  'insertion': {
    id: 'insertion',
    name: 'Insertion Sort'
  },
  'bubble': {
    id: 'bubble',
    name: 'Bubble Sort'
  }
}


// Sort Algorithm Functions
function* selectionGen(list, steps) {

  // Number of yields throughout sorting (0-3)
  const stepsShown = steps;

  // Outer loop
  for (let iCur = 0; iCur < list.length; iCur++) {
    let cur = list[iCur];

    cur.highlight = 1;
    let min = cur;

    // Inner loop
    for (let iComp = iCur + 1; iComp < list.length; iComp++) {
      let comp = list[iComp];

      // Save if lowest seen
      if (comp.value < min.value) {
        min = comp;
        if (stepsShown > 0) {
          min.highlight = 2;
          cur.highlight = 1;
          yield list;
        }
      } else {
        if (stepsShown > 1) {
          comp.highlight = 3;
          min.highlight = 2;
          cur.highlight = 1;
          yield list;
        }
      }
    }
    // After each inner loop, swap if necessary
    if (cur.value > min.value) {
      swapBarData(cur, min);
    }
    min.color = 0; // Reset color of min (previously cur)
    cur.color = 2; // Set color of cur (previously min) to 'done' color
  }
  yield list;
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

// const selectionSorter = selectionGen(devList);
// setInterval(() => {
//   const { value: sorted, done } = selectionSorter.next(3);
  
//   if (!done) {
//     sorted[Symbol.iterator] = valColIterator;
//     console.log(...sorted);
//   } else console.log('done');
// }, 5);