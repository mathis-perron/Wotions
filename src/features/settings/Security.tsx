import { doc, updateDoc } from 'firebase/firestore';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { db } from '@/configs/firebase';
import type { IUser } from '@/types';

interface SecurityProps {
  user: IUser;
  userId: string;
}

const Security: React.FC<SecurityProps> = ({ user, userId }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const SecuritySchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: user.email,
    },
    validationSchema: SecuritySchema,
    onSubmit: async (values) => {
      if (loading) return;
      setLoading(true);

      await updateDoc(doc(db, 'users', userId), {
        email: values.email,
      });

      setLoading(false);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <div className="mx-auto max-w-[48.125rem] md:flex">
          <div className="mb-12 md:w-1/2 md:pr-8">
            <div className="mb-6">
              <label className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white">
                Email address <span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="profile-email"
                autoComplete="email"
                className="w-full rounded-lg border-jacarta-100 p-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                placeholder="Enter email"
                {...getFieldProps('email')}
              />
              {touched.email && errors.email ? (
                <span className="text-sm text-red">{errors.email}</span>
              ) : null}
            </div>
            <button
              type="submit"
              className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
            >
              Update Email
            </button>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default Security;
