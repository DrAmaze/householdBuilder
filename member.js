module.exports = class MemberItem {
  constructor(props) {
    this.age = props.age;
    this.relationship = props.relationship;
    this.smoker = props.smoker;
  }

  render ({
    `<div>
      ${age}
      ${relationship}
      ${smoker}
    </div>`
  });
}
