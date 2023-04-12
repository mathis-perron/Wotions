import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Custom404Props {}

const Custom404: React.FC<Custom404Props> = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  });

  return null;
};

export default Custom404;
