import '../../config/RabbitConfig.mjs';
import * as pedidoConsumer from './rabbitmq/PedidoConsumer.mjs';

await pedidoConsumer.abastecerPedido();