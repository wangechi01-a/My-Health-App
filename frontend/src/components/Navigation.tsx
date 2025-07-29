import React from 'react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'profile', label: 'Weekly Plan' },
  { id: 'recommendations', label: 'Get Advice' },
  { id: 'history', label: 'History' },
];

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => (
  <nav style={{ display: 'flex', gap: 0, background: '#e8f5e9', borderRadius: 8, padding: 4, marginBottom: 24 }}>
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        style={{
          flex: 1,
          padding: '12px 0',
          background: activeTab === tab.id ? 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)' : 'transparent',
          color: activeTab === tab.id ? '#fff' : '#388e3c',
          border: 'none',
          borderRadius: 6,
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {tab.label}
      </button>
    ))}
  </nav>
);

export { Navigation }; 