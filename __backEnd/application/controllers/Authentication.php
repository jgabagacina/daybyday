<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Authentication extends MY_Controller {

	function __construct(){
		parent::__construct();
		// $this->AJAXRequest();
		$this->MethodRequest();
		
	}


	public function logInAuthentication()
	{
		
		$this->load->model('MdlUser');
		$UserName = strip_tags($_POST['UserName']);
		$Password = md5($_POST['Password'].sha1(SALT));
		$data = $this->MdlUser->getUser(array('UserName'=>$UserName, 'Password'=>$Password,'count'=>''));
		if($data){
			$SessionID = sha1($UserName.rand());
			$Token = md5(SALT.rand());
			$user = $this->MdlUser->getUser(array('UserName'=>$UserName, 'Password'=>$Password));
			$session = array(
                    'UserName' =>$UserName,
                    'ID' =>$user->UserID,
                    'PSID' =>$user->PSID,
                    'logged_in'=> true,
                    'SessionID'=> $SessionID,
                    'Token' => $Token
            );        
            $this->session->set_userdata($session);
            $this->MdlUser->updateUser(array('SessionID'=>$SessionID,'Token'=>$Token, 'UserID'=>$user->UserID));
            $json['result'] = true;
            $json['Token'] = $Token;
            $json['UserName'] = $UserName;
		}else{
			$json['result'] = false;
		}
		echo json_encode($json);
	}

	public function sessionCheck()
    {   
        if($this->session->userdata('logged_in')!=null){
            $this->load->model('MdlUser');
            $data = $this->MdlUser->getUser(array('UserName'=>$this->session->userdata('UserName'), 'SessionID'=>$this->session->userdata('SessionID'), 'Token' => $_POST['Token'], 'count'=>''));
            if(!$data){
            	$this->LogOut();
                $json['result'] = false;
            }
            else {
                $json['result'] = true;
            }
        }else {
        	$this->LogOut();
            $json['result'] = false;
        }
        echo json_encode($json);
    }

	public function LogOut()
	{
		$this->session->sess_destroy();
		//redirect();
	}
}