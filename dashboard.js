'use strict';

let currentAcc ,helperVar, currentCard = true, sorted = false;

const uni = function()
{ 
    const html= `
                <div class="container">
                    <div class="leftDiv"></div>
                    <div class="middleDiv"></div>
                    <div class="rightDiv"></div>
                </div>
        `;
        document.body.insertAdjacentHTML('afterbegin',html);

        const divTimer=`
        <div class="divTimer">
            <p>
                You will be logged out in <span class="timer">01:00</span> minutes
            </p>
        </div>
    `;
    document.querySelector('.rightDiv').insertAdjacentHTML('beforeend',divTimer);

    const dateAndTime = `<div class="dateAndTime"></div>`;
    document.querySelector('.rightDiv').insertAdjacentHTML('beforeend',dateAndTime);
    const res = displayCurrentDateAndTime();
    document.querySelector('.dateAndTime').textContent = `Current date: ${res}`;

}

const showHomePage = function()
{
    var bodyElement = document.body;
    var allElements = bodyElement.children;
    for (var i = allElements.length - 1; i >= 0; i--)
    {
        var currentElement = allElements[i];
        if (currentElement.tagName !== 'SCRIPT' && currentElement.tagName !== 'MAIN') 
        {
            currentElement.parentNode.removeChild(currentElement);
        }
    }
   
    uni();   
    //leftDiv
    showHomePageLeftDiv();               
    //middleDiv
    showHomePageMiddleDiv();
    //rightDiv
    showHomePageRightDiv();
                              
}

const showHomePageLeftDiv=function(){
    
    document.querySelector('.leftDiv').innerHTML += `
                    <div class="logo">
                        <p>MyBank</p>
                        <img alt="logo" src="https://img.freepik.com/free-vector/modern-business-logo-gradient-icon-design_53876-120504.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705795200&semt=ais"></img>
                    </div>
                    <div class="meni1">
                        <ul>
                            <li class="icon1"><a class="linkDashboard">Dashboard</a></li>
                            <li class="icon2"><a class="linkConverter">Converter</a></li>
                            <li class="icon3"><a class="linkCards" href="" >Cards</a></li>
                        </ul>
                    </div>
                    <hr>
                    <div class="meni2">
                        <ul>    
                            <li class="icon4"><a class="linkSettings" href="" >Settings</a></li>
                            
                            <li class="icon6"><button class="btnLogOut" onclick="logOut()" >Log out</button></li>
                        </ul>

                    </div>
                `;

        document.querySelector('.linkDashboard').addEventListener('click',function(e)
        {
            e.preventDefault();
            clearInterval(helperVar);
            helperVar = startTimer();   
            formExist = false;          
            showHomePage();

        });
        document.querySelector('.linkConverter').addEventListener('click',function(e)
        {
            e.preventDefault();
            clearInterval(helperVar);
            helperVar = startTimer();
            formExist = false;
            displayConverter();
        });
        document.querySelector('.linkCards').addEventListener('click',function(e)
        {
            e.preventDefault();
            clearInterval(helperVar);
            helperVar = startTimer();
            formExist = false;
            displayMenuCards();
        });
        document.querySelector('.linkSettings').addEventListener('click',function(e)
        {
            e.preventDefault();
            clearInterval(helperVar);
            helperVar = startTimer();
            formExist = false;
            displaySettings();
        });


}

const showHomePageMiddleDiv=function()
{
    pFirstMessage.textContent = `Welcome back ${currentAcc.owner.split(' ')[0]}!`;
                document.querySelector('.middleDiv').innerHTML += `
                    <div class="divOne"></div>
                    <div class="divCards"></div>
                    <div class="divTransactions">                       
                        
                    </div>
                `;
                //divOne
                const firstMandBalance = `
                <div class="firstMandBalance"></div>
                `;
                document.querySelector('.divOne').insertAdjacentHTML('afterbegin',firstMandBalance);
                document.querySelector('.firstMandBalance').insertAdjacentElement('afterbegin',pFirstMessage);
                divBalance.hidden=false;
                document.querySelector('.firstMandBalance').insertAdjacentElement('beforeend',divBalance);
                displayBalance(currentAcc);
                //displayCurrentDateAndTime();


             const circleForProfile = `
             <div class="rectangle">

                <div class="circle"> 
                    <img id="selectedImage">               
                </div>

                <form class="myForm" action="/upload" method="post" enctype="multipart/form-data">
                    <label for="fileInput">Change your profile picture:</label>
                    <input type="file" id="fileInput" name="fileInput" accept="image/*">
            </form>

            </div>
             `;
             document.querySelector('.divOne').insertAdjacentHTML("beforeend",circleForProfile);

             document.getElementById('fileInput').addEventListener('change', function(event) 
            {
                const selectedFile = event.target.files[0];
                const selectedImageElement = document.getElementById('selectedImage');
          
                if (selectedFile) 
                {
                  const imageUrl = URL.createObjectURL(selectedFile);
                  selectedImageElement.src = imageUrl;
                  selectedImageElement.style.display = 'block';
                  console.log('Izabrana slika:', selectedFile);
                } 
                else {
                    // Ako korisnik poništi izbor slike, koristi prethodnu sliku
                    if (selectedImageElement.src != '') 
                    {
                        selectedImageElement.src = selectedImageElement.src;
                        selectedImageElement.style.display = 'block';
                    } else {
                        // Ako nema prethodne slike, sakrij sliku
                        selectedImageElement.src = '';
                        selectedImageElement.style.display = 'none';
                    }
                }
            });   

             //divCards
             const card = `
             <div class="cardContainer">
                <div class="card" id="card1">
                    <div class="typeOfCard">type</div>
                    <div class="amount">amount</div>
                    <div class="cardNum">num</div>
                </div>
                <div class="card" id="card2">
                    <div class="typeOfCard">type</div>
                    <div class="amount">amount</div>
                    <div class="cardNum">num</div>
                </div>
             </div>
            
             <div class="switchButton">
                <button onclick="switchCards()">></button>
             </div>
             `;
             document.querySelector('.divCards').insertAdjacentHTML("afterbegin",card);
             displayCards();
             
             //divTransactions
             const divTr = document.querySelector('.divTransactions');
             displayMovements(currentAcc.movements,divTr,currentAcc.movementsDates);
            divTr.insertAdjacentHTML("afterbegin",'<p>Recent transactions <button class="sort_btn" onclick="sort()">Sort</button></p>');

}

const showHomePageRightDiv=function()
{
    const divDeleteAcc= `                   
                 <div class="deleteAccOperation">

                        <input type="number" class="DeleteAccInputAccNum" placeholder="Account Number"/>
                        <input type="number" class="DeleteAccInputPin" placeholder="Pin"/>
                        <button class="btnDeleteAcc" onclick="deleteAcc()">Delete</button>

                </div>
                `;
                
                document.querySelector('.rightDiv').insertAdjacentHTML('afterbegin',divDeleteAcc);
                const paragraph = `
                    <p>Delete your account</p>
                `;
                document.querySelector('.deleteAccOperation').insertAdjacentHTML('afterbegin',paragraph);
        
                const divTransfr = `
                    <div class="transferOperation">
                        <p>Quick transfer</p>
                        
                            <input type="number" class="transferToInput" placeholder="Transfer to"/>
                            <input type="number" class="AmountInput" placeholder="Amount"/>
                            <button class="btnTrasnfer" onclick="transfer()">Transfer</button>
                        
                    </div>
                `;
                document.querySelector('.rightDiv').insertAdjacentHTML('afterbegin',divTransfr);
                              

}



const displayMovements = function(movements,divTransactions,sredjeniDatumi)
{   
         
    const divsToDelete = divTransactions.querySelectorAll('div');
    divsToDelete.forEach(div=>div.remove());
    
    const movs = movements.slice().reverse();
    movs.forEach(function(mov,i)
    {
        let type = '';
        if(mov > 0)
        {
            type='deposit';
        }
        else
        {
            type = 'withdrawal';
        }
        
        const date = new Date(sredjeniDatumi.slice().reverse()[i]);
        var day = date.getDate();
        var month=date.getMonth()+1;
        var year = date.getFullYear();
        var fulldate =`${day}/${month}/${year}`;

                   
        const html = `
        <div class="typedatevalue">
        <div class="movType--${type}">${type}</div>
        <div class="movDate">${fulldate}</div>
        <div class="movValue">${mov}€</div>
        </div>
        `;      

        divTransactions.innerHTML += html;    
                
    });      
};



const switchCards = function()
{    
    if(currentCard == true)
    {        
        document.querySelector('#card2').style.transform = 'translateX(-80%)';
        document.querySelector('#card1').style.zIndex = '1';
        document.querySelector('#card1').style.transform = 'translateX(50%)'; 
        document.querySelector('#card2').style.zIndex = '0';
        
        currentCard = false
        clearInterval(helperVar);
        helperVar = startTimer();
    }
    else
    {           
        document.querySelector('#card1').style.transform = 'translateX(20%)';
        document.querySelector('#card2').style.zIndex = '0';
        document.querySelector('#card2').style.transform = 'translateX(-50%)';
        document.querySelector('#card2').style.zIndex = '1';

        currentCard =true;

        clearInterval(helperVar);
        helperVar = startTimer();      
    }
    console.log('switch');
}



const displayCards = function()
{
    document.querySelector("#card1").children[0].textContent = 'EUR';
    const sumEUR = currentAcc.movements.reduce((accumulator,currentMov) => accumulator+currentMov,0);
    document.querySelector("#card1").children[1].textContent = `${sumEUR}`;
    document.querySelector("#card1").children[2].textContent = currentAcc.cardNum2;

    document.querySelector("#card2").children[0].textContent = 'RSD';
    const sumRSD = currentAcc.movementsRSD.reduce((accumulator,currentMov) => accumulator+currentMov,0);
    document.querySelector("#card2").children[1].textContent = `${sumRSD}`;   
    document.querySelector("#card2").children[2].textContent = currentAcc.cardNum1;
   
}



const startTimer = function()
{
    let timeInSeconds = 1000;

    const timerFun = function()
    {
        const minutes = String(Math.trunc(timeInSeconds/60)).padStart(2,0);   // 02 
        const seconds = String(timeInSeconds % 60).padStart(2,0);             //59,58..09,08..01

        document.querySelector('.timer').textContent = `${minutes}:${seconds}`;

        timeInSeconds--;

        if(timeInSeconds < 0)
        {
            clearInterval(myInteval);   
            document.querySelector('.leftDiv').style.display='none';
            document.querySelector('.middleDiv').style.display='none';         
            document.querySelector('.rightDiv').style.display='none';
            
            inputLoginAccNum.value='';
            inputLoginPin.value='';
            loginForm.hidden=false;
            pFirstMessage.textContent=`Session is over. Please log in to access your account`;
            loginForm.insertAdjacentElement('afterbegin',pFirstMessage);
            
            
        }

    }
    timerFun();
    const myInteval = setInterval(timerFun,1000);  
    return myInteval;
}


const displayCurrentDateAndTime = function()
{
    
    let currDateTime=new Date();    //Tue Jan 30 2024 18:33:45 GMT+0100 (Central European Standard Time)
    let year = currDateTime.getFullYear(), month,day,hours,min,res;
    
    if((currDateTime.getMonth()+1) < 10)
    {
        month = '0' + (currDateTime.getMonth()+1);
    }
    else
    {
        month = currDateTime.getMonth()+1;
    }

    if(currDateTime.getUTCDate() < 10)
    {        
        day = '0' + currDateTime.getUTCDate();       
    }
    else
    {        
        day = currDateTime.getUTCDate();        
    }

    if(currDateTime.getHours() < 10)
    {        
        hours = '0' + currDateTime.getHours();       
    }
    else
    {        
        hours = currDateTime.getHours();        
    }

    if(currDateTime.getMinutes() < 10)
    {        
        min = '0' + currDateTime.getMinutes();       
    }
    else
    {        
        min = currDateTime.getMinutes();        
    }


    res = `${year}-${month}-${day} ${hours}:${min}`;
    console.log(res);
    return res; 
}


const sort = function()
{      
    if(sorted == false)
    {
      
        // const newMovs = currentAcc.movements.slice().sort((a,b)=>a-b);   
        const connectedData = connect(); //dobijes spojene podatke
        connectedData.sort((a, b) => a.mov - b.mov);    //sortiras po brojevima
    
        let justMovements=connectedData.map((broj)=>broj.mov);  //izvuces niz brojeva (sortirano)
        let justDates = connectedData.map((datum)=>datum.date); //izvuces niz datuma (sortirano)
          
        const justDatesSredjeno=[];
        justDates.forEach(function(datee,i)
        {
            justDatesSredjeno.push(justDates[i].toISOString().split('T')[0]);   //sredis izgled datuma
        });

        displayMovements(justMovements,document.querySelector('.divTransactions'),justDatesSredjeno);
        sorted = true;

       
        clearInterval(helperVar);
        helperVar = startTimer();
     
    }
    else
    {      
        currentAcc.movements = currentAcc.movements;
        displayMovements(currentAcc.movements,document.querySelector('.divTransactions'),currentAcc.movementsDates);
        sorted= false;

        clearInterval(helperVar);
        helperVar = startTimer();
        
    }   
       
};

const displayBalance = function(currAcc)
{
    currAcc.balance = currAcc.movements.reduce((accumulator,currentMov) => accumulator+currentMov,0); 
    divBalance.children[1].textContent=`${currAcc.balance}`;    
};

const transfer=function()
{

  const receiverAcc = accounts.find(acc => acc.accNum ===  (Number(document.querySelector('.transferToInput').value)));
  const amount = Number(document.querySelector('.AmountInput').value);

  document.querySelector('.transferToInput').value = document.querySelector('.AmountInput').value = '';

  if(brojac > 0)
    {
       if(limEur == "Unlimited")
       {
            //moze proba transfera
            if(amount > 0 && currentAcc.balance >= amount && receiverAcc.accNum !== currentAcc.accNum)
            {

                //dodati kod za promenu u bazi
                receiverAcc.movements.push(amount);
                currentAcc.movements.push(-amount);

                const todayDate = new Date();
                var day = todayDate.getDate();
                var month=todayDate.getMonth()+1;
                var year = todayDate.getFullYear();
                var fulldate =`${year}-${month}-${day}`;
                
                receiverAcc.movementsDates.push(fulldate);
                currentAcc.movementsDates.push(fulldate);

                displayBalance(currentAcc);
                displayMovements(currentAcc.movements,document.querySelector('.divTransactions'),currentAcc.movementsDates);

                clearInterval(helperVar);
                helperVar = startTimer();
        
            }
            else
            {
                alert('err');
                clearInterval(helperVar);
                helperVar = startTimer();
            }
            
       }
       else
       {
            // const ogranicenje = Number(document.querySelector('#dailyLimit').children[0].textContent);
            if(amount < limEur)
            {
                //moze proba transfera
                if(amount > 0 && currentAcc.balance >= amount && receiverAcc.accNum !== currentAcc.accNum)
                {

                    //dodati kod za promenu u bazi
                    receiverAcc.movements.push(amount);
                    currentAcc.movements.push(-amount);

                    const todayDate = new Date();
                    var day = todayDate.getDate();
                    var month=todayDate.getMonth()+1;
                    var year = todayDate.getFullYear();
                    var fulldate =`${year}-${month}-${day}`;
                    
                    receiverAcc.movementsDates.push(fulldate);
                    currentAcc.movementsDates.push(fulldate);

                    displayBalance(currentAcc);
                    displayMovements(currentAcc.movements,document.querySelector('.divTransactions'),currentAcc.movementsDates);

                    clearInterval(helperVar);
                    helperVar = startTimer();
        
                }
                else
                {
                    alert('err');
                    clearInterval(helperVar);
                    helperVar = startTimer();
                }
            }
            else
            {
                alert("You can't do this transaction. Please check your daily limit.");
                clearInterval(helperVar);
                helperVar = startTimer();
            }
       }
    }
    //ako ne psotoji daily limi opet proba transfera
    else if(amount > 0 && currentAcc.balance >= amount && receiverAcc.accNum !== currentAcc.accNum)
    {
            //dodati kod za promenu u bazi
            receiverAcc.movements.push(amount);
            currentAcc.movements.push(-amount);

            const todayDate = new Date();
            var day = todayDate.getDate();
            var month=todayDate.getMonth()+1;
            var year = todayDate.getFullYear();
            var fulldate =`${year}-${month}-${day}`;
            
            receiverAcc.movementsDates.push(fulldate);
            currentAcc.movementsDates.push(fulldate);

            displayBalance(currentAcc);
            displayMovements(currentAcc.movements,document.querySelector('.divTransactions'),currentAcc.movementsDates);

            clearInterval(helperVar);
            helperVar = startTimer();
        
   }
    else
    {
        alert('err');
        clearInterval(helperVar);
        helperVar = startTimer();
     }
    

  
// KOD AKO NE POSTOJI OGRANICENJE OPCIJA UOSPTE    

//   if(amount > 0 && currentAcc.balance >= amount && receiverAcc.accNum !== currentAcc.accNum)
//   {

//     //dodati kod za promenu u bazi
//     receiverAcc.movements.push(amount);
//     currentAcc.movements.push(-amount);

//     const todayDate = new Date();
//     var day = todayDate.getDate();
//     var month=todayDate.getMonth()+1;
//     var year = todayDate.getFullYear();
//     var fulldate =`${year}-${month}-${day}`;
    
//     receiverAcc.movementsDates.push(fulldate);
//     currentAcc.movementsDates.push(fulldate);

//     displayBalance(currentAcc);
//     displayMovements(currentAcc.movements,document.querySelector('.divTransactions'),currentAcc.movementsDates);

//         clearInterval(helperVar);
//         helperVar = startTimer();
        
//    }
//   else
//   {
//     alert('err');
//     clearInterval(helperVar);
//     helperVar = startTimer();
//   }
        
};


const connect = function()
{
      //
      let connectedData = (currentAcc.movements).map((mov, index) => ({
        mov: mov,
        date: new Date((currentAcc.movementsDates)[index])
      }));
    
      console.log(connectedData);
      return connectedData;

    //
}

const deleteAcc = function()
{
    if(currentAcc.accNum === Number(document.querySelector('.DeleteAccInputAccNum').value) && currentAcc.pin === Number(document.querySelector('.DeleteAccInputPin').value))
    { 
        for(let i=0; i < accounts.length; i++)
        {
            if(accounts[i].accNum === currentAcc.accNum)
            {
                //Remove 1 element at index 
                accounts.splice(i,1);
                console.log(accounts); 
    
                document.querySelector('body').style.opacity=0;
            }
            else
            {
                alert('error');
            }
        }
    }
    document.querySelector('.DeleteAccInputAccNum').value = document.querySelector('.DeleteAccInputPin').value='';
}


const logOut = function()
{   
        var confirmation = window.confirm('Are you sure you want to log out?');

        if(confirmation)
        {
            clearInterval(helperVar);
            // console.log('odjava');  
            // document.querySelector('.leftDiv').style.display='none';
            // document.querySelector('.middleDiv').style.display='none';         
            // document.querySelector('.rightDiv').style.display='none';

            var bodyElement = document.body;
            var allElements = bodyElement.children;
            for (var i = allElements.length - 1; i >= 0; i--)
            {
                var currentElement = allElements[i];
                if (currentElement.tagName !== 'SCRIPT' && currentElement.tagName !== 'MAIN') 
            {
                 currentElement.parentNode.removeChild(currentElement);
            }
    }
            
            inputLoginAccNum.value='';
            inputLoginPin.value='';
            loginForm.hidden=false;
            pFirstMessage.textContent=`You logged out`;
            loginForm.insertAdjacentElement('afterbegin',pFirstMessage);
        }
        else
        {
            //
        }
    
}