export default function(window = {}) {
  var cookie = Object.getOwnPropertyDescriptor(window.Document.prototype, 'cookie');
  
  Object.defineProperty(window.Document.prototype, 'cookie', {
    get() {
      var fullCookies = cookie.get.call(this);
      return fullCookies.split('; ').map(cookie => {
        return cookie
      }).join('; ')
    },
    set(val) {
      var name = val.split('=')[0].trim(),
        value = val.split('=')[1].trim();

      console.log(name+value)
    }
  });
};