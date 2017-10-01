<!DOCTYPE html>
<html>
<head>
	<title>Day By Day | Line Up Generator</title>
	<link rel="icon" href="<?=base_url('public/dbd2.ico');?>">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/css/main.css');?>">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/css/alertify.default.css');?>">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/css/alertify.core.css');?>">
	<link rel="stylesheet" type="text/css" href="<?=base_url('public/dataTables/media/css/jquery.dataTables.min.css');?>">
	<script type="text/javascript" src="<?=base_url('public/js/jquery.min.js');?>"></script>
	<script type="text/javascript" src="<?=base_url('public/js/jquery.form.min.js');?>"></script>
	<script type="text/javascript" src="<?=base_url('public/js/alertify.min.js');?>"></script>
</head>
<body>
<?php if($this->session->userdata('logged_in') != null) { ?>
<div class="sidebar">
  <div class="side-logo">
      <img src="<?=base_url('public/images/logo2.png');?>">
  </div>
  <div class="side-greeting"> Welcome <span style="color:#efd62f;"><?=$this->session->userdata('UserName');?></span>!</div>
  <ul>
    <li class="side-li"><a href="#">Home</a></li>
    <li class="side-li"><a href="<?=base_url('Songs');?>">Songs</a></li>
    <li class="side-li"><a href="#">Templates</a></li>
    <li class="side-li"><a href="#">PPT Generator</a></li>
    <li class="side-li"><a href="<?=base_url('LogOut');?>">Log Out</a></li>
    
  </ul>
  
</div>


<div class="main">
<?php } ?>