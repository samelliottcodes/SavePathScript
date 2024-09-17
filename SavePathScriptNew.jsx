globals = {};
function savePSD(doc, saveFile){

    var saveOptions = new PhotoshopSaveOptions();
    saveOptions.embedColorProfile = true;
    doc.saveAs(saveFile, saveOptions);
}


function imageExistsValidation(saveFile) {
var imageName = File(saveFile);
   if (imageName.exists) {
    alert ("Save complete. Closing file");
    }
    else {
       alert("Save validation failed. File did not save correctly, please save manually")
    }
}
function checkTime(saveTime, openTime) {
    if (openTime>saveTime){
        alert("save is invalid. Please save manually");
    }
}
function FolderSearch(fileLocation, searchKey){
    var inFolder = new Folder(fileLocation)
            if(inFolder != null){
                 var regex = searchKey;       
                 var fileList = inFolder.getFiles();
             }
                    for(var a = 0 ;a < fileList.length; a++)
                       {
                           if (fileList[a] instanceof File)  
                                {
                                    var fileName = String(fileList[a]);
                                    if (fileName.match(/.(jpg|tif|psd|bmp|gif|png)$/))                            
                                        {
                                           var searchName = fileName.search(searchKey);
                                            if (searchName > -1){
                                                  globals["imageExists"] = fileLocation;
                                                  return;
                                            }
                                            else {
                                                globals["imageExists"] = null;
                                                }
                                        }
                                    }
                           }
                       
    }

function filePathValidation(sFolderPath, a){
        var folderValidation = Folder(sFolderPath);
        if (folderValidation.exists) {
            globals["folderValidationCheck"] = true;
            }
        else {
            globals["folderValidationCheck"] = false;
}    
    }


function main (){

       var doc = app.activeDocument;
       var docName = String(doc.name);
       var docPath = doc.path;
       var docPath_Working = String(docPath);
       var docPath_YearIndex = docPath_Working.search("WEEK_");    
       var docPathWeek = docPath_Working.slice(docPath_YearIndex+5, docPath_YearIndex+7);
       var docPathYear = docPath_Working.slice(docPath_YearIndex-5, docPath_YearIndex-1);
       var docPathYearShort = docPathYear.slice(2);
      var specialBuysSearchString = (docPathYearShort+ "_" + docPathWeek+ "_")
      var docNameSpecialBuysSearch = docName.search(specialBuysSearchString);
      var originSubfolderCR = docPath_Working.search('CORE_RANGE');
      var originSubfolderSB = docPath_Working.search('SPECIAL_BUYS');
      var CMYKSBfileLocation = "/BMF_Server/JOBS/ALDI/01_WEEKLY/" + docPathYear+"_WEEK_"+docPathWeek+"/06_LIVE_IMAGES/01_WEEKLY_LIVE_IMAGES/SPECIAL_BUYS";
      var CMYKCRfileLocation = "/BMF_Server/JOBS/ALDI/01_WEEKLY/" + docPathYear+"_WEEK_"+docPathWeek+"/06_LIVE_IMAGES/01_WEEKLY_LIVE_IMAGES/CORE_RANGE";
       
      if(originSubfolderSB > -1) {
        // alert('Special Buys file, wooo');
        // alert(CMYKSBfileLocation);
        filePathValidation(CMYKSBfileLocation);
            if (globals.folderValidationCheck == false) {
                alert('Creating new Special Buys output folder in the server')
                var uploadFolder = Folder(CMYKSBfileLocation);
                uploadFolder.create();
            }   
        // alert('the folder exists! woo!');
        savePSD(doc, new File(CMYKSBfileLocation)) 
        imageExistsValidation(CMYKSBfileLocation+"/"+docName);
        doc.close();

        } 
        else if (originSubfolderCR > -1) {
        // alert('Core Range file, wooo');
        // alert(CMYKCRfileLocation);
        filePathValidation(CMYKCRfileLocation);
            if (globals.folderValidationCheck == false) {
                alert('Creating new Core Range output folder in the server')
                var uploadFolder = Folder(CMYKCRfileLocation);
                uploadFolder.create();
            }
        // alert('the folder exists! woooo!');
        savePSD(doc, new File(CMYKCRfileLocation))
        imageExistsValidation(CMYKCRfileLocation+"/"+docName);
        doc.close();
        }
        else {alert('please specify Core Range or Special Buys in the origin folder');}
           }
main();