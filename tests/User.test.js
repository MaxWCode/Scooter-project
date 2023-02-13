const User = require('../src/User')

describe("User tests", () => {

    test("User correctly rendered", () =>{
        let test = new User("mw", "cheese", 18);
        expect(typeof test).toBe("object")
        expect(test.username).toBe("mw")
        expect(test.password).toBe("cheese")
        expect(test.age).toBe(18)
    })

    test("login function", () =>{
        let test = new User("mw", "cheese", 18);
        test.login("cheese");
        expect(test.loggedIn).toBe(true)
    })

    test("logout function", () =>{
        let test = new User("mw", "cheese", 18);
        test.logOut();
        expect(test.loggedIn).toBe(false)
    })

})

