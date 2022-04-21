var _window = window

export default function(e, window = _window) {
    window.__DIP = {}, window.__DIP.location = {}, ["href", "host", "hash", "origin", "hostname", "port", "pathname", "protocol", "search"].forEach(t => {
        Object.defineProperty(window.__DIP.location, t, {
            get: () => "protocol" == t ? window.location.protocol : e[t],
            set: e => window.location[t] = window.proxy.url.encode(window.__DIP.url.href.replace(window.__DIP.url[t], e))
        })
    }), ["assign", "replace", "toString", "reload"].forEach(e => {
        Object.defineProperty(window.__DIP.location, e, {
            get: () => new Function("arg", `return window.location.${e}(arg?${"reload"!==e&&"toString"!==e?"__DIP.Url.encode(arg)":"arg"}:null)`),
            set: e => e
        })
    });
    document.__DIP = window.__DIP;
    return window.__DIP
}