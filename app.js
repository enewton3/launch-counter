console.log('Hello World')

let upcomingLaunchesURL = 'https://ll.thespacedevs.com/2.0.0/launch/upcoming/ '
let searchQuery = ' '
let searchUpcoming = `https://ll.thespacedevs.com/2.0.0/launch/upcoming?search=${searchQuery}`
const access_token = config.access_token
const searchBar = document.querySelector('#search-bar')
const counterContainer = document.querySelector('.counter-container')
const getFiveButton = document.querySelector('#next')
let storeTheseLaunches = []
let fiveLaunches = []

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
  //Get input from search bar

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
      //use these variables to create an object for each launch that can stay in local storage
    }
    displayLaunches(fiveLaunches)
  } catch (error) {
    console.log(error)
  }
}

// get5launches()

function displayLaunches(arr) {
  arr.forEach((item) => {
    let counterDiv = document.createElement('div')
    counterDiv.className = 'counter'
    counterDiv.id = `A${item.id}`
    counterDiv.style.backgroundImage = `url('${item.image}')`
    counterDiv.innerHTML = `<div class='background-div'><h1 class='countdown'>COUNTER GOES HERE</h1><h3 class='name'>${item.name}</h3><p class='type'>${item.type}</p><p class='time'>${item.time}</p><p class='date'>${item.date}</p><p class='details'>${item.details}<br><a class='more-details' href='${item.url}'>Click here for more details</a></p><img class='dropdown-img' src='./assets/Hamburger_icon.png'></div>`
    counterContainer.append(counterDiv)
    let itemID = `A${item.id}`
    let clock = document.querySelector('.countdown')
    clock.innerHTML = setInterval(() => { countdown(item.datetime) }, 1000)
    counterDiv.addEventListener('click', () => showDetails(itemID))
  })
  
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

getFiveButton.addEventListener('click', get5launches)



//search display function
  //when the search bar is clicked to search for something, a window pops up on the bottom of the screen displaying the search results

searchBar.addEventListener('click', () => {
  
})

  //save counters into local storage

  //Create and display counters
  //COUNTDOWN CLOCKS
  //everytime the page reloads, get the current time, store in variable
  //need to parse the strings from the API in the get data function above - save that data with each launches objects as a date object
  //calculates the date object - the current time
  //needs to display as a human readable countdown clock

  function countdown(countDownTo) {
    //found helpful guide @ https://www.educative.io/edpresso/how-to-create-a-countdown-timer-using-javascript
    let countDownToTime = new Date(countDownTo).getTime()
    let currentTime = new Date().getTime()
    let countDowntime = countDownToTime - currentTime
    let days = Math.floor(countDowntime / (1000 * 60 * 60 * 24))
    let hours = Math.floor(countDowntime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    let minutes = Math.floor(countDowntime % (1000 * 60 * 60) / (1000 * 60))
    let seconds = Math.floor(countDowntime % (1000 * 60) / 1000)
    return `${days} : ${hours} : ${minutes} : ${seconds}`
  }