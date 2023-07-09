

const landing1 = [1, 2, 3, 4, 5, 6];
const landing2 = [1, 2, 3, 4, 5, 7];
const takeof1 =  [6, 8, 4];
const takeof2 =  [7, 8, 4];

const strips = [
  { number: 1, open: true, plane: null },
  { number: 2, open: true, plane: null },
  { number: 3, open: true, plane: null },
  { number: 4, open: true, plane: null },
  { number: 5, open: true, plane: null },
  { number: 6, open: true, plane: null },
  { number: 7, open: true, plane: null },
  { number: 8, open: true, plane: null },
];

let landingPlanesQueue = [];
let takingofPlanesQueue = [];

// plane = {name : name , position : position, proper: true}

export const getNewPlane = () => {

  const plane = createNewPlane();
  const strip = getPlaneStartPositon(plane);

  if(strip !== 0){
    updateStripOpen(strip - 1, plane);
  }
  return strips;
};

const createNewPlane = () => {
  const position = Math.floor(Math.random()*2); // 0/1
  let planeFromQueue = position === 0 ? landingPlanesQueue.shift() : takingofPlanesQueue.shift();

  if(!planeFromQueue){
    planeFromQueue = createRandomPlaneName(position);
  }

  return planeFromQueue;
}

const createRandomPlaneName = (position) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const name = `${alphabet[Math.floor(Math.random() * alphabet.length)]}${Math.floor(Math.random()*30)+1}`;

  return {name : name , position : position, proper: true}
}

const getPlaneStartPositon = (plane) => {

  let strip;
  if(plane.position === 0){
    strip = startLanding();
    if(strip === 0){
      landingPlanesQueue.push(plane);
    }
  } else{
    strip = startTakeof();
    if(strip === 0){
      takingofPlanesQueue.push(plane);
    }
  }
  return strip;
};

const startLanding = () => {
  return strips[0].open ? landing1[0] : 0;
};

const startTakeof = () => {
  return strips[5].open ? takeof1[0] : strips[6].open ? takeof2[0] : 0;
};

export const nextMove = () => {

  let notOpenStrips = [];

  strips.forEach((strip) => {
    if(!strip.open && strip.plane.proper){
      notOpenStrips.push({plane:strip.plane, number: strip.number});
    }
  });
  
  notOpenStrips.forEach((strip)=>{
    let nextStrip = findNextStrip(strip.plane.position, strip.number);
    if(nextStrip !== 0){
      if(nextStrip !== -1){
        updateStripOpen(nextStrip - 1, strip.plane);
      }    
      updateStripOpen(strip.number - 1, null);
    }
  })
  return strips;
};


const findNextStrip = (position, num) => {
  return position === 0 ? returnStrip(landing1, landing2, num) : returnStrip(takeof1, takeof2, num); 
};

const returnStrip = (options1, options2, num) => {
  let i1, i2;

  i1 = options1.indexOf(num) !== -1 ? options1.indexOf(num) + 1 : 0;
  i2 = options2.indexOf(num) !== -1 ? options2.indexOf(num) + 1 : 0;


  if(i1 >= options1.length || i2 >= options2.length) return -1;

  if(i1 === 0){
    i2 = options2[i2] - 1;
    return strips[i2].open ? strips[i2].number : 0;
  }
  else if(i2 === 0){
    i1 = options1[i1] - 1;
    return strips[i1].open ? strips[i1].number : 0;
  }
  else{
    i1 = options1[i1] - 1;
    i2 = options2[i2] - 1;
    return strips[i1].open ? strips[i1].number : strips[i2].open ? strips[i2].number : 0;
  }
}


const updateStripOpen = (index, plane) => {
  strips[index].open = !strips[index].open;
  strips[index].plane = plane;
};

export const accident = (plane)=>{
  
  strips.forEach((strip)=>{
    if(strip.plane){
      if(strip.plane.name === plane.name && strip.plane.position === plane.position){
        strip.plane.proper = !strip.plane.proper;
      }
    }
  })
}

