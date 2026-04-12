export const truncateText = (text, length = 100) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};
 
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
 
export const toTitleCase = (string) => {
  return string.split(' ').map(word => capitalizeFirstLetter(word.toLowerCase())).join(' ');
};
 
export const slugify = (string) => {
  return string.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
};
 
export const getInitials = (name) => {
  return name.split(' ').map(word => word[0]).join('').toUpperCase();
};
 
export const getColorFromString = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = (hash & 0xFFFFFF).toString(16).padStart(6, '0');
  return `#${color}`;
};
 