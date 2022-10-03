const copy = (url) => navigator.clipboard.writeText(url);

const shareDoneRecipe = (setSelectedID, id, type) => {
  copy(`${window.origin}/${type.toLowerCase()}s/${id}`);
  setSelectedID(id);
};

export default shareDoneRecipe;
