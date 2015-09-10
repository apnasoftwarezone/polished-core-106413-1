var callBack = null;
var isIndexedDBSupported = false;
var myDatabase = null;

Persist = (function() {
    var P;
    P = {
        Store: function(name, o) {
            try {
                if (name != null && name != 'undefined' && name != undefined && name != '') {

                    try {
                        if ("indexedDB" in window) {
                            isIndexedDBSupported = true;
                            var request = window.indexedDB.open(name + "Balendra", 2);

                            request.onerror = function(event) {
                                // error occured on database opening, so handle it properly
                                alert('Unable to create/open database ' + name);
                            };
                            request.onupgradeneeded = function(e) {

                                // Method called first time/and/or version of database being changed
                                // create all dataStores here/ In our case, all db is a single object store

                                myDatabase = e.target.result;

                                createObjectStore();

                            }
                            request.onsuccess = function(event) {
                                // successfully database created/opened
                                myDatabase = event.target.result;
                                itaObject.showBusy();
                                loadSettingDb();
                                // alert('myDatabase : ' + myDatabase ) ;

                            };
                        } else {

                            isIndexedDBSupported = false;
                        }

                        // itaObject.Device.exec("createdb" + delimiter + name);

                    } catch (e) {
                        alert('Exception in database creation : ' + e);
                    }
                }
                this.callBack;
                this.get = function(dbName, callback) {
                    store.callBack = callback;
                    //***************************************************************************

                    var transaction = myDatabase.transaction([dbName]);
                    var objectStore = transaction.objectStore(dbName);
                    var request = objectStore.get(1);
                    request.onerror = function(event) {
                        // Handle errors!
                        alert('Exception while getting record from db : ' + dbName + " " + event)
                    };
                    request.onsuccess = function(event) {
                        // Do something with the request.result!
                        if (request.result != undefined)
                            store.gotdata(request.result);
                        else
                            store.gotdata('');

                    };
                    request.onerror = function() {
                        this.gotdata('[]');
                    }




                    // **************************************************************************


                }
                this.set = function(dbName, data, callback) {
                    store.callBack = callback;
                	 
                    // *****************************************************************************************************
                    var transaction = myDatabase.transaction([dbName], "readwrite");
                    var objectStore = transaction.objectStore(dbName);
                    var request = objectStore.delete(1);
                    request.onsuccess = function(event) {
                    	 
                        var request = objectStore.add(data, 1);
                        request.onerror = function(event) {
                            // error occured on database opening, so handle it properly
                            alert(' Database couldnt be added : ' + dbName + " " + event);
                        };
                        request.onsuccess = function(event) {
                            // successfully database created/opened
                           // alert('Uncomment it') ;
                           //store.afterSetDB( store.callBack );
                          
	                            if (dbName == 'responsedb') {
	                                setTimeout(function() {
	                                    try {
	                                        itaObject.Device.exec("setdb" + delimiter + dbName + delimiter + removeNL(data));
	                                    } catch (e) {}
	                                }, 1000);

	
	                            } else {                            	 
	                                store.afterSetDB(store.callBack );
	                            }
						 
                        };
                    };

                }
                this.remove = function(dbName) {
                    itaObject.Device.exec("removedb" + delimiter + dbName);
                }
                this.gotdata = function(data) {

                    //var val =removeNL(data);
                    //if (val == '') val =TAFFY([]).stringify() ;
                    if (store.callBack) {
                        if (data == '')
                            data = TAFFY([]).stringify();
                        store.callBack('ok', URLDecode(data));
                    }
                }
               this.afterSetDB1 = function(  ) {
                    store.afterSetDB( store.callBack ) ;
                }
                this.afterSetDB = function( param1 ) {
                	 
					if(param1 != undefined && param1 != null )					
						param1() ;
                }
            } catch (e) {}
        }
    };
    return P;
})();

/**
 * Method used to create userdb object store
 */
function createObjectStore() {

    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("userdb")) {
        myDatabase.createObjectStore("userdb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("usersettingdb")) {
        myDatabase.createObjectStore("usersettingdb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("villagesdb")) {
        myDatabase.createObjectStore("villagesdb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("groupdb")) {
        myDatabase.createObjectStore("groupdb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("contactsdb")) {
        myDatabase.createObjectStore("contactsdb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("faqdb")) {
        myDatabase.createObjectStore("faqdb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("faqdb")) {
        myDatabase.createObjectStore("faqdb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("statedb")) {
        myDatabase.createObjectStore("statedb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("cropsdb")) {
        myDatabase.createObjectStore("cropsdb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("servicedb")) {
        myDatabase.createObjectStore("servicedb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("smartgaondb")) {
        myDatabase.createObjectStore("smartgaondb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("subscriberdb")) {
        myDatabase.createObjectStore("subscriberdb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("subscriberdb")) {
        myDatabase.createObjectStore("subscriberdb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("responsedb")) {
        myDatabase.createObjectStore("responsedb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("conditiondb")) {
        myDatabase.createObjectStore("conditiondb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("moduledb")) {
        myDatabase.createObjectStore("moduledb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("familydb")) {
        myDatabase.createObjectStore("familydb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("policydb")) {
        myDatabase.createObjectStore("policydb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("agriculturedb")) {
        myDatabase.createObjectStore("agriculturedb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("customformdb")) {
        myDatabase.createObjectStore("customformdb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("appointmentdb")) {
        myDatabase.createObjectStore("appointmentdb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("appointmentdb")) {
        myDatabase.createObjectStore("appointmentdb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("regiondb")) {
        myDatabase.createObjectStore("regiondb");
    }
    if (myDatabase.objectStoreNames != null && !myDatabase.objectStoreNames.contains("regiondb")) {
        myDatabase.createObjectStore("regiondb");
    }


}


function deleteDBAfterLogin(){
	 // *****************************************************************************************************
                    var transaction = myDatabase.transaction(['usersettingdb'], "readwrite");
                    var objectStore = transaction.objectStore( 'usersettingdb' );
                    var request = objectStore.delete(1);
                    request.onsuccess = function(event) {
                        deleteVillageDB() ;
                    }
                    request.onerror = function(event) {
                                // error occured on database opening, so handle it properly
                                alert('Unable to delete db ' + event );
                    };
}

function deleteVillageDB(){
 					var transaction = myDatabase.transaction(['villagesdb'], "readwrite");
                    var objectStore = transaction.objectStore( 'villagesdb' );
                    var request = objectStore.delete(1);
                    request.onsuccess = function(event) {
                        deleteContactDB() ;
                    }

}

function deleteContactDB(){
 					var transaction = myDatabase.transaction(['contactsdb'], "readwrite");
                    var objectStore = transaction.objectStore( 'contactsdb' );
                    var request = objectStore.delete(1);
                    request.onsuccess = function(event) {
                        deleteFAQDB() ;
                    }

}

function deleteFAQDB(){
 					var transaction = myDatabase.transaction(['faqdb'], "readwrite");
                    var objectStore = transaction.objectStore( 'faqdb' );
                    var request = objectStore.delete(1);
                    request.onsuccess = function(event) {
                        deleteVillageDB() ;
                    }

}

function deleteFAQDB(){
 					var transaction = myDatabase.transaction(['faqdb'], "readwrite");
                    var objectStore = transaction.objectStore( 'faqdb' );
                    var request = objectStore.delete(1);
                    request.onsuccess = function(event) {
                        deleteCROPDB() ;
                    }

}

/*
function deleteSTATEDB(){
 					var transaction = myDatabase.transaction(['statedb'], "readwrite");
                    var objectStore = transaction.objectStore( 'statedb' );
                    var request = objectStore.delete(1);
                    request.onsuccess = function(event) {
                        deleteSTATEDB() ;
                    }

}
*/
function deleteCROPDB(){
 					var transaction = myDatabase.transaction(['cropsdb'], "readwrite");
                    var objectStore = transaction.objectStore( 'cropsdb' );
                    var request = objectStore.delete(1);
                    request.onsuccess = function(event) {
                        deleteSERVICEDB() ;
                    }
                    
                    

}
function deleteSERVICEDB(){
 					var transaction = myDatabase.transaction(['servicedb'], "readwrite");
                    var objectStore = transaction.objectStore( 'servicedb' );
                    var request = objectStore.delete(1);
                    request.onsuccess = function(event) {
                        deleteSMARTGAONDB() ;
                    }

}
function deleteSMARTGAONDB(){
 					var transaction = myDatabase.transaction(['smartgaondb'], "readwrite");
                    var objectStore = transaction.objectStore( 'smartgaondb' );
                    var request = objectStore.delete(1);
                    request.onsuccess = function(event) {
                        deleteSUBSCRIBERDB() ;
                    }

}
function deleteSUBSCRIBERDB(){
 					var transaction = myDatabase.transaction(['subscriberdb'], "readwrite");
                    var objectStore = transaction.objectStore( 'subscriberdb' );
                    var request = objectStore.delete(1);
                    request.onsuccess = function(event) {
                        deleteModuleDB() ;
                    }

}
function deleteModuleDB(){
 					var transaction = myDatabase.transaction(['moduledb'], "readwrite");
                    var objectStore = transaction.objectStore( 'moduledb' );
                    var request = objectStore.delete(1);
                    request.onsuccess = function(event) {
                        deleteResponseDB() ;
                    }

}
function deleteResponseDB(){
 					var transaction = myDatabase.transaction(['responsedb'], "readwrite");
                    var objectStore = transaction.objectStore( 'responsedb' );
                    var request = objectStore.delete(1);
                    request.onsuccess = function(event) {
                        deleteFamilyDB() ;
                    }

}
function deleteFamilyDB(){
 					var transaction = myDatabase.transaction(['familydb'], "readwrite");
                    var objectStore = transaction.objectStore( 'familydb' );
                    var request = objectStore.delete(1);
                    request.onsuccess = function(event) {
                        var data = TAFFY([]).stringify();
						store.set('usersettingdb', data, userCallback );
                    }
	
}








