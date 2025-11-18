import { faker } from '@faker-js/faker';
import { writeFileSync } from 'fs';

function createUser(id) {
  const statuses = ['Active', 'Inactive', 'Pending', 'Blacklisted'];

  return {
    id,
    organization: faker.company.name(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number('080########'),
    dateJoined: faker.date
      .between({ from: '2020-01-01', to: '2020-12-31' })
      .toISOString(),
    status: faker.helpers.arrayElement(statuses),
    // extra fields for the details page can go here too
  };
}

const users = Array.from({ length: 500 }, (_, idx) => createUser(idx + 1));

writeFileSync('public/users.json', JSON.stringify(users, null, 2), 'utf8');

console.log('Generated 500 users → public/users.json');
