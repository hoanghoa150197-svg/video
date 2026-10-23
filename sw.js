// Bump version whenever app shell changes.
const VERSION='abloop-pwa-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)))});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('abloop-pwa-')&&key!==VERSION)await caches.delete(key);await self.clients.claim()})())});
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin)return; // Never cache YouTube or external media.
if(req.mode==='navigate'){e.respondWith(fetch(req).then(res=>{if(res.ok){const copy=res.clone();e.waitUntil(caches.open(VERSION).then(c=>c.put('./index.html',copy)))}return res}).catch(()=>caches.match('./index.html')));return}
e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{if(res.ok&&res.type==='basic'&&!/\.(mp4|webm|m3u8|mp3|mov)(\?|$)/i.test(url.pathname)){const copy=res.clone();e.waitUntil(caches.open(VERSION).then(c=>c.put(req,copy)))}return res}))) });
