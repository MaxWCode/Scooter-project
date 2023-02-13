const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

describe('ScooterApp', () => {
    let scooterApp;
    
    beforeEach(() => {
      scooterApp = new ScooterApp();
    });
  
    it('can register a user', () => {
      scooterApp.registerUser('max', 'password', 20);
      expect(scooterApp.registeredUsers).toHaveProperty('max');
    });
  
    it('can not register a user if under 18', () => {
      expect(() => {
        scooterApp.registerUser('Jane', 'password', 17);
      }).toThrowError("too young to register");
    });
  
    it('should not register a user if they are already registered', () => {
      scooterApp.registerUser('max', 'password', 20);
      expect(() => {
        scooterApp.registerUser('max', 'password', 20);
      }).toThrowError("already registered");
    });
  
    it('logs in a user', () => {
      scooterApp.registerUser('max', 'password', 20);
      scooterApp.logInUser('max', 'password');
      expect(scooterApp.registeredUsers['max'].loggedIn).toBe(true);
    });
  
    it('should not log in a user with incorrect username or password', () => {
      scooterApp.registerUser('max', 'password', 20);
      expect(() => {
        scooterApp.logInUser('max', 'incorrectPassword');
      }).toThrowError("username or password is incorrect");
    });
    describe('logoutUser', () => {
        test('logs out the user if they are logged in', () => {
          scooterApp.registerUser('user1', 'pass1', 18);
          scooterApp.logInUser('user1', 'pass1');
          scooterApp.logoutUser('user1');
          expect(scooterApp.registeredUsers['user1'].loggedIn).toBe(false);
        });
    
        test('throws an error if the user is not logged in', () => {
          scooterApp.registerUser('user1', 'pass1', 18);
          expect(() => scooterApp.logoutUser('user1')).toThrow();
        });
      });
      describe('createScooter', () => {
        test('it should create a new scooter at the specified station', () => {
          scooterApp.createScooter('manchester');
          expect(scooterApp.stations['manchester'].length).toBe(1);
        });
    
        test('throw an error if the station doesnt exist', () => {
          expect(() => scooterApp.createScooter('notastation')).toThrow();
        });
      });
      describe("ScooterApp", () => {
        let scooterApp, user, scooter;
        
        beforeEach(() => {
          scooterApp = new ScooterApp();
          user = new User("max", "123", 21);
          scooter = new Scooter("manchester", null, 100, false);
          
          scooterApp.registerUser("max", "123", 21);
          scooterApp.createScooter("manchester");
        });
        
        describe("rentScooter", () => {
          it("should rent the scooter", () => {
            scooterApp.rentScooter(scooter, user);
            expect(scooter.user).toBe(user);
          });
        });
        
        describe("dockScooter", () => {
          it("should dock the scooter at a station", () => {
            scooterApp.rentScooter(scooter, user);
            scooterApp.dockScooter(scooter, "manchester");
            expect(scooter.station).toBe("manchester");
          });
        });
    })
})
