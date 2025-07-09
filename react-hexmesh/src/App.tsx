import HexagonalMesh2 from './HexagonalMesh2/index';
import Home from './Home';

function App() {
  const path = window.location.pathname.toLowerCase();
  if (path === '/designdocs') {
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',background:'#f8fafc',color:'#333'}}>
        <h2>个人设计作品板块内容正在建设中，敬请期待！</h2>
        <button style={{marginTop:24,padding:'8px 24px',fontSize:16,cursor:'pointer',borderRadius:6,border:'1px solid #a3d9ff',background:'#fff'}} onClick={()=>window.location.href='/'}>返回主页</button>
      </div>
    );
  }
  return (
      <div>
      <HexagonalMesh2 />
      <Home />
      </div>
  );
}
export default App;
