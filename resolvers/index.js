const userResolver = require("./user");
const serviceResolver = require("./services");
const taskResolver = require("./tasks");
const ratingResolver = require("./rating");
const businessResolver = require("./business")

module.exports = [userResolver, serviceResolver, taskResolver, ratingResolver, businessResolver];
