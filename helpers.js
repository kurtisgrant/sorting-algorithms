

// Helper Functions
function copyList(list) {
  const nList = [];
  list.forEach(item => {
    const nItem = {
      id: item.id,
      value: item.value,
      color: item.color
    }
    nList.push(nItem);
  })
  return nList;
}

function swapBarData(fst, snd) {
  const temp = {};
  
  temp.color = fst.color;
  temp.id = fst.id;
  temp.value = fst.value;
  temp.highlight = fst.highlight;

  fst.color = snd.color;
  fst.id = snd.id;
  fst.value = snd.value;
  fst.highlight = snd.highlight;

  snd.color = temp.color;
  snd.id = temp.id;
  snd.value = temp.value;
  snd.highlight = temp.highlight;
}

function clearColors(list) {
  for (let bar of list) {
    bar.color = COLORS2.p[0];
  }
}