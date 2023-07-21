## 7/21/23 Finished delete event from hosted_events

I also got to learn more about git and divergent branches/ Honestly still a little confused, but I know more. But I have merged, mine, Sam's, and Ethan's code. I do feel I got some extra practice at the merge editor in VS code and using the terminal together. I sent a MR (merge request) to Ethan. I've also been working with Anthony on linting errors over slack.

## 7/20/23 Delete button for Event Modal

The delete button is functional on the event modal. Displays a success message that the event has been deleted and updates the event list when the close button is clicked. The event is _not_ deleted off the hosted_events on that users account. Will start coding that now. I finished the functionality of the delete event button for when a user deletes an event that they created. The button successfully deletes the event off the events db and the user's hosted_events list in the accounts db. At the end of the day I merged Sam and Ethans code, and deleted my code. I got to learn more about git and found a possible way to get back my changes, but have run out of time. Will fix tomorrow.

## 7/19/23 Merged EventDetail Component into EventsList

Reviewed Anthony's EventDetail component, it can be integrated into my EventsList component. Successfully integrated EventDetail as a modal in the EventsList component when "view details" is clicked. Added classNames to Event modal and EventsList.css to correctly display Sam's Styling. Starting on front end functionality for the delete button in the modal in `event-list-front-delete` branch.

## 7/18/23 Merge Conflicts

The whole day was spent fixing merge conflicts. But I should be up to date now. The rest of the group is also up to date.
Things I learned today:
I've learned to not do the commit and push stages in vs code and do them in the terminal.
Also, to make sure to pull from main every morning.
`git checkout -` will bring you to the last branch you were on. So if your working on your local branch go to main and pull, you can type that and go back to your work without needing to remember the name of the branch

## 7/17/23

Working on the EventsList component, the modal pops up when event details button is clicked. I have a hard coded modal portion, but I'm going to pass Anthony's event detail component to display as the modal as he made that last week and has some functionality in it.

## 7/15/23 Catching up and Making cards for events in EventsList

I'm investigating a cors error. "Access to fetch at 'http://localhost:8000/api/events' from origin 'http://localhost:3000' has been blocked by CORS". It turns out no to be a cors error, and that an event saved in the database was saved as a string instead of a datetime obj. Once that event was deleted everything worked again. I've updated the EventsList component to display the locations name instead of id for each event.

I've started to make the events into cards to be displayed. I created a EventsList.css file and copied Sam's styling from her Location's styling. I figured it would be good to be consistant, plus sam's eye for display's is far better than mine. I may tweek some sizes as there are more detials in the events.

I think I may need to start working in rooms by my self. With out my teamates chiming in for there on thing, and not having someone immediatly available to ask question will help me be faster over all.

I'm stuck on getting the cards to be wider. I've created an event with a lot of text in case the issue was all the example data was just too small.

## 7/14/23

Not sure how but most of my journal entries have not made it into the most recent version of main. I will also keep a seperate log of these entries just in case. Today we merged many different components. With the new merges, I'm back to working on the EventsList component and am planning on making the cards and eventually the modal to pop up when the event is clicked from the event list. Also, I realized that I was not correctly displaying the image of the event, that has been fixed. I'm also getting concerned at my pacing compared to my team mates. They all work very fast.

## 7/13/23

I finished the basics of the EventList component, with links correctly navigating to "create event" and details of the event when clicked. The group decided its complete enough to be merged.

## 7/12/23

I reviewed Sam's merge request and everything was all good. I started making the Events List Component. Succesfully got data from the database with a fetch call in app and passed the event data to EventsList to have it displayed on the page in a table.

## 7/11/23 Events Backend Endpoints and Error handling

Today I built the delete for a event. Discovered that for delete_one's cursor that is returned has a deleted_count property and its the way to tell if something has been delete: IF result.deleted_count > 0. After me and Anthony merged our branches we discovered that our get and put methods will give a 500 response when a document doesn't exist by that id. We plan to tackle this tomorrow.

## 7/10/23

Today I worked with Anthony on the backend points for the Events API with some paired programing. We created the pydantic models for EventsIn, EventsOut, and EventsList. We also made the create event, get a event, and list of all events endpoints for our events.py in the queries and routers folders. Also, today I realized that we have to be doing journal entries about what we have been doing, so Journal entries start today!
