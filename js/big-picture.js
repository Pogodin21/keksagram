const COMMENTS_PER_PORTION = 5;
const bigPicture = document.querySelector('.big-picture');
const commentCount = document.querySelector('.social__comment-count');
const commentList =  document.querySelector('.social__comments');
const body = document.querySelector('body');
const commentsLoader = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');

let commentsShown = 0;
let comments = [];

const createElement = (tag, className, attributes = {}) => {
    const element = document.createElement(tag);
    element.classList.add(className);
    Object.assign(element, attributes);
    return element;
};

const addComment = function () {
  const newComment = createElement('li', 'social__comment');
  const newPictureComment = createElement('img', 'social__picture', {
      src: "",
      alt: "",
      width: 35,
      height: 35
  });
  const newTextComment = createElement('p', 'social__text', { textContent: "" });

  newComment.append(newPictureComment, newTextComment);
  return newComment;
};

const createComment = ({avatar, name, message}) => {
    const comment = addComment();
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;
    return comment;
};

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
   
    commentList.innerHTML = '';
    commentsShown = 0;

    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onCancelButtonClick);
};

function onDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
        evt.preventDefault();
        hideBigPicture();
    };
};

const onCancelButtonClick = () => {
    hideBigPicture();
};

const renderPictureDetails = ({url, likes, description}) => {
    const img = bigPicture.querySelector('.big-picture__img img');
    const likesCount = bigPicture.querySelector('.likes-count');
    const caption = bigPicture.querySelector('.social__caption');

    img.src = url;
    img.alt = description;
    likesCount.testContent = likes;
    caption.testContent = description;
};

const showBigPicture = (data) => {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    renderPictureDetails(data);

    comments = data.comments;
    renderComments();
  
    document.addEventListener('keydown', onDocumentKeydown);
    cancelButton.addEventListener('click', onCancelButtonClick);
    commentsLoader.addEventListener('click', renderComments);
};


export { showBigPicture };
