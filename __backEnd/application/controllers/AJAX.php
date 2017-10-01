<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AJAX extends MY_Controller {

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
			$user = $this->MdlUser->getUser(array('UserName'=>$UserName, 'Password'=>$Password));
			$session = array(
                    'UserName' =>$UserName,
                    'ID' =>$user->UserID,
                    'PSID' =>$user->PSID,
                    'logged_in'=> true,
                    'SessionID'=> $SessionID
            );        
            $this->session->set_userdata($session);
            $this->MdlUser->updateUser(array('SessionID'=>$SessionID,'UserID'=>$user->UserID));
            $json['result'] = true;
            $json['link'] = base_url('Home');
		}else{
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