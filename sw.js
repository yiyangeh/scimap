const VERSION='0.1.2';const CACHE='scimap-'+VERSION;
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('scimap-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET'||new URL(req.url).origin!==location.origin)return;
 if(req.mode==='navigate'){e.respondWith(caches.match('./index.html').then(hit=>hit||fetch(req)));return}
 e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(req,copy)))}return r})))});
