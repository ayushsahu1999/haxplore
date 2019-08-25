pragma solidity ^0.5.0;


contract ambu{
    //uint public no_of_vechile=10;


  struct  info 
 {
     address vechileid;
     uint time;
     address patientad;
     bool sign;
 }
 mapping(address => info) public infos;
 address[] public infoAccts;

 event sent(address v_id,bool sgn);
 function setinfo(address _address,address _vechileid,uint _time,address _patientad,bool _sign)public
 {   info storage infos = infos[_address];
     infos.vechileid=_vechileid;
     infos.time=_time;
     infos.patientad=_patientad;
     infos.sign=_sign;

     infoAccts.push(_address) -1; 
 }
 function chk(address vh_id,bool s_ign, address _vechileid)public
 {
     require(s_ign == true );
     require(vh_id==_vechileid);
     emit sent(vh_id,s_ign);
     
 }
}


/*

pragma solidity ^0.5.0;

contract ambu{
    //uint public no_of_vechile=10;


  struct  info 
 {
     address vechileid;
     uint time;
     address patientad;
     bool sign;
 }
 mapping(address => info) public infos;
 address[] public infoAccts;

 event sent(address v_id,address sgn);
 function setinfo(address _address,address _vechileid,uint _time,address _patientad,bool _sign)
 { var info = infos[_address];
     info.vechileid=_vechileid;
     info.time=_time;
     info.patientid=_patientd;
     info.sign=_sign;

     infoAccts.push(_address) -1; 
 }
 function chk(uint vh_id,bool s_ign)
 {
     require(s_ign == true );
     require(vh_id==info.vechileid);
     emit sent(vh_id,s_ign);
     
 }
}

    {
      require(msg.sender == _owner);
      _;
   }  
   function addTodo(bytes32 _content) public
    {
      Todo memory myNote = Todo(lastIds[msg.sender], _content, msg.sender, false, now);
      todos[msg.sender][lastIds[msg.sender]] = myNote;
      if(lastIds[msg.sender] >= maxAmountOfTodos) lastIds[msg.sender] = 0;
      else lastIds[msg.sender]++;
   }  
   function markTodoAsCompleted(uint256 _todoId) public onlyOwner(todos[msg.sender][_todoId].owner)
    {
      require(_todoId < maxAmountOfTodos);
      require(!todos[msg.sender][_todoId].isCompleted);
      todos[msg.sender][_todoId].isCompleted = true;
   }
}
 
 { 


 }*/