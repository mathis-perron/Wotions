import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { Form, FormikProvider, useFormik } from 'formik';
import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import * as Yup from 'yup';

import { db, storage } from '@/configs/firebase';
import type { IUser } from '@/types';

interface ProfileProps {
  user: IUser;
  userId: string;
}

const Profile: React.FC<ProfileProps> = ({ user, userId }) => {
  const [selectedFile, setSelectedFile] = useState<any>(user.image || '');
  const [loading, setLoading] = useState<boolean>(false);

  const ProfileSchema = Yup.object().shape({
    username: Yup.string().required(),
    bio: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      username: user.username,
      bio: user.bio || '',
    },
    validationSchema: ProfileSchema,
    onSubmit: async (values) => {
      if (loading) return;
      setLoading(true);

      const imageRef = ref(storage, `users/${userId}/profilePicture`);

      if (selectedFile && selectedFile !== user.image) {
        await uploadString(imageRef, selectedFile, 'data_url').then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, 'users', userId), {
              username: values.username,
              bio: values.bio,
              image: downloadURL,
            });
          }
        );
      } else {
        await updateDoc(doc(db, 'users', userId), {
          username: values.username,
          bio: values.bio,
        });
      }

      setLoading(false);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const handleChangeProfilePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
  };

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <div className="mx-auto max-w-[48.125rem] md:flex">
          <div className="mb-12 md:w-1/2 md:pr-8">
            <div className="mb-6">
              <label className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white">
                Username <span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="profile-username"
                autoComplete="username"
                className="w-full rounded-lg border-jacarta-100 p-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                placeholder="Enter username"
                {...getFieldProps('username')}
              />
              {touched.username && errors.username ? (
                <span className="text-sm text-red">{errors.username}</span>
              ) : null}
            </div>
            <div className="mb-6">
              <label className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white">
                Bio
              </label>
              <textarea
                id="profile-bio"
                className="w-full rounded-lg border-jacarta-100 p-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                placeholder="Tell the world your story!"
                autoComplete="off"
                {...getFieldProps('bio')}
              ></textarea>
              {touched.bio && errors.bio ? (
                <span className="text-sm text-red">{errors.bio}</span>
              ) : null}
            </div>
            <button
              type="submit"
              className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
            >
              Update Profile
            </button>
          </div>
          <div className="flex space-x-5 md:w-1/2 md:pl-8">
            <div className="shrink-0">
              <figure className="relative inline-block">
                {/* TODO: Image size */}
                <Image
                  src={selectedFile}
                  alt="avatar"
                  className="rounded-xl border-[5px] border-white dark:border-jacarta-600"
                  height={140}
                  width={140}
                  priority
                />
                <div className="group absolute -right-3 -bottom-2 h-8 w-8 overflow-hidden rounded-full border border-jacarta-100 bg-white text-center hover:border-transparent hover:bg-accent">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute top-0 left-0 w-full cursor-pointer opacity-0"
                    onChange={(e) => handleChangeProfilePhoto(e)}
                  />
                  <div className="flex h-full items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="h-4 w-4 fill-jacarta-400 group-hover:fill-white"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
                    </svg>
                  </div>
                </div>
              </figure>
            </div>
            <div className="mt-4">
              <span className="mb-3 block font-display text-sm text-jacarta-700 dark:text-white">
                Profile Image
              </span>
              {/* TODO: Tips but no security */}
              <p className="text-sm leading-normal dark:text-jacarta-300">
                We recommend an image of at least 300x300. Gifs work too. Max
                5mb.
              </p>
            </div>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default Profile;
