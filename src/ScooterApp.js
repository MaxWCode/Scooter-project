const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  constructor(registeredUsers = {}){
    this.stations = {
      manchester : [],
      knutsford : [],
      london : []
    }
    this.registeredUsers = registeredUsers;
  }

  registerUser(username, password, age){
    if (!(username in this.registeredUsers) && age >= 18){
      this.registeredUsers[username] = new User(username, password, age);
    }
    else if (age < 18){
      throw new Error("too young to register")
    }
    else if (username in this.registeredUsers)
    {
      throw new Error("already registered")
    }
  }

  logInUser(username, password){
    if (username in this.registeredUsers && this.registeredUsers[username].password == password){
      this.registeredUsers[username].login(password)
      console.log(`${username} Logged in`)
    }
    else{
      throw new Error("username or password is incorrect")
    }
  }

  logoutUser(username){
      if (username in this.registeredUsers && this.registeredUsers[username].loggedIn == true){
        this.registeredUsers[username].logOut()
        console.log(`${username} Logged out`)
      }
      else{
        throw new Error("no such user is logged in")
      }
  }

  createScooter(station){
    if(!(station in this.stations)){
      throw new Error("no such station")
    }
    else{
      this.stations[station].push(new Scooter(station, null, 100, false))
      console.log("created new scooter")
    }
  }

  dockScooter(scooter, station) {
    if (!(station in this.stations)) {
      throw new Error("no such station");
    }
    if (scooter.station === station) {
      throw new Error("scooter already at station");
    }
    scooter.station = station;
    this.stations[station].push(scooter);
    scooter.dock(station);
    console.log(`Scooter is docked at ${station}`);
  }
  
  rentScooter(scooter, user){
    if(scooter.station in this.stations && this.stations[scooter.station] !== null){
      this.stations[scooter.station][0].station = null
      this.stations[scooter.station][0].user = user
      scooter.user = user;
      scooter.rent()
      console.log("scooter is rented")
    }
    else{console.log("scooter is already rented")}
  }

  print(){
    let keys = Object.keys(this.registeredUsers)
    let stationKeys = Object.keys(this.stations)
    console.log("--------------------------------------------------")
    console.log("Current Registered Users:")
    console.log(keys)
    console.log("--------------------------------------------------")
    console.log("Current Docked Scooters:")
    
    for (let i=0; i<stationKeys.length; i++){
      let scooterCount = this.stations[stationKeys[i]].length;
      if(this.stations[stationKeys[i]][0].station == null)
      {
        scooterCount--;
      }
      console.log(stationKeys[i] + " : " + scooterCount)
    }
    console.log("--------------------------------------------------")
  }
}

let test = new ScooterApp()
test.registerUser("brian", "123", 18)
test.registerUser("ben", "123", 18)
test.registerUser("max", "123", 18)
test.createScooter("manchester")
test.createScooter("manchester")
test.createScooter("london")
test.createScooter("knutsford")
test.rentScooter(new Scooter("manchester", "null", 100, false), "max")
test.rentScooter(new Scooter("manchester", "null", 100, false), "gary")
test.rentScooter(new Scooter("london", "null", 100, false), "garry")
test.print();
console.log(test.stations)
// console.log(test.stations["manchester"].length)



module.exports = ScooterApp
