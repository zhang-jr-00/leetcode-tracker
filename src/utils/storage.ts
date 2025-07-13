import { ProgressData, Chapter, LocalStorageData } from '../types';

const STORAGE_KEY = 'leetcode-progress';
const CURRENT_VERSION = '1.0.0';

export const saveProgress = (data: ProgressData): void => {
  try {
    const storageData: LocalStorageData = {
      progress: data,
      version: CURRENT_VERSION
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  } catch (error) {
    console.error('Failed to save progress:', error);
    throw error;
  }
};

export const loadProgress = (): ProgressData | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    
    // 处理旧版本数据格式（向后兼容）
    if (parsed.chapters) {
      // 旧版本格式，直接返回
      return parsed;
    }
    
    // 新版本格式
    if (parsed.progress && parsed.version) {
      return parsed.progress;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return null;
  }
};

export const clearProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear progress:', error);
    throw error;
  }
};

// 更新单个小节的完成状态（包含日期记录）
export const updateSubSectionProgress = (
  chapters: Chapter[],
  chapterId: string,
  subSectionId: string,
  completed: boolean
): Chapter[] => {
  return chapters.map(chapter => {
    if (chapter.id === chapterId) {
      return {
        ...chapter,
        subSections: chapter.subSections.map(subSection => {
          if (subSection.id === subSectionId) {
            return {
              ...subSection,
              completed,
              completedDate: completed ? new Date().toISOString() : undefined
            };
          }
          return subSection;
        })
      };
    }
    return chapter;
  });
};

// 更新章节展开状态
export const updateChapterExpanded = (
  chapters: Chapter[],
  chapterId: string,
  expanded: boolean
): Chapter[] => {
  return chapters.map(chapter => {
    if (chapter.id === chapterId) {
      return { ...chapter, expanded };
    }
    return chapter;
  });
};

// 获取进度统计信息
export const getProgressStats = (chapters: Chapter[]) => {
  let totalSections = 0;
  let completedSections = 0;
  let totalExercises = 0;
  let completedExercises = 0;
  let totalTutorials = 0;
  let completedTutorials = 0;

  chapters.forEach(chapter => {
    chapter.subSections.forEach(subSection => {
      totalSections++;
      if (subSection.completed) {
        completedSections++;
      }

      if (subSection.type === 'exercise') {
        totalExercises++;
        if (subSection.completed) {
          completedExercises++;
        }
      } else if (subSection.type === 'tutorial') {
        totalTutorials++;
        if (subSection.completed) {
          completedTutorials++;
        }
      }
    });
  });

  return {
    totalSections,
    completedSections,
    totalExercises,
    completedExercises,
    totalTutorials,
    completedTutorials,
    completionRate: totalSections > 0 ? (completedSections / totalSections * 100).toFixed(1) : '0'
  };
};

// 检查localStorage是否可用
export const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

// 导出数据（用于备份）
export const exportProgress = (): string => {
  try {
    const data = loadProgress();
    if (!data) {
      throw new Error('没有可导出的数据');
    }
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('导出数据失败:', error);
    throw error;
  }
};

// 导入数据（用于恢复）
export const importProgress = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    if (!data.chapters) {
      throw new Error('数据格式不正确');
    }
    saveProgress(data);
    return true;
  } catch (error) {
    console.error('导入数据失败:', error);
    return false;
  }
};

// 获取存储信息
export const getStorageInfo = () => {
  try {
    const data = loadProgress();
    if (!data) {
      return {
        hasData: false,
        size: 0,
        lastUpdated: null
      };
    }
    
    const dataString = JSON.stringify(data);
    return {
      hasData: true,
      size: new Blob([dataString]).size,
      lastUpdated: data.lastUpdated ? new Date(data.lastUpdated) : null
    };
  } catch (error) {
    return {
      hasData: false,
      size: 0,
      lastUpdated: null,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
}; 