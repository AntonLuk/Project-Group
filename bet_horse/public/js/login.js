$(document).ready(function() {

   $('title').text = 'Логин';

   // $('.header .login').on('click', function(event) {
   //    window.location.replace("./loginForm")
   //    /* Act on the event */
   // });

   $('.submit').on('click', event => {
      let
         login = $('input[name=login]').val(),
         password = $('input[name=password]').val(),
         token = null;

      axios.get('login', {
        params: {
          email: login,
          password: password
        }
      })
      .then(response => {
        token = response.data.token ? response.data.token : null;

        if (token) {

           localStorage.setItem('token', token);
           window.location.replace('./');

        } else {

         console.log(response.data.error);

        }

      })
      .catch(e => {

        console.log("ERROR! " + e);
        
      })
   });
});
