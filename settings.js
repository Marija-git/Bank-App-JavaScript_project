'use strict'

const displaySettings = function()
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
    displaySettingsMiddleDiv();    
}

const displaySettingsMiddleDiv = function()
{
    const html = `
        <div id="Settings">Settings</div>
        <div id="darkTheme">
            <div id="dt">Dark theme</div>
            <div id="dtb">
                <button id="toggleThemeBtn">change</button>
            </div>
        </div>
    `;

    document.querySelector('.middleDiv').insertAdjacentHTML("afterbegin",html);

    var toggleThemeBtn = document.getElementById('toggleThemeBtn');
    toggleThemeBtn.addEventListener('click',function()
    {
        (document.body).classList.toggle('dark-theme');
        clearInterval(helperVar);
        helperVar = startTimer();
    });

}

