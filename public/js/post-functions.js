const postStats = document.querySelectorAll(".post-stats")
const likePostBtns = document.querySelectorAll(".like-post-btn")
const postLikeStats = document.querySelectorAll(".post-likes-stat")
const postCommentStats = document.querySelectorAll(".post-comments-stat")
const favPostBtns = document.querySelectorAll(".favorite-post-btn")
const postFavoriteStats = document.querySelectorAll(".post-favorites-stat")
// const submitCommentBtns = document.querySelectorAll(".blank-comment-submit-btn")

likePostBtns.forEach(btn => {
  btn.addEventListener("click", togglePostLike)
})
favPostBtns.forEach(btn => {
  btn.addEventListener("click", togglePostFavorite)
})
// submitCommentBtns.forEach(btn => {
//   btn.addEventListener("click", addNewComment)
// })

init()

function init() {
  setStatVisibility(postLikeStats)
  setStatVisibility(postCommentStats)
  setStatVisibility(postFavoriteStats)
  postStats.forEach((statBar, idx) => setPostStatsVisibility(idx))
}

function setPostStatsVisibility(postIdx) {
  const statBar = document.getElementById(`post-${postIdx}-stats`)
  const postLikeCount = parseInt(document.getElementById(`post-${postIdx}-like-count`).textContent)
  const postCommentCount = parseInt(document.getElementById(`post-${postIdx}-comment-count`).textContent)
  const postFavoriteCount = parseInt(document.getElementById(`post-${postIdx}-favorite-count`).textContent)
  if (statBar.classList.contains("removed-stat")) {
    if (postLikeCount || postCommentCount || postFavoriteCount) {
      statBar.classList.remove("removed-stat")
    }
  } else {
    if (!(postLikeCount || postCommentCount || postFavoriteCount)) {
      statBar.classList.add("removed-stat")
    }
  }
}

function setStatVisibility(elements) {
  elements.forEach(e => {
    if (parseInt(e.dataset.count)) e.classList.toggle("hidden-stat")
  })
}

function togglePostLike(evt) {
  const elementIdArr = evt.target.id.split('-')
  const postIdx = elementIdArr[2]
  const likeBtn = document.getElementById(`like-post-${postIdx}-btn`)
  likeBtn.classList.toggle("action-highlight")
  const likeCount = document.getElementById(`post-${postIdx}-like-count`)
  let likeCountAmount = parseInt(likeCount.textContent)
  if (likeBtn.classList.contains("action-highlight")) {
    if (!likeCountAmount) {
      document.getElementById(`post-${postIdx}-likes`).classList.toggle("hidden-stat")
    }
    likeCountAmount += 1
  } else {
    likeCountAmount -= 1
    if (!likeCountAmount) {
      document.getElementById(`post-${postIdx}-likes`).classList.toggle("hidden-stat")
    }
  }
  likeCount.textContent = likeCountAmount
  setPostStatsVisibility(postIdx)
}

function togglePostFavorite(evt) {
  const elementIdArr = evt.target.id.split('-')
  const postIdx = elementIdArr[2]
  const favoriteBtn = document.getElementById(`favorite-post-${postIdx}-btn`)
  favoriteBtn.classList.toggle("action-highlight")
  const favoriteCount = document.getElementById(`post-${postIdx}-favorite-count`)
  let favoriteCountAmount = parseInt(favoriteCount.textContent)
  if (favoriteBtn.classList.contains("action-highlight")) {
    if (!favoriteCountAmount) {
      document.getElementById(`post-${postIdx}-favorites`).classList.toggle("hidden-stat")
    }
    favoriteCountAmount += 1
  } else {
    favoriteCountAmount -= 1
    if (!favoriteCountAmount) {
      document.getElementById(`post-${postIdx}-favorites`).classList.toggle("hidden-stat")
    }
  }
  favoriteCount.textContent = favoriteCountAmount
  setPostStatsVisibility(postIdx)
}