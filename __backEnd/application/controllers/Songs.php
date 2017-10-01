<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Songs extends MY_Controller{
	function __construct(){
		parent::__construct();
		// $this->AJAXRequest();
		$this->loggedInCheck();
		$this->MethodRequest();
		$this->load->model('MdlSongs');
		
	}


	function index()
	{

	}


	
	function getSongs()
	{	if($this->uri->segment(3)!=null){
			$song = $this->MdlSongs->getSongs(array('SongID'=>$this->uri->segment(3)));
			$slides = $this->MdlSongs->getSlides(array('SongID'=>$this->uri->segment(3),'order_by'=>'OrderNumber','order_direction' => 'ASC'));
			$parts = $this->MdlSongs->getParts();
			// foreach ($data as $slide) {
			// 	foreach($parts as $part){
			// 		if($part->PartID==$slide->PartID){
			// 			if(isset($slides[$part->PartName])){
							
			// 				array_push($slides[$part->PartName],$slide->Content);
							
			// 			}else{
			// 				$slides[$part->PartName] = array($slide->Content);
			// 			}
			// 		}
			// 	}
			// }
			$json = compact('song', 'slides', 'parts');
		}else{
			$data = $this->MdlSongs->getSongs(array('order_by'=>'Title','order_direction' => 'ASC'));
			$json = array();
			foreach($data as $datus){
				$json[]=array(
					'SongID'=>$datus->SongID,
					'Title'=>$datus->Title,
					'Artist'=>$datus->Artist,

					);
			}
		}
		echo json_encode($json);
	}
	function getParts()
	{
		$data = $this->MdlSongs->getParts();
		
		echo json_encode($data);
	}

	function addSong(){
		unset($_POST['Details']['Part']);
		unset($_POST['Details']['Content']);
		$data = $this->MdlSongs->addSong($_POST['Details']);

		for($x=0;$x<count($_POST['Slides']);$x++){
			$_POST['Slides'][$x]['SongID'] = $data;
			// $_POST['Slides'][$x]['Content'] = nl2br($_POST['Slides'][$x]['Content']);
			$this->MdlSongs->addSlides($_POST['Slides'][$x]);
		}
		
	
		echo json_encode(array('SongID'=>$data));
	}


	function editSong(){
		
		$this->MdlSongs->updateSong($_POST['Details']);
		
		$this->MdlSongs->deleteSlides(array('SongID'=>$_POST['Details']['SongID']));
		
		for($x=0;$x<count($_POST['Slides']);$x++){
			$_POST['Slides'][$x]['SongID'] = $_POST['Details']['SongID'];
			// $_POST['Slides'][$x]['Content'] = nl2br($_POST['Slides'][$x]['Content']);
			$this->MdlSongs->addSlides($_POST['Slides'][$x]);
		}
		
	}

}