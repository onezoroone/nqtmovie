<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Cookie;
class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name' => "required",
            'email' => "required|email|unique:users,email",
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->letters()->symbols()
            ]
        ],[
            'name.required' => 'Tên không được để trống.',
            'email.required' => 'Email không được để trống.',
            'email.unique' => 'Email đã được sử dụng.',
            'password.confirmed' => 'Mật khẩu không trùng khớp.',
            'password.required' => 'Mật khẩu không được để trống',
            'password' => 'Mật khẩu phải chứa ít nhất 8 ký tự, 1 chữ cái hoa, 1 ký tự đặc biệt và 1 chữ số'
        ]);

        $token = Str::random(40);
        $link = env('APP_URL')."/user/verification/".$token;

        Mail::raw('Nhấp vào đường dẫn sau để kích hoạt tài khoản: '.$link, function ($message) use ($request) {
            $message->from(env('MAIL_FROM_ADDRESS'), 'NQT Movie');
            $message->to($request->email, $request->name)->subject('Xác thực tài khoản');
        });

        $user = DB::table('users')->insert([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'verification_code' => $token,
            'created_at' => now()
        ]);

        return response()->json("Tạo tài khoản thành công!", 200);
    }

    public function verification($code){
        $user = DB::table('users')->where('verification_code', $code)->first();
        if (!$user) {
            return response()->json("Xác Thực Tài Khoản Thất Bại.", 422);
        }
        DB::table('users')->where("verification_code", $code)->update([
            'verification_code' => null,
            'verified' => true,
            'email_verified_at' => now()
        ]);

        return response()->json("Xác thực tài khoản thành công!", 200);
    }

    public function login(Request $request){
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password'=> 'required'
        ],[
            'email.email' => 'Địa chỉ Email không hợp lệ!'
        ]);

        if (Auth::attempt($credentials, $request->remember)) {
            $user = User::where('email', $credentials['email'])->firstOrFail();
            if($user->verified == "true"){
                $token = $user->createToken('auth-token')->plainTextToken;
                $expiresAt = now()->endOfDay();
                if(!$request->remember){
                    $personalAccessToken = PersonalAccessToken::findToken($token);
                    $personalAccessToken->forceFill([
                        'expires_at' => $expiresAt,
                    ])->save();
                    $cookie = cookie('jwt', $token);
                }else{
                    $cookie = cookie('jwt', $token, 60 * 24 * 90);
                }
                return response()->json(['message' => "Đăng nhập thành công", 'user' => $user])->withCookie($cookie);
            }else{
                return response()->json([
                    'message' => 'Tài khoản chưa được xác thực.'
                ], 422);
            }
        }else{
            return response()->json([
                'message' => 'Thông tin đăng nhập không chính xác.'
            ], 422);
        }
    }

    public function logout(){
        $cookie = Cookie::forget('jwt');
        return response(['messgae' => "Đăng xuất thành công"])->withCookie($cookie);
    }

    public function getUser(){
        if(Auth::check()){
            $user = Auth::user();
            $reviews = [];
            $reviews = DB::table('reviews')->join('movies','movies.id','=','reviews.idMovie')
            ->where('idUser', $user->id)->select('movies.name', 'review', 'rating', 'reviews.created_at')->get();
            return response()->json(['status' => "success", 'user' => $user, 'reviews' => $reviews], 200);
        }else{
            return response()->json(['status' => "error", 'user' => "Chưa đăng nhập."], 422);
        }
    }
}
