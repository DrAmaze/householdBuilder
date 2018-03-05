// This file houses all of the functionality logic for this form.

// Global Variables

// State object will hold all of the people in the house. This utilizes
// browser's local storage to have data persist through page refresh.
var oldState = localStorage.getItem('householdBuilderState');
var state = oldState ? JSON.parse(oldState) : { people: {} };

// initial state of a household member. This dynamically updates with
// user input.
var person = {
  age: 0,
  relationship: null,
  smoker: false
};

// Instantiate the list of household members.
// Add the current household members to the page upon rendering DOM.
renderState();

// Event Listeners.
// There are 4 event listeners on this page. This could be optimized by
// adding a single event listener to the form, then parsing the specific
// action, in order to determine the functionality. The current solution
// is written clearly and (due to the limited functionality of the page)
// does not pay a costly price for the event listeners.

// Upon form submission, this converts the household to JSON and appends
// the data to the <pre> tag. This JSON persists as the household is
// updated and can be resubmitted.
document.addEventListener('submit', function (e) {
  e.preventDefault();
  var household = JSON.stringify(state);
  var debug = document.getElementsByClassName('debug')[0];
  debug.innerHTML = household;

  // style the <pre> tag in order to display the JSON
  debug.style.display = 'block';
  debug.style.margin = '50px 0px';
});

// Updates person object dynamically as user inputs data.
document.addEventListener('input', function () {
  person.age = document.getElementsByName('age')[0].value;
  person.relationship = document.getElementsByName('rel')[0].value;
});

// Enables the user to remove people from the household after they are
// added. This leverages the UUID number in order to delete the
// appropriate person. It then updates local storage appropriately.
document.getElementsByClassName('household')[0].addEventListener('click', function (e) {
  e.preventDefault();
  var buttonId = e.target.parentElement.id;

  var list = document.getElementsByClassName('household')[0];

  list.removeChild(e.target.parentElement);
  delete state.people[buttonId];
  updateLocalStorage();
});

// Validates input based on the prompt's specifications.  If valid,
// the person object is added to the to state object with a UUID. If
// invalid, an error DIV is added to the form displaying the user's
// input errors.
document.getElementsByClassName('add')[0].addEventListener('click', function (e) {
  e.preventDefault();
  // Variable is used to ensure both age and relationship are validated
  // without having to run the validation functions multiple times.
  var valid = true;
  var age = validateAge();
  var rel = validateRelationship();
  if (!age || !rel) {
    valid = false;
    createErrorDiv(age, rel);
  }

  if (valid) addPersonToState() ;
});

// Functions that define how the page operates.

// When user clicks 'add' button, the current person is added to state
// with a unique ID number. The browser's local storage is updated, the
// person is rendered to the list of people, the person object is reset
// to its initial state, and finally, the error DIV is removed.
function addPersonToState() {
  // operation to determine whether or not the person is a smoker.
  person.smoker = document.querySelector('input[type=checkbox]').checked ?
      person.smoker = true : person.smoker = false;

  var uuid = generateUUID();
  state.people[uuid] = {
    id: uuid,
    age: person.age,
    relationship: person.relationship,
    smoker: person.smoker
  };

  updateLocalStorage();

  renderPerson(uuid);
  resetPerson();
  resetError();
}

// Rendering functions

// Renders the list of household people when DOM loads.
function renderState() {
  Object.keys(state.people).forEach(function (key) {
    renderPerson(key);
  });
}

// Renders the person to the <ol> through their UUID. This function
// grabs the most up to date input from the person object and creates a
// new <li> which is then appended to the current <ol>. This function
// makes a call to add a delete button to each <li> as well.
function renderPerson(uuid) {
  var list = document.getElementsByClassName('household')[0];
  var li = document.createElement('LI');
  const member = state.people[uuid];

  li.setAttribute('id', uuid);

  var text = `age: ${member.age}, relationship: ${member.relationship}`;
  member.smoker ? text += ', smoker' : text += ', non-smoker';

  addDeleteButton(li);

  li.appendChild(document.createTextNode(text));
  list.appendChild(li);
}

// This handles the logic for creating a delete button for each
// person added to the household.
function addDeleteButton(item) {
  var deleteBtn = document.createElement('BUTTON');
  deleteBtn.setAttribute('class', 'delete');

  deleteBtn.appendChild(document.createTextNode('delete'));
  item.appendChild(deleteBtn);
}

// Data Entry validations

// Validates the input age is a number and it is greater than 0 (as
// defined by the given specifications).
function validateAge() {
  return person.age > 0 ? true : false;
}

// Validates the input relationship exists.
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
// another household person.
function resetPerson() {
  person.age = 0;
  person.relationship = null;
  person.smoker = false;
}

// Error handling

// Handles the logic for error message rendering by adding an error
// <div> to the <form> in order to display the appropriate error message
function createErrorDiv(validAge, validRel) {
  // Resets the error div each time so that the message is relevant to
  // the latest attempted submission.
  resetError();

  // Creation of the <div>
  var error = document.createElement('DIV');
  error.setAttribute('class', 'error');

  // error messaging logic
  if (!validAge && !validRel) {
    error.innerHTML = 'Age must be a number greater than 0; Relationship must be selected from the options below';
  } else if (!validAge) {
    error.innerHTML = 'Age must be a number greater than 0';
  } else if (!validRel) {
    error.innerHTML = 'Relationship must be selected from the options below';
  }

  document.getElementsByTagName('FORM')[0].appendChild(error);
}

// Resets the appended error <div>
function resetError() {
  if (document.getElementsByClassName('error').length > 0) {
    var error = document.getElementsByClassName('error')[0];
    document.getElementsByTagName('FORM')[0].removeChild(error);
  }
}

// Ensures the user's data persists through DOM re-render by utilizing
// the browser's local storage.
function updateLocalStorage() {
  var persistState = JSON.stringify(state);
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
