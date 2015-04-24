//var houstonAdmin = Houston._admins.findOne();
//console.log(houstonAdmin);
//Houston._admins.remove(houstonAdmin);

Accounts.onCreateUser(function(options, user) {
    user.software = [];
  if(options.profile)
    user.profile = options.profile;
  return user;
});

Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: false
});
