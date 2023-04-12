import { doc, updateDoc } from 'firebase/firestore';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { FacebookIcon } from '@/components/icons/FacebookIcon';
import { TwitterIcon } from '@/components/icons/TwitterIcon';
import { WebsiteIcon } from '@/components/icons/WebsiteIcon';
import { db } from '@/configs/firebase';
import type { IUser } from '@/types';

interface SocialProps {
  user: IUser;
  userId: string;
}

const Social: React.FC<SocialProps> = ({ user, userId }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const SocialSchema = Yup.object().shape({
    twitter: Yup.string().url(),
    facebook: Yup.string().url(),
    website: Yup.string().url(),
  });

  const formik = useFormik({
    initialValues: {
      twitter: user.twitter || '',
      facebook: user.facebook || '',
      website: user.website || '',
    },
    validationSchema: SocialSchema,
    onSubmit: async (values) => {
      if (loading) return;
      setLoading(true);

      await updateDoc(doc(db, 'users', userId), {
        twitter: values.twitter,
        facebook: values.facebook,
        website: values.website,
      });

      setLoading(false);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <div className="mx-auto max-w-[48.125rem] md:flex">
          <div className="mb-12 md:w-1/2 md:pr-8">
            <div className="mb-6">
              <label className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white">
                Links <span className="text-red">*</span>
              </label>
              <div className="relative">
                <TwitterIcon className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 fill-jacarta-300 dark:fill-jacarta-400" />
                <input
                  type="text"
                  id="profile-twitter"
                  className="w-full rounded-t-lg border-jacarta-100 py-3 pl-10 hover:ring-2 hover:ring-accent/10 focus:ring-inset focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                  placeholder="twitter.com/yourname"
                  {...getFieldProps('twitter')}
                />
                {touched.twitter && errors.twitter ? (
                  <span className="text-sm text-red">{errors.twitter}</span>
                ) : null}
              </div>
              <div className="relative">
                <FacebookIcon className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 fill-jacarta-300 dark:fill-jacarta-400" />
                <input
                  type="text"
                  id="profile-facebook"
                  className="-mt-px w-full border-jacarta-100 py-3 pl-10 hover:ring-2 hover:ring-accent/10 focus:ring-inset focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                  placeholder="facebook.com/yourname/"
                  {...getFieldProps('facebook')}
                />
                {touched.facebook && errors.facebook ? (
                  <span className="text-sm text-red">{errors.facebook}</span>
                ) : null}
              </div>
              <div className="relative">
                <WebsiteIcon className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 fill-jacarta-300 dark:fill-jacarta-400" />
                <input
                  type="url"
                  id="profile-website"
                  className="-mt-px w-full rounded-b-lg border-jacarta-100 py-3 pl-10 hover:ring-2 hover:ring-accent/10 focus:ring-inset focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                  placeholder="yoursitename.com"
                  {...getFieldProps('website')}
                />{' '}
                {touched.website && errors.website ? (
                  <span className="text-sm text-red">{errors.website}</span>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
            >
              Update Links
            </button>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default Social;
