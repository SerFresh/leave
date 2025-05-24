import React from 'react';
import { Leave } from '../../types';
import { Card, CardHeader, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { formatDate } from '../../lib/utils';
import { Calendar } from 'lucide-react';

interface LeaveStatusCardProps {
  leave: Leave;
}

const LeaveStatusCard: React.FC<LeaveStatusCardProps> = ({ leave }) => {
  const getLeaveTypeLabel = (type: string) => {
    switch (type) {
      case 'sick':
        return 'Sick Leave';
      case 'vacation':
        return 'Vacation';
      case 'personal':
        return 'Personal';
      case 'other':
        return 'Other';
      default:
        return type;
    }
  };

  const start = new Date(leave.startDate);
  const end = new Date(leave.endDate);
  const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg animate-fade-in">
      <CardHeader className="flex justify-between items-center bg-gray-50">
        <div>
          <Badge variant="primary" className="uppercase">
            {getLeaveTypeLabel(leave.leaveType)}
          </Badge>
          <p className="text-sm text-gray-500 mt-1">
            {formatDate(leave.createdAt)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">
            Request ID: {leave.id}
          </p>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <Calendar size={16} className="text-gray-400 mr-2" />
            <div>
              <p className="text-sm font-medium">
                {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {diffDays} day{diffDays !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-1">Reason:</p>
            <p className="text-sm text-gray-600">{leave.reason}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveStatusCard;