const handlerButtonOn = () => {
  let bodyHTML = document.querySelector('html');
  let media = document.querySelectorAll('img, video, picture, path, video');

  bodyHTML.style.filter = "invert(1) hue-rotate(180deg)"; 
  media.forEach((mediaItem) => {
    mediaItem.style.filter = "invert(1) hue-rotate(180deg)";
  });
}
const handlerButtonOff = () => {
    let bodyHTML = document.querySelector('html');
    let media = document.querySelectorAll('img, video, picture, path');

    bodyHTML.style.filter = "invert(0) hue-rotate(0deg)"; 
    media.forEach((mediaItem) => {
      mediaItem.style.filter = "invert(0) hue-rotate(0deg)";
    });
}
const handlerButton = () => {
  if(document.querySelector('.popup')){
    const button = document.querySelector('.button');
    const cricle = document.querySelector('.cricle');
      
      let btnOn = false;
  
      button.addEventListener('click',() => {
        if (!btnOn) {
          btnOn = true;
          cricle.style.animation = 'SwitchModeRight 1s forwards';
          button.style.animation = 'backgroundSwitch 1s forwards';
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              args: [],
              func: handlerButtonOn
            });
          });
        }else{
          btnOn = false;
          cricle.style.animation = 'SwitchModeLeft 1s forwards';
          button.style.animation = 'backgroundSwitch1 1s forwards';
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              args: [],
              func: handlerButtonOff
            });
          })
        }
      });
    }
};

const changeColorButton = document.getElementById('changeColor');
const buttonColors = ['#fff', '#e8453c', '#f9bb2d', '#4688f1', '#000'];
const divTitle = document.createElement('p');
divTitle.textContent = "Thay đổi background theo màu chọn";
changeColorButton.before(divTitle);
chrome.storage.sync.get('color', ({ color }) => {
  changeColorButton.style.backgroundColor = color;
  changeColorButton.setAttribute('value', color);
});
const createColorButtons = (buttonColors) => {
  buttonColors.forEach((color) => {
    const button = document.createElement('button');
    button.style.backgroundColor = color;
    button.setAttribute('value', color);

    button.addEventListener('click', (event) => {
      const colors = event.target.value;

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          args: [colors],
          func: setColor
        });
      });
    });
    changeColorButton.appendChild(button);
  });
};

function setColor(color) {
  let bodyHTML = document.querySelector('body');
  let media = document.querySelectorAll('img, video, picture');
  
  bodyHTML.style.backgroundColor = color; 
  media.forEach((mediaItem) => {
    mediaItem.style.backgroundColor = color; 
  });
}

createColorButtons(buttonColors);
handlerButton();

