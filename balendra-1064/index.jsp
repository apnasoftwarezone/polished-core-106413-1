<%@ include file="includes/includeme.jsp" %>
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>Survey & research</title>
  <link href="style/default/lightbox.css" rel="stylesheet" type="text/css" />
  <link href="style/default/style.css" rel="stylesheet" type="text/css" />
  <link href="style/default/css.css" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="style/default/jquery.fancybox.css" type="text/css" media="screen" />   
  <link rel="stylesheet" href="style/default/DateTimePicker.min.css" type="text/css"/>   
  <link rel="stylesheet" href="style/default/tablesorter.css" type="text/css"/>  

  <script>
  		      var serverUrl = '<%=serverUrl%>';
	          var serviceUrl = '<%=serviceUrl%>';
	          var radiotalkydelimiter = "radiotalkydelimiter" ; 
			  var fileDeleteUrl = serverUrl + "/stream?type=deletefile&name="
			  
			
  </script>
	  <script src="js/jquery.min.js"></script>
 
	  <script src="js/lightbox.min.js"></script>
	  <script type="text/javascript" src="js/jquery.fancybox.pack.js"></script>
      
      <script src="js/util.js" type="text/javascript"></script>
	  
	  <script src="js/taffy.js" type="text/javascript"></script>
	  <script src="js/taffy-min.js" type="text/javascript"></script>
	  <script src="js/object.js" type="text/javascript"></script>
      <script src="js/variable.js" type="text/javascript"></script>  	  
      <script src="js/validation.js" type="text/javascript"></script>  	  
	  <script src="js/requesthandler.js" type="text/javascript"></script>
	  <script src="js/responsehandler.js" type="text/javascript"></script>
	  <script src="js/main.js" type="text/javascript"></script>
	  <script src="js/question.js" type="text/javascript"></script>
	  <script src="js/tabular.js" type="text/javascript"></script>
	  <script src="js/populatechoices.js" type="text/javascript"></script>
	  <script src="js/plupload.full.min.js"></script>
	  <script type="text/javascript" src="js/DateTimePicker.min.js"></script>
	  <script type="application/x-javascript" src="js/jqueryuidraggable.js" ></script>
	  <script type="application/x-javascript" src="js/preview.js" ></script>
	  <script src="js/date.js" type="text/javascript"></script>
	  
<script>
	  var locationdb = TAFFY([]) ;  
	  var surveydb = TAFFY([]) ; 
	  var sectiondb = TAFFY([]) ; 
	  var questiondb = TAFFY([]) ; 
	  var tempquestiondb = TAFFY([]) ; 
	  var typedb = TAFFY(typeJson) ;
	  var businessdb = TAFFY([]);
	  var userdb = TAFFY([]) ;
	  var itemdb = TAFFY([]) ;
	  var settingdb = TAFFY([]);
	  var surveyresponsedb =  TAFFY([]);
	  var selectedGroupAuthorization = null ;
	  
	  		$(document).ready(function() {
	  		// ADD fancy box******************************
	  		$(".fancybox").fancybox({
				openEffect  : 'none',
				closeEffect : 'none',
				iframe : {
					preload: false
				}
			});
	  		$("#submitmyresponseframe").fancybox({
	  		 
				fitToView	: true,
				width		: '100%',
				height		: '100%',
				autoSize	: false,
				closeClick	: false,
				openEffect	: 'none',
				closeEffect	: 'none',
	  		    type          : 'iframe'
	  		});
	  		$("#editmyresponseframe").fancybox({
	  		 
				fitToView	: true,
				width		: '100%',
				height		: '100%',
				autoSize	: false,
				closeClick	: false,
				openEffect	: 'none',
				closeEffect	: 'none',
	  		    type          : 'iframe'
	  		});
			
			$("#dtBox").DateTimePicker({
				
					dateTimeFormat: "yyyy-MM-dd hh:mm:ss",
					dateFormat: "yyyy-MM-dd",
					timeFormat: "hh:mm",
					animationDuration: 100
			});
			
			$(".various").fancybox({
				 
				fitToView	: false,
				width		: '100%',
				height		: '100%',
				autoSize	: false,
				closeClick	: false,
				openEffect	: 'none',
				closeEffect	: 'none'
			});
			
			$(".alertdialog").fancybox({
				maxWidth	: 800,
				maxHeight	: 600,
				fitToView	: false,
				width		: '30%',
				height		: '26%',
				autoSize	: false,
				closeClick	: true,
				openEffect	: 'none',
				closeEffect	: 'none'
			});
			
			
			
			$('.fancybox-media').fancybox({
				openEffect  : 'none',
				closeEffect : 'none',
				helpers : {
					media : {}
				}
			});
	  		
	  		//******************End of fancy boxes
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<tr id="mytext[]"><td>Hi</td><td><input type="text" name="mytext[]"/><a href="#" class="remove_field">Remove</a>&nbsp;&nbsp; <a href="#" class="move-down" style="visibility:hidden;">Move down</a>&nbsp;&nbsp; <a href="#" class="move-up">Move up</a> </tr></div>'); //add input box
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('tr').remove(); x--;
    })
    
    $(wrapper).on("click",".edit-choice", function(e){ 
            e.preventDefault();
            doQuestionAction('editchoice', $(this).parent('td').parent('tr').index()) ;
    })
    
    $(wrapper).on("click",".delete-choice", function(e){ 
            e.preventDefault();
            doQuestionAction('deletechoice', $(this).parent('td').parent('tr').index()) ;
           // $(this).parent('td').parent('tr').remove();
            
    })

	$(wrapper).on("click",".move-up", function(e){ 
        e.preventDefault();
        // reset choice object order then change class
        doQuestionAction('resetchoiceorder', $(this).parent('td').parent('tr').index(), 'moveup' ) ;
        if(( $(this).parent('td').parent('tr').index() % 2 == 0)){	
			  $(this).parent('td').parent('tr').addClass('odd');
			  $(this).parent('td').parent('tr').removeClass('even');
		}
		else{
			  $(this).parent('td').parent('tr').addClass('even');
			  $(this).parent('td').parent('tr').removeClass('odd');
			 			    		
		}
		$(this).parent('td').parent('tr').prev().before($(this).parent('td').parent('tr'));

		    var rowcount = $('#mytableid tr').length ;
		var index = $(this).parent('td').parent('tr').index() ;
		// This is handling visibility of current row
		if(rowcount > 1){ // only then move down and move up will be called a[class=btn-download]
				if (index == 0 ){
					$(this).parent('td').parent('tr').find('a.move-down').css('visibility','visible');
					$(this).parent('td').parent('tr').find('a.move-up').css('visibility','hidden');
				}
				else if(index == (rowcount-1)){
					$(this).parent('td').parent('tr').find('a.move-down').css('visibility','hidden');
					$(this).parent('td').parent('tr').find('a.move-up').css('visibility','visible');
				}
				else{
					$(this).parent('td').parent('tr').find('a.move-down').css('visibility','visible');
					$(this).parent('td').parent('tr').find('a.move-up').css('visibility','visible');
				}
		}
		else{ // rowcount 1, so dont need moveup and movedown button
			$(this).parent('td').parent('tr').find('a.move-down').css('visibility','hidden');
			$(this).parent('td').parent('tr').find('a.move-up').css('visibility','hidden');
		}
		// now handle visibility of second item
		var next = $(this).parent('td').parent('tr').next() ;
		var index = next.index() ;
		if(( index % 2 == 0)){	
			  next.addClass('even');
			  next.removeClass('odd');
		}
		else{
			  next.addClass('odd');
			  next.removeClass('even');
			 			    		
		}
		// This is handling visibility of current row
		if(rowcount > 1){ // only then move down and move up will be called a[class=btn-download]
				if (index == 0 ){
					next.find('a.move-down').css('visibility','visible');
					next.find('a.move-up').css('visibility','hidden');
				}
				else if(index == (rowcount-1)){
					next.find('a.move-down').css('visibility','hidden');
					next.find('a.move-up').css('visibility','visible');
				}
				else{
					next.find('a.move-down').css('visibility','visible');
					next.find('a.move-up').css('visibility','visible');
				}
		}
		else{ // rowcount 1, so dont need moveup and movedown button
			next.find('a.move-down').css('visibility','hidden');
			next.find('a.move-up').css('visibility','hidden');
		}

    })

	$(wrapper).on("click",".move-down", function(e){ //user click on remove text
        e.preventDefault();
        doQuestionAction('resetchoiceorder',$(this).parent('td').parent('tr').index(), 'movedown' ) ;
		// $(this).parent().parent().parent().next().after($(this).parent().parent().parent());
		$(this).parent('td').parent('tr').next().after($(this).parent('td').parent('tr'));
	    var rowcount = $('#mytableid tr').length ;
		var index = $(this).parent('td').parent('tr').index() ;
				 
		if(( index % 2 == 0)){	
			  $(this).parent('td').parent('tr').addClass('even');
			  $(this).parent('td').parent('tr').removeClass('odd');
		}
		else{
			  $(this).parent('td').parent('tr').addClass('odd');
			  $(this).parent('td').parent('tr').removeClass('even');
			 			    		
		}
		// This is handling visibility of current row
		if(rowcount > 1){ // only then move down and move up will be called a[class=btn-download]
				if (index == 0 ){
					$(this).parent('td').parent('tr').find('a.move-down').css('visibility','visible');
					$(this).parent('td').parent('tr').find('a.move-up').css('visibility','hidden');
				}
				else if(index == (rowcount-1)){
					$(this).parent('td').parent('tr').find('a.move-down').css('visibility','hidden');
					$(this).parent('td').parent('tr').find('a.move-up').css('visibility','visible');
				}
				else{
					$(this).parent('td').parent('tr').find('a.move-down').css('visibility','visible');
					$(this).parent('td').parent('tr').find('a.move-up').css('visibility','visible');
				}
		}
		else{ // rowcount 1, so dont need moveup and movedown button
			$(this).parent('td').parent('tr').find('a.move-down').css('visibility','hidden');
			$(this).parent('td').parent('tr').find('a.move-up').css('visibility','hidden');
		}
		
		// now handle visibility of second item
		var next = $(this).parent('td').parent('tr').prev() ;
		var index = next.index() ;
		var index = next.index() ;
		if(( index % 2 == 0)){	
			  next.addClass('even');
			  next.removeClass('odd');
		}
		else{
			  next.addClass('odd');
			  next.removeClass('even');
			 			    		
		}
		// This is handling visibility of current row
		if(rowcount > 1){ // only then move down and move up will be called a[class=btn-download]
				if (index == 0 ){
					next.find('a.move-down').css('visibility','visible');
					next.find('a.move-up').css('visibility','hidden');
				}
				else if(index == (rowcount-1)){
					next.find('a.move-down').css('visibility','hidden');
					next.find('a.move-up').css('visibility','visible');
				}
				else{
					next.find('a.move-down').css('visibility','visible');
					next.find('a.move-up').css('visibility','visible');
				}
		}
		else{ // rowcount 1, so dont need moveup and movedown button
			next.find('a.move-down').css('visibility','hidden');
			next.find('a.move-up').css('visibility','hidden');
		}

	 
    })

});
	  
</script>

 </head>
 <body>
		<header>
					<a href="#" class="logo">
						Survey and Research
					</a>
					<a href="#" class="navbar-btn sidebar-toggle" >
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar" style="margin-top:0px;"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</a>
					<a href="javascript:void(0);" class="profile" onclick="doSurveyAction('login');" >
						<span id="welcomeuserspan" ><i class="caret"><img src="style/default/profile.png" style="height: 12px;"/> </i> Login</span>
					</a>
		</header>
    <div class="maindiv">
			<div class="left-sidebar">
					   <%@ include file="includes/leftnavigation.jsp" %>
			</div>
			<div id="content" class="content wid">
					<div id="businessesdiv" class="box-body" style="display:none;" >
					    <div class="form-group">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Select a business to operate						
							<select name="businesses" id="businesses" title="Select a business to operate" class="form-control-half" required onchange="doSurveyAction('handlebusinesschange')" >
							</select>
					    </div>
					</div>
						<div class="changediv">
								 <%@ include file="includes/basichtml.jsp" %>
						</div>		   
						
			</div>
			
		 

  </div>

<script type="text/javascript">

				  // ref: http://diveintohtml5.org/detect.html
				  function supports_input_placeholder()
				  {
					var i = document.createElement('input');
					return 'placeholder' in i;
				  }

				  if(!supports_input_placeholder()) {
					var fields = document.getElementsByTagName('INPUT');
					for(var i=0; i < fields.length; i++) {
					  if(fields[i].hasAttribute('placeholder')) {
						fields[i].defaultValue = fields[i].getAttribute('placeholder');
						fields[i].onfocus = function() { if(this.value == this.defaultValue) this.value = ''; }
						fields[i].onblur = function() { if(this.value == '') this.value = this.defaultValue; }
					  }
					}
				  }

</script>
    <footer>
			<div>
					<table width="100%" cellpadding="3" cellspacing="3">
						<tbody><tr>
							<td align="right">
								<label title="Apna software zone">Powered by: <a href="http://www.apnasoftwarezone.com" title="Apna software zone" style="color: #FFFFFF;text-decoration: blink;">Apna software zone</a></label>&nbsp;&nbsp;
							</td>
						</tr>
					</tbody></table>
			</div>
	</footer>
<script src="js/myfileuploader.js"></script>
<div id="busyDiv" style="display:none;"><img src="style/default/busy.gif" /></div>
 </body>
</html>
