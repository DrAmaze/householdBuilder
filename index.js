// State object will hold all of the people in the house.
var state = { people: [] };
// var state = localStorage.getItem('state') ? localStorage.getItem('state') : {};
// localStorage.setItem('state', state);

// initial state of a household member
var person = {
  age: 0,
  relationship: null,
  smoker: false
};

// Updates person object dynamically as user inputs data.
document.addEventListener('input', () => {
  person.age = document.getElementsByName('age')[0].value;
  person.relationship = document.getElementsByName('rel')[0].value;
});

// Adds person to state
document.getElementsByClassName('add')[0].addEventListener('click', (e) => {
  e.preventDefault();
  renderPerson(person);
  addPersonToState();
  return false;
});

function renderPerson(member) {
  // const newPerson = new Member(member);
  // console.log(newPerson);
}

// When user clicks 'add' button, the current person is added to state.
function addPersonToState() {
  person.smoker = document.querySelector('input[type=checkbox]').checked ?
      person.smoker = true : person.smoker = false;

  const personNum = Object.keys(state).length;

  state.people.push({
    age: person.age,
    relationship: person.relationship,
    smoker: person.smoker
  });
  localStorage.setItem('state', state);
  resetPerson();
}


// Resets the person variable to its initial state so that user can add
// another household member
function resetPerson() {
  person.age = 0;
  person.relationship = null;
  person.smoker = false;
}
