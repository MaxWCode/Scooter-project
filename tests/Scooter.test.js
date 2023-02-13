const Scooter = require('../src/Scooter')
const User = require('../src/User')

describe('Scooter', () => {
  let scooter;

  beforeEach(() => {
    scooter = new Scooter('manchester', 'max', 60, false);
  });

  test('Scooter can be rented', () => {
    scooter.rent();
    expect(scooter.station).toBe(null);
    expect(scooter.user).toBe('max');
  });

  test('Scooter can dock', () => {
    scooter.rent();
    scooter.dock('station2');
    expect(scooter.station).toBe('station2');
    expect(scooter.user).toBe(null);
  });

  test('Scooter can recharge', () => {
    jest.spyOn(console, 'log');
    scooter.recharge();
    expect(console.log).toHaveBeenCalledWith('Current charge: 60%');
  });

  test('Scooter can be repaired', () => {
    scooter = new Scooter('manchester', 'max', 80, true);
    jest.spyOn(console, 'log');
    scooter.requestRepair();
    expect(console.log).toHaveBeenCalledWith(true);
  });

  test('rental throws error if scooter is broken', () => {
    scooter = new Scooter('manchester', 'max', 80, true);
    expect(() => {
      scooter.rent();
    }).toThrowError('scooter needs repair');
  });

  test('rental throws error if scooter is not charged', () => {
    scooter = new Scooter('manchester', 'max', 10, false);
    expect(() => {
      scooter.rent();
    }).toThrowError('scooter needs to charge');
  });
});
