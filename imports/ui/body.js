import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './body.html';

Template.body.helpers({
  tasks() {
    // Show newest tasks at the top
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
    'submit .new-task' (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;
        const date = target.date.value;
        const location = target.location.value;
        const description = target.description.value;

        // Insert a task into the collection
        Tasks.insert({
            text,
            createdAt: new Date(), // current time
            date,
            location,
            description,

        });

        // Clear form
        target.text.value = '';
        target.date.value = "";
        target.location.value = '';
        target.description.value = "";
    },
});
