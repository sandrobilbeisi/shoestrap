

jQuery.noConflict();

    /** Fire up jQuery - let's dance! 
     */
    jQuery(document).ready(function($){


		Object.size = function(obj) {
		  var size = 0, key;
		  for (key in obj) {
		      if (obj.hasOwnProperty(key)) size++;
		  }
		  return size;
		};

		/**
		  * Google Fonts
		  * Dependencies 	 : google.com, jquery
		  * Feature added by : Smartik - http://smartik.ws/
		  * Date 			 : 03.17.2013
		  */
		function GoogleFontSelectHybrid( mainID, selector ){
			
			if ($(selector).hasClass('of-typography-new-face')) {
				$('#'+mainID+' .typography-style span').text('');
				$('#'+mainID+' .typography-script span').text('');
				$('#'+mainID+' .of-typography-style').val('');
				$('#'+mainID+' .of-typography-script').val('');
			}
			var face = $('#'+mainID+' .of-typography-new-face').val();
			var script = $('#'+mainID+' .of-typography-script').val();
			var style = $('#'+mainID+' .of-typography-style').val();
			var size = $('#'+mainID+' .of-typography-size').val();
			var height = $('#'+mainID+' .of-typography-height').val();
			var color = $('#'+mainID+' .of-typography-color').val();
			
			var option = $('#'+mainID+' .of-typography-new-face option:selected');
			var google = option.data('google');
			var details = jQuery.parseJSON(decodeURIComponent(option.data('details')));

			if (google) {
				var html = '<option value="">Select style</option>';

			    for (i = 0; i<=Object.size(details.variants); i++){
			      if (details.variants[i] == null)
			        continue;
			      if (details.variants[i].id == style) {
			        var selected = ' selected="selected"';
			      } else {
			        selected = "";
			      }
			      html += '<option value="'+details.variants[i].id+'"'+selected+'>'+details.variants[i].name.replace('+',' ')+'</option>';
			    }
				$('#'+mainID+' .of-typography-style').html(html);
				

				html = '<option value="">Select script</option>';

			    for (i = 0; i<=Object.size(details.subsets); i++){
			      if (details.subsets[i] == null)
			        continue;
			      if (details.subsets[i].id == script) {
			        var selected = ' selected="selected"';
			      } else {
			        selected = "";
			      }
			      html += '<option value="'+details.subsets[i].id+'"'+selected+'>'+details.subsets[i].name.replace('+',' ')+'</option>';
			    }
			   
				$('#'+mainID+' .of-typography-script').html(html);
				


				
			}

			var _linkclass = 'style_link_'+ mainID;
			var _previewer = mainID.replace('section-','') +'_ggf_previewer';
			
			if( face ){ //if var exists and isset
				//Check if selected is not equal with "Select a font" and execute the script.
				if ( face !== 'none' && face !== 'Select a font' ) {
					
					//remove other elements crested in <head>
					$( '.'+ _linkclass ).remove();

//<link href="http://fonts.googleapis.com/css?family=' . $webfontname . ':' . $webfont_weight . '&subset=' . $webfont_character_set . '" rel="stylesheet" type="text/css">';

					
					//replace spaces with "+" sign
					var the_font = face.replace(/\s+/g, '+');
					
					if ($('#'+mainID+' .of-typography-new-face:selected').data('google')) {
						//add reference to google font family
						$('head').append('<link href="http://fonts.googleapis.com/css?family='+ the_font +':'+style.replace('-','')+'&subset='+script+'" rel="stylesheet" type="text/css" class="'+ _linkclass +'">');						
					}
					
					//var regex = '/(\d+)/g';
					//var result = (style.match(regex));

					if (style.indexOf("-") !== -1) {
						var n = style.split("-");
						$('.'+ _previewer ).css('font-weight', n[0] );
						$('.'+ _previewer ).css('font-style', n[1] );
					} else {
						
						$('.'+ _previewer ).css('font-style', style );
					}
					
					
					


					//show in the preview box the font
					$('.'+ _previewer ).css('font-family', face +', sans-serif' );
					
				}else{
					
					//if selected is not a font remove style "font-family" at preview box
					$('.'+ _previewer ).css('font-family', '' );
					
				}

				//$('.'+ _previewer ).css('line-height', height );
				$('.'+ _previewer ).css('color', color );
			}
		
		}
		
		//init for each element
		jQuery( '.section-select_google_font_hybrid' ).each(function(){ 
			var mainID = jQuery(this).attr('id');
			GoogleFontSelectHybrid( mainID, $(this) );
		});
		
		//init when value is changed
		jQuery( '.google_font_hybrid_value' ).change(function(){ 			
			var mainID = jQuery(this).closest('.section-select_google_font_hybrid').attr('id');
			GoogleFontSelectHybrid( mainID, $(this) );
		});

	
		

    });