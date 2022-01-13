var UserProfile = (function() {
    var full_name = "";
    var token = "";
  
    var getName = function() {
      return full_name;    // Or pull this from cookie/localStorage
    };
  
    var setName = function(name) {
      full_name = name;     
      // Also set this in cookie/localStorage
    };

    var getToken = function() {
      return token;    // Or pull this from cookie/localStorage
    };
  
    var setToken = function(newToken) {
      token = newToken;     
      // Also set this in cookie/localStorage
    };
  
  
    return {
      getName: getName,
      setName: setName,
      getToken: getToken,
      setToken: setToken
    }
  
  })();
  
  export default UserProfile;