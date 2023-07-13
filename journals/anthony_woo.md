# ANTHONY WOO JOURNAL

## 6/30/2023 MONGO DB SETUP

After our group was able to setup mongodb in a docker container, I was able to test out a couple sample queries to delete, create, and get data from the database. Once I felt I had a good grasp on things, I reported back to the group to collaborate and discuss our individual findings.

## 7/10/2023 Create API endpoints for events

As a group we had reviewed AUTH for our app and decided that it was ready to be merged to main.

Today, Erick and I had a pair programming session to go through API endpoints for the events collection. We created a file called events.py in both the queries and the routers folders. We started with created a basic pydantic model for an event (EventIn, EventOut). Collaboratively, we successfully created methods to post, get_by_id, get_list for events. Separately I will work on the put method for events.

## 7/11/2023 Create API endpoint to update event

I was able to get a working endpoint to update event information. It was tested and submitted a merge request after touching bases with Erick on the delete event endpoint. We spent some time defining our groups best practices for resolving merge conflicts.

## 7/12/2023 Front End implementation to create event

Today our group finalized the backend (at least for now) and decided to move on to work on creating front end components. I created the component to create a new event. The component takes in a list of locations as props to populate the dropdown menu items for location. loadLocations function is called from the App.js file. On submit of the form, a fetch (POST) request is successfully made to add the event to the DB. I had issues at first with the post request since the pydandic model strictly required datetime for the start and end date fields. I decided it made more sense to make the database field just be a string instead.
