import React from 'react';
import { SubSection as SubSectionType } from '../types';
import './SubSection.css';

interface SubSectionProps {
  subSection: SubSectionType;
  onToggleComplete: (id: string) => void;
}

const SubSection: React.FC<SubSectionProps> = ({ subSection, onToggleComplete }) => {
  const handleCheckboxChange = () => {
    onToggleComplete(subSection.id);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '';
    }
  };

  return (
    <div className={`subsection ${subSection.type}`}>
      <label className="subsection-label">
        <input
          type="checkbox"
          checked={subSection.completed}
          onChange={handleCheckboxChange}
          className="subsection-checkbox"
        />
        <div className="subsection-content">
          <span className="subsection-title">{subSection.title}</span>
          <div className="subsection-meta">
            <span className={`subsection-type ${subSection.type}`}>
              {subSection.type === 'tutorial' ? '教程' : '习题'}
            </span>
            {subSection.completed && subSection.completedDate && (
              <span className="completion-date">
                完成于: {formatDate(subSection.completedDate)}
              </span>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default SubSection; 