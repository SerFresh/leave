import React from 'react';
import { useLeave } from '../../context/LeaveContext';
import { Card, CardContent } from '../ui/Card';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { Calendar, ClipboardList, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';


const DashboardSummary: React.FC = () => {
  const { userLeaves } = useLeave();
  const navigate = useNavigate();
  const { t } = useTranslation();


  const leavesByType = {
    vacation: userLeaves.filter((leave) => leave.leaveType === 'vacation').length,
    sick: userLeaves.filter((leave) => leave.leaveType === 'sick').length,
    personal: userLeaves.filter((leave) => leave.leaveType === 'personal').length,
  };

  const summaryItems = [
    {
      titleKey: 'dashboard.vacationLeaves',
      count: leavesByType.vacation,
      icon: <Calendar className="h-8 w-8 text-primary-500" />,
      color: 'bg-primary-50 text-primary-700',
    },
    {
      titleKey: 'dashboard.sickLeaves',
      count: leavesByType.sick,
      icon: <Calendar className="h-8 w-8 text-warning-500" />,
      color: 'bg-warning-50 text-warning-700',
    },
    {
      titleKey: 'dashboard.personalLeaves',
      count: leavesByType.personal,
      icon: <Calendar className="h-8 w-8 text-success-500" />,
      color: 'bg-success-50 text-success-700',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{t('dashboard.title')}</h2>
        <Button onClick={() => navigate('/leave-notification')} icon={<Plus size={16} />}>
          {t('dashboard.newLeaveRequest')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryItems.map((item, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-md transition-all duration-200"
          >
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{t(item.titleKey)}</p>
                  <p className="text-3xl font-bold mt-2 text-gray-800">{item.count}</p>
                </div>
                <div>{item.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">{t('dashboard.quickActions')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                icon={<Calendar size={16} />}
                onClick={() => navigate('/leave-notification')}
                className="justify-start"
              >
                {t('dashboard.requestLeave')}
              </Button>
              <Button
                variant="outline"
                icon={<ClipboardList size={16} />}
                onClick={() => navigate('/leave-history')}
                className="justify-start"
              >
                {t('dashboard.viewLeaveHistory')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSummary;