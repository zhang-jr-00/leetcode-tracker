import React from 'react';
import { LikedSubSection } from '../types';
import './LikedSubSections.css';

interface LikedSubSectionsProps {
  likedSubSections: LikedSubSection[];
  onUnlike: (id: string) => void;
  onEditComment: (id: string, comment: string) => void;
}

const LikedSubSections: React.FC<LikedSubSectionsProps> = ({ 
  likedSubSections, 
  onUnlike, 
  onEditComment 
}) => {
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

  if (likedSubSections.length === 0) {
    return null;
  }

  return (
    <div className="liked-subsections">
      <div className="liked-header">
        <span className="liked-icon">❤️</span>
        <span className="liked-title">收藏的小节 ({likedSubSections.length})</span>
      </div>
      <div className="liked-list">
        {likedSubSections.map((likedSub) => (
          <div key={likedSub.id} className="liked-item">
            <div className="liked-item-header">
              <div className="liked-item-info">
                <span className="liked-item-title">{likedSub.title}</span>
                <span className={`liked-item-type ${likedSub.type}`}>
                  {likedSub.type === 'tutorial' ? '教程' : '习题'}
                </span>
                <span className="liked-item-chapter">{likedSub.chapterTitle}</span>
              </div>
              <div className="liked-item-actions">
                <button 
                  className="unlike-btn"
                  onClick={() => onUnlike(likedSub.id)}
                  title="取消收藏"
                >
                  ❌
                </button>
              </div>
            </div>
            {likedSub.comment && (
              <div className="liked-item-comment">
                <span className="comment-label">备注:</span>
                <span className="comment-text">{likedSub.comment}</span>
                <button 
                  className="edit-comment-btn"
                  onClick={() => {
                    const newComment = prompt('编辑备注:', likedSub.comment);
                    if (newComment !== null) {
                      onEditComment(likedSub.id, newComment);
                    }
                  }}
                  title="编辑备注"
                >
                  ✏️
                </button>
              </div>
            )}
            {!likedSub.comment && (
              <div className="liked-item-comment">
                <button 
                  className="add-comment-btn"
                  onClick={() => {
                    const comment = prompt('添加备注:');
                    if (comment !== null) {
                      onEditComment(likedSub.id, comment);
                    }
                  }}
                  title="添加备注"
                >
                  + 添加备注
                </button>
              </div>
            )}
            <div className="liked-item-date">
              收藏于: {formatDate(likedSub.likedDate)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedSubSections; 