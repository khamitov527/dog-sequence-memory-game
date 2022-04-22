# Pre-work - *Dog Sequence Memory Game*

**Dog Sequence** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Akylbek Khamitov**

Time spent: **22** hours spent in total

Link to project: https://glitch.com/~dog-sequence

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Popups added for main, game, and results section.
- [x] User can navigate through pages.
- [x] Added heart emojis to show the number of lives left
- [x] Added timer with clock emoji that shows number of seconds left
- [x] Added gifs instead of colors for buttons
- [x] Each button has a custom sound (game does not use any frequency sounds)
- [x] When a player makes a mistake, timer resets (15s, every time)


## Video Walkthrough (GIF) (Try it yourself [here](https://dog-sequence.glitch.me/))

![won.gif](https://cdn.glitch.global/4ff6e246-d53b-43ec-8f11-e0ddb6bfa75f/dogseqwon.gif?v=1650484612901)
![lost.gif](https://cdn.glitch.global/4ff6e246-d53b-43ec-8f11-e0ddb6bfa75f/dogseqlost.gif?v=1650484625247)


## Gallery

![menu](https://cdn.glitch.global/4ff6e246-d53b-43ec-8f11-e0ddb6bfa75f/menu.png?v=1650483899994)
![game](https://cdn.glitch.global/4ff6e246-d53b-43ec-8f11-e0ddb6bfa75f/game.png?v=1650483887484)
![gameonelife](https://cdn.glitch.global/4ff6e246-d53b-43ec-8f11-e0ddb6bfa75f/gameonelife.png?v=1650483896078)
![statslost](https://cdn.glitch.global/4ff6e246-d53b-43ec-8f11-e0ddb6bfa75f/statslost.png?v=1650483903301)
![statswon](https://cdn.glitch.global/4ff6e246-d53b-43ec-8f11-e0ddb6bfa75f/statswon.png?v=1650483906907)


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
      
      - https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
      - https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
      - https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
      - https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices
      - https://www.youtube.com/watch?v=VlwSz2dXK_8
      - https://www.w3schools.com/js/js_htmldom_eventlistener.asp
      - https://stackoverflow.com/questions/43167907/sound-play-stop-pause

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

One of the biggest challenges was adding audio files instead of using frequency list. In the optional features there is a section asking to implement more complex sounds like audio files or chords. To implement this feature I tried using Web Audio API. I made it work for one button but it required writing lots of lines of codes for all the other buttons. That is why, I decided to use native audio library which is pretty easy to use once you implement it once. As a result, all of my buttons have custom sounds, which makes the game more interesting and enjoyable to play without hearing those frequency sounds.

Another challenge was implementing the timer. Building the timer was not a huge deal, but it required tons of debugging. The reason behind it is that timer has to work with buttons, so it needed a lot of logic in the code. To solve this problem, I wrote down all the moments when timer was crashing the program and debugged the code. Then I decided to put the timer for each round where you have 15 seconds to complete it. Also, when making a mistake timer resets, so you are given another 15 seconds. After, I displayed timer in the p tag, so user can see how many seconds left. As a result, timer works and gives a good user experience.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

How developers maintain websites when updating, adding new features and versions?
How to deploy a website that would interact with a lot of user data and how to make this process secure? 
How cloud and data based platforms and frameworks are used in web development?

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

If I had more time to work on this project, I would definitely make the game more complex by shuffling all the cards each game, so players would not have a chance to memorize the location of cards which makes the game harder to play. I would also create a leaderboard where it would store all personal records of users (Personal records of the day, month, all time). I was thinking about including different themes like cat sequence, cars sequence, etc. One top of it, have different sounds for each theme.



## Interview Recording URL Link

[My 5-minute Interview Recording](https://www.loom.com/share/21c84a34c5354198a59df68946508e13)


## License

    Copyright Akylbek Khamitov

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
