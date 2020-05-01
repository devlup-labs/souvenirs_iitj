function doGet(e) {
  if (e.parameters.goto == 'team') {
    return HtmlService.createTemplateFromFile('team')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');

  }

  if (e.parameters.goto == 'event') {
    return HtmlService.createTemplateFromFile('event')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');

  }


  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');

}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}

// This function is used to return two array of child folders and child folder's Id , where agrument is Parent Folder's Id

function folderNamesAndIds(parentFolder) {

  let folderNames = [];
  let folderIds = [];
  while (parentFolder.hasNext()) {
    let Folder = parentFolder.next();
    folderNames.push(Folder.getName());
    folderIds.push(Folder.getId());
  }
  return [folderNames, folderIds]
}


// This code is used for getting folders and displaying Images -----------------------------------------------------
function checkForChildFoldersAndFiles(parentFolderId) {

  const parentfiles = DriveApp.getFolderById(parentFolderId).getFiles();
  const parentfolders = DriveApp.getFolderById(parentFolderId).getFolders();
  let doesParentFolderHaveFiles = false;

  if (parentfiles.hasNext()) {
    doesParentFolderHaveFiles = true;
  }

  let [folderNames, folderIds] = folderNamesAndIds(parentfolders);

  return [folderNames, doesParentFolderHaveFiles, folderIds, parentFolderId]
}


// function for getting options in Album Dropdown Menu

function yearBtn() {
  const sdaWebsiteFolder = DriveApp.getFolderById('127DYBOd4M98t6KNCJeZ9Y6WJB7B5wb_3').getFolders();
  let [folderNames, folderIds] = folderNamesAndIds(sdaWebsiteFolder);
  let folderList = [];
  for (i = 0; i < folderNames.length; i++) {
    let list = {
      name: folderNames[i],
      id: folderIds[i]
    };
    folderList.push(list);
  };

  let byName = folderList.slice(0);
  byName.sort(function (a, b) {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
  for (i = 0; i < byName.length; i++) {
    folderNames[i] = byName[i].name;
    folderIds[i] = byName[i].id;
  };

  return [folderNames.reverse(), folderIds.reverse()];
}



// Get Event Folders for displaying at home page

function cardsDisplay(FolderId) {
  const Folders = DriveApp.getFolderById(FolderId).getFolders();
  let [folderNames, folderIds] = folderNamesAndIds(Folders);
  return [folderNames, folderIds];

}


function websiteFetch(websiteToFetch) {
  var response = UrlFetchApp.fetch(websiteToFetch);
  var content = response.getContentText();
  return content
}

function getBreadcrumbData(id) {
  var x = DriveApp.getFolderById(id);
  var name = x.getName();
  var id = x.getId();
  return [id, name];
}

function sendMail() {
  MailApp.sendEmail('secy_das@iitj.ac.in', 'Entry for SDA site', 'Data has been added to the spreadsheet. The link to the spreadsheet is attached below: https://docs.google.com/spreadsheets/d/1xJ8TyAVEcSm5RtgHW1KOOsb3-vbK3rmyC0eq2uCWZ4U/edit#gid=1155803024');
}


// recaptcha
var secret = '6Ld_YuwUAAAAAOH62DtrydnqtgEO540NvV1U2_Rn';

function verifyCaptcha(formObj) {
  var payload = {
    'secret': secret,
    'response': formObj
  }
  var url = 'https://www.google.com/recaptcha/api/siteverify';
  var resp = UrlFetchApp.fetch(url, {
    payload: payload,
    method: 'POST'
  }).getContentText();
  return JSON.parse(resp).success;
}

function processForm(obj) {

  // Verify Catcha
  var isNotBot = verifyCaptcha(obj);
  if (!isNotBot) {
    return 'You are a robot';
  }
  sendMail();
  return 'Form submitted successfully';
}