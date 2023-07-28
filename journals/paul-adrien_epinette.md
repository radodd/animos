# ANIMOS Coding Journal

## Week 14 Day 1

As a group we collaborated on the following aspects:

- Wireframe
- API endpoints
  With what we managed to achieve and having completed our MVP form, we felt ready to present and collect feedback.
  To gain some time I went ahead and drafted features and user stories based on our MVP plan.

## Week 14 Day 2

We were able to collect some insightful feedback from presenting that helped us refine our wireframe and API end points.
We plan to review features and user stories the following day.

## Week 14 Day 3

I drafted features and user stories to encompass all aspects of our mvp.
As a group we managed to set up and link our MongoDB database to our project.
We then took the afternoon to review all of the features and user stories as a group, polish them, and port them in Asana (our Project management tool).

## Week 14 Day 4

We spent the day trying out setting the authentication and some endpoints for our project.
While I succeeded in writing the end points I wanted, the format was not ideal as everything was condensed into one file, and we decided to adopt Anthony's format involving queries and routers folders.

## Week 15 Day 1

During the break I worked on the authentication for our project, and managed to get a user sign up / login / token grab / and logout to work.
Sam also had worked during the break to start with some endpoints, and that gave us a strong starting point for the week to come.
We decided to tackle all of the end points for this week, and possible start on the front end if we managed to finish the backend earlier than anticipated.
As I managed the authentication, I was in charge of adapting the endpoints to edit / fetch / delete a user's information.

## Week 15 Day 2

Following the same plan defined on Day 1, I continued to struggle with the PUT method to change a user's information (email / password etc..).
Thanks to Zach, I was able to comprehend the debugging techniques and apply them to slowly find and resolve the issues in my code.
Once my PUT method was successful, I was able to continue and finish my GET and DELETE method, and requested a merge request.

## Week 15 Day 3

Now that I have been able to finalize the backend authentication, and we almost completely finished our backend, it was time to bring our functionalities to the frontend. While the rest of the group started working on the frontend implementation of our endpoints, I stuck with authentication and aimed to complete its frontend implementation by the end of the week.

## Week 15 Day 4

Working with the JWTDown library has proven to be more challenging than anticipated, especially with its library. Though it gave me a chance to dig deeper into its source code, and thanks to Caleb's help, we were able to create a typescript file into our project to override the necessity of the automatic login after signup up a user to accept an email instead of a username. A merge request was sent during the evening.

## Week 15 Day 5

Not much time allocated to the project between the lecture and social hack hour, though we managed to squeeze in some merge request reviews and after my groupmates fetched my committed version of the frontend auth, they kept having the same issues I had been experiencing where the login feature wouldn't fetch the correct base url, luckily it was swiftly fixed by renaming the .env.sample to .env and rebuild their docker image for the features to correctly work for them as well.
We are all happy with our current progress, and are ready for some more frontend implementation for the following week.

## Week 16 Day 1

Now that the frontend authentication is also functional, I wished to create a user profile page in accordance to our wireframe.
Encountering issues to display the user info properly.

## Week 16 Day 2

Found a way to display the user info properly, the problem lied in the fact that I was trying to fetch data while the use effect hook just initialized, and therefore was not getting anything. It was fixed by adapting my code with e.g. (`user && user.mail`).

## Week 16 Day 2

The backbone of the user profile page is done. Now I will attempt to make use of the accounts backend endpoints to try and edit the user info.

## Week 16 Day 3

Today we have experienced a lot of gitlab issues and spent the afternoon as a group to remedy to those problems.

## Week 16 Day 5

The past two days have been spent to figure out why my user edit PUT request would work properly in the backend, yet would not display correctly in the front end. I have discovered that the reason this was happening was because we are fetching user data based on the token information. And even though the backend is properly updated with the PUT method, the state of the token info remains the same.
Thanks to the seirs and Zach, I have now a working solution for this aspect and I am ready to move on to the next task.

## Week 17 Day 1

Redux was introduced and implemented in our project, and my solution from the week before now make my user page to loop infinitely.
We have spent the whole afternoon trying to figure out a way to resolve that issue without success. My user edit functionality is not working anymore.

## Week 17 Day 3

After reaching out in help me understand and within the team, my issue is still not resolved, and while I try to work on other aspects, this functionality is at the core how what my page aims to do so its difficult not to spend most of my time trying to resolve that issue.

## Week 17 Day 4

Spent the past few days to try and resolve my edit profile issue while polishing the user page. The presentation did not go so well, having our deployed backend die on us while I was presenting did not help. After the presentation I went back to trying and solve my issue and found a way to display the information correctly after the PUT method, and no infinite looping of the page.

## Week 17 Day 5

Last day, added a delete account function to my front end user profile page, reviewed and polished my code for error handling and made sure everything is functional.
