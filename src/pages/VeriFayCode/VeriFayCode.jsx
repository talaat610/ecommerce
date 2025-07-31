import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required('verifay code is requirde ')
      .length(6, 'must by a 6 chars'),
  });

  const formik = useFormik({
    initialValues: { resetCode: '' },
    validationSchema,
    onSubmit: async (values) => {
      setError('');
      setSuccess('');

      try {
        await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
          { resetCode: values.resetCode }
        );
        setSuccess('verifay is done');
        setTimeout(() => {
          navigate('/resetpassword', { state: { resetCode: values.resetCode } });
        }, 1000);
      } catch (err) {
        setError(err.response?.data?.message || ' The code is incorrect');
      }
    },
  });

  return (
    <div className="container max-w-md mx-auto my-20 p-6 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4 text-center"> Confirm verification code</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="text"
          name="resetCode"
          placeholder="inter a verifay code "
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 border rounded"/>
        {formik.touched.resetCode && formik.errors.resetCode && (
          <p className="text-red-600 text-sm">{formik.errors.resetCode}</p>
        )}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded" > Confirm
        </button>
      </form>
      {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  );
}
