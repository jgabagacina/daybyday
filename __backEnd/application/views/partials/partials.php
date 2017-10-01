<button>Click</button>
<script type="text/javascript" src="<?=base_url();?>/public/js/jquery.min.js"></script>

<script type="text/javascript">
	$(document).ready(function(){
		$('button').on('click',function(){
			var pptx = new PptxGenJS();
			var lyrics = "TITITITITTITI";
			

			var shadowOpts = { type:'outer', color:'000000', blur:4, offset:3, angle:45, opacity:0.6 };
			pptx.setLayout('LAYOUT_4x3');
			// Add a Slide, then add objects
			var slide = pptx.addNewSlide();
			
			slide.addImage({ path:'<?=base_url();?>public/images/Picture1.jpg', x:0, y:0, w:10, h:7.5 });
			slide.addText(lyrics.toUpperCase(), { x:0.52, y:0.42, w:9.06, h:3.67, font_size:40, font_face:'Gill Sans MT', color:'ffffff', bold:true, align: 'center', valign:"top", shadow:shadowOpts, glow:{color:'000000', opacity: 30, size: 8} });

			slide.addText('PATRICIA', { x:2.33, y:6.25, font_size:28, font_face:'Arial', color:'ffffff', italic:true, align: 'right' });
			
			
			
			pptx.save('Demo-Media');
		})
	});
</script>