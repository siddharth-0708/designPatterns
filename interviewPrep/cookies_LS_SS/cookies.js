/*
Cookies are small pieces of data that browsers store for a specific domain and path, and they are automatically sent with HTTP requests matching that domain/path. Multiple cookies can exist for the same domain, and the browser sends all matching cookies when a request is made. The credentials: "include" option in fetch ensures that cookies are sent even for cross-origin requests, while same-origin requests send cookies automatically. Cookies can be flagged as HttpOnly, meaning they are stored in the browser and automatically sent to the server but cannot be accessed or modified via JavaScript, providing protection for sensitive data such as authentication tokens.

Same-origin and cross-origin describe whether two URLs share the same protocol, domain (host), and port. Requests are considered same-origin if all three match exactly; otherwise, they are cross-origin. For example, a frontend running at https://api.escuelajs.co making a request to https://api.escuelajs.co/api/v1/profile is same-origin, whereas a frontend at https://myapp.com requesting https://api.escuelajs.co/api/v1/profile is cross-origin because the domains differ. Browsers enforce different behaviors based on this distinction: cookies are sent automatically with same-origin requests, but for cross-origin requests, you must explicitly set credentials: "include" in fetch, and the server must allow the origin via CORS headers. This policy helps control which domains can access sensitive cookies and resources.

HttpOnly cookies are especially important in mitigating XSS (Cross-Site Scripting) attacks. XSS is a type of vulnerability where an attacker injects malicious scripts into a web page, often through user input or URL parameters. These scripts execute in the victim’s browser and can steal tokens, hijack sessions, manipulate the DOM, or perform actions on behalf of the user. If authentication tokens are stored in JavaScript-accessible storage (like localStorage or non-HttpOnly cookies), a successful XSS attack can steal them. By using HttpOnly cookies, sensitive tokens are hidden from JavaScript, so even if an XSS attack occurs, the attacker cannot directly access them.

In summary, cookies enable stateful communication, HttpOnly cookies protect sensitive tokens from client-side access, and XSS attacks exploit unsafe handling of user input in the browser. Combining secure cookie practices with proper input sanitization, Content Security Policies, and SameSite cookie flags helps safeguard web applications from token theft and other client-side attacks.

Cookies in browsers can be classified as session cookies or persistent cookies. Session cookies exist only for the duration of the browser session, are stored in memory, and are automatically deleted when the browser closes. They are created when the server sends a Set-Cookie header without Expires or Max-Age. Session cookies are commonly used for temporary session identifiers or short-lived data that should not persist after the user closes the browser. Persistent cookies, on the other hand, survive browser restarts because they are stored on disk and last until a specific expiration time, defined by either the Expires attribute (absolute date/time) or the Max-Age attribute (number of seconds). Persistent cookies are often used for authentication tokens, “remember me” functionality, or user preferences. The browser automatically tracks the expiration timestamp and deletes the cookie once it expires. Even very short-lived persistent cookies, such as those with a Max-Age of 60 seconds, are stored on disk until the expiry time. Both session and persistent cookies are automatically sent with requests to matching domains and paths, but their lifetime and storage location are what distinguish them.

HttpOnly Cookies

HttpOnly cookies are a special type of cookie that cannot be accessed via JavaScript (document.cookie) for security reasons. They exist in the browser’s cookie storage and are sent automatically with requests to the server, but JS cannot read or modify them. This prevents sensitive tokens, like JWTs, from being stolen via XSS (Cross-Site Scripting) attacks, where an attacker injects malicious scripts into a web page. HttpOnly cookies are typically used for authentication tokens and, when combined with the Secure and SameSite flags, provide strong protection against client-side attacks.

Cross-Origin Requests and CORS Headers

For cross-origin requests (frontend and backend on different domains), cookies are not sent by default. To allow cookies to be sent or received, the server must set proper CORS headers:

When making a cross-origin request with non-simple methods (like POST) or custom headers (like Content-Type: application/json), the browser automatically sends a preflight request — an OPTIONS request — to the server before the actual request. The preflight request includes headers such as Access-Control-Request-Method (indicating the HTTP method the real request will use), Access-Control-Request-Headers (listing the custom headers that will be sent), and standard headers like Accept-Encoding and Accept-Language. The server must respond with appropriate CORS headers, including Access-Control-Allow-Origin (allowing the requesting origin), Access-Control-Allow-Credentials: true (permitting cookies or other credentials), Access-Control-Allow-Methods (listing allowed methods), and Access-Control-Allow-Headers (listing allowed headers). Only if the server approves via these headers does the browser proceed to send the actual request with credentials and custom headers; otherwise, the request is blocked. Preflight ensures that sensitive operations, especially those involving cookies or non-simple headers, are only performed when the server explicitly allows it.

Access-Control-Allow-Origin: <exact frontend origin> – specifies which frontend origin is allowed to access the response. Must be exact if credentials are used; * cannot be used with cookies. (its like server saying, i am giving response, but please validate that the frontend origin is this. if no, dont update js or cookie).

Access-Control-Allow-Credentials: true – allows the browser to send cookies or other credentials with the request and accept Set-Cookie headers from the server.

If either header is missing or mismatched, the browser will block JS from accessing the response and prevent cookies from being sent or updated. Cookies that do not match the path or domain, or violate SameSite rules, are also not sent.

Same-origin requests occur when the protocol, domain, and port of the request match the origin of the web page. In these cases, browsers do not send a preflight OPTIONS request, even if the request uses methods like POST or includes custom headers such as Content-Type: application/json, because the request is considered safe and trusted. Cookies, including HttpOnly authentication tokens, are automatically sent with same-origin requests without any extra configuration. Preflight checks are only required for cross-origin requests, where the browser needs to verify that the server explicitly allows the method, headers, and credentials before sending the actual request. This makes same-origin requests simpler and more efficient, while cross-origin requests enforce security protections via CORS.

cookies data should be short because since it is sent in https call, size matters.

cookies are not sent with the preflight request

//
based on session of no expiry is given. on browser close, disappears

Examples: 
1. basically with a time period

2. Session management: login tokens, JWT, session IDs

3. Personalization: theme, language, layout preferences

4. Analytics / tracking: user behavior, visit counts

5. Security: CSRF tokens, anti-forgery measures

6. Temporary data storage: shopping carts, form progress
*/