/**
 * DataFilter - 数据筛选器 UI 组件
 * 提供独立的数据筛选交互界面，支持多种筛选类型
 */
import React, { useState, useCallback, useMemo } from 'react';

// ============================================================================
// 类型定义
// ============================================================================

/** 筛选字段类型 */
export type FilterFieldType = 'select' | 'range' | 'checkbox' | 'date';

/** 单个筛选字段配置 */
export interface FilterField {
  /** 字段唯一标识 */
  key: string;
  /** 字段显示名称 */
  label: string;
  /** 字段类型 */
  type: FilterFieldType;
  /** 下拉选项（select/checkbox 类型使用） */
  options?: Array<{ label: string; value: string | number }>;
  /** 范围最小值（range 类型使用） */
  min?: number;
  /** 范围最大值（range 类型使用） */
  max?: number;
  /** 日期格式（date 类型使用） */
  dateFormat?: string;
  /** placeholder */
  placeholder?: string;
}

/** 筛选值类型 */
export type FilterValue = string | number | boolean | [number, number] | [string, string] | string[] | number[] | undefined;

/** 筛选器完整值 */
export interface FilterValues {
  [key: string]: FilterValue;
}

/** DataFilter 组件属性 */
export interface DataFilterProps {
  /** 筛选字段配置 */
  fields: FilterField[];
  /** 当前筛选值 */
  value?: FilterValues;
  /** 筛选变化回调 */
  onChange?: (filters: FilterValues) => void;
  /** 布局方向 */
  layout?: 'horizontal' | 'vertical';
  /** 是否显示重置按钮 */
  showReset?: boolean;
  /** 自定义样式 */
  className?: string;
  /** 自定义样式对象 */
  style?: React.CSSProperties;
  /** 紧凑模式 */
  compact?: boolean;
  /** 禁用状态 */
  disabled?: boolean;
  /** 重置按钮文本 */
  resetText?: string;
  /** 提交按钮文本 */
  submitText?: string;
  /** 是否显示提交按钮（实时模式下隐藏） */
  showSubmit?: boolean;
  /** 是否实时触发 onChange（启用时每次筛选变化立即触发） */
  liveUpdate?: boolean;
}

// ============================================================================
// 样式常量
// ============================================================================

const BASE_STYLE: React.CSSProperties = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontSize: '14px',
  color: '#333',
};

const FIELD_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const LABEL_STYLE: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 500,
  color: '#666',
};

const INPUT_BASE: React.CSSProperties = {
  padding: '6px 10px',
  border: '1px solid #d9d9d9',
  borderRadius: '4px',
  fontSize: '13px',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  backgroundColor: '#fff',
};

const BUTTON_BASE: React.CSSProperties = {
  padding: '6px 16px',
  borderRadius: '4px',
  fontSize: '13px',
  cursor: 'pointer',
  border: 'none',
  transition: 'all 0.2s',
};

// ============================================================================
// SelectFilter 组件
// ============================================================================

interface SelectFilterProps {
  field: FilterField;
  value: FilterValue;
  onChange: (key: string, value: FilterValue) => void;
  disabled?: boolean;
  compact?: boolean;
}

const SelectFilter: React.FC<SelectFilterProps> = ({ field, value, onChange, disabled, compact }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      onChange(field.key, val === '' ? undefined : val);
    },
    [field.key, onChange]
  );

  return (
    <div style={FIELD_STYLE}>
      <label style={LABEL_STYLE}>{field.label}</label>
      <select
        value={(value as string) ?? ''}
        onChange={handleChange}
        disabled={disabled}
        style={{
          ...INPUT_BASE,
          minWidth: compact ? '100px' : '140px',
          width: '100%',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <option value="">{field.placeholder || '请选择'}</option>
        {field.options?.map((opt) => (
          <option key={String(opt.value)} value={String(opt.value)}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// ============================================================================
// RangeFilter 组件
// ============================================================================

interface RangeFilterProps {
  field: FilterField;
  value: FilterValue;
  onChange: (key: string, value: FilterValue) => void;
  onLiveChange?: boolean;
  disabled?: boolean;
  compact?: boolean;
}

const RangeFilter: React.FC<RangeFilterProps> = ({ field, value, onChange, disabled, compact }) => {
  const rangeValue = (value as [number, number]) ?? [field.min ?? 0, field.max ?? 100];

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Number(e.target.value);
      onChange(field.key, [newMin, rangeValue[1]]);
    },
    [field.key, rangeValue, onChange]
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Number(e.target.value);
      onChange(field.key, [rangeValue[0], newMax]);
    },
    [field.key, rangeValue, onChange]
  );

  return (
    <div style={FIELD_STYLE}>
      <label style={LABEL_STYLE}>{field.label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <input
          type="number"
          value={rangeValue[0]}
          min={field.min}
          max={rangeValue[1]}
          onChange={handleMinChange}
          disabled={disabled}
          placeholder={String(field.min ?? '最小')}
          style={{
            ...INPUT_BASE,
            width: compact ? '60px' : '80px',
            cursor: disabled ? 'not-allowed' : 'text',
            opacity: disabled ? 0.6 : 1,
          }}
        />
        <span style={{ color: '#999', fontSize: '12px' }}>~</span>
        <input
          type="number"
          value={rangeValue[1]}
          min={rangeValue[0]}
          max={field.max}
          onChange={handleMaxChange}
          disabled={disabled}
          placeholder={String(field.max ?? '最大')}
          style={{
            ...INPUT_BASE,
            width: compact ? '60px' : '80px',
            cursor: disabled ? 'not-allowed' : 'text',
            opacity: disabled ? 0.6 : 1,
          }}
        />
      </div>
    </div>
  );
};

// ============================================================================
// CheckboxFilter 组件（多选）
// ============================================================================

interface CheckboxFilterProps {
  field: FilterField;
  value: FilterValue;
  onChange: (key: string, value: FilterValue) => void;
  disabled?: boolean;
  compact?: boolean;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({ field, value, onChange, disabled, compact }) => {
  const selectedValues = useMemo(() => {
    if (Array.isArray(value)) {
      return new Set(value.map(String));
    }
    return new Set<string>();
  }, [value]);

  const handleToggle = useCallback(
    (optValue: string | number) => {
      const strVal = String(optValue);
      const newSet = new Set(selectedValues);
      if (newSet.has(strVal)) {
        newSet.delete(strVal);
      } else {
        newSet.add(strVal);
      }
      onChange(field.key, Array.from(newSet));
    },
    [field.key, selectedValues, onChange]
  );

  return (
    <div style={FIELD_STYLE}>
      <label style={LABEL_STYLE}>{field.label}</label>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: compact ? '4px' : '8px',
          maxWidth: compact ? '200px' : '300px',
        }}
      >
        {field.options?.map((opt) => {
          const isSelected = selectedValues.has(String(opt.value));
          return (
            <label
              key={String(opt.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                opacity: disabled ? 0.6 : 1,
                userSelect: 'none',
              }}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleToggle(opt.value)}
                disabled={disabled}
                style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
              />
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// DateFilter 组件
// ============================================================================

interface DateFilterProps {
  field: FilterField;
  value: FilterValue;
  onChange: (key: string, value: FilterValue) => void;
  disabled?: boolean;
  compact?: boolean;
}

const DateFilter: React.FC<DateFilterProps> = ({ field, value, onChange, disabled, compact }) => {
  const dateValue = (value as [string, string]) ?? ['', ''];
  const dateFormat = field.dateFormat || 'YYYY-MM-DD';

  const handleStartChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(field.key, [e.target.value, dateValue[1]]);
    },
    [field.key, dateValue, onChange]
  );

  const handleEndChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(field.key, [dateValue[0], e.target.value]);
    },
    [field.key, dateValue, onChange]
  );

  return (
    <div style={FIELD_STYLE}>
      <label style={LABEL_STYLE}>{field.label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <input
          type="date"
          value={dateValue[0]}
          onChange={handleStartChange}
          disabled={disabled}
          style={{
            ...INPUT_BASE,
            width: compact ? '120px' : '150px',
            cursor: disabled ? 'not-allowed' : 'text',
            opacity: disabled ? 0.6 : 1,
          }}
        />
        <span style={{ color: '#999', fontSize: '12px' }}>~</span>
        <input
          type="date"
          value={dateValue[1]}
          onChange={handleEndChange}
          disabled={disabled}
          style={{
            ...INPUT_BASE,
            width: compact ? '120px' : '150px',
            cursor: disabled ? 'not-allowed' : 'text',
            opacity: disabled ? 0.6 : 1,
          }}
        />
      </div>
    </div>
  );
};

// ============================================================================
// DataFilter 主组件
// ============================================================================

/**
 * DataFilter - 数据筛选器 UI 组件
 *
 * @example
 * ```tsx
 * <DataFilter
 *   fields={[
 *     { key: 'category', label: '分类', type: 'select', options: [{ label: '苹果', value: 'apple' }] },
 *     { key: 'price', label: '价格区间', type: 'range', min: 0, max: 1000 },
 *     { key: 'tags', label: '标签', type: 'checkbox', options: [{ label: '热门', value: 'hot' }] },
 *     { key: 'date', label: '日期', type: 'date' },
 *   ]}
 *   value={filters}
 *   onChange={(filters) => setFilters(filters)}
 *   layout="horizontal"
 *   showReset
 * />
 * ```
 */
export const DataFilter: React.FC<DataFilterProps> = ({
  fields,
  value = {},
  onChange,
  layout = 'vertical',
  showReset = false,
  className = '',
  style,
  compact = false,
  disabled = false,
  resetText = '重置',
  submitText = '筛选',
  showSubmit = false,
  liveUpdate = true,
}) => {
  // 内部状态，用于管理表单值
  const [internalValue, setInternalValue] = useState<FilterValues>(value);

  // 当外部 value 变化时同步内部状态
  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // 是否有筛选条件
  const hasFilters = useMemo(() => {
    return Object.values(internalValue).some((v) => {
      if (v === undefined || v === null || v === '') return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    });
  }, [internalValue]);

  // 处理单个字段变化
  const handleFieldChange = useCallback(
    (key: string, fieldValue: FilterValue) => {
      const newValue = { ...internalValue, [key]: fieldValue };
      setInternalValue(newValue);
      if (liveUpdate) {
        onChange?.(newValue);
      }
    },
    [internalValue, liveUpdate, onChange]
  );

  // 提交筛选
  const handleSubmit = useCallback(() => {
    onChange?.(internalValue);
  }, [internalValue, onChange]);

  // 重置筛选
  const handleReset = useCallback(() => {
    const emptyValues: FilterValues = {};
    fields.forEach((f) => {
      if (f.type === 'range') {
        emptyValues[f.key] = [f.min ?? 0, f.max ?? 100];
      } else if (f.type === 'checkbox') {
        emptyValues[f.key] = [];
      } else if (f.type === 'date') {
        emptyValues[f.key] = ['', ''];
      } else {
        emptyValues[f.key] = undefined;
      }
    });
    setInternalValue(emptyValues);
    onChange?.(emptyValues);
  }, [fields, onChange]);

  // 渲染单个字段
  const renderField = useCallback(
    (field: FilterField) => {
      const fieldValue = internalValue[field.key];

      switch (field.type) {
        case 'select':
          return (
            <SelectFilter
              key={field.key}
              field={field}
              value={fieldValue}
              onChange={handleFieldChange}
              disabled={disabled}
              compact={compact}
            />
          );
        case 'range':
          return (
            <RangeFilter
              key={field.key}
              field={field}
              value={fieldValue}
              onChange={handleFieldChange}
              disabled={disabled}
              compact={compact}
            />
          );
        case 'checkbox':
          return (
            <CheckboxFilter
              key={field.key}
              field={field}
              value={fieldValue}
              onChange={handleFieldChange}
              disabled={disabled}
              compact={compact}
            />
          );
        case 'date':
          return (
            <DateFilter
              key={field.key}
              field={field}
              value={fieldValue}
              onChange={handleFieldChange}
              disabled={disabled}
              compact={compact}
            />
          );
        default:
          return null;
      }
    },
    [internalValue, handleFieldChange, disabled, compact]
  );

  const isHorizontal = layout === 'horizontal';

  const containerStyle: React.CSSProperties = {
    ...BASE_STYLE,
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: isHorizontal ? '16px' : '12px',
    alignItems: isHorizontal ? 'flex-end' : 'flex-start',
    padding: '12px',
    backgroundColor: '#fafafa',
    borderRadius: '6px',
    border: '1px solid #f0f0f0',
    ...style,
  };

  return (
    <div className={`taroviz-datafilter ${className}`} style={containerStyle}>
      {fields.map(renderField)}

      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-end',
          marginLeft: isHorizontal ? '8px' : '0',
          paddingTop: isHorizontal ? '0' : '4px',
        }}
      >
        {showSubmit && !liveUpdate && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled}
            style={{
              ...BUTTON_BASE,
              backgroundColor: '#1890ff',
              color: '#fff',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.6 : 1,
            }}
          >
            {submitText}
          </button>
        )}

        {showReset && hasFilters && (
          <button
            type="button"
            onClick={handleReset}
            disabled={disabled}
            style={{
              ...BUTTON_BASE,
              backgroundColor: '#fff',
              color: '#666',
              border: '1px solid #d9d9d9',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.6 : 1,
            }}
          >
            {resetText}
          </button>
        )}
      </div>
    </div>
  );
};

export default DataFilter;
