/**
 * TaroViz 调试面板组件
 * 提供图表调试和监控功能
 */
import React, { useState, useRef } from 'react';

import { DebugPanelOptions, DebugTabType, DebugInfo, DebugPanelEventType } from './types';

/**
 * 调试面板组件属性
 */
export interface DebugPanelProps {
  /**
   * 调试信息
   */
  debugInfo: DebugInfo;

  /**
   * 调试面板选项
   */
  options?: DebugPanelOptions;

  /**
   * 事件处理函数
   */
  onEvent?: (event: { type: DebugPanelEventType; data?: any }) => void;
}

/**
 * 调试面板组件
 */
export const DebugPanel: React.FC<DebugPanelProps> = ({ debugInfo, options = {}, onEvent }) => {
  const [isExpanded, setIsExpanded] = useState(options.autoExpand || false);
  const [activeTab, setActiveTab] = useState<DebugTabType>(options.defaultTab || 'instance');
  const panelRef = useRef<HTMLDivElement>(null);

  const { position = 'bottom-right', width = 400, height = 300 } = options;

  /**
   * 切换面板展开状态
   */
  const togglePanel = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    onEvent?.({ type: newState ? DebugPanelEventType.PANEL_SHOW : DebugPanelEventType.PANEL_HIDE });
  };

  /**
   * 切换标签页
   */
  const switchTab = (tab: DebugTabType) => {
    setActiveTab(tab);
    onEvent?.({ type: DebugPanelEventType.TAB_CHANGE, data: { tab } });
  };

  /**
   * 渲染标签页内容
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'instance':
        return renderInstanceTab();
      case 'config':
        return renderConfigTab();
      case 'data':
        return renderDataTab();
      case 'performance':
        return renderPerformanceTab();
      case 'events':
        return renderEventsTab();
      case 'errors':
        return renderErrorsTab();
      case 'tools':
        return renderToolsTab();
      default:
        return <div>未知标签页</div>;
    }
  };

  /**
   * 渲染实例信息标签页
   */
  const renderInstanceTab = () => {
    const { instance } = debugInfo;

    return (
      <div style={styles.debugPanelContent}>
        <h3 style={styles.h3}>图表实例信息</h3>
        <div style={styles.debugInfoGrid}>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>ID:</span>
            <span style={styles.debugInfoValue}>{instance?.id || 'N/A'}</span>
          </div>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>类型:</span>
            <span style={styles.debugInfoValue}>{instance?.type || 'N/A'}</span>
          </div>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>版本:</span>
            <span style={styles.debugInfoValue}>{instance?.version || 'N/A'}</span>
          </div>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>渲染器:</span>
            <span style={styles.debugInfoValue}>{instance?.renderer || 'N/A'}</span>
          </div>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>宽度:</span>
            <span style={styles.debugInfoValue}>{instance?.width || 'N/A'}px</span>
          </div>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>高度:</span>
            <span style={styles.debugInfoValue}>{instance?.height || 'N/A'}px</span>
          </div>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>平台:</span>
            <span style={styles.debugInfoValue}>{instance?.platform || 'N/A'}</span>
          </div>
        </div>
      </div>
    );
  };

  /**
   * 渲染配置信息标签页
   */
  const renderConfigTab = () => {
    const { config } = debugInfo;

    return (
      <div style={styles.debugPanelContent}>
        <h3 style={styles.h3}>配置信息</h3>
        <div style={styles.debugConfig}>
          <pre style={styles.pre}>{JSON.stringify(config, null, 2)}</pre>
        </div>
      </div>
    );
  };

  /**
   * 渲染数据信息标签页
   */
  const renderDataTab = () => {
    const { data } = debugInfo;

    return (
      <div style={styles.debugPanelContent}>
        <h3 style={styles.h3}>数据信息</h3>
        <div style={styles.debugInfoGrid}>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>系列数量:</span>
            <span style={styles.debugInfoValue}>{data?.series?.length || 0}</span>
          </div>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>总数据量:</span>
            <span style={styles.debugInfoValue}>{data?.totalDataCount || 0}</span>
          </div>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>当前数据量:</span>
            <span style={styles.debugInfoValue}>{data?.currentDataCount || 0}</span>
          </div>
        </div>
        <div style={styles.debugDataSeries}>
          <h4 style={styles.h4}>系列数据</h4>
          {data?.series?.map((series, index) => (
            <div key={index} style={styles.debugDataSeriesItem}>
              <h5 style={styles.h5}>
                系列 {index + 1}: {series.name || '未命名'}
              </h5>
              <pre style={styles.pre}>{JSON.stringify(series.data?.slice(0, 5), null, 2)}...</pre>
              <div style={styles.debugSeriesInfo}>
                <span>数据量: {series.data?.length || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /**
   * 渲染性能信息标签页
   */
  const renderPerformanceTab = () => {
    const { performance } = debugInfo;

    return (
      <div style={styles.debugPanelContent}>
        <h3 style={styles.h3}>性能信息</h3>
        <div style={styles.debugInfoGrid}>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>初始化时间:</span>
            <span style={styles.debugInfoValue}>{performance?.initTime || 0}ms</span>
          </div>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>渲染时间:</span>
            <span style={styles.debugInfoValue}>{performance?.renderTime || 0}ms</span>
          </div>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>更新时间:</span>
            <span style={styles.debugInfoValue}>{performance?.updateTime || 0}ms</span>
          </div>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>数据大小:</span>
            <span style={styles.debugInfoValue}>{performance?.dataSize || 0} bytes</span>
          </div>
          <div style={styles.debugInfoItem}>
            <span style={styles.debugInfoLabel}>帧率:</span>
            <span style={styles.debugInfoValue}>{performance?.frameRate || 0} FPS</span>
          </div>
        </div>
        <div style={styles.debugPerformanceChart}>{/* 这里可以添加性能图表 */}</div>
      </div>
    );
  };

  /**
   * 渲染事件信息标签页
   */
  const renderEventsTab = () => {
    const { events } = debugInfo;

    return (
      <div style={styles.debugPanelContent}>
        <h3 style={styles.h3}>事件信息</h3>
        <div style={styles.debugEventsList}>
          {events
            ?.slice()
            .reverse()
            .map((event, index) => (
              <div key={index} style={styles.debugEventItem}>
                <div style={styles.debugEventHeader}>
                  <span style={styles.debugEventType}>{event.type}</span>
                  <span style={styles.debugEventTime}>
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div style={styles.debugEventParams}>
                  <pre style={styles.pre}>{JSON.stringify(event.params, null, 2)}</pre>
                </div>
              </div>
            ))}
          {(!events || events.length === 0) && (
            <div style={styles.debugEmptyState}>暂无事件记录</div>
          )}
        </div>
      </div>
    );
  };

  /**
   * 渲染错误信息标签页
   */
  const renderErrorsTab = () => {
    const { errors } = debugInfo;

    return (
      <div style={styles.debugPanelContent}>
        <h3 style={styles.h3}>错误信息</h3>
        <div style={styles.debugErrorsList}>
          {errors
            ?.slice()
            .reverse()
            .map((error, index) => (
              <div key={index} style={styles.debugErrorItem}>
                <div style={styles.debugErrorHeader}>
                  <span style={styles.debugErrorType}>{error.type}</span>
                  <span style={styles.debugErrorTime}>
                    {new Date(error.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div style={styles.debugErrorMessage}>{error.message}</div>
                {error.stack && (
                  <div style={styles.debugErrorStack}>
                    <pre style={styles.pre}>{error.stack}</pre>
                  </div>
                )}
              </div>
            ))}
          {(!errors || errors.length === 0) && (
            <div style={styles.debugEmptyState}>暂无错误记录</div>
          )}
        </div>
      </div>
    );
  };

  /**
   * 渲染工具标签页
   */
  const renderToolsTab = () => {
    return (
      <div style={styles.debugPanelContent}>
        <h3 style={styles.h3}>调试工具</h3>
        <div style={styles.debugToolsGrid}>
          <button style={styles.debugToolButton}>导出配置</button>
          <button style={styles.debugToolButton}>导出数据</button>
          <button style={styles.debugToolButton}>刷新图表</button>
          <button style={styles.debugToolButton}>清空数据</button>
          <button style={styles.debugToolButton}>性能分析</button>
          <button style={styles.debugToolButton}>重置图表</button>
        </div>
      </div>
    );
  };

  // 构建面板样式
  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    fontFamily: 'monospace',
    fontSize: '12px',
    overflow: 'hidden',
    ...(position === 'top-left' && {
      top: '10px',
      left: '10px',
    }),
    ...(position === 'top-right' && {
      top: '10px',
      right: '10px',
    }),
    ...(position === 'bottom-left' && {
      bottom: '10px',
      left: '10px',
    }),
    ...(position === 'bottom-right' && {
      bottom: '10px',
      right: '10px',
    }),
    ...(isExpanded && {
      width,
      height,
    }),
    ...styles.tarovizDebugPanel,
  };

  return (
    <div ref={panelRef} style={panelStyle}>
      {/* 面板头部 */}
      <div style={styles.debugPanelHeader}>
        <div style={styles.debugPanelTitle}>
          <span style={styles.debugPanelLogo}>🐛</span>
          <span>TaroViz Debug Panel</span>
        </div>
        <button
          style={styles.debugPanelToggle}
          onClick={togglePanel}
          title={isExpanded ? '收起' : '展开'}
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {/* 面板内容 */}
      {isExpanded && (
        <>
          {/* 标签页导航 */}
          <div style={styles.debugPanelTabs}>
            <button
              style={{ ...styles.debugTab, ...(activeTab === 'instance' && styles.debugTabActive) }}
              onClick={() => switchTab('instance')}
              title="实例信息"
            >
              实例
            </button>
            <button
              style={{ ...styles.debugTab, ...(activeTab === 'config' && styles.debugTabActive) }}
              onClick={() => switchTab('config')}
              title="配置信息"
            >
              配置
            </button>
            <button
              style={{ ...styles.debugTab, ...(activeTab === 'data' && styles.debugTabActive) }}
              onClick={() => switchTab('data')}
              title="数据信息"
            >
              数据
            </button>
            <button
              style={{
                ...styles.debugTab,
                ...(activeTab === 'performance' && styles.debugTabActive),
              }}
              onClick={() => switchTab('performance')}
              title="性能信息"
            >
              性能
            </button>
            <button
              style={{ ...styles.debugTab, ...(activeTab === 'events' && styles.debugTabActive) }}
              onClick={() => switchTab('events')}
              title="事件信息"
            >
              事件
            </button>
            <button
              style={{ ...styles.debugTab, ...(activeTab === 'errors' && styles.debugTabActive) }}
              onClick={() => switchTab('errors')}
              title="错误信息"
            >
              错误
            </button>
            <button
              style={{ ...styles.debugTab, ...(activeTab === 'tools' && styles.debugTabActive) }}
              onClick={() => switchTab('tools')}
              title="调试工具"
            >
              工具
            </button>
          </div>

          {/* 标签页内容 */}
          <div style={styles.debugPanelBody}>{renderTabContent()}</div>
        </>
      )}
    </div>
  );
};

// 样式定义
const styles: Record<string, React.CSSProperties> = {
  tarovizDebugPanel: {
    transition: 'all 0.3s ease',
  },
  debugPanelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
    cursor: 'pointer',
  },
  debugPanelTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: 'bold',
    color: '#333',
  },
  debugPanelLogo: {
    fontSize: '14px',
  },
  debugPanelToggle: {
    background: 'none',
    border: 'none',
    fontSize: '12px',
    cursor: 'pointer',
    color: '#666',
    padding: '4px',
  },
  debugPanelTabs: {
    display: 'flex',
    borderBottom: '1px solid #e0e0e0',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },
  debugTab: {
    padding: '8px 12px',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#666',
    transition: 'all 0.2s ease',
  },
  debugTabActive: {
    color: '#1890ff',
    borderBottomColor: '#1890ff',
    fontWeight: 'bold',
  },
  debugPanelBody: {
    height: 'calc(100% - 70px)',
    overflow: 'auto',
  },
  debugPanelContent: {
    padding: '12px',
  },
  h3: {
    margin: '0 0 12px 0',
    fontSize: '14px',
    color: '#333',
  },
  h4: {
    margin: '12px 0 8px 0',
    fontSize: '13px',
    color: '#666',
  },
  h5: {
    margin: '8px 0 4px 0',
    fontSize: '12px',
    color: '#666',
  },
  debugInfoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    marginBottom: '12px',
  },
  debugInfoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 8px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
  },
  debugInfoLabel: {
    fontWeight: 'bold',
    color: '#666',
  },
  debugInfoValue: {
    color: '#333',
  },
  debugConfig: {
    backgroundColor: '#f5f5f5',
    padding: '8px',
    borderRadius: '4px',
    overflow: 'auto',
    maxHeight: '200px',
  },
  pre: {
    margin: '0',
    fontSize: '11px',
    overflow: 'auto',
  },
  debugDataSeries: {
    marginTop: '12px',
  },
  debugDataSeriesItem: {
    marginBottom: '12px',
    padding: '8px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
  },
  debugSeriesInfo: {
    marginTop: '4px',
    fontSize: '11px',
    color: '#666',
  },
  debugPerformanceChart: {
    marginTop: '12px',
    height: '120px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
  },
  debugEventsList: {
    maxHeight: '200px',
    overflow: 'auto',
  },
  debugEventItem: {
    marginBottom: '8px',
    padding: '8px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
  },
  debugEventHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  debugEventType: {
    fontWeight: 'bold',
    color: '#333',
  },
  debugEventTime: {
    fontSize: '10px',
    color: '#999',
  },
  debugEventParams: {
    fontSize: '11px',
    overflow: 'auto',
    maxHeight: '80px',
  },
  debugErrorsList: {
    maxHeight: '200px',
    overflow: 'auto',
  },
  debugErrorItem: {
    marginBottom: '8px',
    padding: '8px',
    backgroundColor: '#fff1f0',
    border: '1px solid #ffccc7',
    borderRadius: '4px',
  },
  debugErrorHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  debugErrorType: {
    fontWeight: 'bold',
    color: '#f5222d',
  },
  debugErrorTime: {
    fontSize: '10px',
    color: '#999',
  },
  debugErrorMessage: {
    color: '#f5222d',
    marginBottom: '4px',
  },
  debugErrorStack: {
    fontSize: '10px',
    maxHeight: '100px',
    overflow: 'auto',
  },
  debugToolsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  debugToolButton: {
    padding: '8px 12px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.2s ease',
  },
  debugEmptyState: {
    textAlign: 'center',
    color: '#999',
    padding: '16px',
  },
};

export default DebugPanel;
