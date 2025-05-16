# Rhythm Music
 Rhythym Music is built for people who want a simplified music experience.
 Whether you want to listen to your all-time favorites, or find new music to obsessively listen to, Rhythm is where you can go.
 Create personalized playlists, discover new music, and find live music near you, all in one place. 

## Features
- DRF Token Authentication 
- Spotify User Authentication
- Individual Spotify song liking & unliking
- Playlist creation, editing and playback
- Custom audio playback using Spotify's Web Playback SDK

## 💻 Tech Stack
### Frontend :
- ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
- ![DaisyUI](https://img.shields.io/badge/-DaisyUI-FF69B4?style=flat&logo=daisyui&logoColor=white)
- ![Lucide](https://img.shields.io/badge/-Lucide-000000?style=flat&logo=feather&logoColor=white)
- ![UIBall](https://img.shields.io/badge/-UIBall-4B9CD3?style=flat&logoColor=white&label=UIBall)
- Backend :
  - Django REST framework
  - PostgreSQL
  - Spotify Web API & Playback API

## Dependencies
For all of the app's backend requirements, please checkout the 'requirements.txt' file.
& For all of the app's frontend requirements, please checkout the package.json file

## Environment Variables
- Spotify Client Key
- Spotify Client Secret
- Ticketmaster API Key
- Ticketmaster Secret

## Creator Notes
Thanks for checking out my music app! This is my first ever full-stack application that I developed while in my 13-week coding bootcamp with Code Platoon.
I chose to make a music app because I love listening to music, sharing it with friends/family, and especially when you find a song that scratches just the right part of your brain.

## Biggest Issues
I ran into 2 main issues while developing:
- Working with Spotify's Playback API
  - This took me the better part of 3 days to get working properly. I used a few Youtube videos, the Spotify documentation, and my class instructors to figure this out.
- The second issue was the overall architecture of building it. I found multiple times that when I was creating a new function, variable, etc inside of a component or page, I'd
often need that function, variable, etc somewhere else in my project. So multiple times I ended up having to "elevate" that to a higher echelon in my stack.

## Future Plans
- I plan to have a few more capabilities in the app :
  - Create a queue of songs to play
  - Add pages for artists, albums, and genres to explore 
  - Add functionality to follow other users, so you can see what they're listening to and what things you have in common (songs, artists followed, etc)
  - Add artists, albums, and genres to "like" 
  - Be able to add local shows that you will be attending to your profile

## Resources
Here are the main resources that I used when creating this project:
- https://developer.ticketmaster.com/products-and-docs/apis/getting-started/ - Ticketmaster API Documentation
- https://www.30secondsofcode.org/cheatsheets/p/1/ - Website containing links to different 'Cheat-Sheets'
- https://www.youtube.com/watch?v=WAmEZBEeNmg - a youtube tutorial on interacting with the spotify API
- https://developer.spotify.com/documentation/web-playback-sdk - Spotify's Playback Documentation
- https://acchou.github.io/html-css-cheat-sheet/animation.html - CSS Animations Cheat-Sheet
- https://www.30secondsofcode.org/css/s/units-cheatsheet/ - CSS Sizing Cheat-Sheet 
- https://uiball.com/ldrs/ - Website for loading animations in React
- https://lucide.dev/ - Website I used for icons and such
- https://daisyui.com/ - React component library
- & of course the React + DRF documents

