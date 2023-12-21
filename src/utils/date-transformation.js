export const dateСonversion = (date) => {
  const transformDate = new Date(date);

  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: false, era: undefined};
  return new Intl.DateTimeFormat("ru-RU", options).format(transformDate).replace(/г\./g, '').trim();
};