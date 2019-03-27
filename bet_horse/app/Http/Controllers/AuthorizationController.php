<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class AuthorizationController extends Controller
{

   public function login(Request $request)
   {
      $user = User::where('email', $request->email)->first();
      $login = $request->email;

      if(!$user) {
          return [
            'error' => 'Неверный логин!',
          ];
      }

      if($user->password != md5($request->password)) {
          return [
            'error' => 'Неверный пароль!',
          ];
      }

      $token = md5($request->email.$request->password.$request->name.str_random(8));
      $user->token = $token;

      $user->save();

      return [
        'token' => $token,
        'isAdmin' => $user->isAdmin,
      ];
   }

   public function register(Request $request)
   {
      $user = User::where('email', $request->email)->first();
      $userOptions = $request->all();

      if($userOptions) {

        if(!$user) {

          $userOptions['password'] = md5($userOptions['password']);
          $user = User::create($userOptions);
          return $user;

        }
        else return [
          'error' => 'Email has already existed'
        ];
      }

      return [
        'error' => 'No data!',
      ];
   }

}
