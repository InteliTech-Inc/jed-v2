export const capitalize = (str: string) => {
  return (
    str?.charAt(0).toUpperCase().replace("_", " ") +
    str?.replace("_", " ").slice(1).toLowerCase()
  );
};
