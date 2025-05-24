import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from '../ui/Select';
import API from '../../lib/api';
import { UserPlus } from 'lucide-react';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    discordName: '',
    phone: '',
    birthdate: '',
    team: '',
    discordId: '',
    role: 'user',
    userId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'password',
      'confirmPassword',
      'userId',
    ];

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^\w/, (c) => c.toUpperCase())} is required`;
        isValid = false;
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm password validation
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Phone number validation
    if (
      formData.phone &&
      !/^\+?\d{10,15}$/.test(formData.phone.replace(/[-()\s]/g, ''))
    ) {
      newErrors.phone = 'Invalid phone number';
      isValid = false;
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
      const { confirmPassword, ...userData } = formData;
      console.log('Sending user data:', userData);

      await API.post('/webhook-test/4cb558fb-d464-4408-85f6-5ac45a8d2a31', userData);

      alert('Registration successful!');
      navigate('dashboard');
    } catch (error: any) {
      console.error('Registration failed:', error);
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };


  const teamOptions = [
    { value: '', label: 'Select Team' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Design', label: 'Design' },
    { value: 'Product', label: 'Product' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'HR', label: 'HR' },
  ];

  return (
    <div className="min-h-screen py-10 flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-md animate-fade-in">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 bg-primary-600 text-white rounded-full flex items-center justify-center">
              <UserPlus size={28} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-1">Join our team</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              error={errors.firstName}
              required
            />

            <Input
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              error={errors.lastName}
              required
            />

            <Input
              name="nickname"
              label="Nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Enter your nickname"
              error={errors.nickname}
            />

            <Input
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
              required
            />

            <Input
              name="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
              required
            />

            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              required
            />

            <Input
              name="discordName"
              label="Discord Name"
              value={formData.discordName}
              onChange={handleChange}
              placeholder="Enter your Discord name"
              error={errors.discordName}
            />

            <Input
              name="discordId"
              label="Discord ID"
              value={formData.discordId}
              onChange={handleChange}
              placeholder="Enter your Discord ID"
              error={errors.discordId}
            />

            <Input
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              error={errors.phone}
            />

            <Input
              name="birthdate"
              type="date"
              label="Birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              error={errors.birthdate}
            />

            <Select
              name="team"
              label="Team"
              value={formData.team}
              onChange={handleChange}
              options={teamOptions}
              error={errors.team}
            />

          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Register
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-500 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;