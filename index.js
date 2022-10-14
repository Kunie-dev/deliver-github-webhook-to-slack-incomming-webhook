const { IncomingWebhook } = require('@slack/webhook');

exports.handler = async (event, context) => {
    const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

    try {
        const bodyJson = JSON.parse(event.body);

        if (bodyJson && bodyJson.ref_type === 'tag') {
            // Send the notification
            await webhook.send({
                text: `*New release*\nVersion: ${bodyJson.ref}\nRelease: ${bodyJson.repository.html_url}/releases/tag/${bodyJson.ref}`,
                unfurl_links: true
            });
        }

    } catch (e) {
        console.error(e);
    }

    return {
        statusCode: '200'
    };
};
