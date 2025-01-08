'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { agents } from '../utils/constants';

const Dashboard: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <header className="bg-blue-800 text-white py-6 rounded-lg shadow-md">
          <h1 className="text-center text-3xl font-bold">Agent Dashboard</h1>
        </header>
        <main className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <button
              key={agent.name}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md cursor-pointer border-2 transition-all hover:shadow-lg hover:border-blue-500"
              onClick={() => router.push(`agent/${agent.name.replaceAll(' ', '-').toLowerCase()}`)}
            >
              <agent.icon className="text-4xl text-blue-800 mb-4" />
              <h2 className="text-xl font-semibold text-center mb-2">{agent.name}</h2>
              <p className="text-gray-600 text-center text-sm">{agent.description}</p>
            </button>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
