export type User = {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  discordName: string;
  phone: string;
  birthdate: string;
  team: string;
  discordId: string;
  role: 'user' | 'admin' | 'manager';
  userId: string;
  supervisorOrMentor?: string;
};

export type LeaveType = 'sick' | 'vacation' | 'personal' | 'other';

export type Leave = {
  id: string;
  userId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  createdAt: string;
  updatedAt: string;
};