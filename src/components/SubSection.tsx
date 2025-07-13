import React from 'react';
import { SubSection as SubSectionType } from '../types';
import './SubSection.css';

interface SubSectionProps {
  subSection: SubSectionType;
  onToggleComplete: (id: string) => void;
  onToggleLike: (id: string) => void;
  onEditComment: (id: string, comment: string) => void;
}

const SubSection: React.FC<SubSectionProps> = ({ 
  subSection, 
  onToggleComplete, 
  onToggleLike,
  onEditComment 
}) => {
  const handleCheckboxChange = () => {
    onToggleComplete(subSection.id);
  };

  const handleLikeClick = () => {
    onToggleLike(subSection.id);
  };

  const handleCommentClick = () => {
    const comment = prompt('添加备注:', subSection.comment || '');
    if (comment !== null) {
      onEditComment(subSection.id, comment);
    }
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
          <div className="subsection-header">
            <span className="subsection-title">{subSection.title}</span>
            <div className="subsection-actions">
              <button
                className={`like-btn ${subSection.liked ? 'liked' : ''}`}
                onClick={handleLikeClick}
                title={subSection.liked ? '取消收藏' : '收藏'}
              >
                {subSection.liked ? '❤️' : '🤍'}
              </button>
              <button
                className="comment-btn"
                onClick={handleCommentClick}
                title="添加备注"
              >
                💬
              </button>
            </div>
          </div>
          <div className="subsection-meta">
            <span className={`subsection-type ${subSection.type}`}>
              {subSection.type === 'tutorial' ? '教程' : '习题'}
            </span>
            {subSection.completed && subSection.completedDate && (
              <span className="completion-date">
                完成于: {formatDate(subSection.completedDate)}
              </span>
            )}
            {subSection.liked && subSection.likedDate && (
              <span className="liked-date">
                收藏于: {formatDate(subSection.likedDate)}
              </span>
            )}
          </div>
          {subSection.comment && (
            <div className="subsection-comment">
              <span className="comment-label">备注:</span>
              <span className="comment-text">{subSection.comment}</span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default SubSection; 