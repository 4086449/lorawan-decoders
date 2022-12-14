function Decoder(bytes){
  var messageTypes = ['keepalive', 'testButtonPressed', 'floodDetected', 'fraudDetected','fraudDetected'];
  var decbin = function(number) {
      return parseInt(number, 10).toString(2);
  };
  var byteArray = bytes.map(function (byte) {
      var number = decbin(byte);
      return Array(9 - number.length).join("0") + number;
  });
  function toBool (value) { return value == '1'}
  function shortPackage(byteArray) {
      return {
         reason: messageTypes[parseInt(byteArray[0].slice(0, 3),2)],
         boxTamper: toBool(byteArray[0][4]),
         flood: toBool(byteArray[0][6]),
         battery: (parseInt(byteArray[1], 2) * 16)/1000,
      };
  }
  function longPackage (byteArray) {
      return {
         reason: messageTypes[parseInt(byteArray[0].slice(0, 3),2)],
         boxTamper: toBool(byteArray[0][4]),
         flood: toBool(byteArray[0][6]),
         battery: (parseInt(byteArray[1], 2) * 16)/1000,
         temp1: parseInt(byteArray[2], 2),
      };
  }
  if(byteArray.length > 2){
      return longPackage(byteArray);
  }else{
      return shortPackage(byteArray);
  }
}