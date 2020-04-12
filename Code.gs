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
















