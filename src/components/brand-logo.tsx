import Image from 'next/image';
import { BRAND_LOGO_ALT, BRAND_LOGO_PATH } from '@/lib/brand';

const SIZE_PX = {
  sm: 28,
  md: 32,
  lg: 40,
} as const;

type BrandLogoProps = {
  size?: keyof typeof SIZE_PX;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ size = 'md', className = '', priority }: BrandLogoProps) {
  const px = SIZE_PX[size];

  return (
    <Image
      src={BRAND_LOGO_PATH}
      alt={BRAND_LOGO_ALT}
      width={px}
      height={px}
      className={`shrink-0 rounded-lg object-contain ${className}`}
      priority={priority}
    />
  );
}
