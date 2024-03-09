import * as pedidoServiceModule from '../../service/PedidoServicio.mjs';
import axios from "axios";

export const abastecerPedido = async () => {
    try {
        channel.consume("queueRabbit", data => {
            var req = Buffer.from(data.content);
            req = JSON.parse(req.toString());
            aPedido(req);
            channel.ack(data);
        });
        
        //Consumir microservicio 1 actualizarCantidadPaquetesLote(cod_lote, cantidad_paquetes)
        async function aPedido(datos){
            const response = await axios.put(process.env.URL_MICROSERVICIO1 + "/loteProductos/updateCantidadPaquetesDisponibles/"+datos.codLote+"/"+datos.cantidad_paquetes);
            if(response.status == 200){
                const agregarPaquetes = await pedidoServiceModule.agregarPaquetes(datos);
                const evaluar = await pedidoServiceModule.evaluarYactualizarEstadoPedido(datos.idPedido);
                if(agregarPaquetes && evaluar){
                    //res.status(201).json({message: "Abastecido correctamente"});
                    console.log("Abastecido correctamente");
                }else{
                    //res.status(500).json({messaje: "Fallo al agregar"});
                    console.log("Fallo al agregar");
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}