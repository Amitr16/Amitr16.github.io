
var obj =0;
var contract =0;
var response = await fetch('../../artifacts/contracts/Factory.sol/Factory.json');
obj =  await response.json();
const USDTAbi = [
  "function approve(address, uint256) returns (bool)",
  "function balanceOf(address) view returns (uint)",
];
// const maticUrl = process.env.MATIC_API_KEY

var contract =0;
var account = 0;
var Token1=0;
async function main() {
  // 0xF6258304D8D4e798b9AeB47BE63Fc57687F2B7B4
  const contractName = "0xf510aec70650E6E14FA0fE0688DE3bA723Bb68D4"   //property contract
  const TokenName = "0x1484a6020A0F08400F6f56715016d2C80e26cDC1" // USDT contract on Metamask, same as contract
  try{
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
   
    // window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));

    const signer = await provider.getSigner();
    console.log(provider);
    account = await provider.listAccounts();
    contract =await new ethers.Contract(contractName, obj.abi, signer);
    Token1=  await new ethers.Contract(TokenName, USDTAbi, signer);
    console.log(account);
    //await contract.getInstanceAddress(0);
  }
  catch (e){
  try{
  console.log("no account found");
  const NODE_URL ="https://kovan.infura.io/v3/ba3cc1b5324f42bcb11e706181652458";
  // const NODE_URL = "https://rpc-mumbai.maticvigil.com";     for matic
  const provider = new ethers.providers.JsonRpcProvider(NODE_URL);
  contract = new ethers.Contract(contractName, obj.abi, provider);
  Token1 = new ethers.Contract(TokenName, USDTAbi, provider);
  await contract.getInstanceAddress(0);
  }catch(e){console.log("nothing works")}
}
  
  // await contract.getInstanceAddress(0);
  // const accounts = await ethers.provider.listAccounts();
  

  // 0xf59c9F90d5399d43f969f1c8c2Ad85429541383b
  
  
  
  
  // contract.create('location','122',10,100,1,2,1234,'12','0xF88f502Ea97C7A502CC4412eA3867F45Ef74fA43');
  try{
  let filter = {
    address: contractName,
    topics: [
        // the name of the event, parnetheses containing the data type of each event, no spaces
        ethers.utils.id("ShowIterest(address,uint256,uint256)")
    ]
}

// console.log((await contract.getInstanceAddress(0)));

contract.on(filter, (add,id,status) => {
   console.log("contract has change"+id);
   var tempstor=JSON.parse(localStorage.getItem('FullProp'));
   tempstor[id].State=status.toNumber();
   localStorage.setItem('FullProp', JSON.stringify(tempstor));
})
  }
  catch(e){console.log("no event listner")}
}

await main();

try{
document.getElementById("addPropfromreview").addEventListener('click', addProperty);
}
catch (e){console.log("no form object")};
await showPreview();
async function showPreview(){
 try{
    var multihash =localStorage.theImage;
    var multihash1 =localStorage.theImage1;
    var multihash2=localStorage.theImage2;
//  console.log(multihash2);
   document.getElementById("myfile1").src = multihash;
   document.getElementById("myfile2").src = multihash1;
   document.getElementById("myfile3").src = multihash2;
   document.getElementById("myfile1").src = window.URL.createObjectURL(multihash);
   document.getElementById("myfile3").src = URL.createObjectURL(multihash[2]);
}
catch(e){};
 

}
async function addProperty(){

  var location= document.getElementById("propaddr").innerHTML;
  console.log(location);
    var pin= document.getElementById("postal").innerHTML;
    // var Fee1= $('#Fee1').val();
 
    var Fee2= Number(document.getElementById("price").innerHTML);
    var strtemp =document.getElementById("lawyer").name.split(" ");
    
    var add1= strtemp[0];
 
    var Fee1= Number(strtemp[1]);
    var proptype=Number(document.getElementById("proptype").value);
    
    var acco=Number(document.getElementById("bedroom").value);
    
    var email=(document.getElementById("email").innerHTML);
    var contact =(document.getElementById("contact").innerHTML);
    var city=(document.getElementById("city").innerHTML);
    var tenure=(document.getElementById("tenure").innerHTML);
    var multihash =JSON.parse(localStorage.getItem('IPFSProp'));

    var Name=(document.getElementById("sellername").innerHTML);
    var NRIC=(document.getElementById("nricfin").innerHTML);

    var blockentry = email +"%"+contact +"%"+city +"%"+tenure+"%"+multihash[0]+"%"+multihash[1]+"%"+multihash[2] +"%"+Name +"%"+NRIC;
   
   
    // var distr= document.getElementById("distr").value;
   

    var proparea=document.getElementById("size").innerHTML;
    
    console.log(blockentry.split("%")[4])   ;
    
    
    await contract.create(location,pin,Fee1,Fee2,proptype,acco,proparea,blockentry,add1);
    // Villa vid havet 10,1230,10,4222,0,2,222,12,0xF88f502Ea97C7A502CC4412eA3867F45Ef74fA43
    // contract.create('Villa vid havet 10','1230',10,4222,0,2,222,'12','0xF88f502Ea97C7A502CC4412eA3867F45Ef74fA43');
    // contract.create('location','122',10,100,1,2,1234,'12','0xF88f502Ea97C7A502CC4412eA3867F45Ef74fA43');
    // alert(err);
    document.querySelector("form").onsubmit = function (event) {
           return true;
  };
  document.querySelector("form").submit();
};

export const GetWalletAccount = async () => {
  return account ;
};   

export const GetPropCount = async () => {
  const result = (await contract.getInstanceCount()).toNumber()
    return result ;  
};

export const getPropPrice = async (Index) => {
  const result = (await contract.getInstancePrice(Index)).toNumber()
    return result ;  
};

export const getPropAddress= async (Index) => {
  const result = await contract.getInstanceAddress(Index)
    return result ;  
};

export const getPropZIP = async (Index) => {
  const result = await contract.getInstanceZIP(Index)
    return result ;  
};
 
export const getPropCity= async (Index) => {
  const result = (await contract.getInstanceCity(Index)).toNumber()
    return result ;  
};

export const getLastOpsTime= async (Index) => {
  const result = await contract.getLastOpsTime(Index)
    return result ;  
};

const getPropAgentFee=async (Index) => {
  const result = (await contract.getInstanceAgentFee(Index)).toNumber()
    return result ;  
};

export const getInstanceProptype =async (Index) => {
  const result = (await contract.getInstanceProptype(Index)).toNumber()
    return result ;  
};

export const getInstanceBlockEntry=async (Index) => {
  const result = await contract.getInstanceBlockentry(Index)
    return result ;  
};
export const getInstanceBlockoffer=async (Index) => {
  const result = await contract.getInstanceBlockoffer(Index)
    return result ;  
};

export const getPropSellerAddress =async(Index) => {
  const result = await contract.getInstanceSellerAddress(Index)
    return result ;  
};

export const getPropBuyerAddress=async(Index) => {
  const result = await contract.getInstanceBuyerAddress(Index)
    return result ;  
};

export const getPropAgentAddress=async(Index) => {
  const result = await contract.getInstanceAgentAddress(Index)
    return result ;  
};

export const getPropFromState=async(state) => {
  const result = await contract.getPropFromState(state)
    return result ;  
};


export const getInstanceAcco=async(index) => {
  const result = (await contract.getInstanceAcco(index)).toNumber()
    return result ;  
};
export const getInstancePropArea=async(index) => {
  const result = (await contract.getInstancePropArea(index)).toNumber()
    return result ;  
};


export const getPropState=async(Index) => {
  const result = (await contract.getInstanceState(Index)).toNumber()
    return result ;  
};
export const ShowInterest=async(index,blkoffer,offerpx) => {
   await contract.buyerShowsInterest(index,blkoffer,offerpx);
  
};

// console.log((await contract.getContractAllowance(1)).toNumber());
// console.log((await contract.getContractBalance(1)).toNumber());
// console.log((await getPropPrice(1)));





export const sellerSignContract=async(index) => {
  await contract.sellerSignContract(index);
 
};
export const buyerSignContractAndPayDeposit=async(index) => {
try{
  const contradd= await contract.getContractAddress(index);
  console.log(Token1);
  const price=await getPropPrice(index);
  await Token1.approve(contradd,price );
  await contract.buyerSignContractAndPayDeposit(index);}
catch(e){console.log(e)}
 
};
export const buyerPaysOTPAmount=async(index) => {
  try{
    await contract.buyerPaysOTPAmount(index);}
  catch(e){alert(e.data.message)}
   
  };
export const AgentReviewedClosingConditions=async(index,flag) => {
  try{
    await contract.AgentReviewedClosingConditions(index,flag);}
  catch(e){console.log(e)}
   
  };
export const buyerFinalizeTransaction=async(index) => {
  try{
    // console.log(typeof(await getPropAgentFee(index)));
    console.log((await contract.getContractAllowance(index)).toNumber());
    console.log((await contract.getContractBalance(index)).toNumber());
    console.log((await getPropPrice(index)));
    const contradd= await contract.getContractAddress(index);
  console.log(Token1);
  // await Token1.approve(contradd, 10*(await getPropPrice(index)));  
    await contract.buyerFinalizeTransaction(index);}
  catch(e){console.log(e)}
   
  };
export const anyWithdrawFromTransaction=async(index) => {
  try{
    await contract.anyWithdrawFromTransaction(index);}
  catch(e){alert(e.data.message)}
   
  };

export const SellerWithdrawPostExpiry=async(index) => {
  try{
    await contract.SellerWithdrawPostExpiry(index);}
  catch(e){alert(e.data.message)}
    
  };

export const anyWithdrawPostFinalDeadline=async(index) => {
  try{
    await contract.anyWithdrawPostFinalDeadline(index);}
  catch(e){alert(e.data.message)}
    
  };
  export const SellerRejectBuyer=async(index) => {
    try{
      await contract.SellerRejectBuyer(index);}
    catch(e){alert(e.data.message)}
      
    };
    

export const getOTPDeadline =async(Index) => {
  const result = (await contract.getOTPDeadline(Index)).toNumber()*1000
    return result ;  
};

export const getFinalPaymentDeadline =async(Index) => {
  const result = (await contract.getFinalPaymentDeadline(Index)).toNumber()*1000
    return result ;  
};

