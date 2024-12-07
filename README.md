# Security Toolkit
This toolkit is a collection of middlewares designed to help secure Node.js apps. These middlewares can be integrated into any microservice to enhance security practices such as IP blocklisting, TLS enforcement, HTTP method restrictions, rate limiting, security headers injection, and more.

### Features
- __Add an IP to a Blocklist:__ Adds an IP address to a blocklist to prevent malicious or unwanted traffic.
- __Check if IP is Blocklisted__: Checks whether a given IP address is on the blocklist.
- __Block Unsafe HTTP Requests (No TLS)__: Blocks requests that are not served over TLS (i.e., HTTP requests instead of HTTPS).
- __HTTP Method Blocking__: Allows the blocking of specific HTTP methods (e.g., OPTIONS) to reduce attack surface.
- __Rate Limiting__: Limits the number of requests a client can make to prevent abuse or DDoS attacks.
- __Security Headers Injection__: Automatically injects recommended security headers into responses to enhance security. All headers used are based on OWASP's Secure Headers project.
- __Unsafe Headers Blocking__: Blocks requests with unsafe headers that may be used in attacks. All headers used are based on OWASP's Secure Headers project.
- __User-Agent Analysis__: Analyzes the User-Agent string of incoming requests and can block suspicious or malicious user agents.
- __Input Escaping__: Sanitizes and escapes potentially harmful characters in user input to prevent SQL injection, XSS, and other injection-based attacks.

### But why a middleware toolkit?
Initially, I wanted to build a __security-focused microservice__, that would serve all of these features through an API. I changed my mind halfway through implementation and decided to build a lib that could just offer a bunch of methods for dev teams to use in their apps. 

Although I've been calling this a middleware toolkit, middlewares are not necessarily the only solution that can be included here. For example, the code I wrote to escape some potentially malicious characters is supposed to be used as a method and not as a middleware. 

Here are the tradeoffs I thought of for each scenario:
- The __microservice__ approach is good for scenarios where the validation logic needs to remain centralized, updated, and consistent across multiple teams.
- The __library/toolkit__ approach is good for when you want to minimize latency and offer a more self-contained solution for development teams.

### Usage
I have not uploaded this to NPM, as this is just a simple case study (plus, I have not had enough time to thoroughly test this. And that's critical since this is a lib geared towards security). If you'd like to test any functions here though, just clone the repo and have at it.
