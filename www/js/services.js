angular.module('forum.services', [])
.factory('user' , function($http , $window){
  
  var signup = function(user){
    
    return $http.post('http://192.168.100.42/user' , user) ;
    
  };
  var login = function(user){
    
    return $http.post('http://192.168.100.42/loginverification' , user);
  };
  var saveuser = function(data){
    
    $window.localStorage.user = JSON.stringify(data) ;
  };
  var logout = function(){
    
    $window.localStorage.removeItem('user') ;
    
  };
  var getuser = function(){
    if($window.localStorage.user === undefined ){
      
      return false ;
    }
    payload = JSON.parse($window.localStorage.user) ;
            return {
          id : payload.id,
          username : payload.username,
          name : payload.email
        };
  };
  
  return {
    signup : signup,
    login : login,
    saveuser : saveuser,
    logout : logout,
    getuser : getuser,
    
    
  } ;
  
  
  
  
  
  
});