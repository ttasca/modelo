import { ValidationError } from 'yup';

// Para colocar o nome da variavel dinaminca utilizo [Key: string] pois o componente é para todos os formulários e não sei qual campo vai ter no form.
// O nome key  foi escolha minha pode ser qualquer nome.
interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
     if (error.path) validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
