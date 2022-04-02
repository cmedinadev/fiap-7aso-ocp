# fiap-7aso-ocp

Este repositório apresenta o código necessário para a implantação de uma API Rest, desenvolvida em NodeJS e que utiliza o banco de dados relacional PostgresSQL, na plataforma de contêineres OpenShift.

O repositório está dividido em 2 diretórios:
  - **/app** - Código fonte do serviço Rest
  - **/ops** - Arquivos de configuração para provisionamento da infraestrutura e implatanção do serviço

O arquivo start.sh é um script para criar o projeto no OpenShift e realizar a implantação dos recursos no cluster.

# Entregas

## Entrega 1

- **Dockerfile**: O arquivo `Dockerfile` presente na pasta ./app

## Entrega 2

- **Ingress**: Os arquivos `route/app-ingress.route.yaml` e `service/app.service.yaml` (além das dependências dos deployments e configs)
- **Deploy de banco de dados**: O arquivo `deployment-config/db.deploymentconfig.yaml`
- **Camada de persistência**: O arquivo `pvc/db.pvc.yaml`

## Entrega 3

- **Secrets**: Os arquivos `app.secret.yaml` e `db.secret.yaml` dentro do diretório `secret`
- **HPA**: O arquivo `app.hpa.yaml` dentro do diretório `hpa`

## Entrega 4

Todos os arquivos presentes no diretório ./ops. Em especial o arquivo `kustomization.yaml` para provisionar a infra completa em uma conta que possua o projeto `fiap-7aso-grupo-8` previamente criado.

# Execução e testes

Para realizarmos a implantação dos recursos no cluster, utilizaremos o programa de linha de comando OpenShift CLI.

Instalação da CLI

https://docs.openshift.com/container-platform/4.7/cli_reference/openshift_cli/getting-started-cli.html


Login na plataforma

    oc login --token=sha256~XXXX --server=https://api.na46.prod.nextcle.com:6443


Após o login na plataforma, execute o script start.sh presente na raiz do projeto.

    ./start.sh
---

#### Testes

Para testar a aplicação podemos realizar chamadas CURL para os end-points dos serviços, conforme exemplos abaixos: 

POST /api/clientes - Criar um cliente

    curl -X POST http://clientes.apps.na46.prod.nextcle.com/api/clientes -H 'Content-Type: application/json' -d '{"nome":"João Marcelo","idade":22, "uf":"RJ"}'

GET /api/clientes - Recuperar todos os clientes

    curl http://clientes.apps.na46.prod.nextcle.com/api/clientes

GET /api/clientes/:id - Recuperar um cliente específico

    curl http://clientes.apps.na46.prod.nextcle.com/api/clientes/1


PUT /api/clientes/:id - Alterar um cliente

    curl -X PUT http://clientes.apps.na46.prod.nextcle.com/api/clientes -H 'Content-Type: application/json' -d '{"id": 1, "nome":"João Marcelo","idade":22, "uf":"RJ"}'

DELETE /api/clientes/:id - Excluir um cliente

    curl -X DELETE http://clientes.apps.na46.prod.nextcle.com/api/clientes/1


