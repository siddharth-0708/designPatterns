/*
1. A session storage persist on tab.
2. If u close tab or browser it will be removed
3. When we dublicate a tab, current session storage is copied in tab duplicated and then its independent.

CACHING

1️⃣ How Browser Caching Works

HTTP caching headers help browsers and proxies efficiently manage web resources like HTML, JS, CSS, and images, improving performance and reducing network usage. The server sends these headers to instruct the browser on how long to consider a resource fresh and how to validate it when stale. Cache-Control is the most important header, defining directives such as max-age (freshness duration), no-cache (must validate before use), no-store (do not cache), and public/private (who can cache), and it overrides Expires if both are present. Expires is an older header specifying an absolute expiration date but is ignored by modern browsers if Cache-Control exists. Last-Modified indicates when the resource was last changed, allowing browsers to send conditional requests with If-Modified-Since to get a 304 Not Modified response if the resource hasn’t changed, saving bandwidth. ETag provides a unique fingerprint for a resource and is more precise than Last-Modified; the browser can send If-None-Match to validate its cached copy. Together, Cache-Control and Expires determine freshness, while ETag and Last-Modified handle validation, ensuring the browser serves cached resources efficiently and only downloads updated content when necessary.

When a browser requests a resource like a JS, CSS, HTML file, or image, it first checks its cache (memory or disk) to see if a matching URL from the same origin already exists. Cached entries include both the resource content and metadata, such as Cache-Control, Expires, ETag, and Last-Modified. If the cached copy exists and is fresh according to Cache-Control or Expires, the browser uses it directly without making a network request. This improves performance and reduces bandwidth usage.

2️⃣ Conditional Requests and 304 Responses

If a cached resource becomes stale (max-age expired or Expires date passed), the browser sends a conditional request to the server with headers like If-None-Match (for ETag) or If-Modified-Since (for Last-Modified). The server compares the resource with these validators. If the resource has not changed, it responds with 304 Not Modified, allowing the browser to reuse the cached content without re-downloading the file. If the resource has changed, the server returns 200 OK with the updated content, which the browser then stores in the cache along with new metadata.

3️⃣ Effects of Clearing Cache

When you clear the browser cache, all cached files and metadata are deleted. On the next request for a resource, the browser has no cached copy or validation data, so it sends a full request to the server. The server responds with 200 OK and the full resource content. After this response, the browser stores the resource and caching headers again for future requests. Essentially, clearing cache forces the browser to fetch all resources as if it’s the first visit, and 304 responses will only happen once the cache is rebuilt and validated.

AJAX

1️⃣ What is AJAX

AJAX (Asynchronous JavaScript and XML) is a set of client-side web development techniques that allow web applications to send and receive data from a server asynchronously, without requiring a full page reload. It combines technologies like JavaScript, the XMLHttpRequest or Fetch API, and often JSON (instead of XML) to handle background data exchange. By separating the data layer from the presentation layer, AJAX enables dynamic updates to specific parts of a web page, improving responsiveness and user experience.

2️⃣ Why traditional requests triggered full page reloads

In traditional web applications, web pages were fully rendered on the server, and every user action—like clicking a link or submitting a form—would send a request to the server. The server would generate a new complete HTML page and return it to the browser, which replaced the old page entirely. This approach caused slower interactions, flickering, and loss of state (like scroll position or partially filled forms) because the browser had no way to update only part of the page.

3️⃣ Advantages of AJAX

AJAX allows developers to update only portions of a web page dynamically. For example, submitting a form can update a table or show a notification without reloading the whole page. It improves performance, reduces bandwidth usage, and creates a smoother user experience. Modern web apps often use JSON for data exchange because it is lightweight and native to JavaScript, making parsing and manipulation easy.

CORS:
CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls how web pages can make requests to a different origin (protocol, domain, or port) than the one that served the page. Browsers enforce the Same-Origin Policy (SOP) by default, which blocks JavaScript from accessing responses from cross-origin requests unless the server explicitly allows it. A CORS error occurs when the browser detects a cross-origin request and the server response does not include the required headers, such as Access-Control-Allow-Origin (specifying which origins are allowed) and, if credentials like cookies are sent, Access-Control-Allow-Credentials: true. For non-simple requests, like POST with JSON or custom headers, the browser first sends a preflight OPTIONS request to check if the server permits the method, headers, and credentials; if the server response is missing or misconfigured, the browser blocks the request and raises a CORS error. It is important to note that CORS is enforced by the browser, not the server, meaning the server may process the request, but the browser will prevent JavaScript from accessing the response unless the proper headers are present.
*/