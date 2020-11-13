console.log('Hello World')

let upcomingLaunchesURL = 'https://ll.thespacedevs.com/2.0.0/launch/upcoming/ '
let searchQuery = ' '
let searchUpcoming = `https://ll.thespacedevs.com/2.0.0/launch/upcoming?search=${searchQuery}`
const access_token = config.access_token
const searchBar = document.querySelector('#search-bar')
const counterContainer = document.querySelector('.counter-container')
const getFiveButton = document.querySelector('#next')
const clearButton = document.querySelector('#clear')
let storeTheseLaunches = []
let fiveLaunches = []
let intervalArr = []

class launch {
  constructor(id, name, type, image, url, details, time) {
    this.id = id
    this.name = name
    this.type = type
    this.image = image
    this.url = url
    this.details = details
    this.time = time.slice(10)
    this.date = time.slice(0, 10)
    this.datetime = time
  }
}

const headers = {
  headers: {
    'Authorization': `token ${access_token}`,
    },
}
  
async function get5launches() {
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
    counterDiv.id = `A${item.id}`
    counterDiv.style.backgroundImage = `url('${item.image}')`
    counterDiv.innerHTML = `<div class='background-div'><h1 class='countdown' id='${item.datetime}'>COUNTER GOES HERE</h1><h3 class='name'>${item.name}</h3><button class='remove'>X</button><p class='type'>${item.type}</p><p class='time'>${item.time}</p><p class='date'>${item.date}</p><p class='details'>${item.details}<br><a class='more-details' href='${item.url}'>Click here for more details</a></p><img class='dropdown-img' src='./assets/Hamburger_icon.png'></div>`
    counterContainer.append(counterDiv)
    let itemID = `A${item.id}`
    let clock = counterDiv.querySelector('.countdown')
    intervalArr[id] = setInterval(() => { clock.textContent = countdown(clock.id) }, 1000)
    let removeButton = counterDiv.querySelector('.remove')
    removeButton.addEventListener('click', () => removeDiv(counterDiv))
    counterDiv.addEventListener('click', () => showDetails(itemID))
  })
  console.log(intervalArr)
  // [`i${id}`]
}

function showDetails(itemID) {
  let targetDiv = document.querySelector(`#${itemID}`)
  let details = targetDiv.querySelector('.details')
  if (targetDiv.style.height === '30vh') {
    targetDiv.style.height = '12vh'
    details.style.display = 'none'
  } else {
    targetDiv.style.height = '30vh'
    details.style.display = 'block'
  }
}

getFiveButton.addEventListener('click', () => {
  if (fiveLaunches.length === 5) {
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
  for (i = 0; i < fiveLaunches.length; i++) {
    fiveLaunches.shift()
  }
  for (i = 0; i < intervalArr.length; i++) {
    clearInterval(intervalArr[i])
    intervalArr.shift()
  }
  console.log(fiveLaunches)
  console.log(intervalArr)
  // intervalArr.forEach((item) => {
  //   clearInterval(item.value)
  //   intervalArr.splice(0,1)
  // })
  // fiveLaunches.forEach(() => {
  //   fiveLaunches.splice(0,1)
  // })  
  // console.log(fiveLaunches)
  // console.log(intervalArr)
}
clearButton.addEventListener('click', removeAll)

function removeDiv(div) {
  div.remove()
}
//SAVE SELECTED (displayed) FUNCTION
//use array of displayed objects to save them to local storage
//save counters into local storage

//SEARCH FUNCTION
//search display function
  //when the search bar is clicked to search for something, a window pops up on the bottom of the screen displaying the search results

searchBar.addEventListener('click', () => {
  
})