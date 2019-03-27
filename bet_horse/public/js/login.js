$(document).ready(function() {

   $('title').text = 'Логин';

   // $('.header .login').on('click', function(event) {
   //    window.location.replace("./loginForm")
   //    /* Act on the event */
   // });

   $('.submit').on('click', event => {
      let
         email = $('input[name=email]').val(),
         password = $('input[name=password]').val(),
         token = null;

      axios.get('login', {
        params: {
          email: email,
          password: password
        }
      })
      .then(response => {
        console.log(response.data.isAdmin);
        token = response.data.token ? response.data.token : null;

        if (token) {

           localStorage.setItem('token', token);
           if(response.data.isAdmin == 0) window.location.replace('./bets');

        } else {

         console.log(response.data.error);

        }

      })
      .catch(e => {

        console.log("ERROR! " + e);
        
      })
   });
});
