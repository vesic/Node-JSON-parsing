var _ = require('underscore');
var fs = require('fs');

var obj;

// Read file in
fs.readFile('./etcd.json', 'utf8', function(err, data) {
  if (err) throw err;
  // Convert to object
  obj = JSON.parse(data);
  // Filter out only failed;
  var filterFailed = obj.filter(function(item) { return item.result === 'failed' });
  // Extracting a list of usernames
  var usernames = _.pluck(_.pluck(filterFailed, 'last_commit'), 'author_name');
  // Group users by name
  var usersGrouped = _.countBy(usernames, _.identity);
  
  // Final version
  // (_.size(usersGrouped) <= 5)
  // ? _.each(usersGrouped, function(k, v) { console.log(k, v); })
  // : _.each(_.object(_.first( _.pairs(usersGrouped), 5)), function(k, v) { console.log(k, v); })
    
  // Less verbose
  // If there is less than 5 results
  if (_.size(usersGrouped) <= 5) {
    _.each(usersGrouped, function(k, v) { 
      console.log(k, v); // report
    })
  } else {
    // If there is more
    // convert to array so we can slice
    var users = _.pairs(usersGrouped);
    // take 5
    users = _.first(users, 5);
    // back to collection so we can iterate through
    users = _.object(users);
    // Finally generate report
    _.each(users, function(k, v) { 
      console.log(k, v); 
    })
  }
});