// ==UserScript==
// @name         Google extension: add unread button
// @version      0.1
// @description  Show a counter by project by week
// @author       Yann Roseau (https://github.com/yroseau)
// @copyright    2019, Yann Roseau (https://github.com/yroseau)
// @license      MIT; https://github.com/yroseau/google-extension/blob/master/LICENSE
// @include      https://mail.google.com/*
// @grant        none
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/yroseau/google-extension/master/mail-unread-button.js
// @updateURL    https://raw.githubusercontent.com/yroseau/google-extension/master/mail-unread-button.js
// ==/UserScript==

var checkExist = setInterval(function() {

  // get search form
  var searchForm = document.getElementById('aso_search_form_anchor');

  // if exists
  if (searchForm != null) {

    // stop search "search form"
    clearInterval(checkExist);

    // add button on right of search bar
    // @todo extract style in separate css
    buttonHtmlString = '<span style="top: 0; margin-top: 12px; position: absolute; left: 100%; margin-left: 1em;"><img title="Click to see unread messages" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACCElEQVR4Ae2aMS+DURSGLwaD/gEJLN0qTZ3zM7r4JyRYrWIiMfEbBIOdzST4Dd1MAkDba/ziSry9Tnp7pO9z1t7ePP2+Z2lOSCGEEEIIIYSQpXldlwu91zjiuZcL2VyaDzk0anIkfY1+Rvp60qiFwahP65VGfyO39emBBGRfo8+Rw4DRWe26FehJHQtsaXQ821BALj0LyC0WuPMsoM9QQF+SI6fNuTAimnN6mirkC0R5lLUwGUozpavypNEmUM11qxUK0mrpdXW7RaCaruw1Z0IBGjXZlZ7Gvwq8/pJQR9thyGhbO+m9dgFj1BnRnoDb7QLmqEG0BQTsUeNoDQLylhxZ0Y4takO0HV0xC4AL2vZof/+B7ALoEaOoQbToFbULpJHZo876vnyB9/TAt1/szBg1jvbs+xO1CySYowbRhorhCFijRtEWEMBRW6I1C+hHcsAQoeHzBQRw1LnRlhfAUWdGW14AR50brV3gEx/IiToj2vICOFIQrQMBEDWI1okAjjojWrtA1yJQRQ2i9StQRQ2i9SxQRQ2idSxQRZ0ZrVlAegYBjH8BClCgP94CFKCAxjEWoAAFKEABCkyMuQAFKBD0QaPjeYACcvPfV852XAvsQIHlRen5XbvUhYCRA+eLr3j1WG78rx6j/5ePvS1/y3GjFnLQBd3wsX6v57rx890nhBBCCCGEkC/h98NVvNKxKAAAAABJRU5ErkJggg==" height="24px" id="readSwitch" style="cursor: pointer;"></span>';
    searchForm.insertAdjacentHTML('beforeend', buttonHtmlString);

    // get button that we insert above
    var readSwitch = document.getElementById('readSwitch');

    // on click on "unread message" button
    var unreadLabel = 'label:unread';
    readSwitch.addEventListener('click', function() {
    
      // get search input
      var searchInput = searchForm.querySelector('input')

      // if search text contains unready only
      if (readSwitch.classList.contains("unreadOnly")) {

        // change image source and title of button
        readSwitch.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACCElEQVR4Ae2aMS+DURSGLwaD/gEJLN0qTZ3zM7r4JyRYrWIiMfEbBIOdzST4Dd1MAkDba/ziSry9Tnp7pO9z1t7ePP2+Z2lOSCGEEEIIIYSQpXldlwu91zjiuZcL2VyaDzk0anIkfY1+Rvp60qiFwahP65VGfyO39emBBGRfo8+Rw4DRWe26FehJHQtsaXQ821BALj0LyC0WuPMsoM9QQF+SI6fNuTAimnN6mirkC0R5lLUwGUozpavypNEmUM11qxUK0mrpdXW7RaCaruw1Z0IBGjXZlZ7Gvwq8/pJQR9thyGhbO+m9dgFj1BnRnoDb7QLmqEG0BQTsUeNoDQLylhxZ0Y4takO0HV0xC4AL2vZof/+B7ALoEaOoQbToFbULpJHZo876vnyB9/TAt1/szBg1jvbs+xO1CySYowbRhorhCFijRtEWEMBRW6I1C+hHcsAQoeHzBQRw1LnRlhfAUWdGW14AR50brV3gEx/IiToj2vICOFIQrQMBEDWI1okAjjojWrtA1yJQRQ2i9StQRQ2i9SxQRQ2idSxQRZ0ZrVlAegYBjH8BClCgP94CFKCAxjEWoAAFKEABCkyMuQAFKBD0QaPjeYACcvPfV852XAvsQIHlRen5XbvUhYCRA+eLr3j1WG78rx6j/5ePvS1/y3GjFnLQBd3wsX6v57rx890nhBBCCCGEkC/h98NVvNKxKAAAAABJRU5ErkJggg==";
        readSwitch.title = "Click to see unread messages";
        
        // remove unread label
        var reg = new RegExp(unreadLabel, "g");
        searchInput.value = searchInput.value.replace(reg, '').trim();
        
        // if empty, add label inbox to display inbox content
        // because if the search input is empty, google mail do not fetch anything
        if (searchInput.value === "") {
          searchInput.value = "label:inbox"
        }

      } else {

        // change image source and title of button
        readSwitch.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAACBElEQVR4Ae2aMS9DYRSGD4YO/AEJtXQjTZ3zMyz+CQlWq5hITPwGwdCdzST4DTaTAND2Su7mS3hb53N7pO/zbU2+9j5f75PepEcIIYQQQgghJGVh1tb0zO6sGPK60zPdWJiVQZif0kPtWRFnac+O56ekPxo1u7Ai3tLrRk36QfesiLn0QDA2bZ2wAl1tYIFNKwKvLUHoeWQBvcYCt5EF7EkQ9pxsWbaboV3ujS2nrw0sUP4q7Gi38ovv6G5zUsQvUNJq2WWll3/ZaklJFoGSCVvRx0pCfdBVGRf5rcDL9xuaM9b+c4F2c0ZKcgkkuKMG0UpCdgF31CDaCgScUYNo3QL6mmw5+XpPuqMG0SbNnbgFwAf4o27jA/II4K8YRQ2ihbeoQwBE5oja8X5Y4O3HE1vCJ+aMdin9Rt0CeaMGTR2j3X4BELU32goEcNSOaP0C9p4zQn+0WQT8UeNohyKAo3ZGW4EAjhpHm1ngI+/DmCPaCgRgpCDaAAIgahBtIAEcNY42k0Anz/M9iDaAAIwaRBtBAEcNog0gAKPG0WYW8J4VWPEFKECB3mgLUIACVoywAAUoQAEKUGBsxAUoQAGx+9AC94LQq/8+crYdWmBbEItz2o07dml1weh+9MFXQKOmV/FHj9FfEEfRhr/1CA1/J1jd1mOM39uprVtdCCGEEEIIISThE9E/U+ur0UpiAAAAAElFTkSuQmCC";
        readSwitch.title = "Click to see all messages";
        
        // add unread label in the search input
        searchInput.value = searchInput.value.concat(' ', unreadLabel).trim();

      }

      // toogle unread class to know in which state we are
      readSwitch.classList.toggle('unreadOnly');

      // click on search button
      // @todo change with a better way to start the search
      var buttons = searchForm.querySelectorAll('button')
      buttons[buttons.length-1].click()

    })

  }

}, 100);
