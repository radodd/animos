
## Sam Chin Journal Entries

## Monday, July 24, 2023
Today I worked on cleaning up some lint issues for our build-front-end-job deployment as well as worked on the unit tests for locations. After rewatching Paul's unit test lecture as well as reviewing the FastAPI documentation, I was able to successfully write two unit tests for locations - get locations as well as create locations. Initially, my tests were failing due to typos and not correctly matching either the url or function name in my queries/routers files for locations. Once I made those edits, my tests were passing after running python -m pytest. After successfully passing those tests, when I had initially pushed my merge request to also test the api-unit-tests-job defined in our gitlab-ci.yml file, they failed. I was getting a KEYERROR and couldn't figure out what was causing the issue. After posting in help-me-understand, Caleb was able to help me figure it out and we needed to add in the variables DATABASE_URL and SIGNING_KEY to the unit-test-job. After pushing my code again and rerunning the test, it successfully passed. I'm excited that I was able to get the tests to pass on both ends and will be sharing my files so that the team can create their unit tests as well! 

## Thursday, July 20, 2023

Today I submitted a merge request, as I finished working on the overall Main Page / Center Feed (create event button modal and also the event cards displayed). I finally got the event detail modal to appear properly - if the logged in user created the event, they will see delete/update buttons, and if they did not create the event, they should see the option to select the attend button. I was able to resolve this bug with the help of my teammates and ensuring that the proper "user" props was passed.

## Wednesday, July 19, 2023
Today I worked on the Create Event button in the Main Page / Center Feed, so that when clicked, it would display the Create Event form that Anthony had initially created. It was easy to import his component into my MainPage file and adjust with CSS styling to have it appear as a modal. I also began working on the event cards that are also displayed on the main page, center. I initially had placeholders, but was then able to display the event creator's first and last name, as well as bring in the EventDetail component that Erick had created in the form of a modal as well. The event detail modal is set to appear when the corresponding event card body is clicked.

## Tuesday, July 18, 2023

Today I walked the team through the front end main page code that I worked on the previous day. I had divided up the main page into separate files focusing on the left/center/right of the page so that it'd be easier for my team to work with and avoid any merge conflicts. The rest of the day, Ethan, PA and myself had worked through a GitLab merge concerns where merges were being blocked. PA was able to help save the day and resolve it!

## Monday, July 17, 2023

Today I came across another blocker with Docker (again..) after completing Ethan's merge request for Pets List. Thankfully I had noted the steps to take when I experienced this issue last week - pruning all containers, networks, images, volumes, restarting laptop, removing package-lock.json/node_modules, rebuilding.
Once I was all set, I embarked on building out the newsfeed/main page view. Although I was quite intimidated at first, I was able to find a template via Bootstrap and implemented that. It has been fun working with Bootstrap & CSS styling to get things to look like how we sketched it out in our wireframe, and bring it to life!

## Friday, July 14, 2023

Today was a shorter project working session due to lectures and the social hack hour; I reviewed merge requests with both Anthony & Ethan. Also, we were able to spend time with PA to ensure a token is properly grabbed for a user as they sign up (removing .sample from the .env file)

## Thursday, July 13, 2023

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

- Check docker desktop and delete all of your containers and images and volumes
- Upgrade Docker to latest version
- Allocate more memory / CPU usage to Docker (optional, but may be necessary?)
- Removed ghi > package-lock.json and ghi > node_module directory; ran npm install in ghi directory
- Create volume
- Utilize M1/M2 Docker-Build command
  DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build
- Run command
  `docker-compose up`

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
