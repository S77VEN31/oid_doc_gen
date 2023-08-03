export const classes = (classes: (string | null | boolean)[]): string => {
  return classes.filter(Boolean).join(' ').trim();
};
