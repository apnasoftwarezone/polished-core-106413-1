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
				document.getElementById('questionfilelist').innerHTML = '' ;
				document.getElementById('removequestionFile').style.display = 'none' ;
    			document.getElementById('questionFilePicker').style.display = '' ;
			};
			 
        },

        FilesAdded: function(up, files) {
            plupload.each(files, function(file) {
                document.getElementById('questionfilelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
                questionfileuploader.start();
                return true;
            });

        },

        UploadProgress: function(up, file) {
            document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
        },

        Error: function(up, err) {
            alert('Couldnt be uploaded: ' + err.message);
        }
    }
});
questionfileuploader.bind('FileUploaded', function(up, file, res) {
     document.getElementById('removequestionFile').style.display = '' ;
     document.getElementById('questionFilePicker').style.display = 'none' ;
    alert('Got response' + JSON.stringify(res));
});
questionfileuploader.bind('FilesAdded', function(up, files) {

    if (files.length > 1) {
        document.getElementById('questionfilelist').innerHTML = ''
        alert('You are allowed to upload only 1 files');
        while (up.files.length > 0) {
            up.removeFile(up.files[0]);
        }
    }

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
				document.getElementById('choicefilelist').innerHTML = '' ;
				document.getElementById('removechoiceFile').style.display = 'none' ;
    			document.getElementById('choiceFilePicker').style.display = '' ;
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
            alert('Couldnt be uploaded: ' + err.message);
        }
    }
});
choicefileuploader.bind('FileUploaded', function(up, file, res) {
     document.getElementById('removechoiceFile').style.display = '' ;
     document.getElementById('choiceFilePicker').style.display = 'none' ;
    alert('Got response' + JSON.stringify(res));
});
choicefileuploader.bind('FilesAdded', function(up, files) {

    if (files.length > 1) {
        document.getElementById('choicefilelist').innerHTML = ''
        alert('You are allowed to upload only 1 files');
        while (up.files.length > 0) {
            up.removeFile(up.files[0]);
        }
    }

});
choicefileuploader.init();
