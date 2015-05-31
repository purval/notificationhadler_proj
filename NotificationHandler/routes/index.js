
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('homepage', { title: 'Express' });
};

exports.messages = function(req, res){
  res.render('messages');
};