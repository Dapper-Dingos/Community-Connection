/**
 * Main application routes
 */

'use strict';


module.exports = function(app) {

  // Insert routes below
  app.use('/api/users', require('./api/user'));
  app.use('/api/jobs', require('./api/job'))
  app.use('/api/messages', require('./api/message'))
  //app.use('/server/assets/profile-pictures', require('./assets/profile'))

  app.use('/auth', require('./auth'));
  
  // All other routes should redirect to the index.html

  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
