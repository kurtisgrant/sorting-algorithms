

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
  const hold = {};
  hold.color = fst.color;
  hold.id = fst.id;
  hold.value = fst.value;

  fst.color = snd.color;
  fst.id = snd.id;
  fst.value = snd.value;

  snd.color = hold.color;
  snd.id = hold.id;
  snd.value = hold.value;
   
}