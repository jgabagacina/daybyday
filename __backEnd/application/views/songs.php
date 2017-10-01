	<div class="main-header">
		<h1>List of Songs</h1>
	</div>
	<table id="songTable">
		<thead>
			<tr>
				<th></th>
				<th>Title</th>
				<th>Author</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>1</td>
				<td>So Will I</td>
				<td>Hillsong United</td>
				<td class="actions-td">
					<button class="btn btn-edit">Edit</button>
					<button class="btn btn-primary">Add to Line Up</button>
				</td>
			</tr>
		</tbody>
	</table>
</div>
<script type="text/javascript" src="<?=base_url('public/dataTables/media/js/jquery.dataTables.min.js');?>"></script>
<script type="text/javascript">
	$(document).ready(function(){
		$('#songTable').dataTable();
		$('#songTable').show();
	});
</script>


