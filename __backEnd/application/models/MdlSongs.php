<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MdlSongs extends CI_Model {

	public function getSongs($options=array()){

		if(isset($options['SongID']))
			$this->db->where('SongID',$options['SongID']);

		if(isset($options['Title']))
			$this->db->where('Title',$options['Title']);

		if(isset($options['Artist']))
			$this->db->where('Artist',$options['Artist']);

		if(isset($options['SessionID']))
			$this->db->where('SessionID',$options['SessionID']);

		if(isset($options['Token']))
			$this->db->where('Token',$options['Token']);
		
		if(isset($options['order_by']) && isset($options['order_direction']))
			$this->db->order_by($options['order_by'], $options['order_direction']);

		$query = $this->db->get('songs');

		if(isset($options['count']))
			return $query->num_rows();

		if(isset($options['SongID']))
			return $query->row(0);

		return $query->result();
	}

	public function getSlides($options=array()){

		if(isset($options['SongID']))
			$this->db->where('SongID',$options['SongID']);

		if(isset($options['SlideID']))
			$this->db->where('SlideID',$options['SlideID']);
		
		if(isset($options['order_by']) && isset($options['order_direction']))
			$this->db->order_by($options['order_by'], $options['order_direction']);

		$query = $this->db->get('songslides');

		if(isset($options['count']))
			return $query->num_rows();

		if(isset($options['SlideID']))
			return $query->row(0);

		return $query->result();
	}


	public function getParts($options=array()){

		if(isset($options['PartID']))
			$this->db->where('PartID',$options['PartID']);

		if(isset($options['PartName']))
			$this->db->where('PartName',$options['PartName']);

		
		if(isset($options['order_by']) && isset($options['order_direction']))
			$this->db->order_by($options['order_by'], $options['order_direction']);

		$query = $this->db->get('songparts');

		if(isset($options['count']))
			return $query->num_rows();

		if(isset($options['PartID']))
			return $query->row(0);

		return $query->result();
	}


	public function updateSong($options=array()){
	
		if(isset($options['Title']))
			$this->db->set('Title',$options['Title']);

		if(isset($options['Artist']))
			$this->db->set('Artist',$options['Artist']);

		if(isset($options['Language']))
			$this->db->set('Language',$options['Language']);

		if(isset($options['Genre']))
			$this->db->set('Genre',$options['Genre']);


		$this->db->where('SongID',$options['SongID']);
		$this->db->update('songs');

		return $this->db->affected_rows();
	}

	public function addSong($options=array()){
		$this->db->insert('songs', $options);
		return $this->db->insert_id();
	}
	public function addSlides($options=array()){
		$this->db->insert('songslides', $options);
		return $this->db->insert_id();
	}

	public function deleteSlides($options=array()){
		if(isset($options['SongID']))
			$this->db->where('SongID',$options['SongID']);
		$this->db->delete('songslides');
	}

}