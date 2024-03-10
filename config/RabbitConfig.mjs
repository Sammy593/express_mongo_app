import amqp from "amqplib";

try {
    global.connection = await amqp.connect(process.env.URL_RABBITMQ);
    global.channel    = await connection.createChannel();

    /* VARIABLES *************************************************************************/
    //Exchanges
    const exchangePedidos = "exchange-pedidos";
    const deadLetterExchangeName = "exchange-muertos"; //cola muerta
    //Colas - pedidos
    const abastecerPedidoCola = "micro2_abastecer_pedido";
    const crearPedidoCola = "micro2_crear_pedido";
    const deadLetterQueueName = "cola-muerta"; //cola muerta
    const respuestasPedidoCola = "respuestasCola"; //cola de respuestas
    //Routing - pedidos
    const routingAbastecerPedido = "routing-abastecer-pedido";
    const routingCrearPedido = "routing-crear-pedido";
    const routingRespuestasPedido = "routing-respuestas-pedido";
    const deadLetterRoutingKey = 'mensajes-muertos';

    // Política de mensajes muertos
    const policy = {
        "x-dead-letter-exchange": deadLetterExchangeName,
        "x-dead-letter-routing-key": deadLetterRoutingKey, 
    };

    /**EXCHANGES ------------------------------------------------------------------------- */
    await channel.assertExchange(exchangePedidos, "direct");
    await channel.assertExchange(deadLetterExchangeName, "direct"); //Exchange cola muerta
    
    /** COLAS --------------------------------------------------------------------------------------- */
    //colas de pedidos
    await channel.assertQueue(abastecerPedidoCola, {arguments: policy});
    await channel.assertQueue(crearPedidoCola, {arguments: policy});
    await channel.assertQueue(respuestasPedidoCola, {arguments: policy});
    await channel.assertQueue(deadLetterQueueName); //cola muerta

    /** BINDINGS ------------------------------------------------------------------------------------- */
    await channel.bindQueue(abastecerPedidoCola, exchangePedidos, routingAbastecerPedido);
    await channel.bindQueue(crearPedidoCola, exchangePedidos, routingCrearPedido);
    await channel.bindQueue(respuestasPedidoCola, exchangePedidos, routingRespuestasPedido);
    await channel.bindQueue(deadLetterQueueName, deadLetterExchangeName, deadLetterRoutingKey); //Cola muerta
    
    console.log("Conectado");
} catch (error) {
    console.log(error)
}