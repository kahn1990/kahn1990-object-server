# gzip

## Usage

```js
var koa = require('koa');
var gzip = require('koa-gzip');

var app = koa();
koa.use(gzip());
```

### gzip always be the last middleware

If you using other response middlewares, like [etag](https://github.com/koajs/etag), just use `gzip` be the first.

    app.use(gzip());
    app.use(fresh());
    app.use(etag());

    client => request => gzip() => fresh() => etag() => logic codes
                                                                ||
                    client <= gzip() <= fresh() <= etag() <= response

## fresh

    

    // must following this: 
    // * request: fresh => etag 
    // * response: etag => fresh 
    
    
    ## API
    
    ```js
    var fresh = require('fresh')
    ```
    
    ### fresh(req, res)
    
     Check freshness of `req` and `res` headers.
    
     When the cache is "fresh" __true__ is returned,
     otherwise __false__ is returned to indicate that
     the cache is now stale.
    
    ## Example
    
    ```js
    var req = { 'if-none-match': 'tobi' };
    var res = { 'etag': 'luna' };
    fresh(req, res);
    // => false
    
    var req = { 'if-none-match': 'tobi' };
    var res = { 'etag': 'tobi' };
    fresh(req, res);
    // => true
    ```
    
    
# cors

koa-cors
========

CORS middleware for Koa

Inspired by the great [node-cors](https://github.com/troygoode/node-cors) module.

## Installation (via [npm](https://npmjs.org/package/koa-cors))

```bash
$ npm install koa-cors
```

## Usage

```javascript
var koa = require('koa');
var route = require('koa-route');
var cors = require('koa-cors');
var app = koa();

app.use(cors());

app.use(route.get('/', function() {
  this.body = { msg: 'Hello World!' };
}));

app.listen(3000);
```

## Options

### origin

Configures the **Access-Control-Allow-Origin** CORS header. Expects a string
(ex: http://example.com). Set to `true` to reflect the
[request origin](http://tools.ietf.org/html/draft-abarth-origin-09), as defined
by `req.header('Origin')`. Set to `false` to disable CORS. Can also be set to a
function, which takes the request as the first parameter.

### expose

Configures the **Access-Control-Expose-Headers** CORS header. Expects a
comma-delimited string (ex: 'WWW-Authenticate,Server-Authorization') or an array
(ex: `['WWW-Authenticate', 'Server-Authorization]`). Set this to pass the
header, otherwise it is omitted.

### maxAge

Configures the **Access-Control-Max-Age** CORS header. Set to an integer to pass
the header, otherwise it is omitted.

### credentials

Configures the **Access-Control-Allow-Credentials** CORS header. Set to `true`
to pass the header, otherwise it is omitted.

### methods

Configures the **Access-Control-Allow-Methods** CORS header. Expects a
comma-delimited string (ex: 'GET,PUT,POST') or an array (ex: `['GET', 'PUT',
'POST']`).

### headers
Configures the **Access-Control-Allow-Headers** CORS header. Expects a
comma-delimited string (ex: 'Content-Type,Authorization') or an array (ex:
`['Content-Type', 'Authorization]`). If not specified, defaults to reflecting
the headers specified in the request's **Access-Control-Request-Headers**
header.


For details on the effect of each CORS header,
[read this article on HTML5 Rocks](http://www.html5rocks.com/en/tutorials/cors/).


## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

