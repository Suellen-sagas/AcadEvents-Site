import { ConnectorClient } from "@solana-commerce/connector";


const connector = new ConnectorClient({
    autoConnect: true,
    debug: true
});


function getCookie(name) {

    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {

        const [key, ...value] = cookie
            .trim()
            .split("=");

        if (key === name) {

            return decodeURIComponent(
                value.join("=")
            );
        }
    }

    return null;
}


function bytesParaHex(bytes) {

    return Array.from(bytes)
        .map(
            byte =>
                byte
                    .toString(16)
                    .padStart(2, "0")
        )
        .join("");
}


async function postJson(url, dados = {}) {

    const resposta = await fetch(
        url,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken")
            },

            body: JSON.stringify(dados)
        }
    );

    const resultado = await resposta.json();

    if (!resposta.ok) {

        throw new Error(
            resultado.erro ||
            "Ocorreu um erro."
        );
    }

    return resultado;
}


async function conectarCarteira(area) {

    let state =
        connector.getConnectorState();


    const carteiras =
        state.wallets.filter(
            wallet =>
                wallet.connectable
        );


    if (!carteiras.length) {

        throw new Error(
            "Nenhuma carteira Solana compatível foi encontrada. Instale ou desbloqueie a Phantom."
        );
    }


    const phantom =
        carteiras.find(
            wallet =>
                wallet.name
                    .toLowerCase()
                    .includes("phantom")
        );


    const carteiraEscolhida =
        phantom || carteiras[0];


    await connector.select(
        carteiraEscolhida.name
    );


    state =
        connector.getConnectorState();


    const endereco =
        state.selectedAccount;


    if (!endereco) {

        throw new Error(
            "Não foi possível obter o endereço da carteira."
        );
    }


    await postJson(
        area.dataset.saveUrl,
        {
            carteira: endereco
        }
    );


    return endereco;
}


async function verificarCarteira(area) {

    const desafio =
        await postJson(
            area.dataset.challengeUrl
        );


    const state =
        connector.getConnectorState();


    if (
        !state.connected ||
        !state.selectedWallet
    ) {

        throw new Error(
            "Conecte sua carteira antes de verificar."
        );
    }


    const endereco =
        state.selectedAccount;


    const accountInfo =
        state.accounts.find(
            conta =>
                conta.address === endereco
        );


    if (!accountInfo) {

        throw new Error(
            "Conta Solana não encontrada."
        );
    }


    const wallet =
        state.selectedWallet;


    const recursoAssinatura =
        wallet.features[
            "solana:signMessage"
        ];


    if (!recursoAssinatura) {

        throw new Error(
            "Esta carteira não suporta assinatura de mensagens."
        );
    }


    const mensagemBytes =
        new TextEncoder().encode(
            desafio.mensagem
        );


    const resultados =
        await recursoAssinatura.signMessage(
            {
                account: accountInfo.raw,
                message: mensagemBytes
            }
        );


    const resultado =
        resultados[0];


    if (!resultado) {

        throw new Error(
            "A carteira não retornou uma assinatura."
        );
    }


    await postJson(
        area.dataset.verifyUrl,
        {
            carteira: endereco,

            assinatura:
                bytesParaHex(
                    resultado.signature
                )
        }
    );
}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const area =
            document.querySelector(
                "#solana-wallet-area"
            );


        if (!area) {
            return;
        }


        const botaoConectar =
            document.querySelector(
                "#connect-solana-wallet"
            );


        const botaoVerificar =
            document.querySelector(
                "#verify-solana-wallet"
            );


        const botaoDesconectar =
            document.querySelector(
                "#disconnect-solana-wallet"
            );


        if (botaoConectar) {

            botaoConectar.addEventListener(
                "click",
                async () => {

                    botaoConectar.disabled = true;

                    botaoConectar.textContent =
                        "Conectando...";

                    try {

                        await conectarCarteira(
                            area
                        );

                        window.location.reload();

                    }

                    catch (erro) {

                        console.error(erro);

                        alert(
                            erro.message
                        );

                        botaoConectar.disabled = false;

                        botaoConectar.textContent =
                            "Conectar carteira Solana";
                    }
                }
            );
        }


        if (botaoVerificar) {

            botaoVerificar.addEventListener(
                "click",
                async () => {

                    botaoVerificar.disabled = true;

                    botaoVerificar.textContent =
                        "Aguardando assinatura...";

                    try {

                        await verificarCarteira(
                            area
                        );

                        alert(
                            "Carteira Solana verificada com sucesso!"
                        );

                        window.location.reload();

                    }

                    catch (erro) {

                        console.error(erro);

                        alert(
                            erro.message
                        );

                        botaoVerificar.disabled = false;

                        botaoVerificar.textContent =
                            "Verificar carteira";
                    }
                }
            );
        }


        if (botaoDesconectar) {

            botaoDesconectar.addEventListener(
                "click",
                async () => {

                    try {

                        await connector.disconnect();

                        await postJson(
                            area.dataset.removeUrl
                        );

                        window.location.reload();

                    }

                    catch (erro) {

                        console.error(erro);

                        alert(
                            erro.message
                        );
                    }
                }
            );
        }
    }
);