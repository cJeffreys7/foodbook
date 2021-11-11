const postCommentBtns = document.querySelectorAll(".comment-btn")
const editCommentDropdowns = document.querySelectorAll(".edit-comment-dropdown")
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

function initialTextAreaResize(postIdx){
  const commentTextAreas = document.getElementsByClassName(`post-${postIdx}-comment`)
  for (let i = 0; i < commentTextAreas.length; i++) {
    commentTextAreas[i].style.height = commentTextAreas[i].scrollHeight.toString() + 'px'
  }
}

function showComments(evt) {
  console.log('Show comments')
  let postIdx = evt.target.id.slice(-1)
  document.getElementById(`post-${postIdx}-comments-section`).style.display = "contents"
  initialTextAreaResize(postIdx)
}

function editComment(evt) {
  const elementIdArr = evt.target.id.split('-')
  let postIdx = elementIdArr[2]
  let commentIdx = elementIdArr[5]
  toggleEditComment(postIdx, commentIdx, false)
  document.getElementById(`post-${postIdx}-comment-${commentIdx}-text`).focus()
}

function cancelCommentEdit(evt) {
  const elementIdArr = evt.target.id.split('-')
  let postIdx = elementIdArr[3]
  let commentIdx = elementIdArr[6]
  toggleEditComment(postIdx, commentIdx, true)
}

function toggleEditComment(postIdx, commentIdx, isReadOnly) {
  editCommentDropdowns.forEach(btn => {
    btn.classList.toggle("hidden-btn")
  })
  document.getElementById(`post-${postIdx}-comment-${commentIdx}-text`).readOnly = isReadOnly;
  document.getElementById(`edit-post-${postIdx}-comment-${commentIdx}-text`).classList.toggle("hidden-btn")
}

function toggleCommentLike(evt) {
  let elementIdArr = evt.target.id.split('-')
  let postIdx = elementIdArr[1]
  let commentIdx = elementIdArr[4]
  document.getElementById(`post-${postIdx}-like-comment-${commentIdx}-btn`).classList.toggle("action-highlight")
}