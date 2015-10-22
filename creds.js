module.exports = {
    cookieConfig : {
      secret : '&hammerStrike&'
    },
    sessionConfig:{
      secret:'#750s60$',
      saveUninitialized : true,
      resave : true
    },
    username:'amardeep',
    password:'abc123',
    connConfig:{
    	development:{
    		//connectionString : "mongodb://admin:admin@ds055872.mongolab.com:55872/codersblog",
        connStr : "mongodb://127.0.0.1:27017/nodeBlog"
    	},
    	production : {
    		connStr : "mongodb://admin:admin@ds055872.mongolab.com:55872/codersblog"
    	}
    }
}
