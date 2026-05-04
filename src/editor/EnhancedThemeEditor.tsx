/**
 * 增强型主题编辑器组件
 * 提供更完善的主题编辑功能，包含预设主题、导入导出、实时预览等
 */
import React, { useState, useCallback } from 'react';

import type { ThemeOptions } from '../themes';
import { useThemeEditorState } from './hooks/useThemeEditorState';
import ThemeSelector from './components/ThemeSelector';
import ThemeColorEditor from './components/ThemeColorEditor';
import ThemeBasicSettings from './components/ThemeBasicSettings';

// ============================================================================
// 类型定义
// ============================================================================

/**
 * 主题导出选项
 */
export interface ThemeExportOptions {
  format: 'json' | 'css' | 'scss';
  includeVariables: boolean;
  minify: boolean;
}

/**
 * 增强型主题编辑器属性
 */
export interface EnhancedThemeEditorProps {
  /** 当前选中的主题名称 */
  selectedTheme?: string;
  /** 主题变更回调函数 */
  onThemeChange?: (theme: ThemeOptions) => void;
  /** 主题保存回调函数 */
  onThemeSave?: (theme: ThemeOptions) => void;
  /** 主题导入回调函数 */
  onThemeImport?: (theme: ThemeOptions) => void;
  /** 主题导出回调函数 */
  onThemeExport?: (theme: ThemeOptions) => string;
  /** 是否禁用编辑器 */
  disabled?: boolean;
  /** 编辑器样式 */
  style?: React.CSSProperties;
  /** 编辑器类名 */
  className?: string;
  /** 是否显示实时预览 */
  showPreview?: boolean;
  /** 是否启用自动保存 */
  autoSave?: boolean;
  /** 自动保存延迟（毫秒） */
  autoSaveDelay?: number;
}

/** 编辑器标签页 */
type EditorTab = 'colors' | 'layout' | 'typography' | 'preview';

// ============================================================================
// 组件实现
// ============================================================================

/**
 * 增强型主题编辑器组件
 */
const EnhancedThemeEditor: React.FC<EnhancedThemeEditorProps> = ({
  selectedTheme,
  onThemeChange,
  onThemeSave,
  onThemeImport,
  onThemeExport,
  disabled = false,
  style = {},
  className = '',
  showPreview = true,
  autoSave = false,
  autoSaveDelay = 1000,
}) => {
  const {
    currentTheme,
    registeredThemes,
    colors,
    backgroundColor,
    textColor,
    darkMode,
    isEditing,
    newThemeName,
    setCurrentTheme,
    updateTheme,
    handleColorChange,
    handleAddColor,
    handleRemoveColor,
    handleStartEdit,
    setNewThemeName,
    saveTheme,
    cancelEdit,
  } = useThemeEditorState({ selectedTheme, onThemeChange });

  // 当前标签页
  const [activeTab, setActiveTab] = useState<EditorTab>('colors');
  // 导出数据
  const [exportData, setExportData] = useState<string>('');
  // 导入数据
  const [importData, setImportData] = useState<string>('');
  // 导入错误
  const [importError, setImportError] = useState<string>('');

  // 处理保存主题
  const handleSaveTheme = useCallback(() => {
    const themeToSave = saveTheme();
    onThemeSave?.(themeToSave);
  }, [saveTheme, onThemeSave]);

  // 导出主题
  const handleExport = useCallback(() => {
    try {
      if (onThemeExport) {
        const data = onThemeExport(currentTheme);
        setExportData(data);
      } else {
        setExportData(JSON.stringify(currentTheme, null, 2));
      }
    } catch {
      setExportData('');
    }
  }, [currentTheme, onThemeExport]);

  // 复制到剪贴板
  const handleCopyExport = useCallback(async () => {
    if (!exportData) return;
    try {
      await navigator.clipboard.writeText(exportData);
    } catch {
      // 复制失败时静默处理
    }
  }, [exportData]);

  // 导入主题
  const handleImport = useCallback(() => {
    setImportError('');
    if (!importData.trim()) {
      setImportError('请输入主题数据');
      return;
    }
    try {
      const theme = JSON.parse(importData) as ThemeOptions;
      if (!theme.name || !Array.isArray(theme.colors)) {
        setImportError('无效的主题格式');
        return;
      }
      updateTheme(theme);
      onThemeImport?.(theme);
      setImportData('');
    } catch {
      setImportError('JSON 解析失败');
    }
  }, [importData, updateTheme, onThemeImport]);

  // 标签页内容
  const renderTabContent = () => {
    switch (activeTab) {
      case 'colors':
        return (
          <>
            <ThemeColorEditor
              colors={colors}
              disabled={disabled}
              onColorChange={handleColorChange}
              onAddColor={handleAddColor}
              onRemoveColor={handleRemoveColor}
            />
            <ThemeBasicSettings
              backgroundColor={backgroundColor}
              textColor={textColor}
              darkMode={darkMode}
              disabled={disabled}
              onBackgroundColorChange={(color) => updateTheme({ backgroundColor: color })}
              onTextColorChange={(color) => updateTheme({ textColor: color })}
              onDarkModeChange={(mode) => updateTheme({ darkMode: mode })}
            />
          </>
        );

      case 'layout':
        return (
          <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
            布局配置功能即将上线
          </div>
        );

      case 'typography':
        return (
          <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
            字体配置功能即将上线
          </div>
        );

      case 'preview':
        return (
          <div
            style={{
              padding: '20px',
              backgroundColor,
              color: textColor,
              borderRadius: '4px',
              minHeight: '200px',
            }}
          >
            <h4 style={{ color: textColor }}>主题预览</h4>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              {colors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: color,
                    borderRadius: '4px',
                  }}
                />
              ))}
            </div>
            <p style={{ marginTop: '10px', color: textColor }}>
              背景色: {backgroundColor} | 文本色: {textColor} | 深色模式: {darkMode ? '开启' : '关闭'}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`taroviz-theme-editor-enhanced ${className}`}
      style={{
        padding: '20px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        ...style,
      }}
    >
      <h3>增强型主题编辑器</h3>

      {/* 主题选择 */}
      <ThemeSelector
        themes={registeredThemes}
        currentTheme={currentTheme}
        disabled={disabled}
        onSelect={setCurrentTheme}
        onCreateNew={handleStartEdit}
      />

      {/* 新主题编辑 */}
      {isEditing && (
        <div
          style={{
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
          }}
        >
          <h4>新建主题</h4>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>主题名称:</label>
            <input
              type="text"
              value={newThemeName}
              onChange={(e) => setNewThemeName(e.target.value)}
              disabled={disabled}
              style={{
                padding: '8px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                width: '100%',
                opacity: disabled ? 0.6 : 1,
              }}
              placeholder="输入主题名称"
            />
          </div>
          <button
            onClick={cancelEdit}
            disabled={disabled}
            style={{
              padding: '6px 12px',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              backgroundColor: '#ffffff',
              color: '#333333',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.6 : 1,
            }}
          >
            取消
          </button>
        </div>
      )}

      {/* 导入导出工具 */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={handleExport}
          disabled={disabled}
          style={{
            padding: '8px 16px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            color: '#333333',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
          }}
        >
          导出主题
        </button>
        <button
          onClick={handleCopyExport}
          disabled={disabled || !exportData}
          style={{
            padding: '8px 16px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            color: '#333333',
            cursor: disabled || !exportData ? 'not-allowed' : 'pointer',
            opacity: disabled || !exportData ? 0.6 : 1,
          }}
        >
          复制到剪贴板
        </button>
      </div>

      {exportData && (
        <div style={{ marginBottom: '20px' }}>
          <textarea
            value={exportData}
            readOnly
            style={{
              width: '100%',
              height: '100px',
              padding: '10px',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              resize: 'vertical',
            }}
          />
        </div>
      )}

      {/* 导入区域 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>导入主题</h4>
        <textarea
          value={importData}
          onChange={(e) => setImportData(e.target.value)}
          disabled={disabled}
          placeholder="粘贴主题 JSON 数据..."
          style={{
            width: '100%',
            height: '80px',
            padding: '10px',
            border: `1px solid ${importError ? '#ff4d4f' : '#e0e0e0'}`,
            borderRadius: '4px',
            resize: 'vertical',
            opacity: disabled ? 0.6 : 1,
          }}
        />
        {importError && (
          <p style={{ color: '#ff4d4f', marginTop: '5px', fontSize: '12px' }}>{importError}</p>
        )}
        <button
          onClick={handleImport}
          disabled={disabled}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            color: '#333333',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
          }}
        >
          导入
        </button>
      </div>

      {/* 标签页切换 */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #e0e0e0',
          marginBottom: '20px',
        }}
      >
        {[
          { key: 'colors' as EditorTab, label: '颜色' },
          { key: 'layout' as EditorTab, label: '布局' },
          { key: 'typography' as EditorTab, label: '字体' },
          ...(showPreview ? [{ key: 'preview' as EditorTab, label: '预览' }] : []),
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderBottom: `2px solid ${activeTab === tab.key ? '#1890ff' : 'transparent'}`,
              backgroundColor: 'transparent',
              color: activeTab === tab.key ? '#1890ff' : '#333333',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 标签页内容 */}
      <div style={{ marginBottom: '20px' }}>{renderTabContent()}</div>

      {/* 保存按钮 */}
      <button
        onClick={handleSaveTheme}
        disabled={disabled}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#1890ff',
          color: '#ffffff',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        保存主题
      </button>
    </div>
  );
};

export default EnhancedThemeEditor;
