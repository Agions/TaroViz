import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// 页面组件
import HomePage from './pages/HomePage';
import ChartExamples from './pages/ChartExamples';
import Installation from './pages/Installation';
import ApiDocs from './pages/ApiDocs';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <header>
        <div className="container">
          <div className="logo">
            <span>TaroViz</span>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>首页</Link>
              </li>
              <li>
                <Link to="/examples" className={location.pathname.includes('/examples') ? 'active' : ''}>图表示例</Link>
              </li>
              <li>
                <Link to="/installation" className={location.pathname === '/installation' ? 'active' : ''}>安装指南</Link>
              </li>
              <li>
                <Link to="/api" className={location.pathname === '/api' ? 'active' : ''}>API文档</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/examples/*" element={<ChartExamples />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/api" element={<ApiDocs />} />
        </Routes>
      </main>

      <footer>
        <div className="container">
          <div className="links">
            <a href="https://github.com/yourusername/taroviz" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.npmjs.com/package/taroviz" target="_blank" rel="noopener noreferrer">npm</a>
            <a href="https://github.com/yourusername/taroviz/issues" target="_blank" rel="noopener noreferrer">问题反馈</a>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} TaroViz. 基于 MIT 协议开源.
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
