# ANTHONY WOO JOURNAL

## 6/30/2023 MONGO DB SETUP

After our group was able to setup mongodb in a docker container, I was able to test out a couple sample queries to delete, create, and get data from the database. Once I felt I had a good grasp on things, I reported back to the group to collaborate and discuss our individual findings.

## 7/10/2023 Create API endpoints for events

As a group we had reviewed AUTH for our app and decided that it was ready to be merged to main.

Today, Erick and I had a pair programming session to go through API endpoints for the events collection. We created a file called events.py in both the queries and the routers folders. We started with created a basic pydantic model for an event (EventIn, EventOut). Collaboratively, we successfully created methods to post, get_by_id, get_list for events. Separately I will work on the put method for events.

## 7/11/2023 Finalize backend endpoints

As a group we were able to complete more endpoints for the backend and get them merged to main. I was able to get the update endpoint working for the the events collection. I pair programmed with Erick to ensure that both the delete and the update endpoints were complete and functioning.

Following merging to main, I spent some time exploring better error handling for our endpoints. Alas, I was unable to come up with anything quickly and so I decided to move on to more pressing features.

## 7/12/2023

I started working on a front end component to create a new event. I started with creating a js file in a new folder within ghi. The component consists of a form with the relevant fields and the location menu is populated from props passed to the component from app.js. A function was made called loadLocations that make the api call to get the list of locations and stores it in state. A merge request was made when I was able to confirm that everything works. I opened a new bug to deal with including the users data when creating a new event (which will be handled in the future).

## 7/13/2023

Today I worked on making a front end component to show the details of an event based on the id from the url. I used the hook useProps to get the id from the url address and use the id to make a loadEvent api call to get a single event by id. Additionally, using the location id, another api request is made to get the entire location object. I was able to confirm that everything looks right and will be planning to make this into a modal component in the future but made a merge request at this moment and the component view is accessible via route path.

## 7/14/2023

Today, our group was able to finalize and merge front end auth to our project. With auth being completed we are now able to log in and get the users data from the front end and include it when creating database documents. I went back to working on the create event component and was able to get the user data via api request and include it in the api request to post a new event document.
