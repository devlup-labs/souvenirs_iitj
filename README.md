# souvenirs_iitj
#### A website for Student Design and Arts Society, IIT Jodhpur aimed at providing the photos of events in institute to its residents

## Tech Stack
Google Apps Script is used for the entire project. Google Apps Script allows us to use various services by Google like Google Drive, Google Spreadsheets, G-Mail etc. directly. All these advantages by Google Apps Script have been exploited.
It even allows you to deploy the website in its own domain.

## Workflow

#### 1. Folders and Images Display
* A folder has been created in the Google Drive which contains all the sub-folders and files in a sorted manner.
* We have used that folder's ID to fetch all the folders inside it. The IDs of all these sub-folders are retrieved and all these folders are appended to a dropdown button.
* Each dropdown item is associated with a function which runs when it is clicked. 
* This function lists down all the subfolders inside the selected dropdown item and appends a card to the `<div class = 'cardsHolder'>` with a button on it "Open Album".
* This button has an onclick function. On clicking the button, the "Home" and "About" sections of the page hide (if they are visible). And now the folder is checked. If it has only folders, then they are displayed in the form of cards as mentioned above in `<div class='folderViewer'>`. 
* Otherwise, if it has only images, then they are embedded into `<div class='webFetch'>` by fetching website from `"https://drive.google.com/embeddedfolderview?id=" + ParentID + "#grid"`.
* At the same time, the breadcrumb keeps on getting updated with the current folder name, with a similar function on each breadcrumb item as mentioned above.

#### 2. LightBox Gallery
* [Lightbox gallery](https://lokeshdhakar.com/projects/lightbox2/) allows us to view images in a slideshow. The image mentioned in the href attribute of an image is shown in slideshow.
* As mentioned above, if the folder contains only files, then all the files of the folder are embedded in website. These files are embedded in the form of thumbnails.
* The href attribute corresponding to these thumbnails originally points to Drive image. But while the folder is embedded we change those href to the ones for thumbnails with better quality, by running a function.
* So now when we click on an image, it gets displayed in the lightbox gallery with better quality.
* Also we have added a download button to it whose href attribute dynamically changes to `"https://drive.google.com/uc?export=download&id=" + ID_of_image_in_drive`, which allows user to download the image.

#### 3. Form
* The action of the form is connected to a Google form, which has a spreadsheet along with it. 
* The form is also protected by Google reCaptcha (whose visibility has been hidden).
* On clicking Submit button, a function is run which performs three tasks:
    1. verification with Google reCaptcha
    2. validates the Drive Link
    3. sends mail to Seceratory of Design and Arts Society if above two conditions are met, updating the spreadsheet attached in Google form with user's data.

## Deployment
We can deploy the Google Apps Script project by copying its files and embedding the deployed Google Apps Script on any webpage.

## Collaborators
|Name|Year|Role|
|--|--|--|
|[Anshul Ahuja](https://github.com/anshulahuja98)|Pre-Final|Mentor|
|[Soham Sonawane](https://github.com/killbotXD)|Sophomore|Mentor|
|[Anshul Tilondiya](https://github.com/Anshultilondiya)|Sophomore|Developer|
|[Yashvi Ramanuj](https://github.com/YashviRamanuj)|Sophomore|Developer|
|[Darshit Jain](https://github.com/DarshitJain04)|Freshman|Developer|
|[Abhishek Raghav](https://github.com/imraghav20)|Freshman|Developer|
|[Aditi Goyal](https://github.com/gaditi123)|Freshman|Developer|
