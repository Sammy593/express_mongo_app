import '../../../config/RabbitConfig.mjs';
import * as pedidoConsumer from './pedidos/PedidoConsumer.mjs';

await pedidoConsumer.abastecerPedido();
await pedidoConsumer.createPedido();
