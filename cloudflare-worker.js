// cloudflare-worker.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // 路径路由映射
  const routeMap = {
    '/pybegin': 'https://kw-96.github.io/PyBegin',
    '/design': 'https://kw-96.github.io/DesignHub',
    '/tools': 'https://kw-96.github.io/DesignTools',
    '/blog': 'https://kw-96.github.io/DesignBlog'
  }
  
  // 查找匹配的路径
  for (const [path, target] of Object.entries(routeMap)) {
    if (url.pathname.startsWith(path)) {
      const newUrl = new URL(url.pathname.replace(path, '') + url.search, target)
      return fetch(newUrl, request)
    }
  }
  
  // 默认路由
  return fetch('https://kw-96.github.io/DesignHub', request)
}
