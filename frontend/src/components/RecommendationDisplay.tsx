import React from 'react';

interface RecommendationDisplayProps {
  recommendation: string;
}

const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({ recommendation }) => (
  <pre style={{ background: '#e9f7ef', padding: 20, borderRadius: 8, fontSize: 16, whiteSpace: 'pre-wrap', marginBottom: 24 }}>{recommendation}</pre>
);

export { RecommendationDisplay }; 