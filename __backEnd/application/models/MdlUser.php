<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MdlUser extends CI_Model {

	public function getUser($options=array()){

		if(isset($options['UserID']))
			$this->db->where('UserID',$options['UserID']);

		if(isset($options['UserName']))
			$this->db->where('UserName',$options['UserName']);

		if(isset($options['Password']))
			$this->db->where('Password',$options['Password']);

		if(isset($options['SessionID']))
			$this->db->where('SessionID',$options['SessionID']);

		if(isset($options['Token']))
			$this->db->where('Token',$options['Token']);

		$query = $this->db->get('user');

		if(isset($options['count']))
			return $query->num_rows();

		if(isset($options['UserID']) || (isset($options['UserName']) && isset($options['Password'])))
			return $query->row(0);

		return $query->result();
	}


	public function updateUser($options=array()){
	
		if(isset($options['UserName']))
			$this->db->set('UserName',$options['UserName']);

		if(isset($options['Password']))
			$this->db->set('Password',$options['Password']);

		if(isset($options['SessionID']))
			$this->db->set('SessionID',$options['SessionID']);

		if(isset($options['Token']))
			$this->db->set('Token',$options['Token']);

		$this->db->where('UserID',$options['UserID']);
		$this->db->update('user');

		return $this->db->affected_rows();
	}

}