# Redux Class 16A
## Tópicos de Aula

- O que é Redux?
- Por que usar o Redux?
- Quando usar o Redux?
- O que é Flux?
- Características da arquitetura Flux
- One-Way Data Binding
- Prop Drilling
- Entendendo os conceitos do Redux
- Princípios do Redux
- Redux Thunk
- Redux Tool Kit (RTK)
- createSlice
- createAction
- createReducer
- configureStore 
- Immer
- Dispatch 
- Immutability Helpers
- Redux DevTools
- Redux Toolkit Query
- Etapas de fluxo
   - Slice da consulta
   - Definição de recursos
   - Recursos na aplicação
- Re-fetching
- Redux Persist
- HashRouter do Router
- Rotas dinâmicas
- Memo
- Lazy
- Redux Saga
- O que é?
- Quais as características?
- Estrutura
- Funcionamento
- Redux Observable
- Redux Persist

_______________________________________________________________
## instalação

- NextJs: `npx create-next-app@latest`
- Redux: `npm install @reduxjs/toolkit react-redux`
- React Icons: `npm install react-icons`

## Artigo que fala sobre a comparação de vários gerenciadores de estado global:
https://medium.com/@AlexanderObregon/comparing-redux-with-alternative-state-management-solutions-mobx-context-api-and-recoil-7694091dd87c 

_______________________________________________________________
## Explicação do  `Client Component wrapper`

### Mas ...
Explicação das possíveis soluções além da acima:

- `'use client'`no Layout.tsx:  Essa diretiva informa ao Next.js que o componente deve ser renderizado no cliente (navegador), permitindo o uso de hooks e funcionalidades específicas do cliente, como o contexto do Redux.

- Criando o Client Component Wrapper: Essa abordagem é útil quando você tem partes do seu layout que podem ou devem ser Server Components (por exemplo, para obter dados no servidor, otimizar SEO, etc.). Você cria um componente separado (ex: ClientLayout.tsx) que é um Client Component e inclui apenas a parte que precisa do Redux (e outros hooks de cliente).  O componente pai (layout.tsx) continua sendo um Server Component.

## Explicação detalhada:

### layout.tsx (Server Component): 

- Este componente é responsável pela estrutura geral do layout da sua aplicação. Ele define o HTML básico, inclui os componentes de cabeçalho (Header) e rodapé (Footer), e renderiza o conteúdo das páginas ({children}).
- Por padrão, no Next.js 13, layout.tsx é um Server Component. Isso significa que ele é renderizado no servidor.
- Importante: Ele não tem acesso direto ao Redux nem a outros hooks que dependem do navegador.

### ClientLayout.tsx (Client Component):

- Este componente é o "wrapper" (envolvente) que torna o Redux acessível.
- A diretiva 'use client' no topo do arquivo indica que este é um Client Component, ou seja, ele é renderizado no navegador.
- Provider do Redux: O componente <Provider store={store}> envolve toda a aplicação, tornando a store do Redux disponível para todos os componentes dentro dele.
- Header e Footer: Incluí os seus componentes Header e Footer dentro do ClientLayout, pois presumo que eles também precisem acessar o Redux (ou outros hooks de cliente). Se eles não precisarem, você pode movê-los para fora do ClientLayout e de volta para o layout.tsx.
- `{children}`: O conteúdo das suas páginas é renderizado dentro do ClientLayout, permitindo que esses componentes acessem o Redux.

### Como funciona:

1 - O Next.js renderiza o layout.tsx no servidor (Server Component). <br/>
2 - Dentro do layout.tsx, o componente ClientLayout é renderizado no cliente (navegador). <br/>
3 - O ClientLayout envolve a aplicação com o Provider do Redux, tornando a store acessível. <br/>
4 - Os componentes Header, Footer e o conteúdo das páginas ({children}) são renderizados dentro do ClientLayout e, portanto, têm acesso ao Redux. <br/>

__________________________________________________________________________________________________

### Slice, o que é?

Slice é uma forma de 'dividir' o armazenamento global em partes menores e mais gerenciáveis. Cada fatia é responsável por uma parte específica do estado da nossa aplicação. <br/>
O que tem um slice?
- O estado (`state`): cada fatia possui seu próprio estado inicial e as informações específicas que ela precisa gerenciar.
- Os redutores (`reducers`): cada fatia define seus próprios reducers, que são funções puras que determinam como o estado daquele slice precisa ser alterado.
- As ações (`actions`): são os objetos que representam uma intenção de mudança no estado. Cada slice pode ter suas ações específicas que os componentes podem despachar.
- Seletor (`selector`): é a função que permite aos componentes acessarem partes específicas do estado em um slice.

### Reducers

Os reducers no Redux são funções puras que determinam como o estado da sua aplicação deve ser alterado em resposta a actions. Eles recebem o estado anterior e uma action como argumentos, e retornam um novo estado. Cada `Reducer`é responsável por ouvir as `actions` e, quando uma ação é relevante ou ativada, ela é disparada e atualiza a sua parte na interface do usuário.

### Dispatch

Fazendo uma analogia, o `Dispatch` no Redux é como se fosse um botão de enviar que usamos para executar e/ou 'dar ordens' aos reducers e atualizar o estado de nossa aplicação. <br/>
#### Como funciona?
- O `componente`: precisa fazer uma alteração no estado da aplicação (ex: adicionar um produto ao carrinho, marcar uma tarefa como concluída, etc.).
- `Action`: criamos um objeto chamado action. A action é como uma "mensagem" que descreve o que precisamos fazer. Ela tem um type (tipo da ação) que identifica a ação e pode ter um payload (dados extras) com informações adicionais.
- `Dispatch`: chamamos a função `dispatch` que passa a action como argumento. É como apertar o "botão de enviar" da nossa mensagem.
- `Reducers`: o Redux pega a action e envia para todos os reducers.
- `Atualização`: cada reducer verifica se a action é do tipo que ele "entende". Se for, o reducer cria um novo estado com as alterações necessárias e retorna esse novo estado.
- `Store`: o Redux armazena o novo estado e avisa os componentes que estão "escutando" essa parte do estado que ele foi atualizado.
- `Re renderização`: os componentes que precisam se atualizar (porque o estado mudou) são renderizados novamente, mostrando as informações atualizadas na tela.

### useSelector

Este hook no Redux é como se fosse um espião que colocamos em uma parte específica do estado da nossa aplicação. Ele permite 'ficar de olho' nessa parte do estado e pegar as informações que precisamos para exibir no navegador do usuário.

#### Como funciona:

- O `Componente`: precisa mostrar na tela informações que estão guardadas no estado da aplicação (ex: o nome do usuário, a lista de produtos no carrinho, etc.).
- `useSelector`: chamamos a função useSelector e passamos para ela qual parte do estado queremos "espiar". Sempre podemos usar uma função seletora para especificar exatamente o que precisamos. O useSelector fica "de olho" nessa parte do estado. Toda vez que essa parte do estado muda, ele "percebe". Quando o `useSelector`escutou a mudança do estado, ele pega as informações atualizadas e entrega para o cliente.
- `Atualização`: o componente usa as novas informações para se atualizar e mostrar os dados corretos na tela.


### combineReducer

No Redux Toolkit (RTK), o `combineReducers` é usado de forma implícita através da função configureStore. Não será necessário chamá-lo diretamente, o RTK cuida disso de forma abstrata! 

#### Como funciona:

- `configureStore({ reducer: { ... } })`: passamos um objeto para a chave reducer dentro do objeto de configuração do configureStore.
- Cada chave dentro desse objeto reducer representa um slice do seu estado global.
- O valor de cada chave é o reducer responsável por gerenciar essa parte do estado.

#### combineReducers nos bastidores:

O RTK usa o combineReducers internamente para combinar todos os seus reducers em um único reducer raiz.
Esse reducer raiz é então usado para criar a store do Redux. E usamos o useSelector para acessar as partes do estado global.
