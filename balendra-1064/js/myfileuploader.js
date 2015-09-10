// Question File uploader
var questionfileuploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: 'questionFilePicker', // you can pass in id...
    container: document.getElementById('questionfilecontainer'), // ... or DOM Element itself
    url: 'UploadFile',
    flash_swf_url: '../js/Moxie.swf',
    silverlight_xap_url: '../js/Moxie.xap',

    filters: {
        max_file_size: '200mb',
        mime_types: [{
            title: "Image files",
            extensions: "jpg,gif,png"
        }]
    },

    init: {
        PostInit: function() {
            document.getElementById('questionfilelist').innerHTML = '';
 	 
			document.getElementById('removequestionFile').onclick = function() {
			
			   if(currentQuestionPicture.id *1 <1){
					
					file1 = currentQuestionPicture.imageUrl.split('name=')[1];
					file2 = currentQuestionPicture.thumbnailUrl.split('name=')[1];
					
					fileDeleteUrl1 = fileDeleteUrl + file1 + radiotalkydelimiter + file2 ;
					doFileAction('resetquestioncontainer') ;
					utilObject.sync(fileDeleteUrl1 );
					
			   }else{
			     	doFileAction('resetquestioncontainer') ;			   
			   }
			     
			};
 	
			 
        },

        FilesAdded: function(up, files) {
            plupload.each(files, function(file) {
                document.getElementById('questionfilelist').innerHTML +=  file.name + ' (' + plupload.formatSize(file.size) + ') <b></b>';
                questionfileuploader.start();
                return true;
            });

        },

        UploadProgress: function(up, file) {
            document.getElementById('questionfilelist').getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
        },

        Error: function(up, err) {
            doFileAction('resetquestioncontainer') ;
            utilObject.showMessage('Alert', '111111111111Couldnt be uploaded: ' + err.message    ,'Ok');
        }
    }
});
questionfileuploader.bind('FileUploaded', function(up, file, res) {
		$('#removequestionFile').show();
		$('#questionFilePicker').hide();
//     document.getElementById('removequestionFile').style.display = '' ;
//     document.getElementById('questionFilePicker').style.display = 'none' ;
     var res1 = res.response.replace('"{', '{').replace('}"', '}');
   //  var objResponse = JSON.parse(res1);
   //   alert('Response : ' + res.response + " : " + objResponse.command );
     handleResponse(res1, 'questionfile') ;
    
});
questionfileuploader.bind('FilesAdded', function(up, files) {    
		 $('#questionfilelist').html('');
    if (files.length > 1) {
        document.getElementById('questionfilelist').innerHTML = '' ;
        utilObject.showMessage('Alert', 'You are allowed to upload only 1 file '    ,'Ok');
     
        while (up.files.length > 0) {
            up.removeFile(up.files[0]);
        }
    }

});
questionfileuploader.bind('Error', function(up, files) {  
	alert('INSIDE ERROR')  ;
	doFileAction('resetquestioncontainer') ;
    utilObject.showMessage('Alert', 'Couldnt be uploaded: ' + err.message    ,'Ok');
});
questionfileuploader.init();

// choice file uploader

var choicefileuploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: 'choiceFilePicker', // you can pass in id...
    container: document.getElementById('choicefilecontainer'), // ... or DOM Element itself
    url: 'UploadFile',
    flash_swf_url: '../js/Moxie.swf',
    silverlight_xap_url: '../js/Moxie.xap',

    filters: {
        max_file_size: '200mb',
        mime_types: [{
            title: "Image files",
            extensions: "jpg,gif,png"
        }]
    },

    init: {
        PostInit: function() {
            document.getElementById('choicefilelist').innerHTML = '';

			document.getElementById('removechoiceFile').onclick = function() {
			       
				   if(currentChoicePicture.id *1 <1){
						
						file1 = currentChoicePicture.imageUrl.split('name=')[1];
						file2 = currentChoicePicture.thumbnailUrl.split('name=')[1];
						
						fileDeleteUrl1 = fileDeleteUrl + file1 + radiotalkydelimiter + file2 ;
						doFileAction('resetchoicecontainer') ;
						utilObject.sync(fileDeleteUrl1 );
						
				   }else{
				     	doFileAction('resetchoicecontainer') ;			   
				   }
			};
			 
        },

        FilesAdded: function(up, files) {
            plupload.each(files, function(file) {
                document.getElementById('choicefilelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
                choicefileuploader.start();
                return true;
            });

        },

        UploadProgress: function(up, file) {
            document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
        },

        Error: function(up, err) {
            doFileAction('resetchoicecontainer') ;
            utilObject.showMessage('Alert', '222222222222Couldnt be uploaded: ' + err.message    ,'Ok');
           
        }
    }
});
choicefileuploader.bind('FileUploaded', function(up, file, res) {
	  $('#removechoiceFile').show();
	    $('#choiceFilePicker').hide();
//     document.getElementById('removechoiceFile').style.display = '' ;
//     document.getElementById('choiceFilePicker').style.display = 'none' ;
     var res1 = res.response.replace('"{', '{').replace('}"', '}');
   //  var objResponse = JSON.parse(res1);
   //   alert('Response : ' + res.response + " : " + objResponse.command );
     handleResponse(res1, 'choicefile') ;
});
choicefileuploader.bind('FilesAdded', function(up, files) {

    if (files.length > 1) {
        document.getElementById('choicefilelist').innerHTML = ''
        utilObject.showMessage('Alert', 'You are allowed to upload only 1 file '    ,'Ok');
        while (up.files.length > 0) {
            up.removeFile(up.files[0]);
        }
    }

});
choicefileuploader.bind('Error', function(up, files) {

    doFileAction('resetchoicecontainer') ;
    utilObject.showMessage('Alert', 'Couldnt be uploaded: ' + err.message    ,'Ok');
    
  

});
choicefileuploader.init();
