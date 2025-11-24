document.getElementById("cashout-btn").addEventListener('click',function(event){
event.preventDefault();

const pin=document.getElementById("cashoutPIN").value;
const convertedPin=parseInt(pin);
const amount=document.getElementById("cashout-amount").value;
 const convertedamount=parseFloat(amount);
 const mainBalance =document.getElementById('main-balance').innerText;
 const convertedMainBalance = parseFloat(mainBalance);
 const accountNumber=document.getElementById("account-number").value;
if (accountNumber.length == 11){
 if(convertedPin==1234){
const sum=convertedMainBalance-convertedamount;
document.getElementById("main-balance").innerText=sum;
const container =document.getElementById("transaction-container");
const p=document.createElement("p");
p.innerText=`Extracted ${amount} from ${accountNumber} account
`
container.appendChild(p);
 }
}
 else{
    alert("enter valid pin")
 }
})