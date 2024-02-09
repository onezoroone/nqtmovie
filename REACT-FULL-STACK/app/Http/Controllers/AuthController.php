<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{
    public function login(Request $request){
        $credentials = $request->validate([
            'login' => 'required',
            'password'=> 'required'
        ]);
        $field = filter_var($credentials['login'], FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $login = $credentials['login'];

        $user = null;
        if ($field === 'email') {
            $user = User::where('email', $login)->first();
        } else {
            $user = User::where('username', $login)->first();
        }

        if (!$user || !Auth::attempt([$field => $login, 'password' => $credentials['password']])) {
            return response([
                'message' => 'Username or password is incorrect'
            ], 422);
        }
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function signup(Request $request){
        $request->validate([
            'username' => 'required|string|max:55|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->letters()->symbols()
            ]
        ]
        );
        $user = DB::table('users')->insert([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response([
            'message' => 'Create account successfully'
        ]);
    }

    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
