console.log('Hello World')

let upcomingLaunchesURL = 'https://ll.thespacedevs.com/2.0.0/launch/upcoming/ '
let searchQuery = ' '
let searchUpcoming = `https://ll.thespacedevs.com/2.0.0/launch/upcoming?search=${searchQuery}`
const access_token = config.access_token
const searchBar = document.querySelector('#search-bar')
const counterContainer = document.querySelector('.counter-container')

let fiveLaunches = []

class launch {
  constructor(name, type, image, url, details, time) {
    this.name = name
    this.type = type
    this.image = image
    this.url = url
    this.details = details
    this.time = time
    this.date = this.time 
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
      let launchName = launchData[i].name
      let launchType = launchData[i].mission.type
      let launchImage = launchData[i].image
      let launchURL = launchData[i].url
      let launchTime = launchData[i].net
      let launchDetails = launchData[i].mission.description
      let thisLaunch = new launch(launchName, launchType, launchImage, launchURL, launchDetails, launchTime)
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
    counterDiv.style.backgroundImage = `url('${item.image}')`
    counterDiv.innerHTML = `<h2 class='countdown'>COUNTER GOES HERE</h2><h3 class='name'>${item.name}</h3><p class='type'>${item.type}</p><p class='time'>${item.time}</p><p class='date'>${item.date}</p><p class='details-hidden'>${item.details}<a class='more-details' href='${item.url}'>Click here for more details</a></p><img class='dropdown-img' src='./assets/Hamburger_icon.png'> `
    counterContainer.append(counterDiv)
  })
}

function showDetails(event) {
  event.preventDefault()
  //expands launch div height
  //toggles details class to show
  //look into making it a smooth transition
}

//Create and display counters
//search display function
  //when the search bar is clicked to search for something, a window pops up on the bottom of the screen displaying the search results

searchBar.addEventListener('click', () => {
  
})

  //save counters into local storage