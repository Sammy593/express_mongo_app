import amqp from "amqplib";

try {
    global.connection = await amqp.connect(process.env.URL_RABBITMQ);
    global.channel    = await connection.createChannel();
    
    await channel.assertQueue("queueRabbit");
    console.log("Conectado");
} catch (error) {
    console.log(error)
}