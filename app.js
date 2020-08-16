const form = document.querySelector('#inputs');
const scores = document.querySelector('.scores');
const subValues = [];

document.querySelector('#submit').addEventListener('click', (e) => {
  e.preventDefault();
  saveScores();
  generateScoreElement();
  clearScores();
  removeScoreElement();
});

document.querySelector('.addCourse').addEventListener('click', (e) => {
  e.preventDefault();
  generateElement();
  clearScores();
  removeElement(scores);
});

document.querySelector('.removeCourse').addEventListener('click', (e) => {
  e.preventDefault();
  removeElement(form);
  removeElement(form);
  removeElement(scores);
  clearScores();
});


// ////////////function/////////////

//The calculateScore function iterates over the objects(Courses)
//in the subValues array and calculates the Weighted Grade Point
// & Weighted Units and claculates the final Grade Point.
const calculateScore = () => {
  const weightedUnit = subValues.reduce((acc, cur) => {
    return acc + cur.unit;
  }, 0);

  const weightedGp = subValues.reduce((acc, curVal) => {
    let mark = curVal.grade * curVal.unit;
    return acc + mark;
  }, 0);

  const gp = weightedGp / weightedUnit;

  return gp.toFixed(2);
};

const inputValues = document.getElementsByClassName('subjectScore');
const inputUnit = document.getElementsByClassName('subjectUnit');


//Collects scores from input elements and pushes them as objects 
//with units and grade keys onto the subValues array.
const saveScores = () => {
  let gradePoint;
  let index = -1;
  [...inputValues].forEach((val) => {
    index += 1;
    const subjectScore = val.valueAsNumber;
    const unit = inputUnit[index].valueAsNumber;

    //Conditional statement to determine grade point value
    //of score.
    if (subjectScore >= 70) {
      gradePoint = 4;
    } else if (subjectScore <= 69 && subjectScore >= 60) {
      gradePoint = 3;
    } else if (subjectScore <= 59 && subjectScore >= 50) {
      gradePoint = 2;
    } else if (subjectScore <= 50 && subjectScore >= 45) {
      gradePoint = 1;
    } else {
      gradePoint = 0;
    }

    subValues.push({
      grade: gradePoint,
      unit: unit
    });
  });
};

//Generates input elements and appends them to the bottom 
//of the lists of inputs.
const generateElement = () => {
  const subjectInput = document.createElement('input');
  const unitInput = document.createElement('input');

  subjectInput.classList.add('subjectScore');
  unitInput.classList.add('subjectUnit');

  subjectInput.setAttribute('type', 'number');
  subjectInput.setAttribute('max', '100');
  unitInput.setAttribute('type', 'number');

  subjectInput.setAttribute('placeholder', 'Enter Course Score');
  unitInput.setAttribute('placeholder', 'Enter Course Unit');

  form.appendChild(subjectInput);
  form.appendChild(unitInput);
};

//Removes input elements from the bottom of the list of inputs.
const removeElement = (element) => {
  if (element.childNodes.length) {
    element.lastElementChild.remove();
  }
};

//creates an heading element and appends it to the scores div.
const generateScoreElement = () => {
  const sum = document.createElement('h1');
  sum.textContent = `Your Grade Point is ${calculateScore()}`;

  scores.appendChild(sum);
};

//Removes the result element if it already exists.
const removeScoreElement = () => {
  if (scores.childNodes.length > 1) {
    scores.firstChild.remove();
  }
};

//Clears the subValues array.
const clearScores = () => {
  subValues.splice(0);
};