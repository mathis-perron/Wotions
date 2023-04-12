import { doc, onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { EditIcon } from '@/components/icons/EditIcon';
import { db } from '@/configs/firebase';
import type { IUser } from '@/types';

import Profile from './Profile';
import Security from './Security';
import Social from './Social';

interface EditProfileProps {}

const EditProfile: React.FC<EditProfileProps> = () => {
  const { data } = useSession();

  const [itemActive, setItemActive] = useState(1);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (data?.user) {
      onSnapshot(doc(db, 'users', data.user.id), (snapshot) => {
        setUser(snapshot.data() as IUser);
      });
    }
  }, [db, data?.user.id]);

  // TODO: Icons
  const tabItem = [
    {
      id: 1,
      text: 'Profile',
      icon: 'owned',
    },
    {
      id: 2,
      text: 'Security',
      icon: 'owned',
    },
    {
      id: 3,
      text: 'Social',
      icon: 'created',
    },
  ];

  return data?.user && user ? (
    <section className="relative min-h-screen py-20 dark:bg-jacarta-800 md:pt-32">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <img
          src="/images/gradient_light.jpg"
          alt="gradient"
          className="h-full w-full"
        />
      </picture>

      <div className="container">
        <Tabs className="tabs">
          <TabList className="scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-b border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center">
            {tabItem.map(({ id, text }) => (
              <Tab
                role="presentation"
                key={id}
                onClick={() => setItemActive(id)}
              >
                <button
                  className={
                    itemActive === id
                      ? 'nav-link active relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white'
                      : 'nav-link relative flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white'
                  }
                >
                  <EditIcon className="mr-1 h-4 w-4 fill-jacarta-400 group-hover:fill-white group-focus:fill-white dark:fill-white" />
                  <span className="font-display text-base font-medium">
                    {text}
                  </span>
                </button>
              </Tab>
            ))}
          </TabList>
          <TabPanel>
            <Profile user={user} userId={data.user.id} />
          </TabPanel>
          <TabPanel>
            <Security user={user} userId={data.user.id} />
          </TabPanel>
          <TabPanel>
            <Social user={user} userId={data.user.id} />
          </TabPanel>
        </Tabs>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default EditProfile;
