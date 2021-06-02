# Cross-Origin Resource Sharing (CORS)

***Cross-Origin Resource Sharing (CORS)*** is an **HTTP-header based mechanism** that allows a server to indicate any **other origins (domain, scheme, or port)** than its own from which a browser should permit loading of resources. CORS also relies on a mechanism by which browsers make a **“preflight” request** to the server hosting the cross-origin resource, in order to check that the server will permit the actual request. In that preflight, the browser sends headers that indicate the HTTP method and headers that will be used in the actual request.

`XMLHttpRequest` and the `Fetch API` follow the **same-origin policy** means that a web application can only request resources from the **same origin** the application was loaded from unless the response from other origins **includes the right CORS headers**.

## What Is Origin?

Origin = scheme + host + port

## What Is Cross-Origin?

***Cross-Origin*** means a request sent from *A* origin to *B* origin. \
For example, <http://localhost:3000> sends a request to <http://localhost:3001>.

## Why Following CORS?

1. Bob sets up a malicious website, <https://bob.com>, which wants to access <http://localhost:8888>.
2. Alice opens her browser and access <https://bob.com>.
3. If there is no CORS restriction, Bob's website can get information from Alice's <http://localhost:8888>.
4. Bob's website sends the information from Alice's <http://localhost:8888> to his own server.

As the above example described, if there is no *Same-Origin Policy* and *CORS*, Bob is able to get anyone's private information.

### How to Allow Cross-Origin Access?

**Follow CORS!**

CORS is a part of HTTP that lets servers specify any other hosts from which a browser should permit loading of content.

## Who Follows CORS Restriction?

**Browser!**

Javascript code of a web is running on browser. \
Browser **blocks the response NOT the request** by following CORS policy.

Actually, the request is already sent to the resource server, and the server also responded. However, browser blocks the response by CORS policy and does NOT return the response back to Javascript code.

## What requests Use CORS?

This cross-origin sharing standard can enable cross-site HTTP requests for:

1. Invocations of the `XMLHttpRequest` or `Fetch APIs`.
2. Web Fonts (for cross-domain font usage in @font-face within CSS), so that servers can deploy TrueType fonts that can only be cross-site loaded and used by web sites that are permitted to do so.
3. WebGL textures.
4. Images/video frames drawn to a canvas using drawImage().
5. CSS Shapes from images.

## Functional overview

The ***Cross-Origin Resource Sharing*** standard **works by adding new HTTP headers that let servers describe which origins are permitted to read that information from a web browser**. Additionally, for HTTP request methods that can cause side-effects on server data (in particular, **HTTP methods other than `GET`, or `POST` with certain MIME types**), the specification mandates that **browsers "preflight" the request**, soliciting supported methods from the server with the **HTTP `OPTIONS`** request method, and then, upon "approval" from the server, sending the actual request. Servers can also inform clients whether **"credentials" (such as Cookies and HTTP Authentication)** should be sent with requests.

CORS failures result in errors, but for security reasons, specifics about the error are **NOT available to JavaScript**. \
All the code knows is that an error occurred. \
**The only way to determine what specifically went wrong is to look at the browser's console for details.**

## Simple Requests

Simple requests do **NOT** trigger CORS prelight.

1. One of the allowed methods:
    - `GET`
    - `HEAD`
    - `POST`
2. Headers can only be some which are automatically set by the user agent:
    - `Connection`
    - `User-Agent`
3. Headers can also allowed to be **“CORS-safelisted request-header”**:
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type` (but note the additional requirements below)
        - The only allowed values for the **Content-Type** header are:
            - `application/x-www-form-urlencoded`
            - `multipart/form-data`
            - `text/plain`

## Preflight Requests

Other than simple requests discussed above, other requests must first send an HTTP request using the **`OPTIONS`** method to the resource server on the other origin **to determine if the actual request is safe to send**.

### Options Method

**`OPTIONS`** is an HTTP/1.1 method that is used to determine further information from servers, and is a safe method, meaning that it can't be used to change the resource.

#### Client

**`OPTIONS`** method can include headers:

1. **`Access-Control-Request-Method`**
    - **which method**
2. **`Access-Control-Request-Header`**
    - **what custom headers**

By including the above headers, **`OPTIONS`** request can notify the resource server will be sent when the actual request is sent. \
And the resource server can determine whether to accept the actual request or not.

#### Resource Server

**`OPTIONS`** method can include headers:

1. **`Access-Control-Request-Method`**
    - **which methods**
2. **`Access-Control-Request-Header`**
    - **what custom headers**
3. **`Access-Control-Max-Age`**
    - How many seconds for the response to the preflight request can be **cached** for without sending another preflight request
4. **`Access-Control-Allow-Origin`**
    - **What origins**

By including the above headers, **`OPTIONS`** response can notify the client what are accepted.

## Credentials

***Credentialed requests*** that are aware of **HTTP cookies** and **HTTP Authentication** information.

### Simple Requests

If the resource server does NOT respond with a header **`Access-Control-Allow-Credentials: true`**, the **browser** will **REJECT** any response and the response would **be ignored and NOT made available to web content**.

### Preflight Requests

***Preflight requests*** **must never** include credentials.
The **response** to a preflight request **must specify `Access-Control-Allow-Credentials: true`** to indicate that the actual request can be made with credentials.

### Origins

When responding credentialed requests, the resource server **must** specify **an origin** instead of wildcard `*`.

### Third-party Cookies

When making credentialed requests to a different domain, **third-party cookie policies will still apply**.

## Response Headers

### `Access-Control-Allow-Origin`: Preflight, Actual

If the server specifies a single origin (that may dynamically change based on the requesting origin as part of a white-list), then the server should **also include Origin in the Vary response header** — to indicate to clients that server responses will differ based on the value of the Origin request header.

For example:

1. You visited <https://request-1.com> and got some contents through CORS request from <https://response.com>
2. The <https://response.com> server responded without including `VARY: Origin` header
3. After a while, you visit <https://request-2.com>, which also needs some contents from <https://response.com>
4. Your browser will use the cached response, which was cached when you visited <https://request-1.com>
5. The `Access-Control-Cross-Origin` header in cached response does **NOT** include <https://request-2.com> but <https://request-1.com>
6. End up failing to get contents from <https://response.com> on <https://request-2.com>

### `Access-Control-Expose-Headers`: Actual

It lets a server whitelist headers that Javascript in browsers are allowed to access.

### `Access-Control-Max-Age`: Preflight

It indicates how long the results of a preflight request can be cached.

### `Access-Control-Allow-Credentials`: Preflight, Actual

It indicates whether or not the response to the request can be exposed when the credentials flag is true.
See the above discussion for preflight and actual request.

### `Access-Control-Allow-Methods`: Preflight

It specifies the method or methods allowed when accessing the resource.

### `Access-Control-Allow-Headers`: Preflight

It indicates which HTTP headers can be used when making the actual request.

## Request Headers

### `Origin`: Preflight, Actual

It indicates the origin. \
Note that in any access control request, the Origin header is **always** sent.

### `Access-Control-Request-Method`: Preflight

To let the server know what HTTP method will be used when the actual request is made.

### `Access-Control-Request-Headers`: Preflight

To let the server know what HTTP headers will be used when the actual request is made.

## References

1. [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
2. [MDN Web Docs Same-origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
3. [Huli CORS 完全手冊](https://blog.huli.tw/2021/02/19/cors-guide-1/)

## [HackMD](https://hackmd.io/@r04922101/Hy5lbOqlO)
