export default function extractErrors(details) {
  const keys = Object.keys(typeof details === 'object' ? details : {});

  let errors = [];

  keys.forEach((key) => {
    errors = errors.concat(details[key]);
  });

  return errors;
}
