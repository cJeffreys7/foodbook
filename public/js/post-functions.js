const postCommentBtns = document.querySelectorAll(".comment-btn")
const editCommentBtns = document.querySelectorAll(".edit-comment-btn")
const cancelEditCommentBtns = document.querySelectorAll(".cancel-edit-comment-btn")
const likeCommentBtns = document.querySelectorAll(".like-btn")

postCommentBtns.forEach(btn => {
  btn.addEventListener("click", showComments)
})
editCommentBtns.forEach(btn => {
  btn.addEventListener("click", editComment)
})
cancelEditCommentBtns.forEach(btn => {
  btn.addEventListener("click", cancelCommentEdit)
})
likeCommentBtns.forEach(btn => {
  btn.addEventListener("click", toggleCommentLike)
})

function showComments(evt) {
  let postIdx = evt.target.id.slice(-1)
  document.getElementById(`post-${postIdx}-comments`).style.display = "contents"
}

function editComment(evt) {
  let commentIdx = evt.target.id.slice(-1)
  toggleEditComment(commentIdx, true)
}

function cancelCommentEdit(evt) {
  let commentIdx = evt.target.id.slice(-1)
  toggleEditComment(commentIdx, false)
}

function toggleEditComment(commentIdx, isEditing) {
  document.getElementById(`edit-comment-btn-${commentIdx}`).style.display = isEditing ? "none" : "flex"
  document.getElementById(`comment-${commentIdx}-text`).style.display = isEditing ? "none" : "contents"
  document.getElementById(`edit-comment-${commentIdx}-text`).style.display = isEditing ? "contents" : "none"
}

function toggleCommentLike(evt) {
  let elementIdArr = evt.target.id.split('-')
  let postIdx = elementIdArr[1]
  let commentIdx = elementIdArr[4]
  document.getElementById(`post-${postIdx}-like-comment-${commentIdx}-btn`).classList.toggle("action-highlight")
}