export default class ApiError extends Error {
  constructor(
    message = "Что-то пошло не так... Попробуйте позже",
    status = 500
  ) {
    super(message);
    this.status = status;
  }
}
