'use strict';

const btnLogin = document.querySelector('.login_btn');
const inputLoginAccNum = document.querySelector('.login_input_accNum');
const inputLoginPin = document.querySelector('.login_input_pin');
const loginForm = document.querySelector('.login');
const divBalance = document.querySelector('.balance');
const pFirstMessage = document.querySelector('.first_message');


async function readData(path)
{
    const response = await fetch(path);
    const data = await response.json();
    return data;
}

const accounts= [];

readData('users.json')
.then(users => 
    {
        //console.log(users);
        let counter = 1;
                users.forEach(user =>
            {
               // console.log(user.owner);

                const objName = `account${counter}`;
                const obj = {
                    [objName] : user,
                    owner: user.owner,
                    movements: user.movements,
                    accNum:user.accNum,
                    pin:user.pin,
                    movementsDates:user.movementsDates,
                    cardNum1:user.cardNum1,
                    cardNum2:user.cardNum2,
                    movementsRSD:user.movementsRSD                 
                }
                accounts.push(obj);  
                counter++;           
            });           
    });
console.log("Niz korisnika:",accounts);


// LOG IN

btnLogin.addEventListener('click',function(e)
{
  e.preventDefault();

  console.log(inputLoginAccNum.value, inputLoginPin.value);

  let found = false;
  accounts.forEach(account => 
    {
        if(account.accNum == inputLoginAccNum.value)
        {
            if(account.pin == inputLoginPin.value)
            {
                currentAcc = account;
                console.log(currentAcc);
                found=true;
                //return;

                //update UI
                loginForm.hidden=true;
                showHomePage(); 
                helperVar = startTimer();  
                            
            }            
        }        
    });
    if(found == false)
    {
        alert('invalid username or password');
    }

});















