import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('بريد غير صالح').required('Email is requirde'),
  });

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: async (values) => {
      setError('');
      setSuccess('');
      try {
        const { data } = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
          { email: values.email }
        );
        setSuccess('The code has been sent to the email');
        localStorage.setItem('resetEmail', values.email);
       
          navigate('/verifaycode');
      } catch (err) {
        setError(err.response?.data?.message || ' An error occurred while sending');
      }
    },
  });

  return (
    <div className="container max-w-md mx-auto my-20 p-6 bg-gray-100 rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Forget Password</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder=" your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 border rounded"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-600 text-sm">{formik.errors.email}</p>
        )}
        <button type="submit"
          className="w-full bg-primary text-white py-2 rounded" > Send Code </button>
      </form>
      {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  );
}
