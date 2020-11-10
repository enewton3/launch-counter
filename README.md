# launch-counter

## Project Name

SPAAAAAACCCEEEEEE

## Project Description

This application displays countdowns to save launches and displays extra information about those launches when requested.
Extra functionality would include - past launch lookup and using other data from the Launch API

## API and Data Sample

Launch Library - https://ll.thespacedevs.com/2.0.0/swagger

```json
{
            "id": "fdfc71c4-37a7-4d36-a27c-90b132f0e4aa",
            "url": "https://ll.thespacedevs.com/2.0.0/launch/fdfc71c4-37a7-4d36-a27c-90b132f0e4aa/",
            "launch_library_id": null,
            "slug": "starship-sn8-15-km-flight",
            "name": "Starship SN8 | 15 km Flight",
            "status": {
                "id": 2,
                "name": "TBD"
            },
            "net": "2020-11-12T03:00:00Z",
            "window_end": "2020-11-12T03:00:00Z",
            "window_start": "2020-11-09T15:00:00Z",
            "inhold": false,
            "tbdtime": false,
            "tbddate": false,
            "probability": null,
            "holdreason": "",
            "failreason": "",
            "hashtag": null,
            "launch_service_provider": {
                "id": 121,
                "url": "https://ll.thespacedevs.com/2.0.0/agencies/121/",
                "name": "SpaceX",
                "type": "Commercial"
            },
            "rocket": {
                "id": 2803,
                "configuration": {
                    "id": 207,
                    "launch_library_id": null,
                    "url": "https://ll.thespacedevs.com/2.0.0/config/launcher/207/",
                    "name": "Starship Prototype",
                    "family": "Starship",
                    "full_name": "Starship Prototype",
                    "variant": "Prototype"
                }
            },
            "mission": {
                "id": 1203,
                "launch_library_id": null,
                "name": "15 km Flight",
                "description": "The SN8 Starship prototype is expected to perform a first flight to an altitude of 15 km or 50,000 ft.",
                "launch_designator": null,
                "type": "Test Flight",
                "orbit": {
                    "id": 15,
                    "name": "Suborbital",
                    "abbrev": "Sub"
             
```

## Wireframes

![homepage](/assets/Homepagev2.png "Homepage")

## MVP/PostMVP 

#### MVP 

- Pulling Data from API - Launch Dates, times, types, and extra description
- CSS responsive design - primarily for mobile, but looks decent on desktop as well.
- Ability to save launches using local storage, so that you can save the ones you're watching
- Ability to display more information about a specific launch, and also link to even more information
- displays a photo of the spacecraft being used behind each launch countdown using spacecraft endpoint of API
- Ability to remove launch countdowns and old sections disappear when launch is complete

#### PostMVP  

- incorporating past launch search
- incorporating other parts of the launch library api like astronaut look up, space events, dockings, etc.
- look into geolocation and showing what space objects are overhead right now

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Nov 9| Prompt / Wireframes / Priority Matrix / Timeframes | Incomplete
|Nov 10| Project Approval and Initial Design - Basic HTML and CSS | Incomplete
|Nov 12| Begin JS - Pull data functions  | Incomplete
|Nov 13| More JS - take user input and populate data, create countdowns | Incomplete
|Nov 16| Finishing touches, Probably CSS fixing, and PMVPs | Incomplete
|Nov 17| Presentations | Incomplete

## Priority Matrix

![matrix](/assets/priority-matrix.png "priority matrix")

## Timeframes

Tell us how long you anticipate spending on each area of development. Be sure to consider how many hours a day you plan to be coding and how many days you have available until presentation day. Students usally put in around 40+ hours into their project 1.

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Throughout your project, keep track of your Time Invested and Actual Time and update your README regularly.

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Pitch, Wireframes, Priority Matrix| H | 2hrs | 2hrs | 2hrs| 
| HTML | H | 2hrs| 0hrs | 0hrs |
| CSS Styling | H | 3hrs| 0hrs | 0hrs |
| Make CSS responsive | H | 2hrs| 0hrs | 0hrs |
| Search functionality - user input | M | 3hrs | 0hrs | 0hrs |
| JS Pull Data Functions | H | 4hrs| 0hrs | 0hrs |
| DOM Manipulating JS | H | 3hrs| 0hrs | 0hrs |
| Section Removal | H | 3hrs| 0hrs | 0hrs |
| Fussing with API | H | 2hrs| 0hrs | 0hrs |
| Total | H | 24hrs| 0hrs | 0hrs |

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.
