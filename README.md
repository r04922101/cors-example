# CORS Example

This repository contains my study notes and example code about CORS. \
I wrote some example code to crack CORS issues I have encountered step by step. \
I hope this repository helps not only me when I need to refresh my memory about CORS but also helps others capture what CORS is quickly.

## [Same-Origin Policy](./docs/same-origin-policy.md)

Before we jump into our topic - CORS, we first need to know what is **Same-Origin Policy**. \
Follow the link to read my study notes about **Same-Origin Policy**.

## [CORS](./docs/cors.md)

Finally, we come to our topic - *CORS (Cross-Origin Resource Sharing)*! \
The link is my study note about CORS. \
It covers what is CORS, why CORS comes in, and how and when to follow CORS.

## Examples

I implement some simple examples to try out some simple fetch errors and solve them by following CORS. \
In the following sections, I will use `yarn` for my example commands.

### Installation

Run `yarn`.

### Start the Server

Run `yarn dev`. \
Web sever will listen on <http://localhost:3000>, while the backend resource server will listen on <http://localhost:3001>.

### How to Use

Same-origin policy endpoint: <http://localhost:3000:same-origin-policy> \
CORS endpoint: <http://localhost:3000:cors> \
Visit the websites above and you will see some buttons. \
Click through all the buttons to see if any error occurs. \
After clicking any button, some short error message and explanation will show on the page.
I would also recommned open the developer console, and switch to `console` and `network` tab to see the error message and request/response.

## TODO

1. Reuse and reorgraninze scripts in HTML files.
2. Beautify frontend.
