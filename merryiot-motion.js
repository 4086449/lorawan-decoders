function getStatus(bytes) {
  let status = {};
  // Status measurement
  const code = bytes[0];
  const motion = bytes[0] & 0x1;
  const button = (bytes[0] >> 1) & 0x1;
  const tamper = (bytes[0] >> 2) & 0x1;
    
  status.code = code;
  status.motion = motion === 1 ? true : false;
  status.button = button === 1 ? true : false;
  status.tamper = tamper === 1 ? true : false;
  
  return status;
}


function Decoder(bytes, port) {

    let params = {
        "bytes": bytes
    };

    // Status
    const status = getStatus(bytes);
    
    // Battery measurements
    let batt = bytes[1] & 0x0f;
    batt = (21 + batt) / 10;

    // Temp measurement
    const temp = bytes[2];
    
    // Humidity measurement
    const hum = bytes[3];
    
    // Time measurement
    const time = (bytes[5] << 8) | bytes[4];

    // Count measurement
    const count = ((bytes[8] << 16) | (bytes[7] << 8)) | bytes[6];

    params.code = status.code;
    params.motion = status.motion;
    params.button = status.button;
    params.tamper = status.tamper;
    params.battery = batt;
    params.temperature = temp;
    params.humidity = hum;
    params.time = time;
    params.count = count;
    params.port = port;
    
    return params;
}
