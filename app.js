// console.log('Hello World')

//URLs
let upcomingLaunchesURL = 'https://ll.thespacedevs.com/2.0.0/launch/upcoming/ '
let upcomingEventsURL = 'https://ll.thespacedevs.com/2.0.0/event/upcoming/'

//access tokens and local storage
const thisStorage = window.localStorage
const access_token = config.access_token
const nasaAccessKey = config.nasa_token

//Selectors
const searchBar = document.querySelector('#search-bar')
const searchForm = document.querySelector('form')
const counterContainer = document.querySelector('.counter-container')
const saveButton = document.querySelector('#save')
const retrieveButton = document.querySelector('#retrieve')
const getFiveButton = document.querySelector('#next')
const clearButton = document.querySelector('#clear')
const eventButton = document.querySelector('#events')
const searchContainer = document.querySelector('.search-container')
const searchResults = document.querySelector('.search-results')

//Empty arrays to be used later
let searchedLaunches = []
let fiveLaunches = []
let intervalArr = []
let saveThisArray = []
let fiveEvents = []

//Classes for making objects!
class launch {
  constructor(id, name, type, image, url, details, time) {
    this.id = `A${id}`
    this.name = name
    this.type = type
    this.image = image
    this.url = url
    this.details = details
    this.time = `${time.slice(10, 19)} GMT`
    this.date = time.slice(0, 10)
    this.datetime = time
  }
}

class eventObj {
  constructor(id, name, type, image, url, details, time, launch, launchID, expedition) {
    this.id = `A${id}`
    this.name = name
    this.type = type
    this.image = image
    this.url = url
    this.details = details
    this.time = `${time.slice(10, 19)} GMT`
    this.date = time.slice(0, 10)
    this.datetime = time
    this.launch = launch
    this.launchID = launchID
    this.expedition = expedition
  }
}

class intervalObj {
  constructor(id, num) {
    this.id = id
    this.num = num
  }
}

//Headers for making API calls to Launch Library
const headers = {
  headers: {
    'Authorization': `token ${access_token}`,
    },
}

//API Call for upcoming launches
async function get5launches() {
  fiveLaunches = []
  try {
    let response = await axios.get(upcomingLaunchesURL, headers)
    let launchData = response.data.results
    for (let i = 0; i < 5; i++) {
      let launchID = launchData[i].id
      let launchName = launchData[i].name
      let launchType = launchData[i].mission.type
      let launchImage = launchData[i].image
      let launchURL = launchData[i].url
      let launchTime = launchData[i].net
      let launchDetails = launchData[i].mission.description
      let thisLaunch = new launch(launchID, launchName, launchType, launchImage, launchURL, launchDetails, launchTime)
      fiveLaunches.push(thisLaunch)
    }
    displayLaunches(fiveLaunches)
  } catch (error) {
    console.log(error)
  }
}
getFiveButton.addEventListener('click', () => { get5launches() })

//Display launches as new divs
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

//SHOW DETAILS
//expand div to reveal details
function showDetails(itemID, e) {
  let targetDiv = document.querySelector(`#${itemID}`)
  let details = targetDiv.querySelector('.details')
  let counterBackground = targetDiv.querySelector('.background-div')
  if (targetDiv.style.height === '30%') {
    targetDiv.style.height = '15%'
    details.style.display = 'none'
    targetDiv.style.overflowY = 'hidden'
    counterBackground.style.overflowY = 'hidden'
  } else {
    targetDiv.style.height = '30%'
    details.style.display = 'block'
    targetDiv.style.overflowY = 'scroll'
    counterBackground.style.overflowY = 'scroll'
  }
}

//COUNTDOWN FUNCTION
//takes a datetime string, converts to Date object, subtracts to find time left, returns string
function countdown(countDownTo) {
  //found helpful guide @ https://www.educative.io/edpresso/how-to-create-a-countdown-timer-using-javascript
  let countDownToTime = new Date(countDownTo).getTime()
  let currentTime = new Date().getTime()
  let countDowntime = countDownToTime - currentTime
  let days = Math.floor(countDowntime / (1000 * 60 * 60 * 24))
  let hours = Math.floor(countDowntime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
  let minutes = Math.floor(countDowntime % (1000 * 60 * 60) / (1000 * 60))
  let seconds = Math.floor(countDowntime % (1000 * 60) / 1000)
  return `T- ${days} D : ${hours} H : ${minutes} M : ${seconds} S`
}

//REMOVE ITEMS FUNCTIONs
//remove intervals when removing launch divs objects
function removeAll() {
  while (counterContainer.lastChild) {
    counterContainer.removeChild(counterContainer.lastChild)
  }
  fiveLaunches = []
  intervalArr.forEach((item) => { clearInterval(item.num) })
  intervalArr = []
  searchedLaunches = []
  fiveLaunches = []
}
clearButton.addEventListener('click', removeAll)

function removeDiv(div, id, e) {
  e.stopPropagation()
  div.remove() 
  fiveLaunches = fiveLaunches.filter((item) => { return item.id !== id })
  searchedLaunches = searchedLaunches.filter((item) => { return item.id !== id })
  fiveEvents = fiveEvents.filter((item) => { return item.id !== id })
}

//SAVE SELECTED (displayed) FUNCTION
//use array of displayed objects to save them to local storage
//save counters into local storage
function saveLocal() {
  fiveLaunches.forEach((item) => { saveThisArray.push(item) })
  searchedLaunches.forEach((item) => { saveThisArray.push(item) })
  fiveEvents.forEach((item) => { saveThisArray.push(item) })
  fiveLaunches = []
  searchedLaunches = []
  fiveEvents = []
  thisStorage.clear()
  for (let i = 0; i < saveThisArray.length; i++){
    let item = JSON.stringify(saveThisArray[i])
    thisStorage.setItem(`${i}`, item)
  }
  saveThisArray = []
}
saveButton.addEventListener('click', () => { saveLocal() })

//RETRIEVE FUNCTION 
//use JSON.parse on the items in Storage

function retrieveLocal() {
  for (let i = 0; i < thisStorage.length; i++) {
    let item = JSON.parse(thisStorage[i])
    saveThisArray.push(item)
  }
  displayLaunches(saveThisArray)
}
retrieveLocal()
retrieveButton.addEventListener('click', () => retrieveLocal())

//CHECK FUNCTION
//checks to see if items in an array are already displayed in the DOM

function checkForDupes(item) {
  let alreadyDisplayed = document.querySelectorAll('.counter')
  let alreadyDisplayedIDs = []
  for (let i = 0; i < alreadyDisplayed.length; i++) {
    alreadyDisplayedIDs.push(alreadyDisplayed[i].id)
  }
  if (alreadyDisplayedIDs.includes(item.id)) {
    return true
  } else {
    return false
  }
}

//SEARCH FUNCTION
//search display function
  //when the search bar is clicked to search for something, a window pops up on the bottom of the screen displaying the search results
async function search(searchQuery) {
  let searchUpcoming = `https://ll.thespacedevs.com/2.0.0/launch/upcoming?search=${searchQuery}`
  try {
    let response = await axios.get(searchUpcoming, headers)
    let searchData = response.data.results
    searchResults.style.display = 'block'
    searchData.forEach((item) => {
      let resultDiv = document.createElement('div')
      resultDiv.className = 'result-div'
      let launchID = item.id
      let launchName = item.name
      let launchType = item.mission ? item.mission.type : 'Check back later for details'
      let launchImage = item.image
      let launchURL = item.url
      let launchTime = item.net
      let launchDetails = item.mission ? item.mission.description : 'Check back later for more details'
      let thisLaunch = new launch(launchID, launchName, launchType, launchImage, launchURL, launchDetails, launchTime)
      resultDiv.innerHTML = `<img src='${launchImage}' class='search-img'><p class='search-name'>${launchName}</p>`
      searchResults.appendChild(resultDiv)
      resultDiv.addEventListener('click', () => { addLaunch(thisLaunch) })
      })
  } catch (error) {
    console.log(error)
  }
}
searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const searchQuery = searchBar.value
  search(searchQuery)
})

function addLaunch(launch) {
  searchResults.style.display = 'none'
  while (searchResults.lastChild) {
    searchResults.removeChild(searchResults.lastChild)
  }
  searchedLaunches.push(launch)
  displayLaunches(searchedLaunches)
  }

//BACKGROUND DISPLAY FUNCTION
//displays a different background everyday using APOD from NASA

async function changeBackground() {
  let nasaURL = `https://api.nasa.gov/planetary/apod?api_key=${nasaAccessKey}`
  try {
    let response = await axios.get(nasaURL)
    let newBackground = response.data.url
    counterContainer.style.background = `url('${newBackground}')`
    counterContainer.style.backgroundPosition = 'center center'
    counterContainer.style.backgroundRepeat = 'no-repeat'
    counterContainer.style.backgroundSize = 'cover'
    // console.log(response)
  } catch (error) {
    console.log(error)
  }
}
changeBackground()

//GET 5 UPCOMING SPACE EVENTS
//same as get 5 launches, but for events
async function getFiveEvents() {
  fiveEvents = []
  try {
    let response = await axios.get(upcomingEventsURL, headers)
    let eventsData = response.data.results
    console.log(eventsData)
    for (let i = 0; i < 5; i++) {
      let eventID = eventsData[i].id
      let eventName = eventsData[i].name
      let eventType = eventsData[i].type.name
      let eventImage = eventsData[i].feature_image
      let eventURL = eventsData[i].url
      let eventTime = eventsData[i].date
      let eventDetails = eventsData[i].description
      let relatedLaunchName = eventsData[i].launches.name
      let relatedLaunchID = eventsData[i].launches.id
      let relatedExpedition = eventsData[i].expeditions.name
      let thisEvent = new eventObj(eventID, eventName, eventType, eventImage, eventURL, eventDetails, eventTime, relatedLaunchName, relatedLaunchID, relatedExpedition)
      fiveEvents.push(thisEvent)

    }
    displayLaunches(fiveEvents)
  } catch (error) {
    console.log(error)
  }
}
eventButton.addEventListener('click', () => { getFiveEvents() })

//EVENTS SEARCH

//PAST LAUNCHES SEARCH