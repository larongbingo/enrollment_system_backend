import faker from 'faker';

import { Models, UserAttributes } from '@database/index';


/**
 * Helper function to generateRandomUsersPromises
 * Creates a randomly generated user details
 * 
 * @returns { UserAttributes } The randomly generated user details
 */
function generateRandomUserDetails(): UserAttributes {
  let fn = faker.name.firstName();
  let ln = faker.name.lastName();

  let temp: UserAttributes = {
    firstName: fn,
    middleName: faker.name.lastName(),
    lastName: ln,
    address: `${faker.address.streetAddress()}, ${faker.address.country()}`,

    username: faker.internet.userName(fn, ln),
    password: faker.internet.password(8, true)
  };

  return temp;
}


/**
 * Helper function to generateRandomUsersPromises
 * Generates an async function or a promise to store randomly generated user details
 * 
 * @returns { Promise<UserAttributes> } The promise to store a randomly generated user
 */
function generateRandomUserPromise(printCredentials: boolean): Promise<UserAttributes> {
  return new Promise<UserAttributes>((resolve) => {
    let user = generateRandomUserDetails();
    if(printCredentials) console.log(user);

    resolve(Models.Users.create(user));
  });
}


/**
 * Helper Function to generateFakeUser
 * Generates an N Number of async function to store randomly generated user details
 * 
 * @param { number } num The amount of randomly generated user
 * @returns { Array<Promise<UserAttributes>> } The array of promises to store a randomly generated user
 */
function generateRandomUsersPromises(num: number, printCredentials: boolean): Array<Promise<UserAttributes>> {
  let promises: Promise<UserAttributes>[] = [];

  for(let i = 0; i < num; i++) {
    promises.push(generateRandomUserPromise(printCredentials));
  }

  return promises;
}

/**
 * An async function that creates N number of randomly generated users and stores it
 * to the database
 * 
 * @param { number } num The amount of randomly generated user
 * @returns { Promise<UserAttributes[]> } The promise that stores all of the generated N number of fake users
 */
export async function generateFakeUsers(num: number, printCredentials: boolean = true): Promise<UserAttributes[]> {
  return await Promise.all(generateRandomUsersPromises(num, printCredentials));
}


