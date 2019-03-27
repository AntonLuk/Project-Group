$(document).ready(function() {

   $('.submit').on('click', event => {

      let
         email = $('input[name=email]').val(),
         name = $('input[name=name]').val(),
         password = $('input[name=password]').val(),
         passwordRepeat = $('input[name=passwordRepeat]').val();

         if (password == passwordRepeat) {

            axios.post('/register', {
               name: name,
               email: email,
               password: password,
               isAdmin: 0
            })
            .then(responce => {

               console.log(responce.data);
               window.location.replace('/loginForm');

            });

         }
   });
});
