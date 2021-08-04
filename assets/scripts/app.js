
//to get text from history bar
function getHistory(){
    return document.getElementById("history-value").innerText;
}

//to print in history bar
function printHistory(num){
    document.getElementById("history-value").innerText = num;
}

//to get output from output bar
function getOutput(){
    return document.getElementById("output-value").innerText;
}


//to print the output in the output bar
function printOutput(num){
    if(num == ""){ //if output bar is empty
        document.getElementById("output-value").innerText = num;
    }
    else{//if not empty then get formatted value
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
    
}

//to get value with commas to make it readable
function getFormattedNumber(num){
    if(num == "-"){ //to avoid NaN error
        return "";
    }

    let n = Number(num);
    let value = n.toLocaleString("en");
    return value;
}

//to convert back to normal value without commas
function reverseFormatted(num){
    return Number(num.replace(/,/g,''));
}


//handling operators
var operator = document.getElementsByClassName("operator");


for(let i = 0; i < operator.length; i++){
    operator[i].addEventListener('click', function(){ //handling operator clicks
         if(this.id == "clear"){
             printOutput("");
             printHistory(""); //clearing history and output bar
         }
         else if(this.id == "backspace"){
             let output = reverseFormatted(getOutput()).toString();
             if(output){
                 output = output.substr(0, output.length-1); //removing the last digit 
                 printOutput(output);
             }
         }
         else{
             let output = getOutput();
             let history = getHistory();
             if(output == "" && history != ""){
                 if(isNaN(history[history.length-1])){ //to check if it's a number or an operator
                     history = history.substr(0, history.length-1); //removing the operator
                     
                 }
                 
             }

             if(output != "" || history != ""){
                 output = output == "" ? output : reverseFormatted(output); //if output is empty or not
                 history = history+output;
                 if(this.id == "="){
                     let result = eval(history); //evaluating result
                     printOutput(result);
                     printHistory("");
                 }
                 else{
                     history = history + this.id; 
                     printHistory(history);
                     printOutput("");
                 }
             }
         }
    });
}

//handling number clicks
var number = document.getElementsByClassName("number");

for(let i = 0; i < number.length; i++){
    number[i].addEventListener('click', function(){
         let output = reverseFormatted(getOutput());
         if(output != NaN){
             output = output + this.id;
             printOutput(output);
         }
    });
}

