import http from 'http';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { whereAlpha2 } from 'iso-3166-1';

dotenv.config();

const {
    ANGRY_BENDER_OVERSEERR_URL: overseerrUrl,
    ANGRY_BENDER_OVERSEERR_KEY: overseerrApiKey,
    ANGRY_BENDER_REGION: region,
    ANGRY_BENDER_DISCORD_WEBHOOK: discordWebhook,
} = process.env;
const blacklist = process.env.ANGRY_BENDER_BLACKLIST.split(',').map(Number);
const messageTemplate =
    process.env.ANGRY_BENDER_MESSAGE_TEMPLATE ??
    'Hey {{user}}!\nYour request for {{media_title}} was still approved, but this is a kind reminder that {{media_title}} is available on {{streamer}} in {{country}}!\nSurely you have a login to this streaming service already?';
const port = parseInt(process.env.ANGRY_BENDER_PORT ?? 5454);
const { country } = whereAlpha2(region);
const shouldApprove = Boolean(process.env.ANGRY_BENDER_APPROVE);

const goodbye = (res) => {
    res.writeHead(204);
    res.end();
};

const server = http.createServer(async (req, res) => {
    try {
        const body = await new Promise((resolve, reject) => {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            });
            req.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (ex) {
                    reject(ex);
                }
            });
            req.on('error', (err) => reject(err));
        });

        const { media_type, media_tmdbId: id, discord_id, username, notification_type } = body;
        switch (notification_type) {
            case 'MEDIA_PENDING':
            case 'MEDIA_AUTO_APPROVED':
                // carry on...
                break;
            default:
                goodbye(res);
                return;
        }

        // get more info from overseerr
        console.log(`${overseerrUrl}/api/v1/${media_type}/${id}`);

        const media = await fetch(`${overseerrUrl}/api/v1/${media_type}/${id}`, {
            headers: {
                'X-Api-Key': overseerrApiKey,
            },
        }).then((r) => r.json());
        console.log(media);
        const provider = media.watchProviders.find(({ iso_3166_1 }) => iso_3166_1 === region);

        if (!provider) {
            console.warn(`WARN: could not find a watch provider for ${media_type} #${id}, region ${region}, aborting.`);
            goodbye(res);
            return;
        }

        const blacklisted = provider.flatrate?.find((streamer) => blacklist.includes(streamer.id));
        if (blacklisted) {
            const message = messageTemplate
                .replace(
                    /{{user}}/g,
                    discord_id
                        ? `<@${discord_id}>`
                        : // fall back to user name if discord id is unknown. kinda beats the purpose of this bot but better than nothing.
                          username
                )
                .replace(/{{media_title}}/g, media.title ?? media.name)
                .replace(/{{streamer}}/g, blacklisted.name)
                .replace(/{{country}}/g, country);

            await fetch(discordWebhook, {
                method: 'POST',
                body: JSON.stringify({
                    content: message,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((resp) => {
                if (!resp.ok) {
                    throw new Error(`${resp.status}: ${resp.statusText}`);
                }
            });
        } else if (shouldApprove && notification_type === 'MEDIA_PENDING') {
            // it's non-blacklisted and we should approve, so go do that now...
        }
    } catch (ex) {
        console.error('ERR:', ex);
        res.writeHead(500);
        res.end();
    }
});

server.listen(port);
console.log(`Webhook listening at ${port}.`);
