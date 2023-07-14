## Sam Chin Journal Entries

## Thursday, July 13, 2022
Today I worked on the Locations List & Detail view! After seeing the excitement from my teammates and their ability to create responsive front-ends through connections to the database, I wanted to tackle a page that would involve this as well (opposed to the landing page).
I was able to follow along a helpful YouTube tutorial on how to create card views, and utilized Anthony's locations loadLocations, to pass in as props for my Locations List view.
Since we discussed as a team that we'd want to incorporate Location Detail view as a Modal, I worked on this as well. I found documentation online to help style the modal.
There is still some styling to be done, but I feel accomplished with getting the functionality of both the Location List View and Detail complete today.


## Wednesday, July 12, 2023
Today I worked on the landing page, to ease into front-end work! I created a separate NavBar component that is specific to the landing page, and includes links an About, Team, Login and Sign Up pages (blanks for now). I utilized grid formatting to help keep the contents structured on the page.

## Tuesday, July 11, 2023

Today I worked on:

- Getting over a blocker of not being able to access my ghi-1 container (localhost:3000). I kept receiving a TypeError within my node_modules. After multiple attempts of deleting my volume, images and containers and rebuilding them to restarting my computer, it still wasn't working.
- I'm very thankful for Rosheen being patient with me and my issue, as we tried different attempts. After trying the following solutions, it was finally able to work. (Listing them out below in case of future reference).
- Reviewing this simple blocker made me realize that although it takes quite a lot of time to review and assess what causes an issue, it's always helpful to document and write down the steps that were taken to resolve it, in case we come across it again.

Solution:
- Switch to main branch (same as repo main) to ensure it is an environment issue and not code.
- Run commands
```
docker compose down --remove-orphans
docker network prune
docker container prune
```

* Check docker desktop and delete all of your containers and images and volumes
* Upgrade Docker to latest version
* Allocate more memory / CPU usage to Docker (optional, but may be necessary?)
* Removed ghi > package-lock.json and ghi > node_module directory; ran npm install in ghi directory
* Create volume
* Utilize M1/M2 Docker-Build command
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build
* Run command
```docker-compose up```


## Monday, July 10, 2023

Today I worked on:
- Redid the backend API endpoints for Locations by following the format that was taught in class and in Learn. I also found helpful documentation online so that my queries and routers files for Locations was in their respective folders.
- There were a few "hurdles" along the way where I would get 500 Internal Server Errors when testing the APIs in the localhost:8000/docs GUI, but opening Docker Desktop and reading the errors were helpful in resolving any issues.
- Reviewed PA's merge request as he finalized backend auth for our group. Everything worked according after testing with his clear documentation.

## Friday, July 7, 2023

Today I worked on:

- Watched and followed along tutorials on how to set up CRUD operations using MongoDB and FastAPI. THe method was different compared to what we were exposed to in Learn and in class, however I found this most helpful and easier to understand the code and purpose of it.
- Although it wasn't via code, I was able to design out the landing page in Keynote with the color schemes and imagery, content and nav bar.


## Friday, June 30, 2023

Today I reviewed videos on Learn to follow along on setting up backend auth. Most of the documentation and resources we were given were mainly for PostgreSQL. Since we are utilizing MongoDB as our database, this was a bit of a challenge. Erick, Ethan and I were in a separate breakout room coding along to the tutorial.