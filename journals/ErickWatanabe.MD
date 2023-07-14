## Journal for Erick Watanabe

## 7/13/23 Websocket Suggestions

I suggested using websockets for events, allowing attendees to chat in real time in preperation, during, or after for the event. The group liked my suggestion and is obviously a stretch goal.

## 7/12/23 Front Events List

Today I built the basics of the Event List compomnent, including the fetch call in app.js. The component has a button that links to the "Create Event" endpoint. Something I re-learned is that when making the fetch call to localhost you have to include http:// in front.

## 7/11/23 Events Backend Endpoints and Error handling

Today I built the delete for a event. Discovered that for delete_one's cursor that is returned has a deleted_count property and its the way to tell if something has been delete: IF result.deleted_count > 0. After me and Anothony merged our branches we discovered that our get and put methods will give a 500 response when a document doesn't exist by that id. We plan to tackle this tomorrow.

## 7/10/23 Events Backend Endpoints

Today I worked with Anthony on the backend points for the Events API with some paired programing. We created the pydantic models for EventsIn, EventsOut, and EventsList. We also made the create event, get a event, and list of all events endpoints for our events.py in the queries and routers folders.
