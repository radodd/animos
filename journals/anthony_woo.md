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

## 7/17/2023

Today I revisited the createEvent form to implement better front end handling so that the fields cannot be left blank and that the values are all valid. I also refactored eventDetail and createEvent so that they can be used as a modal. Event detail would now work as long as it gets an event, location and the current user as props. CreateEvent would work as long as it gets a list of locations and the event.

## 7/18/2023

Today, our group continued to work on building react components. I refactored app.js so that the user data and list of accounts would be accessible to the front end components. It was becoming very apparent that our app was starting to become heavily reliant on complicated prop drilling and that there is a great use case for redux implementation. I split off from the group to dive into an exploration of implementing redux into our application. Following the RTK docs, I started with creating a file for the data store called data.js. The store would be implemented and made available App.js and its child components by wrapping the App component in a RTK Provider tag that passes the store as props to app. The store holds the state and is updated by reducers. All this I was able to understand however, our use case departs from the tutorial because the data comes from an API call. I suspect this has something to do with an action however I am not sure how to implement this.

I got help form Rosheen and she was able to walk me through the process of implementing a api call from the component and using dispatch to update the global state. Although, state was not quite updating automatically as expected and we had to implement a sort of hacky fix to get things to work on our test case.

For now, I am not satisfied with the current solution to redux implementation and will try to refine my understanding of redux and how to implement it more effectively.

## 7/19/2023

Today, our group continued to work on building react components. I broke off from the group to go heads down on trying to figure out deployment. I went through the dockercompose and gitlab yaml files to make preparations for deployment. I also went through all of the front end api fetch calls to change the url to use env variables rather than hard coding localhost. Alas, I had issues with deployment since the glv-cloud-cli was not yet setup for our cohort. I feel like I lost a lot of time because of this since I was trying to resolve unresolvable issues. Oh well...

## 7/20/2023

Today our group kept working on building front end components. I spent some time showcasing to the group on how I was able to use a mongoDb push method to add an event_id to the list of attending events on the user. I created a custom endpoint at put events/attend which would execute a new query that adds the event-id to the users list of attending_events. Additionally, the endpoint also executes the query that will add the users id to the events list of attendees. Initially, I had trouble with this implementation until i realized that the query was trying to push the event id to attending_events which is null as default when the account is created. I resolved this by changing the front end implementation of createAccount to have default values of empty arrays rather than null.

I also was able to apply the same methodology to CreateEvent feature where when a user creates an event, the event id will be added to the users list hosted_events and also the users id is added to the events account_id attribute.

Finally, I got back to working on deployment of our app using cirrus. I spent much of the day getting rid of linting issues so that the pipeline would pass. By the end of the day, I was not successful in being able to confirm that the deployment was successful or correct but there is indeed two services shown as deployed in the list. I suspect there was an issue in the commands to deploy the database and fastapi. I posted in HMU and hopefully I can work towards getting it up and running early next week.

## 7/21/2023

Today, I decided to revisit redux implementation with great success. To implement redux, I first started with creating a store.js file which defines the apps data store by using CreateStore from the redux library. Store is implemented in index.js and made available to App by wrapping App in a Provider tag and passing in store as props. Next I created a file that will hold the slices files where each data will get a slice... locationSlice, eventSlice etc. the slice files are what creates the unique data slice on the store. In order to populate the slice with data, I created an action for each slice in a separate action folder. The actions are what makes the api call and uses dispatch to set the values in state. I called the dispatch to fetch the data in app.js as a useEffect with dispatch in the dependency array which will load all of the data on page load. The global state is now accessible by all of app.js child components via useSelector.

I have begun implementation of redux to the child components by removing props from each component and using the global state instead. At this point I am confident that we can implement this to every component but I have not yet confirmed if all of the apps are still fully functional. I ran into an interesting bug where it appeared to be having cors issues when creating an event. I came to realize that it was happening because it was trying to add the event id to the users attending_events list which was null. This was fixed by creating a new user which now will have default value of [] for attending_event rather than null.

## 7/24/2023

Today, a good chunk of the day was spent on the practice exam. However, I was able to introduce to the group on my efforts towards redux implementation and showed them how to implement on the remaining components. Following that, I refocused my efforts on linting issues with the front end build. They are almost there however I am running into an issue with a file that we did not make. We are getting blocked on the front-end-build job because of a eslint error regarding missing dependencies. I posted in HMU and hopefully can get it resolved quickly.

## 7/24/2023

I started today working on more redux implementation to the front end components. I also spend most of the morning and early afternoon trying to help PA get unblocked with his front end component which was having a lot of issues with implementing redux and so we attempted to isolate the component from redux state and just utilize local react state. This so far has not worked.

Additionally, I was able to get the front end deploy done by adding a eslint rule to ignore the offending file. The deploy was good but we have a couple issues with the links as they were not using the react link tags and instead a tags with hrefs. I changed those and will be waiting on an MR to confirm if that did the trick.
