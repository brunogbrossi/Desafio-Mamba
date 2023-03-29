function getStringData(dataString) {
  const data = new Date(dataString);
  const insereZeroAntes = (valor) => {
    if (valor <= 9) {
      valor = `0${valor.toString()}`;
    }
    return valor.toString();
  };
  const dataFormatada = `${insereZeroAntes(data.getUTCDate())}/${insereZeroAntes(
    data.getUTCMonth() + 1,
  )}/${data.getUTCFullYear()} ${insereZeroAntes(data.getUTCHours())}:${insereZeroAntes(
    data.getUTCMinutes(),
  )}:${insereZeroAntes(data.getUTCSeconds())}`;
  return dataFormatada;
}

export { getStringData };
