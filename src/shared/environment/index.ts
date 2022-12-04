export const Environment = {
  /**
   * Define a quantidade de linhas a ser carregada por padrão nas listagens
   */
  ROW_LIMIT: 6,

  /**
   * Define a quantidade de cards a ser carregada por padrão nas listagens
   */
  CARD_LIMIT: 6,

  /**
    * Placeholder exibido nas inputs
    */
  SEARCH_INPUT: 'Pesquisar...',

  /**
    * Texto exibido quando nenhum registro é encontrado em uma listagem
    */
  EMPTY_LIST: 'Nenhum registro encontrado.',

  /**
    * Url base de consultado dos dados dessa aplicação
    */
  BASE_URL: process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:3333',
};