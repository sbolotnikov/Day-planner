# 05 Third-Party APIs: Work Day Scheduler

Create a simple calendar application that allows the user to save events for each hour of the day. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

You'll need to use the [Moment.js](https://momentjs.com/) library to work with date and time. Be sure to read the documentation carefully and concentrate on using Moment.js in the browser.

## User Story

```
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

## Acceptance Criteria

```
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```

The following animation demonstrates the application functionality:

![day planner demo](/assets/third-party-apis-demo.gif)

## Review
overall process GIF
![day planner demo](/assets/demo-result.gif)
view of the day panel
![day planner demo](/assets/1-day-view-panel.png)
appointment edit form
![day planner demo](/assets/2-appmt-edit-form.png)
added appointment
![day planner demo](/assets/3-added-appmt.png)
click to edit appointment
![day planner demo](/assets/4-click-to-edit-on description.png)
editing appointment
![day planner demo](/assets/5-edit-apptmt-view.png)
click to erase
![day planner demo](/assets/6-click-to-erase.png)
erased view
![day planner demo](/assets/7-erased.png)



* The URL of the deployed application.
 https://sbolotnikov.github.io/Day-planner/

* The URL of the GitHub repository. 
https://github.com/sbolotnikov/Day-planner

- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
