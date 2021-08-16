import * as App from './app.js'

var parameters = location.search.substring(1);
var FullDetails = JSON.parse(localStorage.getItem('FullProp'));

var temp = parameters.split("=");
var i=Number(temp[1]);
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
ShowItemDetails();
 async function ShowItemDetails(){
  let accotype=["Studio","1B1T","2B1T","3B2T","4B3T"];
  let proptypes=['HDB','Condo','Landed'];
  var DistID = ["01","01","01","01","01","02","02","02","04","04","05","05","05","03","03","03","06","07","07","08","08","09","09","10","10","10","10","11","11","11","12","12","12","13","13","13","13","14","14","14","14","15","15","15","15","16","16","16","17","17","18","18","19","19","19","20","20","21","21","22","22","22","22","22","23","23","23","23","24","24","24","25","25","25","27","27","26","26","28","28","17","19"];
 
  var state = await App.getPropState(i);
 
  var PropType =FullDetails[i].PropType;
  var firsttwo =String(FullDetails[i].Pin).slice(0,2);

  var  district = DistID[firsttwo-1];
  var price =numberWithCommas(await App.getPropPrice(i));
  var Pin =FullDetails[i].Pin;
  var PropAddress=FullDetails[i].Location;
  var area = numberWithCommas(FullDetails[i].Area);
  var acco = FullDetails[i].Acco;
  var blkentry =FullDetails[i].blockentry;
  var uemail = blkentry.split("%")[0];

  var WalletAdd=await App.GetWalletAccount();
  var SellerAdd=await App.getPropSellerAddress(i);
  var BuyerAdd=await App.getPropBuyerAddress(i);
  var lawyerAdd=await App.getPropAgentAddress(i);
  var blkoffer = await App.getInstanceBlockoffer(i);
  console.log(blkoffer);
  var offerpx =numberWithCommas(blkoffer.split("%")[0]);
    
  var offername =blkoffer.split("%")[1];
  var offerphone =blkoffer.split("%")[2];
  var offeremail =blkoffer.split("%")[3];
  var offercomm = blkoffer.split("%")[4];
  var ucontactnumber = blkentry.split("%")[1];
  var tenure = blkentry.split("%")[3];
  var url1 = blkentry.split("%")[4];
  var url2 = blkentry.split("%")[5];
  var url3 = blkentry.split("%")[6];
  var uname = blkentry.split("%")[7];
  var unric = blkentry.split("%")[8];
  var built = blkentry.split("%")[9];
  var d1=await App.getOTPDeadline(i);
 var otpdate = new Date(d1);
 var finaldate =new Date(await App.getFinalPaymentDeadline(i));     
  console.log(PropAddress);
  var strDet=document.getElementById("datatable").innerHTML;
  var strDet2 =document.getElementById("note").innerHTML;
  var strDet1 =document.getElementById("carouselExampleFade").innerHTML;
  
  document.getElementById("datatable").innerHTML=strDet.replace("yyy",proptypes[PropType]).replace("xxx",PropAddress).replace("zzz","D"+district).replace("uuu",Pin).replace("hhh",price).replace("aaa",accotype[acco-1]).replace("bbb",area).replace("ccc",tenure).replace("qqq",offername).replace("ttt",offerpx).replace("sss",offerphone).replace("mmm",offeremail).replace("fff",unric).replace("rrr",offercomm).replace("ppp",built);
  if (d1==0)
   document.getElementById("note").innerHTML="";
  else
    document.getElementById("note").innerHTML=strDet2.replace("jjj",otpdate).replace("kkk",finaldate);
  document.getElementById("carouselExampleFade").innerHTML =strDet1.replace("ddd",url1).replace("eee",url2).replace("fff",url3);

  if (Number(blkoffer.split("%")[0])==0)
  document.getElementById("row1").innerHTML="";
  if (Number(offername)==0)
  document.getElementById("row2").innerHTML="";
  if (Number(offerphone)==0)
  document.getElementById("row3").innerHTML="";
  if (Number(offeremail)==0)
  document.getElementById("row4").innerHTML="";
  if (offercomm=="")
  document.getElementById("row5").innerHTML="";
  if( WalletAdd!=lawyerAdd)
    document.getElementById("row0").innerHTML="";

  if(!(state==1 && WalletAdd==SellerAdd)){
    document.getElementById("row1").innerHTML="";
    document.getElementById("row2").innerHTML="";
    document.getElementById("row3").innerHTML="";
    document.getElementById("row4").innerHTML="";
    document.getElementById("row5").innerHTML="";
}
}
