export default class History {
    constructor(proxy) {
        this.proxy = proxy
    }
    apply(t, g, a) {
        if (a[2]) a[2] = this.proxy.url.encode(a[2])
        console.log(a[2])
        return Reflect.apply(t, g, a)
    }
}