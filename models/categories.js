var mongoose  = require('mongoose'),
		categoriesSchema = mongoose.Schema({
      title       :  { type: String, default: '' }
		}),
		Categories = mongoose.model('Categories',categoriesSchema);
module.exports = Categories;
