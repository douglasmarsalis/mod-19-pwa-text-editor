const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({  // Used to optimize web page loading times, serves cached version of resources while also checking for updates on network
    cacheName: 'asset-cache', // Name of cache storage
    pluggins: [
      new CacheableResponsePlugin({  // Handles caching and responses from a web server or API to  
        statuses: [0, 200],         // improve performance and reduce the load on the server
      }),
      new ExpirationPlugin({  // Manages the expiration or time-based validity of data or resources
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // This equals to One Month
      }),
    ],
  }),
);


