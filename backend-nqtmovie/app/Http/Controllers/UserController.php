<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index(){
        $users = User::leftJoin('personal_access_tokens', function($join) {
            $join->on('personal_access_tokens.tokenable_id', '=', 'users.id')
                 ->whereRaw('personal_access_tokens.id = (SELECT id FROM personal_access_tokens WHERE tokenable_id = users.id ORDER BY last_used_at DESC LIMIT 1)');
        })
        ->select('users.*', 'personal_access_tokens.last_used_at')
        ->orderByDesc('personal_access_tokens.last_used_at')
        ->get();
        return response()->json($users, 200);
    }

    public function update(Request $request){
        if($request->id == 1){
            return response()->json("Không thể sửa người dùng siêu cấp vip pro.", 422);
        }
        DB::table('users')->where('id',$request->id)->update([
            'role' => $request->role,
            'verified' => $request->checked
        ]);
        return response()->json("Sửa vai trò cho ".$request->name, 200);
    }

    private function generateRandomSpecialCharacter() {
        $specialCharacters = '!@#$%';
        return $specialCharacters[random_int(0, strlen($specialCharacters) - 1)];
    }

    public function resetPassword(Request $request){
        if($request->id == 1){
            return response()->json("Không thể sửa người dùng siêu cấp vip pro.", 422);
        }
        $uppercase = Str::random(1, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        $lowercase = Str::random(6, 'abcdefghijklmnopqrstuvwxyz');
        $special = $this->generateRandomSpecialCharacter();
        $number = Str::random(1, '0123456789');
        $password = $uppercase . $lowercase . $special . $number;
        DB::table('users')->where('id', $request->id)->update([
            'password' => Hash::make($password),
        ]);
        return response()->json("Mật khẩu mới của ".$request->name." là: ". $password, 200);
    }

    public function forgotPassword(Request $request){
        $check = DB::table('users')->where('email', $request->email)->count();
        if($check == 0){
            return response()->json("Email chưa được đăng ký.", 422);
        }
        $token = Str::random(40);
        $user = DB::table('password_reset_tokens')->where('email', $request->email)->first();
        if($user){
            DB::table('password_reset_tokens')->where('email', $request->email)->update([
                'token' => $token,
                'created_at' => now()
            ]);
        }else{
            DB::table('password_reset_tokens')->insert([
                'email' => $request->email,
                'token' => $token,
                'created_at' => now()
            ]);
        }
        $link = env('APP_URL')."/user/forgot-password/".$token;
        Mail::raw('Nhấp vào đường dẫn sau để tiến hành đổi mật khẩu mới: '.$link, function ($message) use ($request) {
            $message->from(env('MAIL_FROM_ADDRESS'), 'NQT Movie');
            $message->to($request->email, "Người dùng NQTMOVIE")->subject('Quên mật khẩu');
        });
        return response()->json("Thành công. Vui lòng kiểm tra Email !", 200);
    }

    public function changePassword(Request $request){
        $request->validate([
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->letters()->symbols()
            ]
        ],[
            'password.confirmed' => 'Mật khẩu không trùng khớp.',
            'password.required' => 'Mật khẩu không được để trống',
            'password' => 'Mật khẩu phải chứa ít nhất 8 ký tự, 1 chữ cái hoa, 1 ký tự đặc biệt và 1 chữ số'
        ]);
        $check = DB::table('password_reset_tokens')->where('token', $request->token)->first();
        if(!$check){
            return response()->json("Lỗi.", 422);
        }
        DB::table('users')->where('email', $check->email)->update([
            'password' => Hash::make($request->password),
        ]);
        DB::table('password_reset_tokens')->where('token', $request->token)->delete();
        return response()->json("Đổi mật khẩu thành công.", 200);
    }

    public function updateInfor(Request $request){
        $user = Auth::user();
        $image = 'default.png';
        $user->name = $request->name;
        if($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $filename = time() . '.' . $avatar->getClientOriginalExtension();
            $avatar->move(public_path('/avatars/'), $filename);
            $image = $filename;
        }
        $user->avatar = $image;
        $user->save();
        return response()->json([
            'message' => 'Cập nhật thông tin thành công!',
            'user' => $user
        ], 200);
    }

    public function banUser(Request $request){
        $user = User::find($request->id);
        if($user->id == 1){
            return response()->json("Không thể cấm người dùng siêu cấp vip pro.", 422);
        }
        $message = "";
        if($request->status == "Y"){
            $message = "Đã bỏ cấm người dùng ".$user->name.".";
        }else{
            $message = "Đã cấm người dùng ".$user->name.".";
        }
        $user->status = $request->status;
        $user->save();
        return response()->json($message, 200);
    }
}
