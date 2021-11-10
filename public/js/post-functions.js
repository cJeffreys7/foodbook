const likePostBtns = document.querySelectorAll(".like-post-btn")
const favPostBtns = document.querySelectorAll(".favorite-post-btn")

likePostBtns.forEach(btn => {
  btn.addEventListener("click", togglePostLike)
})
favPostBtns.forEach(btn => {
  btn.addEventListener("click", togglePostFavorite)
})

function togglePostLike(evt) {
  console.log(evt.target.id)
  let elementIdArr = evt.target.id.split('-')
  let postIdx = elementIdArr[2]
  document.getElementById(`like-post-${postIdx}-btn`).classList.toggle("action-highlight")
}

function togglePostFavorite(evt) {
  let elementIdArr = evt.target.id.split('-')
  let postIdx = elementIdArr[2]
  console.log('Favorited Post ', evt.target.id)
  document.getElementById(`favorite-post-${postIdx}-btn`).classList.toggle("action-highlight")
}