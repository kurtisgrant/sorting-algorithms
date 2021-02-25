
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
    name: 'Insertion Sort',
    generator: insertionGen,
    btn: insertion_btn
  },
  'bubble': {
    id: 'bubble',
    name: 'Bubble Sort',
    generator: bubbleGen,
    btn: bubble_btn
  }
}


// Sort Algorithm Functions
function* selectionGen(list, steps) {

  // Number of yields throughout sorting (0-3)
  const stepsShown = steps;

  // Outer loop
  for (let iCur = 0; iCur < list.length; iCur++) {
    let cur = list[iCur];
    let min = cur;

    cur.highlight = 1;

    // Inner loop
    for (let iComp = iCur + 1; iComp < list.length; iComp++) {
      let comp = list[iComp];

      // Save if lowest seen
      if (comp.value < min.value) {
        min = comp;
        if (stepsShown === 2) {
          min.highlight = 2;
          cur.highlight = 1;
          yield list;
        }
      } else {
        if (stepsShown === 2) {
          comp.highlight = 3;
          min.highlight = 2;
          cur.highlight = 1;
          yield list;
        }
      }
    }
    // After each inner loop, swap if necessary
    if (cur.value > min.value) {
      if (stepsShown === 1) {
        min.highlight = 2;
        cur.highlight = 1;
        yield list;
      }
      swapBarData(cur, min);
    }
    if (stepsShown === 1) {
      min.highlight = 2;
      cur.highlight = 1;
      yield list;
    }
    min.color = 0; // Reset color of min (previously cur)
    min.highlight = 1;
    cur.color = 2; // Set color of cur (previously min) to 'done' color
    cur.highlight = 2;
  }
  yield list;
}

function* insertionGen(list, steps) {

  // Number of yields throughout sorting (0-3)
  const stepsShown = steps;

  // Outer loop
  for (let iUnsorted = 0; iUnsorted < list.length; iUnsorted++) {
    list[iUnsorted].color = 2;
    list[iUnsorted].highlight = 2;
    if (stepsShown > 0) yield list;
    let iCur = iUnsorted;

    // Inner loop
    while (iCur > 0 && list[iCur -1].value > list[iCur].value) {
      list[iCur].highlight = 2;
      swapBarData(list[iCur], list[iCur -1]);

      if (stepsShown > 1) yield list;
      iCur--;
    }
  }
  // list[list.length -1].color = 2;
  yield list;
}

function* bubbleGen(list, steps) {

  // Number of yields throughout sorting (0-3)
  const stepsShown = steps;

  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length - (i + 1); j++) {
      list[j].highlight = 2;
      list[j+1].highlight = 3;
      if (list[j].value > list[j+1].value) {
        yield list;
        list[j].highlight = 2;
        list[j+1].highlight = 3;
        swapBarData(list[j], list[j+1]);
      }
      yield list;
    }
    list[list.length - (i + 1)].color = 2
  }
}

// const selectionSorter = selectionGen(devList);
// setInterval(() => {
//   const { value: sorted, done } = selectionSorter.next(3);
  
//   if (!done) {
//     sorted[Symbol.iterator] = valColIterator;
//     console.log(...sorted);
//   } else console.log('done');
// }, 5);