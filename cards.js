'use strict'
let formExist = false;
let limEur = "Unlimited";
let limRSD = "Unlimited";
let brojac = 0;
const displayMenuCards = function()
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
    showHomePageLeftDiv();
    displayCardsMiddleDiv();
    brojac++;

}

const displayCardsMiddleDiv = function()
{
    const html = `
        <div id="c0">Cards</div>

        <div id="c1">
        
             <div id="firstCard">
                    <div class="typeOfCard">type</div>
                    <div class="amount">amount</div>
                    <div class="cardNum">num</div>
                </div>

        </div>

        <div id="c2">

                <div id="secondCard">
                    <div class="typeOfCard">type</div>
                    <div class="amount">amount</div>
                    <div class="cardNum">num</div>
                </div>
            
        </div>

       
    `;

    document.querySelector('.middleDiv').insertAdjacentHTML("afterbegin",html);
    displayCard2();

    const html2 = `
        <div id="dailyLimit" onclick="limit()">
            
            <p>Tap here to change daily limit</p>
        </div>
    `;
    document.querySelector('#c1').insertAdjacentHTML("beforeend",html2);
    document.querySelector('#c2').insertAdjacentHTML("beforeend",html2);
    const p1 = `<p>${limEur}</p>`;
    const p2 = `<p>${limRSD}</p>`;
    document.querySelector('#c1').children[1].insertAdjacentHTML("afterbegin",p1);
    document.querySelector('#c2').children[1].insertAdjacentHTML("afterbegin",p2);
   
}


const limit=function()
{
    if(formExist === false)
    {
        const form1 = `
        <form class="form1">
            <label class="label1">Enter new daily limit</label>

            <select>
            <option value="">--Please choose an option--</option>
                <option value="eur">EUR</option>
                <option value="rsd">RSD</option>
            </select>

            <input class="inputLimit" type="number"/>
            <input class="classSubmit" type="submit" value="Submit" />
        </form>
    `;

        document.querySelector('.rightDiv').insertAdjacentHTML("afterbegin",form1);
        formExist=true;

        
        document.querySelector('.classSubmit').addEventListener('click',function(e)
        {
            e.preventDefault();

            var select =document.querySelector('select');
            var opcija = select.options[select.selectedIndex];

            if(opcija.value === "" || document.querySelector('.inputLimit').value === "")
            {
                alert('Please choose and option');
            }
        else{

                if(opcija.value === "eur")
                {
                    alert('eur');
                    limEur = document.querySelector('.inputLimit').value;
                    (document.querySelector('#c1').lastElementChild).children[0].textContent = limEur;
                    console.log( (document.querySelector('#c1').lastElementChild).children[0].textContent);
                }
                else if(opcija.value === "rsd")
                {
                    alert('din');
                    limRSD = document.querySelector('.inputLimit').value;
                    (document.querySelector('#c2').lastElementChild).children[0].textContent =limRSD ;
                    console.log( (document.querySelector('#c2').lastElementChild).children[0].textContent);                  
                }               
            }
           
            document.querySelector('.inputLimit').value = "";
            clearInterval(helperVar);
            helperVar = startTimer();        

        });
    }
    else
    {
        const parent = document.querySelector('.rightDiv');
        const child = document.querySelector('.form1');
        const throwawayNode = parent.removeChild(child);
        formExist=false;
    }
    clearInterval(helperVar);
    helperVar = startTimer();
    
}

const displayCard2 = function()
{
    document.querySelector("#firstCard").children[0].textContent = 'EUR';
    const sumEUR = currentAcc.movements.reduce((accumulator,currentMov) => accumulator+currentMov,0);
    document.querySelector("#firstCard").children[1].textContent = `${sumEUR}`;
    document.querySelector("#firstCard").children[2].textContent = currentAcc.cardNum2;

    document.querySelector("#secondCard").children[0].textContent = 'DIN';
    const sumRSD = currentAcc.movementsRSD.reduce((accumulator,currentMov) => accumulator+currentMov,0);
    document.querySelector("#secondCard").children[1].textContent = `${sumRSD}`;   
    document.querySelector("#secondCard").children[2].textContent = currentAcc.cardNum1;
}