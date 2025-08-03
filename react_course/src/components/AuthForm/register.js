import {
  isEmpty,
  isChecked,
  validLength,
  validEmail,
  isContainSpaces,
  isMatchPasswords,
} from "../../utils/validation";

export const fields = {
  patient: [
    {
      name: "lastName",
      label: "Фамилия",
      type: "text",
      placeholder: "Фамилия",
      autocomplete: "family-name",
    },
    {
      name: "firstName",
      label: "Имя",
      type: "text",
      placeholder: "Имя",
      autocomplete: "given-name",
    },
    {
      name: "middleName",
      label: "Отчество",
      type: "text",
      placeholder: "Отчество",
      autocomplete: "additional-name",
    },
    {
      name: "birthDate",
      label: "Дата рождения",
      type: "date",
      placeholder: "Дата рождения",
      autocomplete: "bdate",
    },
    {
      name: "email",
      label: "Почта",
      type: "email",
      placeholder: "Почта",
      autocomplete: "email",
    },
    {
      name: "password",
      label: "Пароль",
      type: "password",
      placeholder: "Пароль",
      autocomplete: "new-password",
    },
    {
      name: "confirmPassword",
      label: "Подтвердите пароль",
      type: "password",
      placeholder: "Подтвердите пароль",
      autocomplete: "new-password",
    },
  ],
  doctor: [
    {
      name: "lastName",
      label: "Фамилия",
      type: "text",
      placeholder: "Фамилия",
      autocomplete: "family-name",
    },
    {
      name: "firstName",
      label: "Имя",
      type: "text",
      placeholder: "Имя",
      autocomplete: "given-name",
    },
    {
      name: "middleName",
      label: "Отчество",
      type: "text",
      placeholder: "Отчество",
      autocomplete: "additional-name",
    },
    {
      name: "birthDate",
      label: "Дата рождения",
      type: "date",
      placeholder: "Дата рождения",
      autocomplete: "bdate",
    },
    {
      name: "workplace",
      label: "Место работы",
      type: "text",
      placeholder: "Дата рождения",
      autocomplete: "organization",
    },
    {
      name: "position",
      label: "Должность",
      type: "text",
      placeholder: "Дата рождения",
      autocomplete: "off",
    },
    {
      name: "specialization",
      label: "Специализация",
      type: "text",
      placeholder: "Дата рождения",
      autocomplete: "off",
    },
    {
      name: "email",
      label: "Почта",
      type: "email",
      placeholder: "Почта",
      autocomplete: "email",
    },
    {
      name: "password",
      label: "Пароль",
      type: "password",
      placeholder: "Пароль",
      autocomplete: "new-password",
    },
    {
      name: "confirmPassword",
      label: "Подтвердите пароль",
      type: "password",
      placeholder: "Подтвердите пароль",
      autocomplete: "new-password",
    },
  ],
};

export const sharedFields = [
  {
    name: "politics",
    label: "Согласен с политикой в отношении персональных данных",
    type: "checkbox",
    placeholder: false,
    autocomplete: "off",
  },
  {
    name: "conditions",
    label: "Согласен с условиями использования платформы",
    type: "checkbox",
    placeholder: false,
    autocomplete: "off",
  },
  {
    name: "remember",
    label: "Сохранить данные для быстрого входа",
    type: "checkbox",
    placeholder: false,
    autocomplete: "off",
  },
];

export const getInitialFormData = (role) => {
  const personalFields = fields[role].reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
  const publicFields = sharedFields.reduce((acc, field) => {
    acc[field.name] = false;
    return acc;
  }, {});
  return { ...personalFields, ...publicFields };
};

export const formValidators = {
  passwordsMatch: isMatchPasswords("password", "confirmPassword"),
};

export const fieldValidators = {
  email: [validEmail],
  password: [isEmpty, isContainSpaces, validLength(4, 8)],
  text: [isEmpty],
  date: [isEmpty],
  checkbox: [isChecked],
};
