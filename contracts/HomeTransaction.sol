pragma solidity >=0.4.25 <0.6.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract HomeTransaction {
    // Constants
    uint constant timeBetweenDepositAndOTPExercise = 14 days;
    uint constant timeBetweenDepositAndFinalization = 8 weeks;
    uint constant depositPercentage = 1;
    uint constant multiplierfact=1000000;
    uint constant OTPPayment = 10;
     IERC20 public token1;
   
    enum ContractState {
        WaitingBuyerInterest,
        WaitingSellerSignature,
        WaitingBuyerSignature,
        WaitingOTPAmount,
        WaitingAgentReview,
        WaitingFinalization,
        Finalized,
        Rejected }
     

    
    // Roles acting on contract
    address  public Agent;
    address  public seller;
    address  public buyer;
    address public InstAddress;
    // Contract details
    string public homeAddress;
    ContractState public contractState;
    string public zip;
    uint public AgentFee;
    uint public price;
    uint public offerprice;
    uint public proptype;
    string public blockentry;
    string public blkoffer;
    uint public acco;
    uint public proparea;
    // Set when buyer signs and pays deposit
    uint public deposit;
    uint public OTPdeposit;
    uint public finalizeDeadline;
    uint public OTPDeadline;
    uint public lastOperationTime;
    // Set when Agent reviews closing conditions
    enum ClosingConditionsReview { Pending, Accepted, Rejected }
    ClosingConditionsReview closingConditionsReview = ClosingConditionsReview.Pending;

    constructor(
        
        string memory _address,
        string memory _zip,
        uint _AgentFee,
        uint _price,
        uint _proptype,
        uint _acco,
        uint _proparea,
        string memory _blockentry,
        address payable _Agent,
        address payable _seller,
        address payable _buyer) public {
        require(_price >= _AgentFee, "Price needs to be more than Agent fee!");
        //https://etherscan.io/address/0x1484a6020a0f08400f6f56715016d2c80e26cdc1 .. for checksum error
         token1 = IERC20(0x1484a6020A0F08400F6f56715016d2C80e26cDC1); //from etherscanner (https://kovan.etherscan.io/token/0x1484a6020a0f08400f6f56715016d2c80e26cdc1?a=0xa15ad3917dd962872f0dc54833563559efa54790)
        Agent = _Agent;
        proptype=_proptype;
        contractState= ContractState.WaitingBuyerInterest;
        acco =_acco;
        proparea =_proparea;
        blockentry=_blockentry;
        seller = _seller;
        buyer = _buyer;
        homeAddress = _address;
        InstAddress=address(this);
        zip = _zip;
        price = _price;
        AgentFee = _AgentFee;
        
    }

       function buyerShowsInterest(address addbuy ,string memory blockkoffer, uint offerpx) public  {
        

        require(contractState == ContractState.WaitingBuyerInterest, "Wrong contract state");

        contractState = ContractState.WaitingSellerSignature;
        buyer=addbuy; //setting buyer address
        blkoffer=blockkoffer;
        offerprice = offerpx;
        lastOperationTime=now;
    }
    function sellerSignContract() public payable {
        require(seller == tx.origin, "Only seller can sign contract");

        require(contractState == ContractState.WaitingSellerSignature, "Wrong contract state");

        contractState = ContractState.WaitingBuyerSignature;
        lastOperationTime=now;
        if(offerprice>0){
            price = offerprice;
        }
    }

    function buyerSignContractAndPayDeposit() public  {
       

        require(contractState == ContractState.WaitingBuyerSignature, "Wrong contract state");
        require(price*depositPercentage/100 <=  token1.balanceOf(tx.origin), "Wallet Balance is lesser than required deposit amount");
        token1.transferFrom(tx.origin,address(this), price*depositPercentage/100);

        contractState = ContractState.WaitingOTPAmount;
        deposit=price*depositPercentage/100;
        OTPdeposit=0;
        finalizeDeadline = now + timeBetweenDepositAndFinalization;
        OTPDeadline =now + timeBetweenDepositAndOTPExercise;
        lastOperationTime=now;
    }

    function buyerPaysOTPAmount() public payable {
      

        require(contractState == ContractState.WaitingOTPAmount, "Wrong contract state");
    
        require( token1.balanceOf(tx.origin)>= price*(OTPPayment-depositPercentage)/100 , "Buyer needs to deposit between 10% and 100% to execute OTP");
        token1.transferFrom(tx.origin,address(this), price*(OTPPayment-depositPercentage)/100);
        contractState = ContractState.WaitingAgentReview;
        OTPdeposit=price*(OTPPayment-depositPercentage)/100;
        
        lastOperationTime=now;
    }

    function AgentReviewedClosingConditions(bool accepted) public {
       

        require(contractState == ContractState.WaitingAgentReview, "Wrong contract state");
        
        if (accepted) {
            closingConditionsReview = ClosingConditionsReview.Accepted;
            contractState = ContractState.WaitingFinalization;
        } else {
            closingConditionsReview = ClosingConditionsReview.Pending;
            contractState = ContractState.WaitingBuyerInterest;
            
            token1.transfer(buyer, OTPdeposit+deposit-AgentFee);
            token1.transfer(Agent, AgentFee);
            finalizeDeadline = 0;
            OTPDeadline =0;
        }
        lastOperationTime=now;
    }

    function buyerFinalizeTransaction() public payable {
       

        require(contractState == ContractState.WaitingFinalization, "Wrong contract state");

        require( token1.balanceOf(tx.origin)>= price*(100-OTPPayment)/100 , "Please top up the Wallet");
        token1.transferFrom(tx.origin,address(this), price*(100-OTPPayment)/100);

        contractState = ContractState.Finalized;
        token1.transfer(seller, price-AgentFee);
        token1.transfer(Agent, AgentFee);
  
        lastOperationTime=now;
        finalizeDeadline = now;
        OTPDeadline =0;
    }
//buyer withdraws before OTP payment or seller cancel on otp default
    function anyWithdrawFromTransaction() public payable{ 
             
       contractState = ContractState.WaitingBuyerInterest;

        token1.transfer(seller, deposit);     
        finalizeDeadline = now;
        OTPDeadline =0;
       
        lastOperationTime=now;
    }
    //post otp buyer cancels
    function SellerWithdrawPostExpiry() public payable{
        require( OTPDeadline < now, "Only seller can withdraw after transaction deadline");

        require(contractState == ContractState.WaitingOTPAmount, "Wrong contract state");

       contractState = ContractState.WaitingBuyerInterest;

         token1.transfer(seller, OTPdeposit+deposit-AgentFee);
        token1.transfer(Agent, AgentFee);
         finalizeDeadline = now;
        OTPDeadline =0;
        lastOperationTime=now;
    }
    //post final deadline seller withdraws due to non payment
    function anyWithdrawPostFinalDeadline() public payable{
        require( finalizeDeadline < now, "Only post Deadline withdraw after transaction deadline");

        require(contractState == ContractState.WaitingFinalization, "Wrong contract state");

       contractState = ContractState.WaitingBuyerInterest;

        token1.transfer(seller, OTPdeposit+deposit-AgentFee);
        token1.transfer(Agent, AgentFee);
         finalizeDeadline = now;
        OTPDeadline =0;
        lastOperationTime=now;
    }
    function SellerRejectBuyer() public payable{
    require(contractState == ContractState.WaitingSellerSignature, "Wrong contract state");
    contractState = ContractState.WaitingBuyerInterest;
     finalizeDeadline = now;
        OTPDeadline =0;
    blkoffer="0%0%0%0%";
    offerprice=0;
     lastOperationTime=now;
    }
}
