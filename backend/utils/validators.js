function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

module.exports = { validateEmail, validatePassword };