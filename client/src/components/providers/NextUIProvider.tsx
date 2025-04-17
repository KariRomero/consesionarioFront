// src/components/providers/NextUIProvider.tsx
'use client';

import { NextUIProvider } from '@nextui-org/react';

export default function CustomNextUIProvider({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}