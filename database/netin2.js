const network = require('network');

network.get_interfaces_list(function(err, list) {

  console.log(list)
})