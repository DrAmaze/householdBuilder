// State object will hold all of the people in the house.
let oldState = localStorage.getItem('householdBuilderState');
var state = oldState ? JSON.parse(oldState) : { people: {} };

// initial state of a household member
var person = {
  age: 0,
  relationship: null,
  smoker: false
};

// Add the current household members to the page upon rendering DOM.
renderState();

// Updates person object dynamically as user inputs data.
document.addEventListener('input', () => {
  person.age = document.getElementsByName('age')[0].value;
  person.relationship = document.getElementsByName('rel')[0].value;
});

document.getElementsByClassName('household')[0].addEventListener('click', (e) => {
  e.preventDefault();
  let buttonId = e.target.parentElement.id;

  let list = document.getElementsByClassName('household')[0];

  list.removeChild(e.target.parentElement);
  debugger
  delete state.people[buttonId];
});

// Adds person to state
document.getElementsByClassName('add')[0].addEventListener('click', (e) => {
  e.preventDefault();
  addPersonToState();
});

// When user clicks 'add' button, the current person is added to state.
function addPersonToState() {
  person.smoker = document.querySelector('input[type=checkbox]').checked ?
      person.smoker = true : person.smoker = false;

  const uuid = generateUUID();
  state.people[uuid] = {
    id: uuid,
    age: person.age,
    relationship: person.relationship,
    smoker: person.smoker
  };

  const persistState = JSON.stringify(state);
  localStorage.setItem('householdBuilderState', persistState);

  renderPerson(uuid);
  resetPerson();
}

function renderState() {
  Object.keys(state.people).forEach((key) => {
    renderPerson(key);
  });

}

function renderPerson(uuid) {
  let list = document.getElementsByClassName('household')[0];
  let li = document.createElement('LI');
  const member = state.people[uuid];

  li.setAttribute('id', uuid);

  let text = `age: ${member.age}, relationship: ${member.relationship}`;
  member.smoker ? text += ', smoker' : text += ', non-smoker';

  addDeleteButton(li);

  li.appendChild(document.createTextNode(text));
  list.appendChild(li);
}

function addDeleteButton(item) {
  let deleteBtn = document.createElement('BUTTON');
  deleteBtn.setAttribute('class', 'delete');

  deleteBtn.appendChild(document.createTextNode('delete'));
  item.appendChild(deleteBtn);
}

// Resets the person variable to its initial state so that user can add
// another household member
function resetPerson() {
  person.age = 0;
  person.relationship = null;
  person.smoker = false;
}

// UUID function found on StackOverflow:
// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function generateUUID() {
  function s() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s() + s() + '-' + s() + '-' + s() + '-' + s() + '-' + s() + s() + s();
}
