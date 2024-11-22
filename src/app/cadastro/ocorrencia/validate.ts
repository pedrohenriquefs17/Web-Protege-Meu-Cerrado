// Função para validar CPF
export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, '');

  // Verifica se o CPF tem 11 dígitos ou se todos são iguais
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = soma % 11;
  let primeiroDigitoVerificador = resto < 2 ? 0 : 11 - resto;

  // Verifica o primeiro dígito verificador
  if (parseInt(cpf.charAt(9)) !== primeiroDigitoVerificador) {
    return false;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = soma % 11;
  let segundoDigitoVerificador = resto < 2 ? 0 : 11 - resto;

  // Verifica o segundo dígito verificador
  return parseInt(cpf.charAt(10)) === segundoDigitoVerificador;
};

// Função para validar Email
export const validateEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

// Função para validar Telefone
export const validatePhone = (phone: string): boolean => {
  const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/; // Regex para telefone no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
  return regex.test(phone);
};

// Função para verificar se é menor de idade
const isMenorDezoito = (dataNasc: Date) => {
  const hoje = new Date();

  const dezoitoAnosAtras = new Date(
    hoje.getFullYear() - 18,
    hoje.getMonth(),
    hoje.getDate()
  );

  return dataNasc > dezoitoAnosAtras;

}

// Função para validar Data de Nascimento (no formato DD/MM/YYYY)
export const validateDateOfBirth = (date: string): boolean => {

  const dataNasc = new Date(date);

  const hoje = new Date();

  if (dataNasc.getFullYear().valueOf() < 1914 || dataNasc.getFullYear() >= hoje.getFullYear()) {
    return false;
  }

  if (isMenorDezoito(dataNasc)) {
    alert("Menor de dezoito.");
  }

  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/; // Regex para formato de data DD/MM/YYYY
  return regex.test(date);
};
