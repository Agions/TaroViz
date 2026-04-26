/**
 * TaroViz 增强版主题编辑器组件
 * 提供实时预览、导入导出、预设主题等高级功能
 */
import React, { useState, useEffect, useCallback } from 'react';
import { ThemeOptions, getRegisteredThemes, registerTheme, switchTheme } from '../themes';
import { LineChart } from '../charts';

export interface EnhancedThemeEditorProps {
  /** 当前选中的主题名称 */
  selectedTheme?: string;
  /** 主题变更回调 */
  onThemeChange?: (theme: ThemeOptions) => void;
  /** 主题保存回调 */
  onThemeSave?: (theme: ThemeOptions) => void;
  /** 是否禁用编辑器 */
  disabled?: boolean;
  /** 是否启用实时预览 */
  enableLivePreview?: boolean;
  /** 是否启用导入导出 */
  enableImportExport?: boolean;
  /** 是否启用预设主题 */
  enablePresets?: boolean;
  /** 编辑器样式 */
  style?: React.CSSProperties;
  /** 编辑器类名 */
  className?: string;
}

export interface ThemeExportOptions {
  format: 'json' | 'css' | 'scss';
  includeVariables: boolean;
  minify: boolean;
}

const PRESET_THEMES: ThemeOptions[] = [
  {
    name: '预设-科技蓝',
    colors: ['#0050b3', '#1890ff', '#40a9ff', '#69c0ff', '#bae7ff'],
    backgroundColor: '#001529',
    textColor: '#ffffff',
    darkMode: true,
  },
  {
    name: '预设-活力橙',
    colors: ['#d46b08', '#ff7a45', '#ffa940', '#ffc53d', '#ffe58f'],
    backgroundColor: '#f5f5f5',
    textColor: '#333333',
    darkMode: false,
  },
  {
    name: '预设-森林绿',
    colors: ['#237804', '#52c41a', '#73d13d', '#95de64', '#b7eb8f'],
    backgroundColor: '#f6ffed',
    textColor: '#333333',
    darkMode: false,
  },
  {
    name: '预设-神秘紫',
    colors: ['#531dab', '#722ed1', '#9254de', '#b37feb', '#d3adf7'],
    backgroundColor: '#f9f0ff',
    textColor: '#333333',
    darkMode: false,
  },
  {
    name: '预设-商务灰',
    colors: ['#434343', '#595959', '#8c8c8c', '#bfbfbf', '#e8e8e8'],
    backgroundColor: '#fafafa',
    textColor: '#333333',
    darkMode: false,
  },
];

const EnhancedThemeEditor: React.FC<EnhancedThemeEditorProps> = ({
  selectedTheme,
  onThemeChange,
  onThemeSave,
  disabled = false,
  enableLivePreview = true,
  enableImportExport = true,
  enablePresets = true,
  style = {},
  className = '',
}) => {
  const registeredThemes = getRegisteredThemes();

  // 状态
  const [currentTheme, setCurrentTheme] = useState<ThemeOptions>(
    registeredThemes.find((t) => t.name === selectedTheme) || registeredThemes[0] || {}
  );
  const [newThemeName, setNewThemeName] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [colors, setColors] = useState<string[]>(currentTheme.colors || []);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    currentTheme.backgroundColor || '#ffffff'
  );
  const [textColor, setTextColor] = useState<string>(currentTheme.textColor || '#333333');
  const [darkMode, setDarkMode] = useState<boolean>(currentTheme.darkMode || false);
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'presets'>('basic');

  // 预览数据
  const previewOption = {
    title: { text: '主题预览', textStyle: { color: textColor } },
    xAxis: {
      type: 'category' as const,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      axisLabel: { color: textColor },
    },
    yAxis: { type: 'value' as const, axisLabel: { color: textColor } },
    series: [
      {
        data: [120, 200, 150, 80, 70],
        type: 'bar' as const,
        itemStyle: { color: colors[0] || '#1890ff' },
      },
      {
        data: [120, 200, 150, 80, 70].map((v) => ({
          value: v * 1.2,
          itemStyle: { color: colors[1] || '#40a9ff' },
        })),
        type: 'bar' as const,
      },
    ],
    backgroundColor: backgroundColor,
  };

  // 同步主题状态
  useEffect(() => {
    if (selectedTheme) {
      const theme = registeredThemes.find((t) => t.name === selectedTheme);
      if (theme) {
        setCurrentTheme(theme);
        setColors(theme.colors || []);
        setBackgroundColor(theme.backgroundColor || '#ffffff');
        setTextColor(theme.textColor || '#333333');
        setDarkMode(theme.darkMode || false);
      }
    }
  }, [selectedTheme, registeredThemes]);

  // 更新主题
  const updateTheme = useCallback(
    (updates: Partial<ThemeOptions>) => {
      const updated = { ...currentTheme, ...updates };
      setCurrentTheme(updated);
      setColors(updated.colors || []);
      setBackgroundColor(updated.backgroundColor || '#ffffff');
      setTextColor(updated.textColor || '#333333');
      setDarkMode(updated.darkMode || false);

      if (enableLivePreview) {
        switchTheme(updated);
      }
      onThemeChange?.(updated);
    },
    [currentTheme, enableLivePreview, onThemeChange]
  );

  // 处理颜色变化
  const handleColorChange = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    updateTheme({ colors: newColors });
  };

  // 添加颜色
  const handleAddColor = () => {
    const newColors = [...colors, '#000000'];
    updateTheme({ colors: newColors });
  };

  // 删除颜色
  const handleRemoveColor = (index: number) => {
    if (colors.length <= 1) return;
    const newColors = colors.filter((_, i) => i !== index);
    updateTheme({ colors: newColors });
  };

  // 选择预设主题
  const handlePresetSelect = (preset: ThemeOptions) => {
    updateTheme({
      ...preset,
      name: isEditing && newThemeName ? newThemeName : preset.name,
    });
    if (!isEditing) {
      switchTheme(preset);
      onThemeChange?.(preset);
    }
  };

  // 保存主题
  const handleSaveTheme = () => {
    const name = isEditing && newThemeName ? newThemeName : currentTheme.name || 'custom';
    const themeToSave: ThemeOptions = {
      ...currentTheme,
      name,
      colors,
      backgroundColor,
      textColor,
      darkMode,
    };

    registerTheme(name, themeToSave);
    setIsEditing(false);
    setNewThemeName('');

    if (onThemeSave) {
      onThemeSave(themeToSave);
    }
  };

  // 导出主题
  const handleExportTheme = (format: 'json' | 'css' | 'scss') => {
    const theme: ThemeOptions = {
      ...currentTheme,
      colors,
      backgroundColor,
      textColor,
      darkMode,
    };

    let content = '';
    let filename = '';
    let mimeType = '';

    if (format === 'json') {
      content = JSON.stringify(theme, null, 2);
      filename = `${theme.name || 'theme'}.json`;
      mimeType = 'application/json';
    } else if (format === 'css') {
      content = `:root {\n  --theme-colors: ${colors.join(', ')};\n  --theme-bg: ${backgroundColor};\n  --theme-text: ${textColor};\n}`;
      filename = `${theme.name || 'theme'}.css`;
      mimeType = 'text/css';
    } else {
      content = `$theme-colors: (${colors.join(', ')});\n$theme-bg: ${backgroundColor};\n$theme-text: ${textColor};`;
      filename = `${theme.name || 'theme'}.scss`;
      mimeType = 'text/x-scss';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 导入主题
  const handleImportTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        if (file.name.endsWith('.json')) {
          const theme = JSON.parse(content) as ThemeOptions;
          updateTheme(theme);
        } else {
          alert('请选择 JSON 格式的主题文件');
        }
      } catch {
        alert('文件格式错误');
      }
    };
    reader.readAsText(file);
  };

  // 开始编辑新主题
  const handleStartEdit = () => {
    setIsEditing(true);
    setNewThemeName('');
  };

  return (
    <div
      className={`taroviz-enhanced-theme-editor ${className}`}
      style={{
        padding: '20px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        ...style,
      }}
    >
      <h3 style={{ marginBottom: '20px' }}>增强版主题编辑器</h3>

      {/* 标签页 */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', marginBottom: '20px' }}>
        {(['basic', 'advanced', 'presets'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid #1890ff' : '2px solid transparent',
              backgroundColor: 'transparent',
              color: activeTab === tab ? '#1890ff' : '#666',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
            }}
          >
            {tab === 'basic' ? '基础配置' : tab === 'advanced' ? '高级配置' : '预设主题'}
          </button>
        ))}
      </div>

      {/* 基础配置 */}
      {activeTab === 'basic' && (
        <>
          {/* 主题选择 */}
          <div style={{ marginBottom: '20px' }}>
            <h4>选择主题</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
              {registeredThemes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => {
                    setIsEditing(false);
                    updateTheme(theme);
                  }}
                  disabled={disabled}
                  style={{
                    padding: '8px 16px',
                    border: `2px solid ${currentTheme.name === theme.name ? '#1890ff' : '#e0e0e0'}`,
                    borderRadius: '4px',
                    backgroundColor: currentTheme.name === theme.name ? '#1890ff' : '#ffffff',
                    color: currentTheme.name === theme.name ? '#ffffff' : '#333',
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
                  color: '#333',
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
              <input
                type="text"
                value={newThemeName}
                onChange={(e) => setNewThemeName(e.target.value)}
                disabled={disabled}
                placeholder="输入主题名称"
                style={{
                  padding: '8px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  width: '100%',
                  marginTop: '10px',
                  opacity: disabled ? 0.6 : 1,
                }}
              />
            </div>
          )}

          {/* 颜色配置 */}
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
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    disabled={disabled}
                    style={{ width: '50px', height: '30px', border: 'none', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    disabled={disabled}
                    style={{
                      width: '80px',
                      padding: '4px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
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

          {/* 基础配置 */}
          <div style={{ marginBottom: '20px' }}>
            <h4>基础配置</h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                marginTop: '10px',
              }}
            >
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>背景色:</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                    disabled={disabled}
                    style={{ width: '50px', height: '30px', border: 'none', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                    disabled={disabled}
                    style={{
                      width: '100px',
                      padding: '4px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>文本颜色:</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => updateTheme({ textColor: e.target.value })}
                    disabled={disabled}
                    style={{ width: '50px', height: '30px', border: 'none', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => updateTheme({ textColor: e.target.value })}
                    disabled={disabled}
                    style={{
                      width: '100px',
                      padding: '4px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => updateTheme({ darkMode: e.target.checked })}
                  disabled={disabled}
                />
                深色模式
              </label>
            </div>
          </div>
        </>
      )}

      {/* 预设主题 */}
      {activeTab === 'presets' && enablePresets && (
        <div>
          <h4>选择预设主题</h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '15px',
              marginTop: '15px',
            }}
          >
            {PRESET_THEMES.map((preset) => (
              <div
                key={preset.name}
                onClick={() => handlePresetSelect(preset)}
                style={{
                  padding: '15px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: preset.backgroundColor,
                  color: preset.textColor,
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                  {(preset.colors || []).map((color, i) => (
                    <div
                      key={i}
                      style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: color,
                        borderRadius: '4px',
                      }}
                    />
                  ))}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{preset.name}</div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>
                  {preset.darkMode ? '深色' : '浅色'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 高级配置 */}
      {activeTab === 'advanced' && (
        <div>
          <h4>导入导出</h4>
          {enableImportExport && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button
                onClick={() => handleExportTheme('json')}
                disabled={disabled}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  backgroundColor: '#ffffff',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  opacity: disabled ? 0.6 : 1,
                }}
              >
                导出 JSON
              </button>
              <button
                onClick={() => handleExportTheme('css')}
                disabled={disabled}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  backgroundColor: '#ffffff',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  opacity: disabled ? 0.6 : 1,
                }}
              >
                导出 CSS
              </button>
              <label
                style={{
                  padding: '8px 16px',
                  border: '1px solid #1890ff',
                  borderRadius: '4px',
                  backgroundColor: '#1890ff',
                  color: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                导入 JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportTheme}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          )}
        </div>
      )}

      {/* 实时预览 */}
      {enableLivePreview && (
        <div style={{ marginTop: '20px' }}>
          <h4>实时预览</h4>
          <div
            style={{
              marginTop: '10px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <LineChart option={previewOption} width="100%" height={200} />
          </div>
        </div>
      )}

      {/* 保存按钮 */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
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
        <button
          onClick={() => updateTheme(currentTheme)}
          disabled={disabled}
          style={{
            padding: '10px 20px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            color: '#333',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
          }}
        >
          重置预览
        </button>
      </div>
    </div>
  );
};

export default EnhancedThemeEditor;
