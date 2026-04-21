const CACHE_NAME = 'dados-pro-v22';
const assets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './sounds/plastic.mp3',
  './sounds/metal.mp3',
  './sounds/wood.mp3',
  './sounds/crystal.mp3',
  './textures/plastic.jpg',
  './textures/metal.jpg',
  './textures/wood.jpg',
  './textures/marble.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});