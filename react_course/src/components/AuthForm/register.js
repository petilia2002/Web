export const fields = {
  patient: [
    { name: "lastName", label: "Фамилия", type: "text" },
    { name: "firstName", label: "Имя", type: "text" },
    { name: "middleName", label: "Отчество", type: "text" },
    { name: "birthDate", label: "Дата рождения", type: "date" },
    { name: "email", label: "Почта", type: "email" },
    { name: "password", label: "Пароль", type: "password" },
    { name: "confirmPassword", label: "Подтвердите пароль", type: "password" },
  ],
  doctor: [
    { name: "lastName", label: "Фамилия", type: "text" },
    { name: "firstName", label: "Имя", type: "text" },
    { name: "middleName", label: "Отчество", type: "text" },
    { name: "birthDate", label: "Дата рождения", type: "date" },
    { name: "workplace", label: "Место работы", type: "text" },
    { name: "position", label: "Должность", type: "text" },
    { name: "specialization", label: "Специализация", type: "text" },
    { name: "email", label: "Почта", type: "email" },
    { name: "password", label: "Пароль", type: "password" },
    { name: "confirmPassword", label: "Подтвердите пароль", type: "password" },
  ],
};

export const sharedFields = [
  {
    name: "politics",
    label: "Согласен с политикой в отношении персональных данных",
    type: "checkbox",
  },
  {
    name: "conditions",
    label: "Согласен с условиями использования платформы",
    type: "checkbox",
  },
  {
    name: "remember",
    label: "Сохранить данные для быстрого входа",
    type: "checkbox",
  },
];

export const getInitialFormData = (role) => {
  const personalFields = fields[role].reduce(
    (acc, field) => {
      acc[field.name] = "";
      return acc;
    },
    [{}]
  );
  const publicFields = sharedFields.reduce(
    (acc, field) => {
      acc[field.name] = false;
      return acc;
    },
    [{}]
  );
  return { ...personalFields, ...publicFields };
};
