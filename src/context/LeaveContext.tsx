import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Leave, LeaveType } from '../types';
import { useAuth } from './AuthContext';

type LeaveContextType = {
  leaves: Leave[];
  userLeaves: Leave[];
  addLeave: (leaveData: Omit<Leave, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

// Mock data
const mockLeaves: Leave[] = [
  {
    id: '1',
    userId: '1',
    leaveType: 'vacation',
    startDate: '2024-06-01',
    endDate: '2024-06-05',
    reason: 'Family vacation',
    createdAt: '2024-05-01T10:30:00Z',
    updatedAt: '2024-05-01T10:30:00Z',
  },
  {
    id: '2',
    userId: '1',
    leaveType: 'sick',
    startDate: '2024-04-10',
    endDate: '2024-04-11',
    reason: 'Not feeling well',
    createdAt: '2024-04-09T09:15:00Z',
    updatedAt: '2024-04-09T09:15:00Z',
  },
];

export const LeaveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState<Leave[]>(mockLeaves);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userLeaves = user
    ? leaves.filter((leave) => leave.userId === user.id)
    : [];

  const addLeave = async (
    leaveData: Omit<Leave, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setIsLoading(true);
    setError(null);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newLeave: Leave = {
        id: `${leaves.length + 1}`,
        userId: user.id,
        ...leaveData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setLeaves((prev) => [...prev, newLeave]);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LeaveContext.Provider
      value={{
        leaves,
        userLeaves,
        addLeave,
        isLoading,
        error,
      }}
    >
      {children}
    </LeaveContext.Provider>
  );
};

export const useLeave = () => {
  const context = useContext(LeaveContext);
  if (context === undefined) {
    throw new Error('useLeave must be used within a LeaveProvider');
  }
  return context;
};