const copy = (url) => navigator.clipboard.writeText(url);

const shareRecipe = (setDidCopy) => {
  copy(window.location.href);
  setDidCopy(true);
};

export default shareRecipe;
