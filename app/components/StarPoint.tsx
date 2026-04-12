'use client'
import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/app/style/StarPoint.css';

interface StarPointProps {
  point: number;
  opts?: {
    cls?: string;
  };
}

const StarPoint = ({ point, opts = {} }: StarPointProps) => {
  // 10점 만점을 0.5단위(10% 단위)로 올림하여 퍼센트 계산
  const percentage = Math.min(Math.max(Math.ceil(point) * 10, 0), 100);

  return (
    <em 
      role="img" 
      aria-label={`평점 ${point}/10점 만점`} 
      className={`ui-star ${opts.cls || ''}`}
    >
      <span className="star-fg text-primary" style={{ width: `${percentage}%` }}>
        <FontAwesomeIcon icon={["fas", "star"]} />
        <FontAwesomeIcon icon={["fas", "star"]} />
        <FontAwesomeIcon icon={["fas", "star"]} />
        <FontAwesomeIcon icon={["fas", "star"]} />
        <FontAwesomeIcon icon={["fas", "star"]} />
      </span>
      <span className="star-bg">
        <FontAwesomeIcon icon={["fas", "star"]} />
        <FontAwesomeIcon icon={["fas", "star"]} />
        <FontAwesomeIcon icon={["fas", "star"]} />
        <FontAwesomeIcon icon={["fas", "star"]} />
        <FontAwesomeIcon icon={["fas", "star"]} />
      </span>
    </em>
  );
};

export default memo(StarPoint);
