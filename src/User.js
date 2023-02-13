class User {
  constructor(username, password, age)
  {
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false
  }

  login(password){
    if(password == this.password){
      this.loggedIn = true
    }
    else
    {
      throw Error("incorrect password")
    }
  }

  logOut(){
    this.loggedIn = false;
  }

}

module.exports = User
