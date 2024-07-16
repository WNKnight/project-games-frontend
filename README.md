# Projeto Games Frontend
Este é um projeto frontend desenvolvido em React para exibir informações de jogos usando a API Giant Bomb.

## Funcionalidades
- **Pesquisa de Jogos:** Permite aos usuários pesquisar jogos pelo nome.
- **Resultados de Pesquisa:** Exibe os resultados da pesquisa em uma grade de jogos.
- **Jogos Aleatórios:** Mostra uma seleção aleatória de jogos na página inicial.
- **Detalhes dos Jogos:** Exibe detalhes de um jogo específico, incluindo descrição, personagens, desenvolvedores, franquias, plataformas, publicadoras, gêneros, data de lançamento e jogos similares.
- **Detalhes das Franquias:** Exibe detalhes de uma franquia específica, incluindo descrição, resumo e jogos relacionados.
- **Detalhes dos Personagens:** Exibe detalhes de um personagem específico, incluindo descrição, resumo, jogos relacionados, franquias e imagem.
- **Catálogo de Jogos:** Lista jogos com paginação e ordenação, permitindo a visualização de jogos em diferentes páginas.
- **Navegação:** Permite navegar entre diferentes seções do aplicativo (Home, Catálogo, Sobre).
- **Tratamento de Erros:** Redireciona para uma página de erro personalizada se uma rota não existir.

## Estrutura do Projeto
O projeto é estruturado com vários componentes principais:

- **SearchForm:** Componente de pesquisa que permite aos usuários pesquisar jogos pelo nome. Ele sugere jogos enquanto o usuário digita e redireciona para os resultados da pesquisa.
- **SearchResults:** Exibe os resultados da pesquisa de jogos com base no termo de pesquisa inserido pelo usuário.
- **Random:** Mostra uma seleção aleatória de jogos na página inicial, com a capacidade de atualizar os jogos exibidos.
- **Navigation:** Navegação entre as diferentes seções do aplicativo, com um menu responsivo para dispositivos móveis.
- **NotFound:** Página de erro personalizada para redirecionar usuários quando uma rota não existir.
- **Main e GameGrid:** Componentes para estruturação e exibição dos jogos.
- **GameCard:** Exibe informações de um jogo individual em formato de cartão.
- **Preloader:** Exibe um indicador de carregamento enquanto os dados estão sendo buscados.
- **GameDetails:** Exibe informações detalhadas sobre um jogo específico.
- **FranchiseDetails:** Exibe informações detalhadas sobre uma franquia específica.
- **CharacterDetails:** Exibe informações detalhadas sobre um personagem específico.
- **Catalog:** Componente que lista jogos com paginação e ordenação, permitindo a visualização de jogos em diferentes páginas.

## Instalação e Uso
Para executar o projeto localmente, siga estas etapas:

1. Clone o repositório: `git clone https://github.com/seu-usuario/project-games-frontend.git`
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm start`
4. Abra seu navegador e acesse `http://localhost:3000`

## Dependências Principais
- React: Biblioteca JavaScript para criar interfaces de usuário.
- React Router DOM: Roteamento para aplicativos React.
- Dompurify: Biblioteca para sanitizar HTML, prevenindo ataques XSS (Cross-Site Scripting).
- Outras dependências incluem ferramentas de teste e utilitários para manipulação de dados.

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou relatar problemas.