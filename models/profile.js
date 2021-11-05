import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  favoritePosts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  followedProfiles: [
    {
      type: Schema.Types.ObjectId, ref: 'Profile',
      unique: true
    }
  ]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}