let currency1 = document.querySelectorAll(".currency-1");
let currency2 = document.querySelectorAll(".currency-2");

let input1 = document.querySelector(".from input");
let input2 = document.querySelector(".to input");

let rateInfo1 = document.querySelector(".from .rate-info span");
let rateInfo2 = document.querySelector(".to .rate-info span");

let currency1Clicked = "RUB";

currency1.forEach((currency) => {
  currency.addEventListener("click", (event) => {
    currency1.forEach((item) => {
      item.style.backgroundColor = "white";
      item.style.color = "#C6C6C6";
    });
    event.target.style.backgroundColor = "#833AE0";
    event.target.style.color = "white";
    currency1Clicked = event.target.innerText;
    enterNumber(currency1Clicked, currency2Clicked, input1, input2, 0);
  });
});

let currency2Clicked = "USD";

currency2.forEach((currency) => {
  currency.addEventListener("click", (event) => {
    currency2.forEach((item) => {
      item.style.backgroundColor = "white";
      item.style.color = "#C6C6C6";
    });
    event.target.style.backgroundColor = "#833AE0";
    event.target.style.color = "white";
    currency2Clicked = event.target.innerText;
    enterNumber(currency1Clicked, currency2Clicked, input1, input2, 1);
  });
});

function enterNumber(
  currency1Clicked,
  currency2Clicked,
  input1,
  input2,
  calling
) {
  fetch(
    `https://api.exchangerate.host/latest?base=${currency1Clicked}&symbols=${currency2Clicked}`
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      let val = +Object.values(data.rates);
      rateInfo1.innerText = `1 ${currency1Clicked} = ${val} ${currency2Clicked}`;

      if (calling == 1) {
        input2.value = input1.value * val;
      }

      input1.addEventListener("keyup", (event) => {
        input2.value = input1.value * val;
      });

      input1.addEventListener("change", (event) => {
        input2.value = input1.value * val;
      });
    })
    .catch((err) => {
        console.log("Səhv gedən nəsə var...");
      });

  fetch(
    `https://api.exchangerate.host/latest?base=${currency2Clicked}&symbols=${currency1Clicked}`
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      let val = +Object.values(data.rates);
      rateInfo2.innerText = `1 ${currency2Clicked} = ${val} ${currency1Clicked}`;

      if (calling == 0) {
        input1.value = input2.value * val;
      }

      input2.addEventListener("keyup", (event) => {
        input1.value = input2.value * val;
      });

      input2.addEventListener("change", (event) => {
        input1.value = input2.value * val;
      });
    })
    .catch((err) => {
        console.log("Səhv gedən nəsə var...");
      });
}

enterNumber(currency1Clicked, currency2Clicked, input1, input2);