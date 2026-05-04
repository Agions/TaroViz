/**
 * TaroViz 主题编辑器组件
 * 提供可视化的主题编辑功能
 */
import React from 'react';

import type { ThemeOptions } from '../themes';
import { useThemeEditorState } from './hooks/useThemeEditorState';
import ThemeSelector from './components/ThemeSelector';
import ThemeColorEditor from './components/ThemeColorEditor';
import ThemeBasicSettings from './components/ThemeBasicSettings';

/**
 * 主题编辑器属性
 */
export interface ThemeEditorProps {
  /**
   * 当前选中的主题名称
   */
  selectedTheme?: string;

  /**
   * 主题变更回调函数
   */
  onThemeChange?: (theme: ThemeOptions) => void;

  /**
   * 主题保存回调函数
   */
  onThemeSave?: (theme: ThemeOptions) => void;

  /**
   * 是否禁用编辑器
   */
  disabled?: boolean;

  /**
   * 编辑器样式
   */
  style?: React.CSSProperties;

  /**
   * 编辑器类名
   */
  className?: string;
}

/**
 * 主题编辑器组件
 */
const ThemeEditor: React.FC<ThemeEditorProps> = ({
  selectedTheme,
  onThemeChange,
  onThemeSave,
  disabled = false,
  style = {},
  className = '',
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
  } = useThemeEditorState({ selectedTheme, onThemeChange });

  // 处理保存主题
  const handleSaveTheme = () => {
    const themeToSave = saveTheme();
    onThemeSave?.(themeToSave);
  };

  return (
    <div
      className={`taroviz-theme-editor ${className}`}
      style={{
        padding: '20px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        ...style,
      }}
    >
      <h3>主题编辑器</h3>

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
        </div>
      )}

      {/* 颜色配置 */}
      <ThemeColorEditor
        colors={colors}
        disabled={disabled}
        onColorChange={handleColorChange}
        onAddColor={handleAddColor}
        onRemoveColor={handleRemoveColor}
      />

      {/* 基础配置 */}
      <ThemeBasicSettings
        backgroundColor={backgroundColor}
        textColor={textColor}
        darkMode={darkMode}
        disabled={disabled}
        onBackgroundColorChange={(color) => updateTheme({ backgroundColor: color })}
        onTextColorChange={(color) => updateTheme({ textColor: color })}
        onDarkModeChange={(mode) => updateTheme({ darkMode: mode })}
      />

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

export default ThemeEditor;
