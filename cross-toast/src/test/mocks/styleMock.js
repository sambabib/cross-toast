// Mock CSS modules
export default new Proxy(
  {},
  {
    get: function(target, key) {
      // Return the key as the value for any requested property
      return key;
    }
  }
); 