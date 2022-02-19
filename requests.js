const axios = require('axios')
const chalk = require('chalk')
const got = require('got')


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function checkOrder(order, zip) {

    try {

        console.log('Checking Order...')

        const link = `https://www.dickssportinggoods.com/myaccount/services/redirectingservice/orderservice/v2/orders/${order}?billingZip=${zip}&chain=dsg`

        const req = await got(link, {
        }).then((response) => 
        
        this.res = response.body
        
        )

        return this.res;


    }
    catch (err) {

        console.log(chalk.red('Error Checking Order, retrying...'))
        await sleep(5500)
        checkOrder(order, zip)

    }
}


async function webhook(webhook, order, orderDate, itemName, status, tracking, carrier) {

        await axios.post(webhook, {
            
            content: "",
            embeds: [
              {
                title: `Item Found From Order ${order}`,
                description: itemName,
                "footer": {
                  "text": `Built By Chef#0999 From @thediamondaio`
                },
                "timestamp": new Date(),
                color: 15001324,
                fields: [
                  {
                    name: "Order Date",
                    value: orderDate,
                    inline: true
                  },
                  {
                    name: "Status",
                    value: status,
                    inline: true
                  },
                  {
                    name: `Tracking ${carrier}`,
                    value: `[Here](${tracking})`,
                    inline: true
                  }
                ],
              },
            ],
        }).catch((err) => console.log(chalk.red('Error Sending Webhook')));
    }


module.exports = {
    checkOrder,
    webhook,
}