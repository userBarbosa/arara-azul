export const Environment = {
  /**
   * Define a quantidade de linhas a ser carregada por padrão nas listagens
   */
  LIMIT: 10,

  /**
    * Placeholder exibido nas inputs
    */
  SEARCH_INPUT: 'Pesquisar...',

  /**
    * Texto exibido quando nenhum registro é encontrado em uma listagem
    */
  EMPTY_LIST: 'Nenhum registro encontrado.',

  /**
    * Url base de consultado dos dados dessa aplicação (BASE_URL)
    * local: 'http://localhost:3001'
    * prod: 'https://api.petshealth.com.br',
    */
   BASE_URL: isProduction() ? 'https://api.petshealth.com.br' :  'http://localhost:3001'
};

function isProduction() : boolean {
  return process.env.REACT_APP_ENVIRONMENT === "production"
}