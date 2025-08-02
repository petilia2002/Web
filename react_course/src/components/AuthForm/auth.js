export const fields = [
  {
    name: "email",
    label: "Почта",
    type: "email",
    placeholder: "Введите ваш email..",
  },
  {
    name: "password",
    label: "Пароль",
    type: "password",
    placeholder: "Введите ваш пароль..",
  },
  {
    name: "remember",
    label: "Запомнить меня",
    type: "checkbox",
    placeholder: false,
  },
];

export const getInitialLoginData = () => {
  return fields.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});
};
