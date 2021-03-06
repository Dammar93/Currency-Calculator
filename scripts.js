const submitButton = document.querySelector('.submit-button');
const result = document.querySelector('.result');
const select1 = document.querySelector('.select-1');
const select2 = document.querySelector('.select-2');
let amount = document.querySelector('.start-value');


function createOptions(select, tab){
  for (let i=0; i<tab.length; i++){
    var option = document.createElement('OPTION');
    option.setAttribute('value', tab[i]);
    option.setAttribute('class', 'curr-options')
    option.innerText = tab[i];
    select.appendChild(option);
  }
}

function downloadCurrencies(){
  fetch('http://api.nbp.pl/api/exchangerates/tables/c')
    .then(resp => resp.json())
    .then(resp => {
      var arrCodes = [];
      var arrCoursesBid = [];
      var arrShortCodes = [];
      resp[0].rates.forEach(el => {
        arrCodes.push(el.code + ' - ' + el.currency);
        arrCoursesBid.push(el.bid);
        arrShortCodes.push(el.code);
      });
      arrCodes.unshift('PLN - złoty polski')
      arrShortCodes.unshift('PLN')
      arrCoursesBid.unshift(1)
      createOptions(select1, arrCodes)
      createOptions(select2, arrCodes)

      function countResult(bidTab, codesTab){
        let val1 = select1.value,
            val2 = select2.value,
            exchangeRate1 = bidTab[codesTab.indexOf(val1)],
            exchangeRate2 = bidTab[codesTab.indexOf(val2)];
            amountVal = amount.value
        return amountVal * exchangeRate1 / exchangeRate2
      }

      submitButton.addEventListener('click', function(){
        var code1 = arrShortCodes[arrCodes.indexOf(select1.value)];
        var code2 = arrShortCodes[arrCodes.indexOf(select2.value)];
        if (amount.value == 0 || amount.value == '') { amount.value = 0 };
        result.innerText = amount.value + ' '+code1
        +' = '+Math.round(countResult(arrCoursesBid, arrCodes) * 100) / 100+' '+code2
      })
    })};

downloadCurrencies();
