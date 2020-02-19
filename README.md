## F.O.F. | Boston (Free Offerings of Food)
##### A web application created by M. Ege ERCAN for General Assembly Boston's Web Development Immersive Bootcamp Program's capstone project
---

F.O.F. | Boston , stands for Free Offerings of Food, is an application where people can create posts for their extra food that they dont want to throw away. So that, people who helps homeless people can find free food, collect them and give them to whoever in need. This application uses Google Maps API and Google Geocoding API to locate user's address
on the map.

- [View the client repo here!](https://github.com/macitege/fof-client)
- [View the API repo here!](https://github.com/macitege/fof-api)
- [View the deployed website here!](http://www.macitege.com/fof-client/)
- [View the deployed api here!](https://fof-api.herokuapp.com)

A screenshot of the app:

![Screenshot of the app](https://i.imgur.com/vAt8KcP.png "Screenshot of the app")

## Technologies used

- React.js
- Cascading Style Sheets (CSS)
- Sass (SCSS)
- JavaScript
- Axios
- Bootstrap
- Git
- cURL
- Google Maps API
- Google Geocoding API

## Development process and strategy

The focus of this project was to successfully use Google Maps API to locate addresses that are provided in the posts, and place markers on the map for those posts. In order to achive this task, 2 different third party api has been used. Because addresses are entered without latitude and longitute values, before being able to use Google Maps API -which needs lat-lng values to locate places- for showing markers, first Google Geocoding API has been utilized and latitude-longitute values of given addresses have been fetched.

Since this is a React.js application, before implying Google Maps API and Google Geocoding API, a planning of the component structure for React app has been done. The most challenging part was to use states to put the address given by user and the lat-lng values coming from geocoding api together and send it to database.

## Future feature additions - Unsolved Issues

Although everything runs correctly in the app, couple things are omitted to be able to meet m.v.p. requirements before the due date, and those features can be added in future iterations and improvements. Which are:
- Providing a user name validation in addition to email
- Showing username on posts instead of id
- Uploading image on the posts
- Following other users
- Sending message to other users
- An expiration timer for posts
- A confirmation dialog box before deleting, editing and creating posts

### Wireframes and user stories

1. [Wireframes located here.](https://i.imgur.com/PsOMKVM.png)
1. User stories:
  - As an unregistered user, I would like to sign up with email and password.
  - As a registered user, I would like to sign in with email and password.
  - As a signed in user, I would like to change password.
  - As a signed in user, I would like to sign out.
  - As an unregistered user, I would like to see all the latest posts with address info.
  - As a signed in user, I would to create posts.
  - As a signed in user, I would to edit my posts.
  - As a signed in user, I would to delete posts.
  - As a user, I want to see locations of posts on the map as markers, and see the post titles by clicking on them.

***

### Setup and Installation
For those who wants to fork this repo and build on it:

__Note:__ This is a React.js application, please check [React Documentation](https://reactjs.org/docs/getting-started.html) before starting.

__Note2:__ This application relies on 3 different APIs:
1. First one is the database api, which can be found in link [link](https://github.com/macitege/fof-api) before starting, make sure to set it.
1. Google Maps API, find the documentation [here](https://cloud.google.com/maps-platform/)
1. Google Geocoding API, find the documentation [here](https://developers.google.com/maps/documentation/geocoding/intro)

##### Setting up
- Fork and clone this repository.
- Empty `README.md` and fill with your own content.
- Replace `fof-client` in `package.json` with your projects name.
- Replace the "homepage" field in `package.json` with your Github account name and repository name.
- Install dependencies with `npm install`.
- Get a new Google API KEY from [Google Developers Console](https://console.developers.google.com/) and change the one in the link, given at the bottom of the App.js file of this repository.
- Don't forget to enable Google Maps API services from Google Dev. Console as explained in Google Maps API docs.
- `git add` and `git commit` your changes.
- Run the database api by entering `bin/rails server` command in shell (in api's directory)
- Run `npm start` in shell to start the app

###### Other commands to run
- `npm run nag`: runs code quality analysis tools on your code and complains.
- `npm run make-standard`: reformats all your code in the - JavaScript Standard Style.
- `npm run start`: generates bundles, watches, and livereloads.
- `npm run build`: place bundled styles and scripts where index.html can find them
- `npm run deploy`: builds and deploys master branch
