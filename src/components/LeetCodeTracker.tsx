import React, { useState, useEffect, useCallback } from 'react';
import { Chapter as ChapterType, ProgressData } from '../types';
import { initialChapters } from '../data/initialData';
import { 
  saveProgress, 
  loadProgress, 
  clearProgress, 
  updateSubSectionProgress,
  getProgressStats,
  isLocalStorageAvailable
} from '../utils/storage';
import Chapter from './Chapter';
import './LeetCodeTracker.css';

const LeetCodeTracker: React.FC = () => {
  const [chapters, setChapters] = useState<ChapterType[]>(initialChapters);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [storageAvailable, setStorageAvailable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 检查localStorage可用性
  useEffect(() => {
    setStorageAvailable(isLocalStorageAvailable());
  }, []);

  // 加载保存的进度
  const loadSavedProgress = useCallback(() => {
    try {
      const savedProgress = loadProgress();
      if (savedProgress && savedProgress.chapters) {
        // 确保所有章节都有正确的结构
        const mergedChapters = initialChapters.map(initialChapter => {
          const savedChapter = savedProgress.chapters.find(ch => ch.id === initialChapter.id);
          if (savedChapter) {
            // 合并初始数据和保存的数据
            return {
              ...initialChapter,
              expanded: savedChapter.expanded,
              subSections: initialChapter.subSections.map(initialSub => {
                const savedSub = savedChapter.subSections.find(sub => sub.id === initialSub.id);
                return savedSub ? {
                  ...initialSub,
                  completed: savedSub.completed,
                  completedDate: savedSub.completedDate
                } : initialSub;
              })
            };
          }
          return initialChapter;
        });
        
        setChapters(mergedChapters);
        if (savedProgress.lastUpdated) {
          setLastSaved(new Date(savedProgress.lastUpdated));
        }
      }
    } catch (error) {
      console.error('加载进度数据失败:', error);
      // 如果加载失败，使用初始数据
      setChapters(initialChapters);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 初始加载
  useEffect(() => {
    loadSavedProgress();
  }, [loadSavedProgress]);

  // 监听storage变化（跨标签页同步）
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'leetcode-progress' && e.newValue) {
        // 其他标签页修改了数据，重新加载
        loadSavedProgress();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadSavedProgress]);

  // 保存进度到本地存储
  useEffect(() => {
    if (!storageAvailable || isLoading) return;
    
    const progressData: ProgressData = {
      chapters,
      lastUpdated: new Date().toISOString()
    };
    
    saveProgress(progressData);
    setLastSaved(new Date());
  }, [chapters, storageAvailable, isLoading]);

  const handleToggleExpand = (chapterId: string) => {
    setChapters(prevChapters =>
      prevChapters.map(chapter =>
        chapter.id === chapterId
          ? { ...chapter, expanded: !chapter.expanded }
          : chapter
      )
    );
  };

  const handleToggleSubSection = (chapterId: string, subSectionId: string) => {
    setChapters(prevChapters => {
      const currentSubSection = prevChapters
        .find(ch => ch.id === chapterId)
        ?.subSections.find(sub => sub.id === subSectionId);
      
      const newCompleted = !currentSubSection?.completed;
      
      return updateSubSectionProgress(
        prevChapters,
        chapterId,
        subSectionId,
        newCompleted
      );
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('确定要重置所有进度吗？此操作不可撤销。')) {
      setChapters(initialChapters);
      clearProgress();
      setLastSaved(new Date());
    }
  };

  const handleExpandAll = () => {
    setChapters(prevChapters =>
      prevChapters.map(chapter => ({ ...chapter, expanded: true }))
    );
  };

  const handleCollapseAll = () => {
    setChapters(prevChapters =>
      prevChapters.map(chapter => ({ ...chapter, expanded: false }))
    );
  };

  // 获取详细的进度统计
  const stats = getProgressStats(chapters);

  if (isLoading) {
    return (
      <div className="leetcode-tracker">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          color: 'white',
          fontSize: '18px'
        }}>
          正在加载进度数据...
        </div>
      </div>
    );
  }

  return (
    <div className="leetcode-tracker">
      <header className="tracker-header">
        <div className="header-content">
          <h1 className="tracker-title">
            <span className="title-icon">📚</span>
            LeetCode 刷题进度跟踪器
          </h1>
          <p className="tracker-subtitle">
            跟随 <a 
              href="https://programmercarl.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="source-link"
            >
              programmercarl.com
            </a> 学习算法
          </p>
        </div>
        
        <div className="overall-progress">
          <div className="progress-info">
            <span className="progress-label">总体进度</span>
            <span className="progress-numbers">
              {stats.completedSections}/{stats.totalSections}
            </span>
          </div>
          <div className="overall-progress-bar">
            <div 
              className="overall-progress-fill" 
              style={{ width: `${stats.completionRate}%` }}
            ></div>
          </div>
          <span className="progress-percentage">
            {stats.completionRate}%
          </span>
        </div>

        {/* 详细统计信息 */}
        <div className="detailed-stats">
          <div className="stat-item">
            <span className="stat-label">练习题:</span>
            <span className="stat-value">{stats.completedExercises}/{stats.totalExercises}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">教程:</span>
            <span className="stat-value">{stats.completedTutorials}/{stats.totalTutorials}</span>
          </div>
        </div>
      </header>

      {!storageAvailable && (
        <div className="storage-warning">
          ⚠️ 本地存储不可用，进度将无法保存
        </div>
      )}

      <div className="tracker-controls">
        <div className="control-buttons">
          <button onClick={handleExpandAll} className="control-btn">
            展开全部
          </button>
          <button onClick={handleCollapseAll} className="control-btn">
            折叠全部
          </button>
          <button onClick={handleResetProgress} className="control-btn reset-btn">
            重置进度
          </button>
        </div>
      </div>

      <main className="tracker-content">
        {chapters.map(chapter => (
          <Chapter
            key={chapter.id}
            chapter={chapter}
            onToggleExpand={handleToggleExpand}
            onToggleSubSection={handleToggleSubSection}
          />
        ))}
      </main>

      <footer className="tracker-footer">
        <p>
          进度自动保存到本地存储 • 
          最后更新: {lastSaved.toLocaleString('zh-CN')}
          {storageAvailable ? ' • 存储状态: 正常' : ' • 存储状态: 不可用'}
        </p>
      </footer>
    </div>
  );
};

export default LeetCodeTracker; 