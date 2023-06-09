(()=>{
  const btnClick = document.querySelector('.changeColorBtn');
  const struckSelect = document.querySelector('.selectedColor');
  const colorGrid = document.querySelector('.colorGrid');
  const colorValue = document.querySelector('.colorValue');
  btnClick.addEventListener('click', async () => {
    chrome.storage.sync.get('color',({color}) => {
      console.log(color);
    });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: PickColer
      }, async(result) => {
        const [data] = result
        if(data.result){
          struckSelect.classList.remove('display');
          const color = data.result.sRGBHex;
          colorGrid.style.backgroundColor = color;
          colorValue.innerText = color;
          try{
            await navigator.clipboard.writeText(color);
          }catch(e){
            console.error(e);
          }
        }
      });
    });
  });

  async function PickColer(){
    try {
      const eyeDropper = new EyeDropper()
      return await eyeDropper.open()
    }catch(e){
      console.err(e);
    }
  }

})();