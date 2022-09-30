const copy = (url) => navigator.clipboard.writeText(url);

const path = window.location.href;
const pathArray = path.split('/in-progress');

const shareRecipe = (setDidCopy) => {
  copy(pathArray[0]);
  setDidCopy(true);
};

export default shareRecipe;
