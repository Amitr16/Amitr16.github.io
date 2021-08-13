pragma solidity >=0.4.25 <0.6.0;

import "./HomeTransaction.sol";
//Declare an Event


contract Factory {
  HomeTransaction[] contracts;
  constructor(string memory _greeting) public{
    
  }
        
  function create(
        string memory _address,
        string memory _zip,
        uint _realtorFee,
        uint _price,
        uint _proptype,
        uint _acco,
        uint _proparea,
        string memory _blockentry,   //email phone city tenor
        address payable _Agent) public returns(HomeTransaction homeTransaction)  {
    homeTransaction = new HomeTransaction(
      _address,
      _zip,
      _realtorFee,
      _price,
      _proptype,
      _acco,
      _proparea,
      _blockentry,
      _Agent,
     msg.sender,
      msg.sender);
    contracts.push(homeTransaction);

    
  }
event ShowIterest(address indexed _from,  uint _index, uint _value);

  function getInstance(uint index) public view returns (HomeTransaction instance) {
    require(index < contracts.length, "index out of range");

    instance = contracts[index];
  }
  function getLastOpsTime(uint index) public view returns (uint ) {
    require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return uint(instance.lastOperationTime());
  }
  function getInstances() public view returns (HomeTransaction[] memory instances) {
    instances = contracts;
  }

  function getInstanceCount() public view returns (uint count) {
    count = contracts.length;
  }
  function getInstancePrice(uint index) public view returns (uint) {
  require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return instance.price();
  }
   function getInstanceProptype(uint index) public view returns (uint) {
  require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return instance.proptype();
  }
     function getInstanceAcco(uint index) public view returns (uint) {
  require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return instance.acco();
  }
    function getInstancePropArea(uint index) public view returns (uint) {
  require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return instance.proparea();
  }
   function getInstanceBlockentry(uint index) public view returns (string memory) {
  require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return instance.blockentry();
  }

  function getInstanceBlockoffer(uint index) public view returns (string memory) {
  require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return instance.blkoffer();
  }
 function getInstanceAddress(uint index) public view returns (string memory) {
    require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return instance.homeAddress();
  }
  function getInstanceZIP(uint index) public view returns (string memory) {
    require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return instance.zip();
  }

  function getInstanceAgentFee(uint index) public view returns (uint) {
    require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return instance.AgentFee();
  }
  function getInstanceSellerAddress(uint index) public view returns (address ) {
    require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return instance.seller();
  }
  function getInstanceBuyerAddress(uint index) public view returns (address ) {
    require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return instance.buyer();
  }
  function getInstanceAgentAddress(uint index) public view returns (address ) {
    require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return instance.Agent();
  }
    
  
  function getInstanceState(uint index) public view returns (uint ) {
    require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return uint(instance.contractState());
  }
  
  function getPropFromState(uint state) public view returns (uint[] memory ) {
    uint n =contracts.length;
    uint[] memory ArrID =new uint[](n);
    for(uint i=0; i < n;i++){
        if(getInstanceState(i)==state){
            ArrID[i]=i+1;}
    }
    return ArrID;
    
  }
  
   function getPropFromPropType(uint proptype) public view returns (uint[] memory ) {
    uint n =contracts.length;
    uint[] memory ArrID =new uint[](n);
    for(uint i=0; i < n;i++){
        if(getInstanceState(i)==proptype){
            ArrID[i]=i+1;}
    }
    return ArrID;
    
  }
  

  
  function getPropFromInvState(uint state) public view returns (uint[] memory ) {
  uint n =contracts.length;
    uint[] memory ArrID =new uint[](n);
    for(uint i=0; i < n;i++){
        if(getInstanceState(i)!=state){
            ArrID[i]=i+1;}
    }
    return ArrID;
  }


  function getPropFromBuyer(address indexadd) public view returns (uint[] memory ) {
  uint n =contracts.length;
    uint[] memory ArrID =new uint[](n);
    for(uint i=0; i < n;i++){
        if(getInstanceBuyerAddress(i)==indexadd){
            ArrID[i]=i+1;}
    }
    return ArrID;
  }
  
  
  function getPropFromSeller(address indexadd) public view returns (uint[] memory ) {
  uint n =contracts.length;
    uint[] memory ArrID =new uint[](n);
    for(uint i=0; i < n;i++){
        if(getInstanceSellerAddress(i)==indexadd){
            ArrID[i]=i+1;}
    }
    return ArrID;
  }
  
  function getPropFromLawyer(address indexadd) public view returns (uint[] memory ) {
  uint n =contracts.length;
    uint[] memory ArrID =new uint[](n);
    for(uint i=0; i < n;i++){
        if(getInstanceAgentAddress(i)!=indexadd){
            ArrID[i]=i+1;}
    }
    return ArrID;
  }

  
  function buyerShowsInterest(uint index, string memory blkoffer , uint offerpx,address Lawyer) public payable
{
    require(index < contracts.length, "index out of range");
    HomeTransaction instance = contracts[index];
   instance.buyerShowsInterest(msg.sender,blkoffer,offerpx,Lawyer );
   emit ShowIterest(msg.sender,index,1);
}
function sellerSignContract(uint index) public payable
{
    require(index < contracts.length, "index out of range");
    HomeTransaction instance = contracts[index];
   instance.sellerSignContract();
   emit ShowIterest(msg.sender,index,2);
}
function buyerSignContractAndPayDeposit(uint index) public payable
{
    require(index < contracts.length, "index out of range");
    HomeTransaction instance = contracts[index];
   instance.buyerSignContractAndPayDeposit();
   emit ShowIterest(msg.sender,index,3);
}
function buyerPaysOTPAmount(uint index) public payable
{
    require(index < contracts.length, "index out of range");
    HomeTransaction instance = contracts[index];
   instance.buyerPaysOTPAmount();
   emit ShowIterest(msg.sender,index,4);
}
function AgentReviewedClosingConditions(uint index,bool accept) public payable
{
    require(index < contracts.length, "index out of range");
    HomeTransaction instance = contracts[index];
   instance.AgentReviewedClosingConditions(accept);
   emit ShowIterest(msg.sender,index,5);
}
function buyerFinalizeTransaction(uint index) public payable
{
    require(index < contracts.length, "index out of range");
    HomeTransaction instance = contracts[index];
   instance.buyerFinalizeTransaction();
   emit ShowIterest(msg.sender,index,6);
}
function anyWithdrawFromTransaction(uint index) public payable
{
    require(index < contracts.length, "index out of range");
    HomeTransaction instance = contracts[index];
   instance.anyWithdrawFromTransaction();
   emit ShowIterest(msg.sender,index,0);
}
  function SellerWithdrawPostExpiry(uint index) public payable
{
    require(index < contracts.length, "index out of range");
    HomeTransaction instance = contracts[index];
   instance.SellerWithdrawPostExpiry();
   emit ShowIterest(msg.sender,index,0);
}
  function anyWithdrawPostFinalDeadline(uint index) public payable
{
    require(index < contracts.length, "index out of range");
    HomeTransaction instance = contracts[index];
   instance.anyWithdrawPostFinalDeadline();
   emit ShowIterest(msg.sender,index,0);
}
  
  function SellerRejectBuyer(uint index) public payable
{
    require(index < contracts.length, "index out of range");
    HomeTransaction instance = contracts[index];
   instance.SellerRejectBuyer();
   emit ShowIterest(msg.sender,index,0);
}


  function getwalletbalance(uint index) public view returns (uint )
{
    HomeTransaction instance = contracts[index];
   return instance.token1().balanceOf(tx.origin); 
     
}

  function getContractAddress(uint index) public view returns (address )
{
    HomeTransaction instance = contracts[index];
   return instance.InstAddress(); 
     
}
  function getContractAllowance(uint index) public view returns (uint )
{
    HomeTransaction instance = contracts[index];
   return instance.token1().allowance(tx.origin,getContractAddress(index));
     
}

  function getContractBalance(uint index) public view returns (uint )
{
    HomeTransaction instance = contracts[index];
   return instance.token1().balanceOf(getContractAddress(index));
     
}

function getOTPDeadline(uint index) public view returns (uint) {
    require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return instance.OTPDeadline();
  }
function getFinalPaymentDeadline(uint index) public view returns (uint) {
    require(index < contracts.length, "index out of range");

    HomeTransaction instance = contracts[index];
    return instance.finalizeDeadline();
  }
}