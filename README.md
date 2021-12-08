# Angry Bender

![](https://c.tenor.com/HIEPKvqyNegAAAAC/angry-bender-mad.gif)

Angry bender is an application* that works alongside [overseerr](https://github.com/sct/overseerr/) to sternly (but fairly) remind users on Discord that the content they requested is already available on a list of blacklisted streaming services.   
By default, it will just mention the offending user in a public channel to shame them, but you can also configure it to auto-approve any non-blacklisted streaming services (see [env var instructions](https://github.com/jariz/angry-bender/blob/latest/ENV_VARS.md)).

_\* = really stretching the definition of that term here_

## Example
<img src="https://jari.lol/9yqTk0pUwk.png" width="550">

## Requirements
- [Overseerr](https://github.com/sct/overseerr/) (duh)
- Node v16+ (or docker)

## Setup
- Install using your preferred method (see below)
- Set the required env vars:
  - Configure overseerr URL and API key (see [env var instructions](https://github.com/jariz/angry-bender/blob/latest/ENV_VARS.md))
  - Configure blacklisted streaming providers (see [env var instructions](https://github.com/jariz/angry-bender/blob/latest/ENV_VARS.md))
  - Create a discord webhook (see [env var instructions](https://github.com/jariz/angry-bender/blob/latest/ENV_VARS.md))
  - Configure a region (see [env var instructions](https://github.com/jariz/angry-bender/blob/latest/ENV_VARS.md))

With the bot up and running:
- Go to Overseerr: Settings → Notifications → Webhook
- Webhook URL: `http://localhost:5454/` (or whatever other host you're running it on)
- JSON payload:

```json
{
  "notification_type": "{{notification_type}}",
  "media_type": "{{media_type}}",
  "media_tmdbId": "{{media_tmdbid}}",
  "media_tvdbid": "{{media_tvdbid}}",
  "discord_id": "{{requestedBy_settings_discordId}}",
  "username": "{{requestedBy_username}}"
}
```

- Test to make sure it works
- Enable at least one of the notification types, or both: 
  - 'Media Requested' (if auto-approval is not enabled)
  - 'Media Automatically Approved' (if it is)
- Save
- You're done!

## Environment variables
Configuration happens through env vars, see [a full description about each of them can be found here.](https://github.com/jariz/angry-bender/blob/latest/ENV_VARS.md).

## Installation (docker - recommended)

### docker-compose (recommended)

```yaml
version: '3.3'
services:
    angry-bender:
        ports:
            - '5454:5454'
        image: ghcr.io/jariz/angry-bender
        environment:
          # Required
          - 'ANGRY_BENDER_OVERSEERR_URL=https://example.com'
          - 'ANGRY_BENDER_OVERSEERR_KEY=REPLACE_ME'
          - 'ANGRY_BENDER_BLACKLIST=8,337'
          - 'ANGRY_BENDER_REGION=NL'
          - 'ANGRY_BENDER_DISCORD_WEBHOOK=https://discord.com/api/webhooks/REPLACE/ME'
          # Optional
          # - 'ANGRY_BENDER_MESSAGE_TEMPLATE=Hey {{user}}! Your request for {{media_title}} was still approved, but this is a kind reminder that {{media_title}} is available on {{streamer}} in {{country}}! Surely you have a login to this streaming service already?'
          # - 'ANGRY_BENDER_APPROVE=0'
```

### docker run
```bash
docker run -p 5454:5454 ghcr.io/jariz/angry-bender \
  -e ANGRY_BENDER_OVERSEERR_URL=https://example.com \
  -e ANGRY_BENDER_OVERSEERR_KEY=REPLACE_ME \
  -e ANGRY_BENDER_BLACKLIST=8,337 \
  -e ANGRY_BENDER_REGION=NL \
  -e ANGRY_BENDER_DISCORD_WEBHOOK=https://discord.com/api/webhooks/REPLACE/ME \
```


## Installation (node)
As mentioned before, use node v16+, anything below it isn't supported/cared about.   

- `cp .env.dist .env`
- `nano .env` (see above)
- `npm ci`
- `npm start`
- Now either never close your terminal, or use [pm2](https://pm2.keymetrics.io/) or something.   
  I don't really care, it's why I recommended docker.
