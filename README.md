# lista-contato
1. Objetivo
Desenvolver uma aplicação web de página única para gerenciamento de contatos, utilizando HTML, CSS e JavaScript nativo. O trabalho deve integrar conteúdos estudados na disciplina, especialmente DOM, eventos, arrays e objetos, funções, JSON e Local Storage.

2. Estrutura da aplicação
A página deverá conter um formulário para cadastro e edição de contatos, uma área de busca e uma área para exibição dos contatos cadastrados.

Nome
E-mail
Telefone
Os contatos deverão ser mantidos em um array de objetos JavaScript. Cada contato deve possuir um identificador único, utilizado nas operações de edição e remoção.

3. Requisitos obrigatórios
Cadastro
O usuário deverá poder cadastrar novos contatos por meio do formulário. Os campos devem ser obrigatórios e utilizar tipos HTML adequados, como text, email e tel.

Listagem
Os contatos cadastrados deverão ser apresentados dinamicamente na página. A apresentação pode utilizar tabela, lista ou cards, desde que seja clara e legível.

Persistência
Todos os contatos deverão ser armazenados no Local Storage. Ao recarregar ou reabrir a página, os contatos salvos anteriormente deverão ser recuperados e exibidos automaticamente.

A persistência deverá utilizar JSON.stringify() para salvar o array e JSON.parse() para recuperá-lo.

Remoção
Cada contato deverá possuir uma ação de remoção. Ao remover um contato, o array, o Local Storage e a interface deverão ser atualizados.

Edição
Cada contato deverá possuir uma ação de edição. Ao selecionar um contato para editar, seus dados devem ser carregados no formulário. O formulário deve indicar que está em modo de edição e permitir salvar as alterações ou cancelar a operação.

Busca e filtro
A aplicação deverá possuir um campo de busca. À medida que o usuário digita, a lista deve ser filtrada em tempo real, considerando pelo menos nome e e-mail. A busca deve ignorar diferenças entre letras maiúsculas e minúsculas.

Estado vazio
Quando não houver contatos cadastrados, ou quando uma busca não encontrar resultados, a interface deverá apresentar uma mensagem adequada ao usuário.

4. Organização do código
O JavaScript deve ser organizado em funções com responsabilidades claras. Evite concentrar toda a lógica em um único tratador de eventos.

Uma possível organização inclui funções para:

carregar e salvar contatos;
renderizar a lista;
adicionar, editar e remover contatos;
filtrar contatos.
A interface deve ser gerada a partir do array de contatos. O DOM representa os dados, mas não deve ser usado como fonte principal de estado da aplicação.

5. HTML, CSS e usabilidade
Utilize HTML semanticamente adequado e CSS para produzir uma interface organizada, legível e agradável. Não é necessário criar um design complexo. Serão valorizados bom espaçamento, organização do formulário, clareza dos botões de ação e comportamento razoável em telas menores.

6. Funcionalidade adicional
Além dos requisitos obrigatórios, implemente, pelo menos, uma funcionalidade adicional de sua escolha. Exemplos:

marcar contatos como favoritos;
ordenar contatos alfabeticamente;
criar categorias (pessoal, trabalho, família);
mostrar a quantidade total de contatos;
filtrar por categoria ou favoritos.
7. Restrições
Utilizar JavaScript nativo.
Não utilizar frameworks JavaScript.
Não utilizar banco de dados ou servidor.
Persistir os dados utilizando Local Storage.
O projeto deve demonstrar a capacidade de manter dados em um array de objetos, refletir esses dados na interface, reagir a eventos do usuário e persistir o estado da aplicação no navegador utilizando JSON e Local Storage.
