import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema ({
  name: String,
  avatar: String,
  ownerId: String,
  text: String,
  likes: [{
    type: Schema.Types.ObjectId, ref: 'Profile'
  }],
  images: [String]
}, {
  timestamps: true
})

const postSchema = new Schema ({
  text: String,
  comments: [commentSchema],
  likes: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  favorites: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
  images: [String]
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}