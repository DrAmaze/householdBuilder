// State object will hold all of the people in the house.
var state = {};

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
  person.smoker = document.querySelector('input[type=checkbox]').checked ?
      person.smoker = true : person.smoker = false;
});

// Adds person to state
document.getElementsByClassName('add')[0].addEventListener('click', () => {
  addPersonToState(person);
});

// When user clicks 'add' button, the current person is added to state.
function addPersonToState() {
  const personNum = Object.keys(state).length;
  state.push = {
    age: person.age,
    relationship: person.relationship,
    smoker: person.smoker
  };
  resetPerson();
}

// Resets the person variable to its initial state so that user can add
// another household member
function resetPerson() {
  person.age = 0;
  person.relationship = null;
  person.smoker = false;
}
