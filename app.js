console.log('Hello World')

let upcomingLaunchesURL = 'https://ll.thespacedevs.com/2.0.0/launch/upcoming/ '
// let searchQuery = ' '
// let searchUpcoming = `https://ll.thespacedevs.com/2.0.0/launch/upcoming?search=${searchQuery}`
const thisStorage = window.localStorage
const access_token = config.access_token
const searchBar = document.querySelector('#search-bar')
const searchForm = document.querySelector('form')
const counterContainer = document.querySelector('.counter-container')
const saveButton = document.querySelector('#save')
const retrieveButton = document.querySelector('#retrieve')
const getFiveButton = document.querySelector('#next')
const clearButton = document.querySelector('#clear')
const searchContainer = document.querySelector('.search-container')
const searchResults = document.querySelector('.search-results')
let searchedLaunches = []
let fiveLaunches = []
let intervalArr = []
const saveThisArray = []


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

class intervalObj {
  constructor(id, num) {
    this.id = id
    this.num = num
  }
}
const headers = {
  headers: {
    'Authorization': `token ${access_token}`,
    },
}
  
async function get5launches() {
  fiveLaunches = []
  try {
    let response = await axios.get(upcomingLaunchesURL, headers)
    console.log(response)
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

function displayLaunches(arr) {
  arr.forEach((item, id) => {
    let counterDiv = document.createElement('div')
    counterDiv.className = 'counter'
    counterDiv.id = item.id
    counterDiv.style.backgroundImage = `url('${item.image}')`
    counterDiv.innerHTML = `<div class='background-div'><h1 class='countdown' id='${item.datetime}'>COUNTER GOES HERE</h1><h3 class='name'>${item.name}</h3><button class='remove'>X</button><p class='type'>${item.type}</p><p class='time'>${item.time}</p><p class='date'>${item.date}</p><p class='details'>${item.details}<br><a class='more-details' href='${item.url}'>Click here for more details</a></p><img class='dropdown-img' src='./assets/Hamburger_icon.png'></div>`
    counterContainer.append(counterDiv)
    let itemID = item.id
    let clock = counterDiv.querySelector('.countdown')
    intervalArr[id] = new intervalObj(itemID, (setInterval(() => { clock.textContent = countdown(clock.id) }, 1000)))
    let removeButton = counterDiv.querySelector('.remove')
    removeButton.addEventListener('click', (e) => removeDiv(counterDiv, itemID, e))
    counterDiv.addEventListener('click', (e) => showDetails(itemID, e))
  })
  console.log(intervalArr)
}

function showDetails(itemID, e) {
  let targetDiv = document.querySelector(`#${itemID}`)
  let details = targetDiv.querySelector('.details')
  if (targetDiv.style.height === '30%') {
    targetDiv.style.height = '15%'
    details.style.display = 'none'
    targetDiv.style.overflowY ='hidden'
  } else {
    targetDiv.style.height = '30%'
    details.style.display = 'block'
    targetDiv.style.overflowY = 'scroll'
  }
}

getFiveButton.addEventListener('click', () => {
  if (fiveLaunches.length === 6) {
    return
  } else {
    get5launches()
  }
})

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
}
clearButton.addEventListener('click', removeAll)

function removeDiv(div, id, e) {
  e.stopPropagation()
  div.remove() 
  fiveLaunches = fiveLaunches.filter((item) => { return item.id !== id })
}

//SAVE SELECTED (displayed) FUNCTION
//use array of displayed objects to save them to local storage
//save counters into local storage
function saveLocal() {
  fiveLaunches.forEach((item) => { saveThisArray.push(item) })
  searchedLaunches.forEach((item) => { saveThisArray.push(item) })
  fiveLaunches = []
  searchedLaunches = []
  thisStorage.clear()
  for (let i = 0; i < saveThisArray.length; i++){
    let item = JSON.stringify(saveThisArray[i])
    thisStorage.setItem(`savedLaunch ${i}`, item)
  }
  console.log(thisStorage)
}
saveButton.addEventListener('click', () => { saveLocal() })

//RETRIEVE FUNCTION 
//use JSON.parse on the items in Storage

//SEARCH FUNCTION
//search display function
  //when the search bar is clicked to search for something, a window pops up on the bottom of the screen displaying the search results
async function search(searchQuery) {
  let searchUpcoming = `https://ll.thespacedevs.com/2.0.0/launch/upcoming?search=${searchQuery}`
  try {
    let response = await axios.get(searchUpcoming, headers)
    let searchData = response.data.results
    console.log(searchData)
    searchResults.style.display = 'block'
    searchData.forEach((item) => {
      let resultDiv = document.createElement('div')
      resultDiv.className = 'result-div'
      let launchID = item.id
      let launchName = item.name
      let launchType = 'item.mission.type'
      let launchImage = item.image
      let launchURL = item.url
      let launchTime = item.net
      let launchDetails = 'item.mission.description'
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
  //check if searched launches includes the launch to be added
  //if it does, don't display it
  searchedLaunches.push(launch)
  searchedLaunches.filter()
  displayLaunches(searchedLaunches)
  //displays selected launches in the dom
  //clears search box
}