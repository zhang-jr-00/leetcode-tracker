import React, { useRef } from 'react';
import { exportProgress, importProgress, getStorageInfo } from '../utils/storage';
import './DataManager.css';

interface DataManagerProps {
  onDataImported: () => void;
}

const DataManager: React.FC<DataManagerProps> = ({ onDataImported }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      const data = exportProgress();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leetcode-progress-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('数据导出成功！');
    } catch (error) {
      alert(`导出失败: ${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  const handleImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        importProgress(content);
        onDataImported();
        alert('数据导入成功！');
      } catch (error) {
        alert(`导入失败: ${error instanceof Error ? error.message : '未知错误'}`);
      }
    };
    reader.readAsText(file);
    
    // 清空文件输入，允许重复选择同一文件
    event.target.value = '';
  };

  const getStorageInfoText = () => {
    try {
      const info = getStorageInfo();
      if (!info.hasData) {
        return '暂无数据';
      }
      
      const sizeKB = (info.size / 1024).toFixed(1);
      const lastUpdated = info.lastUpdated 
        ? info.lastUpdated.toLocaleString('zh-CN')
        : '未知';
      
      return `数据大小: ${sizeKB}KB • 最后更新: ${lastUpdated}`;
    } catch {
      return '无法获取存储信息';
    }
  };

  return (
    <div className="data-manager">
      <div className="data-manager-header">
        <h3 className="data-manager-title">📁 数据管理</h3>
        <p className="data-manager-subtitle">
          备份和恢复你的学习进度数据
        </p>
      </div>
      
      <div className="data-manager-info">
        <span className="storage-info">{getStorageInfoText()}</span>
      </div>
      
      <div className="data-manager-actions">
        <button 
          className="data-btn export-btn"
          onClick={handleExport}
          title="导出当前所有数据到本地文件"
        >
          📤 导出数据
        </button>
        
        <button 
          className="data-btn import-btn"
          onClick={handleImport}
          title="从本地文件导入数据（会覆盖当前数据）"
        >
          📥 导入数据
        </button>
      </div>
      
      <div className="data-manager-tips">
        <div className="tip-item">
          <span className="tip-icon">💡</span>
          <span className="tip-text">
            建议定期导出数据作为备份，防止意外丢失
          </span>
        </div>
        <div className="tip-item">
          <span className="tip-icon">⚠️</span>
          <span className="tip-text">
            导入数据会覆盖当前所有进度，请谨慎操作
          </span>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default DataManager; 