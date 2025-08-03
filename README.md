[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/UYURZR7U)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=19966693)
# Project Deliverable 3

## Summary: 
Implement the final React/NodeJS/MySQL app.

## Development Tips:
- Use CodeSpaces for this project.
- In VSCode terminal on CodeSpaces start a new branch:
```git checkout -b d3```
- As you code, push daily changes to your GitHub repo's `d3` branch:

```
git add .
git commit -m "done feature xyz"
git push origin d3
```

## Deliverable 3 Guidelines

1. Write the NodeJS part of your code in `server.js` 

2. D3 must have the following main React components: App, Review, Search, MyPage. You may create as many additional components as needed.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Four components (Landing, Search, Review, MyPage) correspond to four pages in your rendered app. You must use React client-side routing (follow the example covered in Lect10-2) to navigate between these pages. The pages must have the following paths (case-sensitive):

| Component | Path      |
|---------- |---------- |
| Landing   | /         |
| Search    | /Search   |
| Review    | /Review   |
| MyPage    | /MyPage   |

  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Here, `Path` represents the affix that will appear at the end of the URL when you navigate to that page. For example, when you use client-side routing to navigate to Search, you will see:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `http://myURL.com/Search`

3. All four pages in your application must have a Material UI Appbar (https://mui.com/material-ui/react-app-bar/) at the top of the page with four buttons routing the user to `Landing`, `Search`, `Review`, and `MyPage`. Use **MUI Button** element for each route navigation. The App bar must be visible and fully-functional on all pages described in points 5-8. The following `id` tags must be assigned to the navigation buttons present in the App bar:
   
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `Landing` MUI Button: id="nav-landing"
  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `Search` MUI Button: id="nav-search"
  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `Review` MUI Button: id="nav-review"
  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `MyPage` MUI Button: id="nav-myPage"

4. `App` component: The App component in your application must have similar content to App/index.js in Lect10-2 example.


5. ### Landing page
   
  &nbsp;&nbsp;&nbsp;&nbsp;a. Place the code for the landing page in `client/src/components/Landing/index.js`.
  
  &nbsp;&nbsp;&nbsp;&nbsp;c. Design your own content for the Landing page related to your movie app.

6. ### Search page
  &nbsp;&nbsp;&nbsp;&nbsp;a. Place the code for the search page in `client/src/components/Search/index.js`.

  &nbsp;&nbsp;&nbsp;&nbsp;b. This is a page for searching for movies by title, actor and director. The results must show the movie title, director, texts of user-entered reviews (if any) and average user review scores.

&nbsp;&nbsp;&nbsp;&nbsp;c. The page must contain three MUI text fields for searching by:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i.	Movie title. This MUI TextField must have the id tag "search-title".

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii.	Actor's first name(s) + last name (as one field). This MUI TextField must have the id tag "search-actor".

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iii.	Director's first name(s) + last name (as one field). This MUI TextField must have the id tag "search-director".

&nbsp;&nbsp;&nbsp;&nbsp;c.	The user may specify multiple or any one of the search criteria at a time.

&nbsp;&nbsp;&nbsp;&nbsp;d.	Search requirements: 
- If multiple search criteria are entered, use AND (not OR) when composing your SQL statement. For example, if the user entered a Director's name and an Actor's name, then the retrieved movies must satisfy BOTH of these criteria. Similarly, if the user entered strings into all three fields (Actor, Director and Movie Title), the search must satisfy ALL THREE criteria;
- Searching for title: search for "Alien" should only match "Alien", not "Aliens";
- Searching for actor/director: The users will enter the full name in a single search field (e.g., "Sigourney Weaver" or "Robert Downie Sr."), but your database stores names in separate first_name and last_name columns. Make sure that you are able to match on names where the first_name or last_name is either a single word or a multi-word entry, e.g., last_name: "Downie Sr." 

&nbsp;&nbsp;&nbsp;&nbsp;e.	One `Find movies` button, which is an MUI Button with id tag "search-button". Upon clicking this button, the React code would send all of the search criteria to the NodeJS server. The server will send them as MySQL SELECT statement(s) to your MySQL database, and return back the retrieved data.

&nbsp;&nbsp;&nbsp;&nbsp;f.	Specifically, the retrieved data about each movie must consist of the following:  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i.	Movie Title: the movie title

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii.	Movie Director(s): director's first + last name. If there are multiple directors for a given movie, show all of their names, separated by commas.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iii. Average Rating: the average user review rating from your Review table. If no ratings exist for a given movie, show N/A.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iv.	Reviews: the list of all texts of user-entered reviews (if any). Note: it is sufficient to just list the content of the review (omitting the userID and review title). Show each review on a new line.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Here is an example of the layout of search results:

![image](/img/searchResultsExample.png)

7.	### Review page

&nbsp;&nbsp;&nbsp;&nbsp;a. Copy and paste the code for the review page (from your file Review.js in D2) in `client/src/components/Review/index.js`.

&nbsp;&nbsp;&nbsp;&nbsp;b. Replace the rest of the files under `client/src/components/Review/` with your D2 files: `MovieSelect.js`, `ReviewTitle.js`, `ReviewBody.js` and `ReviewRating.js`. Make sure you adapt the import paths to the new location of these files in `client/src/components/Review/index.js`. Fix any errors in these files based on D2 feedback.

&nbsp;&nbsp;&nbsp;&nbsp;c.	This page must be adapted based on your D2 app page, and must contain all the functionality of D2, including reading movies from MySQL and writing user-entered reviews into your MySQL tables.


8.	### MyPage 

&nbsp;&nbsp;&nbsp;&nbsp;a.	This must be a new page of your own choice. The page must read and write data from/to your copy of the IMDB database. You can add new tables and/or new attributes to existing tables to your MySQL database as needed. Examples of functionalities supported by the additional page include: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i.	browse/search/view embedded videos of movie trailers and write your comments on them.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii.	view recommendations of movies to watch based on your reviews, and add your comments about these recommendations.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iii.	read news articles about movie releases, awards, actors, etc. and write your comments on them.

&nbsp;&nbsp;&nbsp;&nbsp;Note: if the functionality of your page requires additional data, it is sufficient to just include a few samples in your database, e.g. a few links to movie trailers (for point #i) or a few articles  (for point #iii). Include a short description on this page of your app, telling us which movies have this additional data, so that we use them to test your app.

&nbsp;&nbsp;&nbsp;&nbsp;b.	The implementation of `MyPage` component should be added in `client/src/components/MyPage/index.js`. MyPage component may have child components if needed, which should be placed (one per file) in the same directory (`client/src/components/MyPage`).

&nbsp;&nbsp;&nbsp;&nbsp;c.	Include the MUI Appbar in the `MyPage` page with the links to `Landing`, `Review` and `Search`.

&nbsp;&nbsp;&nbsp;&nbsp;d.	Note: `MyPage` must have substantially different functionality from both `Search` and `Review` pages.

9.	Visual design

&nbsp;&nbsp;&nbsp;&nbsp;a.	You entire app must use visually consistent MUI styling (see Lecture_5-2 slides and code examples). 

&nbsp;&nbsp;&nbsp;&nbsp;b.	You may design your own MUI theme, and use images in your design. If you use images in your page, create a directory `client/src/assets/` and place them there. Make sure that your components import them from this directory.


10.	After you finish your development, make sure that the app renders in the browser and functions according to the specifications. **Important:** verify that all `id` tags are assigned to the correct elements, as instructed.

11.	Push changes to the GitHub:

```
git add .
git commit -m "completed"
git push origin d3
```

12.	In your GitHub repo, create new pull request and merge `d3` branch with the `main` branch. Do not delete `d3` branch.

## Aritificial Intelligence Assistance

Artificial Intelligence, played a role in supporting the development of my movie review website and. AI helped me with debugging both frontend and backend code by identifying syntax issues, clarifying error messages such as ECONNREFUSED and SQL connection problems, and guiding me through React component structure and logic. It helped me design my API endpoints for fetching movies, handling user input, and dynamically updating the watchlist for the MyPage componenet. Additionally, AI helped improve the user interface by suggesting layout improvements with Material UI and styling techniques to make the website look appealing and have a consistent theme.





