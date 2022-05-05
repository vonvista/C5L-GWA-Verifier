const si = require('systeminformation');

si.networkInterfaces( 
    function(data) {
        console.log(data);
    }
)