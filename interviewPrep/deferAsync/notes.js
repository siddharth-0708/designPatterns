/*
HTML loading in the browser happens in multiple independent phases that often get confused: parsing, rendering, and JavaScript execution. HTML parsing means the browser reads the HTML stream from top to bottom and builds the DOM. This process starts as soon as bytes arrive from the network and does not wait for the full document to download. Rendering is a separate phase where the browser turns the DOM and CSSOM into pixels on the screen. JavaScript execution is another separate concern and is scheduled depending on how the script is loaded.

CSS is not parser-blocking, but it is render-blocking. When the browser encounters a `<link rel="stylesheet">`, it immediately starts downloading the CSS file but continues parsing HTML in parallel. The DOM is still built normally, including elements that appear after the CSS link. However, the browser usually delays the first paint until the CSSOM is ready because layout and visibility depend on styles. This is why you may see a blank screen until CSS finishes loading, even though the DOM already exists. What is blocked is rendering (first paint), not parsing.

Render-blocking means a resource prevents the browser from painting anything to the screen. CSS is render-blocking because the browser must know layout rules, visibility, and dimensions before it can safely draw pixels. JavaScript without `async` or `defer` is also render-blocking because it can modify the DOM or styles before paint. Render-blocking affects when pixels appear, not when the DOM is created.

Parser-blocking means a resource stops HTML parsing. A normal `<script src="...">` is parser-blocking because the browser must pause parsing, download the script, and execute it before continuing. Inline scripts are also parser-blocking. CSS is never parser-blocking. Scripts with `defer` or `async` are not parser-blocking because the browser continues parsing HTML while they download.

JavaScript execution timing depends on the script type. A normal script executes immediately when encountered and blocks HTML parsing and rendering. A deferred script downloads in parallel and executes only after HTML parsing is complete, just before `DOMContentLoaded`, and in document order. An async script downloads in parallel and executes as soon as it is ready, without blocking parsing, but execution order is not guaranteed and it may interrupt rendering.

Even without `defer`, JavaScript execution may appear to wait for CSS. This happens because JavaScript can read layout and computed styles. To guarantee correctness, browsers delay JavaScript execution until the CSSOM is ready when a script might access styles or layout. This is not render-blocking or parser-blocking; it is a safety dependency between CSS and JavaScript execution.

You can detect whether JavaScript is parser-blocking by checking DOM availability. If a script runs and elements that appear later in the HTML are missing, parsing was blocked. If those elements already exist, parsing was not blocked. In DevTools, parser-blocking scripts show visible pauses in HTML parsing and long “Evaluate Script” tasks in the Performance timeline.

The optimal loading strategy focuses on minimizing render-blocking and parser-blocking work during initial load. The best practice is to inline only critical CSS needed for above-the-fold content directly in the HTML. This allows the browser to render something immediately. The remaining CSS should be loaded asynchronously using preload or a normal stylesheet link once critical content is visible. Breaking CSS into many files is usually not helpful; it is better to bundle CSS logically, because the browser must still wait for all required CSS before rendering.

For JavaScript, the default best choice is `defer`. Deferred scripts do not block parsing or rendering and execute after the DOM is ready. `async` should only be used for scripts that are completely independent of the DOM and other scripts, such as analytics or ads. Normal scripts without attributes should be avoided unless blocking behavior is explicitly required.

An optimal modern page load follows this mental model: inline what is critical, defer what can wait, and async what is independent. CSS controls when the page can be painted, JavaScript controls behavior, and HTML parsing should be allowed to run as freely as possible to achieve the fastest and most stable initial render.


// DOMContentLoaded vs Load

The DOMContentLoaded event will fire as soon as the DOM hierarchy has been fully constructed, the load event will do it when all the images and sub-frames have finished loading.


Confusion:
The DOMContentLoaded event is fired when the document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading (the load event can be used to detect a fully-loaded page).

A) Fyi, the same MDN link [now] also says: "Note: Stylesheet loads block script execution, so if you have a <script> after a <link rel="stylesheet" ...>, the page will not finish parsing - and DOMContentLoaded will not fire - until the stylesheet is loaded."
*/