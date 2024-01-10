const COMMENTS_PER_PORTION = 5;
const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentList =  document.querySelector('.social__comments');
const body = document.querySelector('body');
const commentsLoader = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');


let commentsShown = 0;
let comments = [];


const addComment = function () {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    const newPictureComment = document.createElement('img');
    newPictureComment.classList.add('social__picture');
    newPictureComment.src = "";
    newPictureComment.alt = "";
    newPictureComment.width = "35";
    newPictureComment.height = "35";
    const newTextComment = document.createElement('p');
    newTextComment.classList.add('social__text');
    newTextComment.textContent = "";
    newComment.appendChild(newPictureComment);
    newComment.appendChild(newTextComment);
    return newComment;

  };

const createComment = ({avatar, name, message}) => {
    const comment = addComment();
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;

    return comment;
}




const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
     commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  };

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  };

  commentList.innerHTML = '';
  commentList.appendChild(fragment);
  commentCount.innerHTML = `${commentsShown} из ${comments.length}  комментариев`;


};

const hideBigPicture = () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onCancelButtonClick);
    commentList.innerHTML = '';
    commentsShown = 0;
};

function onDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
        evt.preventDefault();
        hideBigPicture();
    }
};

const onCancelButtonClick = () => {
    hideBigPicture();
};

const renderPictureDetails = ({url, likes, description}) => {
    bigPicture.querySelector('.big-picture__img img').src = url;
    bigPicture.querySelector('.big-picture__img img').alt = description;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    // commentsLoader.classList.add('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
    cancelButton.addEventListener('click', onCancelButtonClick);

    comments = data.comments;
    renderComments();
    commentsLoader.addEventListener('click', renderComments);



    renderPictureDetails(data)

}


export { showBigPicture };