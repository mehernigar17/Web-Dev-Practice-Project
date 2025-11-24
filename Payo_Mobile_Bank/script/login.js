// will catch the element first
document.getElementById('login-btn').addEventListener('click', function(event) {

event.preventDefault();
const accountNumber  = document.getElementById('account-number').value;
const pin=document.getElementById('PIN').value;
const convertedpin=parseInt(pin)
if(accountNumber.length==11){
    if(convertedpin==1234){
        
        window.location.href="./main.html"
    }
    else{
        alert('invalid pin')
    }

}
else{
    alert('need valid account number')
}

})