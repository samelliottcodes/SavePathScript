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
        var docPath_Working = doc.path;
        var docPath_Working = String(docPath_Working);
        var docPath_YearIndex = docPath_Working.search("WEEK_");    
        var docPathWeek = docPath_Working.slice(docPath_YearIndex+5, docPath_YearIndex+7);
        var docPathYear = docPath_Working.slice(docPath_YearIndex+8, docPath_YearIndex+12);
        var docPathYearShort = docPathYear.slice(2);
       var openTime = app.activeDocument.path.modified;
       var specialBuysSearchString = (docPathYearShort+ "_" + docPathWeek+ "_")
       var docNameSpecialBuysSearch = docName.search(specialBuysSearchString);
       var CMYKSBfileLocation = "/BMF_Server/JOBS/ALDI/01_WEEKLY/" + docPathYear+"WEEK"+docPathYearShort+"/W" +docPathWeek+ "_LIVE_IMAGES/01_Special Buys Catalogue 280 Spec";
       var CMYKCRfileLocation = "/studio/CLIENTS/ALDI/ WEEKLY/WEEK_" + docPathWeek+"_20"+docPathYearShort+"/W" +docPathWeek+ "_LIVE_IMAGES/04_Core Range";
       var CMYKRepeatfileLocation = "/studio/CLIENTS/ALDI/ WEEKLY/WEEK_" + docPathWeek+"_20"+docPathYearShort+"/W" +docPathWeek+ "_LIVE_IMAGES/05_Repeats";
       var PNGSBfileLocation = "/studio/CLIENTS/ALDI/ WEEKLY/WEEK_" + docPathWeek+"_20"+docPathYearShort+"/W" +docPathWeek+ "_LIVE_IMAGES/08_PD_1X1/SpecialBuys";
       var PNGCRfileLocation = "/studio/CLIENTS/ALDI/ WEEKLY/WEEK_" + docPathWeek+"_20"+docPathYearShort+"/W" +docPathWeek+ "_LIVE_IMAGES/08_PD_1X1/CoreRange";
       var PNGRepeatfileLocation = "/studio/CLIENTS/ALDI/ WEEKLY/WEEK_" + docPathWeek+"_20"+docPathYearShort+"/W" +docPathWeek+ "_LIVE_IMAGES/08_PD_1X1/Repeat";
       
       
       var uploadLocation = "/~/Desktop/Upload";
      var saveLocation = "~/Desktop/Upload";
       filePathValidation(uploadLocation);
        if (globals.folderValidationCheck == false) {
           var uploadFolder = Folder(uploadLocation);
           uploadFolder.create();
       }
   
      
   var oCurrentDate = new Date(); 
   var CurrYear = oCurrentDate.getFullYear(); // get 4 digit year number 
   var CurrMonth = oCurrentDate.getMonth(); // get current month number 
   var CurrDay = oCurrentDate.getDate(); // get current date number  
       
       CurrMonth = CurrMonth + 1;
       
   var uploadDate = uploadLocation +"/Upload Date "+CurrYear+"_"+CurrMonth+"_"+CurrDay;
       filePathValidation(uploadDate);
        if (globals.folderValidationCheck == false) {
           var uploadDateFolder = Folder(uploadDate);
           uploadDateFolder.create();xx
       }

    
 
       var uploadWeek = uploadDate + "/Week "+docPathWeek;
       filePathValidation(uploadWeek);
        if (globals.folderValidationCheck == false) {
           var uploadWeekFolder = Folder(uploadWeek);
           uploadWeekFolder.create();
       }

     

if(docNameSpecialBuysSearch > -1){
          savePSD(doc, new File(CMYKSBfileLocation))
            savePSD(doc, new File(uploadSBFile))
                //checkTime(app.activeDocument.path.modified, openTime);              
                imageExistsValidation(CMYKSBfileLocation+"/"+docName);
            //    doc.close();
          return;
         }
           if (docNameSpecialBuysSearch == -1) {
           FolderSearch(CMYKCRfileLocation, docName);
           if (globals["imageExists"] == null) {
                FolderSearch(CMYKSBfileLocation, docName);
           }
           if (globals["imageExists"] == null) {
                FolderSearch(CMYKRepeatfileLocation, docName);
           }
           if(globals["imageExists"] == CMYKCRfileLocation) {
                savePSD(doc, new File(CMYKCRfileLocation))
                        //checkTime(app.activeDocument.path.modified, openTime);              
                        imageExistsValidation(CMYKCRfileLocation+"/"+docName);
              //          doc.close();
                return;
               }
           else if (globals["imageExists"] == CMYKSBfileLocation) {
                savePSD(doc, new File(CMYKSBfileLocation))
                        //checkTime(app.activeDocument.path.modified, openTime);              
                        imageExistsValidation(CMYKSBfileLocation+"/"+docName);
           //             doc.close();
                return;
               }
          else if (globals["imageExists"] == CMYKRepeatfileLocation) {
                savePSD(doc, new File(CMYKRepeatfileLocation))
                        //checkTime(app.activeDocument.path.modified, openTime);              
                        imageExistsValidation(CMYKRepeatfileLocation+"/"+docName);
        //                doc.close();
                return;
               }
          else if (globals["imageExists"] == null) {
                alert("Not sure what the image is")
                    var w = new Window ("dialog");
                        w.alignChildren = "left";
                        var buttonGroup01=w.add("group");
                        var SaveLocationButtonGroup = w.add ("group");
                        SaveLocationButtonGroup.orientation = "column";
                        SaveLocationButtonGroup.alignment = "left";
                        var SBSave = SaveLocationButtonGroup.add ("radiobutton", undefined, "Special Buys");
                        var CRSave = SaveLocationButtonGroup.add ("radiobutton", undefined, "Core Range");
                        var RepeatSave = SaveLocationButtonGroup.add ("radiobutton", undefined, "Repeat");
                        buttonGroup01.add ("button", undefined, "OK");
                        SBSave.value = true;
                        w.center(); 
                        w.show()
                                    if (SBSave.value == true){
                                        savePSD(doc, new File(CMYKSBfileLocation)) 
                                        //checkTime(app.activeDocument.path.modified, openTime);              
                                        imageExistsValidation(CMYKSBfileLocation+"/"+docName);
//                                        doc.close();
                                    }              
                                    if (CRSave.value == true){
                                        savePSD(doc, new File(CMYKCRfileLocation))
                                        //checkTime(app.activeDocument.path.modified, openTime);              
                                        imageExistsValidation(CMYKCRfileLocation+"/"+docName);
   //                                     doc.close();
                                    }  
                                    if (RepeatSave.value == true){
                                        savePSD(doc, new File(CMYKRepeatfileLocation))
                                        //checkTime(app.activeDocument.path.modified, openTime);              
                                        imageExistsValidation(CMYKRepeatfileLocation+"/"+docName);
     //                                   doc.close();
                                   }  
                            }
                return;
               }
           }
main();