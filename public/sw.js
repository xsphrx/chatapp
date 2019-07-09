const staticCacheName = 'site-static';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
	'/',
	'/createchat',
	'https://fonts.googleapis.com/icon?family=Material+Icons'
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			console.log('caching shell assets');
			cache.addAll(assets);
		})
	);
});

self.addEventListener('activate', event => {
	console.log('service workerd activated');
	event.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(keys
				.filter(key => key !== staticCacheName && key !== dynamicCacheName)
				.map(key => caches.delete(key))
			)
		})
	)
});

self.addEventListener('fetch', event => {
	// console.log('fetch event', event);
	event.respondWith(
		caches.match(event.request).then(cacheRes => {
			return cacheRes || fetch(event.request).then(fetchRes => {
				return caches.open(dynamicCacheName).then(cache => {
					cache.put(event.request.url, fetchRes.clone());
					return fetchRes;
				})
			});
		})
	)
});
