'use client';

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

// 1. Define the custom configuration
const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        // In v3, tokens must have a 'value' property
        brand: {
          50: { value: '#eef2ff' },
          100: { value: '#e0e7ff' },
          500: { value: '#3b82f6' }, // Main Action Blue
          900: { value: '#0f172a' }, // Depth/Sidebar Slate
        },
        status: {
          warning: { value: '#f59e0b' },
          danger: { value: '#dc2626' },
        },
      },
      fonts: {
        heading: { value: 'var(--font-geist-sans)' },
        body: { value: 'var(--font-geist-sans)' },
        mono: { value: 'var(--font-geist-mono)' },
      },
    },
  },
});

// 2. Create the system (this replaces the old extendTheme)
const system = createSystem(defaultConfig, customConfig);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* 3. Pass the system to 'value', not 'theme' */}
      <ChakraProvider value={system}>
        {children}
      </ChakraProvider>
    </SessionProvider>
  );
}