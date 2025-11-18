export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export interface User {
  id: number | string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
}

export interface UserProfile {
  fullName: string;
  userId: string;
  email: string;
  phoneNumber: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  residenceType: string;
}

export interface UserEducation {
  level: string;
  status: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: string; // e.g. "₦200,000.00- ₦400,000.00"
  loanRepayment: string; // e.g. "40,000"
}

export interface UserSocials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface UserGuarantor {
  fullName: string;
  phoneNumber: string;
  email: string;
  relationship: string;
}

export interface UserAccount {
  balanceFormatted: string;
  number: string;
  bank: string;
  tier: 1 | 2 | 3;
}

export interface UserDetails {
  id: number | string;
  profile: UserProfile;
  education: UserEducation;
  socials: UserSocials;
  guarantor: UserGuarantor;
  account: UserAccount;
}

/** Assuming your `users.json` contains full details. */
export async function fetchUserById(id: string): Promise<UserDetails | null> {
  const res = await fetch('/users.json');
  if (!res.ok) throw new Error('Failed to fetch users');
  const all: UserDetails[] = await res.json();
  return all.find((u) => String(u.id) === id) ?? null;
}

/** Fetch all users for the users list page */
export async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/users.json');
  if (!res.ok) throw new Error('Failed to fetch users');
  const all: UserDetails[] = await res.json();

  // Map UserDetails to User for the table
  return all.map((userDetail) => ({
    id: userDetail.id,
    organization: 'Lendsqr', // or extract from data if available
    username: userDetail.profile.fullName,
    email: userDetail.profile.email,
    phoneNumber: userDetail.profile.phoneNumber,
    dateJoined: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    status: ['Active', 'Inactive', 'Pending', 'Blacklisted'][
      Math.floor(Math.random() * 4)
    ] as UserStatus,
  }));
}
