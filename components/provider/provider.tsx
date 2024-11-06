'use client';
import { AuthProvider } from '@/context/auth';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const AppProvider = (props: Props) => {
  return <AuthProvider>{props.children}</AuthProvider>;
};

export default AppProvider;
