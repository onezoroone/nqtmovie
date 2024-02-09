<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function show(){
        $users = DB::table('users')->orderBy('permission')->get();
        return response()->json($users);
    }
    public function changePermission($id, $permission){
        DB::table('users')->where('id',$id)->update([
            'permission' => $permission
        ]);
    }
    public function destroy($id){
        DB::table('users')->where('id',$id)->delete();
    }

    public function update(Request $request, $id){
        $password = DB::table('users')->where('id',$id)->value('password');
        if($request->current_password == "" && $request->password == "" && $request->password_confirmation == ""){
            $request->validate([
                'username' => 'required|string|max:55|unique:users,username,'.$id.',id',
                'email' => 'required|email|unique:users,email,'.$id.',id',
            ]);
            if ($request->hasFile('file')) {
                $image = $request->file('file');
                $imageName = $image->getClientOriginalName();
                $image->move(public_path('images/uploads'), $imageName);
            }
            DB::table('users')->where('id', $id)->update([
                'username' => $request->username,
                'email' => $request->email,
                'img' => $imageName,
            ]);
            return response([
                'message' => 'Update account successfully'
            ]);
        }else if($request->current_password !== "" && password_verify($request->current_password, $password)){
            $request->validate([
                'username' => 'required|string|max:55|unique:users,username,'.$id.',id',
                'email' => 'required|email|unique:users,email,'.$id.',id',
                'password' => [
                    'required',
                    'confirmed',
                    Password::min(8)->letters()->symbols()
                ]
            ]);
            if ($request->hasFile('file')) {
                $image = $request->file('file');
                $imageName = $image->getClientOriginalName();
                $image->move(public_path('images/uploads'), $imageName);
            }
            DB::table('users')->where('id', $id)->update([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'img' => $imageName,
            ]);
            return response([
                'message' => 'Update account successfully'
            ]);
        }else{
            return response([
                'errors' => ['error'=> ['Current password is incorrect']]
            ], 422);
        }
    }
    public function getInfor($id){
        $user = DB::table('users')->select('id','username', 'email' ,'img')->where('id', $id)->get();
        return response()->json($user);
    }

    public function ResetPass(Request $request){
        $email = $request->input('email');
        $check = DB::table('users')->where('email',$email)->count();
        if ($check > 0) {
            $newPassword = $this->generateRandomPassword();
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            DB::table('users')->where('email',$email)->update([
                'password'=>$hashedPassword,
            ]);
            $this->ForgotPass($newPassword, $email);
            return redirect('/confirm-pw');
        }else{
            return back()->with('error', 'Email Not Existed');
        }
    }
    function generateRandomPassword() {
        $length = 10;
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $password = '';
        for ($i = 0; $i < $length; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $password .= $characters[$index];
        }
        return $password;
    }
    public function ForgotPass($pass, $email){
        $mail = new PHPMailer(true);
        try {
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'testmailphpnqt@gmail.com';
            $mail->Password = '123 456';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            //Recipients
            $mail->setFrom('testmailphpnqt@gmail.com', 'Movie NQT');
            $mail->addAddress($email,  $pass);

            //Content
            $mail->isHTML(true);
            $mail->Subject = 'Forgot Password';
            $mail->Body    = 'Mật khẩu mới của bạn là: '.$pass;

            $mail->send();
            echo 'Message has been sent';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
}
