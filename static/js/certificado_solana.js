import { ConnectorClient } from "@solana-commerce/connector";

import {
    address,
    appendTransactionMessageInstruction,
    compileTransaction,
    createSolanaRpc,
    createTransactionMessage,
    getTransactionEncoder,
    pipe,
    setTransactionMessageFeePayer,
    setTransactionMessageLifetimeUsingBlockhash,
} from "@solana/kit";

import {
    getAddMemoInstruction
} from "@solana-program/memo";

import bs58 from "bs58";


const SOLANA_RPC =
    "https://api.devnet.solana.com";


const connector = new ConnectorClient({
    autoConnect: true,
    debug: true
});


function getCookie(name) {

    const cookies =
        document.cookie.split(";");

    for (const cookie of cookies) {

        const [key, ...value] =
            cookie.trim().split("=");

        if (key === name) {

            return decodeURIComponent(
                value.join("=")
            );
        }
    }

    return null;
}


async function getJson(url) {

    const resposta = await fetch(
        url,
        {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }
    );

    const dados =
        await resposta.json();

    if (!resposta.ok) {

        throw new Error(
            dados.erro ||
            "Não foi possível obter os dados do certificado."
        );
    }

    return dados;
}


async function postJson(
    url,
    dados
) {

    const resposta = await fetch(
        url,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie(
                    "csrftoken"
                )
            },

            body: JSON.stringify(
                dados
            )
        }
    );

    const resultado =
        await resposta.json();

    if (!resposta.ok) {

        throw new Error(
            resultado.erro ||
            "Não foi possível concluir a operação."
        );
    }

    return resultado;
}


async function registrarNaSolana(
    botao
) {

    /*
    1. Django entrega o hash/memo
    */

    const dados =
        await getJson(
            botao.dataset.solanaUrl
        );


    /*
    2. Confere carteira conectada
    */

    const state =
        connector.getConnectorState();


    if (
        !state.connected ||
        !state.selectedWallet ||
        !state.selectedAccount
    ) {

        throw new Error(
            "Sua carteira Solana não está conectada neste navegador."
        );
    }


    if (
        state.selectedAccount
        !== dados.carteira
    ) {

        throw new Error(
            "A carteira conectada é diferente da carteira vinculada ao AcadEvents."
        );
    }


    const accountInfo =
        state.accounts.find(
            conta =>
                conta.address ===
                state.selectedAccount
        );


    if (!accountInfo) {

        throw new Error(
            "Não foi possível localizar a conta Solana."
        );
    }


    /*
    3. Cria RPC Devnet
    */

    const rpc =
        createSolanaRpc(
            SOLANA_RPC
        );


    const {
        value: latestBlockhash
    } =
        await rpc
            .getLatestBlockhash()
            .send();


    /*
    4. Instrução do Memo Program
    */

    const memoInstruction =
        getAddMemoInstruction({
            memo: dados.memo
        });


    /*
    5. Monta a transação
    */

    const transactionMessage =
        pipe(

            createTransactionMessage({
                version: "legacy"
            }),

            tx =>
                setTransactionMessageFeePayer(
                    address(
                        state.selectedAccount
                    ),
                    tx
                ),

            tx =>
                setTransactionMessageLifetimeUsingBlockhash(
                    latestBlockhash,
                    tx
                ),

            tx =>
                appendTransactionMessageInstruction(
                    memoInstruction,
                    tx
                )
        );


    /*
    6. Compila para bytes
    */

    const transaction =
        compileTransaction(
            transactionMessage
        );


    const transactionBytes =
        new Uint8Array(
            getTransactionEncoder()
                .encode(
                    transaction
                )
        );


    /*
    7. Wallet Standard
    */

    const wallet =
        state.selectedWallet;


    const recurso =
        wallet.features[
            "solana:signAndSendTransaction"
        ];


    if (!recurso) {

        throw new Error(
            "Esta carteira não suporta envio de transações Solana."
        );
    }


    /*
    8. Carteira assina e envia
    */

    const resultados =
        await recurso.signAndSendTransaction(
            {
                transaction:
                    transactionBytes,

                account:
                    accountInfo.raw,

                chain:
                    "solana:devnet",

                options: {
                    preflightCommitment:
                        "confirmed"
                }
            }
        );


    const resultado =
        resultados[0];


    if (
        !resultado ||
        !resultado.signature
    ) {

        throw new Error(
            "A Solana não retornou a assinatura da transação."
        );
    }


    /*
    Signature vem em bytes.
    Convertemos para Base58.
    */

    const assinatura =
        bs58.encode(
            resultado.signature
        );


    console.log(
        "Transação Solana:",
        assinatura
    );


    /*
    9. Django verifica on-chain
    */

    let ultimaFalha = null;


    for (
        let tentativa = 1;
        tentativa <= 6;
        tentativa++
    ) {

        try {

            const confirmacao =
                await postJson(
                    botao.dataset.confirmUrl,
                    {
                        assinatura:
                            assinatura
                    }
                );


            return confirmacao;

        }

        catch (erro) {

            ultimaFalha = erro;

            if (tentativa < 6) {

                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            1500
                        )
                );
            }
        }
    }


    throw (
        ultimaFalha ||
        new Error(
            "Não foi possível confirmar a transação."
        )
    );
}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const botoes =
            document.querySelectorAll(
                ".register-solana-button"
            );


        botoes.forEach(
            botao => {

                botao.addEventListener(
                    "click",
                    async () => {

                        const textoOriginal =
                            botao.textContent;


                        botao.disabled = true;

                        botao.textContent =
                            "Preparando transação...";


                        try {

                            const resultado =
                                await registrarNaSolana(
                                    botao
                                );


                            console.log(
                                resultado
                            );


                            alert(
                                "Certificado registrado na Solana com sucesso!"
                            );


                            window.location.reload();

                        }

                        catch (erro) {

                            console.error(
                                erro
                            );


                            alert(
                                erro.message
                            );


                            botao.disabled = false;

                            botao.textContent =
                                textoOriginal;
                        }
                    }
                );
            }
        );
    }
);