import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { User, Save } from 'lucide-react';

const ProfileForm: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    email: '',
    discordName: '',
    phone: '',
    birthdate: '',
    team: '',
    discordId: '',
    supervisorOrMentor: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        nickname: user.nickname,
        email: user.email,
        discordName: user.discordName,
        phone: user.phone,
        birthdate: user.birthdate,
        team: user.team,
        discordId: user.discordId,
        supervisorOrMentor: user.supervisorOrMentor || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMessage(null);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        nickname: user.nickname,
        email: user.email,
        discordName: user.discordName,
        phone: user.phone,
        birthdate: user.birthdate,
        team: user.team,
        discordId: user.discordId,
        supervisorOrMentor: user.supervisorOrMentor || '',
      });
    }
    setIsEditing(false);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Mock API call - in a real application you would update the user profile
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Show success message
      setMessage({
        text: 'Profile updated successfully!',
        type: 'success',
      });
      
      setIsEditing(false);
    } catch (error) {
      setMessage({
        text: 'Failed to update profile. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const teamOptions = [
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Design', label: 'Design' },
    { value: 'Product', label: 'Product' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'HR', label: 'HR' },
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center">
            <User className="mr-2" size={24} />
            Profile Information
          </h2>
        </div>

        {message && (
          <div
            className={`px-6 py-3 ${
              message.type === 'success' ? 'bg-success-50 text-success-700' : 'bg-error-50 text-error-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />

            <Input
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />

            <Input
              name="nickname"
              label="Nickname"
              value={formData.nickname}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Input
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />

            <Input
              name="discordName"
              label="Discord Name"
              value={formData.discordName}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Input
              name="discordId"
              label="Discord ID"
              value={formData.discordId}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Input
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Input
              name="birthdate"
              type="date"
              label="Birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <Select
              name="team"
              label="Team"
              value={formData.team}
              onChange={handleChange}
              options={teamOptions}
              disabled={!isEditing}
            />

            <Input
              name="supervisorOrMentor"
              label="Supervisor or Mentor"
              value={formData.supervisorOrMentor}
              onChange={handleChange}
              disabled={!isEditing}
            />



            <div className="flex items-end">
              <p className="text-sm text-gray-500">
                <span className="font-medium">User ID:</span> {user.userId}
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
            {isEditing ? (
              <>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isSaving}
                  icon={<Save size={16} />}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button type="button" onClick={handleEdit}>
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;