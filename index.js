let state = {};

let person = {
  age: 0,
  relationship: null,
  smoker: false
};

this.state = this.state.bind(this);
this.person = this.person.bind(this);

let age = document.getElementsByName('age');
let rel = document.getElementsByName('rel');
let smoker = document.getElementsByName('smoker');

document.addEventListener('input', () => {
  person.age = age.innerHtml;
  person.relationship = rel.innerHtml;
  person.smoker = smoker.innerHtml;
  console.log(person);
});

document.addEventListener('select', () => {

});

document.addEventListener('submit', () => {

});

function addToHTML() {

}
