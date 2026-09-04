import {
    Html5Qrcode,
    Html5QrcodeSupportedFormats
} from "html5-qrcode";


document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const reader =
            document.querySelector(
                "#qr-reader"
            );

        if (!reader) {
            return;
        }


        const status =
            document.querySelector(
                "#qr-reader-status"
            );


        const html5QrCode =
            new Html5Qrcode(
                "qr-reader",
                {
                    formatsToSupport: [
                        Html5QrcodeSupportedFormats.QR_CODE
                    ]
                }
            );


        let processando = false;


        async function qrLido(
            decodedText
        ) {

            if (processando) {
                return;
            }

            processando = true;


            try {

                const url =
                    new URL(
                        decodedText,
                        window.location.origin
                    );


                if (
                    url.origin
                    !== window.location.origin
                ) {

                    throw new Error(
                        "Este QR Code não pertence ao AcadEvents."
                    );
                }


                if (
                    !url.pathname.includes(
                        "/presencas/validar/"
                    )
                ) {

                    throw new Error(
                        "QR Code inválido para presença."
                    );
                }


                if (status) {

                    status.textContent =
                        "QR Code identificado. Validando participante...";
                }


                try {

                    await html5QrCode.stop();

                } catch {
                    // scanner pode já estar parado
                }


                window.location.href =
                    url.href;

            }

            catch (erro) {

                console.error(
                    erro
                );


                if (status) {

                    status.textContent =
                        erro.message;
                }


                processando = false;
            }
        }


        try {

            if (status) {

                status.textContent =
                    "Solicitando acesso à câmera...";
            }


            await html5QrCode.start(

                {
                    facingMode: "environment"
                },

                {
                    fps: 10,

                    qrbox: {
                        width: 250,
                        height: 250
                    },

                    aspectRatio: 1.0
                },

                qrLido,

                () => {
                    // Ignora tentativas sem QR.
                }
            );


            if (status) {

                status.textContent =
                    "Aponte a câmera para o QR Code do participante.";
            }

        }

        catch (erro) {

            console.error(
                erro
            );


            if (status) {

                status.textContent =
                    (
                        "Não foi possível acessar a câmera. " +
                        "Confira a permissão do navegador."
                    );
            }
        }
    }
);