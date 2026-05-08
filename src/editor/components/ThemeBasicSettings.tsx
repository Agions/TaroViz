/**
 * 主题基础设置组件
 * 包含背景色、文本颜色和深色模式开关
 */
import React from 'react';

export interface ThemeBasicSettingsProps {
  /** 背景色 */
  backgroundColor: string;
  /** 文本颜色 */
  textColor: string;
  /** 深色模式 */
  darkMode: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 背景色变化回调 */
  onBackgroundColorChange: (color: string) => void;
  /** 文本颜色变化回调 */
  onTextColorChange: (color: string) => void;
  /** 深色模式变化回调 */
  onDarkModeChange: (darkMode: boolean) => void;
}

const ThemeBasicSettings: React.FC<ThemeBasicSettingsProps> = ({
  backgroundColor,
  textColor,
  darkMode,
  disabled = false,
  onBackgroundColorChange,
  onTextColorChange,
  onDarkModeChange,
}) => {
  const colorInputStyle: React.CSSProperties = {
    width: '50px',
    height: '30px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  };

  const textInputStyle: React.CSSProperties = {
    width: '120px',
    padding: '4px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4>基础配置</h4>

      {/* 背景色 */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>背景色:</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => onBackgroundColorChange(e.target.value)}
            disabled={disabled}
            style={colorInputStyle}
          />
          <input
            type="text"
            value={backgroundColor}
            onChange={(e) => onBackgroundColorChange(e.target.value)}
            disabled={disabled}
            style={textInputStyle}
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
            onChange={(e) => onTextColorChange(e.target.value)}
            disabled={disabled}
            style={colorInputStyle}
          />
          <input
            type="text"
            value={textColor}
            onChange={(e) => onTextColorChange(e.target.value)}
            disabled={disabled}
            style={textInputStyle}
          />
        </div>
      </div>

      {/* 深色模式 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label>深色模式:</label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={(e) => onDarkModeChange(e.target.checked)}
          disabled={disabled}
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
          }}
        />
      </div>
    </div>
  );
};

export default ThemeBasicSettings;
