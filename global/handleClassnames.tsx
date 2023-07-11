export const classes = (classes: (string | boolean)[]): string => {
  return classes.filter(Boolean).join(' ').trim();
};
