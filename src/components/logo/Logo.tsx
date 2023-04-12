import Image from 'next/image';

import BlackLogo from '@/public/images/logo.png';

interface LogoProps {
  height: number;
  width: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ height, width, className }) => {
  // TODO: Logo
  return (
    <Image
      src={BlackLogo}
      height={height}
      width={width}
      alt="Wotions"
      className={className}
      priority
    />
  );
};

export default Logo;
