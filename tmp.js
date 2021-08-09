for(let i = 0; i < worldSorted.length; i++) {
  const o = worldSorted[i];
  const id = o.data.id;

  if(world[id]) {

    // console.log(o.data.z);
    // console.log(c);

    const z = o.data.z;

    // already sorted...
    if(c == 0) {
      c++;
    }

    // put into sorted list
    else{

      // find where to put o and put it there
      for(let j = 0; j < c; j++) {

        const zj = worldSorted[j].data.z;

        console.log(zj);

        if(zj > z) {

          // remove
          worldSorted.splice(i, 1);

          // add
          worldSorted.splice(j, 0, o);

        }

      }
      c++;

    }

  }

}
