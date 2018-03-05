# Prompt

Household builder
=================

Your application needs a way to capture information about a household applying
for health insurance coverage. Develop a UI for building a household up from
individual people.

Task
----

You have been given an HTML page with a form and a placeholder for displaying
a household.

In the given index.js file, replace the "Your code goes here" comment with JavaScript that can:

* Validate data entry (age is required and > 0, relationship is required)
* Add people to a growing household list
* Remove a previously added person from the list
* Display the household list in the HTML as it is modified
* Serialize the household as JSON upon form submission as a fake trip to the server

Notes
-----

Do not modify the given index.html file in any way. You're of course still allowed to modify the DOM through Javascript.

You must write JavaScript, not a language that compiles down to JavaScript. You
must use ES3 or ES5/5.1 standard. Assume the capabilities of a modern
mainstream browser in wide use, i.e., no bleeding-edge features. No 3rd party
libraries -- i.e., no jQuery.

The display of the household list is up to you.

On submission, put the serialized JSON in the provided "debug" DOM element and display that element.

After submission the user should be able to make changes and submit the household again.

You do not need to add validations around anything other than the age and relationship requirements described above. It's ok for someone to add 35 parents.

The focus here is on the quality of your JavaScript, not the beauty of your design. The controls you add around viewing and deleting
household members should be usable but need not be much to look at.

# Solution
## To Run Code

1. Clone or download this repository
2. Copy the full path of the `index.html` file into your favorite browser.
3. Enjoy building your household!

# Implementation Decisions

## State Object

The `index.js` file features a state object. Within that state object there is a `people` object which houses all of the household members. The choice to include a state object is congruent with web app development practices: it enables constant O(1) retrieval and writing functionality. The state holds the universal truth within the context of the application. The state shape is dynamically updated as the user adds people to the house. The state persists through a user refresh via the `localStorage()` function available in the browser.

On submission, the state object is transformed into JSON via the `JSON.stringify()` function and appended to the `<pre>` tag in the `index.html` file. This effectively mocks the behavior of a submission to a database.

## UUID

The people are indexed by a universally unique identification number (UUID) so as to enable the user to interact with these objects readily. This was implemented as users will be expected to delete household people and add more people quite often. This makes an incremental index of each person in state infeasible as the indices would then fail to be chronological after the user deletes a person.

For this assignment, the only function that references each person from the state is `delete`. Each delete button is created with an id number that matches the UUID of the accompanying person. The event listener parses which delete button was clicked by the UUID number and then retrieves that person from the state in order to remove them.

## Relationship Validation

Relationship validation utilizes a hard-coded array of each relationship choice to validate the user input. This was strategically chosen due to the nature of home insurance.  The types of relationships one might have with household members is well-defined as there are legal implications for each specific relationship. Any relationships outside of that might cause a system error.

## Error Handling

If user input is invalid for age or relationship, a `<div>` is added to the form in order to tell the user what acceptable inputs look like. As a person is successfully validated, this error `<div>` is removed.
