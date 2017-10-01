<?php
defined('BASEPATH') OR exit('No direct script access allowed');

Class MY_Controller extends CI_Controller {

	public function __construct()
    {
        parent::__construct();
        if($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
            $_POST = json_decode(file_get_contents('php://input'), true);
        
    }

    public function AJAXRequest()
    {
    	if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') {
			die("No direct script access allowed");
		}

    }

    public function MethodRequest()
    {
        if($_SERVER['REQUEST_METHOD'] != 'POST' && $_SERVER['REQUEST_METHOD'] != 'GET' && $_SERVER['REQUEST_METHOD'] != 'PUT')
            die("No direct script access allowed");

    }

    public function loggedInCheck()
    {
        if($this->session->userdata('logged_in')==null){
            die();
        }
    }

    
}