import React from 'react';
import { Chapter as ChapterType } from '../types';
import SubSection from './SubSection';
import './Chapter.css';

interface ChapterProps {
  chapter: ChapterType;
  onToggleExpand: (id: string) => void;
  onToggleSubSection: (chapterId: string, subSectionId: string) => void;
  onToggleLike: (chapterId: string, subSectionId: string) => void;
  onEditComment: (chapterId: string, subSectionId: string, comment: string) => void;
}

const Chapter: React.FC<ChapterProps> = ({ 
  chapter, 
  onToggleExpand, 
  onToggleSubSection,
  onToggleLike,
  onEditComment
}) => {
  const completedCount = chapter.subSections.filter(sub => sub.completed).length;
  const totalCount = chapter.subSections.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleToggleExpand = () => {
    onToggleExpand(chapter.id);
  };

  const handleToggleSubSection = (subSectionId: string) => {
    onToggleSubSection(chapter.id, subSectionId);
  };

  const handleToggleLike = (subSectionId: string) => {
    onToggleLike(chapter.id, subSectionId);
  };

  const handleEditComment = (subSectionId: string, comment: string) => {
    onEditComment(chapter.id, subSectionId, comment);
  };

  return (
    <div className="chapter">
      <div className="chapter-header" onClick={handleToggleExpand}>
        <div className="chapter-title-section">
          <button className="expand-button">
            {chapter.expanded ? '▼' : '▶'}
          </button>
          <h3 className="chapter-title">{chapter.title}</h3>
        </div>
        <div className="chapter-progress">
          <div className="progress-text">
            {completedCount}/{totalCount}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {chapter.expanded && (
        <div className="chapter-content">
          {chapter.subSections.map(subSection => (
            <SubSection
              key={subSection.id}
              subSection={subSection}
              onToggleComplete={handleToggleSubSection}
              onToggleLike={handleToggleLike}
              onEditComment={handleEditComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Chapter; 