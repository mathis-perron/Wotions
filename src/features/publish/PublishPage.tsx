import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import type { ImageListType } from 'react-images-uploading';
import ReactImageUploading from 'react-images-uploading';
import * as Yup from 'yup';

import { DragDropIcon } from '@/components/icons/DragDropIcon';
import TextEditor from '@/components/textEditor/TextEditor';
import { db, storage } from '@/configs/firebase';

interface PublishProps {}

const PublishPage: React.FC<PublishProps> = () => {
  const { data } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [coverImages, setCoverImages] = useState<ImageListType>([]);

  const PublishSchema = Yup.object().shape({
    title: Yup.string().required(),
    content: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: PublishSchema,
    onSubmit: async (values) => {
      if (loading) return;
      if (!data?.user) return;

      setLoading(true);

      const docRef = await addDoc(collection(db, `articles`), {
        title: values.title,
        content: values.content,
        timestamp: serverTimestamp(),
        userID: data.user.id,
      });

      const imageRef = ref(storage, `articles/${docRef.id}/cover`);

      if (coverImages[0]?.dataURL) {
        await uploadString(imageRef, coverImages[0].dataURL, 'data_url').then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, `articles/${docRef.id}`), {
              cover: downloadURL,
            });
          }
        );
      }

      // TODO: Redirect on create
      // router.replace(`articles/${docRef.id}`);

      setLoading(false);
    },
  });

  const { errors, touched, handleSubmit, setFieldValue } = formik;

  const handleChangeEditor = (content: string) => {
    setFieldValue('content', content);
  };

  const handleChangeCover = (imageList: ImageListType) => {
    setCoverImages(imageList as never[]);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <section className="relative py-24">
          <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <img
              src="/images/gradient_light.jpg"
              alt="gradient"
              className="h-full w-full"
            />
          </picture>
          <div className="container">
            <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              Publish
            </h1>
            <div className="mx-auto max-w-[48.125rem]">
              {/* <!-- Cover --> */}
              <div className="mb-6">
                <label className="mb-2 block font-display text-jacarta-700 dark:text-white">
                  Cover <span className="text-red">*</span>
                </label>

                <ReactImageUploading
                  multiple
                  value={coverImages}
                  onChange={handleChangeCover}
                  maxNumber={1}
                >
                  {({ imageList, onImageUpload, onImageUpdate }) => (
                    <div
                      onClick={() => {
                        if (imageList[0]) onImageUpdate(0);
                        else onImageUpload();
                      }}
                      className="group relative flex h-48 max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-jacarta-100 bg-white p-5 text-center dark:border-jacarta-600 dark:bg-jacarta-700"
                    >
                      {!imageList[0] && (
                        <>
                          <div className="relative z-10 cursor-pointer">
                            <DragDropIcon className="mb-4 inline-block fill-jacarta-500 dark:fill-white" />
                            <p className="mx-auto max-w-xs text-xs dark:text-jacarta-300">
                              JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB,
                              GLTF. Max size: 100 MB
                            </p>
                          </div>
                          <div className="absolute inset-4 cursor-pointer rounded bg-jacarta-50 opacity-0 group-hover:opacity-100 dark:bg-jacarta-600" />
                        </>
                      )}
                      {imageList[0] && (
                        <div className="h-full cursor-pointer group-hover:opacity-75">
                          <img
                            src={imageList[0].dataURL}
                            alt="article_cover"
                            className="h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </ReactImageUploading>
              </div>

              {/* <!-- Name --> */}
              <div className="mb-6">
                <label
                  htmlFor="article-title"
                  className="mb-2 block font-display text-jacarta-700 dark:text-white"
                >
                  Title <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  id="article-title"
                  className="w-full rounded-lg border-jacarta-100 p-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                  placeholder="Article title"
                  onBlur={(e) => setFieldValue('title', e.target.value)}
                />
                {touched.title && errors.title ? (
                  <span className="text-sm text-red">{errors.title}</span>
                ) : null}
              </div>

              {/* <!-- Article --> */}
              <div className="mb-6">
                <label className="mb-2 block font-display text-jacarta-700 dark:text-white">
                  Article <span className="text-red">*</span>
                </label>
                <TextEditor onChange={handleChangeEditor} />
                {touched.content && errors.content ? (
                  <span className="text-sm text-red">{errors.content}</span>
                ) : null}
              </div>

              {/* <!-- Submit --> */}
              <button
                type="submit"
                className="block rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
              >
                Create
              </button>
            </div>
          </div>
        </section>
      </Form>
    </FormikProvider>
  );
};

export default PublishPage;
