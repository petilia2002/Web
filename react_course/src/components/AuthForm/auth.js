import {
  isEmpty,
  isChecked,
  validLength,
  validEmail,
  isContainSpaces,
} from "../../utils/validation";

export const fields = [
  {
    name: "email",
    label: "Почта",
    type: "email",
    placeholder: "Введите ваш email..",
    autocomplete: "email",
  },
  {
    name: "password",
    label: "Пароль",
    type: "password",
    placeholder: "Введите ваш пароль..",
    autocomplete: "current-password",
  },
  {
    name: "remember",
    label: "Запомнить меня",
    type: "checkbox",
    placeholder: false,
    autocomplete: "remember",
  },
];

export const getInitialLoginData = () => {
  return fields.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});
};

export const fieldValidators = {
  email: [validEmail],
  password: [isEmpty, isContainSpaces, validLength(4, 8)],
  text: [isEmpty],
  date: [isEmpty],
  checkbox: [isChecked],
};
