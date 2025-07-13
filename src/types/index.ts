export interface SubSection {
  id: string;
  title: string;
  type: 'tutorial' | 'exercise';
  completed: boolean;
  completedDate?: string; // ISO格式的日期字符串
  url?: string;
}

export interface Chapter {
  id: string;
  title: string;
  subSections: SubSection[];
  expanded: boolean;
}

export interface ProgressData {
  chapters: Chapter[];
  lastUpdated: string;
}

export interface LocalStorageData {
  progress: ProgressData;
  version: string; // 用于数据迁移
} 