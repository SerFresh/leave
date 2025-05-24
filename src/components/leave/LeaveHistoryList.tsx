import React, { useState } from 'react';
import { useLeave } from '../../context/LeaveContext';
import LeaveStatusCard from './LeaveStatusCard';
import { Calendar } from 'lucide-react';
import Select from '../ui/Select';

const LeaveHistoryList: React.FC = () => {
  const { userLeaves } = useLeave();
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All Leaves' },
    { value: 'vacation', label: 'Vacation' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'personal', label: 'Personal' },
    { value: 'other', label: 'Other' },
  ];

  const filteredLeaves = userLeaves.filter((leave) => {
    if (filter === 'all') return true;
    return leave.leaveType === filter;
  });

  // Sort leaves by date (most recent first)
  const sortedLeaves = [...filteredLeaves].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Calendar className="mr-2" size={24} />
          Leave History
        </h2>
        
        <div className="w-full sm:w-48">
          <Select
            options={filterOptions}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter leave history"
          />
        </div>
      </div>

      {sortedLeaves.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedLeaves.map((leave) => (
            <LeaveStatusCard key={leave.id} leave={leave} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <Calendar className="mx-auto text-gray-400" size={48} />
          <h3 className="mt-4 text-lg font-medium text-gray-800">No leave history</h3>
          <p className="mt-2 text-gray-600">
            You don't have any leave records yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default LeaveHistoryList;