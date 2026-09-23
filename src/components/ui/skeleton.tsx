import * as React from 'react';
import { cn } from '../../lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md', className)}
      style={{ backgroundColor: 'var(--muted)' }}
      aria-busy="true"
      aria-label="Loading..."
      {...props}
    />
  );
}

export { Skeleton };
