<div id="menu">
		  <ul class="nav">
				<li id="businessmainnavlink"> <a href="javascript:void(0);" title="Apna survey - Show businesses" onclick="doSurveyAction('showbusiness')"> <span class="hidden-minibar">Business</span> </a> </li>
				<li> <a href="javascript:void(0);" title="Apna survey - Show groups" onclick="doSurveyAction('groups')" > <span class="hidden-minibar">Groups</span> </a> </li>
				<li> <a href="javascript:void(0);" title="Apna survey - Business user" onclick="doSurveyAction( 'getusersbybusiness' )" ><span class="hidden-minibar"  >Users </span> </a> </li>
				<li class="submenu"> 
					<a class="dropdown" onClick="return false;" href="#" title="Apna survey - Filter criteria" > 
						<span class="hidden-minibar">Filter criteria </span> <i class='fa-chevron-right'>&gt;</i> 
					</a>
					<ul class="animated fadeInDown">
								<li> <a href="javascript:void(0);" title="Apna survey - Locations" onclick="doSurveyAction('getlocations')" > <span id="locationlabelmainlink1" class="hidden-minibar">Location</span> </a> </li>
								<li> <a href="javascript:void(0);" title="Apna survey - Items" onclick="doSurveyAction('getitems')" > <span id="itemlabelmainlink1" class="hidden-minibar">Item</span> </a> </li>
								<li> <a href="javascript:void(0);" title="Apna survey - Register a business" onclick="doSurveyAction('registerbusiness')" > <span class="hidden-minibar">Register business( Testing )</span> </a> </li>
					</ul>
				</li>

				<li> <a href="javascript:void(0);" title="Apna survey - My surveys" onclick="doSurveyAction( 'getsurveys' )" ><span class="hidden-minibar"  >My survey </span> </a> </li>
 
				
				<li> <a href="javascript:void(0);" title="Apna survey - Settings" onclick="doSurveyAction('getsettings')" > <span class="hidden-minibar">Setting</span> </a> </li>
				<li> <a href="javascript:void(0);" title="Apna survey - Reports" onclick="doSurveyAction('reports')" > <span class="hidden-minibar">Analysis report</span> </a> </li>
				<li> <a href="javascript:void(0);" title="Apna survey - Usage stats" onclick="doSurveyAction('usagestats')" > <span class="hidden-minibar">Usage stats</span> </a> </li>
				
				<li> <a href="javascript:void(0);" title="Apna survey - Clean up" onclick="doAdminAction('cleanup')" > <span class="hidden-minibar">Cleanup</span> </a> </li>
		  </ul>
 </div>