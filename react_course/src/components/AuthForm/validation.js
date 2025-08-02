const validEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!emailRegex.test(value)) {
    return "Некорректный e-mail";
  }
  return null;
};

const validLength = (min, max) => {
  return (value) => {
    if (value.length < min || value.length > max) {
      return `Поле должно содержать от ${min} до ${max} символов`;
    }
    return null;
  };
};

const isEmpty = (value) => {
  if (!value.trim()) {
    return "Поле является обязательным для заполнения";
  }
  return null;
};

const isChecked = (value) => {
  if (!value) {
    return "Поле является обязательным для выбора";
  }
  return null;
};

const isContainSpaces = (value) => {
  if (value.includes(" ")) {
    return "Поле не может содержать пробельных символов";
  }
  return null;
};

export const validationConfig = {
  email: [validEmail],
  password: [isEmpty, isContainSpaces, validLength(4, 8)],
  text: [isEmpty],
  date: [isEmpty],
  checkbox: [isChecked],
};
