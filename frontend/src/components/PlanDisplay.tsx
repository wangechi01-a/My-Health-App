import React from 'react';

interface PlanDisplayProps {
  plan: string;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan }) => (
  <pre style={{ background: '#f8f9fa', padding: 20, borderRadius: 8, fontSize: 16, whiteSpace: 'pre-wrap', marginBottom: 24 }}>{plan}</pre>
);

export { PlanDisplay }; 