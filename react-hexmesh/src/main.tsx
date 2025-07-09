const path = window.location.pathname.toLowerCase();
if (path.startsWith('/rulexcel')) {
  document.body.innerHTML = '<iframe src="https://kw-96.github.io/RuleXcel/" style="position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;margin:0;padding:0;z-index:9999;" allowfullscreen></iframe>';
  document.body.style.background = '#fff';
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  throw new Error('Redirected to RuleXcel');
}
if (path.startsWith('/pybegin')) {
  document.body.innerHTML = '<iframe src="https://kw-96.github.io/PyBegin/" style="position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;margin:0;padding:0;z-index:9999;" allowfullscreen></iframe>';
  document.body.style.background = '#fff';
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  throw new Error('Redirected to PyBegin');
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const params = new URLSearchParams(window.location.search);
const redirect = params.get('redirect');
if (redirect) {
  // 恢复地址栏为原始路径
  window.history.replaceState(null, '', redirect);
  if (redirect.toLowerCase().startsWith('/rulexcel')) {
    document.body.innerHTML = '<iframe src="https://kw-96.github.io/RuleXcel/" style="position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;margin:0;padding:0;z-index:9999;" allowfullscreen></iframe>';
    document.body.style.background = '#fff';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    throw new Error('Redirected to RuleXcel');
  }
  if (redirect.toLowerCase().startsWith('/pybegin')) {
    document.body.innerHTML = '<iframe src="https://kw-96.github.io/PyBegin/" style="position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;margin:0;padding:0;z-index:9999;" allowfullscreen></iframe>';
    document.body.style.background = '#fff';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    throw new Error('Redirected to PyBegin');
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
