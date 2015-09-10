<%@page import="com.radiotalky.survey.SurveyDisplaySetting"%>

<div id="searchresultdiv" class="box box-primary" style="display:none;"  >
            <div class="box-header">
              <table style="width:100%">
                  <tr><td align="left" >
					<h3 class="box-title">&nbsp;&nbsp;<a  href="javascript:void(0);" title="Apna survey - Home" onclick="doSurveyAction('homepage')" />Home</a>
					&nbsp;>&nbsp;<a href="javascript:void(0);" title="Apna survey - Search survey responses" onclick="doSurveyAction('showresponsesearchpage')" >Search survey responses</a>				 
					&nbsp;>&nbsp;Survey response</h3>
					</td>
					<td>
					    <a  href="javascript:void(0);" title="Apna survey - Export response to excel" onclick="doSurveyAction('exportresponsetoxls')" /><img src="style/default/xls.png" alt="" /></a>
					</td>
			   </table>
			</div>
			<div class="box-body" id="searchresultcontentdiv">		
			
			</div>
</div>
<div id="searchreportdiv" class="box box-primary" style="display:none;" >
 <form name="searchreportform" method="post" onsubmit="manualValidate(event, 'searchreportform' )" >
			 
	  	<div class="box-body">		
			<div class="box-header">
					<h3 class="box-title">&nbsp;&nbsp;<a  href="javascript:void(0);" title="Apna survey - Home" onclick="doSurveyAction('homepage')" />Home</a>
					&nbsp;>&nbsp;Search survey response</h3>
			</div>
			<div class="form-group">	
							<label>Survey</label>
							<select name="survey"  class="form-control" ></select>
			</div>
			<div class="form-group">	
							<label>Location</label>
							<select name="location"  class="form-control" ></select>
			</div>
			<div class="form-group">	
							<label>Item</label>
							<select name="item"  class="form-control" ></select>
			</div>
			<div class="form-group">	
							<label>User</label>
							<select name="user"  class="form-control" ></select>
			</div>
			<div class="form-group">	
							<label>Source</label>
							<select name="source"  class="form-control" >
									<option value="">Any</option>
									<option value="Android">Android</option>
									<option value="Ios">Ios</option>
									<option value="Facebook">Facebook</option>
									<option value="Twitter">Twitter</option>
									<option value="Web">Web</option>		
									<option value="Desktop">Desktop</option>		
							</select>
							
								 
			</div>
			<div class="form-group">	
							<label>Type</label>
							<select name="type"  class="form-control" >
									<option value="-1">Any</option>
									<option value="0">Response</option>
									<option value="1">Score</option>
									<option value="2">Summary</option>
							</select>
			</div>
			<div class="form-group">	
							<label>Start date</label>
							<input type="text" name="startdate"  data-field="date" class="form-control" Title="Enter start date" placeholder="Enter start date"  />							 
			</div>
			<div class="form-group">	
							<label>End date</label>
							<input type=text name="enddate"  data-field="date" class="form-control" Title="Enter end date" placeholder="Enter end date"  />							 
			</div>
			
			
		    <div class="form-group">
						<button type="submit" class="btn btn-primary" title="Apna survey - Submit">Submit</button>		
						<button type="button" class="btn btn-primary" onclick="doSurveyAction('showsurvey')" title="Apna survey - Cancel" >Cancel</button>										
			</div>
		 </div>
		 			
	</form> 
</div>
<div id="sharemaindiv" class="box box-primary" style="display:none;" >
 <form name="addsharemainform" method="post" onsubmit="manualValidate(event, 'addsharemainform' )" >
			<input name="surveyid" type="hidden"  value ="-1" />
			
		<div class="box-header">
				<h3 class="box-title">&nbsp;&nbsp;<a  href="javascript:void(0);" title="Apna survey - Home" onclick="doSurveyAction('homepage')" />Home</a>
				&nbsp;>&nbsp;<a  id="sharesurveytitlelink" href="javascript:void(0);" title="Apna survey - Show surveys" onclick="doSurveyAction('showsurvey')" ></a>				 
				&nbsp;>&nbsp;Share survey</h3>
		</div>
		<div class="form-group">	
						<label>Share options</label>
						<select name="shareoptions" id="shareoptionsid" class="form-control" onchange="doSurveyAction('handleshare', this.value);">
								<option value="">Select a share option</option>
								<optgroup label="Email & social">
									<option value="email">Send an email campaign</option>
									<option value="facebook">Facebook</option>
									<option value="twitter">Twitter</option>								 
								</optgroup>
								<optgroup label="Embedded">
									<option value="iframe">Iframe</option>									
									<option value="popup">Popup</option>									 
								</optgroup>
						</select>
										
		</div>
		
		<div id="sharetextareacontainer" class="form-group">	
						<label>Copy the code below to embed on your site</label>
						<textarea readonly="" class="form-control-textarea" rows="8" id="sharetextarea" ></textarea>
		</div>		
		<div id="twittercontainer" style="display:none;" class="form-group">
				<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
				<div id="twittersharelink" >
				</div>						 
		</div>						
		<div id="facebookcontainer" style="display:none;" class="form-group">
				 
		</div>						
	</form> 
</div>
<div id="addedittabulardiv" class="box box-primary" style="display:none;">
	<form name="addedittabularform" method="post" onsubmit="manualValidate(event, 'addedittabularform' )" >
			<input name="tabularquestiontype" type="hidden"  value ="13" />
			 <div class="box-header">
					<h3 class="box-title">&nbsp;&nbsp;Add/edit tabular question</h3>
			 </div>
			 <div class="box-body">
		 			<div class="form-group">
							<button type="button" onclick="doTabularAction('addquestionok');" title="Apna survey - Add question" class="btn btn-primary">Submit</button>	
							<button type="button" class="btn btn-primary" onclick="doSurveyAction('addquestioncancel')" title="Apna survey - Cancel" >Cancel</button>										
					</div>				
					
					<div class="form-group">
					            <label><b>Question</b></label> 	
					</div>	
					<div class="form-group">						 
								<textarea name="question" rows="2"  title="Enter question" placeholder="Enter question" class="form-control-textarea"  required></textarea>
					</div>
					<div class="form-group">
					            <label><b>Row title visibility</b></label> 	
					</div>	
					<div class="form-group">
					            <label title="Check to make row title visible on response submission form" ><input type="radio" name="rowtitlevisibility"  title="Check to make row title visible on response submission form" value="1"  />Row title visible  &nbsp;&nbsp;</label>
					            <label title="Check to make row title hidden on response submission form" ><input type="radio" name="rowtitlevisibility"  title="Check to make row title hidden on response submission form" value="0" checked  />Row title hidden  &nbsp;&nbsp;</label>
					</div>						 
					<div class="form-group">
						<h3 class="box-title">
					            <a href="javascript:void()" title="Apna survey - Add all columns of previous row " onclick="doTabularAction('addcoloumnofpreviousrow');" >Add coloumns of previous row</a>
					    </h3>	
					</div>	
					<div class="form-group">
					            <label><b>Column title visibility style</b></label> 	
					</div>	
					<div class="form-group">
					            <label title="Check to make coloumn title common for all rows" ><input type="radio" name="coloumnvisibility"  title="Check to make coloumn title common for all rows" value="1"  checked />Common coloumn title for all rows  &nbsp;&nbsp;</label>
					            <label title="Check if a coloumn can have different title for for all rows" ><input type="radio" name="coloumnvisibility"  title="Check if a coloumn can have different title for for all rows" value="0"  />Different coloumn title for all rows  &nbsp;&nbsp;</label>
					</div>	
					<div class="form-group">
					            <label><b>Row title</b></label> 	
					</div>	
					
					<div id="rowcontainerdiv" >
							<div class="form-group">	
								 <input type="text" name="rowtitle" class="form-control" placeholder="Enter row title" />								 	
							</div>
					</div>
					
					
					<div id="coloumncontainerdiv" >	
						<div class="form-group">
								<label><b>Coloumn title</b></label> 	
						</div>				
						<div class="form-group">
							<input type="text" name="coloumntitle" class="form-control-half" placeholder="Enter coloumn title" />						
							<select name="questiontype" title="Select a question type" class="form-control-half" required onchange="doTabularAction('questiontypechange')" >
							</select>
					    </div>
				   	</div>
				   	
				   	<div id="rangecontainerdiv" >
				   			<div class="form-group">
								<label><b>From range</b></label> 	
							</div>		
							<div class="form-group">	
								 <input type="number" name="fromrange" pattern="/\A[+-]?\d+(?:\.\d{1,2})?\z/" placeholder="Enter start range value" title="Enter from range value" class="form-control" />  
							</div>
							<div class="form-group">
								<label><b>To range</b></label> 	
							</div>	
							<div class="form-group">	
								 <input type="number" name="torange" pattern="/\A[+-]?\d+(?:\.\d{1,2})?\z/" placeholder="Enter end range value" title="Enter to range value" class="form-control" />  
							</div>
							<div class="form-group">
								<label><b>Increment</b></label> 	
							</div>	
							<div class="form-group">	
								 <input type="number" name="increment" pattern="/\A[+-]?\d+(?:\.\d{1,2})?\z/" placeholder="Enter end range value" title="Enter the increment value" class="form-control" />  
							</div>					
					</div>
					
					<div id="choicecontainer" >		
							<div class="form-group">
								<label><b>Choice</b></label> 	
							</div>						   
							<div class="form-group">
								      <input type="text" name="choice" class="form-control-half" placeholder="Add choice" />
      								  <select name="populatechoices" class="form-control-half" onchange="populateChoice( this.value, 'addedittabularform' );">
											<option value="">Populate choices from template</option>
											<optgroup label="Basics">
												<option value="truefalse">True / False</option>
												<option value="yesno">Yes / No</option>
												<option value="1to10">Numbers (1-10)</option>											 
												<option value="days">Days (7)</option>
												<option value="months">Months (12)</option>											
											</optgroup>
											<optgroup label="Demographics">
												<option value="age">Age</option>
												<option value="gender">Gender</option>
												<option value="race">Race</option>
												<option value="marital">Marital status</option>
												<option value="income">Household income (HHI)</option> 
												<option value="countries">Countries</option>
											</optgroup>
											<optgroup label="Ratings">
										        <option value="ratingsatisfied">Rating satisfied</option>
										        <option value="ratingagree">Rating agree</option>
										        <option value="starrating">Star rating</option>
											</optgroup>
									</select>
							  </div> 
								      
							<div class="form-group">
							      <label title="Check the option if comment field required in response from device" ><input type="checkbox" name="commentrequired" id="commentrequiredid" title="Check the option if comment field required in response from device"  />Comment field required &nbsp;&nbsp;</label>
							      <button type="button" onclick="doTabularAction('addchoiceok');" class="btn btn-primary" title="Apna survey - Add choice" >Add choice</button>
							</div>
							<div class="form-group">
								<label><b>Choices</b></label> 	
							</div>	
							<div id="choicelistingdiv1" >choices go here</div>
					</div>
					
					<button type="button" onclick="doTabularAction('addcoloumnok');" class="btn btn-primary" title="Apna survey - Add column">Add coloumn</button>
					<div class="form-group">
								<label><b>Coloumns</b></label> 	
					</div>	
					<div id="coloumnlistingdiv" >Coloumn listing will go here</div>
					<div class="form-group">
						<button type="button" onclick="doTabularAction('addrowok');" class="btn btn-primary" title="Apna survey - Add row">Add row</button>
					</div>
					<div id="rowcontainerdiv" >	
							<div class="form-group">
										<label><b>Rows</b></label> 	
							</div>		
							<div id="rowlistingdiv" >Row listing will go here</div>
					</div>
				 
			  </div>
	</form>
 </div>
				
				
				
<div id="homediv" style="display:none;" >
		 This is homediv. Put your default content here.
</div>
 						
							
<div id="questiondiv" class="box box-primary" style="display:none;">
		 <div class="box-header">
				<h3 class="box-title">&nbsp;&nbsp;<a href="javascript:void(0);" title="Apna survey - Home" onclick="doSurveyAction('homepage')" />Home</a>
				&nbsp;>&nbsp;<a  id="questionsurveytitlelink" href="javascript:void(0);" title="Apna survey - Show surveys" onclick="doSurveyAction('showsurvey')" ></a>
				&nbsp;>&nbsp;<a id="questionsectiontitlelink" href="javascript:void(0);" title="Apna survey - Show sections of survey" onclick="doSurveyAction('showsection')"  ></a>
				&nbsp;>&nbsp;Questions</h3>
		 </div>
		  <div class="box-body">
		  	<div class="form-group">
		  		 <button type="button" class="btn btn-primary" onclick="doSurveyAction('addquestion')" title="Apna survey - Add a question" >Add a question</button>
		  	</div> 
		  	<div class="form-group">
				 <div id="questionlistingdiv" >  
				 	    <label>No question found</label>
				 </div>
			</div>
		  </div>
</div>

<div id="addeditquestiondiv" class="box box-primary" style="display:none;">
	<form name="addeditquestionform" method="post" onsubmit="manualValidate(event, 'addeditquestionform' )" >
		<input name="id" type="hidden"  value ="-1" />
		 <div class="box-header">
				<h3 class="box-title">&nbsp;&nbsp;Add/edit question</h3>
		 </div>
		 <div class="box-body">
	 			<div class="form-group">
						<button type="button" onclick="doQuestionAction('addquestionok');" class="btn btn-primary" title="Apna survey - Submit">Submit</button>	
						<button type="button" class="btn btn-primary" onclick="doSurveyAction('addquestioncancel')" title="Apna survey - Cancel" >Cancel</button>										
				</div>
				<div class="form-group">
						<select name="questiontype" title="Select a question type" class="form-control" required onchange="doQuestionAction('questiontypechange')" >						
						</select>
				</div>
				
				<div class="form-group">								 
							<textarea  name="question" rows="2"  title="Enter question" placeholder="Enter question" class="form-control-textarea"  required></textarea>
				</div>
				
				 
				<div id="questionfilecontainer" class="form-group">	
						   <div id="questionfilelist"></div>
						   <p>
								<span id="questionimagefile" > </span>
						   </p>
						   <p>
				           <a id="questionFilePicker" title="Apna survey - Click to attach a question file" href="javascript:void(0);" class="box-title"  >Pick a question file</a>							 
				           <a id="removequestionFile" title="Apna survey - Delete attached question file" href="javascript:void(0);" style="display:none;" class="box-title" >Remove</a>
							</p>					 
				
				</div>
				
				<div class="form-group">								 

							<label title="Check the option if picture attachment required in response from device"  ><input type="checkbox" name="picturerequired" id="picturerequiredid" title="Check the option if picture attachment required in response from device"  />Picture attachment required &nbsp;&nbsp;</label>
							<label title="Check the option if this question have to shwn based on the response of some other question" ><input type="checkbox" name="isconditional" id="isconditionalid" onchange="doQuestionAction('showhideconditionalquestions');" title="Check the option if this question have to shwn based on the response of some other question"  />Visibility based on condition &nbsp;&nbsp;</label>
				</div>
				
				<div id="conditiondiv" >								 
					<div class="form-group">								 
							<select name="conditionalquestion" onchange="doQuestionAction('populatechoices');" title="Select a question, based on which have to show this question" class="form-control" >
							</select>
					 </div>
					<div class="form-group">								 
							<select name="condition" title="Select a condition" class="form-control">
									<option selected="selected" value=" == ">Equals</option>
									<option value=" != ">Not equals</option>
									<option value=" >= ">Greater or equals</option>
									<option value=" <= ">Less or equals</option>
							</select>							
					</div>
					<div class="form-group">								 
							<select name="conditionalchoice" title="Select a choice" class="form-control" ></select>							
					</div>
					 
				</div>
				
				<div id="rangetypequestiondiv" >
					<div class="form-group">	
						 <input type="number" name="fromrange" pattern="/\A[+-]?\d+(?:\.\d{1,2})?\z/" placeholder="Enter start range value" title="Enter from range value" class="form-control" />  
					</div>
					<div class="form-group">	
						 <input type="number" name="torange" pattern="/\A[+-]?\d+(?:\.\d{1,2})?\z/" placeholder="Enter end range value" title="Enter to range value" class="form-control" />  
					</div>
					<div class="form-group">	
						 <input type="number" name="increment" pattern="/\A[+-]?\d+(?:\.\d{1,2})?\z/" placeholder="Enter end range value" title="Enter the increment value" class="form-control" />  
					</div>					
				 </div>
				
				<div id="addeditchoicediv" >
			
					<div class="form-group">	
								<input type="text" name="choice" class="form-control-half" placeholder="Enter choice" />
								<select name="populatechoices" id="choicetemplateid" class="form-control-half" onchange="populateChoice( this.value);">
										<option value="">Populate choices from template</option>
										<optgroup label="Basics">
											<option value="truefalse">True / False</option>
											<option value="yesno">Yes / No</option>
											<option value="1to10">Numbers (1-10)</option>											 
											<option value="days">Days (7)</option>
											<option value="months">Months (12)</option>											
										</optgroup>
										<optgroup label="Demographics">
											<option value="age">Age</option>
											<option value="gender">Gender</option>
											<option value="race">Race</option>
											<option value="marital">Marital status</option>
											<option value="income">Household income (HHI)</option> 
											<option value="countries">Countries</option>
										</optgroup>
										<optgroup label="Ratings">
									        <option value="ratingsatisfied">Rating satisfied</option>
									        <option value="ratingagree">Rating agree</option>
									        <option value="starrating">Star rating</option>
										</optgroup>
								</select>
												
					</div>
					 
					<div  class="form-group">								 
							<label id="showchoicewithimage"  title="Check the option if both image and choice have to shown" ><input type="checkbox" name="showchoicewithimage" checked title="Check the option if both image and choice have to shown"  />Display choice with image &nbsp;&nbsp;</label>
							<label title="Check the option if you want to make it as default choice" ><input type="checkbox" name="defaultselectedchoice" title="Check the option if you want to make it as default choice"  />Default selected choice &nbsp;&nbsp;</label>
							<label title="Check the option if comment field required in response from device" ><input type="checkbox" name="commentrequired" id="commentrequiredid" title="Check the option if comment field required in response from device"  />Comment field required &nbsp;&nbsp;</label>
				    </div>
					
					<div class="form-group" id="choicefileid" >							 
								   <div id="choicefilecontainer">	
								      <div id="choicefilelist"></div>
								      <p>
								  
								      	  <span id="choiceimagefile" > </span>
								      </p><p>
								         
							           <span style="display: table-cell;vertical-align: middle;">
							          		 <a id="choiceFilePicker" title="Apna survey - Click to attach a file for choice" href="javascript:void(0);" class="box-title"  >Pick a choice file</a>							 
							          		 <a id="removechoiceFile" style="display:none;" title="Apna survey - Click to delete choice file" href="javascript:void(0);" class="box-title"  >Remove</a>
							           </span>							 
									   </p>
									</div>
				 
					</div>	
				    <div id="scoreid" class="form-group">	
						 	<input type="number" name="score" pattern="/\A[+-]?\d+(?:\.\d{1,2})?\z/" placeholder="Enter score of choice="Enter score of choice" class="form-control" />  
					</div>
			
				    
				    <div class="form-group" >
				   		 <button type="button" class="btn btn-primary" onclick="doQuestionAction('addchoiceok')" title="Apna survey - Add choice" >Add choice</button>
				    </div>	
				 
				</div>
				<div id="choicelisting" class="input_fields_wrap" >
					Choice listing will be shown here
				</div>
				 
		</div>									
	

	</form>
</div>

<div id="surveydiv" class="box box-primary" style="display:none;">
		 <div class="box-header">
				<h3 class="box-title">&nbsp;&nbsp;<a href="javascript:void(0);" title="Apna survey - Home" onclick="doSurveyAction('homepage')" />Home</a>
				<strong>&nbsp;>&nbsp;</strong>Surveys</h3>
		 </div>
		  <div class="box-body">
		  	<div class="form-group">
		  		 <button type="button" class="btn btn-primary" onclick="doSurveyAction('addsurvey')" title="Apna survey - Add a survey" >Add a survey</button>
		  	</div>
		  	<div class="form-group">
				 <div id="surveylistingdiv" >  
				 	    <label>No survey found</label>
				 </div>
			</div>
		  </div>
</div>
<div id="addeditsurveydiv" class="box box-primary" style="display:none;">
	<form name="addeditsurveyform" method="post" onsubmit="manualValidate(event, 'addeditsurveyform' )" >
		<input name="id" type="hidden"  value ="-1" />
		 <div class="box-header">
				<h3 class="box-title">&nbsp;&nbsp;Add/edit survey</h3>
		 </div>
		 <div class="box-body">
				<div class="form-group">													 
						<select name="type" title="Select survey type" class="form-control" required  >	
							<option value="0" >Type response</option> 					
							<option value="1" >Type score</option> 					
						</select> 
				</div>
				<div class="form-group">													 
						<input name="title" type ="text" title="Enter title" placeholder="Enter title" required class="form-control" /> 
				</div>
				<div class="form-group">								 
							<textarea name="description" rows="2"  title="Enter description" placeholder="Enter description" class="form-control-textarea"  required></textarea>
				</div>
				<div class="form-group">								 
							<textarea name="instruction" rows="2"  title="Enter instruction" placeholder="Enter instruction" class="form-control-textarea"  required></textarea>
				</div>
				<div class="form-group">								 
							<textarea name="welcomemessage" rows="2"  title="Enter welcome message" placeholder="Enter welcome message" class="form-control-textarea"  required></textarea>
				</div>
				<div class="form-group">								 
							<textarea name="thankyoumessage" rows="2"  title="Enter thank you message" placeholder="Enter thank you message" class="form-control-textarea"  required></textarea>
				</div>
				<div class="form-group">								 
							<input name="startdate" type ="text" data-field="date" title="Enter start date" placeholder="Enter start date" required class="form-control" />
				</div>
				<div class="form-group">								 
							<input name="enddate" type ="text" data-field="date" title="Enter end date" placeholder="Enter end date" required class="form-control" />
				</div>
				<div class="form-group">
						<button type="submit" class="btn btn-primary" title="Apna survey - Submit">Submit</button>	
						<button type="button" class="btn btn-primary" onclick="doSurveyAction('addsurveycancel')" title="Apna survey - Cancel" >Cancel</button>										
				</div>
				 
		</div>									

	</form>
</div>	
							<div id="sectiondiv" class="box box-primary" style="display:none;">
									 <div class="box-header">
											<h3 class="box-title">&nbsp;&nbsp;<a href="javascript:void(0);" title="Apna survey - Home" onclick="doSurveyAction('homepage')" />Home</a>
											<strong>&nbsp;>&nbsp;</strong><a href="javascript:void(0);" title="Apna survey - Show surveys" onclick="doSurveyAction('showsurvey')" >
											<label id="surveytitlelabel"></label></a><strong>&nbsp;>&nbsp;</strong>Sections</h3>
									 </div>
									  <div class="box-body">
									  	<div class="form-group">
									  		 <button type="button" class="btn btn-primary" onclick="doSurveyAction('addsection')" title="Apna survey - Add a section" >Add a section</button>
									  		 
									  	</div>
									  	<div class="form-group">
											 <div id="sectionlistingdiv" >  
											 	    <label>No section found</label>
											 </div>
										</div>
									  </div>
							</div>	
							<div id="addeditsectiondiv" class="box box-primary" style="display:none;">
								<form name="addeditsectionform" method="post" onsubmit="manualValidate(event, 'addeditsectionform' )" >
									<input name="id" type="hidden"  value ="-1" />
									 <div class="box-header">
											<h3 class="box-title">&nbsp;&nbsp;Add/edit section</h3>
									 </div>
									 <div class="box-body">
											<div class="form-group">													 
													<input name="title" type ="text" title="Enter title" placeholder="Enter title" required class="form-control" /> 
											</div>
											<div class="form-group">								 
														<textarea name="description" rows="2"  title="Enter description" placeholder="Enter description" class="form-control-textarea"  required></textarea>
											</div>
											<div class="form-group">								 
														<textarea name="instruction" rows="2"  title="Enter instruction" placeholder="Enter instruction" class="form-control-textarea"  required></textarea>
											</div>
											<div class="form-group">
													<button type="submit" class="btn btn-primary" title="Apna survey - Submit">Submit</button>	
													<button type="button" class="btn btn-primary" onclick="doSurveyAction('addsectioncancel')" title="Apna survey - Cancel" >Cancel</button>										
											</div>
											 
									</div>									

								</form>
							</div>												
														
							<div id="locationdiv" class="box box-primary" style="display:none;">
									 <div class="box-header">
											<h3 class="box-title">&nbsp;&nbsp;<a href="javascript:void(0);" title="Apna survey - Home" onclick="doSurveyAction('homepage')" />Home</a>
											&nbsp;>&nbsp;Locations
									 </div>
									  <div class="box-body">
									  	<div class="form-group">
									  		 <button type="button" class="btn btn-primary" onclick="doSurveyAction('addlocation')"  title="Apna survey - Add a location" >Add a location</button>
									  	</div>
									  	<div class="form-group">
											 <div id="locationlistingdiv" >  
											 	    <label>No location found</label>
											 </div>
										</div>
									  </div>
							</div>
							
							<div id="addeditlocationdiv" class="box box-primary" style="display:none;">
								<form name="addeditlocationform" method="post" onsubmit="manualValidate(event, 'addeditlocationform' )" >
									<input name="id" type="hidden"  value ="-1" />
									 <div class="box-header">
											<h3 class="box-title">&nbsp;&nbsp;Add/edit location</h3>
									 </div>
									 <div class="box-body">
											<div class="form-group">													 
													<input name="name" type ="text" title="Enter name" placeholder="Enter name" class="form-control" required /> 
											</div>
											<div class="form-group">								 
														<textarea name="description" rows="2"  title="Enter description" placeholder="Enter description" class="form-control-textarea"  required></textarea>
											</div>
											<div class="form-group">
														<input name="email" type ="text" placeholder="Enter email" title="Enter email" pattern="[^ @]+@[^ @]+.[a-z]+"   class= "form-control"  /> 
											</div>
											<div class="form-group">
														<input name="phone" type ="tel" title="Enter phone" placeholder="Enter phone" pattern="^([0-9\(\)\/\+ \-]*)$" class= "form-control"  /> 
											</div>
											<div class="form-group">
													<button type="submit" class="btn btn-primary" title="Apna survey - Submit" >Submit</button>	
													<button type="button" class="btn btn-primary" onclick="doSurveyAction('addlocationcancel')" title="Apna survey - Cancel" >Cancel</button>										
											</div>
									</div>									

								</form>
							</div>
						
							<div id="logindiv" class="box box-primary"  >
								<form name="loginform" method="post" onsubmit="manualValidate(event, 'loginform' )" >
									 <div class="box-header">
											<h3 class="box-title">&nbsp;&nbsp;Login</h3>
									 </div>
									 <div class="box-body">
											<div class="form-group">
													 
													<input name="loginname" type ="text"  value="radiotalky" class="form-control" title="Enter login name" placeholder="Enter login name" required /> 
											</div>
											<div class="form-group">
													 
													<input name="password" type ="password" value="radiotalky123" class="form-control" title="Enter password"  placeholder="Enter password" required pattern="^\S{6,}$" /> 
											</div>
											<div class="form-group">
													<button type="submit" class="btn btn-primary" title="Apna survey - Login">Login</button>	
													 
													<p><a class="box-title" href="javascript:void(0);" title="Apna survey - Recover password" onclick="doSurveyAction('recoverpassword')">I forgot my password</a></p>
													 
													<a class="box-title" href="javascript:void(0);" title="Apna survey - Register business" onclick="doSurveyAction('registerbusiness');" >Register a business</a>
											</div>
									</div>

								</form>
							</div>
								

							<div id="registerbusinessdiv" class="box box-primary" style="display:none;" >
									<form name="regitserbusinessform" method="post" onsubmit="manualValidate(event, 'regitserbusinessform' )" >
										<div class="box-header">
												<h3 class="box-title">&nbsp;&nbsp;Register business</h3>
										 </div>
										 <div class="box-body">
												<div class="form-group">
														 
														<input pattern='^[0-9a-zA-Z ]+$' class="form-control" title="Enter business name" id="name" name="name" type ="text" placeholder="Enter business name" required /> 
												</div>
												<div class="form-group">								 
														<textarea class="form-control-textarea" id="address" name="address" rows="2"  title="Enter address of business" placeholder="Enter address of business"  required></textarea>
												</div>
												<div class="form-group">	
														<select name="country" id="country" class="form-control" required>
																					<option value="">Select country</option>
																					<option value="USA" >USA</option>
																					<option value="UK" >UK</option>
																					<option value="INDIA">INDIA</option>
																				 
														</select>
												</div>
												<div class="form-group">
														<input required pattern="[a-zA-Z ]{3,30}" title="Enter state name" id="state" name="state" class= "form-control" type ="text" placeholder="Enter state name" /> 
												</div>
												<div class="form-group">
														<input required pattern="[a-zA-Z ]{3,30}" title="Enter city name" id="city" name="city" class= "form-control" type ="text" placeholder="Enter city name" /> 
												</div>
												<div class="form-group">
														<input required pattern="^(0|[1-9][0-9]*)$" title="Enter zipcode" id="zipcode" name="zipcode" class= "form-control" type ="number" placeholder="Enter zipcode" /> 
												</div>

												<div class="form-group">
														<input type ="text" pattern="[^ @]+@[^ @]+.[a-z]+" required id="email" name="email" title="Enter email"  class= "form-control" placeholder="Enter email" /> 
												</div>
												<div class="form-group">
														<input required pattern="^([0-9\(\)\/\+ \-]*)$" title="Enter phone" id="phone" name="phone" class= "form-control" type ="tel" placeholder="Enter phone" /> 
												</div>
												<div class="form-group">
														<input required pattern="[a-zA-Z ]{3,30}" title="Enter first name" id="firstname" name="firstname" class= "form-control" type ="text" placeholder="Enter first name" /> 
												</div>
												<div class="form-group">
														<input required pattern="[a-zA-Z]{3,30}" title="Enter last name" id="lastname" name="lastname" class= "form-control" type ="text" placeholder="Enter last name" /> 
												</div>
												<div class="form-group">
														<input required title="Enter login name" id="loginname" name="loginname" class= "form-control" type ="text" placeholder="Enter login name" /> 
												</div>
												<div class="form-group">
														<input required id="password" name="password" class= "form-control" type ="password" placeholder="Enter password(minimum 6 character)" pattern="^\S{6,}$" title="Enter password(minimum 6 character)" /> 
												</div>
												<div class="form-group" >
														<input required title="Enter confirm password" id="confirmpassword" name="confirmpassword" class= "form-control" type ="password" placeholder="Enter the password you have entered above" pattern="^\S{6,}$" >
												</div>
												
												<div class="form-group">
														<button type="submit" class="btn btn-primary" title="Apna survey - Submit">Submit</button>
														<button type="button" class="btn btn-primary" onclick="doSurveyAction('registerbusinesscancel')" title="Apna survey - Cancel" >Cancel</button>
												</div>
												 
												 </div>

											 
										</form>
 
							</div>
							
<div id="businessmaindiv" class="box box-primary" style="display:none;">
		 <div class="box-header">
				<h3 class="box-title">&nbsp;&nbsp;<a href="javascript:void(0);" title="Apna survey - Home" onclick="doSurveyAction('homepage')" />Home</a>
					&nbsp;>&nbsp;Businesses
				</h3>
		 </div>
		  <div class="box-body">
		  	<div class="form-group">
		  		 <button type="button" class="btn btn-primary" onclick="doSurveyAction('addbusiness')" title="Apna survey - Add a business" >Add a business</button>
		  	</div> 
		  	<div class="form-group">
				 <div id="businesslistingdiv" >  
				 	    <label>No business found</label>
				 </div>
			</div>
		  </div>
</div>					

<div id="addeditbusinessdiv" class="box box-primary" style="display:none;">
	<form name="addeditbusinessform" method="post" onsubmit="manualValidate(event, 'addeditbusinessform' )" >
			 <input name="businessid" type="hidden" value = "-1" />
			 <div class="box-header">
					<h3 class="box-title">&nbsp;&nbsp;Add/edit business</h3>
			 </div>
			 <div class="box-body">
		 			<div class="form-group">
							<button type="submit"  class="btn btn-primary" title="Apna survey - Submit">Submit</button>	
							<button type="button" class="btn btn-primary" onclick="doSurveyAction('addbusinesscancel')" title="Apna survey - Cancel" >Cancel</button>										
					</div>				
					
					<div class="form-group">								 
							<select name="businessadmin" class="form-control" onchange="doSurveyAction('businessadminchange')"  title="Select a business admin" required  >
							</select>
					</div>					
					<div id="admincontainer" >
									<div class="form-group">
											<input name="firstname" type ="text" class= "form-control"  pattern="[a-zA-Z ]{3,30}" title="Enter first name"   placeholder="Enter first name" required /> 
									</div>
									<div class="form-group">
											<input name="lastname" type ="text" pattern="[a-zA-Z]{3,30}" class= "form-control"  title="Enter last name" placeholder="Enter last name" required /> 
									</div>
									<div class="form-group">
											<input required title="Enter login name"  name="loginname" class= "form-control" type ="text" placeholder="Enter login name" /> 
									</div>
									<div class="form-group">
											<input required name="password" class= "form-control" type ="password" placeholder="Enter password(minimum 6 character)" pattern="^\S{6,}$" title="Enter password(minimum 6 character)" /> 
									</div>
									<div class="form-group" >
											<input required title="Enter confirm password" name="confirmpassword" class= "form-control" type ="password" placeholder="Enter the password you have entered above" pattern="^\S{6,}$" >
									</div>	
 					</div>
					<div class="form-group">							 
							<input pattern='^[0-9a-zA-Z ]+$' class="form-control" title="Enter business name" name="name" type ="text" placeholder="Enter business name" required /> 
					</div>
					<div class="form-group">								 
							<textarea class="form-control-textarea" name="address" rows="2"  title="Enter address of business" placeholder="Enter address of business"  required></textarea>
					</div>
					<div class="form-group">	
							<select name="country"  class="form-control" required>
														<option value="">Select country</option>
														<option value="USA" >USA</option>
														<option value="UK" >UK</option>
														<option value="INDIA">INDIA</option>
													 
							</select>
					</div>
					<div class="form-group">
							<input required pattern="[a-zA-Z ]{3,30}" title="Enter state name" name="state" class= "form-control" type ="text" placeholder="Enter state name" /> 
					</div>
					<div class="form-group">
							<input required pattern="[a-zA-Z ]{3,30}" title="Enter city name" name="city" class= "form-control" type ="text" placeholder="Enter city name" /> 
					</div>
					<div class="form-group">
							<input required pattern="^(0|[1-9][0-9]*)$" title="Enter zipcode" name="zipcode" class= "form-control" type ="number" placeholder="Enter zipcode" /> 
					</div>

					<div class="form-group">
							<input type ="text" pattern="[^ @]+@[^ @]+.[a-z]+" required name="email" title="Enter email"  class= "form-control" placeholder="Enter email" /> 
					</div>
					<div class="form-group">
							<input required pattern="^([0-9\(\)\/\+ \-]*)$" title="Enter phone" name="phone" class= "form-control" type ="tel" placeholder="Enter phone" /> 
					</div>

					
					
			 </div>	
			 
			 
			 
	 </form>
  </div>
  <div id="groupauthorizationdiv" class="box box-primary" style="display:none;" >

			 
								   <div class="box-header">
											 
											<h3 class="box-title">&nbsp;&nbsp;<a href="javascript:void(0);" title="Apna survey - Home" onclick="doSurveyAction('homepage')" />Home</a>
											&nbsp;>&nbsp;Groups
											
											</h3>
								   </div>
								 
								   <div class="form-group">
										 <div id="authorizationlistingdiv" >  
										 	    <label>No groups found</label>
										 </div>
										 <div id="authorizationdetaildiv" >
										 		 
										 </div>
									</div>
			  
	</div>	 
	
	<div id="usersmaindiv" class="box box-primary" style="display:none;">
		 <div class="box-header">
				<h3 class="box-title">&nbsp;&nbsp;<a href="javascript:void(0);" title="Apna survey - Home" onclick="doSurveyAction('homepage')" />Home</a>
				&nbsp;>&nbsp;Users
				</h3>
		 </div>
		  <div class="box-body">
				  	<div class="form-group">
				  		 <button type="button" class="btn btn-primary" onclick="doSurveyAction('adduser')" title="Apna survey - Add an user account" >Create an account</button>
				  	</div> 
				  	<div class="form-group">
						 <div id="userlistingdiv" >  
						 	    <label>No user found</label>
						 </div>
					</div>
		  </div>
	</div>				
 		  
	<div id="addedituserdiv" class="box box-primary" style="display:none;">
		<form name="addedituserform" method="post" onsubmit="manualValidate(event, 'addedituserform' )" >	
				<input type="hidden" name="userid" value="-1" />			  
				 <div class="box-header">
						<h3 class="box-title">&nbsp;&nbsp;Add/edit user account</h3>
				 </div>
				 <div class="box-body">
			 			<div class="form-group">
								<button type="submit"  class="btn btn-primary" title="Apna survey - Submit" >Submit</button>	
								<button type="submit" class="btn btn-primary" onclick="doSurveyAction('addusercancel')" title="Apna survey - Cancel" >Cancel</button>										
						</div>				
						
						<div class="form-group">								 
								<select name="groups" class="form-control" title="Select a group" required  >
								</select>
						</div>					
						<div id="admincontainer" >
										<div class="form-group">
												<input name="firstname" type ="text" class= "form-control"  pattern="[a-zA-Z ]{3,30}" title="Enter first name"   placeholder="Enter first name" required /> 
										</div>
										<div class="form-group">
												<input name="lastname" type ="text" pattern="[a-zA-Z]{3,30}" class= "form-control"  title="Enter last name" placeholder="Enter last name" required /> 
										</div>
										<div class="form-group">
												<input required title="Enter login name"  name="loginname" class= "form-control" type ="text" placeholder="Enter login name" /> 
										</div>
										<div class="form-group">
												<input required name="password" class= "form-control" type ="password" placeholder="Enter password(minimum 6 character)" pattern="^\S{6,}$" title="Enter password(minimum 6 character)" /> 
										</div>
										<div class="form-group" >
												<input required title="Enter confirm password" name="confirmpassword" class= "form-control" type ="password" placeholder="Enter the password you have entered above" pattern="^\S{6,}$" >
										</div>	
										
										<div class="form-group">
												<input  name="email" type ="email" class= "form-control" pattern="[^ @]+@[^ @]+.[a-z]+"  title="Enter email"  placeholder="Enter email" /> 
										</div>
										<div class="form-group">
												<input name="phone" type ="tel" class= "form-control"  pattern="^([0-9\(\)\/\+ \-]*)$" title="Enter phone"  placeholder="Enter phone" /> 
										</div>
						</div>
	 			</div>
	   </form>
   </div>
   
	<div id="itemdiv" class="box box-primary" style="display:none;">
			 <div class="box-header">
					<h3 class="box-title">
					<h3 class="box-title">&nbsp;&nbsp;<a href="javascript:void(0);" title="Apna survey - Home" onclick="doSurveyAction('homepage')" />Home</a>
											&nbsp;>&nbsp;Items
					
					</h3>
			 </div>
			  <div class="box-body">
			  	<div class="form-group">
			  		 <button type="button" class="btn btn-primary" onclick="doSurveyAction('additem')" title="Apna survey - Add an item" >Add an item</button>
			  	</div>
			  	<div class="form-group">
					 <div id="itemlistingdiv" >  
					 	    <label>No item found</label>
					 </div>
				</div>
			  </div>
	</div>
	
	<div id="addedititemdiv" class="box box-primary" style="display:none;">
		<form name="addedititemform" method="post" onsubmit="manualValidate(event, 'addedititemform' )" >
			<input name="id" type="hidden"  value ="-1" />
			 <div class="box-header">
					<h3 class="box-title">&nbsp;&nbsp;Add/edit item</h3>
			 </div>
			 <div class="box-body">
					<div class="form-group">													 
							<input name="name" type ="text" title="Enter name" placeholder="Enter name" class="form-control" required /> 
					</div>
					<div class="form-group">								 
								<textarea name="description" rows="2"  title="Enter description" placeholder="Enter description" class="form-control-textarea"  required></textarea>
					</div>
					 
					<div class="form-group">
							<button type="submit" class="btn btn-primary" title="Apna survey - Submit">Submit</button>	
							<button type="button" class="btn btn-primary" onclick="doSurveyAction('additemcancel')" title="Apna survey - Cancel" >Cancel</button>										
					</div>
			</div>									

		</form>
	</div>
	
   <div id="addeditsettingdiv" class="box box-primary" style="display:none;">
		<div class="box-header">
		            <h3 class="box-title">&nbsp;&nbsp;<a href="javascript:void(0);" title="Apna survey - Home" onclick="doSurveyAction('homepage')" />Home</a>
											&nbsp;>&nbsp;Add/edit setting
					</h3>
		</div>   
		<form name="addeditsettingform" method="post" onsubmit="manualValidate(event, 'addeditsettingform' )" >
			<input name="id" type="hidden"  value ="-1" />

			 <div class="box-body">
			 		<div class="form-group">
							<button type="submit" class="btn btn-primary" title="Apna survey - Submit">Submit</button>	
							<button type="button" class="btn btn-primary" onclick="doSurveyAction('addsettingcancel')" title="Apna survey - Cancel" >Cancel</button>										
					</div>
					<div class="form-group">													 
							<input name="locationlabel" type ="text" title="Label of location main meenu" value="Location" placeholder="Enter location label" class="form-control" required /> 
					</div>
					<div class="form-group">													 
							<input name="itemlabel" type ="text" title="Label of item main meenu" value="Item" placeholder="Enter item label" class="form-control" required /> 
					</div>
					<div class="form-group">													 
							<label title="Check the option if comment field required in response from device" >
							<input type="checkbox" name="responsesubmissionfromweb" title="Check to enable response submission from web"  />Response submission from web &nbsp;&nbsp;</label> 
					</div>
					<div class="form-group">													 
							<label title="Check the option if comment field required in response from device" >
							<input type="checkbox" name="responsesubmissionfrommobile" title="Check to enable response submission from mobile" checked  />Response submission from mobile &nbsp;&nbsp;</label> 
					</div>
					 
					<div class="form-group">													 
							<label title="Check the option to make the response editable" >
							<input type="checkbox" name="enableresponseeditable" title="Check the option to make the response editable"  />Response editable &nbsp;&nbsp;</label> 
					</div>
					<div class="form-group">													 
							<label title="Check the option to send response on notification" >
							<input type="checkbox" name="sendfullresponseonnotification" title="Check the option to send response on notification" />Send full response on submission &nbsp;&nbsp;</label> 
					</div>

			</div>									

		</form>
	</div>
	
	   <div id="addeditdisplaysettingdiv" class="box box-primary" style="display:none;">
	   		 <div class="box-header">					 
					<h3 class="box-title">&nbsp;&nbsp;<a href="javascript:void(0);" title="Apna survey - Home" onclick="doSurveyAction('homepage')" />Home</a>
					<strong>&nbsp;>&nbsp;</strong><a id="displaysettingsurveytitlelink" href="javascript:void(0);" title="Apna survey - Show surveys" onclick="doSurveyAction('showsurvey')" >Surveys</a>
					<strong>&nbsp;>&nbsp;</strong>
					<label >Add/edit display configuration</label></h3>
					
			 </div>
	   
		<form name="addeditdisplaysettingform" method="post" onsubmit="manualValidate(event, 'addeditdisplaysettingform' )" >
			<input name="surveyid" type="hidden"  value ="-1" />
			 
			 <div class="box-body">
			 		<div class="form-group">
							<button type="submit" class="btn btn-primary" title="Apna survey - Submit">Submit</button>	
							<button type="button" class="btn btn-primary" onclick="doSurveyAction('addsurveycancel')" title="Apna survey - Cancel" >Cancel</button>										
					</div>
					
					<div class="form-group">	
						<label ><b>Survey display setting</b></label>					
					</div>
					<div class="form-group">													 
							&nbsp;&nbsp;<label title="Check to show survey title on submission page" >
								<input type="radio" name="surveytitle" title="Check to show survey title on submission page" value="<%=SurveyDisplaySetting.SURVEY_TITLE_ON_SUBMISSION_PAGE %>"  />Show survey title on submission page
							</label> <br/>
							&nbsp;&nbsp;<label title="Check to show survey both title & description on submission page" >
								<input type="radio" name="surveytitle" title="Check to show both survey title & description on submission page" value="<%=SurveyDisplaySetting.SURVEY_TITLE_DESCRIPTION_ON_SUBMISSION_PAGE %>" />Show both survey title & description on submission page
							</label> <br/>						 
					</div>
					<div class="form-group">	
						<label ><b>Section display setting</b></label>					
					</div>
					<div class="form-group">													 
							&nbsp;&nbsp;<label title="Check to show section title on submission page" >
								<input type="radio" name="sectiontitle" title="Check to show section title on submission page" value="<%=SurveyDisplaySetting.SECTION_TITLE_ON_SUBMISSION_PAGE %>"  />Show survey title on submission page
							</label> <br/>
							&nbsp;&nbsp;<label title="Check to show both section title & description on submission page" >
								<input type="radio" name="sectiontitle" title="Check to show both section title & description on submission page" value="<%=SurveyDisplaySetting.SECTION_TITLE_DESCRIPTION_ON_SUBMISSION_PAGE %>" />Show both section title & description on submission page
							</label> <br/>						 
							&nbsp;&nbsp;<label title="Check if you don't want to show section on submission page" >
								<input type="radio" name="sectiontitle" title="Check if you don't want to show section on submission page" value="<%=SurveyDisplaySetting.DONT_SHOW_SECTION_ON_SUBMISSION_PAGE %>" checked />Don't show section on submission page
							</label> <br/>					 
					</div>
				 
				 	<div class="form-group">	
						<label ><b>Display style</b></label>					
					</div>
					<div class="form-group">													 
							&nbsp;&nbsp;<label title="Check to dispaly survey in single page" >
								<input type="radio" name="displaystyle" title="Check to dispaly survey in single page" value="<%=SurveyDisplaySetting.DISPLAY_STYLE_SINGLE_PAGE %>" checked  />Single page
							</label> <br/>
							&nbsp;&nbsp;<label title="Check to dispaly one section per page" >
								<input type="radio" name="displaystyle" title="Check to dispaly one section per page" value="<%=SurveyDisplaySetting.DISPLAY_STYLE_ONE_PAGE_PER_SECTION %>"   />One section per page
							</label> <br/>					 
					</div>
					
					<div class="form-group">	
						<label ><b>Response collection setting( Valid for response collection from web only)</b></label>					
					</div>
					<div class="form-group">													 
							&nbsp;&nbsp;<label title="Check to allow one response per computer" >
								<input type="radio" name="responsecount" title="Check to allow one response per computer" value="<%=SurveyDisplaySetting.ONE_RESPONSE_PER_COMPUTER %>" checked  />One response per computer
							</label> <br/>
							&nbsp;&nbsp;<label title="Check to dispaly one section per page" >
								<input type="radio" name="responsecount" title="Check to allow n no of response per computer" value="<%=SurveyDisplaySetting.N_NO_OF_RESPONSE_PER_COMPUTER %>"   />N no of response per computer
							</label> <br/>					 
					</div>
				    <div class="form-group">	
						<label ><b>Next button label</b></label>					
					</div>
				    <div class="form-group">	
						<input type="text" name="next" class="form-control" placeholder="Next" required />			
					</div>
				    <div class="form-group">	
						<label ><b>Previous button label</b></label>					
					</div>
				    <div class="form-group">	
						<input type="text" name="previous" class="form-control" placeholder="Previous" required />			
					</div>
					
				    <div class="form-group">	
						<label ><b>Finish button label</b></label>					
					</div>
				    <div class="form-group">	
						<input type="text" name="finish" class="form-control" placeholder="Finish" required />			
					</div>
				  
			</div>									

		</form>
	</div>
	
	
   <div id="addeditsurveyauthorizationdiv" class="box box-primary" style="display:none;">
		<form name="addeditsurveyauthorizationform" method="post" onsubmit="manualValidate(event, 'addeditsurveyauthorizationform' )" >
			<input name="surveyid" type="hidden"  value ="-1" />
			 <div class="box-header">
					<h3 class="box-title">&nbsp;&nbsp;Add/edit survey authorization</h3>
			 </div>
			 <div class="box-body">
			 		<div class="form-group">
							<button type="submit" class="btn btn-primary" title="Apna survey - Submit">Submit</button>	
							<button type="button" class="btn btn-primary" onclick="doSurveyAction('showsurvey')" title="Apna survey - Cancel" >Cancel</button>										
					</div>
			 		<div class="form-group">
						<p>
							<b>Select users who can collect responses for the selected survey</b>
						</p>							
										
					</div>
					 
					<div id="surveyauthorizationbody" >
					
					</div>				 
			</div>
		</form>
	</div>
	
   <div id="addedituserauthorizationdiv" class="box box-primary" style="display:none;">
		<form name="addedituserauthorizationform" method="post" onsubmit="manualValidate(event, 'addedituserauthorizationform' )" >
			<input name="userid" type="hidden"  value ="-1" />
			 <div class="box-header">
					<h3 class="box-title">&nbsp;&nbsp;Add/edit survey authorization</h3>
			 </div>
			 <div class="box-body">
			 		<div class="form-group">
							<button type="submit" class="btn btn-primary" title="Apna survey - Submit">Submit</button>	
							<button type="button" class="btn btn-primary" onclick="doSurveyAction('showsurvey')" title="Apna survey - Cancel" >Cancel</button>										
					</div>
			 		
					<div id="userauthorizationbody" >
					
					</div>				 
			</div>
		</form>
	</div>
	
 
	 		<a style="display:none;" id="mypopuplink" href="#mypopupdiv" class="various">Open my inline content in a fancybox</a><br/>
	 		<a style="display:none;" id="myalertdialoglink" href="#alertdialogdiv" class="alertdialog">Alert</a><br/>
	 		<a style="display:none;" id="myconfirmdialoglink" href="#confirmdialogdiv" class="alertdialog">Confirm</a><br/>
	 	 
	 		
	 		 
		<div style="display:none" >
			<div id="mypopupdiv"></div>				
		</div>
		
		<div id="alertmaincontianer" style="display:none" >
			<div id="alertdialogdiv" >
				<table cellpadding="5" cellspacing="5" style="width:95%; height:95%;" >
				       <tr>
							<td id="alerttitle" style="background-color: #F4F4F4;font-weight:bold;font-size:15px;" valign="top" align="left" colspan="2">
								Alert
							</td>
														
						</tr>
						<tr>
							<td valign="top" id="alertimage" >
								<img src="style/default/info.gif" alt="info" />
							</td>
							<td id="alertcontent" style="font-weight:bold;">
								Hello ! this is alert.								
							</td>							
						</tr>
						<tr>
							<td></td>
							<td align="left">						 
							       <button id="globalalertok" type="button" onclick="utilObject.AlertOkClicked();" class="btn btn-primary" title="Apna survey - Ok">Ok</button>								 	
							</td>	
						</tr>						
				</table>
			</div>				
		</div>
		
		<div id="confirmmaincontianer" style="display:none" >
			<div id="confirmdialogdiv" >
				<table cellpadding="5" cellspacing="5" style="width:95%; height:95%;" >
				       <tr>
							<td id="confirmtitle" style="background-color: #F4F4F4;font-weight:bold;font-size:15px;" valign="top" align="left" colspan="2">
								Confirm
							</td>
														
						</tr>
						<tr>
							<td valign="top" id="alertimage" >
								<img src="style/default/important.gif" alt="info" />
							</td>
							<td id="confirmcontent" style="font-weight:bold;">
								You are about to delete survey. Do you want to proceed ?							
							</td>							
						</tr>
						<tr>
							<td></td>
							<td align="left">						 
							       <button id="globalconfirmyes" type="button" onclick="utilObject.confirmedClicked('true');" class="btn btn-primary" title="Apna survey - Yes">Yes</button>&nbsp;&nbsp;								 	
							       <button id="globalconfirmno" type="button" onclick="utilObject.confirmedClicked('false');" class="btn btn-primary" title="Apna survey - No">No</button> 								 	
							</td>	
						</tr>						
				</table>
			</div>				
		</div>
		
 		<div id="dtBox" >HELLO</div>
 
		
		
					 		  