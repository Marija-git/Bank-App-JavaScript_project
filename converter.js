
'use strict';

const displayConverter = function()
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
    displayConverterMiddleDiv();
    displayConverterRightDiv();

}

const displayConverterMiddleDiv = function()
{
    const html = `
        <div id="CurrencyConverter">Currency converter</div>
        <div id="cards--accounts">
            <div id="DIN">
                <div id="amountDIN">
                    <ul>
                        <li class="curr"></li>
                    </ul>
                </div>
                <div id="valutaDIN"><p>€</p></div>
            </div>
            <div class="krug"></div>
            <div id="EUR">
                <div id="amountEUR">
                        <ul>
                         <li class="curr2"></li>
                        </ul>
                </div>
                <div id="valutaEUR"><p>RSD</p></div>
            </div>
            </div>
        </div>

    `;
    document.querySelector('.middleDiv').insertAdjacentHTML("afterbegin",html);
    document.querySelector('.curr').textContent=`${currentAcc.balance}`;
    const sumRSD = currentAcc.movementsRSD.reduce((accumulator,currentMov) => accumulator+currentMov,0);
    document.querySelector('.curr2').textContent=`${sumRSD}`;

}

const displayConverterRightDiv = function()
{
    apiEUR();
    apiUSD();
    apiCHF();
    const html = `
    <table id="tableConverter">
        <tr id="trFirst">
            <th>Currency</th>
            <th>Rate</th>
        </tr>
        <tr>
            <td>1 EUR</td>
            <td id="rateEUR"></td>
        </tr>
        <tr>
            <td>1 USD</td>
            <td id="rateUSD"></td>
        </tr>
        <tr id="chftr">
            <td>1 CHF</td>
            <td id="rateCHF"></td>
    </tr>
  </table>
    `;
    document.querySelector('.rightDiv').insertAdjacentHTML("afterbegin",html);

    const divConvert = `
                    <div class="divConvert">
                        <p>Convert money</p>
                            <input type="number" class="AmountInputt" placeholder="Amount"/>
                            <button class="btnConvert" onclick="convert()">Convert</button>                        
                    </div>
                `;
                document.querySelector('.rightDiv').insertAdjacentHTML('beforeend',divConvert);
    

}

const apiEUR = function()
{
    const apiKey = '75c115f03179b47b595a5810';
    const apiUrl = `https://v6.exchangerate-api.com/v6/75c115f03179b47b595a5810/latest/EUR`;

    // send get req
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error(`Greška prilikom dobijanja kursnih listi. Kod odgovora: ${response.status}`);
        }
        return response.json();
    })
    // obrada podataka
    .then(data => {
        console.log(data);
        console.log(data.conversion_rates);
        console.log(data.conversion_rates.RSD);
        console.log(data.conversion_rates.EUR);

        document.querySelector('#rateEUR').textContent = `${data.conversion_rates.RSD}`;
        
    })
    .catch(error => {
        console.error('Došlo je do greške:', error);
    });

}

const apiUSD = function()
{
    const apiKey = '75c115f03179b47b595a5810';
    const apiUrl = `https://v6.exchangerate-api.com/v6/75c115f03179b47b595a5810/latest/USD`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error(`Greška prilikom dobijanja kursnih listi. Kod odgovora: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        console.log(data.conversion_rates);
        console.log(data.conversion_rates.RSD);
        console.log(data.conversion_rates.EUR);

        document.querySelector('#rateUSD').textContent = `${data.conversion_rates.RSD}`;
        
    })
    .catch(error => {
        console.error('Došlo je do greške:', error);
    });

}

const apiCHF = function()
{
    const apiKey = '75c115f03179b47b595a5810';
    const apiUrl = `https://v6.exchangerate-api.com/v6/75c115f03179b47b595a5810/latest/CHF`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error(`Greška prilikom dobijanja kursnih listi. Kod odgovora: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        console.log(data.conversion_rates);
        console.log(data.conversion_rates.RSD);
        console.log(data.conversion_rates.EUR);

        document.querySelector('#rateCHF').textContent = `${data.conversion_rates.RSD}`;
        
    })
    .catch(error => {
        console.error('Došlo je do greške:', error);
    });

}

const convert = function()
{    
    
    //prihvatis amount sa inputa (amount = koliko eura zeli da kupi)  // npr 50e
    const amount = Number(document.querySelector('.AmountInputt').value);
    document.querySelector('.AmountInputt').value='';
    if(!Number.isInteger(amount))
    {
        alert('Enter an integer');
    }
    else
    {
        const rate = Number(document.querySelector('#rateEUR').textContent);
        const sumDIN = Number(document.querySelector('.curr2').textContent);

        console.log(amount);
        console.log(rate);
        console.log(sumDIN);

        if((amount*rate) <= sumDIN)
        {
            console.log('moze');
            // smanjis dinare,dodas evre - kod movements,movementsEUR, currency conv prikaz, dashboard prikaz,display balance prikaz
            currentAcc.movementsRSD.push(-(amount*rate));
            currentAcc.movements.push(amount);
            displayBalance(currentAcc);

            const todayDate = new Date();
            var day = todayDate.getDate();
            var month=todayDate.getMonth()+1;
            var year = todayDate.getFullYear();
            var fulldate =`${year}-${month}-${day}`;
            currentAcc.movementsDates.push(fulldate);
            //displayMovements(currentAcc.movements,document.querySelector('.divTransactions'),currentAcc.movementsDates);
            
            document.querySelector('.curr').textContent=`${currentAcc.balance}`;
            const sumRSD = currentAcc.movementsRSD.reduce((accumulator,currentMov) => accumulator+currentMov,0);
            document.querySelector('.curr2').textContent=`${Math.floor(sumRSD)}`;
            
        }
        else
        {
            alert('There are insufficient funds in your account ');          
        }      

    }
    clearInterval(helperVar);
    helperVar = startTimer();
    
}