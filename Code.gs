function doGet(request) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

// This function is used to return two arrays, one of Names of child folders and second of corresponding Folder-Ids , where agrument is Parent Folder's Id.

function Folder_Name_and_ID(parentFolder){
  
  let foldersArray = [];
  let foldersArrayId = [];
  while(parentFolder.hasNext()) {
    let Folder = parentFolder.next();
    foldersArray.push(Folder.getName());
    foldersArrayId.push(Folder.getId());
    
  }
  return [foldersArray, foldersArrayId]
}


// This code is used for getting folders and displaying Images -----------------------------------------------------
function Checker(parent_folder_id) {
  
  const parentfiles = DriveApp.getFolderById(parent_folder_id).getFiles();
  const parentfolders = DriveApp.getFolderById(parent_folder_id).getFolders();
  const filesArray = [];
  
  while(parentfiles.hasNext()) {
    filesArray.push(parentfiles.next().getName());
    break;
  }
  
  let [foldersArray, foldersArrayID] = Folder_Name_and_ID(parentfolders);
 
  return [foldersArray , filesArray , foldersArrayID, parent_folder_id]
}



// This code is used for generating Years button --------------------------------------------------------------------
function Yearbtn(){
  const Organised = DriveApp.getFolderById('1Ll3tOvBX_chgs2KGY4WCSGMcVwcLDKpu').getFolders();
  let [YearFoldersName, YearFoldersId] = Folder_Name_and_ID(Organised);
  let FolderList = [];
  for(i = 0 ; i < YearFoldersName.length; i++){
    let list = {name : YearFoldersName[i],
                id: YearFoldersId[i]};
    FolderList.push(list);
    };
  //Logger.log(FolderList);
 let byName = FolderList.slice(0);
 byName.sort(function(a,b){
 let x= a.name.toLowerCase();
 let y= b.name.toLowerCase();
 return x<y? -1 : x>y ? 1:0;
 });
  // Logger.log(byName);
for(i = 0 ; i < byName.length; i++){
    YearFoldersName[i] = byName[i].name;
    YearFoldersId[i] = byName[i].id;
    };  
  // Logger.log(YearFoldersName);
  //Logger.log(YearFoldersId);
  
  
  return [YearFoldersName.reverse() , YearFoldersId.reverse()];
}



function CardsDisplay(yearFolderId){
  const Folders = DriveApp.getFolderById(yearFolderId).getFolders();
  let [FoldersName, FoldersId] = Folder_Name_and_ID(Folders);
  return [FoldersName , FoldersId];

}

//Websitefetch function fetch data from passed url and return its html content

function Websitefetch(website_to_fetch){
var response = UrlFetchApp.fetch(website_to_fetch);
var content = response.getContentText();
  return content
}

function getData(id)
{
  var x = DriveApp.getFolderById(id);
  var name = x.getName();
  var id = x.getId();
  return [id, name];
}













