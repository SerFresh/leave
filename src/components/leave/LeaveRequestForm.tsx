import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeave } from '../../context/LeaveContext';
import { LeaveType } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Calendar, Clock } from 'lucide-react';
import { getDaysBetween } from '../../lib/utils';

const LeaveRequestForm: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    leaveType: 'vacation' as LeaveType,
    startDate: today,
    endDate: today,
    reason: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addLeave, isLoading } = useLeave();
  const navigate = useNavigate();
  
  const leaveTypes = [
    { value: 'vacation', label: 'Vacation Leave' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'personal', label: 'Personal Leave' },
    { value: 'other', label: 'Other' },
  ];
  
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Required fields
    if (!formData.leaveType) {
      newErrors.leaveType = 'Leave type is required';
      isValid = false;
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
      isValid = false;
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
      isValid = false;
    }

    if (!formData.reason) {
      newErrors.reason = 'Reason is required';
      isValid = false;
    } else if (formData.reason.length < 10) {
      newErrors.reason = 'Please provide more details (at least 10 characters)';
      isValid = false;
    }

    // Date validation
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);

      if (start > end) {
        newErrors.endDate = 'End date cannot be before start date';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await addLeave(formData);
      navigate('/leave-status');
    } catch (error) {
      console.error('Failed to submit leave request:', error);
    }
  };

  // Calculate days between
  const startDate = new Date(formData.startDate);
  const endDate = new Date(formData.endDate);
  const daysCount = getDaysBetween(startDate, endDate);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Leave Request Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            name="leaveType"
            label="Leave Type"
            value={formData.leaveType}
            onChange={handleChange}
            options={leaveTypes}
            error={errors.leaveType}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="startDate"
              type="date"
              label="Start Date"
              value={formData.startDate}
              onChange={handleChange}
              min={today}
              error={errors.startDate}
              icon={<Calendar size={16} />}
              required
            />

            <Input
              name="endDate"
              type="date"
              label="End Date"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate}
              error={errors.endDate}
              icon={<Calendar size={16} />}
              required
            />
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-md">
            <Clock className="mr-2 text-gray-500" size={20} />
            <span className="text-sm text-gray-700">
              Duration: <strong>{daysCount}</strong> day
              {daysCount !== 1 ? 's' : ''}
            </span>
          </div>

          <TextArea
            name="reason"
            label="Reason for Leave"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Please provide details about your leave request"
            error={errors.reason}
            rows={4}
            required
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestForm;