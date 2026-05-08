/**
 * 主题颜色编辑器组件
 * 管理主题颜色列表的增加、删除和修改
 */
import React from 'react';

export interface ThemeColorEditorProps {
  /** 颜色列表 */
  colors: string[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 颜色变化回调 */
  onColorChange: (index: number, color: string) => void;
  /** 添加颜色回调 */
  onAddColor: () => void;
  /** 删除颜色回调 */
  onRemoveColor: (index: number) => void;
}

const ThemeColorEditor: React.FC<ThemeColorEditorProps> = ({
  colors,
  disabled = false,
  onColorChange,
  onAddColor,
  onRemoveColor,
}) => {
  return (
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
          onClick={onAddColor}
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
              onChange={(e) => onColorChange(index, e.target.value)}
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
              onChange={(e) => onColorChange(index, e.target.value)}
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
              onClick={() => onRemoveColor(index)}
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
  );
};

export default ThemeColorEditor;
