var mongoose  = require('mongoose'),

		postsSchema = mongoose.Schema({
      id          :  { type: Number , unique:true },
      title       :  { type: String, default: '' },
      author      :  { type: String, default: '' },
      shortle     :  { type: String, default: '' },
      description :  { type: String, default: '' },
			category    :  { type: String, default: '' },
      date        :  { type: Date }
		}),

		Posts = mongoose.model('Posts',postsSchema);
module.exports = Posts;
