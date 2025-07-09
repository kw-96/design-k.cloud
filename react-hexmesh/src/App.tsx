import HexagonalMesh2 from './HexagonalMesh2/index';
import Home from './Home';

function App() {
  const path = window.location.pathname.toLowerCase();
  if (path === '/designdocs') {
    return (
      <div style={{position:'relative',width:'100vw',height:'100vh',overflow:'hidden'}}>
        <HexagonalMesh2 />
        <div style={{
          position:'absolute',top:0,left:0,width:'100vw',height:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',zIndex:1
        }}>
          <div style={{
            background:'#020202',
            borderRadius:20,
            boxShadow:'0 4px 32px 0 rgba(0,0,0,0.18)',
            padding:'48px 40px 32px 40px',
            minWidth:320,
            maxWidth:'90vw',
            textAlign:'center',
            backdropFilter:'blur(8px)',
          }}>
            <h2 style={{color:'#fff',fontWeight:700,fontSize:32,marginBottom:32,letterSpacing:2}}>敬请期待</h2>
            <button
              style={{
                marginTop:8,
                padding:'12px 40px',
                fontSize:18,
                fontWeight:600,
                color:'#fff',
                background:'linear-gradient(90deg,#2196f3 0%,#21cbf3 100%)',
                border:'none',
                borderRadius:12,
                boxShadow:'0 2px 12px 0 rgba(33,203,243,0.18)',
                cursor:'pointer',
                transition:'background 0.2s,box-shadow 0.2s',
                outline:'none',
              }}
              onMouseOver={e=>e.currentTarget.style.background='linear-gradient(90deg,#21cbf3 0%,#2196f3 100%)'}
              onMouseOut={e=>e.currentTarget.style.background='linear-gradient(90deg,#2196f3 0%,#21cbf3 100%)'}
              onClick={()=>window.location.href='/'}
            >
              返回主页
            </button>
          </div>
        </div>
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
