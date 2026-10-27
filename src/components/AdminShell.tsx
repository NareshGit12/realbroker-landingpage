import React from 'react';
import { Toaster as Sonner } from '@/components/ui/sonner';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Admin and login pages only: toasts and the admin guard load with them, not with the public site.
export default function AdminShell({ children, protect }: { children: React.ReactNode; protect?: boolean }) {
  return <>
    <Sonner />
    {protect ? <ProtectedRoute requireAdmin>{children}</ProtectedRoute> : children}
  </>;
}
