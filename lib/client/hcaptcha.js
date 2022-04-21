/* https://hcaptcha.com/license */
var hcaptcha = function() {
    "use strict";

    function t(t) {
        var e = this.constructor;
        return this.then((function(i) {
            return e.resolve(t()).then((function() {
                return i
            }))
        }), (function(i) {
            return e.resolve(t()).then((function() {
                return e.reject(i)
            }))
        }))
    }

    function e(t) {
        return new this((function(e, i) {
            if (!t || "undefined" == typeof t.length) return i(new TypeError(typeof t + " " + t + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
            var n = Array.prototype.slice.call(t);
            if (0 === n.length) return e([]);
            var s = n.length;

            function o(t, i) {
                if (i && ("object" == typeof i || "function" == typeof i)) {
                    var r = i.then;
                    if ("function" == typeof r) return void r.call(i, (function(e) {
                        o(t, e)
                    }), (function(i) {
                        n[t] = {
                            status: "rejected",
                            reason: i
                        }, 0 == --s && e(n)
                    }))
                }
                n[t] = {
                    status: "fulfilled",
                    value: i
                }, 0 == --s && e(n)
            }
            for (var r = 0; r < n.length; r++) o(r, n[r])
        }))
    }
    var i = setTimeout,
        n = "undefined" != typeof setImmediate ? setImmediate : null;

    function s(t) {
        return Boolean(t && "undefined" != typeof t.length)
    }

    function o() {}

    function r(t) {
        if (!(this instanceof r)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof t) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], d(t, this)
    }

    function a(t, e) {
        for (; 3 === t._state;) t = t._value;
        0 !== t._state ? (t._handled = !0, r._immediateFn((function() {
            var i = 1 === t._state ? e.onFulfilled : e.onRejected;
            if (null !== i) {
                var n;
                try {
                    n = i(t._value)
                } catch (s) {
                    return void h(e.promise, s)
                }
                l(e.promise, n)
            } else(1 === t._state ? l : h)(e.promise, t._value)
        }))) : t._deferreds.push(e)
    }

    function l(t, e) {
        try {
            if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
            if (e && ("object" == typeof e || "function" == typeof e)) {
                var i = e.then;
                if (e instanceof r) return t._state = 3, t._value = e, void c(t);
                if ("function" == typeof i) return void d((n = i, s = e, function() {
                    n.apply(s, arguments)
                }), t)
            }
            t._state = 1, t._value = e, c(t)
        } catch (o) {
            h(t, o)
        }
        var n, s
    }

    function h(t, e) {
        t._state = 2, t._value = e, c(t)
    }

    function c(t) {
        2 === t._state && 0 === t._deferreds.length && r._immediateFn((function() {
            t._handled || r._unhandledRejectionFn(t._value)
        }));
        for (var e = 0, i = t._deferreds.length; e < i; e++) a(t, t._deferreds[e]);
        t._deferreds = null
    }

    function u(t, e, i) {
        this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = i
    }

    function d(t, e) {
        var i = !1;
        try {
            t((function(t) {
                i || (i = !0, l(e, t))
            }), (function(t) {
                i || (i = !0, h(e, t))
            }))
        } catch (n) {
            if (i) return;
            i = !0, h(e, n)
        }
    }
    r.prototype["catch"] = function(t) {
        return this.then(null, t)
    }, r.prototype.then = function(t, e) {
        var i = new this.constructor(o);
        return a(this, new u(t, e, i)), i
    }, r.prototype["finally"] = t, r.all = function(t) {
        return new r((function(e, i) {
            if (!s(t)) return i(new TypeError("Promise.all accepts an array"));
            var n = Array.prototype.slice.call(t);
            if (0 === n.length) return e([]);
            var o = n.length;

            function r(t, s) {
                try {
                    if (s && ("object" == typeof s || "function" == typeof s)) {
                        var a = s.then;
                        if ("function" == typeof a) return void a.call(s, (function(e) {
                            r(t, e)
                        }), i)
                    }
                    n[t] = s, 0 == --o && e(n)
                } catch (l) {
                    i(l)
                }
            }
            for (var a = 0; a < n.length; a++) r(a, n[a])
        }))
    }, r.allSettled = e, r.resolve = function(t) {
        return t && "object" == typeof t && t.constructor === r ? t : new r((function(e) {
            e(t)
        }))
    }, r.reject = function(t) {
        return new r((function(e, i) {
            i(t)
        }))
    }, r.race = function(t) {
        return new r((function(e, i) {
            if (!s(t)) return i(new TypeError("Promise.race accepts an array"));
            for (var n = 0, o = t.length; n < o; n++) r.resolve(t[n]).then(e, i)
        }))
    }, r._immediateFn = "function" == typeof n && function(t) {
        n(t)
    } || function(t) {
        i(t, 0)
    }, r._unhandledRejectionFn = function(t) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
    };
    var p, f = function() {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw new Error("unable to locate global object")
    }();
    "function" != typeof f.Promise ? f.Promise = r : (f.Promise.prototype["finally"] || (f.Promise.prototype["finally"] = t), f.Promise.allSettled || (f.Promise.allSettled = e)), Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
        return function(e, i) {
            if (null === this || this === undefined) throw TypeError("Array.prototype.indexOf called on null or undefined");
            var n = t(this),
                s = n.length >>> 0,
                o = Math.min(0 | i, s);
            if (o < 0) o = Math.max(0, s + o);
            else if (o >= s) return -1;
            if (void 0 === e) {
                for (; o !== s; ++o)
                    if (void 0 === n[o] && o in n) return o
            } else if (e != e) {
                for (; o !== s; ++o)
                    if (n[o] != n[o]) return o
            } else
                for (; o !== s; ++o)
                    if (n[o] === e) return o;
            return -1
        }
    }(Object)), Array.isArray || (Array.isArray = function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }), document.getElementsByClassName || (window.Element.prototype.getElementsByClassName = document.constructor.prototype.getElementsByClassName = function(t) {
        if (document.querySelectorAll) return document.querySelectorAll("." + t);
        for (var e = document.getElementsByTagName("*"), i = new RegExp("(^|\\s)" + t + "(\\s|$)"), n = [], s = 0; s < e.length; s++) i.test(e[s].className) && n.push(e[s]);
        return n
    }), String.prototype.startsWith || (String.prototype.startsWith = function(t, e) {
        return this.substr(!e || e < 0 ? 0 : +e, t.length) === t
    }), String.prototype.endsWith || (String.prototype.endsWith = function(t, e) {
        return (e === undefined || e > this.length) && (e = this.length), this.substring(e - t.length, e) === t
    });
    try {
        if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
            var m = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
            Object.defineProperty(Element.prototype, "textContent", {
                get: function() {
                    return m.get.call(this)
                },
                set: function(t) {
                    m.set.call(this, t)
                }
            })
        }
    } catch (Pn) {}
    Function.prototype.bind || (Function.prototype.bind = function(t) {
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind: Item Can Not Be Bound.");
        var e = Array.prototype.slice.call(arguments, 1),
            i = this,
            n = function() {},
            s = function() {
                return i.apply(this instanceof n ? this : t, e.concat(Array.prototype.slice.call(arguments)))
            };
        return this.prototype && (n.prototype = this.prototype), s.prototype = new n, s
    }), "function" != typeof Object.create && (Object.create = function(t, e) {
        function i() {}
        if (i.prototype = t, "object" == typeof e)
            for (var n in e) e.hasOwnProperty(n) && (i[n] = e[n]);
        return new i
    }), Date.now || (Date.now = function() {
        return (new Date).getTime()
    }), window.console || (window.console = {});
    for (var y, g, v, b, w = ["error", "info", "log", "show", "table", "trace", "warn"], x = function(t) {}, k = w.length; --k > -1;) p = w[k], window.console[p] || (window.console[p] = x);
    if (window.atob) try {
        window.atob(" ")
    } catch (jn) {
        window.atob = function(t) {
            var e = function(e) {
                return t(String(e).replace(/[\t\n\f\r ]+/g, ""))
            };
            return e.original = t, e
        }(window.atob)
    } else {
        var C = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            _ = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
        window.atob = function(t) {
            if (t = String(t).replace(/[\t\n\f\r ]+/g, ""), !_.test(t)) throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
            var e, i, n;
            t += "==".slice(2 - (3 & t.length));
            for (var s = "", o = 0; o < t.length;) e = C.indexOf(t.charAt(o++)) << 18 | C.indexOf(t.charAt(o++)) << 12 | (i = C.indexOf(t.charAt(o++))) << 6 | (n = C.indexOf(t.charAt(o++))), s += 64 === i ? String.fromCharCode(e >> 16 & 255) : 64 === n ? String.fromCharCode(e >> 16 & 255, e >> 8 & 255) : String.fromCharCode(e >> 16 & 255, e >> 8 & 255, 255 & e);
            return s
        }
    }
    if (Event.prototype.preventDefault || (Event.prototype.preventDefault = function() {
            this.returnValue = !1
        }), Event.prototype.stopPropagation || (Event.prototype.stopPropagation = function() {
            this.cancelBubble = !0
        }), window.Prototype && Array.prototype.toJSON) {
        console.error("[hCaptcha] Custom JSON polyfill detected, please remove to ensure hCaptcha works properly");
        var E = Array.prototype.toJSON,
            S = JSON.stringify;
        JSON.stringify = function(t) {
            try {
                return delete Array.prototype.toJSON, S(t)
            } finally {
                Array.prototype.toJSON = E
            }
        }
    }
    Object.keys || (Object.keys = (y = Object.prototype.hasOwnProperty, g = !Object.prototype.propertyIsEnumerable.call({
            toString: null
        }, "toString"), b = (v = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]).length, function(t) {
            if ("function" != typeof t && ("object" != typeof t || null === t)) throw new TypeError("Object.keys called on non-object");
            var e, i, n = [];
            for (e in t) y.call(t, e) && n.push(e);
            if (g)
                for (i = 0; i < b; i++) y.call(t, v[i]) && n.push(v[i]);
            return n
        }))
        /*! Raven.js 3.27.2 (6d91db933) | github.com/getsentry/raven-js */
        ,
        function(t) {
            if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
            else if ("function" == typeof define && define.amd) define([], t);
            else {
                ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Raven = t()
            }
        }((function() {
            return function t(e, i, n) {
                function s(r, a) {
                    if (!i[r]) {
                        if (!e[r]) {
                            var l = "function" == typeof require && require;
                            if (!a && l) return l(r, !0);
                            if (o) return o(r, !0);
                            var h = new Error("Cannot find module '" + r + "'");
                            throw h.code = "MODULE_NOT_FOUND", h
                        }
                        var c = i[r] = {
                            exports: {}
                        };
                        e[r][0].call(c.exports, (function(t) {
                            var i = e[r][1][t];
                            return s(i || t)
                        }), c, c.exports, t, e, i, n)
                    }
                    return i[r].exports
                }
                for (var o = "function" == typeof require && require, r = 0; r < n.length; r++) s(n[r]);
                return s
            }({
                1: [function(t, e, i) {
                    function n(t) {
                        this.name = "RavenConfigError", this.message = t
                    }
                    n.prototype = new Error, n.prototype.constructor = n, e.exports = n
                }, {}],
                2: [function(t, e, i) {
                    var n = t(5);
                    e.exports = {
                        wrapMethod: function(t, e, i) {
                            var s = t[e],
                                o = t;
                            if (e in t) {
                                var r = "warn" === e ? "warning" : e;
                                t[e] = function() {
                                    var t = [].slice.call(arguments),
                                        a = n.safeJoin(t, " "),
                                        l = {
                                            level: r,
                                            logger: "console",
                                            extra: {
                                                arguments: t
                                            }
                                        };
                                    "assert" === e ? !1 === t[0] && (a = "Assertion failed: " + (n.safeJoin(t.slice(1), " ") || "console.assert"), l.extra.arguments = t.slice(1), i && i(a, l)) : i && i(a, l), s && Function.prototype.apply.call(s, o, t)
                                }
                            }
                        }
                    }
                }, {
                    5: 5
                }],
                3: [function(t, e, i) {
                    (function(i) {
                        function n() {
                            return +new Date
                        }

                        function s(t, e) {
                            return v(e) ? function(i) {
                                return e(i, t)
                            } : e
                        }

                        function o() {
                            for (var t in this.a = !("object" != typeof JSON || !JSON.stringify), this.b = !g(W), this.c = !g(U), this.d = null, this.e = null, this.f = null, this.g = null, this.h = null, this.i = null, this.j = {}, this.k = {
                                    release: N.SENTRY_RELEASE && N.SENTRY_RELEASE.id,
                                    logger: "javascript",
                                    ignoreErrors: [],
                                    ignoreUrls: [],
                                    whitelistUrls: [],
                                    includePaths: [],
                                    headers: null,
                                    collectWindowErrors: !0,
                                    captureUnhandledRejections: !0,
                                    maxMessageLength: 0,
                                    maxUrlLength: 250,
                                    stackTraceLimit: 50,
                                    autoBreadcrumbs: !0,
                                    instrument: !0,
                                    sampleRate: 1,
                                    sanitizeKeys: []
                                }, this.l = {
                                    method: "POST",
                                    referrerPolicy: I() ? "origin" : ""
                                }, this.m = 0, this.n = !1, this.o = Error.stackTraceLimit, this.p = N.console || {}, this.q = {}, this.r = [], this.s = n(), this.t = [], this.u = [], this.v = null, this.w = N.location, this.x = this.w && this.w.href, this.y(), this.p) this.q[t] = this.p[t]
                        }
                        var r = t(6),
                            a = t(7),
                            l = t(8),
                            h = t(1),
                            c = t(5),
                            u = c.isErrorEvent,
                            d = c.isDOMError,
                            p = c.isDOMException,
                            f = c.isError,
                            m = c.isObject,
                            y = c.isPlainObject,
                            g = c.isUndefined,
                            v = c.isFunction,
                            b = c.isString,
                            w = c.isArray,
                            x = c.isEmptyObject,
                            k = c.each,
                            C = c.objectMerge,
                            _ = c.truncate,
                            E = c.objectFrozen,
                            S = c.hasKey,
                            O = c.joinRegExp,
                            M = c.urlencode,
                            A = c.uuid4,
                            T = c.htmlTreeAsString,
                            L = c.isSameException,
                            B = c.isSameStacktrace,
                            P = c.parseUrl,
                            j = c.fill,
                            $ = c.supportsFetch,
                            I = c.supportsReferrerPolicy,
                            F = c.serializeKeysForMessage,
                            H = c.serializeException,
                            D = c.sanitize,
                            R = t(2).wrapMethod,
                            V = "source protocol user pass host port path".split(" "),
                            z = /^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/,
                            N = "undefined" != typeof window ? window : void 0 !== i ? i : "undefined" != typeof self ? self : {},
                            W = N.document,
                            U = N.navigator;
                        o.prototype = {
                            VERSION: "3.27.2",
                            debug: !1,
                            TraceKit: r,
                            config: function(t, e) {
                                var i = this;
                                if (i.g) return this.z("error", "Error: Raven has already been configured"), i;
                                if (!t) return i;
                                var n = i.k;
                                e && k(e, (function(t, e) {
                                    "tags" === t || "extra" === t || "user" === t ? i.j[t] = e : n[t] = e
                                })), i.setDSN(t), n.ignoreErrors.push(/^Script error\.?$/), n.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/), n.ignoreErrors = O(n.ignoreErrors), n.ignoreUrls = !!n.ignoreUrls.length && O(n.ignoreUrls), n.whitelistUrls = !!n.whitelistUrls.length && O(n.whitelistUrls), n.includePaths = O(n.includePaths), n.maxBreadcrumbs = Math.max(0, Math.min(n.maxBreadcrumbs || 100, 100));
                                var s = {
                                        xhr: !0,
                                        console: !0,
                                        dom: !0,
                                        location: !0,
                                        sentry: !0
                                    },
                                    o = n.autoBreadcrumbs;
                                "[object Object]" === {}.toString.call(o) ? o = C(s, o) : !1 !== o && (o = s), n.autoBreadcrumbs = o;
                                var a = {
                                        tryCatch: !0
                                    },
                                    l = n.instrument;
                                return "[object Object]" === {}.toString.call(l) ? l = C(a, l) : !1 !== l && (l = a), n.instrument = l, r.collectWindowErrors = !!n.collectWindowErrors, i
                            },
                            install: function() {
                                var t = this;
                                return t.isSetup() && !t.n && (r.report.subscribe((function() {
                                    t.A.apply(t, arguments)
                                })), t.k.captureUnhandledRejections && t.B(), t.C(), t.k.instrument && t.k.instrument.tryCatch && t.D(), t.k.autoBreadcrumbs && t.E(), t.F(), t.n = !0), Error.stackTraceLimit = t.k.stackTraceLimit, this
                            },
                            setDSN: function(t) {
                                var e = this,
                                    i = e.G(t),
                                    n = i.path.lastIndexOf("/"),
                                    s = i.path.substr(1, n);
                                e.H = t, e.h = i.user, e.I = i.pass && i.pass.substr(1), e.i = i.path.substr(n + 1), e.g = e.J(i), e.K = e.g + "/" + s + "api/" + e.i + "/store/", this.y()
                            },
                            context: function(t, e, i) {
                                return v(t) && (i = e || [], e = t, t = {}), this.wrap(t, e).apply(this, i)
                            },
                            wrap: function(t, e, i) {
                                function n() {
                                    var n = [],
                                        o = arguments.length,
                                        r = !t || t && !1 !== t.deep;
                                    for (i && v(i) && i.apply(this, arguments); o--;) n[o] = r ? s.wrap(t, arguments[o]) : arguments[o];
                                    try {
                                        return e.apply(this, n)
                                    } catch (a) {
                                        throw s.L(), s.captureException(a, t), a
                                    }
                                }
                                var s = this;
                                if (g(e) && !v(t)) return t;
                                if (v(t) && (e = t, t = void 0), !v(e)) return e;
                                try {
                                    if (e.M) return e;
                                    if (e.N) return e.N
                                } catch (o) {
                                    return e
                                }
                                for (var r in e) S(e, r) && (n[r] = e[r]);
                                return n.prototype = e.prototype, e.N = n, n.M = !0, n.O = e, n
                            },
                            uninstall: function() {
                                return r.report.uninstall(), this.P(), this.Q(), this.R(), this.S(), Error.stackTraceLimit = this.o, this.n = !1, this
                            },
                            T: function(t) {
                                this.z("debug", "Raven caught unhandled promise rejection:", t), this.captureException(t.reason, {
                                    mechanism: {
                                        type: "onunhandledrejection",
                                        handled: !1
                                    }
                                })
                            },
                            B: function() {
                                return this.T = this.T.bind(this), N.addEventListener && N.addEventListener("unhandledrejection", this.T), this
                            },
                            P: function() {
                                return N.removeEventListener && N.removeEventListener("unhandledrejection", this.T), this
                            },
                            captureException: function(t, e) {
                                if (e = C({
                                        trimHeadFrames: 0
                                    }, e || {}), u(t) && t.error) t = t.error;
                                else {
                                    if (d(t) || p(t)) {
                                        var i = t.name || (d(t) ? "DOMError" : "DOMException"),
                                            n = t.message ? i + ": " + t.message : i;
                                        return this.captureMessage(n, C(e, {
                                            stacktrace: !0,
                                            trimHeadFrames: e.trimHeadFrames + 1
                                        }))
                                    }
                                    if (f(t)) t = t;
                                    else {
                                        if (!y(t)) return this.captureMessage(t, C(e, {
                                            stacktrace: !0,
                                            trimHeadFrames: e.trimHeadFrames + 1
                                        }));
                                        e = this.U(e, t), t = new Error(e.message)
                                    }
                                }
                                this.d = t;
                                try {
                                    var s = r.computeStackTrace(t);
                                    this.V(s, e)
                                } catch (o) {
                                    if (t !== o) throw o
                                }
                                return this
                            },
                            U: function(t, e) {
                                var i = Object.keys(e).sort(),
                                    n = C(t, {
                                        message: "Non-Error exception captured with keys: " + F(i),
                                        fingerprint: [l(i)],
                                        extra: t.extra || {}
                                    });
                                return n.extra.W = H(e), n
                            },
                            captureMessage: function(t, e) {
                                if (!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(t)) {
                                    var i, n = C({
                                        message: t += ""
                                    }, e = e || {});
                                    try {
                                        throw new Error(t)
                                    } catch (s) {
                                        i = s
                                    }
                                    i.name = null;
                                    var o = r.computeStackTrace(i),
                                        a = w(o.stack) && o.stack[1];
                                    a && "Raven.captureException" === a.func && (a = o.stack[2]);
                                    var l = a && a.url || "";
                                    if ((!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(l)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(l))) {
                                        if (this.k.stacktrace || e.stacktrace || "" === n.message) {
                                            n.fingerprint = null == n.fingerprint ? t : n.fingerprint, (e = C({
                                                trimHeadFrames: 0
                                            }, e)).trimHeadFrames += 1;
                                            var h = this.X(o, e);
                                            n.stacktrace = {
                                                frames: h.reverse()
                                            }
                                        }
                                        return n.fingerprint && (n.fingerprint = w(n.fingerprint) ? n.fingerprint : [n.fingerprint]), this.Y(n), this
                                    }
                                }
                            },
                            captureBreadcrumb: function(t) {
                                var e = C({
                                    timestamp: n() / 1e3
                                }, t);
                                if (v(this.k.breadcrumbCallback)) {
                                    var i = this.k.breadcrumbCallback(e);
                                    if (m(i) && !x(i)) e = i;
                                    else if (!1 === i) return this
                                }
                                return this.u.push(e), this.u.length > this.k.maxBreadcrumbs && this.u.shift(), this
                            },
                            addPlugin: function(t) {
                                var e = [].slice.call(arguments, 1);
                                return this.r.push([t, e]), this.n && this.F(), this
                            },
                            setUserContext: function(t) {
                                return this.j.user = t, this
                            },
                            setExtraContext: function(t) {
                                return this.Z("extra", t), this
                            },
                            setTagsContext: function(t) {
                                return this.Z("tags", t), this
                            },
                            clearContext: function() {
                                return this.j = {}, this
                            },
                            getContext: function() {
                                return JSON.parse(a(this.j))
                            },
                            setEnvironment: function(t) {
                                return this.k.environment = t, this
                            },
                            setRelease: function(t) {
                                return this.k.release = t, this
                            },
                            setDataCallback: function(t) {
                                var e = this.k.dataCallback;
                                return this.k.dataCallback = s(e, t), this
                            },
                            setBreadcrumbCallback: function(t) {
                                var e = this.k.breadcrumbCallback;
                                return this.k.breadcrumbCallback = s(e, t), this
                            },
                            setShouldSendCallback: function(t) {
                                var e = this.k.shouldSendCallback;
                                return this.k.shouldSendCallback = s(e, t), this
                            },
                            setTransport: function(t) {
                                return this.k.transport = t, this
                            },
                            lastException: function() {
                                return this.d
                            },
                            lastEventId: function() {
                                return this.f
                            },
                            isSetup: function() {
                                return !(!this.a || !this.g && (this.ravenNotConfiguredError || (this.ravenNotConfiguredError = !0, this.z("error", "Error: Raven has not been configured.")), 1))
                            },
                            afterLoad: function() {
                                var t = N.RavenConfig;
                                t && this.config(t.dsn, t.config).install()
                            },
                            showReportDialog: function(t) {
                                if (W) {
                                    if (!(t = C({
                                            eventId: this.lastEventId(),
                                            dsn: this.H,
                                            user: this.j.user || {}
                                        }, t)).eventId) throw new h("Missing eventId");
                                    if (!t.dsn) throw new h("Missing DSN");
                                    var e = encodeURIComponent,
                                        i = [];
                                    for (var n in t)
                                        if ("user" === n) {
                                            var s = t.user;
                                            s.name && i.push("name=" + e(s.name)), s.email && i.push("email=" + e(s.email))
                                        } else i.push(e(n) + "=" + e(t[n]));
                                    var o = this.J(this.G(t.dsn)),
                                        r = W.createElement("script");
                                    r.async = !0, r.src = o + "/api/embed/error-page/?" + i.join("&"), (W.head || W.body).appendChild(r)
                                }
                            },
                            L: function() {
                                var t = this;
                                this.m += 1, setTimeout((function() {
                                    t.m -= 1
                                }))
                            },
                            $: function(t, e) {
                                var i, n;
                                if (this.b) {
                                    for (n in e = e || {}, t = "raven" + t.substr(0, 1).toUpperCase() + t.substr(1), W.createEvent ? (i = W.createEvent("HTMLEvents")).initEvent(t, !0, !0) : (i = W.createEventObject()).eventType = t, e) S(e, n) && (i[n] = e[n]);
                                    if (W.createEvent) W.dispatchEvent(i);
                                    else try {
                                        W.fireEvent("on" + i.eventType.toLowerCase(), i)
                                    } catch (s) {}
                                }
                            },
                            _: function(t) {
                                var e = this;
                                return function(i) {
                                    if (e.aa = null, e.v !== i) {
                                        var n;
                                        e.v = i;
                                        try {
                                            n = T(i.target)
                                        } catch (s) {
                                            n = "<unknown>"
                                        }
                                        e.captureBreadcrumb({
                                            category: "ui." + t,
                                            message: n
                                        })
                                    }
                                }
                            },
                            ba: function() {
                                var t = this;
                                return function(e) {
                                    var i;
                                    try {
                                        i = e.target
                                    } catch (s) {
                                        return
                                    }
                                    var n = i && i.tagName;
                                    if (n && ("INPUT" === n || "TEXTAREA" === n || i.isContentEditable)) {
                                        var o = t.aa;
                                        o || t._("input")(e), clearTimeout(o), t.aa = setTimeout((function() {
                                            t.aa = null
                                        }), 1e3)
                                    }
                                }
                            },
                            ca: function(t, e) {
                                var i = P(this.w.href),
                                    n = P(e),
                                    s = P(t);
                                this.x = e, i.protocol === n.protocol && i.host === n.host && (e = n.relative), i.protocol === s.protocol && i.host === s.host && (t = s.relative), this.captureBreadcrumb({
                                    category: "navigation",
                                    data: {
                                        to: e,
                                        from: t
                                    }
                                })
                            },
                            C: function() {
                                var t = this;
                                t.da = Function.prototype.toString, Function.prototype.toString = function() {
                                    return "function" == typeof this && this.M ? t.da.apply(this.O, arguments) : t.da.apply(this, arguments)
                                }
                            },
                            Q: function() {
                                this.da && (Function.prototype.toString = this.da)
                            },
                            D: function() {
                                function t(t) {
                                    return function(e, n) {
                                        for (var s = new Array(arguments.length), o = 0; o < s.length; ++o) s[o] = arguments[o];
                                        var r = s[0];
                                        return v(r) && (s[0] = i.wrap({
                                            mechanism: {
                                                type: "instrument",
                                                data: {
                                                    "function": t.name || "<anonymous>"
                                                }
                                            }
                                        }, r)), t.apply ? t.apply(this, s) : t(s[0], s[1])
                                    }
                                }

                                function e(t) {
                                    var e = N[t] && N[t].prototype;
                                    e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (j(e, "addEventListener", (function(e) {
                                        return function(n, o, r, a) {
                                            try {
                                                o && o.handleEvent && (o.handleEvent = i.wrap({
                                                    mechanism: {
                                                        type: "instrument",
                                                        data: {
                                                            target: t,
                                                            "function": "handleEvent",
                                                            handler: o && o.name || "<anonymous>"
                                                        }
                                                    }
                                                }, o.handleEvent))
                                            } catch (l) {}
                                            var h, c, u;
                                            return s && s.dom && ("EventTarget" === t || "Node" === t) && (c = i._("click"), u = i.ba(), h = function(t) {
                                                if (t) {
                                                    var e;
                                                    try {
                                                        e = t.type
                                                    } catch (i) {
                                                        return
                                                    }
                                                    return "click" === e ? c(t) : "keypress" === e ? u(t) : void 0
                                                }
                                            }), e.call(this, n, i.wrap({
                                                mechanism: {
                                                    type: "instrument",
                                                    data: {
                                                        target: t,
                                                        "function": "addEventListener",
                                                        handler: o && o.name || "<anonymous>"
                                                    }
                                                }
                                            }, o, h), r, a)
                                        }
                                    }), n), j(e, "removeEventListener", (function(t) {
                                        return function(e, i, n, s) {
                                            try {
                                                i = i && (i.N ? i.N : i)
                                            } catch (o) {}
                                            return t.call(this, e, i, n, s)
                                        }
                                    }), n))
                                }
                                var i = this,
                                    n = i.t,
                                    s = this.k.autoBreadcrumbs;
                                j(N, "setTimeout", t, n), j(N, "setInterval", t, n), N.requestAnimationFrame && j(N, "requestAnimationFrame", (function(t) {
                                    return function(e) {
                                        return t(i.wrap({
                                            mechanism: {
                                                type: "instrument",
                                                data: {
                                                    "function": "requestAnimationFrame",
                                                    handler: t && t.name || "<anonymous>"
                                                }
                                            }
                                        }, e))
                                    }
                                }), n);
                                for (var o = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], r = 0; r < o.length; r++) e(o[r])
                            },
                            E: function() {
                                function t(t, i) {
                                    t in i && v(i[t]) && j(i, t, (function(i) {
                                        return e.wrap({
                                            mechanism: {
                                                type: "instrument",
                                                data: {
                                                    "function": t,
                                                    handler: i && i.name || "<anonymous>"
                                                }
                                            }
                                        }, i)
                                    }))
                                }
                                var e = this,
                                    i = this.k.autoBreadcrumbs,
                                    n = e.t;
                                if (i.xhr && "XMLHttpRequest" in N) {
                                    var s = N.XMLHttpRequest && N.XMLHttpRequest.prototype;
                                    j(s, "open", (function(t) {
                                        return function(i, n) {
                                            return b(n) && -1 === n.indexOf(e.h) && (this.ea = {
                                                method: i,
                                                url: n,
                                                status_code: null
                                            }), t.apply(this, arguments)
                                        }
                                    }), n), j(s, "send", (function(i) {
                                        return function() {
                                            function n() {
                                                if (s.ea && 4 === s.readyState) {
                                                    try {
                                                        s.ea.status_code = s.status
                                                    } catch (t) {}
                                                    e.captureBreadcrumb({
                                                        type: "http",
                                                        category: "xhr",
                                                        data: s.ea
                                                    })
                                                }
                                            }
                                            for (var s = this, o = ["onload", "onerror", "onprogress"], r = 0; r < o.length; r++) t(o[r], s);
                                            return "onreadystatechange" in s && v(s.onreadystatechange) ? j(s, "onreadystatechange", (function(t) {
                                                return e.wrap({
                                                    mechanism: {
                                                        type: "instrument",
                                                        data: {
                                                            "function": "onreadystatechange",
                                                            handler: t && t.name || "<anonymous>"
                                                        }
                                                    }
                                                }, t, n)
                                            })) : s.onreadystatechange = n, i.apply(this, arguments)
                                        }
                                    }), n)
                                }
                                i.xhr && $() && j(N, "fetch", (function(t) {
                                    return function() {
                                        for (var i = new Array(arguments.length), n = 0; n < i.length; ++n) i[n] = arguments[n];
                                        var s, o = i[0],
                                            r = "GET";
                                        if ("string" == typeof o ? s = o : "Request" in N && o instanceof N.Request ? (s = o.url, o.method && (r = o.method)) : s = "" + o, -1 !== s.indexOf(e.h)) return t.apply(this, i);
                                        i[1] && i[1].method && (r = i[1].method);
                                        var a = {
                                            method: r,
                                            url: s,
                                            status_code: null
                                        };
                                        return t.apply(this, i).then((function(t) {
                                            return a.status_code = t.status, e.captureBreadcrumb({
                                                type: "http",
                                                category: "fetch",
                                                data: a
                                            }), t
                                        }))["catch"]((function(t) {
                                            throw e.captureBreadcrumb({
                                                type: "http",
                                                category: "fetch",
                                                data: a,
                                                level: "error"
                                            }), t
                                        }))
                                    }
                                }), n), i.dom && this.b && (W.addEventListener ? (W.addEventListener("click", e._("click"), !1), W.addEventListener("keypress", e.ba(), !1)) : W.attachEvent && (W.attachEvent("onclick", e._("click")), W.attachEvent("onkeypress", e.ba())));
                                var o = N.chrome,
                                    r = !(o && o.app && o.app.runtime) && N.history && N.history.pushState && N.history.replaceState;
                                if (i.location && r) {
                                    var a = N.onpopstate;
                                    N.onpopstate = function() {
                                        var t = e.w.href;
                                        if (e.ca(e.x, t), a) return a.apply(this, arguments)
                                    };
                                    var l = function(t) {
                                        return function() {
                                            var i = arguments.length > 2 ? arguments[2] : void 0;
                                            return i && e.ca(e.x, i + ""), t.apply(this, arguments)
                                        }
                                    };
                                    j(N.history, "pushState", l, n), j(N.history, "replaceState", l, n)
                                }
                                if (i.console && "console" in N && console.log) {
                                    var h = function(t, i) {
                                        e.captureBreadcrumb({
                                            message: t,
                                            level: i.level,
                                            category: "console"
                                        })
                                    };
                                    k(["debug", "info", "warn", "error", "log"], (function(t, e) {
                                        R(console, e, h)
                                    }))
                                }
                            },
                            R: function() {
                                for (var t; this.t.length;) {
                                    var e = (t = this.t.shift())[0],
                                        i = t[1],
                                        n = t[2];
                                    e[i] = n
                                }
                            },
                            S: function() {
                                for (var t in this.q) this.p[t] = this.q[t]
                            },
                            F: function() {
                                var t = this;
                                k(this.r, (function(e, i) {
                                    var n = i[0],
                                        s = i[1];
                                    n.apply(t, [t].concat(s))
                                }))
                            },
                            G: function(t) {
                                var e = z.exec(t),
                                    i = {},
                                    n = 7;
                                try {
                                    for (; n--;) i[V[n]] = e[n] || ""
                                } catch (s) {
                                    throw new h("Invalid DSN: " + t)
                                }
                                if (i.pass && !this.k.allowSecretKey) throw new h("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");
                                return i
                            },
                            J: function(t) {
                                var e = "//" + t.host + (t.port ? ":" + t.port : "");
                                return t.protocol && (e = t.protocol + ":" + e), e
                            },
                            A: function(t, e) {
                                (e = e || {}).mechanism = e.mechanism || {
                                    type: "onerror",
                                    handled: !1
                                }, this.m || this.V(t, e)
                            },
                            V: function(t, e) {
                                var i = this.X(t, e);
                                this.$("handle", {
                                    stackInfo: t,
                                    options: e
                                }), this.fa(t.name, t.message, t.url, t.lineno, i, e)
                            },
                            X: function(t, e) {
                                var i = this,
                                    n = [];
                                if (t.stack && t.stack.length && (k(t.stack, (function(e, s) {
                                        var o = i.ga(s, t.url);
                                        o && n.push(o)
                                    })), e && e.trimHeadFrames))
                                    for (var s = 0; s < e.trimHeadFrames && s < n.length; s++) n[s].in_app = !1;
                                return n = n.slice(0, this.k.stackTraceLimit)
                            },
                            ga: function(t, e) {
                                var i = {
                                    filename: t.url,
                                    lineno: t.line,
                                    colno: t.column,
                                    "function": t.func || "?"
                                };
                                return t.url || (i.filename = e), i.in_app = !(this.k.includePaths.test && !this.k.includePaths.test(i.filename) || /(Raven|TraceKit)\./.test(i["function"]) || /raven\.(min\.)?js$/.test(i.filename)), i
                            },
                            fa: function(t, e, i, n, s, o) {
                                var r, a = (t ? t + ": " : "") + (e || "");
                                if ((!this.k.ignoreErrors.test || !this.k.ignoreErrors.test(e) && !this.k.ignoreErrors.test(a)) && (s && s.length ? (i = s[0].filename || i, s.reverse(), r = {
                                        frames: s
                                    }) : i && (r = {
                                        frames: [{
                                            filename: i,
                                            lineno: n,
                                            in_app: !0
                                        }]
                                    }), (!this.k.ignoreUrls.test || !this.k.ignoreUrls.test(i)) && (!this.k.whitelistUrls.test || this.k.whitelistUrls.test(i)))) {
                                    var l = C({
                                            exception: {
                                                values: [{
                                                    type: t,
                                                    value: e,
                                                    stacktrace: r
                                                }]
                                            },
                                            transaction: i
                                        }, o),
                                        h = l.exception.values[0];
                                    null == h.type && "" === h.value && (h.value = "Unrecoverable error caught"), !l.exception.mechanism && l.mechanism && (l.exception.mechanism = l.mechanism, delete l.mechanism), l.exception.mechanism = C({
                                        type: "generic",
                                        handled: !0
                                    }, l.exception.mechanism || {}), this.Y(l)
                                }
                            },
                            ha: function(t) {
                                var e = this.k.maxMessageLength;
                                if (t.message && (t.message = _(t.message, e)), t.exception) {
                                    var i = t.exception.values[0];
                                    i.value = _(i.value, e)
                                }
                                var n = t.request;
                                return n && (n.url && (n.url = _(n.url, this.k.maxUrlLength)), n.Referer && (n.Referer = _(n.Referer, this.k.maxUrlLength))), t.breadcrumbs && t.breadcrumbs.values && this.ia(t.breadcrumbs), t
                            },
                            ia: function(t) {
                                for (var e, i, n, s = ["to", "from", "url"], o = 0; o < t.values.length; ++o)
                                    if ((i = t.values[o]).hasOwnProperty("data") && m(i.data) && !E(i.data)) {
                                        n = C({}, i.data);
                                        for (var r = 0; r < s.length; ++r) e = s[r], n.hasOwnProperty(e) && n[e] && (n[e] = _(n[e], this.k.maxUrlLength));
                                        t.values[o].data = n
                                    }
                            },
                            ja: function() {
                                if (this.c || this.b) {
                                    var t = {};
                                    return this.c && U.userAgent && (t.headers = {
                                        "User-Agent": U.userAgent
                                    }), N.location && N.location.href && (t.url = N.location.href), this.b && W.referrer && (t.headers || (t.headers = {}), t.headers.Referer = W.referrer), t
                                }
                            },
                            y: function() {
                                this.ka = 0, this.la = null
                            },
                            ma: function() {
                                return this.ka && n() - this.la < this.ka
                            },
                            na: function(t) {
                                var e = this.e;
                                return !(!e || t.message !== e.message || t.transaction !== e.transaction) && (t.stacktrace || e.stacktrace ? B(t.stacktrace, e.stacktrace) : t.exception || e.exception ? L(t.exception, e.exception) : !t.fingerprint && !e.fingerprint || Boolean(t.fingerprint && e.fingerprint) && JSON.stringify(t.fingerprint) === JSON.stringify(e.fingerprint))
                            },
                            oa: function(t) {
                                if (!this.ma()) {
                                    var e = t.status;
                                    if (400 === e || 401 === e || 429 === e) {
                                        var i;
                                        try {
                                            i = $() ? t.headers.get("Retry-After") : t.getResponseHeader("Retry-After"), i = 1e3 * parseInt(i, 10)
                                        } catch (s) {}
                                        this.ka = i || (2 * this.ka || 1e3), this.la = n()
                                    }
                                }
                            },
                            Y: function(t) {
                                var e = this.k,
                                    i = {
                                        project: this.i,
                                        logger: e.logger,
                                        platform: "javascript"
                                    },
                                    s = this.ja();
                                if (s && (i.request = s), t.trimHeadFrames && delete t.trimHeadFrames, (t = C(i, t)).tags = C(C({}, this.j.tags), t.tags), t.extra = C(C({}, this.j.extra), t.extra), t.extra["session:duration"] = n() - this.s, this.u && this.u.length > 0 && (t.breadcrumbs = {
                                        values: [].slice.call(this.u, 0)
                                    }), this.j.user && (t.user = this.j.user), e.environment && (t.environment = e.environment), e.release && (t.release = e.release), e.serverName && (t.server_name = e.serverName), t = this.pa(t), Object.keys(t).forEach((function(e) {
                                        (null == t[e] || "" === t[e] || x(t[e])) && delete t[e]
                                    })), v(e.dataCallback) && (t = e.dataCallback(t) || t), t && !x(t) && (!v(e.shouldSendCallback) || e.shouldSendCallback(t))) return this.ma() ? void this.z("warn", "Raven dropped error due to backoff: ", t) : void("number" == typeof e.sampleRate ? Math.random() < e.sampleRate && this.qa(t) : this.qa(t))
                            },
                            pa: function(t) {
                                return D(t, this.k.sanitizeKeys)
                            },
                            ra: function() {
                                return A()
                            },
                            qa: function(t, e) {
                                var i = this,
                                    n = this.k;
                                if (this.isSetup()) {
                                    if (t = this.ha(t), !this.k.allowDuplicates && this.na(t)) return void this.z("warn", "Raven dropped repeat event: ", t);
                                    this.f = t.event_id || (t.event_id = this.ra()), this.e = t, this.z("debug", "Raven about to send:", t);
                                    var s = {
                                        sentry_version: "7",
                                        sentry_client: "raven-js/" + this.VERSION,
                                        sentry_key: this.h
                                    };
                                    this.I && (s.sentry_secret = this.I);
                                    var o = t.exception && t.exception.values[0];
                                    this.k.autoBreadcrumbs && this.k.autoBreadcrumbs.sentry && this.captureBreadcrumb({
                                        category: "sentry",
                                        message: o ? (o.type ? o.type + ": " : "") + o.value : t.message,
                                        event_id: t.event_id,
                                        level: t.level || "error"
                                    });
                                    var r = this.K;
                                    (n.transport || this._makeRequest).call(this, {
                                        url: r,
                                        auth: s,
                                        data: t,
                                        options: n,
                                        onSuccess: function() {
                                            i.y(), i.$("success", {
                                                data: t,
                                                src: r
                                            }), e && e()
                                        },
                                        onError: function(n) {
                                            i.z("error", "Raven transport failed to send: ", n), n.request && i.oa(n.request), i.$("failure", {
                                                data: t,
                                                src: r
                                            }), n = n || new Error("Raven send failed (no additional details provided)"), e && e(n)
                                        }
                                    })
                                }
                            },
                            _makeRequest: function(t) {
                                var e = t.url + "?" + M(t.auth),
                                    i = null,
                                    n = {};
                                if (t.options.headers && (i = this.sa(t.options.headers)), t.options.fetchParameters && (n = this.sa(t.options.fetchParameters)), $()) {
                                    n.body = a(t.data);
                                    var s = C({}, this.l),
                                        o = C(s, n);
                                    return i && (o.headers = i), N.fetch(e, o).then((function(e) {
                                        if (e.ok) t.onSuccess && t.onSuccess();
                                        else {
                                            var i = new Error("Sentry error code: " + e.status);
                                            i.request = e, t.onError && t.onError(i)
                                        }
                                    }))["catch"]((function() {
                                        t.onError && t.onError(new Error("Sentry error code: network unavailable"))
                                    }))
                                }
                                var r = N.XMLHttpRequest && new N.XMLHttpRequest;
                                r && (("withCredentials" in r || "undefined" != typeof XDomainRequest) && ("withCredentials" in r ? r.onreadystatechange = function() {
                                    if (4 === r.readyState)
                                        if (200 === r.status) t.onSuccess && t.onSuccess();
                                        else if (t.onError) {
                                        var e = new Error("Sentry error code: " + r.status);
                                        e.request = r, t.onError(e)
                                    }
                                } : (r = new XDomainRequest, e = e.replace(/^https?:/, ""), t.onSuccess && (r.onload = t.onSuccess), t.onError && (r.onerror = function() {
                                    var e = new Error("Sentry error code: XDomainRequest");
                                    e.request = r, t.onError(e)
                                })), r.open("POST", e), i && k(i, (function(t, e) {
                                    r.setRequestHeader(t, e)
                                })), r.send(a(t.data))))
                            },
                            sa: function(t) {
                                var e = {};
                                for (var i in t)
                                    if (t.hasOwnProperty(i)) {
                                        var n = t[i];
                                        e[i] = "function" == typeof n ? n() : n
                                    } return e
                            },
                            z: function(t) {
                                this.q[t] && (this.debug || this.k.debug) && Function.prototype.apply.call(this.q[t], this.p, [].slice.call(arguments, 1))
                            },
                            Z: function(t, e) {
                                g(e) ? delete this.j[t] : this.j[t] = C(this.j[t] || {}, e)
                            }
                        }, o.prototype.setUser = o.prototype.setUserContext, o.prototype.setReleaseContext = o.prototype.setRelease, e.exports = o
                    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                }, {
                    1: 1,
                    2: 2,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 8
                }],
                4: [function(t, e, i) {
                    (function(i) {
                        var n = t(3),
                            s = "undefined" != typeof window ? window : void 0 !== i ? i : "undefined" != typeof self ? self : {},
                            o = s.Raven,
                            r = new n;
                        r.noConflict = function() {
                            return s.Raven = o, r
                        }, r.afterLoad(), e.exports = r, e.exports.Client = n
                    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                }, {
                    3: 3
                }],
                5: [function(t, e, i) {
                    (function(i) {
                        function n(t) {
                            switch (Object.prototype.toString.call(t)) {
                                case "[object Error]":
                                case "[object Exception]":
                                case "[object DOMException]":
                                    return !0;
                                default:
                                    return t instanceof Error
                            }
                        }

                        function s(t) {
                            return "[object DOMError]" === Object.prototype.toString.call(t)
                        }

                        function o(t) {
                            return void 0 === t
                        }

                        function r(t) {
                            return "[object Object]" === Object.prototype.toString.call(t)
                        }

                        function a(t) {
                            return "[object String]" === Object.prototype.toString.call(t)
                        }

                        function l(t) {
                            return "[object Array]" === Object.prototype.toString.call(t)
                        }

                        function h() {
                            if (!("fetch" in x)) return !1;
                            try {
                                return new Headers, new Request(""), new Response, !0
                            } catch (t) {
                                return !1
                            }
                        }

                        function c(t, e) {
                            var i, n;
                            if (o(t.length))
                                for (i in t) d(t, i) && e.call(null, i, t[i]);
                            else if (n = t.length)
                                for (i = 0; i < n; i++) e.call(null, i, t[i])
                        }

                        function u(t, e) {
                            if ("number" != typeof e) throw new Error("2nd argument to `truncate` function should be a number");
                            return "string" != typeof t || 0 === e || t.length <= e ? t : t.substr(0, e) + "…"
                        }

                        function d(t, e) {
                            return Object.prototype.hasOwnProperty.call(t, e)
                        }

                        function p(t) {
                            for (var e, i = [], n = 0, s = t.length; n < s; n++) a(e = t[n]) ? i.push(e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : e && e.source && i.push(e.source);
                            return new RegExp(i.join("|"), "i")
                        }

                        function f(t) {
                            var e, i, n, s, o, r = [];
                            if (!t || !t.tagName) return "";
                            if (r.push(t.tagName.toLowerCase()), t.id && r.push("#" + t.id), (e = t.className) && a(e))
                                for (i = e.split(/\s+/), o = 0; o < i.length; o++) r.push("." + i[o]);
                            var l = ["type", "name", "title", "alt"];
                            for (o = 0; o < l.length; o++) n = l[o], (s = t.getAttribute(n)) && r.push("[" + n + '="' + s + '"]');
                            return r.join("")
                        }

                        function m(t, e) {
                            return !!(!!t ^ !!e)
                        }

                        function y(t, e) {
                            if (m(t, e)) return !1;
                            var i = t.frames,
                                n = e.frames;
                            if (void 0 === i || void 0 === n) return !1;
                            if (i.length !== n.length) return !1;
                            for (var s, o, r = 0; r < i.length; r++)
                                if (s = i[r], o = n[r], s.filename !== o.filename || s.lineno !== o.lineno || s.colno !== o.colno || s["function"] !== o["function"]) return !1;
                            return !0
                        }

                        function g(t) {
                            return function(t) {
                                return ~-encodeURI(t).split(/%..|./).length
                            }(JSON.stringify(t))
                        }

                        function v(t) {
                            if ("string" == typeof t) {
                                return u(t, 40)
                            }
                            if ("number" == typeof t || "boolean" == typeof t || void 0 === t) return t;
                            var e = Object.prototype.toString.call(t);
                            return "[object Object]" === e ? "[Object]" : "[object Array]" === e ? "[Array]" : "[object Function]" === e ? t.name ? "[Function: " + t.name + "]" : "[Function]" : t
                        }

                        function b(t, e) {
                            return 0 === e ? v(t) : r(t) ? Object.keys(t).reduce((function(i, n) {
                                return i[n] = b(t[n], e - 1), i
                            }), {}) : Array.isArray(t) ? t.map((function(t) {
                                return b(t, e - 1)
                            })) : v(t)
                        }
                        var w = t(7),
                            x = "undefined" != typeof window ? window : void 0 !== i ? i : "undefined" != typeof self ? self : {},
                            k = 3,
                            C = 51200,
                            _ = 40;
                        e.exports = {
                            isObject: function(t) {
                                return "object" == typeof t && null !== t
                            },
                            isError: n,
                            isErrorEvent: function(t) {
                                return "[object ErrorEvent]" === Object.prototype.toString.call(t)
                            },
                            isDOMError: s,
                            isDOMException: function(t) {
                                return "[object DOMException]" === Object.prototype.toString.call(t)
                            },
                            isUndefined: o,
                            isFunction: function(t) {
                                return "function" == typeof t
                            },
                            isPlainObject: r,
                            isString: a,
                            isArray: l,
                            isEmptyObject: function(t) {
                                if (!r(t)) return !1;
                                for (var e in t)
                                    if (t.hasOwnProperty(e)) return !1;
                                return !0
                            },
                            supportsErrorEvent: function() {
                                try {
                                    return new ErrorEvent(""), !0
                                } catch (t) {
                                    return !1
                                }
                            },
                            supportsDOMError: function() {
                                try {
                                    return new DOMError(""), !0
                                } catch (t) {
                                    return !1
                                }
                            },
                            supportsDOMException: function() {
                                try {
                                    return new DOMException(""), !0
                                } catch (t) {
                                    return !1
                                }
                            },
                            supportsFetch: h,
                            supportsReferrerPolicy: function() {
                                if (!h()) return !1;
                                try {
                                    return new Request("pickleRick", {
                                        referrerPolicy: "origin"
                                    }), !0
                                } catch (t) {
                                    return !1
                                }
                            },
                            supportsPromiseRejectionEvent: function() {
                                return "function" == typeof PromiseRejectionEvent
                            },
                            wrappedCallback: function(t) {
                                return function(e, i) {
                                    var n = t(e) || e;
                                    return i && i(n) || n
                                }
                            },
                            each: c,
                            objectMerge: function(t, e) {
                                return e ? (c(e, (function(e, i) {
                                    t[e] = i
                                })), t) : t
                            },
                            truncate: u,
                            objectFrozen: function(t) {
                                return !!Object.isFrozen && Object.isFrozen(t)
                            },
                            hasKey: d,
                            joinRegExp: p,
                            urlencode: function(t) {
                                var e = [];
                                return c(t, (function(t, i) {
                                    e.push(encodeURIComponent(t) + "=" + encodeURIComponent(i))
                                })), e.join("&")
                            },
                            uuid4: function() {
                                var t = x.crypto || x.msCrypto;
                                if (!o(t) && t.getRandomValues) {
                                    var e = new Uint16Array(8);
                                    t.getRandomValues(e), e[3] = 4095 & e[3] | 16384, e[4] = 16383 & e[4] | 32768;
                                    var i = function(t) {
                                        for (var e = t.toString(16); e.length < 4;) e = "0" + e;
                                        return e
                                    };
                                    return i(e[0]) + i(e[1]) + i(e[2]) + i(e[3]) + i(e[4]) + i(e[5]) + i(e[6]) + i(e[7])
                                }
                                return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (function(t) {
                                    var e = 16 * Math.random() | 0;
                                    return ("x" === t ? e : 3 & e | 8).toString(16)
                                }))
                            },
                            htmlTreeAsString: function(t) {
                                for (var e, i = [], n = 0, s = 0, o = " > ".length; t && n++ < 5 && !("html" === (e = f(t)) || n > 1 && s + i.length * o + e.length >= 80);) i.push(e), s += e.length, t = t.parentNode;
                                return i.reverse().join(" > ")
                            },
                            htmlElementAsString: f,
                            isSameException: function(t, e) {
                                return !m(t, e) && (t = t.values[0], e = e.values[0], t.type === e.type && t.value === e.value && ! function(t, e) {
                                    return o(t) && o(e)
                                }(t.stacktrace, e.stacktrace) && y(t.stacktrace, e.stacktrace))
                            },
                            isSameStacktrace: y,
                            parseUrl: function(t) {
                                if ("string" != typeof t) return {};
                                var e = t.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/),
                                    i = e[6] || "",
                                    n = e[8] || "";
                                return {
                                    protocol: e[2],
                                    host: e[4],
                                    path: e[5],
                                    relative: e[5] + i + n
                                }
                            },
                            fill: function(t, e, i, n) {
                                if (null != t) {
                                    var s = t[e];
                                    t[e] = i(s), t[e].M = !0, t[e].O = s, n && n.push([t, e, s])
                                }
                            },
                            safeJoin: function(t, e) {
                                if (!l(t)) return "";
                                for (var i = [], s = 0; s < t.length; s++) try {
                                    i.push(String(t[s]))
                                } catch (n) {
                                    i.push("[value cannot be serialized]")
                                }
                                return i.join(e)
                            },
                            serializeException: function E(t, e, i) {
                                if (!r(t)) return t;
                                i = "number" != typeof(e = "number" != typeof e ? k : e) ? C : i;
                                var n = b(t, e);
                                return g(w(n)) > i ? E(t, e - 1) : n
                            },
                            serializeKeysForMessage: function(t, e) {
                                if ("number" == typeof t || "string" == typeof t) return t.toString();
                                if (!Array.isArray(t)) return "";
                                if (0 === (t = t.filter((function(t) {
                                        return "string" == typeof t
                                    }))).length) return "[object has no keys]";
                                if (e = "number" != typeof e ? _ : e, t[0].length >= e) return t[0];
                                for (var i = t.length; i > 0; i--) {
                                    var n = t.slice(0, i).join(", ");
                                    if (!(n.length > e)) return i === t.length ? n : n + "…"
                                }
                                return ""
                            },
                            sanitize: function(t, e) {
                                if (!l(e) || l(e) && 0 === e.length) return t;
                                var i, n = p(e),
                                    o = "********";
                                try {
                                    i = JSON.parse(w(t))
                                } catch (s) {
                                    return t
                                }
                                return function a(t) {
                                    return l(t) ? t.map((function(t) {
                                        return a(t)
                                    })) : r(t) ? Object.keys(t).reduce((function(e, i) {
                                        return e[i] = n.test(i) ? o : a(t[i]), e
                                    }), {}) : t
                                }(i)
                            }
                        }
                    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                }, {
                    7: 7
                }],
                6: [function(t, e, i) {
                    (function(i) {
                        function n() {
                            return "undefined" == typeof document || null == document.location ? "" : document.location.href
                        }
                        var s = t(5),
                            o = {
                                collectWindowErrors: !0,
                                debug: !1
                            },
                            r = "undefined" != typeof window ? window : void 0 !== i ? i : "undefined" != typeof self ? self : {},
                            a = [].slice,
                            l = "?",
                            h = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
                        o.report = function() {
                            function t(e, i) {
                                var n = null;
                                if (!i || o.collectWindowErrors) {
                                    for (var s in p)
                                        if (p.hasOwnProperty(s)) try {
                                            p[s].apply(null, [e].concat(a.call(arguments, 2)))
                                        } catch (t) {
                                            n = t
                                        }
                                    if (n) throw n
                                }
                            }

                            function e(e, r, a, c, d) {
                                var p = s.isErrorEvent(d) ? d.error : d,
                                    f = s.isErrorEvent(e) ? e.message : e;
                                if (y) o.computeStackTrace.augmentStackTraceWithInitialElement(y, r, a, f), i();
                                else if (p && s.isError(p)) t(o.computeStackTrace(p), !0);
                                else {
                                    var m, g = {
                                            url: r,
                                            line: a,
                                            column: c
                                        },
                                        v = void 0;
                                    if ("[object String]" === {}.toString.call(f))(m = f.match(h)) && (v = m[1], f = m[2]);
                                    g.func = l, t({
                                        name: v,
                                        message: f,
                                        url: n(),
                                        stack: [g]
                                    }, !0)
                                }
                                return !!u && u.apply(this, arguments)
                            }

                            function i() {
                                var e = y,
                                    i = f;
                                f = null, y = null, m = null, t.apply(null, [e, !1].concat(i))
                            }

                            function c(t, e) {
                                var n = a.call(arguments, 1);
                                if (y) {
                                    if (m === t) return;
                                    i()
                                }
                                var s = o.computeStackTrace(t);
                                if (y = s, m = t, f = n, setTimeout((function() {
                                        m === t && i()
                                    }), s.incomplete ? 2e3 : 0), !1 !== e) throw t
                            }
                            var u, d, p = [],
                                f = null,
                                m = null,
                                y = null;
                            return c.subscribe = function(t) {
                                d || (u = r.onerror, r.onerror = e, d = !0), p.push(t)
                            }, c.unsubscribe = function(t) {
                                for (var e = p.length - 1; e >= 0; --e) p[e] === t && p.splice(e, 1)
                            }, c.uninstall = function() {
                                d && (r.onerror = u, d = !1, u = void 0), p = []
                            }, c
                        }(), o.computeStackTrace = function() {
                            function t(t) {
                                if ("undefined" != typeof t.stack && t.stack) {
                                    for (var e, i, s, o = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, r = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, a = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, h = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, c = /\((\S*)(?::(\d+))(?::(\d+))\)/, u = t.stack.split("\n"), d = [], p = (/^(.*) is undefined$/.exec(t.message), 0), f = u.length; p < f; ++p) {
                                        if (i = o.exec(u[p])) {
                                            var m = i[2] && 0 === i[2].indexOf("native");
                                            i[2] && 0 === i[2].indexOf("eval") && (e = c.exec(i[2])) && (i[2] = e[1], i[3] = e[2], i[4] = e[3]), s = {
                                                url: m ? null : i[2],
                                                func: i[1] || l,
                                                args: m ? [i[2]] : [],
                                                line: i[3] ? +i[3] : null,
                                                column: i[4] ? +i[4] : null
                                            }
                                        } else if (i = r.exec(u[p])) s = {
                                            url: i[2],
                                            func: i[1] || l,
                                            args: [],
                                            line: +i[3],
                                            column: i[4] ? +i[4] : null
                                        };
                                        else {
                                            if (!(i = a.exec(u[p]))) continue;
                                            i[3] && i[3].indexOf(" > eval") > -1 && (e = h.exec(i[3])) ? (i[3] = e[1], i[4] = e[2], i[5] = null) : 0 !== p || i[5] || "undefined" == typeof t.columnNumber || (d[0].column = t.columnNumber + 1), s = {
                                                url: i[3],
                                                func: i[1] || l,
                                                args: i[2] ? i[2].split(",") : [],
                                                line: i[4] ? +i[4] : null,
                                                column: i[5] ? +i[5] : null
                                            }
                                        }
                                        if (!s.func && s.line && (s.func = l), s.url && "blob:" === s.url.substr(0, 5)) {
                                            var y = new XMLHttpRequest;
                                            if (y.open("GET", s.url, !1), y.send(null), 200 === y.status) {
                                                var g = y.responseText || "",
                                                    v = (g = g.slice(-300)).match(/\/\/# sourceMappingURL=(.*)$/);
                                                if (v) {
                                                    var b = v[1];
                                                    "~" === b.charAt(0) && (b = ("undefined" == typeof document || null == document.location ? "" : document.location.origin ? document.location.origin : document.location.protocol + "//" + document.location.hostname + (document.__DIP.location.port ? ":" + document.location.port : "")) + b.slice(1)), s.url = b.slice(0, -4)
                                                }
                                            }
                                        }
                                        d.push(s)
                                    }
                                    return d.length ? {
                                        name: t.name,
                                        message: t.message,
                                        url: n(),
                                        stack: d
                                    } : null
                                }
                            }

                            function e(t, e, i, n) {
                                var s = {
                                    url: e,
                                    line: i
                                };
                                if (s.url && s.line) {
                                    if (t.incomplete = !1, s.func || (s.func = l), t.stack.length > 0 && t.stack[0].url === s.url) {
                                        if (t.stack[0].line === s.line) return !1;
                                        if (!t.stack[0].line && t.stack[0].func === s.func) return t.stack[0].line = s.line, !1
                                    }
                                    return t.stack.unshift(s), t.partial = !0, !0
                                }
                                return t.incomplete = !0, !1
                            }

                            function i(t, r) {
                                for (var a, h, c = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, u = [], d = {}, p = !1, f = i.caller; f && !p; f = f.caller)
                                    if (f !== s && f !== o.report) {
                                        if (h = {
                                                url: null,
                                                func: l,
                                                line: null,
                                                column: null
                                            }, f.name ? h.func = f.name : (a = c.exec(f.toString())) && (h.func = a[1]), "undefined" == typeof h.func) try {
                                            h.func = a.input.substring(0, a.input.indexOf("{"))
                                        } catch (y) {}
                                        d["" + f] ? p = !0 : d["" + f] = !0, u.push(h)
                                    } r && u.splice(0, r);
                                var m = {
                                    name: t.name,
                                    message: t.message,
                                    url: n(),
                                    stack: u
                                };
                                return e(m, t.sourceURL || t.fileName, t.line || t.lineNumber, t.message || t.description), m
                            }

                            function s(e, s) {
                                var a = null;
                                s = null == s ? 0 : +s;
                                try {
                                    if (a = t(e)) return a
                                } catch (r) {
                                    if (o.debug) throw r
                                }
                                try {
                                    if (a = i(e, s + 1)) return a
                                } catch (r) {
                                    if (o.debug) throw r
                                }
                                return {
                                    name: e.name,
                                    message: e.message,
                                    url: n()
                                }
                            }
                            return s.augmentStackTraceWithInitialElement = e, s.computeStackTraceFromStackProp = t, s
                        }(), e.exports = o
                    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
                }, {
                    5: 5
                }],
                7: [function(t, e, i) {
                    function n(t, e) {
                        for (var i = 0; i < t.length; ++i)
                            if (t[i] === e) return i;
                        return -1
                    }

                    function s(t, e) {
                        var i = [],
                            s = [];
                        return null == e && (e = function(t, e) {
                                return i[0] === e ? "[Circular ~]" : "[Circular ~." + s.slice(0, n(i, e)).join(".") + "]"
                            }),
                            function(o, r) {
                                if (i.length > 0) {
                                    var a = n(i, this);
                                    ~a ? i.splice(a + 1) : i.push(this), ~a ? s.splice(a, 1 / 0, o) : s.push(o), ~n(i, r) && (r = e.call(this, o, r))
                                } else i.push(r);
                                return null == t ? r instanceof Error ? function(t) {
                                    var e = {
                                        stack: t.stack,
                                        message: t.message,
                                        name: t.name
                                    };
                                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                                    return e
                                }(r) : r : t.call(this, o, r)
                            }
                    }
                    i = e.exports = function(t, e, i, n) {
                        return JSON.stringify(t, s(e, n), i)
                    }, i.getSerialize = s
                }, {}],
                8: [function(t, e, i) {
                    function n(t, e) {
                        var i = (65535 & t) + (65535 & e);
                        return (t >> 16) + (e >> 16) + (i >> 16) << 16 | 65535 & i
                    }

                    function s(t, e, i, s, o, r) {
                        return n(function(t, e) {
                            return t << e | t >>> 32 - e
                        }(n(n(e, t), n(s, r)), o), i)
                    }

                    function o(t, e, i, n, o, r, a) {
                        return s(e & i | ~e & n, t, e, o, r, a)
                    }

                    function r(t, e, i, n, o, r, a) {
                        return s(e & n | i & ~n, t, e, o, r, a)
                    }

                    function a(t, e, i, n, o, r, a) {
                        return s(e ^ i ^ n, t, e, o, r, a)
                    }

                    function l(t, e, i, n, o, r, a) {
                        return s(i ^ (e | ~n), t, e, o, r, a)
                    }

                    function h(t, e) {
                        t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
                        var i, s, h, c, u, d = 1732584193,
                            p = -271733879,
                            f = -1732584194,
                            m = 271733878;
                        for (i = 0; i < t.length; i += 16) s = d, h = p, c = f, u = m, d = o(d, p, f, m, t[i], 7, -680876936), m = o(m, d, p, f, t[i + 1], 12, -389564586), f = o(f, m, d, p, t[i + 2], 17, 606105819), p = o(p, f, m, d, t[i + 3], 22, -1044525330), d = o(d, p, f, m, t[i + 4], 7, -176418897), m = o(m, d, p, f, t[i + 5], 12, 1200080426), f = o(f, m, d, p, t[i + 6], 17, -1473231341), p = o(p, f, m, d, t[i + 7], 22, -45705983), d = o(d, p, f, m, t[i + 8], 7, 1770035416), m = o(m, d, p, f, t[i + 9], 12, -1958414417), f = o(f, m, d, p, t[i + 10], 17, -42063), p = o(p, f, m, d, t[i + 11], 22, -1990404162), d = o(d, p, f, m, t[i + 12], 7, 1804603682), m = o(m, d, p, f, t[i + 13], 12, -40341101), f = o(f, m, d, p, t[i + 14], 17, -1502002290), d = r(d, p = o(p, f, m, d, t[i + 15], 22, 1236535329), f, m, t[i + 1], 5, -165796510), m = r(m, d, p, f, t[i + 6], 9, -1069501632), f = r(f, m, d, p, t[i + 11], 14, 643717713), p = r(p, f, m, d, t[i], 20, -373897302), d = r(d, p, f, m, t[i + 5], 5, -701558691), m = r(m, d, p, f, t[i + 10], 9, 38016083), f = r(f, m, d, p, t[i + 15], 14, -660478335), p = r(p, f, m, d, t[i + 4], 20, -405537848), d = r(d, p, f, m, t[i + 9], 5, 568446438), m = r(m, d, p, f, t[i + 14], 9, -1019803690), f = r(f, m, d, p, t[i + 3], 14, -187363961), p = r(p, f, m, d, t[i + 8], 20, 1163531501), d = r(d, p, f, m, t[i + 13], 5, -1444681467), m = r(m, d, p, f, t[i + 2], 9, -51403784), f = r(f, m, d, p, t[i + 7], 14, 1735328473), d = a(d, p = r(p, f, m, d, t[i + 12], 20, -1926607734), f, m, t[i + 5], 4, -378558), m = a(m, d, p, f, t[i + 8], 11, -2022574463), f = a(f, m, d, p, t[i + 11], 16, 1839030562), p = a(p, f, m, d, t[i + 14], 23, -35309556), d = a(d, p, f, m, t[i + 1], 4, -1530992060), m = a(m, d, p, f, t[i + 4], 11, 1272893353), f = a(f, m, d, p, t[i + 7], 16, -155497632), p = a(p, f, m, d, t[i + 10], 23, -1094730640), d = a(d, p, f, m, t[i + 13], 4, 681279174), m = a(m, d, p, f, t[i], 11, -358537222), f = a(f, m, d, p, t[i + 3], 16, -722521979), p = a(p, f, m, d, t[i + 6], 23, 76029189), d = a(d, p, f, m, t[i + 9], 4, -640364487), m = a(m, d, p, f, t[i + 12], 11, -421815835), f = a(f, m, d, p, t[i + 15], 16, 530742520), d = l(d, p = a(p, f, m, d, t[i + 2], 23, -995338651), f, m, t[i], 6, -198630844), m = l(m, d, p, f, t[i + 7], 10, 1126891415), f = l(f, m, d, p, t[i + 14], 15, -1416354905), p = l(p, f, m, d, t[i + 5], 21, -57434055), d = l(d, p, f, m, t[i + 12], 6, 1700485571), m = l(m, d, p, f, t[i + 3], 10, -1894986606), f = l(f, m, d, p, t[i + 10], 15, -1051523), p = l(p, f, m, d, t[i + 1], 21, -2054922799), d = l(d, p, f, m, t[i + 8], 6, 1873313359), m = l(m, d, p, f, t[i + 15], 10, -30611744), f = l(f, m, d, p, t[i + 6], 15, -1560198380), p = l(p, f, m, d, t[i + 13], 21, 1309151649), d = l(d, p, f, m, t[i + 4], 6, -145523070), m = l(m, d, p, f, t[i + 11], 10, -1120210379), f = l(f, m, d, p, t[i + 2], 15, 718787259), p = l(p, f, m, d, t[i + 9], 21, -343485551), d = n(d, s), p = n(p, h), f = n(f, c), m = n(m, u);
                        return [d, p, f, m]
                    }

                    function c(t) {
                        var e, i = "",
                            n = 32 * t.length;
                        for (e = 0; e < n; e += 8) i += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
                        return i
                    }

                    function u(t) {
                        var e, i = [];
                        for (i[(t.length >> 2) - 1] = void 0, e = 0; e < i.length; e += 1) i[e] = 0;
                        var n = 8 * t.length;
                        for (e = 0; e < n; e += 8) i[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
                        return i
                    }

                    function d(t) {
                        var e, i, n = "0123456789abcdef",
                            s = "";
                        for (i = 0; i < t.length; i += 1) e = t.charCodeAt(i), s += n.charAt(e >>> 4 & 15) + n.charAt(15 & e);
                        return s
                    }

                    function p(t) {
                        return unescape(encodeURIComponent(t))
                    }

                    function f(t) {
                        return function(t) {
                            return c(h(u(t), 8 * t.length))
                        }(p(t))
                    }

                    function m(t, e) {
                        return function(t, e) {
                            var i, n, s = u(t),
                                o = [],
                                r = [];
                            for (o[15] = r[15] = void 0, s.length > 16 && (s = h(s, 8 * t.length)), i = 0; i < 16; i += 1) o[i] = 909522486 ^ s[i], r[i] = 1549556828 ^ s[i];
                            return n = h(o.concat(u(e)), 512 + 8 * e.length), c(h(r.concat(n), 640))
                        }(p(t), p(e))
                    }
                    e.exports = function(t, e, i) {
                        return e ? i ? m(e, t) : function(t, e) {
                            return d(m(t, e))
                        }(e, t) : i ? f(t) : function(t) {
                            return d(f(t))
                        }(t)
                    }
                }, {}]
            }, {}, [4])(4)
        }));
    var O = [{
            family: "UC Browser",
            patterns: ["(UC? ?Browser|UCWEB|U3)[ /]?(\\d+)\\.(\\d+)\\.(\\d+)"]
        }, {
            family: "Opera",
            name_replace: "Opera Mobile",
            patterns: ["(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)", "(Opera)/(\\d+)\\.(\\d+).+Opera Mobi", "Opera Mobi.+(Opera)(?:/|\\s+)(\\d+)\\.(\\d+)", "Opera Mobi", "(?:Mobile Safari).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)"]
        }, {
            family: "Opera",
            name_replace: "Opera Mini",
            patterns: ["(Opera Mini)(?:/att|)/?(\\d+|)(?:\\.(\\d+)|)(?:\\.(\\d+)|)", "(OPiOS)/(\\d+).(\\d+).(\\d+)"]
        }, {
            family: "Opera",
            name_replace: "Opera Neon",
            patterns: ["Chrome/.+( MMS)/(\\d+).(\\d+).(\\d+)"]
        }, {
            name_replace: "Opera",
            patterns: ["(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(?:Chrome).*(OPR)/(\\d+)\\.(\\d+)\\.(\\d+)"]
        }, {
            family: "Firefox",
            name_replace: "Firefox Mobile",
            patterns: ["(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)", "(Fennec)/(\\d+)\\.(\\d+)(pre)", "(Fennec)/(\\d+)\\.(\\d+)", "(?:Mobile|Tablet);.*(Firefox)/(\\d+)\\.(\\d+)", "(FxiOS)/(\\d+)\\.(\\d+)(\\.(\\d+)|)(\\.(\\d+)|)"]
        }, {
            name_replace: "Coc Coc",
            patterns: ["(coc_coc_browser)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
        }, {
            family: "QQ",
            name_replace: "QQ Mini",
            patterns: ["(MQQBrowser/Mini)(?:(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)|)"]
        }, {
            family: "QQ",
            name_replace: "QQ Mobile",
            patterns: ["(MQQBrowser)(?:/(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)|)"]
        }, {
            name_replace: "QQ",
            patterns: ["(QQBrowser)(?:/(\\d+)(?:\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)|)"]
        }, {
            family: "Edge",
            name: "Edge Mobile",
            patterns: ["Windows Phone .*(Edge)/(\\d+)\\.(\\d+)", "(EdgiOS|EdgA)/(\\d+)\\.(\\d+).(\\d+).(\\d+)"]
        }, {
            name_replace: "Edge",
            patterns: ["(Edge|Edg)/(\\d+)(?:\\.(\\d+)|)"]
        }, {
            patterns: ["(Puffin)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
        }, {
            family: "Chrome",
            name_replace: "Chrome Mobile",
            patterns: ["Version/.+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "; wv\\).+(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)", "(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile(?:[ /]|$)", " Mobile .*(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)"]
        }, {
            family: "Yandex",
            name_replace: "Yandex Mobile",
            patterns: ["(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+).*Mobile"]
        }, {
            name_replace: "Yandex",
            patterns: ["(YaBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)"]
        }, {
            patterns: ["(Vivaldi)/(\\d+)\\.(\\d+)", "(Vivaldi)/(\\d+)\\.(\\d+)\\.(\\d+)"]
        }, {
            name_replace: "Brave",
            patterns: ["(brave)/(\\d+)\\.(\\d+)\\.(\\d+) Chrome"]
        }, {
            family: "Chrome",
            patterns: ["(Chromium|Chrome)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)"]
        }, {
            name_replace: "Internet Explorer Mobile",
            patterns: ["(IEMobile)[ /](\\d+)\\.(\\d+)"]
        }, {
            family: "Safari",
            name_replace: "Safari Mobile",
            patterns: ["(iPod|iPhone|iPad).+Version/(d+).(d+)(?:.(d+)|).*[ +]Safari", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).* AppleNews\\/\\d+\\.\\d+\\.\\d+?", "(iPod|iPhone|iPad).+Version/(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).*Mobile.*[ +]Safari", "(iPod|iPod touch|iPhone|iPad);.*CPU.*OS[ +](\\d+)_(\\d+)(?:_(\\d+)|).*Mobile", "(iPod|iPod touch|iPhone|iPad).* Safari", "(iPod|iPod touch|iPhone|iPad)"]
        }, {
            name_replace: "Safari",
            patterns: ["(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+)|).*Safari/"]
        }, {
            name_replace: "Internet Explorer",
            patterns: ["(Trident)/(7|8).(0)"],
            major_replace: "11"
        }, {
            name_replace: "Internet Explorer",
            patterns: ["(Trident)/(6)\\.(0)"],
            major_replace: "10"
        }, {
            name_replace: "Internet Explorer",
            patterns: ["(Trident)/(5)\\.(0)"],
            major_replace: "9"
        }, {
            name_replace: "Internet Explorer",
            patterns: ["(Trident)/(4)\\.(0)"],
            major_replace: "8"
        }, {
            family: "Firefox",
            patterns: ["(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)", "(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*|)"]
        }],
        M = [{
            family: "Windows",
            name_replace: "Windows Phone",
            patterns: ["(Windows Phone) (?:OS[ /])?(\\d+)\\.(\\d+)", "^UCWEB.*; (wds) (\\d+)\\.(d+)(?:\\.(\\d+)|);", "^UCWEB.*; (wds) (\\d+)\\.(\\d+)(?:\\.(\\d+)|);"]
        }, {
            family: "Windows",
            name_replace: "Windows Mobile",
            patterns: ["(Windows ?Mobile)"]
        }, {
            name_replace: "Android",
            patterns: ["(Android)[ \\-/](\\d+)(?:\\.(\\d+)|)(?:[.\\-]([a-z0-9]+)|)", "(Android) (d+);", "^UCWEB.*; (Adr) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+)|);", "^(JUC).*; ?U; ?(?:Android|)(\\d+)\\.(\\d+)(?:[\\.\\-]([a-z0-9]+)|)", "(android)\\s(?:mobile\\/)(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)|)|)", "(Silk-Accelerated=[a-z]{4,5})", "Puffin/[\\d\\.]+AT", "Puffin/[\\d\\.]+AP"]
        }, {
            name_replace: "Chrome OS",
            patterns: ["(x86_64|aarch64)\\ (\\d+)\\.(\\d+)\\.(\\d+).*Chrome.*(?:CitrixChromeApp)$", "(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+)|)"]
        }, {
            name_replace: "Windows",
            patterns: ["(Windows 10)", "(Windows NT 6\\.4)", "(Windows NT 10\\.0)"],
            major_replace: "10"
        }, {
            name_replace: "Windows",
            patterns: ["(Windows NT 6\\.3; ARM;)", "(Windows NT 6.3)"],
            major_replace: "8",
            minor_replace: "1"
        }, {
            name_replace: "Windows",
            patterns: ["(Windows NT 6\\.2)"],
            major_replace: "8"
        }, {
            name_replace: "Windows",
            patterns: ["(Windows NT 6\\.1)"],
            major_replace: "7"
        }, {
            name_replace: "Windows",
            patterns: ["(Windows NT 6\\.0)"],
            major_replace: "Vista"
        }, {
            name_replace: "Windows",
            patterns: ["(Windows (?:NT 5\\.2|NT 5\\.1))"],
            major_replace: "XP"
        }, {
            name_replace: "Mac OS X",
            patterns: ["((?:Mac[ +]?|; )OS[ +]X)[\\s+/](?:(\\d+)[_.](\\d+)(?:[_.](\\d+)|)|Mach-O)", "\\w+\\s+Mac OS X\\s+\\w+\\s+(\\d+).(\\d+).(\\d+).*", "(?:PPC|Intel) (Mac OS X)"]
        }, {
            name_replace: "Mac OS X",
            patterns: [" (Dar)(win)/(10).(d+).*((?:i386|x86_64))"],
            major_replace: "10",
            minor_replace: "6"
        }, {
            name_replace: "Mac OS X",
            patterns: [" (Dar)(win)/(11).(\\d+).*\\((?:i386|x86_64)\\)"],
            major_replace: "10",
            minor_replace: "7"
        }, {
            name_replace: "Mac OS X",
            patterns: [" (Dar)(win)/(12).(\\d+).*\\((?:i386|x86_64)\\)"],
            major_replace: "10",
            minor_replace: "8"
        }, {
            name_replace: "Mac OS X",
            patterns: [" (Dar)(win)/(13).(\\d+).*\\((?:i386|x86_64)\\)"],
            major_replace: "10",
            minor_replace: "9"
        }, {
            name_replace: "iOS",
            patterns: ["^UCWEB.*; (iPad|iPh|iPd) OS (\\d+)_(\\d+)(?:_(\\d+)|);", "(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(\\d+)[_\\.](\\d+)(?:[_\\.](\\d+)|)", "(iPhone|iPad|iPod); Opera", "(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)", "\\b(iOS[ /]|iOS; |iPhone(?:/| v|[ _]OS[/,]|; | OS : |\\d,\\d/|\\d,\\d; )|iPad/)(\\d{1,2})[_\\.](\\d{1,2})(?:[_\\.](\\d+)|)", "\\((iOS);", "(iPod|iPhone|iPad)", "Puffin/[\\d\\.]+IT", "Puffin/[\\d\\.]+IP"]
        }, {
            family: "Chrome",
            name_replace: "Chromecast",
            patterns: ["(CrKey -)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "(CrKey[ +]armv7l)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "(CrKey)(?:[/](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)"]
        }, {
            name_replace: "Debian",
            patterns: ["([Dd]ebian)"]
        }, {
            family: "Linux",
            name_replace: "Linux",
            patterns: ["(Linux Mint)(?:/(\\d+)|)"]
        }, {
            family: "Linux",
            patterns: ["(Ubuntu|Kubuntu|Arch Linux|CentOS|Slackware|Gentoo|openSUSE|SUSE|Red Hat|Fedora|PCLinuxOS|Mageia|(?:Free|Open|Net|\\b)BSD)", "(Mandriva)(?: Linux|)/(?:[\\d.-]+m[a-z]{2}(\\d+).(\\d)|)", "(Linux)(?:[ /](\\d+)\\.(\\d+)(?:\\.(\\d+)|)|)", "\\(linux-gnu\\)"]
        }, {
            family: "BlackBerry",
            name_replace: "BlackBerry OS",
            patterns: ["(BB10);.+Version/(\\d+)\\.(\\d+)\\.(\\d+)", "(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+)|)", "(Black[Bb]erry)"]
        }, {
            patterns: ["(Fedora|Red Hat|PCLinuxOS|Puppy|Ubuntu|Kindle|Bada|Sailfish|Lubuntu|BackTrack|Slackware|(?:Free|Open|Net|\\b)BSD)[/ ](\\d+)\\.(\\d+)(?:\\.(\\d+)|)(?:\\.(\\d+)|)"]
        }],
        A = navigator.userAgent,
        T = function() {
            return A
        },
        L = function(t) {
            return j(t || A, O)
        },
        B = function(t) {
            return j(t || A, M)
        };

    function P(t, e) {
        try {
            var i = new RegExp(e).exec(t);
            return i ? {
                name: i[1] || "Other",
                major: i[2] || "0",
                minor: i[3] || "0",
                patch: i[4] || "0"
            } : null
        } catch (jn) {
            return null
        }
    }

    function j(t, e) {
        for (var i = null, n = null, s = -1, o = !1; ++s < e.length && !o;) {
            i = e[s];
            for (var r = -1; ++r < i.patterns.length && !o;) o = null !== (n = P(t, i.patterns[r]))
        }
        return o ? (n.family = i.family || i.name_replace || n.name, i.name_replace && (n.name = i.name_replace), i.major_replace && (n.major = i.major_replace), i.minor_replace && (n.minor = i.minor_replace), i.patch_replace && (n.minor = i.patch_replace), n) : {
            family: "Other",
            name: "Other",
            major: "0",
            minor: "0",
            patch: "0"
        }
    }

    function $() {
        var t = this,
            e = L(),
            i = T();
        this.agent = i.toLowerCase(), this.language = window.navigator.userLanguage || window.navigator.language, this.isCSS1 = "CSS1Compat" === (document.compatMode || ""), this.width = function() {
            return window.innerWidth && window.document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || window.document.documentElement.clientWidth || document.body.clientWidth
        }, this.height = function() {
            return window.innerHeight || window.document.documentElement.clientHeight || document.body.clientHeight
        }, this.scrollX = function() {
            return window.pageXOffset !== undefined ? window.pageXOffset : t.isCSS1 ? document.documentElement.scrollLeft : document.body.scrollLeft
        }, this.scrollY = function() {
            return window.pageYOffset !== undefined ? window.pageYOffset : t.isCSS1 ? document.documentElement.scrollTop : document.body.scrollTop
        }, this.type = "Edge" === e.family ? "edge" : "Internet Explorer" === e.family ? "ie" : "Chrome" === e.family ? "chrome" : "Safari" === e.family ? "safari" : "Firefox" === e.family ? "firefox" : e.family.toLowerCase(), this.version = 1 * (e.major + "." + e.minor) || 0, this.hasPostMessage = !!window.postMessage
    }
    $.prototype.hasEvent = function(t, e) {
        return "on" + t in (e || document.createElement("div"))
    }, $.prototype.getScreenDimensions = function() {
        var t = {};
        for (var e in window.screen) t[e] = window.screen[e];
        return delete t.orientation, t
    }, $.prototype.interrogateNavigator = function() {
        var t = {};
        for (var e in window.navigator) try {
            t[e] = window.navigator[e]
        } catch (Pn) {}
        if (delete t.plugins, delete t.mimeTypes, t.plugins = [], window.navigator.plugins)
            for (var i = 0; i < window.navigator.plugins.length; i++) t.plugins[i] = window.navigator.plugins[i].filename;
        return t
    }, $.prototype.supportsCanvas = function() {
        var t = document.createElement("canvas");
        return !(!t.getContext || !t.getContext("2d"))
    }, $.prototype.supportsWebAssembly = function() {
        try {
            if ("object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate) {
                var t = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
                if (t instanceof WebAssembly.Module) return new WebAssembly.Instance(t) instanceof WebAssembly.Instance
            }
        } catch (jn) {
            return !1
        }
    };
    var I = {
            Browser: new $,
            System: new function() {
                var t, e, i = B(),
                    n = T();
                this.mobile = (t = !!("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), e = !1, i && (e = ["iOS", "Windows Phone", "Windows Mobile", "Android", "BlackBerry OS"].indexOf(i.name) >= 0), t && e), this.dpr = function() {
                    return window.devicePixelRatio || 1
                }, this.mobile && i && "Windows" === i.family && n.indexOf("touch") < 0 && (this.mobile = !1), this.os = "iOS" === i.family ? "ios" : "Android" === i.family ? "android" : "Mac OS X" === i.family ? "mac" : "Windows" === i.family ? "windows" : "Linux" === i.family ? "linux" : i.family.toLowerCase(), this.version = function() {
                    if (!i) return "unknown";
                    var t = i.major;
                    return i.minor && (t += "." + i.minor), i.patch && (t += "." + i.patch), t
                }()
            }
        },
        F = {
            host: null,
            file: null,
            sitekey: null,
            a11y_tfe: null,
            pingdom: "safari" === I.Browser.type && "windows" !== I.System.os && "mac" !== I.System.os && "ios" !== I.System.os && "android" !== I.System.os,
            assetDomain: "https://newassets.hcaptcha.com",
            assetUrl: "https://newassets.hcaptcha.com/captcha/v1/74f6caf/static",
            width: null,
            height: null,
            mobile: null
        },
        H = {
            se: null,
            custom: !1,
            tplinks: "on",
            language: null,
            reportapi: "https://accounts.hcaptcha.com",
            endpoint: "https://hcaptcha.com",
            endpointOverride: null,
            size: "normal",
            theme: "light",
            assethost: null,
            imghost: null,
            recaptchacompat: "true"
        };

    function D() {
        var t = this;
        this._bottom = 0, this._top = 0, this.storage = {}, this.add = function(e) {
            return t.storage[t._top] = e, t._top++, e
        }, this.remove = function() {
            if (!t.empty()) {
                var e = t._bottom,
                    i = t.storage[e];
                return t.storage[e] = null, t._bottom++, i
            }
        }, this.empty = function() {
            return t._top === t._bottom
        }, this.size = function() {
            return t._top - t._bottom
        }
    }
    var R = {
        queue: D,
        depth: function $n(t, e, i) {
            if ("object" == typeof t && t[e] && t[e].length > 0)
                for (var n = t[e].length; --n > -1;) $n(t[e][n], e, i);
            t !== undefined && i(t)
        },
        breathe: function(t, e, i) {
            var n = new D,
                s = null;
            for (n.add(t), s = n.remove(); s;) {
                for (var o = 0; o < s[e].length; o++) n.add(s[e][o]);
                i(s), s = n.remove()
            }
        }
    };

    function V() {
        this.children = [], this._events = []
    }
    V.prototype.initComponent = function(t, e) {
        var i = new t(e);
        return i._parent = this, this.children.push(i), i
    }, V.prototype.destroy = function() {
        var t = this;
        try {
            R.depth(this, "children", (function(e) {
                if (t !== e)
                    for (var i = t.children.length; --i > -1;) t.children[i] === e && t.children.splice(i, 1);
                e._destroy && e._destroy(), e = null
            }))
        } catch (jn) {
            throw new Error("Trouble destroying nodes: " + jn)
        }
        return null
    }, V.prototype._destroy = function() {
        this.onDestroy && this.onDestroy();
        for (var t = this._events.length || 0; --t > -1;) this._events.splice(t, 1);
        this.children = null, this._destroy = null, this._events = null, this.destroy = null, this.emit = null, this.on = null, this.off = null, this.initComponent = null
    }, V.prototype.on = function(t, e) {
        for (var i = this._events.length, n = !1; --i > -1 && !1 === n;) this._events[i].event === t && (n = this._events[i]);
        !1 === n && (n = {
            event: t,
            listeners: []
        }, this._events.push(n)), n.listeners.push(e)
    }, V.prototype.off = function(t, e) {
        for (var i = this._events.length; --i > -1;)
            if (this._events[i].event === t) {
                for (var n = this._events[i].listeners.length; --n > -1;) this._events[i].listeners[n] === e && this._events[i].listeners[n].splice(n, 1);
                0 === this._events[i].listeners.length && this._events[i].splice(i, 1)
            }
    }, V.prototype.emit = function(t) {
        for (var e = Array.prototype.slice.call(arguments, 1), i = this._events.length; --i > -1;)
            if (this._events[i].event === t)
                for (var n = this._events[i].listeners.length; --n > -1;) this._events[i].listeners[n].apply(this, e)
    };
    var z = {
            getCookie: function(t) {
                var e = document.cookie.replace(/ /g, "").split(";");
                try {
                    for (var i = "", n = e.length; n-- && !i;) e[n].indexOf(t) >= 0 && (i = e[n]);
                    return i
                } catch (jn) {
                    return ""
                }
            },
            hasCookie: function(t) {
                return !!z.getCookie(t)
            },
            supportsAPI: function() {
                try {
                    return "hasStorageAccess" in document && "requestStorageAccess" in document
                } catch (jn) {
                    return !1
                }
            },
            hasAccess: function() {
                return new Promise((function(t) {
                    document.hasStorageAccess().then((function() {
                        t(!0)
                    }))["catch"]((function() {
                        t(!1)
                    }))
                }))
            },
            requestAccess: function() {
                try {
                    return document.requestStorageAccess()
                } catch (jn) {
                    return Promise.resolve()
                }
            }
        },
        N = {
            array: function(t) {
                if (0 === t.length) return t;
                for (var e, i, n = t.length; --n > -1;) i = Math.floor(Math.random() * (n + 1)), e = t[n], t[n] = t[i], t[i] = e;
                return t
            }
        };

    function W(t) {
        this.r = 255, this.g = 255, this.b = 255, this.a = 1, this.h = 1, this.s = 1, this.l = 1, this.parseString(t)
    }

    function U(t, e, i) {
        return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t
    }
    W.hasAlpha = function(t) {
        return "string" == typeof t && (-1 !== t.indexOf("rgba") || 9 === t.length && "#" === t[0])
    }, W.prototype.parseString = function(t) {
        t && (0 === t.indexOf("#") ? this.fromHex(t) : 0 === t.indexOf("rgb") && this.fromRGBA(t))
    }, W.prototype.fromHex = function(t) {
        var e = 1;
        9 === t.length && (e = parseInt(t.substr(7, 2), 16) / 255);
        var i = (t = t.substr(1, 6)).replace(/^([a-f\d])([a-f\d])([a-f\d])?$/i, (function(t, e, i, n) {
                return e + e + i + i + n + n
            })),
            n = parseInt(i, 16),
            s = n >> 16,
            o = n >> 8 & 255,
            r = 255 & n;
        this.setRGBA(s, o, r, e)
    }, W.prototype.fromRGBA = function(t) {
        var e = t.indexOf("rgba"),
            i = t.substr(e).replace(/rgba?\(/, "").replace(/\)/, "").replace(/[\s+]/g, "").split(","),
            n = Math.floor(parseInt(i[0])),
            s = Math.floor(parseInt(i[1])),
            o = Math.floor(parseInt(i[2])),
            r = parseFloat(i[3]);
        this.setRGBA(n, s, o, r)
    }, W.prototype.setRGB = function(t, e, i) {
        this.setRGBA(t, e, i, 1)
    }, W.prototype.setRGBA = function(t, e, i, n) {
        this.r = t, this.g = e, this.b = i, this.a = isNaN(n) ? this.a : n, this.updateHSL()
    }, W.prototype.hsl2rgb = function(t, e, i) {
        if (0 === e) {
            var n = Math.round(255 * i);
            return this.setRGB(n, n, n), this
        }
        var s = i <= .5 ? i * (1 + e) : i + e - i * e,
            o = 2 * i - s;
        return this.r = Math.round(255 * U(o, s, t + 1 / 3)), this.g = Math.round(255 * U(o, s, t)), this.b = Math.round(255 * U(o, s, t - 1 / 3)), this.h = t, this.s = e, this.l = i, this
    }, W.prototype.updateHSL = function() {
        var t, e = this.r / 255,
            i = this.g / 255,
            n = this.b / 255,
            s = Math.max(e, i, n),
            o = Math.min(e, i, n),
            r = null,
            a = (s + o) / 2;
        if (s === o) r = t = 0;
        else {
            var l = s - o;
            switch (t = a > .5 ? l / (2 - s - o) : l / (s + o), s) {
                case e:
                    r = (i - n) / l + (i < n ? 6 : 0);
                    break;
                case i:
                    r = (n - e) / l + 2;
                    break;
                case n:
                    r = (e - i) / l + 4
            }
            r /= 6
        }
        return this.h = r, this.s = t, this.l = a, this
    }, W.prototype.getHex = function() {
        return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1)
    }, W.prototype.getRGBA = function() {
        return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
    }, W.prototype.clone = function() {
        var t = new W;
        return t.setRGBA(this.r, this.g, this.b, this.a), t
    }, W.prototype.mix = function(t, e) {
        t instanceof W || (t = new W(t));
        var i = new W,
            n = Math.round(this.r + e * (t.r - this.r)),
            s = Math.round(this.g + e * (t.g - this.g)),
            o = Math.round(this.b + e * (t.b - this.b));
        return i.setRGB(n, s, o), i
    }, W.prototype.blend = function(t, e) {
        var i;
        t instanceof W || (t = new W(t));
        for (var n = [], s = 0; s < e; s++) i = this.mix.call(this, t, s / e), n.push(i);
        return n
    }, W.prototype.lightness = function(t) {
        return t > 1 && (t /= 100), this.hsl2rgb(this.h, this.s, t), this
    }, W.prototype.saturation = function(t) {
        return t > 1 && (t /= 100), this.hsl2rgb(this.h, t, this.l), this
    }, W.prototype.hue = function(t) {
        return this.hsl2rgb(t / 360, this.s, this.l), this
    };
    var q = {
            decode: function(t) {
                try {
                    var e = t.split(".");
                    return {
                        header: JSON.parse(atob(e[0])),
                        payload: JSON.parse(atob(e[1])),
                        signature: atob(e[2].replace(/_/g, "/").replace(/-/g, "+")),
                        raw: {
                            header: e[0],
                            payload: e[1],
                            signature: e[2]
                        }
                    }
                } catch (jn) {
                    throw new Error("Token is invalid.")
                }
            },
            checkExpiration: function(t) {
                if (new Date(1e3 * t) <= new Date(Date.now())) throw new Error("Token is expired.");
                return !0
            }
        },
        Z = {
            _setup: !1,
            _af: null,
            _fps: 60,
            _singleFrame: 1 / 60,
            _lagThreshold: 500,
            _adjustedLag: 1 / 60 * 2,
            _startTime: 0,
            _lastTime: 0,
            _nextTime: 1 / 60,
            _elapsed: 0,
            _difference: 0,
            _renders: [],
            _paused: !1,
            _running: !1,
            _tick: !1,
            frame: 0,
            time: 0,
            requestFrame: null,
            cancelFrame: null,
            _init: function() {
                for (var t, e = window.requestAnimationFrame, i = window.cancelAnimationFrame, n = ["ms", "moz", "webkit", "o"], s = n.length; --s > -1 && !e;) e = window[n[s] + "RequestAnimationFrame"], i = window[n[s] + "CancelAnimationFrame"] || window[n[s] + "CancelRequestAnimationFrame"];
                e ? (Z.requestFrame = e.bind(window), Z.cancelFrame = i.bind(window)) : (Z.requestFrame = (t = Date.now(), function(e) {
                    window.setTimeout((function() {
                        e(Date.now() - t)
                    }), 1e3 * Z._singleFrame)
                }), Z.cancelFrame = function(t) {
                    return clearTimeout(t), null
                }), Z._setup = !0, Z._startTime = Z._lastTime = Date.now()
            },
            add: function(t, e) {
                Z._renders.push({
                    callback: t,
                    paused: !1 == !e || !1
                }), !1 == !e && Z.start()
            },
            remove: function(t) {
                for (var e = Z._renders.length; --e > -1;) Z._renders[e].callback === t && (Z._renders[e].paused = !0, Z._renders.splice(e, 1))
            },
            start: function(t) {
                if (!1 === Z._setup && Z._init(), t)
                    for (var e = Z._renders.length; --e > -1;) Z._renders[e].callback === t && (Z._renders[e].paused = !1);
                !0 !== Z._running && (Z._paused = !1, Z._running = !0, Z._af = Z.requestFrame(Z._update))
            },
            stop: function(t) {
                if (t)
                    for (var e = Z._renders.length; --e > -1;) Z._renders[e].callback === t && (Z._renders[e].paused = !0);
                else !1 !== Z._running && (Z._af = Z.cancelFrame(Z._af), Z._paused = !0, Z._running = !1)
            },
            elapsed: function() {
                return Date.now() - Z._startTime
            },
            fps: function(t) {
                return arguments.length ? (Z._fps = t, Z._singleFrame = 1 / (Z._fps || 60), Z._adjustedLag = 2 * Z._singleFrame, Z._nextTime = Z.time + Z._singleFrame, Z._fps) : Z._fps
            },
            isRunning: function() {
                return Z._running
            },
            _update: function() {
                if (!Z._paused && (Z._elapsed = Date.now() - Z._lastTime, Z._tick = !1, Z._elapsed > Z._lagThreshold && (Z._startTime += Z._elapsed - Z._adjustedLag), Z._lastTime += Z._elapsed, Z.time = (Z._lastTime - Z._startTime) / 1e3, Z._difference = Z.time - Z._nextTime, Z._difference > 0 && (Z.frame++, Z._nextTime += Z._difference + (Z._difference >= Z._singleFrame ? Z._singleFrame / 4 : Z._singleFrame - Z._difference), Z._tick = !0), Z._af = Z.requestFrame(Z._update), !0 === Z._tick && Z._renders.length > 0))
                    for (var t = Z._renders.length; --t > -1;) Z._renders[t] && !1 === Z._renders[t].paused && Z._renders[t].callback(Z.time)
            }
        },
        J = !0;

    function K(t) {
        var e = {
            message: t.name + ": " + t.message
        };
        t.stack && (e.stack_trace = {
            trace: t.stack
        }), G("report error", "internal", "debug", e), X("internal error", "error", F.file)
    }

    function X(t, e, i, n) {
        if (e = e || "error", J) {
            var s = "warn" === e ? "warning" : e;
            window.Raven && Raven.captureMessage(t, {
                level: s,
                logger: i,
                extra: n
            })
        }
    }

    function Y(t, e, i) {
        return (i = i || {}).error = e, X(e.message || "Missing error message", "error", t, i)
    }

    function G(t, e, i, n) {
        J && window.Raven && Raven.captureBreadcrumb({
            message: t,
            category: e,
            level: i,
            data: n
        })
    }
    var Q = function(t) {
            window.Raven && Raven.config("https://0f73e9316e6b4aee9e62a74c820604e0@sentry.io/1198795", {
                autoBreadcrumbs: {
                    xhr: !0,
                    dom: !0,
                    sentry: !0
                },
                tags: {
                    "site-host": F.host,
                    "site-key": F.sitekey,
                    "endpoint-url": H.endpoint,
                    "asset-url": F.assetUrl
                },
                sampleRate: .01,
                ignoreErrors: ["canvas.contentDocument", "Can't find variable: ZiteReader", "Cannot redefine property: hcaptcha", "Cannot redefine property: BetterJsPop", "grecaptcha is not defined", "jQuery is not defined", "$ is not defined"]
            }), window.Raven && Raven.setUserContext({
                "Browser-Agent": I.Browser.agent,
                "Browser-Type": I.Browser.type,
                "Browser-Version": I.Browser.version,
                "System-OS": I.System.os,
                "System-Version": I.System.version,
                "Is-Mobile": I.System.mobile
            }), G(t, "setup", "info"), window.onerror = function(t, e, i, n, s) {
                G(t, "global", "debug", {
                    name: s.name || "Error",
                    url: e,
                    line: i,
                    column: n,
                    stack: s.stack || ""
                }), Y("global", s, {
                    message: t
                })
            }
        },
        tt = function(t) {
            var e = [];
            for (var i in t) {
                var n = t[i];
                n = "object" == typeof n ? JSON.stringify(n) : n, e.push([encodeURIComponent(i), encodeURIComponent(n)].join("="))
            }
            return e.join("&")
        };

    function et(t, e, i) {
        return Math.min(Math.max(t, e), i)
    }

    function it(t, e, i, n, s, o) {
        var r = (t - e) * (s - n) / (i - e) + n;
        return !1 === o ? r : et(r, Math.min(n, s), Math.max(n, s))
    }

    function nt(t) {
        return t * (Math.PI / 180)
    }

    function st(t) {
        return 180 * t / Math.PI
    }
    var ot = {
        __proto__: null,
        clamp: et,
        range: it,
        toRadians: nt,
        toDegrees: st
    };

    function rt(t, e) {
        var i, n = "attempts" in (e = e || {}) ? e.attempts : 1,
            s = e.delay || 0,
            o = e.onFail;
        return i = function(e, i, r) {
            t().then(e, (function(t) {
                var e = n-- > 0;
                o && (e = !1 !== o(t) && e), e ? setTimeout(r, s) : i(t)
            }))
        }, new Promise((function(t, e) {
            i(t, e, (function n() {
                i(t, e, n)
            }))
        }))
    }
    var at = {
            eventName: function(t) {
                var e = t;
                return "down" === t || "up" === t || "move" === t || "over" === t || "out" === t ? e = !I.System.mobile || "down" !== t && "up" !== t && "move" !== t ? "mouse" + t : "down" === t ? "touchstart" : "up" === t ? "touchend" : "touchmove" : "enter" === t && (e = "keydown"), e
            },
            actionName: function(t) {
                var e = t;
                return "touchstart" === e || "mousedown" === e ? e = "down" : "touchmove" === e || "mousemove" === e ? e = "move" : "touchend" === e || "mouseup" === e ? e = "up" : "mouseover" === e ? e = "over" : "mouseout" === e && (e = "out"), e
            },
            eventCallback: function(t, e, i) {
                var n = at.actionName(t);
                return function(s) {
                    if (s = s || window.event, "down" === n || "move" === n || "up" === n || "over" === n || "out" === n || "click" === n) {
                        var o = at.eventCoords(s);
                        if (!o) return;
                        var r = i.getBoundingClientRect();
                        s.windowX = o.x, s.windowY = o.y, s.elementX = s.windowX - (r.x || r.left), s.elementY = s.windowY - (r.y || r.top)
                    }
                    s.keyNum = s.which || s.keyCode || 0, "enter" === t && 13 !== s.keyNum && 32 !== s.keyNum || (s.action = n, s.targetElement = i, e(s))
                }
            },
            eventCoords: function(t) {
                if (!t) return null;
                var e = t;
                if (t.touches || t.changedTouches) {
                    var i = t.touches && t.touches.length >= 1 ? t.touches : t.changedTouches;
                    i && i[0] && (e = i[0])
                }
                return "number" == typeof e.pageX && "number" == typeof e.pageY ? {
                    x: e.pageX,
                    y: e.pageY
                } : "number" == typeof e.clientX && "number" == typeof e.clientY ? {
                    x: e.clientX,
                    y: e.clientY
                } : null
            }
        },
        lt = ["Webkit", "Moz", "ms"],
        ht = document.createElement("div").style,
        ct = {};

    function ut(t) {
        var e = ct[t];
        return e || (t in ht ? t : ct[t] = function(t) {
            for (var e = t[0].toUpperCase() + t.slice(1), i = lt.length; i--;)
                if ((t = lt[i] + e) in ht) return t
        }(t) || t)
    }

    function dt(t, e, i) {
        if (this.dom = null, this._clss = [], this._nodes = [], this._listeners = [], this._frag = null, t && "object" == typeof t) {
            this.dom = t;
            var n = [],
                s = [];
            "string" == typeof t.className && (s = t.className.split(" "));
            for (var o = 0; o < s.length; o++) "" !== s[o] && " " !== s[o] && n.push(s[o]);
            this._clss = n
        } else i !== undefined && null !== i || (i = !0), (!t || "string" == typeof t && (t.indexOf("#") >= 0 || t.indexOf(".") >= 0)) && (t && (e = t), t = "div"), this.dom = document.createElement(t), e && (e.indexOf("#") >= 0 ? this.dom.id = e.split("#")[1] : (e.indexOf(".") >= 0 && (e = e.split(".")[1]), this.addClass.call(this, e)));
        !0 === i && (this._frag = document.createDocumentFragment(), this._frag.appendChild(this.dom))
    }
    dt.prototype.createElement = function(t, e) {
        var i = new dt(t, e, !1);
        return this.appendElement.call(this, i), this._nodes.push(i), i
    }, dt.prototype.appendElement = function(t) {
        if (t === undefined) return K({
            name: "DomElement Add Child",
            message: "Child Element is undefined"
        });
        var e;
        e = t._frag !== undefined && null !== t._frag ? t._frag : t.dom !== undefined ? t.dom : t;
        try {
            t instanceof dt && (t._parent = this), this.dom.appendChild(e)
        } catch (jn) {
            K({
                name: "DomElement Add Child",
                message: "Failed to append child."
            })
        }
        return this
    }, dt.prototype.removeElement = function(t) {
        try {
            var e;
            if (t._nodes)
                for (e = t._nodes.length; e--;) t.removeElement(t._nodes[e]);
            for (e = this._nodes.length; --e > -1;) this._nodes[e] === t && this._nodes.splice(e, 1);
            this.dom.removeChild(t.dom || t), t.__destroy && t.__destroy()
        } catch (jn) {
            K({
                name: "DomElement Remove Child",
                message: "Failed to remove child."
            })
        }
    }, dt.prototype.addClass = function(t) {
        return !1 === this.hasClass.call(this, t) && (this._clss.push(t), this.dom.className = this._clss.join(" ")), this
    }, dt.prototype.hasClass = function(t) {
        for (var e = -1 !== this.dom.className.split(" ").indexOf(t), i = this._clss.length; i-- && !e;) e = this._clss[i] === t;
        return e
    }, dt.prototype.removeClass = function(t) {
        for (var e = this._clss.length; --e > -1;) this._clss[e] === t && this._clss.splice(e, 1);
        return this.dom.className = this._clss.join(" "), this
    }, dt.prototype.text = function(t) {
        if (this && this.dom) {
            if (!t) return this.dom.textContent;
            for (var e, i, n, s, o = /&(.*?);/g, r = /<[a-z][\s\S]*>/i; null !== (e = o.exec(t));) {
                !1 === r.test(e[0]) ? (n = e[0], s = void 0, (s = document.createElement("div")).innerHTML = n, i = s.textContent, t = t.replace(new RegExp(e[0], "g"), i)) : t = t.replace(e[0], "")
            }
            return this.dom.textContent = t, this
        }
    }, dt.prototype.content = dt.prototype.text, dt.prototype.css = function(t) {
        var e, i = "ie" === I.Browser.type && 8 === I.Browser.version;
        for (var n in t) {
            e = t[n];
            try {
                "opacity" !== n && "zIndex" !== n && "fontWeight" !== n && isFinite(e) && parseFloat(e) === e && (e += "px");
                var s = ut(n);
                i && "opacity" === n ? this.dom.style.filter = "alpha(opacity=" + 100 * e + ")" : i && W.hasAlpha(e) ? this.dom.style[s] = new W(e).getHex() : this.dom.style[s] = e
            } catch (Pn) {}
        }
        return this
    }, dt.prototype.backgroundImage = function(t, e, i, n) {
        var s = e !== undefined && i !== undefined,
            o = {
                "-ms-high-contrast-adjust": "none"
            };
        if ("object" == typeof e && (n = e), n === undefined && (n = {}), s) {
            var r = t.width / t.height,
                a = e,
                l = a / r;
            n.cover && l < i && (a = (l = i) * r), n.contain && l > i && (a = (l = i) * r), o.width = a, o.height = l, n.center && (o.marginLeft = -a / 2, o.marginTop = -l / 2, o.position = "absolute", o.left = "50%", o.top = "50%"), (n.left || n.right) && (o.left = n.left || 0, o.top = n.top || 0)
        }
        "ie" === I.Browser.type && 8 === I.Browser.version ? o.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + t.src + "',sizingMethod='scale')" : (o.background = "url(" + t.src + ")", o.backgroundPosition = "50% 50%", o.backgroundRepeat = "no-repeat", o.backgroundSize = s ? a + "px " + l + "px" : n.cover ? "cover" : n.contain ? "contain" : "100%"), this.css.call(this, o)
    }, dt.prototype.setAttribute = function(t, e) {
        var i;
        if ("object" == typeof t)
            for (var n in t) i = t[n], this.dom.setAttribute(n, i);
        else this.dom.setAttribute(t, e)
    }, dt.prototype.removeAttribute = function(t, e) {
        var i;
        if ("object" == typeof t)
            for (var n in t) i = t[n], this.dom.removeAttribute(n, i);
        else this.dom.removeAttribute(t, e)
    }, dt.prototype.addEventListener = function(t, e, i) {
        var n = {
            event: at.eventName(t),
            handler: at.eventCallback(t, e, this.dom),
            callback: e
        };
        this._listeners.push(n), this.dom.addEventListener ? this.dom.addEventListener(n.event, n.handler, i) : this.dom.attachEvent("on" + n.event, n.handler)
    }, dt.prototype.removeEventListener = function(t, e, i) {
        for (var n, s = this._listeners.length; --s > -1;)(n = this._listeners[s]).event === t && n.callback === e && (this._listeners.splice(s, 1), this.dom.removeEventListener ? this.dom.removeEventListener(n.event, n.handler, i) : this.dom.detachEvent("on" + n.event, n.handler))
    }, dt.prototype.focus = function() {
        this.dom.focus()
    }, dt.prototype.blur = function() {
        this.dom.blur()
    }, dt.prototype.html = function(t) {
        return t && (this.dom.innerHTML = t), this.dom.innerHTML
    }, dt.prototype.__destroy = function() {
        for (var t, e = this._listeners.length; --e > -1;) t = this._listeners[e], this._listeners.splice(e, 1), this.dom.removeEventListener ? this.dom.removeEventListener(t.event, t.handler) : this.dom.detachEvent("on" + t.event, t.handler);
        return this.dom = null, this._clss = [], this._nodes = [], this._listeners = [], this._frag = null, t = null, null
    };
    var pt = {
        self: function(t, e) {
            var i = {},
                n = Array.prototype.slice.call(arguments, 2);
            for (var s in e.apply(t, n), t) i[s] = t[s]
        },
        proto: function(t, e) {
            t.prototype = Object.create(e.prototype), t.prototype.constructor = t
        }
    };

    function ft(t, e) {
        pt.self(this, dt, e || "div", t), this.children = [], this._events = []
    }
    pt.proto(ft, dt), ft.prototype.initComponent = function(t, e, i) {
        var n = new t(e);
        return n._parent = this, this.children.push(n), n.dom && (i !== undefined ? i.appendElement && i.appendElement(n) : this.appendElement(n)), n
    }, ft.prototype.destroy = function() {
        var t = this;
        try {
            R.depth(this, "children", (function(e) {
                if (t !== e)
                    for (var i = t.children.length; --i > -1;) t.children[i] === e && t.children.splice(i, 1);
                e._destroy && e._destroy(), e = null
            }))
        } catch (jn) {
            throw new Error("Trouble destroying nodes: " + jn)
        }
        return null
    }, ft.prototype._destroy = function() {
        try {
            this.onDestroy && this.onDestroy(), this._parent.removeElement && this._parent.removeElement(this);
            for (var t = this._events.length; --t > -1;) this._events.splice(t, 1);
            this.children = null, this._destroy = null, this._events = null, this.destroy = null, this.emit = null, this.on = null, this.off = null, this.initComponent = null
        } catch (jn) {
            K({
                name: "DomComponent",
                message: "Failed to destroy."
            })
        }
    }, ft.prototype.on = function(t, e) {
        for (var i = this._events.length, n = !1; --i > -1 && !1 === n;) this._events[i].event === t && (n = this._events[i]);
        !1 === n && (n = {
            event: t,
            listeners: []
        }, this._events.push(n)), n.listeners.push(e)
    }, ft.prototype.off = function(t, e) {
        for (var i = this._events.length; --i > -1;)
            if (this._events[i].event === t) {
                for (var n = this._events[i].listeners.length; --n > -1;) this._events[i].listeners[n] === e && this._events[i].listeners.splice(n, 1);
                0 === this._events[i].listeners.length && this._events.splice(i, 1)
            }
    }, ft.prototype.emit = function(t) {
        for (var e = Array.prototype.slice.call(arguments, 1), i = this._events.length; --i > -1 && this._events;)
            if (this._events[i].event === t)
                for (var n = this._events[i].listeners.length; --n > -1;) this._events[i].listeners[n].apply(this, e)
    };
    var mt = "challenge-passed",
        yt = "challenge-escaped",
        gt = "challenge-closed",
        vt = "challenge-expired",
        bt = "challenge-already-closed",
        wt = "bundle-error",
        xt = "network-error",
        kt = "challenge-error";

    function Ct(t) {
        if (null === t) return "";
        var e = [];
        return _t(t, e), e.join("&")
    }

    function _t(t, e) {
        var i, n;
        if ("object" == typeof t)
            for (n in t) !0 === Et(i = t[n]) ? _t(i, e) : e[e.length] = St(n, i);
        else if (!0 === Array.isArray(t))
            for (var s = 0; s < t.length; s++) !0 === Et(i = t[s]) ? _t(t, e) : e[e.length] = St(n, i);
        else e[e.length] = St(t)
    }

    function Et(t) {
        return !0 === Array.isArray(t) || "object" == typeof t
    }

    function St(t, e) {
        return encodeURIComponent(t) + "=" + encodeURIComponent(null === e ? "" : e)
    }
    var Ot = {
            af: "Afrikaans",
            sq: "Albanian",
            am: "Amharic",
            ar: "Arabic",
            hy: "Armenian",
            az: "Azerbaijani",
            eu: "Basque",
            be: "Belarusian",
            bn: "Bengali",
            bg: "Bulgarian",
            bs: "Bosnian",
            my: "Burmese",
            ca: "Catalan",
            ceb: "Cebuano",
            zh: "Chinese",
            "zh-CN": "Chinese Simplified",
            "zh-TW": "Chinese Traditional",
            co: "Corsican",
            hr: "Croatian",
            cs: "Czech",
            da: "Danish",
            nl: "Dutch",
            en: "English",
            eo: "Esperanto",
            et: "Estonian",
            fa: "Persian",
            fi: "Finnish",
            fr: "French",
            fy: "Frisian",
            gd: "Gaelic",
            gl: "Galacian",
            ka: "Georgian",
            de: "German",
            el: "Greek",
            gu: "Gujurati",
            ht: "Haitian",
            ha: "Hausa",
            haw: "Hawaiian",
            he: "Hebrew",
            hi: "Hindi",
            hmn: "Hmong",
            hu: "Hungarian",
            is: "Icelandic",
            ig: "Igbo",
            id: "Indonesian",
            ga: "Irish",
            it: "Italian",
            ja: "Japanese",
            jw: "Javanese",
            kn: "Kannada",
            kk: "Kazakh",
            km: "Khmer",
            rw: "Kinyarwanda",
            ky: "Kirghiz",
            ko: "Korean",
            ku: "Kurdish",
            lo: "Lao",
            la: "Latin",
            lv: "Latvian",
            lt: "Lithuanian",
            lb: "Luxembourgish",
            mk: "Macedonian",
            mg: "Malagasy",
            ms: "Malay",
            ml: "Malayalam",
            mt: "Maltese",
            mi: "Maori",
            mr: "Marathi",
            mn: "Mongolian",
            ne: "Nepali",
            no: "Norwegian",
            ny: "Nyanja",
            or: "Oriya",
            pl: "Polish",
            "pt-BR": "Portuguese (Brazil)",
            pt: "Portuguese (Portugal)",
            ps: "Pashto",
            pa: "Punjabi",
            ro: "Romanian",
            ru: "Russian",
            sm: "Samoan",
            sn: "Shona",
            sd: "Sindhi",
            si: "Singhalese",
            sr: "Serbian",
            sk: "Slovak",
            sl: "Slovenian",
            so: "Somani",
            st: "Southern Sotho",
            es: "Spanish",
            su: "Sundanese",
            sw: "Swahili",
            sv: "Swedish",
            tl: "Tagalog",
            tg: "Tajik",
            ta: "Tamil",
            tt: "Tatar",
            te: "Teluga",
            th: "Thai",
            tr: "Turkish",
            tk: "Turkmen",
            ug: "Uyghur",
            uk: "Ukrainian",
            ur: "Urdu",
            uz: "Uzbek",
            vi: "Vietnamese",
            cy: "Welsh",
            xh: "Xhosa",
            yi: "Yiddish",
            yo: "Yoruba",
            zu: "Zulu"
        },
        Mt = {
            zh: {
                "I am human": "我是人"
            },
            ar: {
                "I am human": "أنا الإنسان"
            },
            af: {
                "I am human": "Ek is menslike"
            },
            am: {
                "I am human": "እኔ ሰው ነኝ"
            },
            hy: {
                "I am human": "Ես մարդ եմ"
            },
            az: {
                "I am human": "Mən insanam"
            },
            eu: {
                "I am human": "Gizakia naiz"
            },
            bn: {
                "I am human": "আমি মানব নই"
            },
            bg: {
                "I am human": "Аз съм човек"
            },
            ca: {
                "I am human": "Sóc humà"
            },
            hr: {
                "I am human": "Ja sam čovjek"
            },
            cs: {
                "I am human": "Jsem člověk"
            },
            da: {
                "I am human": "Jeg er et menneske"
            },
            nl: {
                "I am human": "Ik ben een mens"
            },
            et: {
                "I am human": "Ma olen inimeste"
            },
            fi: {
                "I am human": "Olen ihminen"
            },
            fr: {
                "I am human": "Je suis humain"
            },
            gl: {
                "I am human": "Eu son humano"
            },
            ka: {
                "I am human": "მე ვარ ადამიანი"
            },
            de: {
                "I am human": "Ich bin ein Mensch"
            },
            el: {
                "I am human": "Είμαι άνθρωπος"
            },
            gu: {
                "I am human": "હું માનવ છું"
            },
            iw: {
                "I am human": ". אני אנושי"
            },
            hi: {
                "I am human": "मैं मानव हूं"
            },
            hu: {
                "I am human": "Nem vagyok robot"
            },
            is: {
                "I am human": "Ég er manneskja"
            },
            id: {
                "I am human": "Aku manusia"
            },
            it: {
                "I am human": "Sono un essere umano"
            },
            ja: {
                "I am human": "私は人間です"
            },
            kn: {
                "I am human": "ನಾನು ಮಾನವನು"
            },
            ko: {
                "I am human": "사람입니다"
            },
            lo: {
                "I am human": "ຂ້ອຍເປັນມະນຸດ"
            },
            lv: {
                "I am human": "Es esmu cilvēks"
            },
            lt: {
                "I am human": "Aš esu žmogaus"
            },
            ms: {
                "I am human": "Saya manusia"
            },
            ml: {
                "I am human": "ഞാൻ മനുഷ്യനാണ്"
            },
            mr: {
                "I am human": "मी मानवी आहे"
            },
            mn: {
                "I am human": "Би бол хүн"
            },
            no: {
                "I am human": "Jeg er menneskelig"
            },
            fa: {
                "I am human": "من انسانی هستم"
            },
            pl: {
                "I am human": "Jestem człowiekiem"
            },
            pt: {
                "I am human": "Sou humano"
            },
            ro: {
                "I am human": "Eu sunt om"
            },
            ru: {
                "I am human": "Я человек"
            },
            sr: {
                "I am human": "Ja sam ljudski"
            },
            si: {
                "I am human": "මම මිනිස්සු"
            },
            sk: {
                "I am human": "Ja som človek"
            },
            sl: {
                "I am human": "Jaz sem človeški"
            },
            es: {
                "I am human": "Soy humano"
            },
            sw: {
                "I am human": "Mimi ni binadamu"
            },
            sv: {
                "I am human": "Jag är människa"
            },
            ta: {
                "I am human": "நான் மனித"
            },
            te: {
                "I am human": "నేను మనిషిని"
            },
            th: {
                "I am human": "ผมมนุษย์"
            },
            tr: {
                "I am human": "Ben bir insanım"
            },
            uk: {
                "I am human": "Я людини"
            },
            ur: {
                "I am human": "میں انسان ہوں"
            },
            vi: {
                "I am human": "Tôi là con người"
            },
            zu: {
                "I am human": "Ngingumuntu"
            }
        },
        At = null,
        Tt = {
            translate: function(t, e) {
                var i = Tt.getBestTrans(Mt),
                    n = i && i[t];
                if (n = n || t, e)
                    for (var s = Object.keys(e), o = s.length; o--;) n = n.replace(new RegExp("{{" + s[o] + "}}", "g"), e[s[o]]);
                return n
            },
            getBestTrans: function(t) {
                var e = Tt.getLocale();
                return e in t ? t[e] : Tt.getShortLocale(e) in t ? t[Tt.getShortLocale(e)] : "en" in t ? t.en : null
            },
            getLocale: function() {
                var t = At || window.navigator.userLanguage || window.navigator.language,
                    e = Tt.getShortLocale(t);
                return "in" === e && (t = "id"), "iw" === e && (t = "he"), "nb" === e && (t = "no"), "ji" === e && (t = "yi"), "zh-CN" === t && (t = "zh"), "jv" === e && (t = "jw"), Ot[t] ? t : Ot[e] ? e : "en"
            },
            setLocale: function(t) {
                At = t
            },
            getShortLocale: function(t) {
                return t.indexOf("-") >= 0 ? t.substring(0, t.indexOf("-")) : t
            },
            isShortLocale: function(t) {
                return 2 === t.length || 3 === t.length
            },
            addTable: function(t, e) {
                if (e || (e = Object.create(null)), Mt[t]) {
                    var i = Mt[t];
                    for (var n in e) i[n] = e[n]
                } else Mt[t] = e;
                return Mt[t]
            },
            getTable: function(t) {
                return Mt[t]
            },
            addTables: function(t) {
                for (var e in t) Tt.addTable(e, t[e]);
                return Mt
            },
            getTables: function() {
                return Mt
            }
        },
        Lt = {
            400: "Rate limited or network error. Please retry.",
            429: "Your computer or network has sent too many requests.",
            500: "Cannot contact hCaptcha. Check your connection and try again."
        },
        Bt = function(t) {
            try {
                return Tt.translate(Lt[t])
            } catch (jn) {
                return !1
            }
        },
        Pt = "undefined" != typeof XDomainRequest && !("withCredentials" in XMLHttpRequest.prototype);

    function jt(t, e, i) {
        i = i || {};
        var n = {
            url: e,
            method: t.toUpperCase(),
            responseType: i.responseType || "string",
            dataType: i.dataType || null,
            withCredentials: i.withCredentials || !1,
            headers: i.headers || null,
            data: i.data || null,
            timeout: i.timeout || null
        };
        return n.legacy = n.withCredentials && Pt, n.data && ("json" === n.dataType && "object" == typeof n.data && (n.data = JSON.stringify(n.data)), "query" === n.dataType && (n.data = Ct(n.data))), i.retry ? rt((function() {
            return $t(n)
        }), i.retry) : $t(n)
    }

    function $t(t) {
        var e = t.legacy ? new XDomainRequest : new XMLHttpRequest,
            i = "function" == typeof t.url ? t.url() : t.url;
        return new Promise((function(n, s) {
            var o, r = function(o) {
                return function() {
                    var r = e.response || e.responseText,
                        a = e.statusText || "",
                        l = e.status,
                        h = e.readyState;
                    if (4 === h || t.legacy) {
                        if ("json" === t.responseType && r) try {
                            r = JSON.parse(r)
                        } catch (c) {}
                        if ("error" === o || l >= 400 && l <= 511) return void s({
                            event: xt,
                            endpoint: i,
                            response: r,
                            state: h,
                            status: l,
                            message: Bt(l || 400) || a
                        });
                        n({
                            state: h,
                            status: l,
                            body: r,
                            message: a
                        })
                    }
                }
            };
            if ((e.onload = r("complete"), e.onerror = e.ontimeout = r("error"), e.open(t.method, i), t.timeout && (e.timeout = t.timeout), !t.legacy) && (e.withCredentials = t.withCredentials, t.headers))
                for (var a in t.headers) o = t.headers[a], e.setRequestHeader(a, o);
            setTimeout((function() {
                e.send(t.data)
            }), 0)
        }))
    }
    var It = function(t, e) {
            if ("object" == typeof t && e === undefined && (t = (e = t).url), null === t) throw new Error("Url missing");
            return jt("GET", t, e)
        },
        Ft = function(t, e) {
            if ("object" == typeof t && e === undefined && (t = (e = t).url), null === t) throw new Error("Url missing");
            return jt("POST", t, e)
        },
        Ht = function(t) {
            return t.toLowerCase().match(/\.(?:jpg|gif|png|jpeg|svg)$/g) ? "image" : t.toLowerCase().match(/\.(?:js)$/g) ? "script" : "file"
        },
        Dt = function(t) {
            if (H.assethost && t.indexOf(F.assetDomain) >= 0) return H.assethost + t.replace(F.assetDomain, "");
            if (H.imghost && t.indexOf("imgs") >= 0) {
                var e = t.indexOf(".ai") >= 0 ? t.indexOf(".ai") + 3 : t.indexOf(".com") + 4;
                return H.imghost + t.substr(e, t.length)
            }
            return t
        },
        Rt = ["svg", "gif", "png"];

    function Vt(t, e) {
        e = e || {};
        var i, n = t;
        if (0 === n.indexOf("data:image"))
            for (var s = !1, o = Rt.length, r = -1; r++ < o && !s;)(s = n.indexOf(Rt[r]) >= 0) && (i = Rt[r]);
        else i = n.substr(n.lastIndexOf(".") + 1, n.length);
        !!(!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect) && e.fallback && (e.fallback.indexOf(".") >= 0 ? i = (n = e.fallback).substr(n.lastIndexOf(".") + 1, n.length) : (n = t.substr(0, t.indexOf(i)) + e.fallback, i = e.fallback)), e.prefix && (n = e.prefix + "/" + n), this.attribs = {
            crossOrigin: e.crossOrigin || null
        }, this.id = n, this.src = Dt(n), this.ext = i, this.width = 0, this.height = 0, this.aspect = 0, this.loaded = !1, this.error = !1, this.element = null, this.cb = {
            load: [],
            error: []
        }
    }

    function zt(t, e, i) {
        for (var n = t[e], s = n.length, o = null; --s > -1;) o = n[s], n.splice(s, 1), o(i);
        "error" === e ? t.load = [] : t.error = []
    }

    function Nt(t, e) {
        var i = t;
        e || (e = {}), e.prefix && (i = e.prefix + "/" + t), this.attribs = {
            defer: e.defer || null,
            async: e.async || null,
            crossOrigin: e.crossOrigin || null
        }, this.id = i, this.src = Dt(i), this.loaded = !1, this.error = !1, this.element = null, this.cb = {
            load: [],
            error: []
        }
    }

    function Wt(t, e, i) {
        for (var n = t[e], s = n.length, o = null; --s > -1;) o = n[s], n.splice(s, 1), o(i);
        "error" === e ? t.load = [] : t.error = []
    }

    function Ut(t, e) {
        var i = t;
        e || (e = {}), e.prefix && (i = e.prefix + "/" + t), this.id = i, this.src = Dt(i), this.loaded = !1, this.error = !1, this.cb = {
            load: [],
            error: []
        }, this.data = null
    }

    function qt(t, e, i) {
        for (var n = t[e], s = n.length, o = null; --s > -1;) o = n[s], n.splice(s, 1), o(i);
        "error" === e ? t.load = [] : t.error = []
    }
    Vt.prototype.load = function() {
        return ("svg" === this.ext ? this._loadSvg() : this._loadImg())["catch"]((function(t) {
            throw X("Asset failed", "error", "assets", {
                error: t
            }), t
        }))
    }, Vt.prototype._loadSvg = function() {
        var t, e = this,
            i = this.src,
            n = this.id;
        if (0 === i.indexOf("data:image/svg+xml")) {
            var s = i.slice("data:image/svg+xml,".length);
            t = Promise.resolve(decodeURIComponent(s))
        } else t = It(i).then((function(t) {
            return t.body
        }));
        return t.then((function(t) {
            var i = (new DOMParser).parseFromString(t, "image/svg+xml").documentElement,
                n = parseInt(i.getAttribute("width")),
                s = parseInt(i.getAttribute("height"));
            return e._imgLoaded(i, n, s), e
        }))["catch"]((function(t) {
            e.error = !0;
            var i = (t && t.message ? t.message : t || "Loading Error") + ": " + n;
            throw zt(e.cb, "error", i), i
        }))
    }, Vt.prototype._loadImg = function() {
        var t = this,
            e = this.attribs,
            i = this.src,
            n = this.id;
        return new Promise((function(s, o) {
            var r = new Image;
            e.crossOrigin && (r.crossOrigin = e.crossOrigin), r.onerror = function() {
                t.error = !0, r.onload = r.onerror = null;
                var e = "Loading Error: " + n;
                zt(t.cb, "error", e), o(e)
            }, r.onload = function() {
                t.loaded || (t._imgLoaded(r, r.width, r.height), r.onload = r.onerror = null, s(t))
            }, r.src = i, r.complete && r.onload()
        }))
    }, Vt.prototype._imgLoaded = function(t, e, i) {
        this.element = new dt(t), this.width = e, this.height = i, this.aspect = e / i, this.loaded = !0, zt(this.cb, "load", this)
    }, Vt.prototype.onload = function(t) {
        this.error || (this.loaded ? t(this) : this.cb.load.push(t))
    }, Vt.prototype.onerror = function(t) {
        this.loaded && !this.error || (this.error ? t(this) : this.cb.error.push(t))
    }, Nt.prototype.load = function() {
        var t = this,
            e = this.attribs,
            i = this.src,
            n = this.id;
        return new Promise((function(s, o) {
            var r = document.createElement("script");
            t.element = r, r.onerror = function() {
                t.error = !0, r.onload = r.onreadystatechange = r.onerror = null;
                var e = "Loading Error: " + n;
                Wt(t.cb, "error", e), o(e)
            }, r.onload = r.onreadystatechange = function() {
                this.loaded || r.readyState && "loaded" !== r.readyState && "complete" !== r.readyState || (t.loaded = !0, r.onload = r.onreadystatechange = r.onerror = null, document.body.removeChild(r), Wt(t.cb, "load", t), s(t))
            }, r.type = "text/javascript", r.src = i, e.crossOrigin && (r.crossorigin = e.crossOrigin), e.async && (r.async = !0), e.defer && (r.defer = !0), document.body.appendChild(r), r.complete && r.onload()
        }))
    }, Nt.prototype.onload = function(t) {
        this.error || (this.loaded ? t(this) : this.cb.load.push(t))
    }, Nt.prototype.onerror = function(t) {
        this.loaded && !this.error || (this.error ? t(this) : this.cb.error.push(t))
    }, Ut.prototype.load = function() {
        var t = this,
            e = this.src,
            i = this.id;
        return new Promise((function(n, s) {
            var o = {};
            e.indexOf("json") >= 0 && (o.responseType = "json"), It(e, o).then((function(e) {
                t.loaded = !0, t.data = e.body, qt(t.cb, "load", t), n(t)
            }))["catch"]((function(e) {
                t.error = !0;
                var n = (e && e.message ? e.message : "Loading Error") + ": " + i;
                qt(t.cb, "error", n), s(n)
            }))
        }))
    }, Ut.prototype.onload = function(t) {
        this.error || (this.loaded ? t(this) : this.cb.load.push(t))
    }, Ut.prototype.onerror = function(t) {
        this.loaded && !this.error || (this.error ? t(this) : this.cb.error.push(t))
    };
    var Zt = [],
        Jt = {
            add: function(t, e) {
                var i = Ht(t);
                return Jt[i] ? Jt[i](t, e) : Promise.resolve(null)
            },
            batch: function(t, e) {
                for (var i = [], n = -1; ++n < t.length;) {
                    var s = t[n];
                    i.push(Jt.add(s, e))
                }
                return Promise.all(i)["finally"]((function() {
                    i = []
                }))
            },
            image: function(t, e) {
                var i = new Vt(t, e);
                return Zt.push(i), i.load()
            },
            script: function(t, e) {
                var i = new Nt(t, e);
                return Zt.push(i), i.load()
            },
            file: function(t, e) {
                var i = new Ut(t, e);
                return Zt.push(i), i.load()
            },
            retrieve: function(t) {
                return new Promise((function(e, i) {
                    for (var n = Zt.length, s = !1, o = null; --n > -1 && !s;) s = (o = Zt[n]).id === t || -1 !== o.id.indexOf("/" === t[0] ? "" : "/" + t);
                    if (!s) return e(null);
                    o.onload(e), o.onerror(i)
                }))
            }
        },
        Kt = [],
        Xt = !1,
        Yt = !1;

    function Gt() {
        document.addEventListener ? (document.addEventListener("DOMContentLoaded", te), window.addEventListener("load", te)) : (document.attachEvent("onreadystatechange", Qt), window.attachEvent("onload", te)), Xt = !0
    }

    function Qt() {
        "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState || te()
    }

    function te() {
        if (!1 === Yt) {
            for (var t = 0; t < Kt.length; t++) Kt[t].fn.apply(null, Kt[t].args);
            Kt = []
        }
        Yt = !0, document.removeEventListener ? (document.removeEventListener("DOMContentLoaded", te), window.removeEventListener("load", te)) : (document.detachEvent("onreadystatechange", Qt), window.detachEvent("onload", te))
    }
    var ee = new dt(document),
        ie = {
            __proto__: null,
            Window: new dt(window),
            Document: ee,
            Element: dt,
            Ready: function(t) {
                var e = Array.prototype.slice.call(arguments, 1);
                !0 !== Yt && "interactive" !== document.readyState && "loaded" !== document.readyState && "complete" !== document.readyState ? (Kt.push({
                    fn: t,
                    args: e
                }), !1 === Xt && Gt()) : setTimeout((function() {
                    t(e)
                }), 1)
            },
            Find: function(t) {
                for (var e, i, n = null, s = !1, o = t.split(" "), r = 0; r < o.length; r++)
                    if ((e = o[r]).indexOf("#") >= 0 && (n = document.getElementById(e.replace("#", ""))), e.indexOf(".") >= 0)
                        if (null === n && (n = document), s) {
                            for (var a = [], l = 0; l < n.length; l++) {
                                i = n[l].getElementsByClassName(e.replace(".", ""));
                                for (var h = 0; h < i.length; h++) a.push(i[h])
                            }
                            n = a, a = []
                        } else n = n.getElementsByClassName(e.replace(".", "")), s = !0;
                if (!0 === s) {
                    if (1 === n.length) return n[0];
                    for (var c = [], u = 0; u < n.length; u++) c.push(n[u]);
                    return c
                }
                return n
            }
        };

    function ne(t) {
        t = t || {}, this.x = t.x || 0, this.y = t.y || 0, this.rotate = this.rotate.bind(this), this.getDistance = this.getDistance.bind(this), this.radius = 0, this.tolerance = 0, this.fill = !1, this.stroke = !1, this.fillColor = "#fff", this.strokeColor = "#fff", this.strokeWidth = 1
    }

    function se(t, e, i) {
        pt.self(this, ne, t), this.handleIn = new ne(e), this.handleOut = new ne(i), this.prev = null, this.next = null, this.index = 0
    }

    function oe(t) {
        this._closed = !1, this.stroke = !1, this.fill = !1, this.fillColor = "#fff", this.strokeColor = "#fff", this.strokeWidth = 1, this.showPoints = !1, this.pointRadius = 0, this._head = null, this._tail = null, this.segments = [], this.addPoint = this.addPoint.bind(this), this.removePoint = this.removePoint.bind(this), this.forEachPoint = this.forEachPoint.bind(this), this.getBounding = this.getBounding.bind(this), this.getCenter = this.getCenter.bind(this), this.destroy = this.destroy.bind(this), t && t.length && this.addPoints(t)
    }

    function re(t, e) {
        if (e.y <= t.y) {
            if (e.next.y > t.y && ae(e, e.next, t) > 0) return 1
        } else if (e.next.y <= t.y && ae(e, e.next, t) < 0) return -1;
        return 0
    }

    function ae(t, e, i) {
        return (e.x - t.x) * (i.y - t.y) - (i.x - t.x) * (e.y - t.y)
    }

    function le() {
        pt.self(this, dt, "canvas");
        var t = this;
        this.element = this.dom, this.ctx = this.element.getContext("2d"), this.scale = 1, this.dpr = window.devicePixelRatio || 1, this.clearColor = "#fff", this.ctx.roundedRect = function(e, i, n, s, o) {
            var r = n > 0 ? o : -o,
                a = s > 0 ? o : -o;
            t.ctx.beginPath(), t.ctx.moveTo(e + r, i), t.ctx.lineTo(e + n - r, i), t.ctx.quadraticCurveTo(e + n, i, e + n, i + a), t.ctx.lineTo(e + n, i + s - a), t.ctx.quadraticCurveTo(e + n, i + s, e + n - r, i + s), t.ctx.lineTo(e + r, i + s), t.ctx.quadraticCurveTo(e, i + s, e, i + s - a), t.ctx.lineTo(e, i + a), t.ctx.quadraticCurveTo(e, i, e + r, i), t.ctx.closePath()
        }
    }

    function he(t, e) {
        this._period = t, this._interval = e, this._date = [], this._data = [], this._prevTimestamp = 0, this._meanPeriod = 0, this._meanCounter = 0
    }
    ne.prototype.rotate = function(t, e) {
        var i = nt(e),
            n = Math.sin(i),
            s = Math.cos(i),
            o = this.x - t.x,
            r = this.y - t.y;
        this.x = o * s - r * n + t.x, this.y = o * n + r * s + t.y
    }, ne.prototype.getDistance = function(t) {
        return Math.sqrt(Math.pow(this.x - t.x, 2) + Math.pow(this.y - t.y, 2))
    }, ne.prototype.getAngle = function(t) {
        var e = t.x - this.x,
            i = t.y - this.y,
            n = st(Math.atan2(i, e));
        return n < 0 && (n += 360), n
    }, ne.prototype.hitTest = function(t) {
        return this.radius + this.tolerance >= this.getDistance(t)
    }, ne.prototype.restrict = function(t, e, i, n) {
        if ("x" !== t && "y" !== t) throw new Error("Point.restrict requires a value: x or y");
        return e + this[t] < i ? e = this[t] - i : e + this[t] > n && (e = n - this[t]), this[t] + e
    }, ne.prototype.draw = function(t) {
        t.ctx.beginPath(), t.ctx.arc(this.x, this.y, this.radius / t.scale, 0, 2 * Math.PI, !1), this.fill && (t.ctx.fillStyle = this.fillColor, t.ctx.fill()), this.stroke && (t.ctx.strokeStyle = this.strokeColor, t.ctx.lineWidth = this.strokeWidth / t.scale, t.ctx.stroke())
    }, pt.proto(se, ne), se.prototype.set = function(t, e, i) {
        this.x = t.x || this.x, this.y = t.y || this.y, e === undefined ? (this.handleIn.x = this.x, this.handleIn.y = this.y) : (this.handleIn.x = e.x, this.handleIn.y = e.y), i === undefined ? (this.handleOut.x = this.x, this.handleOut.y = this.y) : (this.handleOut.x = i.x, this.handleOut.y = i.y)
    }, se.prototype.clone = function() {
        var t = {
                x: this.x,
                y: this.y
            },
            e = {
                x: this.handleIn.x,
                y: this.handleIn.y
            },
            i = {
                x: this.handleOut.x,
                y: this.handleOut.y
            },
            n = new se;
        return e.x === i.x && e.y === i.y ? n.set(t) : n.set(t, e, i), n.index = this.index, n.prev = this.prev, n.next = this.next, n.radius = this.radius, n.tolerance = this.tolerance, n.fill = this.fill, n.stroke = this.stroke, n.fillColor = this.fillColor, n.strokeColor = this.strokeColor, n.strokeWidth = this.strokeWidth, n
    }, se.prototype.move = function(t, e) {
        this.x += t, this.y += e, this.handleIn.x += t, this.handleIn.y += e, this.handleOut.x += t, this.handleOut.y += e
    }, se.prototype.render = function(t) {
        this.handleIn.x !== this.x && this.handleIn.y !== this.y && this.handleIn.draw(t), this.handleOut.x !== this.x && this.handleOut.y !== this.y && this.handleOut.draw(t), this.draw(t)
    }, oe.prototype.addPoint = function(t) {
        var e;
        return t instanceof se ? e = t.clone() : ((e = new se).set(t), e.radius = this.pointRadius), e.index = this.segments.length, null === this._head ? (this._head = e, this._tail = e) : (e.prev = this._tail, this._tail.next = e, this._tail = e), this._head.prev = this._tail, this._tail.next = this._head, this.segments.push(e), e
    }, oe.prototype.addPoints = function(t) {
        for (var e = 0; e < t.length; e++) this.addPoint(t[e]);
        t = null
    }, oe.prototype.setPoints = function(t, e) {
        e === undefined && (e = 0);
        for (var i = e; i < t.length; i++) this.segments[i] === undefined ? this.addPoint(t[i]) : this.segments[i].set(t[i]);
        t = null, e = null
    }, oe.prototype.setPointRadius = function(t) {
        for (var e = -1; ++e < this.segments.length;) undefined.radius = t
    }, oe.prototype.removePoint = function(t) {
        for (var e = this.segments.length, i = null; --e > -1 && null === i;) i = this.segments[e], t.x === i.x && t.y === i.y && (this.segments.splice(e, 1), i === this._head && i === this._tail ? (this._head = null, this._tail = null) : i === this.head ? (this._head = this._head.next, this._head.prev = null) : i === this._tail ? (this._tail = this._tail.prev, this._tail.next = null) : (i.prev.next = i.next, i.next.prev = i.prev));
        return i
    }, oe.prototype.forEachPoint = function(t, e) {
        if (0 !== this.segments.length && this.segments)
            for (var i, n = !1, s = this.segments.length; --s > -1 && !n;) i = this.segments[e ? this.segments.length - 1 - s : s], t && (n = t(i))
    }, oe.prototype.close = function(t) {
        this._closed = t
    }, oe.prototype.isClosed = function() {
        return this._closed
    }, oe.prototype.start = function() {
        return this._head
    }, oe.prototype.end = function() {
        return this._tail
    }, oe.prototype.rotate = function(t, e) {
        e === undefined && (e = this.getCenter());
        for (var i, n = -1; ++n < this.segments.length;)(i = this.segments[n]).handleIn.rotate(e, t), i.rotate(e, t), i.handleOut.rotate(e, t)
    }, oe.prototype.move = function(t, e) {
        for (var i = -1; ++i < this.segments.length;) this.segments[i].move(t, e)
    }, oe.prototype.getPoint = function(t) {
        return this.segments[t]
    }, oe.prototype.getLength = function() {
        return this.segments.length
    }, oe.prototype.getCenter = function() {
        var t = this.getBounding();
        return {
            x: (t.right - t.left) / 2 + t.left,
            y: (t.bottom - t.top) / 2 + t.top
        }
    }, oe.prototype.getDimensions = function() {
        var t = this.getBounding();
        return {
            width: t.right - t.left,
            height: t.bottom - t.top
        }
    }, oe.prototype.getBounding = function() {
        for (var t, e = null, i = null, n = null, s = null, o = -1; ++o < this.segments.length;) t = this.segments[o], (null === e || t.x < e) && (e = t.x), (null === i || t.x > i) && (i = t.x), (null === n || t.y < n) && (n = t.y), (null === s || t.y > s) && (s = t.y);
        return {
            left: e,
            top: n,
            bottom: s,
            right: i
        }
    }, oe.prototype.draw = function(t) {
        t.ctx.beginPath();
        for (var e = -1, i = this.segments.length; ++e < i;) {
            var n = this.segments[e],
                s = n.x !== n.handleIn.x || n.y !== n.handleIn.y || n.prev.x !== n.prev.handleOut.x || n.prev.y !== n.prev.handleOut.y;
            if (0 === n.index) t.ctx.moveTo(n.x, n.y);
            else if (s) {
                t.ctx.bezierCurveTo(n.prev.handleOut.x, n.prev.handleOut.y, n.handleIn.x, n.handleIn.y, n.x, n.y), (n.next.x !== n.next.handleIn.x || n.next.y !== n.next.handleIn.y) && this._closed && this._tail === n && t.ctx.bezierCurveTo(n.handleOut.x, n.handleOut.y, n.next.handleIn.x, n.next.handleIn.y, n.next.x, n.next.y)
            } else t.ctx.lineTo(n.x, n.y)
        }
        this._closed && t.ctx.closePath(), this.fill && (t.ctx.fillStyle = this.fillColor, t.ctx.fill()), this.stroke && (t.ctx.strokeStyle = this.strokeColor, t.ctx.lineWidth = this.strokeWidth / t.scale, t.ctx.stroke()), !0 === this.showPoints && this.forEachPoint((function(e) {
            e.fill = !0, e.render(t)
        }))
    }, oe.prototype.hitTest = function(t, e) {
        e === undefined && (e = {});
        var i, n = !1,
            s = 0,
            o = !1;
        e.segment = e.segment === undefined || e.segment, e.path = e.path === undefined || e.path;
        for (var r = -1; ++r < this.segments.length;) i = this.segments[r], e.path && this._closed && (s += re(t, i)), e.segment && i.hitTest(t) && (o = i);
        return e.path && 0 !== s && !1 === o ? n = {
            type: "path",
            geometry: this
        } : o && (n = {
            type: "segment",
            geometry: o
        }), n
    }, oe.prototype.destroy = function() {
        for (var t = this.segments.length; --t > -1;) this.segments.splice(t, 1);
        return this._head = null, this._tail = null, this.segments = [], null
    }, pt.proto(le, dt), le.prototype.dimensions = function(t, e) {
        this.css({
            width: t,
            height: e
        }), this.element.width = Math.round(t / this.scale) * this.dpr, this.element.height = Math.round(e / this.scale) * this.dpr, this.ctx.scale(this.dpr, this.dpr), this.width = Math.round(t / this.scale), this.height = Math.round(e / this.scale)
    }, le.prototype.clear = function() {
        this.ctx && this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    }, le.prototype.draw = function() {
        this.ctx && (this.ctx.fillStyle = this.clearColor, this.ctx.fillRect(0, 0, this.element.width, this.element.height))
    }, le.prototype._destroy = function() {
        this.__destroy(), this.element = null, this.ctx = null, this.width = null, this.height = null
    }, he.prototype.getMeanPeriod = function() {
        return this._meanPeriod
    }, he.prototype.getData = function() {
        return this._cleanStaleData(), this._data
    }, he.prototype.getSize = function() {
        return this._cleanStaleData(), this._data.length
    }, he.prototype.getCapacity = function() {
        return 0 === this._period ? this._interval : Math.ceil(this._interval / this._period)
    }, he.prototype.push = function(t, e) {
        this._cleanStaleData();
        var i = 0 === this._date.length;
        if (t - (this._date[this._date.length - 1] || 0) >= this._period && (this._date.push(t), this._data.push(e)), !i) {
            var n = t - this._prevTimestamp;
            this._meanPeriod = (this._meanPeriod * this._meanCounter + n) / (this._meanCounter + 1), this._meanCounter++
        }
        this._prevTimestamp = t
    }, he.prototype._cleanStaleData = function() {
        for (var t = Date.now(), e = this._date.length - 1; e >= 0; e--) {
            if (t - this._date[e] >= this._interval) {
                this._date.splice(0, e + 1), this._data.splice(0, e + 1);
                break
            }
        }
    };
    var ce = {
            touchstart: "ts",
            touchend: "te",
            touchmove: "tm",
            touchcancel: "tc"
        },
        ue = {
            mousedown: "md",
            mouseup: "mu",
            mousemove: "mm"
        },
        de = {
            keydown: "kd",
            keyup: "ku"
        },
        pe = {
            devicemotion: "dm"
        },
        fe = function(t, e) {
            var i = ue[t],
                n = null;
            return function(t) {
                n = function(t) {
                    return [t.windowX, t.windowY, Date.now()]
                }(t), e(i, n)
            }
        },
        me = function(t, e) {
            var i = ce[t],
                n = null;
            return function(t) {
                n = function(t) {
                    var e = [];
                    try {
                        var i, n;
                        if (t.touches && t.touches.length >= 1 ? i = t.touches : t.changedTouches && t.changedTouches.length >= 1 && (i = t.changedTouches), i) {
                            for (var s = 0; s < i.length; s++)(n = at.eventCoords(i[s])) && e.push([i[s].identifier, n.x, n.y]);
                            e.push(Date.now())
                        }
                        return e
                    } catch (jn) {
                        return e
                    }
                }(t), e(i, n)
            }
        },
        ye = function(t, e) {
            var i = de[t],
                n = null;
            return function(t) {
                n = function(t) {
                    return [t.keyNum, Date.now()]
                }(t), e(i, n)
            }
        },
        ge = function(t, e) {
            var i = pe[t],
                n = null,
                s = [];
            return function(t) {
                n = function(t, e) {
                    (t.acceleration === undefined || t.acceleration && t.acceleration.x === undefined) && (t.acceleration = {
                        x: 0,
                        y: 0,
                        z: 0
                    });
                    (t.rotationRate === undefined || t.rotationRate && t.rotationRate.alpha === undefined) && (t.rotationRate = {
                        alpha: 0,
                        beta: 0,
                        gamma: 0
                    });
                    var i = [t.acceleration.x, t.acceleration.y, t.acceleration.z, t.rotationRate.alpha, t.rotationRate.beta, t.rotationRate.gamma, Date.now()],
                        n = [];
                    if (0 === e.length) e = i, n = i;
                    else {
                        for (var s, o = 0, r = 0; r < 6; r++) s = e[r] - i[r], n.push(i[r]), o += Math.abs(s);
                        if (n.push(Date.now()), e = i, o <= 0) return null
                    }
                    return {
                        motion: n,
                        prevmotion: e
                    }
                }(t, s), null !== n && (s = n.prevmotion, n = n.motion, e(i, n))
            }
        };

    function ve() {
        this._manifest = {}, this.state = {
            timeBuffers: {},
            loadTime: Date.now(),
            recording: !1,
            initRecord: !1,
            record: {
                mouse: !0,
                touch: !0,
                keys: !1,
                motion: !0
            }
        }, this._recordEvent = this._recordEvent.bind(this)
    }
    ve.prototype.record = function(t, e, i, n) {
        if (this._manifest.st = Date.now(), this.state.record.mouse = t === undefined ? this.state.record.mouse : t, this.state.record.touch = i === undefined ? this.state.record.touch : i, this.state.record.keys = e === undefined ? this.state.record.keys : e, this.state.record.motion = n === undefined ? this.state.record.motion : n, !1 === this.state.initRecord) {
            var s = new dt(document.body);
            this.state.record.mouse && (s.addEventListener("mousedown", fe("mousedown", this._recordEvent), !0), s.addEventListener("mousemove", fe("mousemove", this._recordEvent), !0), s.addEventListener("mouseup", fe("mouseup", this._recordEvent), !0)), !0 === this.state.record.keys && (s.addEventListener("keyup", ye("keyup", this._recordEvent), !0), s.addEventListener("keydown", ye("keydown", this._recordEvent), !0)), this.state.record.touch && !0 === I.Browser.hasEvent("touchstart", document.body) && (s.addEventListener("touchstart", me("touchstart", this._recordEvent), !0), s.addEventListener("touchmove", me("touchmove", this._recordEvent), !0), s.addEventListener("touchend", me("touchend", this._recordEvent), !0)), this.state.record.motion && !0 === I.Browser.hasEvent("devicemotion", window) && s.addEventListener("devicemotion", ge("devicemotion", this._recordEvent), !0), this.state.initRecord = !0
        }
        this.state.recording = !0
    }, ve.prototype.stop = function() {
        this.state.recording = !1
    }, ve.prototype.time = function() {
        return this.state.loadTime
    }, ve.prototype.getData = function() {
        for (var t in this.state.timeBuffers) this._manifest[t] = this.state.timeBuffers[t].getData(), this._manifest[t + "-mp"] = this.state.timeBuffers[t].getMeanPeriod();
        return this._manifest
    }, ve.prototype.setData = function(t, e) {
        this._manifest[t] = e
    }, ve.prototype.resetData = function() {
        this._manifest = {}, this.state.timeBuffers = {}
    }, ve.prototype.circBuffPush = function(t, e) {
        this._recordEvent(t, e)
    }, ve.prototype._recordEvent = function(t, e) {
        if (!1 !== this.state.recording) try {
            var i = e[e.length - 1];
            this.state.timeBuffers[t] || (this.state.timeBuffers[t] = new he(16, 15e3)), this.state.timeBuffers[t].push(i, e)
        } catch (Pn) {
            Y("motion", Pn)
        }
    };
    var be = new ve;

    function we(t, e) {
        var i = t instanceof HTMLIFrameElement;
        try {
            i ? t.parentNode && t.contentWindow.postMessage(JSON.stringify(e), "*") : t.postMessage(JSON.stringify(e), "*")
        } catch (Pn) {
            Y("messaging", Pn)
        }
    }

    function xe(t, e) {
        this.target = t, this.id = e, this.messages = [], this.incoming = [], this.waiting = []
    }

    function ke(t, e) {
        var i = this,
            n = {},
            s = new Promise((function(t, e) {
                n.resolve = t, n.reject = e
            })),
            o = {
                source: "hcaptcha",
                label: t,
                id: i.id,
                promise: null,
                lookup: e
            };
        return s.then((function(t) {
            o.promise = "resolve", null !== t && (o.contents = t), we(i.target, o)
        }))["catch"]((function(t) {
            o.promise = "reject", null !== t && (o.error = t), we(i.target, o)
        })), n
    }
    xe.prototype.setID = function(t) {
        this.id = t
    }, xe.prototype.contact = function(t, e) {
        if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
        var i = this,
            n = Date.now().toString(36),
            s = {
                source: "hcaptcha",
                label: t,
                id: this.id,
                promise: "create",
                lookup: n
            };
        if (e) {
            if ("object" != typeof e) throw new Error("Message must be an object.");
            s.contents = e
        }
        return new Promise((function(e, o) {
            i.waiting.push({
                label: t,
                reject: o,
                resolve: e,
                lookup: n
            }), we(i.target, s)
        }))
    }, xe.prototype.listen = function(t, e) {
        if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
        for (var i = this.messages.length, n = !1; --i > -1 && !1 === n;) this.messages[i].label === t && (n = this.messages[i]);
        !1 === n && (n = {
            label: t,
            listeners: []
        }, this.messages.push(n)), n.listeners.push(e)
    }, xe.prototype.answer = function(t, e) {
        if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
        for (var i = this.incoming.length, n = !1; --i > -1 && !1 === n;) this.incoming[i].label === t && (n = this.incoming[i]);
        !1 === n && (n = {
            label: t,
            listeners: []
        }, this.incoming.push(n)), n.listeners.push(e)
    }, xe.prototype.send = function(t, e) {
        if (!this.id) throw new Error("Chat requires unique id to communicate between windows");
        var i = {
            source: "hcaptcha",
            label: t,
            id: this.id
        };
        if (e) {
            if ("object" != typeof e) throw new Error("Message must be an object.");
            i.contents = e
        }
        we(this.target, i)
    }, xe.prototype.check = function(t, e) {
        for (var i = [].concat.apply([], [this.messages, this.incoming, this.waiting]), n = [], s = -1; ++s < i.length;)
            if (i[s].label === t) {
                if (e && i[s].lookup && e !== i[s].lookup) continue;
                n.push(i[s])
            } return n
    }, xe.prototype.respond = function(t) {
        for (var e, i, n = -1, s = 0, o = [].concat.apply([], [this.messages, this.incoming, this.waiting]); ++n < o.length;)
            if (o[n].label === t.label) {
                if (t.lookup && o[n].lookup && t.lookup !== o[n].lookup) continue;
                var r = [];
                if (e = o[n], t.error && r.push(t.error), t.contents && r.push(t.contents), t.promise && "create" !== t.promise) {
                    e[t.promise].apply(e[t.promise], r);
                    for (var a = this.waiting.length, l = !1; --a > -1 && !1 === l;) this.waiting[a].label === e.label && this.waiting[a].lookup === e.lookup && (l = !0, this.waiting.splice(a, 1));
                    continue
                }
                for (s = 0; s < e.listeners.length; s++) {
                    if (i = e.listeners[s], "create" === t.promise) {
                        var h = ke.call(this, e.label, t.lookup);
                        r.push(h)
                    }
                    i.apply(i, r)
                }
            } o = null
    }, xe.prototype.destroy = function() {
        return this.messages = null, this.incoming = null, this.waiting = null, null
    };
    var Ce = {
        chats: [],
        isSupported: function() {
            return !!window.postMessage
        },
        createChat: function(t, e) {
            var i = new xe(t, e);
            return Ce.chats.push(i), i
        },
        addChat: function(t) {
            Ce.chats.push(t)
        },
        removeChat: function(t) {
            for (var e = !1, i = Ce.chats.length; --i > -1 && !1 === e;) t.id === Ce.chats[i].id && t.target === Ce.chats[i].target && (e = Ce.chats[i], Ce.chats.splice(i, 1));
            return e
        },
        handle: function(t) {
            var e = t.data;
            if ("string" == typeof e) try {
                if (!(e.indexOf("hcaptcha") >= 0)) return;
                e = JSON.parse(e);
                for (var i, n = Ce.chats, s = -1; ++s < n.length;)(i = n[s]).id === e.id && i.respond(e)
            } catch (Pn) {
                G("postMessage handler error", "postMessage", "debug", {
                    event: t,
                    error: Pn
                })
            }
        }
    };
    window.addEventListener ? window.addEventListener("message", Ce.handle) : window.attachEvent("onmessage", Ce.handle);
    var _e = new xe(window.parent);

    function Ee(t, e) {
        for (var i in e) {
            var n = e[i];
            switch (typeof n) {
                case "string":
                    t[i] = n;
                    break;
                case "object":
                    t[i] = t[i] || {}, Ee(t[i], n);
                    break;
                default:
                    throw new Error("Source theme contains invalid data types. Only string and object types are supported.")
            }
        }
    }

    function Se(t, e) {
        try {
            return t in e
        } catch (i) {
            return !1
        }
    }

    function Oe(t) {
        return !!t && "object" == typeof t
    }

    function Me(t) {
        return Oe(t) ? Ae({}, t) : t
    }

    function Ae(t, e) {
        var i, n = {},
            s = Object.keys(t);
        for (i = 0; i < s.length; i++) n[s[i]] = Me(t[s[i]]);
        var o, r, a = Object.keys(e);
        for (i = 0; i < a.length; i++) {
            var l = a[i];
            if (!(!Se(o = l, r = t) || Object.hasOwnProperty.call(r, o) && Object.propertyIsEnumerable.call(r, o))) return;
            Se(l, t) && Oe(t[l]) ? n[l] = Ae(t[l], e[l]) : n[l] = Me(e[l])
        }
        return n
    }
    _e.init = function(t) {
        _e.setID(t), Ce.addChat(_e)
    };
    var Te = {
            transparent: "transparent",
            white: "#ffffff",
            black: "#000000"
        },
        Le = {
            100: "#fafafa",
            200: "#f5f5f5",
            300: "#E0E0E0",
            400: "#D7D7D7",
            500: "#BFBFBF",
            600: "#919191",
            700: "#555555",
            800: "#333333",
            900: "#222222",
            1e3: "#14191F"
        },
        Be = "#4DE1D2",
        Pe = "#00838F",
        je = {
            mode: "light",
            grey: Le,
            primary: {
                main: Pe
            },
            secondary: {
                main: Be
            },
            warn: {
                light: "#EB5757",
                main: "#EB5757",
                dark: "#DE3F3F"
            },
            text: {
                heading: Le[700],
                body: Le[700]
            }
        },
        $e = {
            mode: "dark",
            grey: Le,
            primary: {
                main: Pe
            },
            secondary: {
                main: Be
            },
            text: {
                heading: Le[200],
                body: Le[200]
            }
        };

    function Ie(t, e) {
        return "dark" === e && t in $e ? $e[t] : je[t]
    }

    function Fe() {
        this._themes = Object.create(null), this._active = "light", this.add("light", {}), this.add("dark", {
            palette: {
                mode: "dark"
            }
        })
    }
    Fe.prototype.get = function(t) {
        if (!t) return this._themes[this._active];
        var e = this._themes[t];
        if (!e) throw new Error("Cannot find theme with name: " + t);
        return e
    }, Fe.prototype.use = function(t) {
        this._themes[t] ? this._active = t : console.error("Cannot find theme with name: " + t)
    }, Fe.prototype.active = function() {
        return this._active
    }, Fe.prototype.add = function(t, e) {
        e || (e = {}), e.palette = function(t) {
            t || (t = {});
            var e = t.mode || "light",
                i = t.primary || Ie("primary", e),
                n = t.secondary || Ie("secondary", e),
                s = t.warn || Ie("warn", e),
                o = t.grey || Ie("grey", e),
                r = t.text || Ie("text", e);
            return Ae({
                common: Te,
                mode: e,
                primary: i,
                secondary: n,
                grey: o,
                warn: s,
                text: r
            }, t)
        }(e.palette), e.component = e.component || Object.create(null), this._themes[t] = e
    }, Fe.prototype.extend = function(t, e) {
        "string" == typeof e && (e = JSON.parse(e));
        var i = JSON.parse(JSON.stringify(this.get(t)));
        return Ee(i, e), i
    }, Fe.merge = function(t, e) {
        return Ae(t, e || {})
    };
    var He = new Fe;

    function De(t) {
        if ("string" != typeof t.src && !(t.src instanceof HTMLElement)) throw new TypeError("Graphic src must be string or HTMLElement. Passed src: " + t.src);
        pt.self(this, ft, t.selector || ".graphic"), this.state = {
            loaded: !1
        }, this.config = {
            src: t.src,
            fallback: t.fallback || !1,
            width: t.width || 0,
            height: t.height || t.width || 0,
            fill: t.fill
        }, this.image = null, (t.autoLoad || t.autoLoad === undefined) && this.load()
    }

    function Re(t) {
        var e = t.palette,
            i = t.component;
        return Fe.merge({
            main: {
                fill: e.common.white,
                icon: e.grey[700],
                text: e.text.main
            },
            hover: {
                fill: e.grey[200],
                icon: e.primary.main,
                text: e.text.main
            },
            focus: {
                icon: e.primary.main
            },
            active: {
                icon: e.grey[700]
            }
        }, i.button)
    }

    function Ve(t) {
        pt.self(this, ft, t.selector), this._theme = t.theme, this.state = {
            selectable: !1 !== t.selectable,
            title: t.title,
            visible: !0,
            locked: !1,
            mobile: !1,
            selected: !1,
            width: t.width,
            height: t.height,
            closedAt: Date.now(),
            downAt: 0,
            style: Re(this._theme.get())
        }, this.addClass("button"), this.setAttribute("tabindex", 0), this.setAttribute("role", "button"), this.onDown = this.onDown.bind(this), this.onHover = this.onHover.bind(this), this.onSelect = this.onSelect.bind(this), this.addEventListener("down", this.onDown), this.addEventListener("click", this.onSelect), this.addEventListener("enter", this.onSelect), !1 === I.System.mobile && (this.addEventListener("over", this.onHover), this.addEventListener("out", this.onHover)), this.setTitle()
    }
    He.add("contrast", {
        component: {
            prompt: {
                main: {
                    fill: "#fff",
                    text: "#000"
                }
            },
            expandButton: {
                main: {
                    fill: "#000"
                }
            }
        }
    }), He.add("grey-red", {
        component: {
            breadcrumb: {
                active: {
                    fill: "#FF0000"
                }
            },
            prompt: {
                main: {
                    fill: "#6a6a6a"
                }
            },
            task: {
                selected: {
                    border: "#ff1f17"
                }
            },
            expandButton: {
                main: {
                    fill: "#6a6a6a"
                }
            },
            verifyButton: {
                main: {
                    fill: "#ff1f17"
                },
                hover: {
                    fill: "#ff1f17"
                }
            },
            skipButton: {
                main: {
                    fill: "#6a6a6a"
                },
                hover: {
                    fill: "#6a6a6a"
                }
            }
        }
    }), pt.proto(De, ft), De.prototype.load = function() {
        if (this.state.loaded) return Promise.resolve();
        this.state.loaded = !0;
        var t = this,
            e = this.config.src;
        return Jt.image(e, {
            fallback: this.config.fallback
        }).then((function(e) {
            t.image = e, t.appendElement(e.element), t.size(), t.fill()
        }))["catch"]((function() {
            G("graphic failed to load", "image", "info", {
                src: e
            })
        }))
    }, De.prototype.size = function(t, e) {
        this.config.width = t || this.config.width, this.config.height = e || t || this.config.height, this.css({
            width: this.config.width,
            height: this.config.height
        }), this.image && this.image.element.css({
            width: this.config.width,
            height: this.config.height,
            display: "block"
        })
    }, De.prototype.fill = function(t) {
        if (this.config.fill = t || this.config.fill, this.image && "svg" === this.image.ext && this.config.fill) {
            var e = this.image.element.dom,
                i = e.children || e.childNodes;
            if (i)
                for (var n = 0; n < i.length; n++) i[n].style && (i[n].style.fill = this.config.fill)
        }
    }, pt.proto(Ve, ft), Ve.prototype.style = function(t) {
        this.state.mobile = t, this.state.style = Re(this._theme.get()), this.css({
            width: this.state.width,
            height: this.state.height,
            cursor: this.state.locked ? "default" : "pointer",
            display: this.state.visible ? "inline-block" : "none",
            border: "none",
            color: this.state.style.main.text,
            backgroundColor: this.state.style.main.fill,
            borderRadius: 4
        }), this.emit("style")
    }, Ve.prototype.getWidth = function() {
        return this.state.width
    }, Ve.prototype.getHeight = function() {
        return this.state.height
    }, Ve.prototype.onDown = function() {
        this.state.downAt = Date.now()
    }, Ve.prototype.onHover = function(t) {
        null === this.emit || !0 === this.state.locked || this.state.selected || (this.emit("hover", t), this._updateStyle("over" === t.action))
    }, Ve.prototype._updateStyle = function(t) {
        this.css({
            backgroundColor: t ? this.state.style.hover.fill : this.state.style.main.fill,
            color: t ? this.state.style.hover.text : this.state.style.main.text
        }), this.emit("style-update", t)
    }, Ve.prototype.onSelect = function(t) {
        this.emit && !0 !== this.state.locked && (Math.abs(this.state.downAt - this.state.closedAt) < 30 || (this._setState(!!this.state.selectable && !this.state.selected), this.emit("click", {
            selected: this.state.selected,
            usingKb: "enter" === t.action
        })))
    }, Ve.prototype.setLock = function(t) {
        this.state.locked = t, this.css({
            cursor: t ? "default" : "pointer"
        })
    }, Ve.prototype.enable = function(t) {
        this.state.visible = t, this.css({
            display: t ? "inline-block" : "none"
        }), this.setLock.call(this, !t)
    }, Ve.prototype.reset = function() {
        this._setState(!1)
    }, Ve.prototype._setState = function(t) {
        this.state.selected = t, this.css({
            backgroundColor: t ? this.state.style.main.fill : "transparent"
        }), t ? this._updateStyle(!0) : this.state.closedAt = Date.now(), this.emit("state-changed", t)
    }, Ve.prototype.setLabel = function(t) {
        t ? this.setAttribute("aria-label", t) : this.state.label && this.setAttribute("aria-label", Tt.translate(this.state.label))
    }, Ve.prototype.setTitle = function(t) {
        t ? this.setAttribute("title", t) : this.state.title && this.setAttribute("title", Tt.translate(this.state.title))
    }, Ve.prototype.controlsMenu = function(t) {
        this.setAttribute("aria-expanded", !1), this.setAttribute("aria-haspopup", "menu"), this.setAttribute("aria-controls", t.dom.id), t.setAttribute("aria-labelledby", this.dom.id), t.setAttribute("role", "menu"), t.setAttribute("tabindex", -1), this.on("state-changed", (function(t) {
            this.setAttribute("aria-expanded", t)
        }))
    }, Ve.prototype.ownsListBox = function(t) {
        this.setAttribute("aria-expanded", !1), this.setAttribute("aria-haspopup", "listbox"), this.setAttribute("aria-owns", t.dom.id), t.setAttribute("aria-labelledby", this.dom.id), t.setAttribute("role", "listbox"), this.on("state-changed", (function(t) {
            this.setAttribute("aria-expanded", t)
        }))
    };
    var ze = "https://newassets.hcaptcha.com/captcha/v1/74f6caf/static/images";

    function Ne(t) {
        t.selector = t.selector || t.name, pt.self(this, Ve, t), this.$on = this.initComponent(De, {
            selector: "." + t.name + "-on",
            src: t.src,
            fallback: ze + "/" + t.name + "-on.png",
            autoLoad: !1
        }), this.$off = this.initComponent(De, {
            selector: "." + t.name + "-off",
            src: t.src,
            fallback: ze + "/" + t.name + "-off.png",
            autoLoad: !1
        }), this.on("state-changed", this._onStateChange.bind(this)), this.on("style", this._onStyle.bind(this)), this.on("style-update", this._onStyleUpdate.bind(this))
    }

    function We(t) {
        pt.self(this, Ve, t), this.$text = this.createElement(".text"), this.on("style", this._onStyle.bind(this))
    }

    function Ue(t) {
        pt.self(this, ft, t.selector || "list-native", "select");
        var e = this;
        this._options = [], this._selected = null, this.setAttribute("tabindex", -1), this.addEventListener("change", (function() {
            e.select(e.dom.value)
        }))
    }
    pt.proto(Ne, Ve), Ne.prototype.load = function() {
        return Promise.all([this.$on.load(), this.$off.load()])
    }, Ne.prototype._onStyle = function() {
        var t = this.getWidth(),
            e = t - 10,
            i = (t - e) / 2;
        this.$on.size(e), this.$on.fill(this.state.style.focus.icon), this.$on.css({
            "-ms-high-contrast-adjust": "none",
            position: "absolute",
            top: i,
            left: i
        }), this.$off.size(e), this.$off.fill(this.state.style.main.icon), this.$off.css({
            "-ms-high-contrast-adjust": "none",
            position: "absolute",
            top: i,
            left: i
        })
    }, Ne.prototype._onStyleUpdate = function(t) {
        "ie" === I.Browser.type && 8 === I.Browser.version ? (this.$on.css({
            display: t ? "block" : "none"
        }), this.$off.css({
            display: t ? "none" : "block"
        })) : (this.$on.css({
            opacity: t ? 1 : 0
        }), this.$off.css({
            opacity: t ? 0 : 1
        }))
    }, Ne.prototype._onStateChange = function(t) {
        "ie" === I.Browser.type && 8 === I.Browser.version ? (this.$on.css({
            display: t ? "block" : "none"
        }), this.$off.css({
            display: t ? "none" : "block"
        })) : (this.$on.css({
            opacity: t ? 1 : 0
        }), this.$off.css({
            opacity: t ? 0 : 1
        }))
    }, pt.proto(We, Ve), We.prototype.setText = function(t) {
        this.$text.text(t)
    }, We.prototype._onStyle = function() {
        this.css({
            cursor: "pointer"
        }), this.$text.css({
            width: "100%",
            height: "100%",
            textAlign: "center",
            fontSize: 11,
            fontWeight: 600,
            lineHeight: this.state.height,
            position: "absolute"
        })
    }, pt.proto(Ue, ft), Ue.prototype.getSelected = function() {
        return this._selected
    }, Ue.prototype.setCopy = function() {
        for (var t = this._options.length; t--;) this._options[t].element.text(Tt.translate(this._options[t].text))
    }, Ue.prototype.setOptions = function(t) {
        for (var e, i = this._options.length; i--;) this.removeElement(this._options[i].element);
        for (this._options = t, i = 0; i < t.length; i++)(e = this.createElement("option", t[i].selector || ".option")).dom.value = t[i].value, e.text(t[i].text), this._options[i].element = e
    }, Ue.prototype.select = function(t) {
        for (var e = null, i = this._options.length; i--;) t === this._options[i].value && (e = this._options[i]);
        if (!e) throw new Error("Cannot select a missing option value: " + t);
        this._selected && this._selected.element.removeAttribute("selected"), e.element.setAttribute("selected", "selected"), this._selected = e, this.dom.value = e.value, this.emit("hide"), this.emit("select", e)
    }, Ue.prototype.deselect = function() {
        this._selected && this._selected.element.removeAttribute("selected"), this._selected = null, this.dom.value = null
    }, Ue.prototype.style = function() {
        this.css({
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            zIndex: 50
        })
    };
    var qe = 37,
        Ze = 39,
        Je = 38,
        Ke = 40,
        Xe = ("onwheel" in document || document, document, "ontouchstart" in document),
        Ye = navigator.maxTouchPoints && navigator.maxTouchPoints > 1,
        Ge = !!window.navigator.msPointerEnabled,
        Qe = "onkeydown" in document;

    function ti(t) {
        this.state = {
            pause: !1,
            action: null,
            position: {
                x: 0,
                y: 0
            },
            delta: {
                x: 0,
                y: 0
            }
        }, this.config = {
            arrowScrolling: !1 !== t.arrowScrolling,
            keyStep: t.keyStep || 120,
            firefoxMult: t.firefoxMult || 15,
            touchMult: t.touchMult || 2,
            mouseMult: t.mouseMult || 1
        };
        var e = t.element || document.body;
        e instanceof dt || (e = new dt(e)), this.element = e, this.msBodyTouch = null, this.clamp = {
            enabled: !1,
            min: {
                x: 0,
                y: 0
            },
            max: {
                x: 0,
                y: 0
            }
        }, this.onWheel = this.onWheel.bind(this), this.onKey = this.onKey.bind(this), this.onTouch = this.onTouch.bind(this), this._addListeners()
    }

    function ei() {
        pt.self(this, ft, "scroll-container")
    }

    function ii(t) {
        pt.self(this, ft, t.selector || "list-custom"), this.state = {
            skipAnimationOnce: !1
        }, this.scroll = new ti({
            element: this,
            arrowScrolling: !1,
            mouseMult: .5,
            keyStep: 46
        }), this._container = this.initComponent(ei), this._handle = this.createElement("div"), this.on("scroll-update", this._onScrollUpdate.bind(this))
    }

    function ni(t) {
        var e = t.palette,
            i = t.component;
        return Fe.merge({
            main: {
                fill: e.common.transparent,
                line: e.grey[200],
                text: e.grey[700]
            },
            hover: {
                fill: e.grey[200],
                text: e.grey[900],
                border: e.secondary.main + "b3"
            },
            selected: {
                fill: "#5C6F8A",
                text: e.grey[100]
            }
        }, i.listItem)
    }

    function si(t) {
        pt.self(this, ft, t.option.selector || ".option");
        var e = this;
        this.state = {
            style: ni(t.theme.get()),
            selected: !1,
            usingKb: !1,
            isLast: !1,
            option: t.option,
            theme: t.theme,
            isMenu: t.isMenu,
            height: t.height
        }, this.text = this.text.bind(this), this._text = this.createElement("span"), this._separator = this.createElement("div"), this.addEventListener("click", this.select.bind(this)), this.addEventListener("enter", this.select.bind(this)), this.addEventListener("over", this._onHover.bind(this, !0)), this.addEventListener("out", this._onHover.bind(this, !1)), this.addEventListener("blur", (function() {
            e.updateStyle(!1), e.emit("blur")
        })), this.addEventListener("focus", (function() {
            e.updateStyle(e.state.usingKb), e.emit("focus")
        })), this.setAttribute("tabindex", 0), this.setAttribute("aria-selected", this.state.selected), this.setAttribute("role", this.state.isMenu ? "menuitem" : "option"), this.setCopy()
    }

    function oi(t) {
        pt.self(this, ii, {
            selector: t.selector || "list-custom"
        }), this.state = {
            theme: t.theme,
            isMenu: t.isMenu,
            usingKb: !1,
            visible: !1,
            centerOnce: !1,
            search: "",
            focusedId: -1,
            selected: null,
            optionStyle: null,
            searchTimer: null,
            optionsVisible: t.optionsVisible || 6,
            optionHeight: 46
        }, this._options = [], this.setAttribute("tabindex", -1), this.setAttribute("aria-expanded", !1), this.setAttribute("role", this.state.isMenu ? "presentation" : "listbox"), this.addEventListener("keydown", this.onKeyPress.bind(this))
    }
    ti.prototype.pause = function(t) {
        this.state.pause = t
    }, ti.prototype.update = function(t) {
        if (!this.state.pause) {
            var e = this.state.position,
                i = this.state.delta,
                n = this.state.action;
            e.x += i.x, e.y += i.y, this.clamp.enabled ? (e.x = et(e.x, this.clamp.min.x, this.clamp.max.x), e.y = et(e.y, this.clamp.min.y, this.clamp.max.y)) : console.log(e.y, this.element.dom.scrollHeight), this.element.emit("scroll-update", {
                x: e.x,
                y: e.y,
                delta: i,
                action: n,
                original: t
            })
        }
    }, ti.prototype._addListeners = function() {
        var t = {
            passive: !1
        };
        ("ie" !== I.Browser.type || "ie" === I.Browser.type && 8 !== I.Browser.version) && (this.element.addEventListener("DOMMouseScroll", this.onWheel), this.element.addEventListener("wheel", this.onWheel, t)), this.element.addEventListener("mousewheel", this.onWheel, t), Xe && (this.element.addEventListener("touchstart", this.onTouch), this.element.addEventListener("touchmove", this.onTouch)), Ge && Ye && (this.msBodyTouch = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", this.element.addEventListener("MSPointerDown", this.onTouch, !0), this.element.addEventListener("MSPointerMove", this.onTouch, !0)), this.config.arrowScrolling && Qe && this.element.addEventListener("keydown", this.onKey)
    }, ti.prototype.onWheel = function(t) {
        if (!this.state.pause) {
            (t = window.event || t).preventDefault && t.preventDefault();
            var e = this.state.delta,
                i = this.config.mouseMult,
                n = this.config.firefoxMult;
            "detail" in t && "wheel" !== t.type && 0 !== t.detail ? (e.y = -1 * t.detail, e.y *= n) : "wheelDelta" in t && !("wheelDeltaY" in t) ? e.y = -1 * t.wheelDelta : (e.x = -1 * (t.deltaX || t.wheelDeltaX), e.y = -1 * (t.deltaY || t.wheelDeltaY), "firefox" === I.Browser.type && 1 === t.deltaMode && n && (e.x *= n, e.y *= n)), i && (e.x *= i, e.y *= i), this.state.action = "wheel", this.update.call(this, t)
        }
    }, ti.prototype.onTouch = function(t) {
        if (!this.state.pause) {
            var e = this.state.position,
                i = this.state.delta,
                n = this.config.touchMult,
                s = t.targetTouches[0];
            "move" === t.action ? (i.x = (s.pageX - e.x) * n, i.y = (s.pageY - e.y) * n) : (i.x = 0, i.y = 0), this.state.action = "touch", this.update.call(this, t)
        }
    }, ti.prototype.onKey = function(t) {
        if (!this.state.pause && !t.metaKey) {
            var e = this.state.delta,
                i = this.config.keyStep;
            switch (t.keyCode) {
                case Ke:
                    t.preventDefault && t.preventDefault(), e.x = 0, e.y = -i;
                    break;
                case Je:
                    t.preventDefault && t.preventDefault(), e.x = 0, e.y = i;
                    break;
                case qe:
                    e.x = -i, e.y = 0;
                    break;
                case Ze:
                    e.x = i, e.y = 0;
                    break;
                default:
                    return e.x = 0, void(e.y = 0)
            }
            this.state.action = "keypress", this.update.call(this, t)
        }
    }, ti.prototype.clampX = function(t, e, i) {
        this.clamp.enabled = t, this.clamp.min.x = e || 0, this.clamp.max.x = i || 0
    }, ti.prototype.clampY = function(t, e, i) {
        this.clamp.enabled = t, this.clamp.min.y = e || 0, this.clamp.max.y = i || 0
    }, ti.prototype.reset = function() {
        this.state.position = {
            x: 0,
            y: 0
        }, this.state.delta = {
            x: 0,
            y: 0
        }
    }, ti.prototype.setPosX = function(t) {
        this.setPos(t, this.state.position.y)
    }, ti.prototype.setPosY = function(t) {
        this.setPos(this.state.position.x, t)
    }, ti.prototype.moveYBy = function(t) {
        this.setPos(this.state.position.x, this.state.position.y + t)
    }, ti.prototype.getY = function() {
        return this.state.position.y
    }, ti.prototype.setPos = function(t, e) {
        this.clamp.enabled && (t = et(t, this.clamp.min.x, this.clamp.max.x), e = et(e, this.clamp.min.y, this.clamp.max.y)), this.state.position = {
            x: t,
            y: e
        }, this.state.delta = {
            x: 0,
            y: 0
        }, this.element.emit("scroll-update", {
            x: t,
            y: e,
            delta: this.state.delta,
            action: null
        })
    }, pt.proto(ei, ft), pt.proto(ii, ft), ii.prototype.getContainer = function() {
        return this._container
    }, ii.prototype.scrollInView = function(t, e, i) {
        this.dom.scrollTop = 0, this.state.skipAnimationOnce = i;
        var n = -t.offsetTop,
            s = t.offsetHeight,
            o = this.dom.clientHeight,
            r = this._container.dom.scrollHeight,
            a = this.scroll.getY(),
            l = a - o;
        this._handle.css({
            display: r <= o ? "none" : "block"
        }), this.scroll.clampY(!0, o - r, 0), e ? this.scroll.setPosY(n + o / 2 - s / 2) : n > a ? this.scroll.setPosY(n) : n - s < l && this.scroll.setPosY(n + o - s)
    }, ii.prototype._onScrollUpdate = function(t) {
        var e = t.y,
            i = this._handle.dom.offsetHeight,
            n = this.dom.clientHeight,
            s = (it(e, 0, n - this._container.dom.scrollHeight, 0, 1) || 0) * (n - i - 4);
        "ie" === I.Browser.type && 8 === I.Browser.version ? (this._container.css({
            top: e
        }), this._handle.css({
            top: s
        })) : (this._container.css({
            transform: "translateY(" + e + "px)",
            transition: this.state.skipAnimationOnce ? "none" : "transform 300ms"
        }), this._handle.css({
            transform: "translateY(" + s + "px)",
            transition: this.state.skipAnimationOnce ? "none" : "transform 300ms"
        }), this.state.skipAnimationOnce = !1)
    }, ii.prototype.baseStyle = function() {
        this._container.css({
            width: "100%",
            position: "absolute",
            overflowY: "hidden"
        }), this._handle.css({
            position: "absolute",
            willChange: "transform",
            width: 3,
            height: 40,
            top: 2,
            right: 5,
            borderRadius: 4,
            backgroundColor: "#6E829E"
        })
    }, pt.proto(si, ft), si.prototype.usingKb = function(t) {
        this.state.usingKb = t
    }, si.prototype.select = function() {
        this.state.selected = !0, this.setAttribute("aria-selected", this.state.selected), this.updateStyle(this.state.usingKb), this.emit("select", this)
    }, si.prototype.deselect = function() {
        this.state.selected = !1, this.dom && (this.setAttribute("aria-selected", this.state.selected), this.updateStyle())
    }, si.prototype.focus = function() {
        this.dom && (this.dom.focus(), this.emit("focus"))
    }, si.prototype.getOptionData = function() {
        return this.state.option
    }, si.prototype.setCopy = function() {
        this._text.text(Tt.translate(this.state.option.text))
    }, si.prototype._onHover = function(t) {
        this.emit("hover", t), this.usingKb(!1), this.updateStyle(t)
    }, si.prototype.updateStyle = function(t) {
        if (this.dom) {
            var e = this.state.theme.get().palette,
                i = this.state.style;
            this.css({
                background: this.state.selected ? i.selected.fill : t ? i.hover.fill : i.main.fill,
                color: this.state.option.warn ? e.warn.main : this.state.selected ? i.selected.text : t ? i.hover.text : i.main.text,
                borderColor: this.state.usingKb && t ? i.hover.border : "transparent"
            }), this._separator.css({
                display: this.state.isLast || this.state.selected || t ? "none" : "block"
            })
        }
    }, si.prototype.text = function() {
        return this._text.text()
    }, si.prototype.style = function(t) {
        this.state.isLast = t, this.state.style = ni(this.state.theme.get());
        this.css({
            position: "relative",
            cursor: "pointer",
            height: this.state.height - 6,
            fontSize: 14,
            fontWeight: 400,
            borderWidth: 3,
            borderStyle: "solid",
            borderColor: "transparent"
        }), this._separator.css({
            position: "absolute",
            height: 1,
            bottom: -4,
            left: 10,
            right: 10,
            background: this.state.style.main.line
        }), this.updateStyle()
    }, pt.proto(oi, ii), oi.prototype.getSelected = function() {
        return this.state.selected && this.state.selected.getOptionData()
    }, oi.prototype.setCopy = function() {
        for (var t = this._options.length; t--;) this._options[t].setCopy()
    }, oi.prototype.setOptions = function(t) {
        for (var e, i = this._options.length; i--;) this.getContainer().removeElement(this._options[i]);
        for (this._options = [], i = 0; i < t.length; i++) {
            e = this.getContainer().initComponent(si, {
                theme: this.state.theme,
                isMenu: this.state.isMenu,
                height: this.state.optionHeight,
                option: t[i]
            });
            var n = i === t.length - 1;
            e.usingKb(this.state.usingKb), e.style(n), this._options.push(e), e.on("select", this._onOptionSelect.bind(this, e)), e.on("focus", this._onOptionFocus.bind(this, i)), e.on("blur", this._onOptionBlur.bind(this, i)), e.on("hover", this._onOptionHover.bind(this))
        }
        var s = -1 === this.state.optionsVisible ? this._options.length : this.state.optionsVisible;
        this.css({
            height: s * this.state.optionHeight
        })
    }, oi.prototype.select = function(t) {
        for (var e = null, i = this._options.length; i--;) t === this._options[i].getOptionData().value && (e = this._options[i]);
        if (!e) throw new Error("Cannot select a missing option value: " + t);
        e.select()
    }, oi.prototype.deselect = function() {
        this.state.selected && this.state.selected.deselect(), this.state.selected = null
    }, oi.prototype._onOptionSelect = function(t) {
        this.hide(), this.state.selected && this.state.selected !== t && this.state.selected.deselect(), this.state.selected = t, this.emit("select", t.getOptionData())
    }, oi.prototype._onOptionFocus = function(t) {
        this.state.focusedId = t;
        var e = this._options[t],
            i = !this.state.centerOnce && e === this.state.selected;
        i && (this.state.centerOnce = !0), this.scrollInView(e.dom, i, i)
    }, oi.prototype._onOptionHover = function() {
        for (var t = this._options.length; t--;) this._options[t].updateStyle(!1)
    }, oi.prototype._onOptionBlur = function() {
        var t = this;
        this.state.focusedId = -1, setTimeout((function() {
            t.dom && -1 === t.state.focusedId && t.hide()
        }), 0)
    }, oi.prototype.isVisible = function() {
        return this.state.visible
    }, oi.prototype.hide = function() {
        this.state.visible && (this.state.visible = !1, this.setAttribute("aria-expanded", !1), this.css({
            display: "none"
        }), this.emit("hide"))
    }, oi.prototype.open = function() {
        if (!this.state.visible) {
            this.state.centerOnce = !1, this.state.visible = !0, this.setAttribute("aria-expanded", !0), this.css({
                display: "block"
            });
            var t = this.state.selected ? this.state.selected : this._options[0];
            t && t.focus(), this.emit("open")
        }
    }, oi.prototype.usingKb = function(t) {
        this.state.usingKb = t;
        for (var e = this._options.length; e--;) this._options[e].usingKb(t)
    }, oi.prototype.style = function(t) {
        var e = function(t) {
            var e = t.palette,
                i = t.component;
            return Fe.merge({
                main: {
                    fill: e.common.white,
                    border: "#6E829E"
                }
            }, i.list)
        }(this.state.theme.get());
        this.css({
            width: t || 160,
            display: this.isVisible() ? "block" : "none",
            zIndex: 100,
            background: e.main.fill,
            boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 4px",
            borderWidth: 1,
            borderRadius: 4,
            borderStyle: "solid",
            borderColor: e.main.border,
            position: "absolute",
            overflow: "hidden",
            left: 0
        }), this.getContainer().css({
            lineHeight: this.state.optionHeight - 6,
            whiteSpace: "nowrap",
            textAlign: "center"
        }), this.baseStyle()
    }, oi.prototype.onKeyPress = function(t) {
        var e = this;
        if (27 === t.keyNum) return t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), void e.hide();
        if (-1 === [13, 32].indexOf(t.keyNum)) {
            if (this.usingKb(!0), -1 !== [38, 40].indexOf(t.keyNum)) {
                var i = (e.state.focusedId + (38 === t.keyNum ? -1 : 1)) % e._options.length;
                return -1 === i && (i = e._options.length - 1), t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), void e._options[i].focus()
            }
            this.state.searchTimer && clearTimeout(this.state.searchTimer), this.state.searchTimer = setTimeout((function() {
                e.state.search = ""
            }), 500), this.state.search += String.fromCharCode(t.keyCode);
            var n = this._findByValue(this.state.search);
            n && n.focus()
        }
    }, oi.prototype._findByValue = function(t) {
        t = t.toLowerCase();
        for (var e = null, i = this._options.length; i--;) 0 === this._options[i].text().toLowerCase().indexOf(t) && (e = this._options[i]);
        return e
    };

    function ri() {
        pt.self(this, Ne, {
            title: "Close Modal",
            name: "close",
            src: "data:image/svg+xml,%3csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.5669 4.17308C17.1764 3.78256 16.5432 3.78256 16.1527 4.17308L11 9.32578L5.84731 4.17309C5.45678 3.78257 4.82362 3.78257 4.43309 4.17309L4.17308 4.43311C3.78256 4.82363 3.78256 5.4568 4.17308 5.84732L9.32577 11L4.17309 16.1527C3.78257 16.5432 3.78257 17.1764 4.17309 17.5669L4.4331 17.8269C4.82363 18.2174 5.45679 18.2174 5.84732 17.8269L11 12.6742L16.1527 17.8269C16.5432 18.2174 17.1764 18.2174 17.5669 17.8269L17.8269 17.5669C18.2174 17.1764 18.2174 16.5432 17.8269 16.1527L12.6742 11L17.8269 5.84731C18.2174 5.45678 18.2174 4.82362 17.8269 4.43309L17.5669 4.17308Z'/%3e%3c/svg%3e",
            theme: He,
            width: 30,
            height: 30
        })
    }

    function ai() {
        pt.self(this, ft, "header"), this.state = {
            visible: !0
        }, this.$title = this.createElement("h2", "#modal-title"), this.$underline = this.createElement(".underline"), this.setAttribute("role", "heading")
    }

    function li(t) {
        var e = t.palette,
            i = t.component,
            n = "light" === e.mode;
        return Fe.merge({
            main: {
                fill: e.common.white,
                border: e.grey[n ? 300 : 200]
            },
            hover: {
                fill: e.grey[n ? 200 : 700]
            },
            focus: {
                border: "#0074BF"
            }
        }, i.modal)
    }

    function hi() {
        pt.self(this, ft, "modal");
        var t = this;
        this.state = {
            visible: !1,
            curr: null,
            prev: null
        }, this._style = li(He.get()), this.addClass("no-outline"), this.setAttribute("role", "dialog"), this.setAttribute("aria-modal", !0), this.setAttribute("tabindex", "0"), this.header = this.initComponent(ai), this.header.on("close", (function() {
            t.emit("close")
        })), this.$content = this.createElement("#modal-content"), this.$content.addClass("content"), this.setAttribute("aria-describedby", "#modal-content"), this.close = this.initComponent(ri), this.close.on("click", (function() {
            t.emit("close")
        })), this.addEventListener("keydown", (function(e) {
            t.dom && 9 === e.keyNum && (e.shiftKey ? document.activeElement === t.dom && (t.close.focus(), e.preventDefault && e.preventDefault()) : document.activeElement === t.close.dom && (t.focus(), e.preventDefault && e.preventDefault()))
        })), this.addEventListener("focus", (function() {
            t.css({
                border: "1px solid " + t._style.focus.border
            })
        })), this.addEventListener("blur", (function() {
            t.css({
                border: "1px solid " + t._style.main.border
            })
        }))
    }

    function ci(t) {
        pt.self(this, ft, "link", "a");
        var e = this;
        this.state = {
            link: t.link,
            text: t.text,
            underline: t.underline || !1
        }, this.state.link && (this.setAttribute("href", this.state.link), this.setAttribute("target", "_blank"));
        var i = function(t) {
            e.state.link || e.emit("click")
        };
        if (this.addEventListener("enter", i), this.addEventListener("click", i), !1 === I.System.mobile) {
            var n = function(t) {
                var i = He.get().palette,
                    n = "light" === i.mode;
                e.css("over" === t.action ? {
                    color: i.primary.main,
                    textDecoration: "underline"
                } : {
                    color: n ? i.text.body : i.grey[700],
                    textDecoration: e.state.underline ? "underline" : "none"
                })
            };
            this.addEventListener("over", n), this.addEventListener("out", n)
        }
    }

    function ui(t) {
        pt.self(this, ft, "copy", "p");
        var e = this;
        t || (t = {}), this.state = {
            text: t.text || "",
            linkUnderline: t.linkUnderline || !1,
            link: t.link || !1,
            linkText: t.linkText || "",
            linkTo: t.linkTo || null,
            replaceText: t.replaceText || null
        }, this.state.link && (this.link = new ci({
            text: this.state.linkText,
            link: this.state.linkTo,
            underline: this.state.linkUnderline
        }), this.state.linkTo && this.link.on("click", (function() {
            e.emit("click")
        })))
    }
    pt.proto(ri, Ne), ri.size = ri.prototype.size = 30, pt.proto(ai, ft), ai.prototype.style = function(t, e) {
        var i = e ? 40 : 44,
            n = He.get().palette,
            s = "light" === n.mode;
        return this.$title.css({
            color: s ? n.text.heading : n.grey[700],
            fontWeight: 600,
            textAlign: "left",
            fontSize: e ? 15 : 16,
            display: this.state.visible ? "table-cell" : "none",
            verticalAlign: "middle",
            paddingTop: 2,
            height: i,
            width: t - ri.size
        }), this.$underline.css({
            backgroundColor: n.primary.main,
            width: t,
            height: 1,
            top: i,
            position: "absolute"
        }), this.css({
            width: t,
            height: i,
            position: "relative",
            top: 0
        }), {
            height: i,
            width: t
        }
    }, ai.prototype.setCopy = function(t) {
        var e = Tt.translate(t);
        this.$title.text(e)
    }, ai.prototype.display = function(t) {
        this.state.visible = t, this.css({
            display: t ? "table-cell" : "none"
        })
    }, ai.prototype.isVisible = function() {
        return this.state.visible
    }, pt.proto(hi, ft), hi.prototype.load = function() {
        this.close.load()
    }, hi.prototype.style = function(t, e) {
        var i = t < 300;
        this._style = li(He.get()), this.css({
            width: t,
            maxHeight: e,
            position: "relative",
            margin: "0 auto",
            backgroundColor: this._style.main.fill,
            display: this.header ? "block" : "table",
            borderRadius: 4,
            zIndex: 10,
            overflow: "hidden",
            border: "1px solid " + this._style.main.border,
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 2px",
            padding: "0px 15px 15px"
        }), this.header.isVisible() ? (this.header.style(t, i), this.$content.css({
            display: "block",
            height: "auto",
            marginTop: 10
        })) : this.$content.css({
            display: "table-cell",
            verticalAlign: "middle",
            marginTop: 0,
            height: e
        }), this.close.style(), this.close.css({
            position: "absolute",
            right: 20,
            top: i ? 5 : 7
        })
    }, hi.prototype.setTitle = function(t) {
        t ? (this.header.display(!0), this.header.setCopy(t), this.close.setTitle()) : this.header.display(!1)
    }, pt.proto(ci, ft), ci.prototype.style = function(t) {
        var e = He.get().palette,
            i = "light" === e.mode;
        this.css({
            color: i ? e.text.body : e.grey[700],
            fontWeight: 400,
            fontSize: t,
            cursor: "pointer",
            textDecoration: this.state.underline ? "underline" : "none",
            display: "inline-block",
            lineHeight: t
        })
    }, ci.prototype.translate = function() {
        var t = Tt.translate(this.state.text);
        this.text(t)
    }, pt.proto(ui, ft), ui.prototype.style = function(t, e) {
        var i = He.get().palette,
            n = "light" === i.mode;
        e || (e = "center"), this.css({
            width: "100%",
            fontSize: t,
            textAlign: e,
            fontWeight: 400,
            color: n ? i.text.body : i.grey[700],
            lineHeight: t + 6,
            display: "inline"
        }), this.state.link && (this.link.style(t), this.link.css({
            display: "inline"
        }))
    }, ui.prototype.translate = function() {
        var t = Tt.translate(this.state.text);
        if (this.state.link)
            if (this.link.translate(), this.state.replaceText) {
                var e = t.split("{{" + this.state.replaceText + "}}"),
                    i = document.createTextNode(e[0]);
                if (this.appendElement(i), this.appendElement(this.link), "" !== e[1]) {
                    var n = document.createTextNode(e[1]);
                    this.appendElement(n)
                }
            } else {
                var s = document.createTextNode(t + " ");
                this.appendElement(s), this.appendElement(this.link)
            }
        else this.content(t)
    };

    function di() {
        pt.self(this, ft, "instructions"), this.copy = this.initComponent(ui, {
            text: "hCaptcha is a service that reduces bots and spam by asking simple questions. Please follow the instructions at the top of the screen for each challenge. For more information visit {{site-url}}",
            link: !0,
            linkText: "hcaptcha.com",
            linkTo: "https://www.hcaptcha.com/what-is-hcaptcha-about?r=a2",
            replaceText: "site-url"
        })
    }

    function pi() {
        pt.self(this, ft, "feedback");
        var t = this;
        this.$info = this.createElement("span"), this.$link = this.createElement(".feedback-link"), this.$link.setAttribute("tabindex", "0"), this.$link.setAttribute("role", "link");
        var e = function(e) {
            t.emit("click")
        };
        if (this.$link.addEventListener("enter", e), this.$link.addEventListener("click", e), !1 === I.System.mobile) {
            var i = function(e) {
                t.$link.css("over" === e.action ? {
                    textDecoration: "underline"
                } : {
                    textDecoration: "none"
                })
            };
            this.$link.addEventListener("over", i), this.$link.addEventListener("out", i)
        }
    }

    function fi() {
        pt.self(this, ft, "information");
        var t = this;
        this.instructions = this.initComponent(di, null, this.$content), this.feedback = this.initComponent(pi, null, this.$content), this.feedback.on("click", (function() {
            t.emit("change", "feedback")
        }))
    }
    pt.proto(di, ft), di.prototype.style = function(t) {
        this.copy.style(t, "left")
    }, di.prototype.setCopy = function() {
        this.copy.translate()
    }, pt.proto(pi, ft), pi.prototype.style = function(t) {
        var e = Math.floor(it(t, 250, 300, 11, 13)),
            i = He.get().palette,
            n = "light" === i.mode;
        this.css({
            textAlign: "center",
            color: n ? i.text.body : i.grey[700],
            fontSize: e,
            fontWeight: 500,
            width: t,
            margin: "0 auto"
        }), this.$link.css({
            color: n ? i.text.body : i.grey[700],
            fontWeight: 500,
            marginLeft: 3,
            cursor: "pointer",
            display: "inline-block"
        })
    }, pi.prototype.setCopy = function() {
        var t = Tt.translate("Having a problem?"),
            e = Tt.translate("Give feedback."),
            i = Tt.translate("Provide feedback regarding the hCaptcha service.");
        this.$info.text(t), this.$link.text(e), this.$link.setAttribute("aria-label", i)
    }, pt.proto(fi, ft), fi.prototype.style = function(t, e, i) {
        var n = Math.floor(it(t, 250, 275, 12, 14));
        this.instructions.style(n), this.instructions.css({
            marginBottom: 10
        }), this.feedback.style(t)
    }, fi.prototype.setCopy = function() {
        this.instructions.setCopy(), this.feedback.setCopy()
    };
    var mi = null,
        yi = null,
        gi = null,
        vi = null,
        bi = {},
        wi = null,
        xi = null,
        ki = !1,
        Ci = {
            logAction: function(t) {
                wi = t
            },
            getTaskData: function(t, e) {
                t === undefined && (t = {});
                var i = {
                    v: "74f6caf",
                    sitekey: F.sitekey,
                    host: F.host,
                    hl: Tt.getLocale()
                };
                return H.se && (i.se = H.se), !0 === F.a11y_tfe && (i.a11y_tfe = !0), null !== wi && (i.action = wi, wi = null), null !== vi && (i.extraData = JSON.stringify(vi), vi = null), t && (i.motionData = JSON.stringify(t)), null !== mi && (yi = mi, i.old_ekey = mi), null !== xi && (i.rqdata = xi), e && (i.n = e.solved || null, i.c = e.spec ? JSON.stringify(e.spec) : null), new Promise((function(t, e) {
                    try {
                        Ft({
                            url: H.endpoint + "/getcaptcha?" + tt({
                                s: i.sitekey
                            }),
                            data: i,
                            dataType: "query",
                            responseType: "json",
                            withCredentials: !0,
                            headers: {
                                Accept: "application/json",
                                "Content-type": "application/x-www-form-urlencoded"
                            }
                        }).then((function(e) {
                            var n = e.body || null;
                            if (!n) throw new Error("Missing response body.");
                            if (!1 === n.success) return -1 !== (n["error-codes"] || []).indexOf("invalid-data") && X("invalid-data", "error", "api", {
                                motionData: i.motionData
                            }), void t(n);
                            Ci.setData(n), t(n)
                        }))["catch"](e)
                    } catch (jn) {
                        e(jn)
                    }
                }))
            },
            loadBundle: function(t) {
                return new Promise((function(e, i) {
                    if (bi[t]) e(bi[t]);
                    else {
                        var n = Ci.createBundleUrl(t);
                        Jt.script(n).then((function() {
                            bi[t] = window[t], e(bi[t])
                        }))["catch"]((function(t) {
                            i({
                                event: wt,
                                message: "Failed to get challenge bundle.",
                                reason: t
                            })
                        }))
                    }
                }))
            },
            createBundleUrl: function(t) {
                return (H.assethost || F.assetDomain) + "/captcha/challenge/" + t + "/74f6caf/challenge.js"
            },
            checkAnswers: function(t, e, i) {
                var n = {
                    v: "74f6caf",
                    job_mode: vi.request_type,
                    answers: t,
                    serverdomain: F.host,
                    sitekey: F.sitekey,
                    motionData: JSON.stringify(e)
                };
                return H.se && (n.se = H.se), i && (n.n = i.solved, n.c = JSON.stringify(i.spec)), new Promise((function(t, e) {
                    try {
                        Ft({
                            url: H.endpoint + "/checkcaptcha/" + vi.key + "?" + tt({
                                s: n.sitekey
                            }),
                            data: n,
                            dataType: "json",
                            responseType: "json",
                            withCredentials: !0,
                            headers: {
                                "Content-type": "application/json;charset=UTF-8"
                            }
                        }).then((function(e) {
                            var i = e.body || null;
                            if (!i) throw new Error("Missing response body.");
                            if (!1 === i.success) {
                                var s = i["error-codes"] || [""]; - 1 !== s.indexOf("invalid-data") && X("invalid-data", "error", "api", {
                                    motionData: n.motionData
                                });
                                var o = s.join(", ");
                                throw new Error(o)
                            }
                            t(i)
                        }))["catch"](e)
                    } catch (jn) {
                        e(jn)
                    }
                }))
            },
            reportIssue: function(t, e, i) {
                var n = {
                    taskdata: vi,
                    on_url: F.url,
                    report_category: t,
                    sid: gi
                };
                if (e && (n.user_comments = e), yi && (n.last_ekey = yi), i && vi && "fallback" !== vi.request_type) {
                    for (var s = vi.tasklist, o = null, r = -1; ++r < s.length && !o;) s[r].task_key === i && (o = s[r]);
                    n.taskdata.tasklist = [o]
                }
                return Ft({
                    url: H.reportapi + "/bug-report",
                    data: n,
                    dataType: "json",
                    responseType: "json",
                    withCredentials: !0,
                    headers: {
                        "Content-type": "application/json;charset=UTF-8"
                    }
                })
            },
            getEKey: function() {
                return mi
            },
            setData: function(t) {
                vi = t, mi = t.key, ki = !!t.rq, gi || (gi = mi)
            },
            setRqData: function(t) {
                xi = t
            },
            getRqData: function() {
                return xi
            },
            isRqChl: function() {
                return ki
            },
            getData: function() {
                return vi
            }
        };

    function _i(t) {
        pt.self(this, ft, "checkmark");
        var e = this;
        this.state = {
            locked: !1,
            selected: !1,
            text: t.text,
            value: t.value
        }, this.$wrapper = this.createElement(".wrapper"), this.$input = this.$wrapper.createElement(".checkbox"), this.$input.bg = this.$input.createElement(".checkbox-bg"), this.$input.check = this.$input.createElement(".checkbox-mark"), this.$input.check.css({
            opacity: 0
        }), this.$text = this.$wrapper.createElement(".checkbox-text"), this.$text.dom.id = "checkmark-" + this.state.value, this.$input.setAttribute("tabindex", "0"), this.$input.setAttribute("role", "radio"), this.$input.setAttribute("aria-pressed", !1), this.$input.setAttribute("aria-labelledby", this.$text.dom.id);
        var i = function() {
            e.emit("select", e)
        };
        this.$input.addEventListener("up", i), this.$input.addEventListener("enter", i)
    }

    function Ei(t) {
        pt.self(this, ft, "options"), this.state = {
            visible: !0
        }, this.handeSelect = this.handeSelect.bind(this), this.$wrapper = this.createElement(".column-wrapper"), this.$left = this.$wrapper.createElement(".column-left"), this.$right = this.$wrapper.createElement(".column-right"), this.options = [];
        for (var e = null, i = null, n = 0; n < t.length; n++) i = n >= t.length / 2 ? this.$right : this.$left, (e = this.initComponent(_i, t[n], i)).setCopy(), e.on("select", this.handeSelect), this.options.push(e)
    }

    function Si(t) {
        var e = t.palette,
            i = t.component,
            n = "light" === e.mode;
        return Fe.merge({
            main: {
                fill: e.grey[100],
                border: e.grey[n ? 600 : 200]
            },
            focus: {
                fill: e.grey[200],
                border: e.grey[n ? 800 : 100]
            },
            disabled: {
                fill: e.grey[300]
            }
        }, i.input)
    }

    function Oi(t) {
        pt.self(this, ft, "comment");
        var e = this;
        this.state = {
            visible: !1,
            placeholder: t
        }, this._style = Si(He.get()), this.$textarea = this.createElement("textarea", ".comment-textarea"), this.setPlaceholder.call(this), this.$textarea.addEventListener("input", (function(t) {
            e.emit("change", t.target.value)
        }))
    }

    function Mi(t) {
        var e = t.palette,
            i = t.component;
        return Fe.merge({
            main: {
                fill: e.common.white,
                icon: e.grey[700],
                text: e.text.main
            },
            hover: {
                fill: e.grey[200],
                icon: e.primary.main,
                text: e.text.main
            },
            focus: {
                icon: e.primary.main
            },
            active: {
                icon: e.grey[700]
            }
        }, i.button)
    }

    function Ai(t) {
        pt.self(this, ft, "button-" + t.value), this.state = {
            visible: !0,
            locked: !1,
            value: t.value,
            text: t.text,
            lockText: null,
            desc: t.desc,
            type: t.type || "default"
        }, this.$copy = this.createElement(".send-text"), this._style = Mi(He.get()), this.onHover = this.onHover.bind(this), this.onSelect = this.onSelect.bind(this), this.setAttribute("tabindex", 0), this.setAttribute("role", "button"), this.addEventListener("click", this.onSelect), this.addEventListener("enter", this.onSelect), !1 === I.System.mobile && (this.addEventListener("over", this.onHover), this.addEventListener("out", this.onHover))
    }
    pt.proto(_i, ft), _i.prototype.style = function(t) {
        var e = it(t, 125, 150, 13, 14),
            i = 15,
            n = t - 27,
            s = function(t) {
                var e = t.palette,
                    i = t.component;
                return Fe.merge({
                    main: {
                        fill: e.grey[200],
                        border: e.grey[600]
                    },
                    selected: {
                        check: e.primary.main
                    }
                }, i.radio)
            }(He.get()),
            o = He.get().palette,
            r = "light" === o.mode;
        this.css({
            height: "auto",
            marginTop: 5,
            marginBottom: 5,
            position: "relative"
        }), this.$wrapper.css({
            cursor: "pointer",
            height: "auto",
            width: "auto",
            position: "relative",
            display: "inline-block"
        }), this.$input.css({
            position: "relative",
            display: "inline-block",
            width: i,
            height: i,
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid " + s.main.border,
            float: "left"
        }), this.$input.check.css({
            position: "absolute",
            top: 2,
            left: 2,
            zIndex: 10,
            width: 11,
            height: 11,
            borderRadius: 1,
            backgroundColor: s.selected.check
        }), this.$input.bg.css({
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
            width: i,
            height: i,
            backgroundColor: s.main.fill
        }), this.$text.css({
            position: "relative",
            display: "inline-block",
            width: n,
            fontSize: e,
            fontWeight: 400,
            color: r ? o.text.body : o.grey[700],
            float: "right",
            marginLeft: 10,
            marginTop: 1,
            wordBreak: "break-word"
        })
    }, _i.prototype.toggle = function(t) {
        this.state.locked || (this.state.selected = t, this.$input.check.css({
            opacity: t ? 1 : 0
        }), this.$input.setAttribute("aria-pressed", t))
    }, _i.prototype.lock = function(t) {
        this.state.locked = t
    }, _i.prototype.setCopy = function() {
        var t = Tt.translate(this.state.text);
        this.$text.text(t)
    }, pt.proto(Ei, ft), Ei.prototype.style = function(t, e) {
        var i = Math.floor(t / 2);
        this.$left.css({
            width: "50%",
            display: "inline-block",
            float: "left"
        }), this.$right.css({
            width: "50%",
            display: "inline-block",
            float: "right"
        });
        for (var n = 0; n < this.options.length; n++) this.options[n].style(i)
    }, Ei.prototype.handeSelect = function(t) {
        if (this.state.visible) {
            for (var e = !1, i = 0; i < this.options.length; i++)(e = this.options[i] === t) && e === t.state.selected && (e = !e), this.options[i].toggle(e);
            this.emit("update", t)
        }
    }, Ei.prototype.visible = function(t) {
        this.state.visible = t, this.css({
            display: t ? "inline-block" : "none"
        });
        for (var e = 0; e < this.options.length; e++) this.options[e].lock(!t)
    }, Ei.prototype.setCopy = function() {
        for (var t = 0; t < this.options.length; t++) this.options[t].setCopy()
    }, pt.proto(Oi, ft), Oi.prototype.style = function(t, e) {
        this._style = Si(He.get());
        var i = He.get().palette,
            n = "light" === i.mode;
        this.$textarea.css({
            width: t - 30,
            height: 50,
            borderRadius: 4,
            backgroundColor: this._style.main.fill,
            color: n ? i.text.body : i.grey[700],
            border: "1px solid " + this._style.main.border,
            fontSize: e ? 12 : 14,
            lineHeight: e ? 16 : 18,
            fontWeight: 500,
            boxSizing: "border-box",
            MozBoxSizing: "border-box",
            padding: "8px 12px",
            position: "absolute",
            left: "50%",
            marginLeft: -(t - 30) / 2
        }), this.css({
            height: 50,
            width: t,
            position: "relative"
        }), this.visible(this.state.visible)
    }, Oi.prototype.visible = function(t) {
        this.state.visible = t, this.css({
            display: t ? "block" : "none"
        })
    }, Oi.prototype.disable = function(t) {
        this.state.visible && (this.$textarea.dom.disabled = !t, this.$textarea.css({
            backgroundColor: t ? this._style.main.fill : this._style.disabled.fill
        }))
    }, Oi.prototype.getValue = function() {
        return this.$textarea.dom.value
    }, Oi.prototype.setValue = function(t) {
        this.$textarea.dom.value = t
    }, Oi.prototype.setPlaceholder = function() {
        this.$textarea.setAttribute("placeholder", Tt.translate(this.state.placeholder))
    }, pt.proto(Ai, ft), Ai.prototype.style = function() {
        var t = He.get().palette,
            e = "light" === t.mode;
        this._style = Mi(He.get()), this.css({
            width: "auto",
            height: 15,
            cursor: this.state.locked ? "default" : "pointer",
            display: "block",
            margin: "0 auto",
            textAlign: "center",
            borderRadius: 4,
            padding: "10px 15px"
        });
        var i = "warn" === this.state.type ? t.warn.main : t.primary.main;
        this.$copy.css({
            color: this.state.locked ? e ? t.text.body : t.grey[700] : i,
            fontSize: 15,
            fontWeight: 500,
            display: "inline-block"
        })
    }, Ai.prototype.onHover = function(t) {
        if (!this.state.locked && this.state.visible) {
            var e = He.get().palette,
                i = "warn" === this.state.type ? e.warn.main : e.primary.main;
            this.css({
                backgroundColor: "over" === t.action ? this._style.hover.fill : this._style.main.fill
            }), this.$copy.css({
                color: i
            })
        }
    }, Ai.prototype.onSelect = function(t) {
        !this.state.locked && this.state.visible && this.emit("click", t)
    }, Ai.prototype.visible = function(t) {
        this.state.visible = t, this.css({
            display: t ? "block" : "none"
        })
    }, Ai.prototype.lock = function(t, e) {
        var i = He.get().palette,
            n = "warn" === this.state.type ? i.warn.main : i.primary.main,
            s = "light" === i.mode;
        this.state.locked = t, this.state.lockText = e, this.setAttribute("aria-label", e || this.state.desc), this.$copy.css({
            color: t ? s ? i.text.body : i.grey[700] : n
        }), t ? this.setAttribute("aria-disabled", t) : this.removeAttribute("aria-disabled")
    }, Ai.prototype.setCopy = function() {
        var t = Tt.translate(this.state.text),
            e = Tt.translate(this.state.locked && this.state.lockText ? this.state.lockText : this.state.desc);
        this.$copy.text(t), this.setAttribute("aria-label", e)
    };
    var Ti = [{
        text: "Too Difficult",
        value: "difficulty"
    }, {
        text: "Inappropriate",
        value: "content"
    }, {
        text: "Software Bug",
        value: "software"
    }, {
        text: "Other",
        value: "other"
    }];

    function Li() {
        pt.self(this, ft, "feedback");
        var t = this;
        this.selected = null, this.options = this.initComponent(Ei, Ti), this.comment = this.initComponent(Oi, "Please describe your issue."), this.$buttons = this.createElement(".buttons"), this.cancel = this.initComponent(Ai, {
            text: "Cancel",
            value: "cancel",
            desc: "Cancel Response",
            type: "warn"
        }, this.$buttons), this.send = this.initComponent(Ai, {
            text: "Send",
            value: "send",
            desc: "Send Response"
        }, this.$buttons), this.send.lock(!0, "Please select an option to send response."), this.send.on("click", this.sendMessage.bind(this)), this.options.on("update", this.displayComment.bind(this)), this.comment.visible(!1), this.cancel.on("click", (function() {
            t.emit("close")
        })), this.setAttribute("role", "radiogroup")
    }
    pt.proto(Li, ft), Li.prototype.style = function(t, e, i) {
        this.$buttons.css({
            width: i ? 200 : 220,
            height: 35,
            position: "relative",
            margin: "10px auto 0px",
            clear: "both"
        }), this.options.style(t, i), this.options.css({
            float: "left",
            marginBottom: 10
        }), this.comment.style(t, i), this.comment.css({
            marginTop: 10,
            clear: "both"
        }), this.send.style(), this.cancel.style(t, i), this.cancel.css({
            position: "absolute",
            left: 0
        }), this.send.css({
            position: "absolute",
            right: 0
        })
    }, Li.prototype.sendMessage = function() {
        var t = "",
            e = "",
            i = this.comment.getValue();
        this.selected && (t = this.selected.state.text, e = this.selected.state.value), this.comment.setValue(""), this.comment.visible(!1), this.options.visible(!1), this.send.visible(!1);
        var n = "software" === e || "other" === e ? "feedback" : "content" === e ? "report" : "accessibility";
        this.emit("change", "thanks", {
            response: n
        }), Ci.reportIssue(t, i)["catch"]((function(t) {}))
    }, Li.prototype.displayComment = function(t) {
        var e = t.state.selected,
            i = t.state.value,
            n = ("software" === i || "other" === i) && e;
        this.selected = e ? t : null, this.comment.visible(n), this.comment.disable(n), this.send.lock(null === this.selected)
    }, Li.prototype.setCopy = function() {
        this.options.setCopy(), this.comment.setPlaceholder(), this.cancel.setCopy(), this.send.setCopy()
    };
    var Bi = [{
        text: "Can't Solve",
        value: "captcha_solve"
    }, {
        text: "Can't Click",
        value: "captcha_usability"
    }, {
        text: "Off Screen",
        value: "captcha_position"
    }, {
        text: "Other",
        value: "other"
    }];

    function Pi() {
        pt.self(this, ft, "software-bug");
        var t = this;
        this.selected = null, this.options = this.initComponent(Ei, Bi), this.comment = this.initComponent(Oi, "Please provide details and steps to reproduce.", this), this.$buttons = this.createElement(".buttons"), this.cancel = this.initComponent(Ai, {
            text: "Cancel",
            value: "cancel",
            desc: "Cancel Response",
            type: "warn"
        }, this.$buttons), this.send = this.initComponent(Ai, {
            text: "Send",
            value: "send",
            desc: "Send Response"
        }, this.$buttons), this.send.lock(!0, "Please select an option to send response."), this.send.on("click", this.sendMessage.bind(this)), this.options.on("update", this.storeAnswer.bind(this)), this.cancel.on("click", (function() {
            t.emit("close")
        })), this.setAttribute("role", "radiogroup")
    }
    pt.proto(Pi, ft), Pi.prototype.style = function(t, e, i) {
        this.$buttons.css({
            width: i ? 200 : 220,
            height: 35,
            position: "relative",
            margin: "10px auto 0px",
            clear: "both"
        }), this.options.style(t, i), this.options.css({
            float: "left",
            marginBottom: 10
        }), this.comment.style(t, i), this.comment.css({
            marginTop: 10,
            clear: "both"
        }), this.send.style(), this.cancel.style(t, i), this.cancel.css({
            position: "absolute",
            left: 0
        }), this.send.css({
            position: "absolute",
            right: 0
        })
    }, Pi.prototype.sendMessage = function() {
        var t = "",
            e = this.comment.getValue();
        this.selected && (t = this.selected.state.text), this.comment.setValue(""), this.comment.visible(!1), this.options.visible(!1), this.send.visible(!1), this.emit("change", "thanks", {
            response: "feedback"
        }), Ci.reportIssue(t, e)["catch"]((function(t) {}))
    }, Pi.prototype.storeAnswer = function(t) {
        var e = t.state.selected,
            i = "other" === t.state.value && e;
        this.comment.visible(i), this.selected = e ? t : null, this.send.lock(null === this.selected)
    }, Pi.prototype.setCopy = function(t) {
        this.options.setCopy(), this.comment.setPlaceholder(), this.cancel.setCopy(), this.send.setCopy()
    };
    var ji = [{
        text: "Inappropriate",
        value: "inappropriate"
    }, {
        text: "Violent",
        value: "violent"
    }, {
        text: "Too Difficult",
        value: "difficulty"
    }, {
        text: "Other",
        value: "other"
    }];

    function $i(t) {
        pt.self(this, ft, "report");
        var e = this;
        this.selected = null, this.task_key = t.key || "", this.options = this.initComponent(Ei, ji), this.comment = this.initComponent(Oi, "Please describe your issue."), this.$buttons = this.createElement(".buttons"), this.cancel = this.initComponent(Ai, {
            text: "Cancel",
            value: "cancel",
            desc: "Cancel Response",
            type: "warn"
        }, this.$buttons), this.send = this.initComponent(Ai, {
            text: "Send",
            value: "send",
            desc: "Send Response"
        }, this.$buttons), this.send.lock(!0, "Please select an option to send response."), this.send.on("click", this.sendMessage.bind(this)), this.options.on("update", this.storeAnswer.bind(this)), this.cancel.on("click", (function() {
            e.emit("close")
        })), this.setAttribute("role", "radiogroup")
    }

    function Ii() {
        pt.self(this, ft, "thanks-feedback");
        var t = this;
        this.$copy = this.createElement(".feedback-thanks"), this.$resolve = this.createElement(".feedback-resolve"), this.$option = this.createElement(".accessibility-option"), this.$option.content = this.$option.createElement("span", ".text"), this.$option.link = this.$option.createElement("a", ".option-link"), this.$bug = this.createElement(".feedback-bug"), this.$bug.link = this.createElement("a", ".bug-link"), this.$option.link.setAttribute("tabindex", 0), this.$bug.link.setAttribute("tabindex", 0);
        var e = function() {
            window.open("https://www.hcaptcha.com/reporting-bugs")
        };
        this.$bug.link.addEventListener("enter", e), this.$bug.link.addEventListener("down", e);
        var i = function() {
            window.open("https://hcaptcha.com/accessibility")
        };
        if (this.$option.link.addEventListener("down", i), this.$option.link.addEventListener("enter", i), !1 === I.System.mobile) {
            var n = function(e) {
                var i = He.get().palette,
                    n = "light" === i.mode;
                t.$bug.link.css("over" === e.action ? {
                    color: i.primary.main,
                    textDecoration: "underline"
                } : {
                    color: n ? i.text.body : i.grey[700],
                    textDecoration: "none"
                })
            };
            this.$bug.link.addEventListener("over", n), this.$bug.link.addEventListener("out", n);
            var s = function(e) {
                var i = He.get().palette,
                    n = "light" === i.mode;
                t.$option.link.css("over" === e.action ? {
                    color: i.primary.main,
                    textDecoration: "underline"
                } : {
                    color: n ? i.text.body : i.grey[700],
                    textDecoration: "none"
                })
            };
            this.$option.link.addEventListener("over", s), this.$option.link.addEventListener("out", s)
        }
    }

    function Fi() {
        pt.self(this, ft, "thanks-accessibility");
        var t = this;
        this.$sorry = this.createElement(".accessibility-text"), this.$option = this.createElement(".accessibility-option"), this.$avoid = this.createElement(".accessibility-avoid");
        var e = function(t) {
            window.open("https://hcaptcha.com/accessibility")
        };
        if (this.$option.addEventListener("enter", e), this.$option.addEventListener("down", e), !1 === I.System.mobile) {
            var i = function(e) {
                var i = He.get().palette,
                    n = "light" === i.mode;
                t.$option.css("over" === e.action ? {
                    color: i.primary.main,
                    textDecoration: "underline"
                } : {
                    color: n ? i.text.body : i.grey[700],
                    textDecoration: "none"
                })
            };
            this.$option.addEventListener("over", i), this.$option.addEventListener("out", i)
        }
    }

    function Hi() {
        pt.self(this, ft, "thanks-feedback"), this.$copy = this.createElement(".feedback-thanks"), this.$resolve = this.createElement(".feedback-resolve")
    }

    function Di(t) {
        pt.self(this, ft, "thanks"), "feedback" === t.response ? this.copy = this.initComponent(Ii, null, this.$content) : "accessibility" === t.response ? this.copy = this.initComponent(Fi, null, this.$content) : "report" === t.response && (this.copy = this.initComponent(Hi, null, this.$content))
    }
    pt.proto($i, ft), $i.prototype.style = function(t, e, i) {
        this.$buttons.css({
            width: i ? 200 : 220,
            height: 35,
            position: "relative",
            margin: "10px auto 0px",
            clear: "both"
        }), this.options.style(t, i), this.options.css({
            float: "left",
            marginBottom: 10
        }), this.comment.style(t, i), this.comment.css({
            marginTop: 10,
            clear: "both"
        }), this.send.style(), this.cancel.style(t, i), this.cancel.css({
            position: "absolute",
            left: 0
        }), this.send.css({
            position: "absolute",
            right: 0
        })
    }, $i.prototype.sendMessage = function() {
        var t = this.task_key,
            e = "",
            i = this.comment.getValue();
        this.selected && (e = this.selected.state.text), this.comment.setValue(""), this.comment.visible(!1), this.options.visible(!1), this.send.visible(!1), this.emit("change", "thanks", {
            response: "report"
        }), Ci.reportIssue(e, i, t)["catch"]((function(t) {}))
    }, $i.prototype.storeAnswer = function(t) {
        var e = t.state.selected,
            i = "other" === t.state.value && e;
        this.comment.visible(i), this.selected = e ? t : null, this.send.lock(null === this.selected)
    }, $i.prototype.setCopy = function() {
        this.options.setCopy(), this.comment.setPlaceholder(), this.cancel.setCopy(), this.send.setCopy()
    }, pt.proto(Ii, ft), Ii.prototype.style = function(t, e) {
        var i = it(t, 280, 310, 260, 310),
            n = it(t, 280, 300, 12, 13),
            s = n + 4,
            o = He.get().palette,
            r = "light" === o.mode;
        this.css({
            fontWeight: 500,
            textAlign: "center",
            fontSize: n + 1,
            lineHeight: n + 4,
            color: r ? o.text.body : o.grey[700],
            width: t
        }), this.$copy.css({
            width: i,
            margin: "0 auto",
            fontWeight: 600,
            marginBottom: 2
        }), this.$resolve.css({
            fontSize: n,
            lineHeight: s,
            width: i,
            margin: "0 auto",
            marginBottom: 10
        }), this.$option.css({
            fontSize: n,
            lineHeight: s,
            marginBottom: 10
        }), this.$option.link.css({
            fontSize: n,
            lineHeight: s,
            color: r ? o.text.body : o.grey[700],
            cursor: "pointer"
        }), this.$bug.css({
            fontSize: n - 1,
            lineHeight: s - 1,
            width: i,
            margin: "0 auto",
            marginBottom: -2
        }), this.$bug.link.css({
            fontSize: n - 1,
            lineHeight: s - 1,
            width: i,
            margin: "0 auto",
            color: r ? o.text.body : o.grey[700],
            cursor: "pointer"
        })
    }, Ii.prototype.setCopy = function() {
        var t = Tt.translate("Thank you for your feedback."),
            e = Tt.translate("We'll resolve your issue as quickly as we can."),
            i = Tt.translate("Reporting a functionality issue?"),
            n = Tt.translate("See how to report issues with detailed logs."),
            s = Tt.translate("Please also try turning off your ad blocker.‍"),
            o = Tt.translate("Our accessibility option may help.");
        this.$copy.text(t), this.$resolve.text(e), this.$bug.text(i + " "), this.$bug.link.text(n), this.$option.content.text(s + " "), this.$option.link.text(o);
        var r = Tt.translate("View our accessibility option."),
            a = Tt.translate("Give a detailed report of a bug you've encountered.");
        this.$option.link.setAttribute("aria-label", r), this.$bug.link.setAttribute("aria-label", a)
    }, pt.proto(Fi, ft), Fi.prototype.style = function(t, e) {
        var i = it(t, 280, 310, 260, 310),
            n = it(t, 280, 300, 12, 13),
            s = n + 4,
            o = He.get().palette,
            r = "light" === o.mode;
        this.css({
            fontWeight: 500,
            fontSize: n + 1,
            lineHeight: s,
            textAlign: "center",
            color: r ? o.text.body : o.grey[700],
            width: t
        }), this.$sorry.css({
            fontWeight: 600,
            width: i,
            margin: "0 auto",
            marginBottom: 2
        }), this.$option.css({
            fontSize: n,
            lineHeight: s,
            color: r ? o.text.body : o.grey[700],
            cursor: "pointer",
            marginBottom: 10
        }), this.$avoid.css({
            width: i,
            textAlign: "center",
            fontSize: n,
            lineHeight: s,
            margin: "0 auto"
        })
    }, Fi.prototype.setCopy = function() {
        var t = Tt.translate("Sorry to hear that!"),
            e = Tt.translate("Our accessibility option may help."),
            i = Tt.translate("This lets you avoid future questions by registering and setting a cookie."),
            n = Tt.translate("Please also try turning off your ad blocker.‍");
        this.$sorry.text(t + " "), this.$option.text(e), this.$avoid.text(i + " " + n)
    }, pt.proto(Hi, ft), Hi.prototype.style = function(t, e) {
        var i = it(t, 280, 310, 260, 310),
            n = it(t, 280, 300, 12, 13),
            s = n + 4;
        this.css({
            fontWeight: 500,
            textAlign: "center",
            fontSize: n + 1,
            lineHeight: n + 4,
            color: "#707070",
            width: t
        }), this.$copy.css({
            width: i,
            margin: "0 auto",
            fontWeight: 600,
            marginBottom: 2
        }), this.$resolve.css({
            fontSize: n,
            lineHeight: s,
            width: i,
            margin: "0 auto",
            marginBottom: 10
        })
    }, Hi.prototype.setCopy = function() {
        var t = {
            thanks: Tt.translate("Thank you for your feedback."),
            resolve: Tt.translate("We will look into the issue immediately.")
        };
        this.$copy.text(t.thanks), this.$resolve.text(t.resolve)
    }, pt.proto(Di, hi), Di.prototype.style = function(t, e, i) {
        this.copy.style(t, i)
    }, Di.prototype.setCopy = function() {
        this.copy.setCopy()
    }, Di.prototype.setFocus = function() {
        this.copy.focus()
    };
    var Ri = "https://newassets.hcaptcha.com/captcha/v1/74f6caf/static/images";

    function Vi() {
        pt.self(this, ft, "cookie-icon"), this.$none = this.initComponent(De, {
            selector: ".icon-none",
            src: "data:image/svg+xml,%3csvg width='155' height='155' viewBox='0 0 155 155' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='mask0' mask-type='alpha' maskUnits='userSpaceOnUse' x='3' y='4' width='150' height='149'%3e%3cpath d='M153 78C153 119.421 119.421 153 78 153C36.5786 153 3 119.421 3 78C3 42.6044 27.5196 12.9356 60.5 5.0526C66.1145 3.71061 68 4 69.5 5.0526C71.6884 6.5883 62.5 20 69.5 31.5C76.5 43 89.5 39.5 101.5 53C107.488 59.7371 105.376 73.2409 117.5 79C137.5 88.5 151 71 153 78Z' fill='%23555555'/%3e%3c/mask%3e%3cg mask='url(%23mask0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M78 153C119.421 153 153 119.421 153 78C153 36.5786 119.421 3 78 3C36.5786 3 3 36.5786 3 78C3 119.421 36.5786 153 78 153ZM57 41.5C57 45.6421 53.6421 49 49.5 49C45.3579 49 42 45.6421 42 41.5C42 37.3579 45.3579 34 49.5 34C53.6421 34 57 37.3579 57 41.5ZM83 74C83 79.5228 78.5228 84 73 84C67.4772 84 63 79.5228 63 74C63 68.4772 67.4772 64 73 64C78.5228 64 83 68.4772 83 74ZM54 117C54 122.523 49.5229 127 44 127C38.4772 127 34 122.523 34 117C34 111.477 38.4772 107 44 107C49.5229 107 54 111.477 54 117ZM119.5 122C123.642 122 127 118.642 127 114.5C127 110.358 123.642 107 119.5 107C115.358 107 112 110.358 112 114.5C112 118.642 115.358 122 119.5 122ZM32 83C34.7614 83 37 80.7614 37 78C37 75.2386 34.7614 73 32 73C29.2386 73 27 75.2386 27 78C27 80.7614 29.2386 83 32 83ZM88 111C88 113.761 85.7614 116 83 116C80.2386 116 78 113.761 78 111C78 108.239 80.2386 106 83 106C85.7614 106 88 108.239 88 111Z' fill='%23555555'/%3e%3c/g%3e%3c/svg%3e",
            fallback: Ri + "/cookie-none.png",
            width: 18
        }), this.$blocked = this.initComponent(De, {
            selector: ".icon-blocked",
            src: "data:image/svg+xml,%3csvg width='155' height='155' viewBox='0 0 155 155' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='mask0' mask-type='alpha' maskUnits='userSpaceOnUse' x='3' y='4' width='150' height='149'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M78 153C119.421 153 153 119.421 153 78C152.203 75.2117 149.582 76.3107 145.452 78.0421C139.214 80.6575 129.534 84.7159 117.5 79C115.427 78.0152 113.77 76.804 112.418 75.4389L43.3324 144.524C53.7009 149.939 65.4929 153 78 153ZM26.783 132.789L103.528 56.0443C102.962 54.931 102.304 53.9045 101.5 53C95.5 46.25 89.25 43.75 83.625 41.5C78 39.25 73 37.25 69.5 31.5C64.8464 23.8548 67.3474 15.3646 68.904 10.0807C69.6888 7.41648 70.2336 5.56736 69.5 5.05259C68 3.99999 66.1145 3.7106 60.5 5.05259C27.5196 12.9356 3 42.6044 3 78C3 99.6193 12.1474 119.102 26.783 132.789Z' fill='%23EB4040'/%3e%3c/mask%3e%3cg mask='url(%23mask0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M78 153C119.421 153 153 119.421 153 78C153 36.5786 119.421 3 78 3C36.5786 3 3 36.5786 3 78C3 119.421 36.5786 153 78 153ZM57 41.5C57 45.6421 53.6421 49 49.5 49C45.3579 49 42 45.6421 42 41.5C42 37.3579 45.3579 34 49.5 34C53.6421 34 57 37.3579 57 41.5ZM83 74C83 79.5228 78.5228 84 73 84C67.4772 84 63 79.5228 63 74C63 68.4772 67.4772 64 73 64C78.5228 64 83 68.4772 83 74ZM54 117C54 122.523 49.5229 127 44 127C38.4772 127 34 122.523 34 117C34 111.477 38.4772 107 44 107C49.5229 107 54 111.477 54 117ZM119.5 122C123.642 122 127 118.642 127 114.5C127 110.358 123.642 107 119.5 107C115.358 107 112 110.358 112 114.5C112 118.642 115.358 122 119.5 122ZM32 83C34.7614 83 37 80.7614 37 78C37 75.2386 34.7614 73 32 73C29.2386 73 27 75.2386 27 78C27 80.7614 29.2386 83 32 83ZM88 111C88 113.761 85.7614 116 83 116C80.2386 116 78 113.761 78 111C78 108.239 80.2386 106 83 106C85.7614 106 88 108.239 88 111Z' fill='%23E25C5C'/%3e%3c/g%3e%3crect x='140.572' y='19' width='13' height='179' transform='rotate(45 140.572 19)' fill='%23555555'/%3e%3c/svg%3e",
            fallback: Ri + "/cookie-blocked.png",
            width: 18
        }), this.$found = this.initComponent(De, {
            selector: ".icon-found",
            src: "data:image/svg+xml,%3csvg width='155' height='155' viewBox='0 0 155 155' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='mask0' mask-type='alpha' maskUnits='userSpaceOnUse' x='3' y='4' width='150' height='149'%3e%3cpath d='M153 78C153 119.421 119.421 153 78 153C36.5786 153 3 119.421 3 78C3 42.6044 27.5196 12.9356 60.5 5.05259C66.1145 3.7106 68 3.99999 69.5 5.05259C71.6884 6.58829 62.5 20 69.5 31.5C76.5 43 89.5 39.5 101.5 53C107.488 59.737 105.376 73.2409 117.5 79C137.5 88.5 151 71 153 78Z' fill='%23555555'/%3e%3c/mask%3e%3cg mask='url(%23mask0)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M78 153C119.421 153 153 119.421 153 78C153 36.5786 119.421 3 78 3C36.5786 3 3 36.5786 3 78C3 119.421 36.5786 153 78 153ZM57 41.5C57 45.6421 53.6421 49 49.5 49C45.3579 49 42 45.6421 42 41.5C42 37.3579 45.3579 34 49.5 34C53.6421 34 57 37.3579 57 41.5ZM83 74C83 79.5228 78.5228 84 73 84C67.4772 84 63 79.5228 63 74C63 68.4772 67.4772 64 73 64C78.5228 64 83 68.4772 83 74ZM54 117C54 122.523 49.5229 127 44 127C38.4772 127 34 122.523 34 117C34 111.477 38.4772 107 44 107C49.5229 107 54 111.477 54 117ZM119.5 122C123.642 122 127 118.642 127 114.5C127 110.358 123.642 107 119.5 107C115.358 107 112 110.358 112 114.5C112 118.642 115.358 122 119.5 122ZM32 83C34.7614 83 37 80.7614 37 78C37 75.2386 34.7614 73 32 73C29.2386 73 27 75.2386 27 78C27 80.7614 29.2386 83 32 83ZM88 111C88 113.761 85.7614 116 83 116C80.2386 116 78 113.761 78 111C78 108.239 80.2386 106 83 106C85.7614 106 88 108.239 88 111Z' fill='%2300838f'/%3e%3c/g%3e%3c/svg%3e",
            fallback: Ri + "/cookie-found.png",
            width: 18
        }), "ie" === I.Browser.type && 8 === I.Browser.version ? (this.$none.css({
            display: "none"
        }), this.$blocked.css({
            display: "none"
        }), this.$found.css({
            display: "none"
        })) : (this.$none.css({
            opacity: 0
        }), this.$blocked.css({
            opacity: 0
        }), this.$found.css({
            opacity: 0
        }))
    }
    pt.proto(Vi, ft), Vi.prototype.style = function() {
        this.css({
            width: 18,
            height: 18,
            display: "inline",
            position: "relative",
            background: "rgba(0,0,0,0)"
        });
        var t = {
            "-ms-high-contrast-adjust": "none",
            position: "absolute",
            left: 0,
            top: 0
        };
        this.$none.css(t), this.$blocked.css(t), this.$found.css(t)
    }, Vi.prototype.display = function(t) {
        "ie" === I.Browser.type && 8 === I.Browser.version ? (this.$none.css({
            display: "none" === t ? "block" : "none"
        }), this.$blocked.css({
            display: "blocked" === t ? "block" : "none"
        }), this.$found.css({
            display: "found" === t ? "block" : "none"
        })) : (this.$none.css({
            opacity: "none" === t ? 1 : 0
        }), this.$blocked.css({
            opacity: "blocked" === t ? 1 : 0
        }), this.$found.css({
            opacity: "found" === t ? 1 : 0
        }))
    };
    var zi = {
            noAccess: "Accessibility cookie is not set. {{retrieve-cookie}}",
            hasAccess: "Cookies are disabled or the accessibility cookie is not set. {{enable-cookies}}"
        },
        Ni = "Accessibility cookie is set. For help, please email {{support}}",
        Wi = "support@hcaptcha.com";

    function Ui() {
        pt.self(this, ft, "status");
        var t = this;
        this.state = {
            hasCookie: !1,
            hasAccess: !1,
            allowedAccess: !1
        }, this.$header = this.createElement(".header"), this.$header.copy = this.$header.createElement(".text"), this.$header.setAttribute("aria-hidden", !0), this.icon = this.initComponent(Vi, null, this.$header), this.retrieve = this.initComponent(ui, {
            text: zi.noAccess,
            link: !0,
            linkText: "Retrieve accessibility cookie.",
            linkUnderline: !0,
            linkTo: "https://dashboard.hcaptcha.com/signup?type=accessibility",
            replaceText: "retrieve-cookie"
        }), this.disabled = this.initComponent(ui, {
            text: zi.hasAccess,
            link: !0,
            linkText: "Enable cross-site cookies.",
            linkUnderline: !0,
            replaceText: "enable-cookies"
        }), this.help = this.initComponent(ui, {
            text: Ni,
            link: !0,
            linkText: Wi,
            linkUnderline: !0,
            linkTo: "mailto:" + Wi,
            replaceText: "support"
        }), this.retrieve.dom.id = "status-retrieve", this.disabled.dom.id = "status-disabled", this.help.dom.id = "status-help", this.disabled.on("click", (function() {
            z.requestAccess().then((function() {
                t.setType()
            }))
        }))
    }
    pt.proto(Ui, ft), Ui.prototype.style = function(t) {
        this.css({
            fontSize: t,
            color: "#555555"
        }), this.$header.css({
            fontWeight: 600,
            marginBottom: 5
        }), this.$header.copy.css({
            display: "inline",
            position: "relative"
        }), this.icon.style(), this.icon.css({
            top: -2,
            marginLeft: 5
        }), this.retrieve.style(t, "left"), this.disabled.style(t, "left"), this.help.style(t, "left");
        var e = this.state.hasCookie;
        this.help.css({
            display: e ? "block" : "none"
        });
        var i = !this.state.hasCookie && (!this.hasAccess || this.state.hasAccess && !this.state.allowedAccess);
        this.retrieve.css({
            display: i ? "block" : "none"
        });
        var n = !this.state.hasCookie && this.state.hasAccess && !this.state.allowedAccess;
        this.disabled.css({
            display: n ? "block" : "none"
        })
    }, Ui.prototype.checkAccess = function() {
        var t = this;
        _e.contact("get-ac").then((function(e) {
            t.state.hasCookie = !!e, z.supportsAPI() ? (t.state.hasAccess = !0, z.hasAccess().then((function(e) {
                t.state.allowedAccess = e, t.setType()
            }))) : (t.state.hasAccess = !1, t.setType())
        }))
    }, Ui.prototype.setType = function() {
        this.$header.copy.text(Tt.translate("Status:"));
        var t = this.state.hasCookie;
        this.help.css({
            display: t ? "block" : "none"
        });
        var e = !this.state.hasCookie && (!this.hasAccess || this.state.hasAccess && !this.state.allowedAccess);
        this.retrieve.css({
            display: e ? "block" : "none"
        });
        var i = !this.state.hasCookie && this.state.hasAccess && !this.state.allowedAccess;
        this.disabled.css({
            display: i ? "block" : "none"
        });
        var n = this.state.hasCookie ? "found" : this.state.hasAccess ? "blocked" : "none";
        this.icon.display(n)
    }, Ui.prototype.translate = function() {
        this.$header.copy.text(Tt.translate("Status:")), this.retrieve.translate(), this.disabled.translate(), this.help.translate()
    };

    function qi() {
        pt.self(this, ft, "accessibility"), this.copy = this.initComponent(ui, {
            text: "To bypass our visual challenge, we offer an accessibility cookie.",
            link: !0,
            linkText: "Learn more about hCaptcha Accessibility.",
            linkUnderline: !0,
            linkTo: "https://hcaptcha.com/accessibility"
        }), this.status = this.initComponent(Ui), this.status.checkAccess()
    }

    function Zi() {
        pt.self(this, ft, "challenge-modal"), this.modalContent = null, this.state = {
            visible: !1,
            curr: null,
            prev: null
        }, this.config = {
            width: 0,
            height: 0,
            mobile: !1
        }, this.display = this.display.bind(this), this.close = this.close.bind(this), this.$container = this.createElement(".container"), this.modal = this.initComponent(hi, null, this.$container), this.modal.on("close", this.close), this.$bg = this.createElement(".modal-bg"), this.$bg.addEventListener("click", this.close);
        var t = "ie" === I.Browser.type && 8 === I.Browser.version;
        this.css({
            visibility: "hidden",
            display: t ? "none" : "table",
            zIndex: -1
        })
    }
    pt.proto(qi, ft), qi.prototype.style = function(t, e, i) {
        var n = Math.floor(it(t, 250, 275, 12, 14));
        this.copy.style(n, "left"), this.copy.css({
            position: "relative",
            display: "inline"
        }), this.status.style(n), this.status.css({
            marginTop: 10
        })
    }, qi.prototype.setCopy = function() {
        this.copy.translate(), this.status.translate()
    }, pt.proto(Zi, ft), Zi.prototype.load = function() {
        this.modal.load()
    }, Zi.prototype.style = function(t, e, i) {
        var n = it(t, 300, 450, 290, 375),
            s = it(e, 275, 300, 260, 275),
            o = n - 2 * it(t, 300, 450, 20, 25),
            r = "ie" === I.Browser.type && 8 === I.Browser.version;
        this.css({
            position: "absolute",
            width: "100%",
            height: "100%",
            display: r && !this.state.visible ? "none" : "table",
            top: 0,
            left: 0
        }), this.$container.css({
            display: "table-cell",
            verticalAlign: "middle"
        }), this.$bg.css({
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "#000",
            opacity: 0,
            zindex: 0,
            cursor: "pointer"
        }), this.config.width = o, this.config.height = s, this.config.mobile = i, this._styleContent()
    }, Zi.prototype._styleContent = function() {
        this.modal.style(this.config.width, this.config.height), this.modalContent && this.modalContent.style(this.config.width, this.config.height, this.config.mobile)
    }, Zi.prototype.close = function() {
        if (this.state.visible) {
            this.state.visible = !1, this.modalContent && (this.modalContent.off("close", this.close), this.modalContent = this.modalContent.destroy());
            var t = "ie" === I.Browser.type && 8 === I.Browser.version;
            this.css({
                visibility: "hidden",
                display: t ? "none" : "table",
                zIndex: -1
            }), "report_image" === this.state.prev && "thanks" === this.state.curr && this.emit("refresh"), this.emit("close")
        }
    }, Zi.prototype.display = function(t, e) {
        var i = null;
        this.modalContent && (this.modalContent = this.modalContent.destroy()), this.state.prev = this.state.curr, this.state.curr = t;
        var n = null;
        "info" === t ? (i = fi, n = "Information") : "feedback" === t ? (i = Li, n = "Feedback") : "report_bug" === t ? (i = Pi, n = "Software Bug") : "report_image" === t ? (i = $i, n = "Tell Us Why") : t.indexOf("thanks") >= 0 ? i = Di : t.indexOf("accessibility") >= 0 && (i = qi, n = "Accessibility"), this.state.visible && (this.modal.destroy(), this.modal = this.initComponent(hi, null, this.$container), this.modal.load(), this.modal.on("close", this.close)), this.modalContent = this.initComponent(i, e, this.modal.$content), this.modal.setTitle(n), this.modalContent.setCopy(), this.modalContent.on("close", this.close), this.modalContent.on("change", this.display), this._styleContent(), this.css({
            visibility: "visible",
            display: "table",
            zIndex: 200
        }), this.modal.focus(), this.state.visible = !0, this.emit("open")
    }, Zi.prototype.isOpen = function() {
        return this.state.visible
    };

    function Ji() {
        pt.self(this, Ne, {
            title: "Refresh Challenge.",
            name: "refresh",
            src: "data:image/svg+xml,%3csvg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M20.9148 19.6529C20.9994 19.7239 21.0106 19.8501 20.9381 19.9335C19.5234 21.5598 17.6702 22.7467 15.5981 23.3506C13.4619 23.9733 11.1891 23.9485 9.06708 23.2794C6.94502 22.6103 5.06902 21.327 3.67632 19.5917C2.28361 17.8564 1.43675 15.7471 1.24283 13.5306C1.0489 11.314 1.51662 9.08969 2.58684 7.13894C3.65706 5.18818 5.28171 3.5986 7.25535 2.57119C9.22898 1.54378 11.463 1.12469 13.6748 1.36692C15.8203 1.6019 17.8514 2.44889 19.527 3.80487C19.6129 3.87435 19.6238 4.00065 19.5528 4.08527L18.3637 5.50245C18.2927 5.58707 18.1666 5.5979 18.0805 5.5288C16.746 4.45867 15.1329 3.79007 13.4298 3.60355C11.6604 3.40977 9.87319 3.74503 8.29428 4.56696C6.71537 5.38889 5.41565 6.66056 4.55948 8.22116C3.7033 9.78176 3.32913 11.5612 3.48427 13.3345C3.63941 15.1077 4.3169 16.7952 5.43106 18.1834C6.54522 19.5716 8.04602 20.5982 9.74367 21.1335C11.4413 21.6688 13.2596 21.6886 14.9685 21.1905C16.6133 20.7111 18.0858 19.7725 19.2142 18.4869C19.287 18.4039 19.413 18.3927 19.4976 18.4637L20.9148 19.6529Z' fill='%23787878'/%3e%3cpath d='M22.7248 7.93974C22.7557 8.07007 22.6522 8.19336 22.5185 8.18555L14.9712 7.74462C14.807 7.73502 14.7239 7.54239 14.8297 7.4164L20.6321 0.501257C20.7379 0.375269 20.942 0.423631 20.98 0.583657L22.7248 7.93974Z' fill='%23787878'/%3e%3c/svg%3e",
            theme: He,
            width: 35,
            height: 35,
            selectable: !1
        })
    }

    function Ki(t) {
        var e = t.palette,
            i = t.component;
        return Fe.merge({
            main: {
                fill: e.primary.main,
                text: e.common.white,
                border: e.primary.main
            },
            hover: {
                fill: e.primary.main,
                text: e.common.white,
                border: e.primary.main
            }
        }, i.verifyButton)
    }

    function Xi(t) {
        var e = t.palette,
            i = t.component;
        return Fe.merge({
            main: {
                fill: e.grey[700],
                text: e.common.white,
                border: e.grey[700]
            },
            hover: {
                fill: e.grey[800],
                text: e.common.white,
                border: e.grey[800]
            }
        }, i.skipButton)
    }

    function Yi() {
        pt.self(this, ft, "button-submit"), this.state = {
            text: "Check",
            type: "check",
            label: "Submit Answers",
            locked: !1
        }, this._verifyStyle = Ki(He.get()), this._skipStyle = Xi(He.get()), this.copy = this.createElement(".text"), this.addClass("button"), this.setAttribute("tabindex", 0), this.setAttribute("role", "button"), this.setLabel.call(this), this.onHover = this.onHover.bind(this), this.onSelect = this.onSelect.bind(this), this.addEventListener("click", this.onSelect), this.addEventListener("enter", this.onSelect), !1 === I.System.mobile && (this.addEventListener("over", this.onHover), this.addEventListener("out", this.onHover))
    }
    pt.proto(Ji, Ne), pt.proto(Yi, ft), Yi.prototype.style = function(t) {
        var e = t ? 30 : 35,
            i = "check" === this.state.type || "next" === this.state.type;
        this._verifyStyle = Ki(He.get()), this._skipStyle = Xi(He.get()), this.css({
            height: e,
            cursor: "pointer",
            minWidth: t ? 50 : 70,
            padding: "0px 5px",
            borderRadius: 4,
            border: "none"
        });
        var n = i ? this._verifyStyle.main.text : this._skipStyle.main.text;
        this.copy.css({
            color: n,
            width: "100%",
            height: "100%",
            textAlign: "center",
            position: "relative",
            pointerEvents: "none",
            lineHeight: e,
            fontSize: 14,
            fontWeight: 600,
            zIndex: 5
        }), this.height = e
    }, Yi.prototype.action = function(t) {
        var e, i = t.charAt(0).toUpperCase() + t.slice(1),
            n = "check" === t || "next" === t || "report" === t ? this._verifyStyle.main.fill : this._skipStyle.main.fill;
        "check" === t ? e = "Submit Answers" : "next" === t ? e = "Next Challenge" : "report" === t ? e = "Report Images" : (e = "Skip Challenge", t = "skip"), this.state.type = t, this.state.text = i, this.state.label = e, this.css({
            backgroundColor: n
        }), this.setLabel.call(this)
    }, Yi.prototype.onHover = function(t) {
        if (null !== this.emit && !0 !== this.state.locked) {
            var e = "over" === t.action,
                i = "check" === this.state.type || "next" === this.state.type ? this._verifyStyle : this._skipStyle,
                n = e ? "hover" : "main";
            this.css({
                backgroundColor: i[n].fill
            })
        }
    }, Yi.prototype.onSelect = function(t) {
        null !== this.emit && !0 !== this.state.locked && this.emit("click", t)
    }, Yi.prototype.setLock = function(t) {
        this.state.locked = t;
        var e = "check" === this.state.type || "next" === this.state.type ? this._verifyStyle : this._skipStyle;
        this.css({
            cursor: t ? "default" : "pointer",
            backgroundColor: e.main.fill
        })
    }, Yi.prototype.setLabel = function() {
        var t = Tt.translate(this.state.text),
            e = Tt.translate(this.state.label);
        Tt.getLocale().indexOf("en") >= 0 && "check" === this.state.type && (t = "Verify"), this.copy.text(t), this.setAttribute("title", e)
    }, Yi.prototype.getElement = function() {
        return this && this.dom || null
    };

    function Gi() {
        pt.self(this, Ne, {
            selector: "#menu-info",
            title: "Get information about hCaptcha and accessibility options.",
            name: "info",
            src: "data:image/svg+xml,%3csvg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='12.5' cy='21.6' r='2' fill='%23787878'/%3e%3ccircle cx='12.5' cy='12.5' r='2' fill='%23787878'/%3e%3ccircle cx='12.5' cy='3.40002' r='2' fill='%23787878'/%3e%3c/svg%3e",
            theme: He,
            width: 35,
            height: 35
        })
    }

    function Qi() {
        pt.self(this, We, {
            selector: "display-language",
            theme: He,
            width: 26,
            height: 16
        });
        var t = this;
        this.on("style", (function() {
            t.css({
                display: "block"
            })
        }))
    }

    function tn() {
        pt.self(this, ft, "language-selector");
        var t = this;
        this.state = {
            locked: !1
        }, this.list = this.initComponent(I.System.mobile ? Ue : oi, {
            theme: He,
            selector: "#language-list",
            optionsVisible: 5
        }), this.display = this.initComponent(Qi), this.display.ownsListBox(this.list);
        var e = [];
        for (var i in Ot) e.push({
            value: i,
            text: Ot[i]
        });
        this.list.setOptions(e), this.list.on("select", (function(e) {
            t.display.setLocale(e.value), e.value !== Tt.getLocale() && (Tt.setLocale(e.value), _e.send("challenge-language", {
                locale: e.value
            }))
        })), this.display.on("click", (function(e) {
            e.selected ? (t.list.usingKb(e.usingKb), t.list.open()) : t.list.hide()
        })), this.list.on("hide", (function() {
            t.display.reset()
        })), this.style(), this.updateLocale()
    }
    pt.proto(Gi, Ne), pt.proto(Qi, We), Qi.prototype.setLocale = function(t) {
        this.setText(Tt.getShortLocale(t).toUpperCase())
    }, pt.proto(tn, ft), tn.prototype.style = function(t) {
        this.display.style(), this.css({
            position: "relative",
            display: "inline-block",
            top: t ? 5 : 10,
            left: 0,
            zIndex: 100
        }), this.list.style(), this.list.css({
            bottom: 30
        })
    }, tn.prototype.setLabel = function() {
        var t = this.list.getSelected().text,
            e = Tt.translate("Select a language {{language}}", {
                language: t
            });
        this.display.setLabel(e), this.display.setTitle(Tt.translate("Language"))
    }, tn.prototype.updateLocale = function() {
        this.list.select(Tt.getLocale())
    }, tn.prototype.setVisible = function(t) {
        this.css({
            display: t ? "block" : "none "
        })
    }, tn.prototype.setLock = function(t) {
        this.state.locked = t, t ? this.list.setAttribute("disabled", t) : this.list.removeAttribute("disabled")
    };

    function en(t) {
        pt.self(this, ft, "hcaptcha-logo"), this.mobile = !1, this.charity = t;
        var e = this.charity ? "data:image/svg+xml,%3csvg id='logo_charity' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'%3e%3crect x='306.25' y='418.75' width='56.25' height='56.25' style='fill:%230074bf%3bopacity:0.5%3bisolation:isolate'/%3e%3crect x='250' y='418.75' width='56.25' height='56.25' style='fill:%230074bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='193.75' y='418.75' width='56.25' height='56.25' style='fill:%230074bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='137.5' y='418.75' width='56.25' height='56.25' style='fill:%230074bf%3bopacity:0.5%3bisolation:isolate'/%3e%3crect x='362.5' y='362.5' width='56.25' height='56.25' style='fill:%230082bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='306.25' y='362.5' width='56.25' height='56.25' style='fill:%230082bf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='250' y='362.5' width='56.25' height='56.25' style='fill:%230082bf'/%3e%3crect x='193.75' y='362.5' width='56.25' height='56.25' style='fill:%230082bf'/%3e%3crect x='137.5' y='362.5' width='56.25' height='56.25' style='fill:%230082bf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='81.25' y='362.5' width='56.25' height='56.25' style='fill:%230082bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='418.75' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf%3bopacity:0.5%3bisolation:isolate'/%3e%3crect x='362.5' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='306.25' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf'/%3e%3crect x='250' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf'/%3e%3crect x='193.75' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf'/%3e%3crect x='137.5' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf'/%3e%3crect x='81.25' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='25' y='306.25' width='56.25' height='56.25' style='fill:%23008fbf%3bopacity:0.5%3bisolation:isolate'/%3e%3crect x='418.75' y='250' width='56.25' height='56.25' style='fill:%23009dbf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='362.5' y='250' width='56.25' height='56.25' style='fill:%23009dbf'/%3e%3crect x='306.25' y='250' width='56.25' height='56.25' style='fill:%23009dbf'/%3e%3crect x='250' y='250' width='56.25' height='56.25' style='fill:%23009dbf'/%3e%3crect x='193.75' y='250' width='56.25' height='56.25' style='fill:%23009dbf'/%3e%3crect x='137.5' y='250' width='56.25' height='56.25' style='fill:%23009dbf'/%3e%3crect x='81.25' y='250' width='56.25' height='56.25' style='fill:%23009dbf'/%3e%3crect x='25' y='250' width='56.25' height='56.25' style='fill:%23009dbf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='418.75' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='362.5' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf'/%3e%3crect x='306.25' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf'/%3e%3crect x='250' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf'/%3e%3crect x='193.75' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf'/%3e%3crect x='137.5' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf'/%3e%3crect x='81.25' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf'/%3e%3crect x='25' y='193.75' width='56.25' height='56.25' style='fill:%2300abbf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='418.75' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf%3bopacity:0.5%3bisolation:isolate'/%3e%3crect x='362.5' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='306.25' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf'/%3e%3crect x='250' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf'/%3e%3crect x='193.75' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf'/%3e%3crect x='137.5' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf'/%3e%3crect x='81.25' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='25' y='137.5' width='56.25' height='56.25' style='fill:%2300b9bf%3bopacity:0.5%3bisolation:isolate'/%3e%3crect x='362.5' y='81.25' width='56.25' height='56.25' style='fill:%2300c6bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='306.25' y='81.25' width='56.25' height='56.25' style='fill:%2300c6bf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='250' y='81.25' width='56.25' height='56.25' style='fill:%2300c6bf'/%3e%3crect x='193.75' y='81.25' width='56.25' height='56.25' style='fill:%2300c6bf'/%3e%3crect x='137.5' y='81.25' width='56.25' height='56.25' style='fill:%2300c6bf%3bopacity:0.800000011920929%3bisolation:isolate'/%3e%3crect x='81.25' y='81.25' width='56.25' height='56.25' style='fill:%2300c6bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='306.25' y='25' width='56.25' height='56.25' style='fill:%2300d4bf%3bopacity:0.5%3bisolation:isolate'/%3e%3crect x='250' y='25' width='56.25' height='56.25' style='fill:%2300d4bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='193.75' y='25' width='56.25' height='56.25' style='fill:%2300d4bf%3bopacity:0.699999988079071%3bisolation:isolate'/%3e%3crect x='137.5' y='25' width='56.25' height='56.25' style='fill:%2300d4bf%3bopacity:0.5%3bisolation:isolate'/%3e%3cpath d='M190.87%2c158.6c36.33%2c0%2c46.52%2c26.05%2c59.6%2c34.41%2c12.11-8.36%2c22.29-34.41%2c59.59-34.41%2c36.34%2c0%2c65.18%2c29.8%2c66%2c67%2c2.78%2c54-90.26%2c135.93-125.63%2c159.19-36.34-23.26-128.42-105.16-126.6-159.19C125.69%2c188.4%2c153.56%2c158.6%2c190.87%2c158.6Z' style='fill:white'/%3e%3c/svg%3e" : "data:image/svg+xml,%3csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath opacity='0.5' d='M24 28H20V32H24V28Z' fill='%230074BF'/%3e%3cpath opacity='0.7' d='M20 28H16V32H20V28Z' fill='%230074BF'/%3e%3cpath opacity='0.7' d='M16 28H12V32H16V28Z' fill='%230074BF'/%3e%3cpath opacity='0.5' d='M12 28H8V32H12V28Z' fill='%230074BF'/%3e%3cpath opacity='0.7' d='M28 24H24V28H28V24Z' fill='%230082BF'/%3e%3cpath opacity='0.8' d='M24 24H20V28H24V24Z' fill='%230082BF'/%3e%3cpath d='M20 24H16V28H20V24Z' fill='%230082BF'/%3e%3cpath d='M16 24H12V28H16V24Z' fill='%230082BF'/%3e%3cpath opacity='0.8' d='M12 24H8V28H12V24Z' fill='%230082BF'/%3e%3cpath opacity='0.7' d='M8 24H4V28H8V24Z' fill='%230082BF'/%3e%3cpath opacity='0.5' d='M32 20H28V24H32V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.8' d='M28 20H24V24H28V20Z' fill='%23008FBF'/%3e%3cpath d='M24 20H20V24H24V20Z' fill='%23008FBF'/%3e%3cpath d='M20 20H16V24H20V20Z' fill='%23008FBF'/%3e%3cpath d='M16 20H12V24H16V20Z' fill='%23008FBF'/%3e%3cpath d='M12 20H8V24H12V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.8' d='M8 20H4V24H8V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.5' d='M4 20H0V24H4V20Z' fill='%23008FBF'/%3e%3cpath opacity='0.7' d='M32 16H28V20H32V16Z' fill='%23009DBF'/%3e%3cpath d='M28 16H24V20H28V16Z' fill='%23009DBF'/%3e%3cpath d='M24 16H20V20H24V16Z' fill='%23009DBF'/%3e%3cpath d='M20 16H16V20H20V16Z' fill='%23009DBF'/%3e%3cpath d='M16 16H12V20H16V16Z' fill='%23009DBF'/%3e%3cpath d='M12 16H8V20H12V16Z' fill='%23009DBF'/%3e%3cpath d='M8 16H4V20H8V16Z' fill='%23009DBF'/%3e%3cpath opacity='0.7' d='M4 16H0V20H4V16Z' fill='%23009DBF'/%3e%3cpath opacity='0.7' d='M32 12H28V16H32V12Z' fill='%2300ABBF'/%3e%3cpath d='M28 12H24V16H28V12Z' fill='%2300ABBF'/%3e%3cpath d='M24 12H20V16H24V12Z' fill='%2300ABBF'/%3e%3cpath d='M20 12H16V16H20V12Z' fill='%2300ABBF'/%3e%3cpath d='M16 12H12V16H16V12Z' fill='%2300ABBF'/%3e%3cpath d='M12 12H8V16H12V12Z' fill='%2300ABBF'/%3e%3cpath d='M8 12H4V16H8V12Z' fill='%2300ABBF'/%3e%3cpath opacity='0.7' d='M4 12H0V16H4V12Z' fill='%2300ABBF'/%3e%3cpath opacity='0.5' d='M32 8H28V12H32V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.8' d='M28 8H24V12H28V8Z' fill='%2300B9BF'/%3e%3cpath d='M24 8H20V12H24V8Z' fill='%2300B9BF'/%3e%3cpath d='M20 8H16V12H20V8Z' fill='%2300B9BF'/%3e%3cpath d='M16 8H12V12H16V8Z' fill='%2300B9BF'/%3e%3cpath d='M12 8H8V12H12V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.8' d='M8 8H4V12H8V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.5' d='M4 8H0V12H4V8Z' fill='%2300B9BF'/%3e%3cpath opacity='0.7' d='M28 4H24V8H28V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.8' d='M24 4H20V8H24V4Z' fill='%2300C6BF'/%3e%3cpath d='M20 4H16V8H20V4Z' fill='%2300C6BF'/%3e%3cpath d='M16 4H12V8H16V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.8' d='M12 4H8V8H12V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.7' d='M8 4H4V8H8V4Z' fill='%2300C6BF'/%3e%3cpath opacity='0.5' d='M24 0H20V4H24V0Z' fill='%2300D4BF'/%3e%3cpath opacity='0.7' d='M20 0H16V4H20V0Z' fill='%2300D4BF'/%3e%3cpath opacity='0.7' d='M16 0H12V4H16V0Z' fill='%2300D4BF'/%3e%3cpath opacity='0.5' d='M12 0H8V4H12V0Z' fill='%2300D4BF'/%3e%3cpath d='M10.5141 14.9697L11.6379 12.4572C12.0459 11.8129 11.9958 11.0255 11.5449 10.5745C11.4876 10.5173 11.416 10.46 11.3444 10.4171C11.0366 10.2238 10.6572 10.1808 10.3065 10.2954C9.91993 10.4171 9.58349 10.6748 9.36875 11.0184C9.36875 11.0184 7.82972 14.6046 7.26421 16.2153C6.69871 17.8259 6.92062 20.7822 9.12536 22.987C11.4661 25.3277 14.8448 25.8575 17.0066 24.2397C17.0997 24.1967 17.1784 24.1395 17.2572 24.0751L23.9072 18.5202C24.2293 18.2554 24.7089 17.7042 24.2794 17.0743C23.8642 16.4586 23.0697 16.881 22.7404 17.0886L18.9107 19.8731C18.8391 19.9304 18.7318 19.9232 18.6673 19.8517C18.6673 19.8517 18.6673 19.8445 18.6602 19.8445C18.56 19.7228 18.5456 19.4079 18.696 19.2862L24.5657 14.304C25.074 13.8459 25.1456 13.1802 24.7304 12.7292C24.3295 12.2854 23.6924 12.2997 23.1842 12.7578L17.9157 16.881C17.8155 16.9597 17.6652 16.9454 17.5864 16.8452L17.5793 16.838C17.4719 16.7235 17.4361 16.5231 17.5506 16.4014L23.535 10.596C24.0074 10.1522 24.036 9.4149 23.5922 8.94245C23.3775 8.72054 23.084 8.59169 22.7762 8.59169C22.4612 8.59169 22.1606 8.70623 21.9387 8.92813L15.8255 14.6691C15.6823 14.8122 15.396 14.6691 15.3602 14.4973C15.3459 14.4328 15.3674 14.3684 15.4103 14.3255L20.0918 8.99972C20.5571 8.56306 20.5858 7.83292 20.1491 7.36763C19.7124 6.90234 18.9823 6.87371 18.517 7.31036C18.4955 7.32468 18.4812 7.34615 18.4597 7.36763L11.3659 15.2203C11.1082 15.478 10.736 15.4851 10.557 15.342C10.4425 15.2489 10.4282 15.0843 10.5141 14.9697Z' fill='white'/%3e%3c/svg%3e",
            i = "https://newassets.hcaptcha.com/captcha/v1/74f6caf/static/images" + (this.charity ? "/icon-charity" : "/icon") + ".png";
        this.color = this.initComponent(De, {
            selector: ".logo",
            src: e,
            width: 32,
            fallback: i,
            autoLoad: !1
        })
    }

    function nn(t) {
        pt.self(this, ft, "hcaptcha-logo"), this.mobile = !1, this.link = "https://www.hcaptcha.com/what-is-hcaptcha-about", this.config = t || {}, this.config.charity = this.config.charity !== undefined && this.config.charity, this.icon = this.initComponent(en, this.config.charity), this.onClick = this.onClick.bind(this), this.addEventListener("click", this.onClick)
    }

    function sn() {
        pt.self(this, ft, "display-error"), this.visible = !1, this.setAttribute("aria-hidden", !0), this.setAttribute("role", "alert"), this.copy = this.createElement(".error-text"), this.appendElement(this.copy), this.setCopy.call(this), this.css({
            opacity: 0
        })
    }

    function on() {
        pt.self(this, ft, "Crumb"), this.$bg = this.createElement(".crumb-bg")
    }

    function rn() {
        pt.self(this, ft, "challenge-breadcrumbs"), this.width = 0, this.height = 0, this.crumbs = [], this.$wrapper = this.createElement(".crumbs-wrapper")
    }
    pt.proto(en, ft), en.prototype.load = function() {
        this.color.load()
    }, en.prototype.style = function(t) {
        this.mobile = t;
        var e = 32;
        return this.css({
            width: e,
            height: e,
            position: "absolute",
            top: 0,
            left: 0
        }), this.color.css({
            "-ms-high-contrast-adjust": "none",
            width: e,
            height: e,
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 5
        }), {
            width: e,
            height: e
        }
    }, pt.proto(nn, ft), nn.prototype.load = function() {
        this.icon.load()
    }, nn.prototype.style = function(t, e) {
        t !== undefined && (this.mobile = t);
        var i = this.icon.style(this.mobile);
        this.css({
            display: e ? "block" : "none",
            width: i.width,
            height: i.height,
            left: "50%",
            marginLeft: -i.width / 2,
            cursor: "pointer",
            position: "absolute"
        }), this.height = i.height
    }, nn.prototype.onClick = function(t) {
        null !== this.fireEvent && window.open(this.link)
    }, pt.proto(sn, ft), sn.prototype.style = function(t) {
        var e = He.get().palette;
        this.css({
            fontSize: t,
            color: e.warn.main,
            width: "100%",
            textAlign: "right"
        })
    }, sn.prototype.display = function(t) {
        this.css({
            opacity: t ? 1 : 0
        }), this.visible = t, this.setAttribute("aria-hidden", !t)
    }, sn.prototype.setCopy = function() {
        var t = Tt.translate("Please try again.");
        this.copy.text(t)
    }, pt.proto(on, ft), on.prototype.style = function(t) {
        this.css({
            width: t,
            height: t,
            overflow: "hidden",
            borderRadius: "50%"
        }), this.$bg.css({
            width: t,
            height: t
        })
    }, on.prototype.active = function(t) {
        var e = function(t) {
            var e = t.palette,
                i = t.component;
            return Fe.merge({
                main: {
                    fill: e.grey[200]
                },
                active: {
                    fill: e.primary.main
                }
            }, i.breadcrumb)
        }(He.get());
        this.$bg.css({
            backgroundColor: t ? e.active.fill : e.main.fill
        })
    }, on.prototype.hide = function() {
        this.css({
            opacity: 0
        })
    }, pt.proto(rn, ft), rn.prototype.createCrumbs = function(t) {
        this.display = !0;
        for (var e = null, i = 0; i < t; i++) e = this.initComponent(on, null, this.$wrapper), this.crumbs.push(e)
    }, rn.prototype.removeCrumbs = function() {
        if (this.display = !1, 0 !== this.crumbs.length) {
            for (var t = -1; ++t < this.crumbs.length;) this.crumbs[t].destroy();
            this.crumbs = []
        }
    }, rn.prototype.style = function(t, e) {
        for (var i = e ? 6 : 7, n = e ? 4 : 5, s = -1; ++s < this.crumbs.length;) this.crumbs[s].style(i), this.crumbs[s].css({
            left: s * i + s * n,
            top: 0,
            position: "absolute"
        });
        this.css({
            width: t,
            height: i
        });
        var o = this.crumbs.length * i + n * (this.crumbs.length - 1);
        this.$wrapper.css({
            width: o,
            height: i,
            position: "absolute",
            left: (t - o) / 2
        }), this.height = i, this.width = t, this.mobile = e
    }, rn.prototype.setIndex = function(t) {
        for (var e = -1; ++e < this.crumbs.length;) this.crumbs[e].active(t === e)
    }, rn.prototype.hide = function() {
        for (var t = -1; ++t < this.crumbs.length;) this.crumbs[t].hide()
    };
    var an = [{
        text: "Accessibility",
        value: "accessibility",
        selector: "#accessibility",
        type: "modal"
    }, {
        text: "Report Image",
        value: "report_image",
        selector: "#report_image",
        type: "custom",
        warn: !0
    }, {
        text: "Report Bug",
        value: "report_bug",
        selector: "#report_bug",
        type: "modal"
    }, {
        text: "Information",
        value: "info",
        selector: "#info",
        type: "modal"
    }];

    function ln() {
        pt.self(this, oi, {
            isMenu: !0,
            theme: He,
            selector: "#menu",
            optionsVisible: -1
        }), this.state.a11yChallenge = !1, this.options = [], this.on("select", (function(t) {
            t && ("link" === t.type ? window.open(t.value) : "modal" === t.type ? this.emit("display", t.value) : "challenge" === t.type && "text_challenge" === t.value && (F.a11y_tfe = !0, this.emit("refresh")))
        }))
    }

    function hn() {
        pt.self(this, ft, "challenge-interface");
        var t = this;
        this.state = {
            loaded: !1,
            action: null,
            locked: !1,
            visible: !1,
            whiteLabel: !1
        }, this.language = this.initComponent(tn), this.logo = this.initComponent(nn), this.menu = this.initComponent(ln), this.text = this.initComponent(sn), this.breadcrumbs = this.initComponent(rn), this.btn = {
            info: this.initComponent(Gi),
            refresh: this.initComponent(Ji),
            submit: this.initComponent(Yi)
        }, this.btn.info.controlsMenu(this.menu), this.setAction = this.setAction.bind(this), this.focusMenuBtn = this.focusMenuBtn.bind(this), this.btn.info.on("click", (function(e) {
            t.menu.usingKb(e.usingKb), t.menu.visible(e.selected)
        })), this.menu.on("hide", (function() {
            t.btn.info.reset()
        })), this.btn.refresh.on("click", (function() {
            t.emit("refresh")
        })), this.btn.submit.on("click", (function() {
            t.emit("submit")
        })), this.menu.on("select", (function(e) {
            e && "report_image" === e.value && t.emit("report")
        })), this.menu.on("refresh", this.refresh.bind(this)), this.menu.on("display", (function(e) {
            t.emit("display", e)
        }))
    }

    function cn() {
        pt.self(this, ft, null, ".challenge-container"), this.handleResize = null, this.handleCheck = null, this.handleFocus = null, this.handleSubmit = null
    }
    pt.proto(ln, oi), ln.prototype.setA11yChallenge = function(t) {
        this.state.a11yChallenge = t
    }, ln.prototype._setOptions = function() {
        var t;
        for (this.options = [], t = 0; t < an.length; t++) "report_image" === an[t].value && Ci.isRqChl() || this.options.push(an[t]);
        this.state.a11yChallenge && this.options.push({
            text: "Text Challenge",
            value: "text_challenge",
            selector: "#text_challenge",
            type: "challenge"
        }), this.setOptions(this.options)
    }, ln.prototype.visible = function(t) {
        t ? (this._setOptions(), this.deselect(), this.open()) : this.hide()
    }, pt.proto(hn, ft), hn.prototype.removeCrumbs = function() {
        this.breadcrumbs.removeCrumbs()
    }, hn.prototype.refresh = function() {
        this.btn.refresh.dom.click()
    }, hn.prototype.load = function() {
        this.state.loaded || (this.state.loaded = !0, this.logo.load(), this.btn.info.load(), this.btn.refresh.load())
    }, hn.prototype.style = function(t, e, i) {
        var n = e ? 60 : 70,
            s = e ? 10 : 11,
            o = !this.state.whiteLabel,
            r = !this.state.whiteLabel;
        return this.breadcrumbs.display && (this.breadcrumbs.style(t, e), this.breadcrumbs.css({
            position: "absolute",
            top: e ? 12 : 20
        }), s = e ? 8 : 17, n = e ? 60 : 80), this.language.style(e), this.btn.refresh.style(e), this.btn.submit.style(e), this.btn.info.style(e, o), this.text.style(e ? 11 : 12), this.logo.style(t < 400, r), this.menu.style(190), this.menu.css({
            position: "absolute",
            left: 0,
            bottom: this.btn.info.getHeight() + i
        }), this.btn.info.css({
            position: "absolute",
            left: 0,
            bottom: (this.btn.submit.height - this.btn.info.getHeight()) / 2
        }), this.btn.refresh.css({
            position: "absolute",
            bottom: (this.btn.submit.height - this.btn.refresh.getHeight()) / 2,
            left: o ? this.btn.refresh.getWidth() + 10 : 0
        }), this.btn.submit.css({
            position: "absolute",
            display: "block",
            right: 0,
            bottom: 0
        }), this.logo.css({
            bottom: (this.btn.submit.height - this.logo.height) / 2
        }), this.text.css({
            position: "absolute",
            top: s
        }), this.css({
            width: t,
            height: n,
            position: "relative",
            left: i,
            top: i
        }), {
            width: t,
            height: n
        }
    }, hn.prototype.setupLogo = function(t, e) {
        t && (this.logo.destroy(), this.logo = this.initComponent(nn, {
            charity: !0
        }), this.logo.load()), this.logo.link = e || this.logo.link
    }, hn.prototype.setA11yChallenge = function(t) {
        this.menu.setA11yChallenge(t)
    }, hn.prototype.setAction = function(t) {
        this.state.action = t, this.btn.submit.action(t)
    }, hn.prototype.getAction = function() {
        return this.state.action
    }, hn.prototype.displayFail = function(t) {
        this.text.display(t)
    }, hn.prototype.setWhiteLabelEnabled = function(t) {
        this.state.whiteLabel = t
    }, hn.prototype.focusMenuBtn = function() {
        this.btn.info.focus()
    }, hn.prototype.displayLanguage = function(t) {
        this.language.setVisible(t)
    }, hn.prototype.enableRefresh = function(t) {
        this.btn.refresh.enable(t)
    }, hn.prototype.translate = function() {
        this.menu.setCopy(), this.text.setCopy(), this.language.updateLocale(), this.language.setLabel(), this.btn.info.setTitle(), this.btn.refresh.setTitle(), this.btn.submit.setLabel()
    }, hn.prototype.lockState = function(t) {
        this.state.locked = t, this.language.setLock(t), this.btn.info.setLock(t), this.btn.refresh.setLock(t), this.btn.submit.setLock(t)
    }, hn.prototype.isLocked = function() {
        return this.state.locked
    }, pt.proto(cn, ft), cn.prototype.style = function(t, e, i) {
        this.css({
            width: t,
            height: e,
            position: "relative",
            top: i,
            left: i,
            zIndex: 0
        })
    }, cn.prototype.mount = function(t) {
        var e = this;
        this.appendElement(t), this.handleResize = function() {
            e.emit("resize")
        }, this.handleCheck = function(i) {
            var n = "skip";
            i && (n = t.breadcrumbs && t.served < t.breadcrumbs ? "next" : "check"), e.emit("action-changed", n)
        }, this.handleFocus = function() {
            e.emit("focus-check")
        }, this.handleSubmit = function() {
            e.emit("submit")
        }, t.on && t.on("display-check", this.handleCheck), t.on && t.on("challenge-resize", this.handleResize), t.on && t.on("focus-check", this.handleFocus), t.on && t.on("submit", this.handleSubmit), this.isMounted = !0
    }, cn.prototype.unmount = function(t) {
        if (t.destroy) try {
            t.off && t.off("display-check", this.handleCheck), t.off && t.off("challenge-resize", this.handleResize), t.off && t.off("focus-check", this.handleFocus), t.off && t.off("submit", this.handleSubmit), t.destroy()
        } catch (Pn) {} else this.removeElement(t);
        return this.isMounted = !1, null
    };
    var un = null;
    var dn = Object.create(null),
        pn = null,
        fn = null,
        mn = null,
        yn = function(t) {
            return pn = null, fn = t, mn = new Promise((function(e, i) {
                try {
                    var n = q.decode(t.req);
                    G("Solve Proof", "proof", "info", t);
                    var s = n.payload.l + "/" + t.type + ".js";
                    (function(t, e) {
                        return new Promise((function(i, n) {
                            var s = dn[t];
                            s ? i(s) : Jt.script(e).then((function() {
                                s = window[t], dn[t] = s, i(s)
                            }))["catch"](n)
                        }))
                    })(t.type, s).then((function(e) {
                        return "function" != typeof e ? Promise.reject(new Error("Script is not a function")) : e(t.req)
                    })).then((function(t) {
                        pn = t, e(t)
                    }))["catch"]((function(t) {
                        "string" == typeof t && -1 !== t.indexOf("http") ? X("Asset Script Failed", "error", "proof", {
                            error: t
                        }) : Y("proof", t), pn = "fail", e()
                    }))["finally"]((function() {
                        mn = null
                    }))
                } catch (Pn) {
                    Y("proof", Pn), e(), mn = null
                }
            })), mn
        },
        gn = function() {
            return new Promise((function(t, e) {
                function i() {
                    var e = pn,
                        i = fn;
                    return pn = null, fn = null, t({
                        solved: e,
                        spec: i
                    })
                }
                if (!mn) return i();
                mn["finally"](i)
            }))
        };

    function vn(t) {
        window.__wdata = t
    }
    var bn = null,
        wn = 0,
        xn = null,
        kn = null,
        Cn = null,
        _n = [bt, vt],
        En = function(t) {
            for (var e, i, n, s = {}, o = t ? t.indexOf("&") >= 0 ? t.split("&") : [t] : [], r = 0; r < o.length; r++)
                if (o[r].indexOf("=") >= 0) {
                    if (e = o[r].split("="), i = decodeURIComponent(e[0]), "false" !== (n = decodeURIComponent(e[1])) && "true" !== n || (n = "true" === n), "theme" === i || "themeConfig" === i) try {
                        n = JSON.parse(n)
                    } catch (jn) {}
                    s[i] = n
                } return s
        }(window.__DIP.location.hash.slice(1));

    function Sn(t) {
        null !== xn && (clearTimeout(xn), xn = null), Cn.getInterface().lockState(!0), gn().then((function(e) {
            return Ci.getTaskData(t, e)
        })).then((function(t) {
            return t.pass || !1 === t.success ? On(t) : (e = {
                c: t.c,
                rq: t.rq,
                key: t.key,
                challengeType: t.request_type
            }, e.key && _e.send("challenge-key", {
                key: e.key
            }), Cn.create({
                rq: e.rq
            }), e.c && yn(e.c), Ci.loadBundle(e.challengeType).then((function(t) {
                var i = Ci.getData();
                return Cn.show({
                    width: F.browserWidth,
                    height: F.browserHeight,
                    bundle: t,
                    bundleData: i,
                    expiration: 1e3 * (i.expiration || 120),
                    challengeType: e.challengeType
                })
            })).then((function(t) {
                return new Promise((function(e) {
                    Promise.all([gn(), _e.contact("check-api")]).then((function(i) {
                        e({
                            answers: t,
                            proof: i[0],
                            motionData: i[1]
                        })
                    }))
                }))
            })).then((function(t) {
                be.stop();
                var e = t.answers,
                    i = t.proof,
                    n = be.getData();
                return n.topLevel = t.motionData, n.v = 1, Ci.checkAnswers(e, n, i)
            }))["catch"]((function(t) {
                if (Cn.isVisible() || t && -1 === _n.indexOf(t.message)) throw Cn.getInterface().lockState(!0), t
            }))).then(On);
            var e
        }))["catch"]((function(t) {
            var e = t instanceof Error ? {
                event: kt,
                message: t.message || ""
            } : t;
            Ci.logAction(e.event);
            var i = t.response && t.response["error-codes"],
                n = i && -1 !== i.indexOf("invalid-data");
            !n && (e.event === xt || e.event === kt || e.event === wt) && wn <= 2 ? (wn += 1, Mn()) : (wn = 0, n && (e = {
                event: xt,
                message: (i || [""]).join(", ")
            }), _e.send(gt, e))
        }))
    }

    function On(t) {
        if (t.c && yn(t.c), t.pass) _e.send(gt, {
            event: mt,
            response: t.generated_pass_UUID,
            expiration: t.expiration
        });
        else if (!1 === t.success) {
            var e = t["error-codes"] || [];
            if (-1 !== e.indexOf("expired-session") || -1 !== e.indexOf("client-fail")) return void Mn();
            _e.send(gt, {
                event: xt,
                message: (t["error-codes"] || [""]).join(", ")
            })
        } else Cn.getInterface().displayFail(!0), Mn()
    }

    function Mn() {
        if (Ci.isRqChl()) return Cn.getInterface().lockState(!0), void(xn = setTimeout((function() {
            _e.send(gt, {
                event: kt
            })
        }), 2e3));
        _e.contact("getcaptcha-manifest").then((function(t) {
            Sn(t)
        }))
    }

    function An(t, e) {
        F.browserWidth = t.width, F.browserHeight = t.height, Cn.size(t.width, t.height).then((function(t) {
            e.resolve(t), G("challenge resized", "challenge", "info", t)
        }))
    }

    function Tn() {
        G("challenge refresh", "challenge", "info"), Ci.logAction("challenge-refresh"), Mn()
    }

    function Ln() {
        Cn.submit().then((function(t) {
            Ci.logAction(t), "challenge-skip" !== t || Mn()
        }))["catch"]((function(t) {
            K(t), Ci.logAction(kt), Mn()
        }))
    }

    function Bn() {
        var t = Ci.getData();
        Cn.displayReport(t).then((function(t) {
            if (t) {
                var e = function() {
                    Tn(), Cn.getModal().off("refresh", e)
                };
                Cn.getModal().display("report_image", {
                    key: t
                }), Cn.getModal().on("refresh", e)
            }
        }))["catch"]((function(t) {
            K(t), Tn()
        }))
    }
    return En.sentry && Q("challenge_internal"),
        function(t) {
            F.host = t.host, F.sitekey = t.sitekey, F.file = "challenge", bn = t.id, t.sentry !== undefined && "undefined" !== t.sentry && (e = t.sentry, J = e);
            var e;
            t.endpoint !== undefined && "undefined" !== t.endpoint && (H.endpoint = t.endpoint);
            t.reportapi !== undefined && "undefined" !== t.reportapi && (H.reportapi = t.reportapi);
            t.assethost !== undefined && "undefined" !== t.assethost && (H.assethost = t.assethost);
            t.imghost !== undefined && "undefined" !== t.imghost && (H.imghost = t.imghost);
            t.hl !== undefined && "undefined" !== t.hl && (H.language = t.hl, Tt.setLocale(H.language));
            t.se !== undefined && "undefined" !== t.se && (H.se = t.se);
            H.theme = t.theme || H.theme, t.themeConfig && (H.themeConfig = t.themeConfig)
        }(En), Cn = new function(t) {
            var e = this,
                i = {
                    visible: !1,
                    create: !1,
                    timer: null,
                    timerExpired: !1,
                    preventClose: !1,
                    focus: "challenge"
                };
            t instanceof dt || (t = new dt(t));
            var n = new hn,
                s = new cn,
                o = new Zi;
            return t.appendElement(s), t.appendElement(n), t.appendElement(o), n.on("display", o.display), t.setAttribute("aria-hidden", !0), o.on("open", (function() {
                i.preventClose = !0
            })), o.on("close", (function() {
                i.visible && n.focusMenuBtn(), e.hideReport(!1), i.preventClose && (i.preventClose = !1, i.timerExpired && (i.timerExpired = !1, n.emit("refresh")))
            })), s.on("action-changed", (function(t) {
                n.setAction(t)
            })), s.on("submit", (function() {
                n.emit("submit")
            })), e.addTheme = function(t, e) {
                He.add(t, e)
            }, e.useTheme = function(t) {
                He.use(t)
            }, e.size = function(t, i) {
                return e.style(t, i)
            }, e.create = function(t) {
                i.create = !0, n.load(), n.displayLanguage(!t.rq), n.enableRefresh(!t.rq)
            }, e.isMounted = function() {
                return !!un
            }, e.setup = function(t, e) {
                return new Promise((function(i, o) {
                    try {
                        un && un.type !== e.request_type && (s.unmount(un), un = null), un || (un = new t({
                            theme: {
                                name: He.active(),
                                config: He.get()
                            }
                        }), s.mount(un)), n.removeCrumbs(), un.setup(e).then(i)["catch"]((function(t) {
                            var e = t;
                            t instanceof Error && (e = {
                                event: kt,
                                message: "Challenge encountered an error during setup.",
                                reason: t.toString()
                            }), o(e)
                        })), un.breadcrumbs && "number" == typeof un.breadcrumbs && un.breadcrumbs > 1 && (n.breadcrumbs.createCrumbs(un.breadcrumbs), n.breadcrumbs.setIndex(un.served))
                    } catch (Pn) {
                        s.isMounted || (un = null), o({
                            event: kt,
                            message: "Creating challenge failed.",
                            reason: Pn.toString()
                        })
                    }
                }))
            }, e.show = function(s) {
                if (!i.create) return Promise.reject(new Error(bt));
                i.visible = !0, t.removeAttribute("aria-hidden"), be.resetData(), be.record(!0, !0, !0, !0), be.setData("dct", Date.now());
                var o = e.setup(s.bundle, s.bundleData),
                    r = e.style(s.width, s.height).then((function(o) {
                        i.visible && (n.lockState(!1), _e.contact("challenge-ready", o).then((function() {
                            var o = "info" === i.focus && s.challengeType.indexOf("text") >= 0 && t.hasClass("using-kb"),
                                r = "info" === i.focus && s.challengeType.indexOf("text") < 0;
                            o || r ? (n.btn.info.focus(), i.focus = "challenge") : e.focus()
                        })))
                    }));
                return new Promise((function(t, e) {
                    r["catch"](e), o.then(t, e), i.timer && clearTimeout(i.timer), i.timer = setTimeout((function() {
                        i.timerExpired = !0, i.preventClose || e({
                            event: vt
                        })
                    }), s.expiration)
                }))
            }, e.style = function(t, e) {
                return un ? new Promise((function(i, r) {
                    try {
                        un.style(t, e).then((function(t) {
                            var e = n.style(t.width, t.mobile, 10);
                            s.style(t.width, t.height, 10);
                            var r = {
                                width: t.width + 20,
                                height: t.height + 20 + e.height
                            };
                            o.style(r.width, r.height, t.mobile), o.load(), i({
                                width: r.width,
                                height: r.height,
                                mobile: t.mobile
                            })
                        }))["catch"]((function(t) {
                            r({
                                event: kt,
                                message: "Error occurred in promise of .style()",
                                reason: t.toString()
                            })
                        }))
                    } catch (Pn) {
                        r({
                            event: kt,
                            message: "Error when calling .style()",
                            reason: Pn.toString()
                        })
                    }
                })) : Promise.resolve({
                    width: 0,
                    height: 0,
                    mobile: !1
                })
            }, e.submit = function() {
                return e.hasBreadcrumbs() && e.getTotalServed() !== e.getTotalBreadcrumbs() || "skip" !== n.getAction() ? new Promise((function(t, s) {
                    try {
                        if (un && un.submit(), e.hasBreadcrumbs()) {
                            var o = e.getTotalServed();
                            n.breadcrumbs.setIndex(o)
                        }
                        t("challenge-complete"), null !== i._timer && "check" === n.getAction() && (clearTimeout(i._timer), i._timer = null)
                    } catch (Pn) {
                        s(Pn)
                    }
                })) : Promise.resolve("challenge-skip")
            }, e.displayReport = function(t) {
                return new Promise((function(i, s) {
                    try {
                        if (!e.isMounted()) return i();
                        if (!e.canReport()) {
                            var o;
                            if ("fallback" === t.request_type) o = t.key;
                            else {
                                var r = e.hasBreadcrumbs() ? e.getTotalServed() - 1 : 0;
                                o = t.tasklist[r].task_key
                            }
                            return i(o)
                        }
                        e.report().then(i), n.breadcrumbs && n.breadcrumbs.hide()
                    } catch (jn) {
                        s(jn)
                    }
                }))
            }, e.hideReport = function() {
                un && un.report && un.report(!1)
            }, e.close = function() {
                i.timer && clearTimeout(i.timer), i.timer = null, t.setAttribute("aria-hidden", !0), e.close(), n.displayFail(!1), n.removeCrumbs(), o.close(), i.visible = !1, i.create = !1
            }, e.translateInterface = function(t) {
                if (t && t.locale && t.table) try {
                    t.table && (Tt.setLocale(t.locale), Tt.addTable(t.locale, t.table)), n.translate(), document.documentElement.setAttribute("lang", Tt.getLocale())
                } catch (Pn) {
                    Y("translation", Pn)
                }
            }, e.translateBundle = function() {
                un && un.translate && un.translate()
            }, e.isVisible = function() {
                return i.visible
            }, e.setFocus = function(t) {
                i.focus = t
            }, e.triggerFocus = function(t, i) {
                "submit" === t ? n.btn.submit.focus() : e.focus(i)
            }, e.getContainer = function() {
                return s
            }, e.getInterface = function() {
                return n
            }, e.getModal = function() {
                return o
            }, e.getTotalServed = function() {
                return un.served
            }, e.getTotalBreadcrumbs = function() {
                return un ? un.breadcrumbs : 0
            }, e.hasBreadcrumbs = function() {
                return !(!un || !un.breadcrumbs)
            }, e.canReport = function() {
                return un.report && "function" == typeof un.report
            }, e.report = function() {
                return new Promise((function(t) {
                    var e = function(i) {
                        un.off("report-image", e), t(i)
                    };
                    un.report(!0), un.on("report-image", e)
                }))
            }, e.close = function() {
                un && (un = s.unmount(un))
            }, e.focus = function(t) {
                un && un.setFocus && un.setFocus(t || 0)
            }, e
        }(document.body), H.themeConfig && Cn.addTheme("custom", H.themeConfig), _e.init(bn), kn = new dt(document.body), _e.answer("create-challenge", (function(t) {
            var e = {};
            if (t) {
                Ci.setRqData(t.rqdata || Ci.getRqData()), t.wdata && vn(t.wdata), t.width && (F.browserWidth = t.width, F.browserHeight = t.height), t.manifest && (e = t.manifest), Cn.setFocus("info"), "enter" === t.action ? kn.addClass("using-kb") : kn.hasClass("using-kb") && kn.removeClass("using-kb");
                var i = t.charity && !0 === t.charity;
                Cn.getInterface().setupLogo(i, t.link), t.a11yChallenge && Cn.getInterface().setA11yChallenge(t.a11yChallenge)
            }
            I.System.mobile && Cn.setFocus("info"), Sn(e)
        })), _e.answer("close-challenge", (function(t) {
            null !== xn && (clearTimeout(xn), xn = null), t && t.event === yt && Ci.logAction("challenge-abandon-retry"), Ci.setRqData(null), Cn.close()
        })), _e.answer("resize-challenge", An), _e.answer("challenge-translate", (function(t) {
            Cn.translateInterface(t), Cn.isVisible() && ("en" !== t.locale ? Mn() : Cn.translateBundle())
        })), _e.answer("challenge-update", (function(t, e) {
            var i = t.siteConfig;
            t.wdata && vn(t.wdata), i.endpoint && (H.endpoint = i.endpoint), Cn.getInterface().setWhiteLabelEnabled(!!i.custom), i.c && yn(i.c);
            var n = i && i.features && i.features.custom_theme;
            H.themeConfig && n ? Cn.useTheme("custom") : Cn.useTheme(H.theme), e.resolve()
        })), _e.contact("get-url").then((function(t) {
            F.url = t
        })), _e.answer("challenge-data", (function(t) {
            t.rqdata && Ci.setRqData(t.rqdata)
        })), Cn.getInterface().on("refresh", Tn), Cn.getInterface().on("submit", Ln), Cn.getInterface().on("report", Bn), Cn.getContainer().on("resize", (function() {
            _e.send("challenge-resize")
        })), Cn.getContainer().on("focus-check", (function() {
            kn.addClass("using-kb"), Cn.triggerFocus("submit")
        })), kn.addEventListener("down", (function(t) {
            Cn.getInterface().isLocked() || Cn.getInterface().displayFail(!1)
        })), kn.addEventListener("keydown", (function(t) {
            27 === t.keyNum && (Cn.getModal().isOpen() ? (Cn.getModal().close(), Cn.hideReport()) : (_e.send(gt, {
                event: yt
            }), Cn.close()))
        })), kn.addEventListener("down", (function() {
            document.activeElement !== Cn.getInterface().btn.info.dom && kn.hasClass("using-kb") && kn.removeClass("using-kb")
        }), !0), kn.addEventListener("keydown", (function(t) {
            9 === t.keyNum && (kn.addClass("using-kb"), t.shiftKey || document.activeElement === Cn.getInterface().btn.submit.getElement() && (Cn.triggerFocus("challenge", 0), t.preventDefault && t.preventDefault()))
        }), !0), kn.addEventListener("keydown", (function(t) {
            if (document.activeElement === Cn.getInterface().btn.submit.getElement()) {
                var e = t.keyNum;
                37 === e || 38 === e ? (kn.addClass("using-kb"), Cn.triggerFocus("challenge", -1), t.preventDefault && t.preventDefault()) : 39 !== e && 40 !== e || (kn.addClass("using-kb"), Cn.triggerFocus("challenge", 0), t.preventDefault && t.preventDefault())
            }
        })), _e.send("challenge-loaded"), {
            core: {
                Language: Tt,
                Device: I,
                Loader: Jt,
                BaseComponent: V,
                DomComponent: ft,
                DomElement: dt,
                Extend: pt,
                Normalize: at,
                Dom: ie
            },
            lib: {
                Math: ot,
                MathUtil: ot,
                Canvas: le,
                Geometry: {
                    Path: oe,
                    Segment: se,
                    Point: ne
                },
                Render: Z,
                Color: W,
                Shuffle: N,
                JWT: q
            },
            context: {
                Graphic: De,
                Config: H,
                Color: {
                    theme: {
                        contrast: {
                            hcolor: "#FFF",
                            hfcolor: "#000"
                        },
                        light: {
                            hcolor: "#00838F",
                            hfcolor: "#FFF"
                        }
                    },
                    text: "#555555",
                    accent: "#926FC1",
                    warn: {
                        base: "#EB5757",
                        hover: "#DE3F3F"
                    },
                    link: {
                        base: "#00838f",
                        hover: "#00838f"
                    },
                    white: "#fff",
                    grey: {
                        base: "#333",
                        placeholder: "#f0eff0"
                    },
                    purple: "#65549b",
                    hoverOff: "#00838f",
                    skipHoverOff: "#737373",
                    hoverOn: "#00838f",
                    error: "#fc481e"
                },
                Theme: Fe
            }
        }
}();