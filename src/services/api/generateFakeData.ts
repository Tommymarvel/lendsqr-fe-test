import { faker } from '@faker-js/faker';
import type { UserDetails } from './usersApi';

/**
 * Generates a single fake user with complete details
 */
export function generateFakeUser(id: number): UserDetails {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  const username = faker.internet.username({ firstName, lastName });

  const tier = faker.helpers.arrayElement([1, 2, 3] as const);
  const balance = faker.number.int({ min: 0, max: 5000000 });

  return {
    id,
    profile: {
      fullName,
      userId: `LSQ${faker.string.numeric(7)}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      phoneNumber: faker.phone.number(),
      bvn: faker.string.numeric(11),
      gender: faker.helpers.arrayElement(['Male', 'Female']),
      maritalStatus: faker.helpers.arrayElement([
        'Single',
        'Married',
        'Divorced',
        'Widowed',
      ]),
      children: faker.helpers.arrayElement(['None', '1', '2', '3', '4+']),
      residenceType: faker.helpers.arrayElement([
        "Parent's Apartment",
        'Rented Apartment',
        'Own House',
        'Company Apartment',
      ]),
    },
    education: {
      level: faker.helpers.arrayElement(['B.Sc', 'M.Sc', 'Ph.D', 'HND', 'OND']),
      status: faker.helpers.arrayElement([
        'Employed',
        'Self-employed',
        'Unemployed',
        'Student',
      ]),
      sector: faker.helpers.arrayElement([
        'FinTech',
        'Technology',
        'Healthcare',
        'Education',
        'Retail',
        'Manufacturing',
        'Agriculture',
        'Real Estate',
      ]),
      duration: faker.helpers.arrayElement([
        '1 year',
        '2 years',
        '3 years',
        '4 years',
        '5+ years',
      ]),
      officeEmail: faker.internet
        .email({ firstName, lastName, provider: 'company.com' })
        .toLowerCase(),
      monthlyIncome: `₦${faker.number
        .int({ min: 100, max: 500 })
        .toLocaleString()},000.00 - ₦${faker.number
        .int({ min: 600, max: 1000 })
        .toLocaleString()},000.00`,
      loanRepayment: faker.number
        .int({ min: 10000, max: 100000 })
        .toLocaleString(),
    },
    socials: {
      twitter: `@${username}`,
      facebook: fullName,
      instagram: `@${username.toLowerCase()}`,
    },
    guarantor: {
      fullName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email().toLowerCase(),
      relationship: faker.helpers.arrayElement([
        'Sister',
        'Brother',
        'Friend',
        'Parent',
        'Colleague',
      ]),
    },
    account: {
      balanceFormatted: `₦${balance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      number: faker.finance.accountNumber(10),
      bank: faker.helpers.arrayElement([
        'GTBank',
        'Access Bank',
        'First Bank',
        'Zenith Bank',
        'UBA',
        'Wema Bank',
        'Sterling Bank',
      ]),
      tier,
    },
  };
}

/**
 * Generates an array of fake users
 * @param count - Number of users to generate (default: 500)
 */
export function generateFakeUsers(count: number = 500): UserDetails[] {
  return Array.from({ length: count }, (_, i) => generateFakeUser(i + 1));
}
