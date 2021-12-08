# Angry Bender

![](https://c.tenor.com/HIEPKvqyNegAAAAC/angry-bender-mad.gif)

Angry bender is an application* that works alongside [overseerr](https://github.com/sct/overseerr/) to sternly (but fairly) remind users on Discord that the content they requested is already available on a list of blacklisted streaming services.   
By default it will just post an `@` to the offending user in a public channel to shame them, but you can also configure it to auto-approve any non-blacklisted streaming services.

_\* = really stretching the definition of that term here_

## Example
<img src="https://jari.lol/9yqTk0pUwk.png" width="550">

## Requirements
- [Overseerr](https://github.com/sct/overseerr/) (duh)
- Node v16+ (or docker)

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
```
docker run -p 5454:5454 ghcr.io/jariz/angry-bender \
  -e ANGRY_BENDER_OVERSEERR_URL=https://example.com \
  -e ANGRY_BENDER_OVERSEERR_KEY=REPLACE_ME \
  -e ANGRY_BENDER_BLACKLIST=8,337 \
  -e ANGRY_BENDER_REGION=NL \
  -e ANGRY_BENDER_DISCORD_WEBHOOK=https://discord.com/api/webhooks/REPLACE/ME \
```


## Installation (node)
As mentioned before, use node v16+, anything below it isn't supported/cared about.   

- `cp .env .env.dist`
- `nano .env` (see above)
- `npm ci`
- `npm start`
- Now either never close your terminal, or use [pm2](https://pm2.keymetrics.io/) or something.   
  I don't really care, it's why I recommended docker.
