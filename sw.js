const VERSION='0.1.14';const CACHE='scimap-'+VERSION;
const ASSETS=['./manifest.webmanifest','./icon.png'];
/* Always download straight from the server: bypass the browser HTTP cache (cache:'reload') and CDN copies (?v=VERSION).
   Without this, a page cached during the last 10 minutes (GitHub Pages max-age=600) could be stored under the NEW version. */
const fresh=async url=>{const r=await fetch(url+(url.includes('?')?'&':'?')+'v='+encodeURIComponent(VERSION),{cache:'reload'});if(!r.ok)throw Error(url+' '+r.status);return r};
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(CACHE);const page=await fresh('./index.html');const text=await page.clone().text();
 /* the page must carry this worker's version, otherwise fail the install; the browser retries at the next update check */
 if(!text.includes('name="scimap-version" content="'+VERSION+'"'))throw Error('index.html is not version '+VERSION+' yet');
 await c.put('./index.html',page.clone());await c.put('./',page);for(const a of ASSETS)await c.put(a,await fresh(a))})())});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('scimap-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET'||new URL(req.url).origin!==location.origin)return;
 if(req.mode==='navigate'){e.respondWith(caches.open(CACHE).then(c=>c.match('./index.html')).then(hit=>hit||fetch(req)));return}
 e.respondWith(caches.open(CACHE).then(c=>c.match(req,{ignoreSearch:false})).then(hit=>hit||fetch(req).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(req,copy)))}return r})))});
