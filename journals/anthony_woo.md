# ANTHONY WOO JOURNAL

## 6/30/2023 MONGO DB SETUP

After our group was able to setup mongodb in a docker container, I was able to test out a couple sample queries to delete, create, and get data from the database. Once I felt I had a good grasp on things, I reported back to the group to collaborate and discuss our individual findings.

## 7/10/2023 Create API endpoints for events

As a group we had reviewed AUTH for our app and decided that it was ready to be merged to main.

Today, Erick and I had a pair programming session to go through API endpoints for the events collection. We created a file called events.py in both the queries and the routers folders. We started with created a basic pydantic model for an event (EventIn, EventOut). Collaboratively, we successfully created methods to post, get_by_id, get_list for events. Separately I will work on the put method for events.
