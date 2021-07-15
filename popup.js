'use strict';



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('vsms-0').addEventListener('click',function click(e) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type:"SCRAP",
                payload:'MARQUE'        
            },);
        });    
    window.close();
    });

    document.getElementById('vsms-1').addEventListener('click',function click(e) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type:"SCRAP",
                payload:'FAMILLE'        
            },);
        });    
    window.close();
    });

    document.getElementById('vsms-2').addEventListener('click',function click(e) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type:"SCRAP",
                payload:'MODELE'        
            },);
        });    
    window.close();
    });
  
});


 