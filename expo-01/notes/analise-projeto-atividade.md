# Analise completa do projeto e plano de execucao da atividade

## Objetivo da atividade

Pelo arquivo `./notes/instrucoes.md`, o professor esta pedindo que este app Expo deixe de consumir o Back4App e passe a consumir um back-end proprio, escrito em Node.js, com o recurso `Tarefa`. O pedido enfatiza:

- trocar a integracao atual pelo back-end proprio publicado;
- renomear a pasta/modulo `back4app` para `api`;
- fazer o minimo de alteracoes possivel;
- idealmente, concentrar a mudanca na URL base e nos pontos necessarios para o contrato da API funcionar;
- entregar o codigo no GitHub;
- entregar o app publicado no Expo via update OTA com QR Code;
- entregar um video curto no YouTube mostrando o app funcionando e o resultado refletido no NeonDB.

## O que foi analisado

Foi feita leitura dos seguintes pontos do projeto:

- `./notes/instrucoes.md`, para entender exatamente o pedido da atividade;
- `package.json`, para identificar stack, dependencias e scripts;
- `README.md`, para verificar se havia orientacoes extras do projeto;
- `app/_layout.tsx`, para entender a estrutura base do app e os providers;
- `app/index.tsx` e `app/about.tsx`, para entender a navegacao principal;
- `app/tarefas/index.jsx`, que concentra a listagem, criacao, alteracao e exclusao de tarefas;
- `app/tarefas/[id].jsx`, que concentra a visualizacao/edicao individual da tarefa;
- `back4app/index.js`, que hoje representa a camada de acesso aos dados;
- `zustand.js`, para entender o estado persistido de filtro;
- `tsconfig.json`, `app.json` e `eas.json`, para entender alias, configuracao Expo e publicacao;
- estrutura geral de pastas do projeto;
- estado atual do repositorio Git;
- verificacao de qualidade basica com `lint`.

## Diagnostico do estado atual

O projeto ja esta organizado como um app Expo Router com React Query para dados remotos e Zustand para estado simples de filtro. A funcionalidade central da atividade esta concentrada no fluxo de tarefas.

Pontos positivos identificados:

- o app ja possui tela de lista de tarefas e tela de detalhe;
- ja existe uma camada separada para comunicacao com o servidor;
- a configuracao de Expo/EAS ja existe, o que ajuda na entrega OTA;
- o `lint` executou com sucesso.

Pontos de atencao importantes:

- o modulo ainda se chama `back4app`, mas a atividade pede renomear para `api`;
- o arquivo `back4app/index.js` esta parcialmente migrado: a instancia do Axios aponta para uma URL em Vercel, mas varias funcoes ainda usam variaveis antigas que nao existem mais;
- ha inconsistencia entre nomes de funcoes usados nas telas e nomes exportados pelo modulo de acesso a dados;
- ha inconsistencia entre identificadores de tarefa, pois parte do app usa `objectId` e outra parte usa `id`;
- a estrutura atual ainda carrega sinais do contrato antigo do Back4App, enquanto a atividade pede alinhamento com o contrato do back-end proprio em Node/Express;
- o repositrio Git esta com arquivos em estado de conflito/merge pendente, o que precisa ser resolvido antes da entrega final;
- a pasta `notes` ainda nao tinha o documento de consolidacao da analise.

## Leitura do que o professor realmente quer

O foco principal da atividade nao parece ser redesenhar o app, criar novas telas ou refatorar tudo. O que o professor quer, na pratica, e:

1. manter o app funcionando;
2. trocar a fonte dos dados do Back4App para a sua API propria;
3. deixar a estrutura coerente com isso, especialmente renomeando `back4app` para `api`;
4. fazer poucas alteracoes, sem reinventar a aplicacao;
5. comprovar o funcionamento com deploy, QR Code e video mostrando reflexo no banco.

Em outras palavras, o centro da avaliacao parece estar na integracao correta entre app mobile, API Node/Express publicada e persistencia no NeonDB.

## Passo a passo linear do que deve ser feito

### 1. Organizar o repositorio antes de qualquer entrega

- Resolver o estado atual do Git, porque ha arquivos marcados como conflito/merge pendente.
- Garantir que a arvore de trabalho fique coerente e sem ambiguidade antes de continuar.
- Confirmar quais arquivos fazem parte da atividade e quais alteracoes locais sao apenas intermediarias.

### 2. Confirmar o contrato da API propria

- Verificar no seu back-end Node/Express publicado quais rotas do recurso `Tarefa` existem de fato.
- Confirmar URL base publica da API.
- Confirmar formato de retorno da lista.
- Confirmar formato de retorno de uma tarefa individual.
- Confirmar quais campos a API aceita ao criar e atualizar.
- Confirmar qual e o identificador oficial da tarefa no seu back-end, para parar de misturar `objectId` com `id`.

### 3. Renomear a camada de acesso a dados para atender ao enunciado

- Renomear a pasta/modulo `back4app` para `api`.
- Ajustar os imports do app para apontarem para `api`.
- Manter essa camada como unico lugar responsavel por falar com o servidor.
- Evitar espalhar URL de API dentro das telas.

### 4. Limpar a heranca conceitual do Back4App

- Remover referencias semanticas ao Back4App na camada de integracao.
- Padronizar nomes de funcoes para refletirem o recurso `Tarefa` da sua API.
- Garantir que a nomenclatura usada nas telas e a nomenclatura exportada pelo modulo sejam exatamente as mesmas.

### 5. Ajustar a comunicacao HTTP para o contrato real da sua API

- Padronizar a URL base do Axios para o endereco publicado do seu back-end.
- Padronizar os caminhos finais das requisicoes de listar, buscar por id, criar, atualizar e excluir.
- Padronizar headers realmente necessarios.
- Remover dependencias de variaveis antigas que nao fazem mais parte da implementacao atual.

### 6. Unificar o modelo de dados da tarefa no app

- Escolher um identificador unico conforme o retorno real da API.
- Fazer com que lista, detalhe, atualizacao, exclusao e navegacao usem o mesmo identificador.
- Garantir que os campos de descricao e concluida sejam tratados do mesmo jeito em todas as telas.
- Verificar se a API retorna exatamente o mesmo nome de propriedade que o frontend espera.

### 7. Corrigir a tela de listagem de tarefas

- Fazer a tela consumir as funcoes corretas da camada `api`.
- Garantir que a listagem inicial leia os dados corretamente.
- Garantir que criar tarefa envie o payload esperado pela API.
- Garantir que marcar/desmarcar tarefa atualize o item correto.
- Garantir que excluir tarefa chame a operacao correta.
- Garantir que o filtro de concluidas continue funcionando sobre o formato real dos dados.

### 8. Corrigir a tela de detalhe da tarefa

- Fazer a tela buscar a tarefa pelo identificador correto.
- Garantir que a edicao carregue os dados reais retornados pela API.
- Garantir que salvar alteracoes envie o formato aceito pelo back-end.
- Garantir que a exclusao use o mesmo identificador e o mesmo contrato da listagem.
- Garantir que, apos alterar ou remover, a lista principal seja atualizada corretamente.

### 9. Revisar a coerencia estrutural do frontend

- Verificar se a organizacao atual das telas e suficiente para a atividade, evitando refatoracao desnecessaria.
- Manter React Query como mecanismo principal de cache/invalidate, ja que o projeto ja esta montado assim.
- Manter Zustand apenas para estado local de filtro, sem misturar com o estado remoto da API.
- Evitar mudancas visuais grandes, porque nao sao o foco do enunciado.

### 10. Revisar configuracoes de build e publicacao

- Confirmar se `app.json` e `eas.json` estao prontos para gerar a publicacao OTA.
- Confirmar se o projeto Expo esta associado ao projeto correto.
- Confirmar nome, slug, identificadores e canal de update usados na entrega.
- Validar se o app pode ser publicado sem depender de configuracoes locais ausentes.

### 11. Testar o fluxo funcional completo

- Testar criacao de tarefa.
- Testar listagem de tarefas.
- Testar alteracao de descricao.
- Testar marcar e desmarcar como concluida.
- Testar exclusao.
- Testar a navegacao entre lista e detalhe.
- Testar se as alteracoes realmente chegam no banco utilizado pelo seu back-end.

### 12. Validar o back-end em conjunto com o banco

- Confirmar que cada acao do app reflete no NeonDB.
- Validar se nao ha divergencia entre o que o app mostra e o que foi persistido.
- Conferir tratamento minimo de erros para nao gravar video com fluxo quebrado.

### 13. Preparar os itens de entrega pedidos

- Subir o codigo final para o GitHub.
- Publicar o app no Expo via OTA update.
- Garantir que exista QR Code funcional para acesso ao app publicado.
- Gravar um video de ate 1 minuto mostrando:
  - o app em execucao;
  - uma ou mais operacoes de tarefa;
  - a confirmacao do resultado no NeonDB.
- Publicar o video no YouTube como publico ou nao listado.

### 14. Fazer uma checagem final orientada pelo enunciado

- Conferir se a pasta/modulo `back4app` realmente deixou de ser a referencia principal.
- Conferir se `api` passou a ser o nome coerente da integracao.
- Conferir se as mudancas foram minimas e objetivas.
- Conferir se o app esta funcional ponta a ponta.
- Conferir se todos os links de entrega estao disponiveis.

## Resumo pratico da prioridade

Se for para resumir a ordem ideal de execucao em poucas palavras, a sequencia e:

1. resolver o estado do Git;
2. confirmar contrato da API Node/Express;
3. renomear `back4app` para `api`;
4. alinhar funcoes, rotas e identificadores;
5. validar lista e detalhe de tarefas;
6. testar persistencia no NeonDB;
7. publicar no Expo;
8. subir para GitHub;
9. gravar e publicar o video.

## Conclusao da analise

O projeto ja tem boa parte da estrutura necessaria para a atividade. O que falta nao e reconstruir o app do zero, e sim concluir corretamente a migracao da camada de dados do modelo antigo baseado em Back4App para uma API propria em Node/Express, mantendo coerencia de nomes, contrato e identificadores. O professor aparenta valorizar justamente essa troca controlada, com poucas alteracoes e evidencia clara de funcionamento em producao.
