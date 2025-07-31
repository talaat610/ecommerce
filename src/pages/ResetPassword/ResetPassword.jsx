import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const resetCode = location.state?.resetCode;
  const email = localStorage.getItem('resetEmail');

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required('password is requirde')
      .min(6, 'must be 6 chars'),
  });

  const formik = useFormik({
    initialValues: { newPassword: '' },
    validationSchema,
    onSubmit: async (values) => {
      setError('');
      setSuccess('');

      try {
        await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
          email,
          newPassword: values.newPassword,
          resetCode,
        });
        setSuccess('password Chengaed ✅');
      
          localStorage.removeItem('resetEmail');
          navigate('/login');
   
      } catch (err) {
        setError(err.response?.data?.message || 'error');
      }
    },
  });

  if (!resetCode || !email) {
    return <p className="text-center text-red-600 mt-10"> error try again</p>;
  }

  return (
    <div className="container max-w-md mx-auto my-20 p-6 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4 text-center"> Reset</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="password"
          name="newPassword"
          placeholder=" new password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 border rounded"
        />
        {formik.touched.newPassword && formik.errors.newPassword && (
          <p className="text-red-600 text-sm">{formik.errors.newPassword}</p>
        )}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded"> save password </button>
      </form>
      {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  );
}
