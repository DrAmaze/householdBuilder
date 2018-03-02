var state = {};

var person = {
  age: 0,
  relationship: null,
  smoker: false
};

// this.state = this.state.bind(this);
// this.person = this.person.bind(this);

let age = document.getElementsByName('age');
let rel = document.getElementsByName('rel');
let smoker = document.getElementsByName('smoker');

document.addEventListener('input', () => {
  person.age = document.getElementsByName('age')[0].value;
  person.relationship = document.getElementsByName('rel')[0].value;
  if (document.querySelector('input[type=checkbox]').checked) {
    person.smoker = true;
  } else {
    person.smoker = false;
  }
  console.log(person);

});

document.addEventListener('select', () => {
});

document.addEventListener('submit', () => {

});

function addToHTML() {

}
