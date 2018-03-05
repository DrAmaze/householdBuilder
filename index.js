// State object will hold all of the people in the house.
let oldState = localStorage.getItem('householdBuilderState');
var state = oldState ? JSON.parse(oldState) : { people: [] };

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
  addPersonToState();
  return false;
});

// When user clicks 'add' button, the current person is added to state.
function addPersonToState() {
  person.smoker = document.querySelector('input[type=checkbox]').checked ?
      person.smoker = true : person.smoker = false;

  state.people.push({
    age: person.age,
    relationship: person.relationship,
    smoker: person.smoker
  });

  const persistState = JSON.stringify(state);
  localStorage.setItem('householdBuilderState', persistState);

  renderPerson();
  resetPerson();
}

function renderPerson() {
  let list = document.getElementsByClassName('household')[0];
  let li = document.createElement('LI');
  let text = `age: ${person.age}, relationship: ${person.relationship}`;
  person.smoker ? text += ', smoker' : text += ', non-smoker';
  
  li.appendChild(document.createTextNode(text));
  list.appendChild(li);
}

// Resets the person variable to its initial state so that user can add
// another household member
function resetPerson() {
  person.age = 0;
  person.relationship = null;
  person.smoker = false;
}
