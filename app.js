console.log('Hello World')

let upcomingLaunchesURL = 'https://ll.thespacedevs.com/2.0.0/launch/upcoming/ '
let searchQuery = ' '
let searchUpcoming = `https://ll.thespacedevs.com/2.0.0/launch/upcoming?search=${searchQuery}`
const access_token = 'ae2ac201854a8c44c47074cbdcd2d344cf182cab'
let search1 = {

}
let search2 = {

}

const headers = {
  headers: {
    'Authorization': `token ${access_token}`
    }
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
      let launchDetails = launchData[i].mission.description
      console.log(launchName, launchType, launchImage, launchURL, launchDetails)
      //use these variables to create an object for each launch that can stay in local storage
    }
  } catch (error) {
    console.log(error)
  }
}

// get5launches()

//Create and display counters

  //save counters into local storage