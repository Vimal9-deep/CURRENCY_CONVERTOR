
import { countryList } from './codes.js';  

const base_URL= "https://open.er-api.com/v6/latest";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");

const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
   
for(let select of dropdowns)
{
   for(let code in countryList)
   {
      let newoptn=document.createElement("option"); 
      newoptn.innerText=code;
      newoptn.value=code;
      if(select.name=="from"&& code=="USD")
      {
         newoptn.selected="selected";
      }
      else if(select.name=="to"&& code=="INR")
      {
         newoptn.selected="selected";
      }
      select.append(newoptn);
   }
   select.addEventListener("change",(e)=>{
       updateflag(e.target);
   });
}
const updateflag=(element)=>{
   let currcode=element.value;
   let countrycode=countryList[currcode];
   let newsource=`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");  //accessing image tag
   img.src=newsource;   //this will change the image country dynamically as selected by user
};

//function for api fetch--
   const api = async ()=>{        
    let amount=document.querySelector(".amount input");
    let amtvl=amount.value;
    //console.log(amtvl);
    if(amtvl==""||amtvl<1)
    {
      amtvl=1;
      amount.value="1";
    }

    //code for fetching data from API according to format of api------

   // console.log(fromcurr.value,tocurr.value);
   // const URL=`${base_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;

   const URL=`${base_URL}/${fromcurr.value}`;
   //console.log(URL)  checking
   let response=await fetch(URL);  //fetching data of api stored in variable URL
   let data=await response.json();
  let exdata=tocurr.value;
 // console.log(exdata); checking

 let ansData = data.rates[exdata];
   let finalamount=ansData*amtvl;

   //msg.innerText=`1USD=80INR`; lower line is written in this format---
   msg.innerText=`${amtvl} ${fromcurr.value}=${finalamount} ${tocurr.value}`;
   };
  
   //button pr click krte hi api call ho jayegi---
btn.addEventListener("click" , (evt)=>{
   evt.preventDefault();
   api();
});


//API USED= "https://open.er-api.com/v6/latest/USD"  isme 'tocurr' vala part nhi hy ,to usko hum 
//alag se fetch karege  from response given by api
