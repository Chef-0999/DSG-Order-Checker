const chalk  =require('chalk')
const config = require('./config.js')
const requests = require('./requests.js')


async function run() {

    try {

        const res = await requests.checkOrder(config.order, config.zip)

        console.log(chalk.green(`Got Items From Order: ${config.order}`))

        const json = JSON.parse(res)

        for (var x = 0; x < json.items.length; x++) {

  
            var itemName = json.items[x]["name"];
            var itemStatus = json.items[x]["status"];
            var itemTracking = json.items[x]["trackingUrl"];
            var itemCarrier = json.items[x]["shippingCarrier"];

            requests.webhook(config.webhook, config.order, json.placedDate, itemName, itemStatus, itemTracking, itemCarrier)
      
        }
    }
    catch (err) {

        console.log(chalk.red('Error Checking Order...'))

    }
}


run()