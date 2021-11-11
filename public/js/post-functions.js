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

// function addNewComment(evt){
//   const elementIdArr = evt.target.id.split('-')
//   const postIdx = elementIdArr[1]
//   const comments = document.querySelectorAll(`.post-${postIdx}-comment`)
//   const commentIdx = comments.length + 1
//   const commentText = document.getElementById(`post-${postIdx}-blank-comment-text`)
//   const postCommentSection = document.getElementById(`post-${postIdx}-comments-section`)
//   const newComment = document.createElement('section')
//   newComment.id = `comment-${commentIdx}`
//   newComment.className = "comment"
//   newComment.innerHTML = `
//   <header class="comment-header" id="comment-${commentIdx}-header" style="display: flex;">
//     <a href="profiles/<%= comment.ownerId %>">
//       <img
//         id="avatar-img"
//         src="<%= comment.avatar %>"
//         alt="<%= comment.name %> avatar"
//       >
//     </a>
//     <div id="comment-info">
//       <div id="comment-owner">
//         <%= comment.name %>
//       </div>
//       <div id="comment-timestamp">
//         <%= now %> 
//       </div>
//     </div>
//   </header>
//   <section id="comment-body">
//     <div id="comment-text-body">
//       <form id="edit-text-form" action="/posts/<%= post._id %>/comments/<%= comment._id %>?_method=PATCH" method="POST">
//         <textarea 
//           id="post-${postIdx}-comment-${commentIdx}-text"
//           class="user-comment-text post-${postIdx}-comment"
//           name="text"
//           rows="1"
//           oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
//           readonly
//         ><%= comment.text %></textarea>
//         <div id="edit-post-${postIdx}-comment-${commentIdx}-text" class="edit-comment-body hidden-btn">
//           <button id="comment-btn" class="edit-btn" type="submit">
//             Submit
//           </button>
//           <button id="cancel-edit-post-${postIdx}-comment-btn-${commentIdx}" class="cancel-edit-comment-btn edit-btn" type="button">
//             Cancel
//           </button>
//         </div>
//       </form>
//       <% if (comment.ownerId === user.profile._id.toString()) { %>
//         <div class="dropdown comment-edit-dropdown">
//           <button id="post-${postIdx}-comment-${commentIdx}-edit-dropdown" class="edit-comment-dropdown" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
//             ...
//           </button>
//           <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
//             <li>
//               <button id="edit-post-${postIdx}-comment-btn-${commentIdx}" class="dropdown-item edit-comment-btn">
//                 <i class="fas fa-pen"></i> Edit Comment
//               </button>
//             </li>
//             <li>
//               <form class="dropdown-item" action="/posts/<%= post._id%>/comments/<%= comment._id %>?_method=DELETE" method="POST">
//                 <button class="edit-comment-btn" type="submit">
//                   <i class="fas fa-trash-alt"></i> Delete Comment
//                 </button>
//               </form>
//             </li>
//           </ul>
//         </div>
//       <% } %>
//     </div>
//     <div id="comment-actions">
//       <form action="/posts/<%= post._id %>/comments/<%= comment._id %>/toggleLike?_method=PATCH" method="POST">
//         <button id="post-${postIdx}-like-comment-${commentIdx}-btn" class="like-btn <%= (comment.likes.includes(user.profile._id)) ? "action-highlight" : "" %>" type="submit">
//           <i class="fas fa-thumbs-up"></i>
//           Like
//         </button>
//       </form>
//     </div>
//   </section>`
// }