const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let tocurr = document.querySelector(".to select")
let fromcurr = document.querySelector(".from select")
let msg=document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "FROM" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "TO" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt)=>{
    updateFlag(evt.target);
  })
}
 
let updateExchangeRate= async()=>{
  let ammount=document.querySelector(".amount input");
  let amtVal=ammount.value;
   if(amtVal==="" || amtVal<1){
    ammount.value="1";
    amtVal=1;
   }
   let URL=`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
   let response= await fetch(URL);
   let data= await response.json();
   let rate=data[tocurr.value.toLowerCase()];
   let finalRate=amtVal*rate;
    msg.innerText=`${amtVal} ${fromcurr.value}=${finalRate} ${tocurr.value}`;
}
let updateFlag=(element)=>{
  let currCode=element.value;
  let countryCode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;
}

btn.addEventListener("click", (evt)=>{
  evt.preventDefault();
   updateExchangeRate();
  })

 window.addEventListener("load",updateExchangeRate)