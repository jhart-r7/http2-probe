# http2-probe

A [Sonar](https://github.com/rapid7/sonar) probe that generates HTTP/2 findings from IPv4 addresses.

About
-----

* Attempts to reverse DNS each IPv4 address passed into STDIN, and then make a HTTP/2 handshake on port 443 to determine findings.  

* TODO 
* * more scenarios need to be considered e.g. port 80/http, http/1.1 handshake upgrade, etc 
* * need to monkey patch node_modules/http2/lib/http.js:843)



Dependencies
------------

* [nodejs](https://nodejs.org/en/)
* [node-http2](https://github.com/molnarg/node-http2) **__( [RFC7540](https://httpwg.github.io/specs/rfc7540.html) compliant)__


Installation
------------

```
npm install
```

Example Usage
-----

* stdin : a list of IPv4 addresses seperated by newline characters
* stdout: findings (one per host) in JSON format.

See [example.sh](example.sh).

```
echo "63.245.215.20
216.58.193.78
52.84.18.103
131.252.115.150
181.224.138.228" | ./http2-probe > output.json
```




