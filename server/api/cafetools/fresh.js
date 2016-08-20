"use strict";

/**
 * Module dependencies.
 */

function fresh() {
    return function *fresh(next) {
        yield* next;

        if (!this.body || this.status === 304) {
            return;
        }

        // determine if it's cacheable
        var cache = 'GET' === this.method || 'HEAD' === this.method;
        if (cache) {
            cache = this.status >= 200 && this.status < 300;
        }

        // freshness
        if (cache && this.fresh) {
            this.status = 304;
            this.response.remove('Content-Type');
            this.response.remove('Content-Length');
        }

        // defaults
        var etagMatches = true;
        var notModified = true;

        // fields
        var modifiedSince = this.request['if-modified-since'];
        var noneMatch     = this.request['if-none-match'];
        var lastModified  = this.response['last-modified'];
        var etag          = this.response['etag'];
        var cc            = this.request['cache-control'];

        // unconditional request
        if (!modifiedSince && !noneMatch) return false;

        // check for no-cache cache request directive
        if (cc && cc.indexOf('no-cache') !== -1) return false;

        // parse if-none-match
        if (noneMatch) noneMatch = noneMatch.split(/ *, */);

        // if-none-match
        if (noneMatch) {
            etagMatches = noneMatch.some(function (match) {
                return match === '*' || match === etag || match === 'W/' + etag;
            });
        }

        // if-modified-since
        if (modifiedSince) {
            modifiedSince = new Date(modifiedSince);
            lastModified  = new Date(lastModified);
            notModified   = lastModified <= modifiedSince;
        }

        return !!(etagMatches && notModified);
    };
}

/**
 * Expose `fresh()`.
 */

module.exports = fresh;