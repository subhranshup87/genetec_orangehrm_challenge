async function createEmployeeData() {
  const { faker } = await import('@faker-js/faker');
  return {
    firstName: faker.person.firstName(),
    updatedFirstName: `Updated${faker.person.firstName()}`,
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    employeeId: faker.string.numeric(5),
  };
}

module.exports = { createEmployeeData };