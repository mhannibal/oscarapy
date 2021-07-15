console.log("Oscaro scraper bessoufi mounir");

function fireEvent(element,event){
    if (document.createEventObject){
    // dispatch for IE
    var evt = document.createEventObject();
    return element.fireEvent('on'+event,evt)
    }
    else{
    // dispatch for firefox + others
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true ); // event type,bubbling,cancelable
    return !element.dispatchEvent(evt);
    }
}
 



let getAllDataAttrs = (name, value) => Array.from(
    document.querySelectorAll(`[data-${name}]`)).map(elm => {
        if (elm.getAttribute(`data-${name}`)===value)
                return elm
    }
  ).filter(val => val && val !== '0')[0];



function openSelectionVehiculeDialog(){
    let ParModelButton = getAllDataAttrs('qa','car-selector-other-link-manual')
    if (!(ParModelButton === undefined)){
        ParModelButton.click();
        return true;
    }
    return false;        
}

const timer = ms => new Promise(res => setTimeout(res, ms))
function getSelectValues(id, count=0){    
    let array = Array.from(document.getElementById(id).options);
    let ValArray = array.map(e =>e.value);        
    let arr = [... new Set(array.filter((e,index) => e && e.value !="placeholder" && ValArray.indexOf(e.value) == index))]
    if ((count !==0) && (arr.length> count))
        return arr.slice(0, count);            
    return arr;
}                
//map(option => option.value).filter(e =>e && e !="placeholder"))



 function getSelectValuesVSMS3(){    
    let array = Array.from(document.querySelectorAll('select[id="vsms-3"] > optgroup'));
    for(var l=0; l< array.length;l++){                     
        writeToMemory("\t\t\t"+array[l].label);
        let values3 = Array.from( array[l].children);
        let ValArray = values3.map(e =>e.text);    
        let arr = [... new Set(values3.filter((e,index) => e  && ValArray.indexOf(e.text) == index))]    
        for(var k=0; k< arr.length;k++){             
            writeToMemory("\t\t\t\t"+arr[k].text);      
        }
    }         
 }

 function writeToMemory(text){
    Memorylines = Memorylines+text+'\n'
 }

 async function getNewFileHandle() {
    const options = {
      types: [
        {
          description: 'Text Files',
          accept: {
            'text/plain': ['.txt'],
          },
        },
      ],
    };
    const handle = await window.showSaveFilePicker(options);
    return handle;
  }

  async function writeFile(fileHandle, contents) {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
  }
let Memorylines =''

async function beginExtraction(){
    Memorylines =''
        let elements0 = getSelectValues("vsms-0");
        let timeing = 1000;
        for(var i=0; i<elements0.length;i++){         
                let ele = elements0[i];
                ele.selected = true;
                fireEvent(document.getElementById('vsms-0'),'change');
                await timer(timeing); 
                writeToMemory("\n")            
                writeToMemory(ele.text);
                writeToMemory("\n");
                let values2 = getSelectValues("vsms-1");
                for(var j=0; j< values2.length;j++){ 
                    let ele1 =values2[j]
                    ele1.selected = true;
                    fireEvent(document.getElementById('vsms-1'),'change');
                    await timer(timeing); // then the created Promise can be awaited
                    writeToMemory("\t"+ele1.text);           
                    /*let values3 = getSelectValues("vsms-2");
                    for(var k=0; k< values3.length;k++){ 
                        let ele2 =values3[k]
                        ele2.selected = true;
                        fireEvent(document.getElementById('vsms-2'),'change');
                        await timer(timeing); // then the created Promise can be awaited
                        writeToMemory("\t\t"+ele2.text);      
                        getSelectValuesVSMS3()
                    } */       
                }        
        }
    
}
 
var startTime, endTime;

function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  var seconds = Math.round(timeDiff);
  return seconds + " seconds";
}

chrome.runtime.onMessage.addListener(onMessageRecieve);

function onMessageRecieve(message, sender, sendResponse){
    console.log(message.payload);
    switch(message.type){
        case  "SCRAP":
          switch(message.payload){
            case  "MARQUE":              
                start();                
                beginExtractionOfOneMark().then(()=>{
                    let e = end();                
                    alert("Complted in "+e +' sec');
                    sendResponse({"type": "response" , "payload":Memorylines})
                    console.log(Memorylines)
                });                                  
            break;
            case  "FAMILLE":              
                start();                
                beginExtractionOfOneFamille().then(()=>{
                    let e = end();                
                    alert("Complted in "+e +' sec');
                    sendResponse({"type": "response" , "payload":Memorylines})
                    console.log(Memorylines)
                });                                  
            break;
            case  "MODELE":              
                start();                
                beginExtractionOfOneModele().then(()=>{
                    let e = end();                
                    alert("Complted in "+e +' sec');
                    sendResponse({"type": "response" , "payload":Memorylines})
                    console.log(Memorylines)
                });                                  
            break;
          }
          break;
        default :
            break;
    }
    
}



async function beginExtractionOfOneMark(){
  Memorylines =''
      //let elements0 = getSelectValues("vsms-0");
      let timeing = 1000;
      //for(var i=0; i<elements0.length;i++){         
              let ele = document.getElementById('vsms-0');
              ele.selected = true;
              fireEvent(ele,'change');
              await timer(timeing); 
              writeToMemory("\n")            
              writeToMemory(ele.options[ele.selectedIndex].text);              
              let values2 = getSelectValues("vsms-1");
              for(var j=0; j< values2.length;j++){ 
                  let ele1 =values2[j]
                  ele1.selected = true;
                  fireEvent(document.getElementById('vsms-1'),'change');
                  await timer(timeing); // then the created Promise can be awaited
                  writeToMemory("\t"+ele1.text);           
                  let values3 = getSelectValues("vsms-2");
                  for(var k=0; k< values3.length;k++){ 
                      let ele2 =values3[k]
                      ele2.selected = true;
                      fireEvent(document.getElementById('vsms-2'),'change');
                      await timer(timeing); // then the created Promise can be awaited
                      writeToMemory("\t\t"+ele2.text);      
                      getSelectValuesVSMS3()
                  } 
              }        
      //}
  
}




async function beginExtractionOfOneFamille(){
  Memorylines =''
      //let elements0 = getSelectValues("vsms-0");
      let timeing = 1000;             
                  let ele1 = document.getElementById('vsms-1')                                
                  ele1.selected = true;
                  fireEvent(document.getElementById('vsms-1'),'change');
                  await timer(timeing); // then the created Promise can be awaited
                  writeToMemory("\t"+ele1.options[ele1.selectedIndex].text);           
                  let values3 = getSelectValues("vsms-2");
                  for(var k=0; k< values3.length;k++){ 
                      let ele2 =values3[k]
                      ele2.selected = true;
                      fireEvent(document.getElementById('vsms-2'),'change');
                      await timer(timeing); // then the created Promise can be awaited
                      writeToMemory("\t\t"+ele2.text);      
                      getSelectValuesVSMS3()
                  } 
                    
      //}
  
}


async function beginExtractionOfOneModele(){
  Memorylines =''      
  let timeing = 1000;                                
  let ele2 = document.getElementById("vsms-2");                              
  ele2.selected = true;
  fireEvent(document.getElementById('vsms-2'),'change');
  await timer(timeing); // then the created Promise can be awaited
  writeToMemory("\t\t"+ele2.options[ele2.selectedIndex].text);      
  getSelectValuesVSMS3()                                    

}
