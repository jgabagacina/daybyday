<div>
	<div class="center">
		
		<div class="img-container">
			<img src="<?=base_url('public/images/logo2.png');?>">
		</div>
		<form class="ajaxForm" onsubmit="return false;">
			<div class="form">
				<input type="text" ng-model="UserName" placeholder="Username">
				<input type="password" ng-model="Password" placeholder="Password">
				<button type="submit">Log in</button>
			</div>
		</form>
		
	</div>
</div>

<<!-- script type="text/javascript">
	$(document).ready(function(){
		$('.ajaxForm').on('submit', function(){
			$(this).ajaxSubmit({
				type:"POST",
				url:"<?=base_url('AJAX/logInAuthentication');?>",
				data:$(this).serialize(),
				cache:false,
				dataType:'JSON',
				beforeSubmit: function(){
					$('.center').prepend('<div class="preloader"><img src="<?=base_url('public/images/logogif.gif');?>"></div>');
				},
				success: function(data){
					if(data.result){
						alertify.success("You successfuly logged in!");
						setTimeout(function(){
							window.location.href = data.link;
						},1000);
					}else{	
						alertify.error("Invalid Username/Password!");
						$('.preloader').remove();
					}
					
				},
				error: function(){
					alertify.error("Error! There's something to do with the server.");
					$('.preloader').remove();
				}

			});
			return false;
		});
	});
</script> -->
