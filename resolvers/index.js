const userResolver = require("./user");
const serviceResolver = require("./services");
const taskResolver = require("./tasks");

module.exports = [userResolver, serviceResolver, taskResolver];
