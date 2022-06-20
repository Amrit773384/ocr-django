// {output.html}
function downloadoutput() {
    var text = document.getElementById("outputdiv").value;
    var filename = "output.txt";
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function hideContext(){
    document.getElementById("contextmenu").style.display = "none";
    document.getElementById("outputdiv").focus();
};



function copyText(){
    let element = document.getElementById("outputdiv");
    let text = element.value;
    // obtain the index of the first selected character
    var start = element.selectionStart;
    // obtain the index of the last selected character
    var finish = element.selectionEnd;
    // obtain the selected text
    var selected_text = text.substring(start, finish);
    // do something with the selected content
    navigator.clipboard.writeText(selected_text);
    hideContext()
};
function cutText(){
    let element = document.getElementById("outputdiv");
    text = element.value;
    // obtain the index of the first selected character
    var start = element.selectionStart;
    // obtain the index of the last selected character
    var finish = element.selectionEnd;
    // obtain the selected text
    var selected_text = text.substring(start, finish);
    // copy the text to the clipboard
    navigator.clipboard.writeText(selected_text);
    // remove the selected text and put the value in the result 
    element.value = text.substring(0,start)+text.substring(finish,text.length);
    document.getElementById("outputdiv").focus();
    element.selectionStart = start-10;
    element.selectionEnd = start;
    hideContext();
};
 function searchText(){
    let element = document.getElementById("outputdiv");
    // obtain the index of the first selected character
    var start = element.selectionStart;
    // obtain the index of the last selected character
    var finish = element.selectionEnd;
    // obtain the selected text
    var selected_text = element.value.substring(start, finish);
    // create a virtual element and link 
    if(selected_text.length>0){
        let temp_element = document.createElement("a");
        temp_element.href = "http://www.google.com/search?q="+selected_text;
        // make the link open in another tab 
        temp_element.target = "_nextTab";
        // virtually click on element
        temp_element.click();
        // remove the element
        temp_element.remove();
    };
    // now hide the context menu 
    hideContext();
 };
 function listenText(){
    let element = document.getElementById("outputdiv");
    var start = element.selectionStart;
    var finish = element.selectionEnd;
    var selected_text = element.value.substring(start, finish);
    // creating object of speech clss
    var speak_obj = new SpeechSynthesisUtterance();
    speak_obj.text = selected_text;
    speak_obj.rate = 0.8 ;
    window.speechSynthesis.speak(speak_obj);
    hideContext();
 };
 function pasteClipboard(){
    navigator.clipboard.readText().then(text =>{
        let element = document.getElementById("outputdiv");
        let start = element.selectionStart;
        let end = element.selectionEnd;
        var selected_text = element.value.substring(start, end);
        element.value = element.value.substring(0,start)+text+element.value.substring(end,element.value.length);
        hideContext();
    });
 };
 function isAlphaOrParen(str) {
    return /^[a-zA-Z()]+$/.test(str);
  }
 function formatSpacing() {  
     let text = document.getElementById("outputdiv").value;
     var i = -1;
     let formated_text = "";
     while (i < text.length-2){
         i+=1
        if(text[i] == " " &  isAlphaOrParen(text[i+1]) ){
            continue
        }
        formated_text+=text[i];
     };
     document.getElementById("outputdiv").value = formated_text;
     document.getElementById("outputdiv").value = formated_text;
     document.getElementById("formatspacing-button").style.opacity = "0.6";
     let element = document.getElementById("formatspacing-button");
     element.setAttribute("onclick","");
     element.setAttribute("title","Spacing already formatted.");
 };

 function formatLines(){
     let text = document.getElementById("outputdiv").value;
     var i = -1;
     let formated_text = "";
     while (i< text.length-2){
         i+=1;
         let n = 0;
        if(text[i] == "\n"){
            while( isAlphaOrParen(text[i]) ==false & i < text.length-2){
                n+=1;
                i+=1;
            }
            if (n>2){
                formated_text+="\n\n";
            }
            else{
                formated_text+="\n";
            }
            
        }
         formated_text+=text[i];
         document.getElementById("outputdiv").value = formated_text;
         document.getElementById("formatlines-button").style.opacity = "0.6";
         let element = document.getElementById("formatlines-button");
         element.setAttribute("onclick","");
         element.setAttribute("title","Lines already formatted.");
     }
 };