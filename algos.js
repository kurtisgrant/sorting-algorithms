
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
  },
  'merge': {
    id: 'merge',
    name: 'Merge Sort',
    generator: mergeGen,
    btn: merge_btn
  }
}


// Sort Algorithm Functions
function* selectionGen(list) {

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
        min.highlight = 2;
        cur.highlight = 1;
        yield list;
      } else {
        comp.highlight = 3;
        min.highlight = 2;
        cur.highlight = 1;
        yield list;
      }
    }
    // After each inner loop, swap if necessary
    if (cur.value > min.value) {
      min.highlight = 2;
      cur.highlight = 1;
      swapBarData(cur, min);
      yield list;
    }
    min.color = 0; // Reset color of min (previously cur)
    min.highlight = 1;
    cur.color = 2; // Set color of cur (previously min) to 'done' color
    cur.highlight = 2;
  }
  yield list;
}

function* insertionGen(list) {

  // Outer loop
  for (let iUnsorted = 0; iUnsorted < list.length; iUnsorted++) {
    list[iUnsorted].color = 2;
    list[iUnsorted].highlight = 2;
    yield list;
    let iCur = iUnsorted;

    // Inner loop
    while (iCur > 0 && list[iCur -1].value > list[iCur].value) {
      list[iCur].highlight = 2;
      swapBarData(list[iCur], list[iCur -1]);

      yield list;
      iCur--;
    }
  }
  // list[list.length -1].color = 2;
  yield list;
}

function* bubbleGen(list) {

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

function* mergeGen(list) {

}
