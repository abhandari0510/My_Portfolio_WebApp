import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="36"
      height="36"
      viewBox="0 0 48 48"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path
            clipRule="evenodd"
            d="M24 3 43 45h-8.3L31 36.4H17L13.3 45H5L24 3Zm-4.1 26.5h8.2L24 19.7l-4.1 9.8Z"
            fillRule="evenodd"
          />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
