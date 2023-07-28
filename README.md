# animos

<br>

animos is a platform designed to bring pet owners and their furry companions together, by allowing users to host and attend pet meetups in their local area, discover pet friendly locations and connect with others who share the same passion and affection for their pets.

**The Origin of “animos”** <br>
The name of our application, animos, is derived from a combination of letters from each of the team’s beloved (and spoiled) pets: C**a**ke, E**n**zo, Vol**i**, Mo**m**o, No**o**dle, Mar**s**.

https://maison99.gitlab.io/animos/

### Developed by:

- Anthony Woo
- Erick Watanabe
- Ethan Flores
- Paul-Adrien Epinette
- Samantha Chin

<br>

## Getting Started

To fully enjoy this application on your local machine, please make sure to follow these steps:

<ol>
 <li>Fork this repository </li>
 <li>Clone the forked repository onto your local machine by running the following command in your Terminal, inside the chosen directory:

```
git clone <gitlab-url-to-forked-repository-name-here>
```

</li>

<li>While in the current project directory, build and run the project with Docker using the following commands
<br>

```
docker volume create animos-db
docker compose build
docker compose up
```

Note: If you are running Docker on an Mac M1/M2 chip, be sure to use the following command instead:

```
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build
```

</li>

<li>Once the Docker volume, images and containers have been built, you will be able to access the webpage on your browser at http://localhost:3000/ </li>
</ol>

<br>

## Key Features & Functionality

### Key Features

- **Pet Meetups:** Users can organize and attend events happening in their local area.
- **Discover Pet-Friendly Locations:** Users can view a list of pet-friendly parks, beaches and recreational areas where they can host their events or attend with their pets.
- **Connect with Other Pet Owners:** Users can connect and stay up-to-date with one another by following each others' profiles.

### Functionality

- Users can sign up with an account, login and logout.
- Users can customize their profile by adding a profile photo (via URL), adding a pet and creating an event.
- When adding a pet to their profile, they can include a photo of their pet, share their pet’s birthday/adoption date, vibe, size and any dietary restrictions.
- On a user’s home page they can view a quick snapshot of their profile details, an events feed that has a list of events, an option to see a list of other users on the platform to follow, and a button to allow them to create an event.
- From the home page, in the event feed, they can click on an event card to view more details of a specific event.
- From the home page, a user can also click into ‘My Pets’ to view a list of pets currently added to their profile. They have the option to add another pet by clicking on the ‘Add Pet’ button.
- From the home page, a user has the ability to create an event by adding an event name, image, start and end date, description, capacity and select a location from a list of pet-friendly locations.
- The locations page provides a list view of pet friendly locations with the option to click into each one. As the ‘View Details’ button is clicked for a location, the details of that location will appear in a modal format, displaying the location name, an image, the zipcode, a short description, and capacity.
- The events page provides a list view of all user-generated events, alongside a create new event button. A user can view more details of an event by clicking a button that will then display an event’s details in a modal format, which include the start/end date, event capacity and a description.
  - If a user is hosting the event, the user has the option to either delete the event or edit an event's details.
  - If the event was not created by the user, they have the option to click on a button to attend the event.
- The find friends to follow page provides a list view of the application’s users. This allows for users to follow one another and view other users’ profiles.
  - From the find friends page, a user can view other user’s profiles, or access a user’s profile by entering the user’s custom ID at the end of the URL path. On the profile, they have the option to follow the user, as well as view a user’s pet(s) and event(s) that they are hosting.

## Application Design Details

<br>

<details open>
<summary>API Design</summary>

### API Design

FastAPI endpoints can be reviewed at http://localhost:8000/docs

### User Accounts

The accounts API allows the user to create a new account and edit/delete an existing account. At time of signup, users are required to enter an email, first name, last name, and password. The optional fields zipcode and picture_url can be provided by the user in the user profile. Follower list and following list track the user's that are following and whom they are following. The pets field tracks all pets created by the user. The hosted_events field tracks events created by the user. The attending_events field tracks any event(s) they are attending and that have been created by another user.

| Action                | Method | Path              |
| --------------------- | ------ | ----------------- |
| Get all user accounts | GET    | /accounts         |
| Create a user account | POST   | /accounts         |
| Get a user account    | GET    | /accounts/{email} |
| Update a user account | PUT    | /accounts/{email} |
| Delete a user account | DELETE | /accounts/{email} |

<br>

Get all user accounts (output):

```json
[
  {
    "id": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "password": "string",
    "zipcode": "string",
    "picture_url": "string",
    "follower_list": ["string"],
    "following_list": ["string"],
    "pets": ["string"],
    "hosted_events": ["string"],
    "attending_events": ["string"]
  }
]
```

Create a user account (input):

```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "password": "string",
  "zipcode": "string",
  "picture_url": "string"
}
```

Create a user account (output):

```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "password": "string",
    "zipcode": "string",
    "picture_url": "string",
    "follower_list": ["string"],
    "following_list": ["string"],
    "pets": ["string"],
    "hosted_events": ["string"],
    "attending_events": ["string"]
  }
}
```

Get a user account by email (input):

```json
    "email": "string",
```

<br>
Get a user account by email (output):

```json
[
  {
    "id": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "password": "string",
    "zipcode": "string",
    "picture_url": "string",
    "follower_list": ["string"],
    "following_list": ["string"],
    "pets": ["string"],
    "hosted_events": ["string"],
    "attending_events": ["string"]
  }
]
```

<br>

### Locations

The Location API allows the user to create a get a list of locations and a specific location's details. A location can only be created, deleted, or updated through the backend and not the frontend of the application. All fields are required to create a new location. A user must provide a name of the location, an accurate zipcode, description of the location, an estimated maximum capacity, and a picture.

| Action            | Method | Path            |
| ----------------- | ------ | --------------- |
| Get all locations | GET    | /locations      |
| Create a location | POST   | /locations      |
| Get a location    | GET    | /locations/{id} |
| Update a location | PUT    | /locations/{id} |
| Delete a location | DELETE | /locations/{id} |

<br>

Get all locations (output):

```json
{
  "locations": [
    {
      "id": "string",
      "name": "string",
      "zipcode": "string",
      "description": "string",
      "capacity": "string",
      "picture_url": "string"
    }
  ]
}
```

<br>

Create a location (input):

```json
{
  "name": "string",
  "zipcode": "string",
  "description": "string",
  "capacity": "string",
  "picture_url": "string"
}
```

<br>

Get a location (input):

```json
{
  "id": "string"
}
```

<br>

Get a location (output):

```json
{
  "id": "string",
  "name": "string",
  "zipcode": "string",
  "description": "string",
  "capacity": "string",
  "picture_url": "string"
}
```

<br>

Update a location (output):

```json
{
  "id": "string",
  "name": "string",
  "zipcode": "string",
  "description": "string",
  "capacity": "string",
  "picture_url": "string"
}
```

<br>

### Events

The Events API allows the user to create an event, edit/delete an existing event, as well as view a list of all events or specific details of an event. To create a new event the user must provide a name, description of the event, the intended/maximum capacity the host designates, picture, start and end date/time, and the location of the event. The user must select from a dropdown of pre-existing locations. A user may also create a location. Location is tracked by the location_id field. The account_id field tracks the user account that created the event. The attendees field tracks users that selected to attend an event via the user id.

| Action          | Method | Path           |
| --------------- | ------ | -------------- |
| Get all events  | GET    | /events        |
| Create an event | POST   | /events        |
| Get an event    | GET    | /events/{id}   |
| Update an event | PUT    | /events/{id}   |
| Delete an event | DELETE | /events/{id}   |
| Attend event    | PUT    | /events/attend |

<br>

Get all events (output):

```json
{
  "events": [
    {
      "name": "string",
      "description": "string",
      "capacity": int,
      "picture_url": "string",
      "date_start": "string",
      "date_end": "string",
      "location_id": "string",
      "account_id": "string",
      "attendees": [
        "string"
      ],
      "id": "string"
    }
  ]
}
```

<br>

Create an event (input):

```json
{
  "id": "string"
  "name": "string",
  "description": "string",
  "capacity": 0,
  "picture_url": "string",
  "date_start": "string",
  "date_end": "string",
  "location_id": "string",
  "account_id": "string",
  "attendees": [
    "string"
  ],
}
```

<br>

Create an event (output):

```json
{
  "id": "string"
  "name": "string",
  "description": "string",
  "capacity": 0,
  "picture_url": "string",
  "date_start": "string",
  "date_end": "string",
  "location_id": "string",
  "account_id": "string",
  "attendees": [
    "string"
  ],
}
```

<br>

Get an event (input):

```json
{
  "id": "string"
}
```

<br>

Get an event (output):

```json
{
  "id": "string"
  "name": "string",
  "description": "string",
  "capacity": 0,
  "picture_url": "string",
  "date_start": "string",
  "date_end": "string",
  "location_id": "string",
  "account_id": "string",
  "attendees": [
    "string"
  ],
}
```

<br>

Delete an event (input):

```json
{
  "event_id": "string",
  "user_id": "string"
}
```

<br>

Delete an event (output):

```json
{
  bool
}
```

<br>

Attend event (input):

```json
{
  "event_id": "string",
  "user_id": "string"
}
```

<br>

Attend event (output):

```json
{
  "id": "string"
  "name": "string",
  "description": "string",
  "capacity": 0,
  "picture_url": "string",
  "date_start": "string",
  "date_end": "string",
  "location_id": "string",
  "account_id": "string",
  "attendees": [
    "string"
  ],
}
```

<br>

### Pets

The Pet API allows the user to add a new pet and edit/delete an existing pet from the user’s profile, in addition to retrieving a list of pets or specific details of a pet. All fields are required. To add a pet, the user must provide the name of the pet, a birthday or adoption date, the breed, any dietary restrictions, the general disposition of your pet or vibe, and picture. The user_id field tracks which account created the pet.

| Action       | Method | Path       |
| ------------ | ------ | ---------- |
| Get all pets | GET    | /pets      |
| Create a pet | POST   | /pets      |
| Get a pet    | GET    | /pets/{id} |
| Update a pet | PUT    | /pets/{id} |
| Delete a pet | DELETE | /pets/{id} |

<br>

Get all pets (output):

```json
{
  "pets": [
    {
      "pet_name": "string",
      "birth_adoption_date": "string",
      "breed": "string",
      "dietary_restrictions": "string",
      "vibe": "string",
      "size": "string",
      "pet_picture_url": "string",
      "user_id": "string",
      "id": "string"
    }
  ]
}
```

<br>

Create a pet (input):

```json
{
  "pets": [
    {
      "pet_name": "string",
      "birth_adoption_date": "string",
      "breed": "string",
      "dietary_restrictions": "string",
      "vibe": "string",
      "size": "string",
      "pet_picture_url": "string"
    }
  ]
}
```

<br>

Create a pet (output):

```json
{
  "pet_name": "string",
  "birth_adoption_date": "string",
  "breed": "string",
  "dietary_restrictions": "string",
  "vibe": "string",
  "size": "string",
  "pet_picture_url": "string",
  "user_id": "string",
  "id": "string"
}
```

<br>

Get a pet (input):

```json
{
  "id": "string"
}
```

<br>

Get a pet (output):

```json
{
  "pet_name": "string",
  "birth_adoption_date": "string",
  "breed": "string",
  "dietary_restrictions": "string",
  "vibe": "string",
  "size": "string",
  "pet_picture_url": "string",
  "user_id": "string",
  "id": "string"
}
```

</details>

<details open>
<summary>Data Models</summary>

### Data Models

### User Accounts

| Field            | Type         | Unique | Optional |
| ---------------- | ------------ | ------ | -------- |
| email            | string       | yes    | no       |
| first_name       | string       | no     | no       |
| last_name        | string       | no     | no       |
| password         | string       | no     | no       |
| zipcode          | string       | no     | yes      |
| password         | string       | no     | yes      |
| picture_url      | string       | no     | yes      |
| password         | string       | no     | yes      |
| follower_list    | List[string] | no     | yes      |
| following_list   | List[string] | no     | yes      |
| pets             | List[string] | no     | yes      |
| hosted_events    | List[string] | no     | yes      |
| attending_events | List[string] | no     | yes      |

<br>

### Locations

| Field       | Type   | Unique | Optional |
| ----------- | ------ | ------ | -------- |
| name        | string | no     | no       |
| zipcode     | string | no     | no       |
| description | string | no     | no       |
| capacity    | string | no     | no       |
| picture_url | string | no     | no       |

<br>

### Events

| Field       | Type         | Unique | Optional |
| ----------- | ------------ | ------ | -------- |
| name        | string       | no     | no       |
| description | string       | no     | no       |
| capacity    | int          | no     | no       |
| picture_url | string       | no     | no       |
| date_start  | string       | no     | no       |
| date_end    | string       | no     | no       |
| location_id | string       | yes    | no       |
| account_id  | string       | yes    | no       |
| attendees   | List[string] | no     | no       |

<br>

### Pets

| Field                | Type   | Unique | Optional |
| -------------------- | ------ | ------ | -------- |
| pet_name             | string | no     | no       |
| birth_adoption_date  | string | no     | no       |
| breed                | int    | no     | no       |
| dietary_restrictions | string | no     | no       |
| vibe                 | string | no     | no       |
| size                 | string | no     | no       |
| pet_picture_url      | string | no     | no       |
| user_id              | string | yes    | no       |

<br>
</details>

<details open>
<summary>UI Wireframe Design</summary>

### UI Wireframe Design

[View the Wireframe Design on Excalidraw](https://excalidraw.com/#room=6773be450a679227ae55,tBqxSCRKN8636vn8upbDRw)

![Excalidraw Wireframe Image](/animos/api/docs/images/animos-excalidraw-wireframe.png "Excalidraw Wireframe")

</details>
