import * as App from './app.js'
import * as UI from './UI.js'
var parameters = location.search.substring(1);
var FullDetails = JSON.parse(localStorage.getItem('FullProp'));

var temp = parameters.split("=");
var i=Number(temp[1]);
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
ShowItemDetails();
 function ShowItemDetails(){
  let accotype=["Studio","1B1T","2B1T","3B2T","4B3T"];
  let proptypes=['HDB','Condo','Landed'];
  var DistID = ["01","01","01","01","01","02","02","02","04","04","05","05","05","03","03","03","06","07","07","08","08","09","09","10","10","10","10","11","11","11","12","12","12","13","13","13","13","14","14","14","14","15","15","15","15","16","16","16","17","17","18","18","19","19","19","20","20","21","21","22","22","22","22","22","23","23","23","23","24","24","24","25","25","25","27","27","26","26","28","28","17","19"];
 
  var state = FullDetails[i].State;
 
  var PropType =FullDetails[i].PropType;
  var firsttwo =String(FullDetails[i].Pin).slice(0,2);

  var  district = DistID[firsttwo-1];
  var price =numberWithCommas(FullDetails[i].Price);
  var Pin =FullDetails[i].Pin;
  var PropAddress=FullDetails[i].Location;
  var area = numberWithCommas(FullDetails[i].Area);
  var acco = FullDetails[i].Acco;
  var blkentry =FullDetails[i].blockentry;
  var tenure = blkentry.split("%")[3];
  var url1 = blkentry.split("%")[4];
  var url2 = blkentry.split("%")[5];
  var url3 = blkentry.split("%")[6];
  console.log(PropAddress);
  var strDet=document.getElementById("datatable").innerHTML;
  var strDet2 =document.getElementById("mybtn").innerHTML;

  var strDet1 =document.getElementById("carouselExampleFade").innerHTML;
 
  document.getElementById("datatable").innerHTML=strDet.replace("yyy",proptypes[PropType]).replace("xxx",PropAddress).replace("zzz","D"+district).replace("uuu",Pin).replace("hhh",price).replace("aaa",accotype[acco-1]).replace("bbb",area).replace("ccc",tenure);
  document.getElementById("carouselExampleFade").innerHTML =strDet1.replace("ddd",url1).replace("eee",url2).replace("fff",url3);
  document.getElementById("mybtn").innerHTML=strDet2.replace("kkk",i);

}

window.SendMsg = async function(index)
{

var email =document.getElementById("form_email").value;
var offerpx =document.getElementById("form_offer").value;
var mobile=document.getElementById("form_mobile").value;
var name =document.getElementById("form_name").value;
var comm = document.getElementById("form_view").value;
var blkoffer = offerpx+"%"+name+"%"+mobile+"%"+email+"%"+comm;
// alert(blkoffer);
await App.ShowInterest(index,blkoffer,offerpx);
window.location.href = "purchase_property.html";
}