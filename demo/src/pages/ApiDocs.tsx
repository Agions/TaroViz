import React from 'react';

const ApiDocs: React.FC = () => {
  return (
    <div className="container api-docs">
      <h1 className="page-title">API 文档</h1>
      <p className="page-description">本文档提供了 TaroViz 组件的所有属性、方法和事件的详细说明。</p>

      <section className="api-section">
        <h2>组件属性</h2>
        <div className="api-table">
          <table>
            <thead>
              <tr>
                <th>属性</th>
                <th>类型</th>
                <th>默认值</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>option</td>
                <td>Object</td>
                <td>-</td>
                <td>ECharts 配置项，与 ECharts 官方配置一致</td>
              </tr>
              <tr>
                <td>width</td>
                <td>string | number</td>
                <td>'100%'</td>
                <td>图表宽度</td>
              </tr>
              <tr>
                <td>height</td>
                <td>string | number</td>
                <td>'300px'</td>
                <td>图表高度</td>
              </tr>
              <tr>
                <td>theme</td>
                <td>string | Object</td>
                <td>'light'</td>
                <td>图表主题</td>
              </tr>
              <tr>
                <td>canvasId</td>
                <td>string</td>
                <td>'echarts-canvas'</td>
                <td>Canvas ID，在小程序环境中必须唯一</td>
              </tr>
              <tr>
                <td>notMerge</td>
                <td>boolean</td>
                <td>false</td>
                <td>是否不合并与之前的配置</td>
              </tr>
              <tr>
                <td>lazyUpdate</td>
                <td>boolean</td>
                <td>false</td>
                <td>是否延迟更新</td>
              </tr>
              <tr>
                <td>showLoading</td>
                <td>boolean</td>
                <td>false</td>
                <td>是否显示加载动画</td>
              </tr>
              <tr>
                <td>loadingOption</td>
                <td>Object</td>
                <td>-</td>
                <td>加载动画配置</td>
              </tr>
              <tr>
                <td>renderer</td>
                <td>'canvas' | 'svg'</td>
                <td>'canvas'</td>
                <td>渲染器类型</td>
              </tr>
              <tr>
                <td>devicePixelRatio</td>
                <td>number</td>
                <td>-</td>
                <td>设备像素比</td>
              </tr>
              <tr>
                <td>disableTouch</td>
                <td>boolean</td>
                <td>false</td>
                <td>是否禁用触摸事件</td>
              </tr>
              <tr>
                <td>onInit</td>
                <td>(instance) =`&gt; void</td>
                <td>-</td>
                <td>图表初始化回调</td>
              </tr>
              <tr>
                <td>onChartReady</td>
                <td>(instance) =`&gt; void</td>
                <td>-</td>
                <td>图表准备就绪回调</td>
              </tr>
              <tr>
                <td>onOptionChanged</td>
                <td>(option) =`&gt; void</td>
                <td>-</td>
                <td>配置变更回调</td>
              </tr>
              <tr>
                <td>onRendered</td>
                <td>() =`&gt; void</td>
                <td>-</td>
                <td>渲染完成回调</td>
              </tr>
              <tr>
                <td>onResize</td>
                <td>(width, height) =`&gt; void</td>
                <td>-</td>
                <td>尺寸变化回调</td>
              </tr>
              <tr>
                <td>onEvents</td>
                <td>Object</td>
                <td>-</td>
                <td>事件处理函数映射表</td>
              </tr>
              <tr>
                <td>className</td>
                <td>string</td>
                <td>-</td>
                <td>自定义类名</td>
              </tr>
              <tr>
                <td>style</td>
                <td>Object</td>
                <td>-</td>
                <td>自定义样式</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="api-section">
        <h2>图表实例方法</h2>
        <p>通过 <code>ref</code> 可以获取组件实例，访问以下方法：</p>
        <div className="api-table">
          <table>
            <thead>
              <tr>
                <th>方法</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>getEchartsInstance()</td>
                <td>获取 ECharts 实例</td>
              </tr>
              <tr>
                <td>setOption(option, notMerge)</td>
                <td>设置图表配置</td>
              </tr>
              <tr>
                <td>resize()</td>
                <td>调整图表大小</td>
              </tr>
              <tr>
                <td>dispatchAction(payload)</td>
                <td>触发图表行为</td>
              </tr>
              <tr>
                <td>convertToDataURL(opts)</td>
                <td>转换为图片 URL</td>
              </tr>
              <tr>
                <td>clear()</td>
                <td>清空图表</td>
              </tr>
              <tr>
                <td>dispose()</td>
                <td>销毁图表实例</td>
              </tr>
              <tr>
                <td>showLoading(opts)</td>
                <td>显示加载动画</td>
              </tr>
              <tr>
                <td>hideLoading()</td>
                <td>隐藏加载动画</td>
              </tr>
              <tr>
                <td>getDataURL(opts)</td>
                <td>获取图表图片 URL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="api-section">
        <h2>事件处理</h2>
        <p>TaroViz 支持 ECharts 的所有事件，可以通过 <code>onEvents</code> 属性设置事件处理函数：</p>
        <div className="code-block">
          <pre>
            {`import React from 'react';
import { View } from '@tarojs/components';
import ECharts from 'taroviz';

export default class EventDemo extends React.Component {
  handleClick = (params) => {
    console.log('图表点击事件', params);
  }

  handleMouseover = (params) => {
    console.log('鼠标悬停事件', params);
  }

  render() {
    const option = {
      // 图表配置...
    };

    const onEvents = {
      'click': this.handleClick,
      'mouseover': this.handleMouseover
    };

    return (
      <View className='chart-container'>
        <ECharts
          option={option}
          width='100%'
          height='300px'
          onEvents={onEvents}
        />
      </View>
    );
  }
}`}
          </pre>
        </div>

        <p>常用事件列表：</p>
        <ul>
          <li><code>click</code>: 鼠标点击事件</li>
          <li><code>dblclick</code>: 鼠标双击事件</li>
          <li><code>mouseover</code>: 鼠标悬停事件</li>
          <li><code>mouseout</code>: 鼠标移出事件</li>
          <li><code>datazoom</code>: 数据区域缩放事件</li>
          <li><code>legendselectchanged</code>: 图例选中状态改变事件</li>
          <li><code>tooltip:show</code>: 提示框显示事件</li>
          <li><code>tooltip:hide</code>: 提示框隐藏事件</li>
          <li><code>restore</code>: 重置事件</li>
        </ul>
      </section>

      <section className="api-section">
        <h2>多平台特有配置</h2>

        <h3>H5平台</h3>
        <p>H5平台特有的配置可以通过 <code>h5Options</code> 属性设置：</p>
        <div className="code-block">
          <pre>
            {`<ECharts
  option={option}
  h5Options={{
    renderer: 'canvas',  // 'canvas' 或 'svg'
    theme: 'dark',
    devicePixelRatio: window.devicePixelRatio
  }}
/>`}
          </pre>
        </div>

        <h3>微信小程序</h3>
        <p>微信小程序特有的配置可以通过 <code>weappOptions</code> 属性设置：</p>
        <div className="code-block">
          <pre>
            {`<ECharts
  option={option}
  weappOptions={{
    useContext2d: true,  // 使用 context2d 绘制
    enableHDCanvas: true,  // 高清适配
    canvasType: '2d'  // '2d' 或 '2d-native'
  }}
/>`}
          </pre>
        </div>

        <h3>支付宝小程序</h3>
        <p>支付宝小程序特有的配置可以通过 <code>alipayOptions</code> 属性设置：</p>
        <div className="code-block">
          <pre>
            {`<ECharts
  option={option}
  alipayOptions={{
    useContext2d: true,  // 使用 context2d 绘制
    canvasType: '2d'  // '2d' 或 '2d-native'
  }}
/>`}
          </pre>
        </div>

        <h3>鸿蒙OS</h3>
        <p>鸿蒙OS特有的配置可以通过 <code>harmonyOptions</code> 属性设置：</p>
        <div className="code-block">
          <pre>
            {`<ECharts
  option={option}
  harmonyOptions={{
    useContext2d: true,  // 使用 context2d 绘制
    // 其他鸿蒙OS特有配置
  }}
/>`}
          </pre>
        </div>
      </section>
    </div>
  );
};
