Thanks for checking out my music app! 

For all of the app's requirements, please checkout the 'requirements.txt' file.


Here are the main resources that I used when creating this project:
https://www.youtube.com/watch?v=WAmEZBEeNmg - a youtube tutorial on interacting with the spotify API
https://www.30secondsofcode.org/cheatsheets/p/1/ - Website containing links to different 'Cheat-Sheets'
https://www.30secondsofcode.org/css/s/units-cheatsheet/ - CSS Sizing Cheat-Sheet 
https://acchou.github.io/html-css-cheat-sheet/animation.html - CSS Animations Cheat-Sheet


My Project Creation Flow :
1) create necessary project directories/files
2) download necessary dependencies (this also gets updated as the project grows)
3) create User model, serializers, views, urls, etc - and make sure it works
4) create Playlist model, serializers, views, urls, etc - and make sure it works
5) create skeleton React frontend app to connect to backend
6) make sure that a user can create a new account, create and delete plists from the frontend app
7) work with Spotify API




Scalability Notes :
- Eventually, I might want my application to be live so that my friends and family can use my application.
  For this, I would add to my code to do this : 
  - when someone creates a new account, I would get Spotify's refresh token API to give each new user a
    refresh token that doesn't expire. I would then store that refresh token in my database, associated with it's user.
    And when a user logs into their account, my application would fetch that user's refresh token,
    and send it to Spotify to get that user a new access token (these are used for API calls,they expire after 1 hr)
    that access token would be good for one hour. So I would have to get a new token before that hour is up.
    I would use a task scheduler like Celery or Django-q to run every 55-58 minutes while the user is logged in,
    and that would run a function that gets a new access token for a logged in user every 55-58 minutes.