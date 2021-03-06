# launch-counter

## Project Name

Launch Counter

## Project Description

This application displays countdowns to save launches and displays extra information about those launches when requested.
Extra functionality would include - past launch lookup and using other data from the Launch API

## API and Data Sample

Launch Library - https://ll.thespacedevs.com/2.0.0/swagger

Specific API endpoints and other JS functions needed

Date()

window.localstorage

https://ll.thespacedevs.com/2.0.0/launch/upcoming (add ?search=[searchquery])


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
![homepagebig](/assets/desktopversion.png "Homepage big")

## MVP/PostMVP 

#### MVP 

- Pulling Data from API - Launch Dates, times, types, and extra description ----tick----
- CSS responsive design - primarily for mobile, but looks decent on desktop as well. ----tick----
- Ability to display more information about a specific launch, and also link to even more information ----tick----
- displays a photo of the spacecraft being used behind each launch countdown using spacecraft endpoint of API ----tick----


#### PostMVP  

- Ability to save launches using local storage, so that you can save the ones you're watching ----tick----
- Ability to remove launch countdowns and old sections disappear when launch is complete ----tick----
- incorporating past launch search ----tick----
- incorporating other parts of the launch library api like astronaut look up, space events, dockings, etc.
- look into geolocation and showing what space objects are overhead right now
- body background is APOD ---tick----

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Nov 9| Prompt / Wireframes / Priority Matrix / Timeframes | Complete
|Nov 10| Project Approval and Initial Design - Basic HTML and CSS | Complete
|Nov 12| Begin JS - Pull data functions  | Complete
|Nov 13| More JS - take user input and populate data, create countdowns | Complete
|Nov 16| Finishing touches, Probably CSS fixing, and PMVPs | Complete
|Nov 17| Presentations | Incomplete

## Priority Matrix

![matrix](/assets/priority-matrix.png "priority matrix")

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Pitch, Wireframes, Priority Matrix| H | 2hrs | 2hrs | 2hrs| 
| HTML | H | 2hrs| 2hrs | 2hrs |
| CSS Styling | H | 3hrs| 4hrs | 4hrs |
| Make CSS responsive | H | 3hrs| 3hrs | 3hrs |
| Psuedocode | M | 1hr | 1.5hrs | 1.5hrs |
| Search functionality - user input (Does this list next 5 launches by default?) | M | 3hrs | 3hrs | 3hrs |
| Search DOM manipulation | H | 4hrs| 4hrs | 4hrs |
| JS Pull Data Functions | H | 4hrs| 5.5hrs | 5.5hrs |
| Countdown JS functions | H | 2hrs| 3hrs | 3hrs |
| DOM Manipulating JS | H | 3hrs| 4hrs | 4hrs |
| Photos into styling| L | 1hr | 2hrs | 2hrs|
| Section Removal | H | 3hrs| 3hrs | 3hrs |
| Fussing with API | M | 4hrs| 2hrs | 2hrs |
| Local Storage keeps selected items| M | 3hrs| 4hrs | 4hrs |
| Incorporate Events | L | 3hrs | 3hrs | 3hrs|
| Check function | M | 3hrs | 3hrs | 3hrs|
| Total | H | 39hrs| 49hrs | 49hrs |

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```
function displayLaunches(arr) {
  arr.forEach((item, id) => {
    if (checkForDupes(item)) {
      return
    } else {
      let counterDiv = document.createElement('div')
      counterDiv.className = 'counter'
      counterDiv.id = item.id
      counterDiv.style.backgroundImage = `url('${item.image}')`
      counterDiv.innerHTML = `<div class='background-div'><h1 class='countdown' id='${item.datetime}'>T- XXX D : XX H : XX M : XX S</h1><h3 class='name'>${item.name}</h3><button class='remove'>X</button><p class='type'>${item.type}</p><p class='time'>${item.time}</p><p class='date'>${item.date}</p><p class='details'>${item.details}<br><a class='more-details' href='https://www.google.com/search?q=${item.name}'>Click here for more details</a></p><img class='dropdown-img' src='./assets/Hamburger_icon.png'></div>`
      counterContainer.append(counterDiv)
      let itemID = item.id
      let clock = counterDiv.querySelector('.countdown')
      intervalArr[id] = new intervalObj(itemID, (setInterval(() => { clock.textContent = countdown(clock.id) }, 1000)))
      let removeButton = counterDiv.querySelector('.remove')
      removeButton.addEventListener('click', (e) => removeDiv(counterDiv, itemID, e))
      counterDiv.addEventListener('click', (e) => showDetails(itemID, e))
    }
  })
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.

 - 11/16/2020: Added APOD as background image of main section
 - 11/16/2020: Added Events to add 5

 ## Important Inclusion
 
 SPAAAAAACCCEEEEEE
 ![space](/assets/spacecore.jpeg "spacecore")
