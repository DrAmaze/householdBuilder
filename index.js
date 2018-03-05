// State object will hold all of the people in the house.
let oldState = localStorage.getItem('householdBuilderState');
let state = oldState ? JSON.parse(oldState) : { people: {} };

// initial state of a household member
let person = {
  age: 0,
  relationship: null,
  smoker: false
};

// Add the current household members to the page upon rendering DOM.
renderState();

document.addEventListener('submit', (e) => {
  e.preventDefault();
  let household = JSON.stringify(state);
  let debug = document.getElementsByClassName('debug')[0];
  debug.innerHTML = household;

  // style the <pre> tag in order to display the JSON
  debug.style.display = 'block';
  debug.style.margin = '50px 0px';
});

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
  delete state.people[buttonId];
  updateLocalStorage();
});

// Adds person to state
document.getElementsByClassName('add')[0].addEventListener('click', (e) => {
  e.preventDefault();
  // Variable is used to ensure both age and relationship are validated
  // without having to run the validation functions multiple times.
  let valid = true;

  if (!validateAge()) {
    let error = document.getElementsByName('age')[0].parentElement;
    error.innerHTML += '(must be a number greater than 0)';
    valid = false;
  }
  if (!validateRelationship()) {
    let error = document.getElementsByName('rel')[0].parentElement;
    error.innerHTML += '(must be selected from the options below)';
    valid = false;
  }

  if (valid) addPersonToState() ;
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

  resetInputLabels();
  updateLocalStorage();

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

function validateAge() {
  return person.age > 0 ? true : false;
}

function validateRelationship() {
  // This array specifies the types of relationships allowed in a
  // household. This validation is precise due to the precise nature of
  // applying for household insurance.
  const validRelationships = [
    'self',
    'spouse',
    'child',
    'parent',
    'grandparent',
    'other'
  ];
  return validRelationships.includes(person.relationship) ? true : false;
}

// Resets the person variable to its initial state so that user can add
// another household member
function resetPerson() {
  person.age = 0;
  person.relationship = null;
  person.smoker = false;
}

function resetInputLabels() {
  let input = document.getElementsByName('age')[0].parentElement;
  input.innerHTML = 'Age';

  input = document.getElementsByName('rel')[0].parentElement;
  input.innerHMTL = 'Relationship';
}

function updateLocalStorage() {
  const persistState = JSON.stringify(state);
  localStorage.setItem('householdBuilderState', persistState);
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
