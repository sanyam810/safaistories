"use client";

import Nav from '@/components/nav';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

const AdminDashboard = () => {
    return (
        <div>
            <div>
                <Nav />
            </div>
            <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-6">Welcome, Admin!</h1>
            <div className="flex gap-4">
                <Link href="/postspanel" passHref>
                  <Button>Post Dashboard</Button>
                </Link>
                <Link href="/commentspanel" passHref>
                  <Button>Comments Dashboard</Button>
                </Link>
                <Link href="/highlightpanel" passHref>
                  <Button>Highlights Dashboard</Button>
                </Link>
            </div>
            </div>
        </div>
    );
  };

export default AdminDashboard;