import React, { useState } from 'react';
import { Layout, Database, Edit2 } from 'lucide-react';
import { startAutomation } from '../utils/api';

interface SystemIcon {
  id: 'slate' | 'erp';
  name: string;
  icon: React.ReactNode;
  bgColor: string;
  hoverColor: string;
}

export default function IconSection() {
  const [isLoading, setIsLoading] = useState<'slate' | 'erp' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const systems: SystemIcon[] = [
    {
      id: 'slate',
      name: 'Slate',
      icon: <Layout className="h-8 w-8" />,
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-500'
    },
    {
      id: 'erp',
      name: 'ERP UoL',
      icon: <Database className="h-8 w-8" />,
      bgColor: 'bg-green-600',
      hoverColor: 'hover:bg-green-500'
    }
  ];

  const handleSystemClick = async (systemId: 'slate' | 'erp') => {
    if (isLoading) return;

    setIsLoading(systemId);
    setError(null);

    try {
      await startAutomation(systemId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">System Access</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center justify-between">
          <span>{error}</span>
          <button 
            onClick={() => setError(null)} 
            className="text-red-700 hover:text-red-900"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {systems.map((system) => (
          <div key={system.id} className="relative">
            <button
              onClick={() => handleSystemClick(system.id)}
              disabled={isLoading !== null}
              className={`w-full h-32 ${system.bgColor} ${
                isLoading ? 'opacity-75 cursor-not-allowed' : system.hoverColor
              } text-white rounded-lg transition-all duration-200 flex flex-col items-center justify-center space-y-2`}
            >
              {isLoading === system.id ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
                  <span className="text-sm">Starting automation...</span>
                </div>
              ) : (
                <>
                  {system.icon}
                  <span className="font-semibold">{system.name}</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}