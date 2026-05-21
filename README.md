# Project Games Frontend

Aplicação frontend desenvolvida com React para pesquisar, explorar e visualizar informações sobre jogos utilizando a API RAWG.

---

# Funcionalidades

## Catálogo de Jogos

* Listagem de jogos com infinite scroll
* Grid responsivo para diferentes tamanhos de tela
* Skeleton loading para melhorar a experiência de carregamento
* Ordenação dinâmica de jogos

## Sistema de Pesquisa

* Pesquisa com debounce
* Sugestões automáticas enquanto o usuário digita
* Página de resultados de busca
* Normalização e sanitização dos termos pesquisados

## Jogos Aleatórios

* Sistema inteligente de seleção aleatória
* Estratégia de deduplicação de resultados
* Cache para evitar repetições frequentes
* Atualização dinâmica de jogos aleatórios

## Detalhes dos Jogos

Cada jogo possui uma página dedicada contendo:

* Descrição
* Plataformas
* Gêneros
* Desenvolvedores
* Publicadoras
* Data de lançamento
* Jogos relacionados
* Imagens e artes do jogo

## Interface Responsiva

* Layout responsivo para desktop e mobile
* Menu mobile interativo
* Navegação otimizada para telas menores
* Melhorias de acessibilidade e legibilidade

## Melhorias Visuais

* Interface inspirada em glassmorphism
* Background animado com partículas
* Efeitos hover nos componentes
* Skeleton loading para carregamentos mais suaves

---

# Tecnologias Utilizadas

* React
* React Router DOM
* RAWG Video Games Database API
* CSS3
* IntersectionObserver API

---

# Estrutura do Projeto

Principais componentes da aplicação:

* `Catalog`
* `GameDetails`
* `Random`
* `SearchForm`
* `SearchResults`
* `Navigation`
* `GameCard`
* `GameGrid`
* `Header`
* `Footer`
* `ParticlesBackground`
* `Preloader`
* `NotFound`

---

# Instalação e Uso

Clone o repositório:

```bash
git clone https://github.com/WMonteiroDev/project-games-frontend.git
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Abra no navegador:

```txt
http://localhost:3000
```

Gerar build de produção:

```bash
npm run build
```

---

# Autor

Desenvolvido por Wesley Monteiro.

* GitHub: https://github.com/WMonteiroDev
* LinkedIn: https://www.linkedin.com

---

# Licença

Projeto desenvolvido para fins educacionais e de portfólio.
