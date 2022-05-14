//SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Allowance {
    
    event allowanceChanged(address _forWho, address _fromWho, uint _oldAmount, uint _newAmount);
    event addressValidated(address _byWho, address _forWHo);
    event validationIncreased(address _byWho, address _forWHo);
    mapping(address => bool) public validateMapping;
    mapping(address => uint) public allowance;
    mapping(address => uint8) public  validations;
    mapping(address => mapping(address => bool)) validated;
    uint8 validLength = 1;

    constructor() {
        validateMapping[msg.sender] = true;
    }

    function convertWeiToEther(uint _amountWei) public pure returns(uint) {
        return _amountWei / 1 ether;
    }

    modifier isAllowed {
        require(validateMapping[msg.sender] == true, "You are not allowed to access such feature");
        _;
    }

    function validateAddress(address _address) public isAllowed {
        require(validated[msg.sender][_address] == false, "You already added a validation to this address");
        if(validLength == 1){
        validateMapping[_address] = true;
        }else{
            validated[msg.sender][_address] == true;
            validations[_address]++;
            emit validationIncreased(msg.sender, _address);
            if(validations[_address] == validLength){
                validateMapping[_address] = true;
                emit addressValidated(msg.sender, _address);
            }
        }
    }

    function unvalidateAddress(address _address) public isAllowed {
        validateMapping[_address] = false;
    }

    function addAllowance(address _who, uint _amount) public isAllowed {
        require(msg.sender != _who, "You cant give allowance to yourself");
        allowance[_who] = convertWeiToEther(_amount);
        emit allowanceChanged(_who, msg.sender, allowance[_who], allowance[_who] + _amount);
    }

    function removeAllowance(address _who, uint _amount) public isAllowed {
        require(msg.sender != _who, "You cant remove allowance to yourself");
        emit allowanceChanged(_who, msg.sender, allowance[_who], allowance[_who] - _amount);
        allowance[_who] -= convertWeiToEther(_amount);
    }

    function addressStatus(address _address) public view returns(bool) {
            return validateMapping[_address];
    }

    function addressRemainingValidation(address _address) public view returns(uint8){
        return validLength - validations[_address];
    }

    function addressAllowance(address _address) public view returns(uint){
        return allowance[_address];
    }

}

contract Multisigned is Allowance, Ownable {

    event moneySent(address _forWho, uint _amount);
    event moneyReceived(address _from, uint _amount);

    struct Payment {
        uint amount;
        uint timestamp;
    }

    struct Balance{
        uint totalBalance;
        uint numPayments;
        mapping (uint => Payment) payments;
    }

    mapping(address => Balance) public balanceReceived;

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function withdrawMoney(address payable _to, uint _amount) public isAllowed {
        require(balanceReceived[msg.sender].totalBalance >= _amount, "not enough funds to withdraw");
        require(allowance[_to] >= _amount, "The amount is higher then the address allowance");
        assert(balanceReceived[msg.sender].totalBalance >= balanceReceived[msg.sender].totalBalance - _amount);
        balanceReceived[msg.sender].totalBalance -= _amount;
        _to.transfer(_amount);
    }

   /* 
   function receiveMoney() public payable{
       balanceReceived[msg.sender].totalBalance += msg.value;
       Payment memory payment = Payment(msg.value, now);
       balanceReceived[msg.sender].payments[balanceReceived[msg.sender].numPayments] = payment;
       balanceReceived[msg.sender].numPayments++;
   }
   */

    receive() external payable {
        emit moneyReceived(msg.sender, msg.value);
    }
}