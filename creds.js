module.exports = {
    cookieSecret : '&hammerStrike&',
    sessionSecret:'#750s60$',
    username:'amardeep',
    password:'abc123',
    mongoConfig:{
    	development:{
    		connectionStringMongoLab : "mongodb://admin:admin@ds055872.mongolab.com:55872/codersblog",
        connectionStringLocal : "mongodb://localhost:27017/nodeBlog"
    	},
    	production : {
    		connectionStringMongoLab : "mongodb://admin:admin@ds055872.mongolab.com:55872/codersblog"
    	}
    }
}
