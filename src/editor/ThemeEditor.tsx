/**
 * TaroViz 主题编辑器组件
 * 提供可视化的主题编辑功能
 */
import React, { useState, useEffect } from 'react';

import { ThemeOptions, getRegisteredThemes, registerTheme, switchTheme } from '../themes';

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
  // 获取已注册的主题列表
  const themes = getRegisteredThemes();

  // 状态管理
  const [currentTheme, setCurrentTheme] = useState<ThemeOptions>(themes[0] || ({} as ThemeOptions));
  const [newThemeName, setNewThemeName] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // 主题颜色状态
  const [colors, setColors] = useState<string[]>(currentTheme.colors || []);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    currentTheme.backgroundColor || '#ffffff'
  );
  const [textColor, setTextColor] = useState<string>(currentTheme.textColor || '#333333');
  const [darkMode, setDarkMode] = useState<boolean>(currentTheme.darkMode || false);

  // 当选中主题变化时，更新当前主题
  useEffect(() => {
    if (selectedTheme) {
      const theme = themes.find(t => t.name === selectedTheme);
      if (theme) {
        setCurrentTheme(theme);
        setColors(theme.colors || []);
        setBackgroundColor(theme.backgroundColor || '#ffffff');
        setTextColor(theme.textColor || '#333333');
        setDarkMode(theme.darkMode || false);
      }
    }
  }, [selectedTheme, themes]);

  // 当当前主题变化时，更新颜色等状态
  useEffect(() => {
    setColors(currentTheme.colors || []);
    setBackgroundColor(currentTheme.backgroundColor || '#ffffff');
    setTextColor(currentTheme.textColor || '#333333');
    setDarkMode(currentTheme.darkMode || false);
  }, [currentTheme]);

  // 处理主题选择
  const handleThemeSelect = (theme: ThemeOptions) => {
    setCurrentTheme(theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
    switchTheme(theme);
  };

  // 处理颜色变化
  const handleColorChange = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
    updateCurrentTheme({ colors: newColors });
  };

  // 处理背景色变化
  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
    updateCurrentTheme({ backgroundColor: color });
  };

  // 处理文本颜色变化
  const handleTextColorChange = (color: string) => {
    setTextColor(color);
    updateCurrentTheme({ textColor: color });
  };

  // 处理深色模式切换
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    updateCurrentTheme({ darkMode: newDarkMode });
  };

  // 更新当前主题
  const updateCurrentTheme = (updates: Partial<ThemeOptions>) => {
    const updatedTheme = { ...currentTheme, ...updates };
    setCurrentTheme(updatedTheme);
    if (onThemeChange) {
      onThemeChange(updatedTheme);
    }
    switchTheme(updatedTheme);
  };

  // 保存主题
  const handleSaveTheme = () => {
    const themeToSave = {
      ...currentTheme,
      colors,
      backgroundColor,
      textColor,
      darkMode,
    };

    if (isEditing && newThemeName) {
      // 保存为新主题
      registerTheme(newThemeName, themeToSave);
      setIsEditing(false);
      setNewThemeName('');
    } else {
      // 更新现有主题
      registerTheme(currentTheme.name || 'custom', themeToSave);
    }

    if (onThemeSave) {
      onThemeSave(themeToSave);
    }
  };

  // 添加新颜色
  const handleAddColor = () => {
    setColors([...colors, '#000000']);
  };

  // 删除颜色
  const handleRemoveColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
    updateCurrentTheme({ colors: newColors });
  };

  // 开始编辑新主题
  const handleStartEdit = () => {
    setIsEditing(true);
    setNewThemeName('');
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

      {/* 主题列表 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>选择主题</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
          {themes.map(theme => (
            <button
              key={theme.name}
              onClick={() => handleThemeSelect(theme)}
              disabled={disabled}
              style={{
                padding: '8px 16px',
                border: `2px solid ${currentTheme.name === theme.name ? '#1890ff' : '#e0e0e0'}`,
                borderRadius: '4px',
                backgroundColor: currentTheme.name === theme.name ? '#1890ff' : '#ffffff',
                color: currentTheme.name === theme.name ? '#ffffff' : '#333333',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
              }}
            >
              {theme.name}
            </button>
          ))}
          <button
            onClick={handleStartEdit}
            disabled={disabled}
            style={{
              padding: '8px 16px',
              border: '2px dashed #e0e0e0',
              borderRadius: '4px',
              backgroundColor: '#f5f5f5',
              color: '#333333',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.6 : 1,
            }}
          >
            + 新主题
          </button>
        </div>
      </div>

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
              onChange={e => setNewThemeName(e.target.value)}
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

      {/* 主题颜色配置 */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <h4>主题颜色</h4>
          <button
            onClick={handleAddColor}
            disabled={disabled}
            style={{
              padding: '4px 8px',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              backgroundColor: '#ffffff',
              color: '#333333',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.6 : 1,
            }}
          >
            + 添加颜色
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {colors.map((color, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="color"
                value={color}
                onChange={e => handleColorChange(index, e.target.value)}
                disabled={disabled}
                style={{
                  width: '50px',
                  height: '30px',
                  border: 'none',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  opacity: disabled ? 0.6 : 1,
                }}
              />
              <input
                type="text"
                value={color}
                onChange={e => handleColorChange(index, e.target.value)}
                disabled={disabled}
                style={{
                  width: '80px',
                  padding: '4px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  opacity: disabled ? 0.6 : 1,
                }}
              />
              <button
                onClick={() => handleRemoveColor(index)}
                disabled={disabled || colors.length <= 1}
                style={{
                  padding: '4px 8px',
                  border: '1px solid #ff4d4f',
                  borderRadius: '4px',
                  backgroundColor: '#ffffff',
                  color: '#ff4d4f',
                  cursor: disabled || colors.length <= 1 ? 'not-allowed' : 'pointer',
                  opacity: disabled || colors.length <= 1 ? 0.6 : 1,
                }}
              >
                删除
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 主题基础配置 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>基础配置</h4>

        {/* 背景色 */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>背景色:</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="color"
              value={backgroundColor}
              onChange={e => handleBackgroundColorChange(e.target.value)}
              disabled={disabled}
              style={{
                width: '50px',
                height: '30px',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
              }}
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={e => handleBackgroundColorChange(e.target.value)}
              disabled={disabled}
              style={{
                width: '120px',
                padding: '4px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                opacity: disabled ? 0.6 : 1,
              }}
            />
          </div>
        </div>

        {/* 文本颜色 */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>文本颜色:</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="color"
              value={textColor}
              onChange={e => handleTextColorChange(e.target.value)}
              disabled={disabled}
              style={{
                width: '50px',
                height: '30px',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
              }}
            />
            <input
              type="text"
              value={textColor}
              onChange={e => handleTextColorChange(e.target.value)}
              disabled={disabled}
              style={{
                width: '120px',
                padding: '4px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                opacity: disabled ? 0.6 : 1,
              }}
            />
          </div>
        </div>

        {/* 深色模式 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label>深色模式:</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleDarkModeToggle}
            disabled={disabled}
            style={{
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.6 : 1,
            }}
          />
        </div>
      </div>

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
