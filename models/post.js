import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema ({
  text: String,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
  likes: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  images: [String]
})

const postSchema = new Schema ({
  name: String,
  comments: [commentSchema],
  likes: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  favorites: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
  images: [String]
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}