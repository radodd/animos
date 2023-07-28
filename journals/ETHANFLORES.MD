# Ethan Flores JOURNAL

## 7/28/2023

Successfully implemented delete functionality of pet list. When user deletes pet from list of pets the pet instance is also deleted from the user data. Unable to complete an edit form. Reason was an error that reported the edit modal is called to open more than once. Sending MR as is and will work towards more successful implementation of edit modal in the future.

## 7/26/2023

Team completed numerous merge request throughout the day. Finally able to have a profile page render on the frontend. Many issues sucking one member of the team away for a majority of the project. Some lessons learned...

## 7/25/2023

Submitted MR for pet view on the home page and list all pets endpoint. MR was approved.

## 7/24/2023

Working to submit MR tomorrow. Goal is to have only the logged in user pets render at the home page in the pets card. The card will contain the image and name of the user's pet. Additionally worked on the list all pets endpoint. Changed the view to render all pets in a card view.

Refactored entire front end to utilize Redux. Was unable to implement delete function with Redux. This feature is not MVP.

Able to successfully write and pass first written tests for list all pets

## 7/17/2023

Worked on branch management on my end. I ended up setting up two features (pet list and create pet) on one branch. Working to separate features into individual working branches to be committed one after the other. Sent merge request to approve create pet form. As it is now, the code does not connect with a given user via user id. Later I will connect user information once the user profile is created....

## 7/13/2023

Planned: In order to resynchronize the front end we will confirm a merge request as a group and continue to build the front end afterwards.

## 7/12/2023

The group broke off to tackle their respective sections on the frontend now that all our endpoints have been completed and pushed to main. I personally still have trouble remembering the git commands and when to push, pull, fetch, etc. The team has been extremely helpful with those commands.

This evening I have created a temporary List Pets frontend. I wanted to ensure I was able to reach into the database and pull data. Tomorrow we will discuss our findings and work on consistency in the frontend.

## 7/11/2023 PET ENDPOINTS

I was assigned to complete all /pets endpoints. After Anthony's help with one endpoint I was able to have the rest of the /pets endpoints done and ready for review by end of day. The team ran into a couple blockers that were both resolved by end of day. One docker issue and another technical bug regarding database changes not correctly updating with no errors.

## 6/29/2023 MONGO DB GROUP DEBUG

I "drove" during the debug session while the rest of the team "navigated". The team make quick work of the error messages and we had MongoDB up and running at 100% in no time. Once we collectively agreed MongoDB was successful I pushed my code to main so the rest of the team were caught up.

## 6/28/2023 MONGO DB SETUP

Experimented with MongoDB tutorial solo and was able to successful run the database on docker and had localhost:8081 render on the browser. Decided to report to the group the following day with my progress and suggest a group debug session in order to complete the entire DB set up.
