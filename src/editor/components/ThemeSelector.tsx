/**
 * 主题选择器组件
 * 显示已注册的主题列表和新建主题按钮
 */
import React from 'react';
import type { ThemeOptions } from '../../themes';

export interface ThemeSelectorProps {
  /** 已注册的主题列表 */
  themes: ThemeOptions[];
  /** 当前选中的主题 */
  currentTheme: ThemeOptions;
  /** 是否禁用 */
  disabled?: boolean;
  /** 主题选择回调 */
  onSelect: (theme: ThemeOptions) => void;
  /** 新建主题回调 */
  onCreateNew: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  themes,
  currentTheme,
  disabled = false,
  onSelect,
  onCreateNew,
}) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h4>选择主题</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => onSelect(theme)}
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
          onClick={onCreateNew}
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
  );
};

export default ThemeSelector;
