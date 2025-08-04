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
      name: "workplace",
      label: "Место работы",
      type: "text",
      placeholder: "Место работы",
      autocomplete: "organization",
    },
    {
      name: "position",
      label: "Должность",
      type: "text",
      placeholder: "Должность",
      autocomplete: "off",
    },
    {
      name: "specialization",
      label: "Специализация",
      type: "text",
      placeholder: "Специализация",
      autocomplete: "off",
    },
  ],
};

export const sharedFields = [
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
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});
  const publicFields = sharedFields.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});
  return { ...personalFields, ...publicFields };
};

export const formValidators = {
  passwordsMatch: isMatchPasswords("password", "confirmPassword"),
};

export const fieldValidators = {
  lastName: [isEmpty, validLength(2, 24)],
  firstName: [isEmpty, validLength(2, 24)],
  middleName: [isEmpty, validLength(2, 24)],
  birthDate: [isEmpty],
  email: [validEmail],
  password: [isEmpty, isContainSpaces, validLength(4, 8)],
  workplace: [isEmpty, validLength(4, 50)],
  position: [isEmpty, validLength(4, 50)],
  specialization: [isEmpty, validLength(4, 50)],
  confirmPassword: [isEmpty, isContainSpaces, validLength(4, 8)],
  politics: [isChecked],
  conditions: [isChecked],
  remember: [],
};
