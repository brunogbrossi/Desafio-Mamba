import Http from '@mamba/pos/api/http.js';
import Storage from '@mamba/pos/api/storage.js';

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
  )}/${data.getUTCFullYear()} ${insereZeroAntes(data.getHours())}:${insereZeroAntes(
    data.getMinutes(),
  )}:${insereZeroAntes(data.getUTCSeconds())}`;
  return dataFormatada;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 82 + 1);
}

function retornaNumeroAleatorioValido(personagensBuscados) {
  const isTodosOsPersonagensBuscados =
    personagensBuscados != null && personagensBuscados.length === 82;
  if (isTodosOsPersonagensBuscados) {
    return null;
  }
  const numeroAleatorio = getRandomNumber();
  const personagemExiste =
    personagensBuscados &&
    personagensBuscados.find((personagem) => {
      return personagem.id === numeroAleatorio;
    });
  if (personagemExiste) {
    return retornaNumeroAleatorioValido();
  }
  return numeroAleatorio;
}

async function getPersonagem(personagensBuscados) {
  const randomNumber = retornaNumeroAleatorioValido(personagensBuscados);
  let personagem = {};
  if (randomNumber === null) return;
  const request = {
    url: `https://swapi.dev/api/people/${randomNumber}`,
  };
  return Http.send(request)
    .then((result) => {
      const response = JSON.parse(result.body);
      personagem = {
        id: randomNumber,
        nome: response.name,
        altura: response.height,
        peso: response.mass,
        cabelo: response.hair_color,
        pele: response.skin_color,
        olho: response.eye_color,
        nascimento: response.birth_year,
        genero: response.gender,
        horaDaBusca: new Date(),
      };

      if (personagensBuscados === null) {
        personagensBuscados = [personagem];
      } else {
        personagensBuscados.push(personagem);
      }
      Storage.setItem('personagensBuscados', personagensBuscados);
      return personagem;
    })
    .catch((error) => {
      console.log(error.status);
      console.log(error.msg);
    });
}

export { getStringData, getPersonagem };
