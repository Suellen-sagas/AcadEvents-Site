# 🎓 AcadEvents | Site

Plataforma web desenvolvida para facilitar a divulgação, organização e participação em eventos acadêmicos.

O **AcadEvents** conecta estudantes e organizadores em um único ambiente, permitindo gerenciar inscrições, presença, certificados e informações dos eventos de forma simples e organizada.

---

## 🚀 Sobre o projeto

O AcadEvents surgiu com o objetivo de centralizar processos que normalmente ficam espalhados entre formulários, planilhas, mensagens e diferentes plataformas.

A aplicação possui áreas específicas para **estudantes, organizadores e administradores**.

---

## ✨ Funcionalidades

### 👩‍🎓 Estudante

- Cadastro e login
- Recuperação e alteração de senha
- Edição de perfil
- Visualização de eventos disponíveis
- Busca de eventos
- Filtro por categoria
- Filtro por modalidade
- Favoritar eventos
- Inscrição em eventos
- Cancelamento de inscrição
- Visualização dos eventos inscritos
- QR Code individual para presença
- Central de notificações
- Acesso aos certificados
- Download do certificado em PDF

### 🧑‍💼 Organizador

- Painel de gerenciamento
- Criação de eventos
- Edição de eventos
- Ativação e desativação de eventos
- Definição de limite de vagas
- Controle de inscrições
- Gerenciamento de participantes
- Confirmação de presença
- Validação de presença por QR Code
- Relatório do evento
- Exportação de participantes em CSV
- Acompanhamento da taxa de presença
- Controle de certificados emitidos

### ⚙️ Administrador

- Gerenciamento de usuários
- Gerenciamento de eventos
- Controle de inscrições
- Controle de presenças
- Controle de certificados
- Gerenciamento de notificações
- Acesso ao Django Admin

---

## 🔔 Automação do sistema

O AcadEvents possui alguns processos automáticos.

```text
Estudante realiza inscrição
        ↓
Presença é criada
        ↓
QR Code individual é disponibilizado
        ↓
Organizador confirma a presença
        ↓
Certificado é gerado automaticamente
        ↓
Estudante recebe uma notificação
        ↓
Certificado fica disponível para download
