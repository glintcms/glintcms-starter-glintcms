
exports.rules = [
  [['GET', 'POST'], '/*/glint/role/*', 'admin:*'],
];

exports.userProperty = 'user';

exports.roleProperty = 'userRole';

exports.roleStringProperty = 'userRoleString';

exports.permissionProperty = 'userPermission';

