# User stories

## Story 1

As a **refinement team member**, I want to **easily find tasks that meet
my desired criteria** so that I can **select work to do**.

### Acceptance criteria

* Card representations on the board (not modal) display the most important relevant details: thumbnail, number of structures, difficulty rating.
* Card modal contains a link to work on the task, and more possibly more detailed information: notes and additional metrics. Depending on emerging development challenges, modal development may be postponed and the card may simply linke to the task.
* Only the lists relevant to the user role will be displayed. In this case, a "To Do" list, an "In Progress" list containing only the card(s) for the current user, and a "Done" list, containing only the card(s) for the current user.

## Story 2

As a **team leader**, I want to **easily see the status of all ongoing tasks**
so that I can **perform initial passes and final reviews of my team members' work**.

### Acceptance criteria
* All lists will be displayed to users with the "team leader" role. Team leaders should have access to all lists, as they assist in all stages of the process.
* All cards will be displayed to users with the "team leader" role, this may be necessary as team leaders may be assisting other teams' members.
* Card representations on the board (not modal) display additional details to those described in the [Story 1](#story-1) acceptance criteria: cards display the current user and team descriptor.
* All cards can be moved between all lists by users with the "team leader" role.

## Story 3

As a **pathologist**, I want to **easily find the tasks relevant to my role**
so that I can **select work to do**.

### Acceptance criteria

This acceptance criteria is identical to the acceptance criteria for the 
users in the "refinement team member" role, with the primary differences being
in the content that is exposed.

* Card representations on the board (not modal) display the most important relevant details: thumbnail, number of structures, difficulty rating.
* Card modal contains a link to work on the task, and more possibly more detailed information: notes and additional metrics. Depending on emerging development challenges, modal development may be postponed and the card may simply linke to the task.
* Only the lists relevant to the user role will be displayed. In this case, a "To Do" list, an "In Progress" list containing only the card(s) for the current user, and a "Done" list, containing only the card(s) for the current user.

## Story 4

As a **project manager**, I want to be able to **view and manage all tasks for the project** so that I can **ensure work is available and tracked for all other roles**.

### Acceptance criteria

* All cards can be edited by users with the "project manager" role.
* All cards can be moved between all lists by users with the "project manager" role.
* Cards can be added or archived by users with the "project manager" role.
* All lists will be displayed to users with the "project manager" role.
* All cards will be displayed to users with the "project manager" role.
* Card representations on the board (not modal) display additional details to those described in the [Story 1](#story-1) acceptance criteria: cards display the current user and team descriptor.

# Mis-user stories

## Story 1

As a **refinement team member**, I want to **add all the cards in the To Do list to my In Progress list** so that I can **make it impossible for anyone else to do any work**.

### Mitigation criteria

* Users with the "refinement team member" role will limited to only having 1 card in their "In Progress" list.

## Story 2

As a **refinement team member**, I want to **add all the cards to the "Done" list** so that I can **make it impossible for all other refinement team members to do any work**.

### Mitigation criteria

* Users with the "refinement team member" role will be limited to 10 PATCH calls at the `kanban/cards` endpoint per day.

## Story 3

As a **vindictive team leader**, I want to **cause a major disruption by moving cards around to lists incorrectly and modifying card data** so that I can **cause delays and damage to project operations**.

### Mitigation criteria

* Kanban board data is quite small and can easily be represented in plain text (JSON, or other), and changes can be tracked with `git`: each change can cause a commit, and then any destructive actions can be easily reverted.
