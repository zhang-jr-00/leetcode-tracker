export interface SubSection {
  id: string;
  title: string;
  type: 'tutorial' | 'exercise';
  completed: boolean;
  completedDate?: string; // ISO格式的日期字符串
  url?: string;
  liked?: boolean;
  comment?: string;
  likedDate?: string; // ISO格式的日期字符串
}

export interface Chapter {
  id: string;
  title: string;
  subSections: SubSection[];
  expanded: boolean;
}

export interface LikedSubSection {
  id: string;
  chapterId: string;
  chapterTitle: string;
  title: string;
  type: 'tutorial' | 'exercise';
  comment?: string;
  likedDate: string; // ISO格式的日期字符串
}

export interface ProgressData {
  chapters: Chapter[];
  lastUpdated: string;
  likedSubSections?: LikedSubSection[];
}

export interface ExportInfo {
  totalChapters: number;
  totalSubSections: number;
  completedSections: number;
  likedSections: number;
}

export interface LocalStorageData {
  progress: ProgressData;
  version: string; // 用于数据迁移
  exportDate?: string; // 导出时间
  exportInfo?: ExportInfo; // 导出时的统计信息
} 