import * as pedidoServiceModule from '../../../service/PedidoServicio.mjs';
import axios from "axios";

export const abastecerPedido = async () => {
    try {
        channel.consume("micro2_abastecer_pedido", data => {
            var req = Buffer.from(data.content);
            req = JSON.parse(req.toString());
            try{
                aPedido(req, data);
            } catch (err) {
                console.log(err);
            }
        });

        async function aPedido(datos, data){
            try {
                const response = await axios.put(process.env.URL_MICROSERVICIO1 + "/loteProductos/updateCantidadPaquetesDisponibles?codLote="+datos.codLote+"&cantidadPaquetesDisponibles="+datos.cantidad_paquetes);
                if(response.status == 200){
                    const agregarPaquetes = await pedidoServiceModule.agregarPaquetes(datos);
                    const evaluar = await pedidoServiceModule.evaluarYactualizarEstadoPedido(datos.idPedido);
                    if(agregarPaquetes && evaluar){
                        console.log("Abastecido correctamente");
                    }else{
                        throw "Fallo al agregar";
                    }
                }
            } catch (err) {
                console.log(err);
                channel.nack(data, true, false);
            }
        }
    } catch (err) {
        console.log(err);
    }
}
export const createPedido = async () => {
    try {
      channel.consume("micro2_crear_pedido", async (data) => {
        try {
          const req = JSON.parse(Buffer.from(data.content).toString());
          await pedidoServiceModule.createPedido(req);
          channel.ack(data);
        } catch (error) {
          channel.nack(data, true, false);
          console.log(error.message);
        }
      });
    } catch (err) {
      console.error("Error en createPedido: ", err.message);
    }
};