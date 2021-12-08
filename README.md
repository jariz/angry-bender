# Angry Bender

![](https://c.tenor.com/HIEPKvqyNegAAAAC/angry-bender-mad.gif)

Angry bender is an application* that works alongside [overseerr](https://github.com/sct/overseerr/) to sternly (but fairly) remind users on Discord that the content they requested is already available on a list of blacklisted streaming services.   
By default it will just post an `@` to the offending user in a public channel to shame them, but you can also configure it to auto-approve any non-blacklisted streaming services.

_\* = really stretching the definition of that term here_

## Example
![](https://jari.lol/4SZ0zRxPck.png)


## Requirements
- [Overseerr](https://github.com/sct/overseerr/) (duh)
- Node v16+ (or docker)

## Environment variables
Configuration happens through env vars, see below on how to configure them.  

| Name                            | Required? | Description                                                                                                                                                                                                                                                                                                                                                                                                              | Example                                                                                                                                                                                                                       |
|---------------------------------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `ANGRY_BENDER_OVERSEERR_URL`    | ✅         | The base url of your overseerr instance. Without trailing slash.                                                                                                                                                                                                                                                                                                                                                         | `https://example.com`                                                                                                                                                                                                         |
| `ANGRY_BENDER_OVERSEERR_KEY`    | ✅         | Your overseerr API key, which can be found in the general settings.                                                                                                                                                                                                                                                                                                                                                      | `REPLACE_ME`                                                                                                                                                                                                                  |
| `ANGRY_BENDER_BLACKLIST`        | ✅         | 'Blacklisted' streaming providers, separated by comma.<br>See the full list of ID's [here for movies](https://api.themoviedb.org/3/watch/providers/movie?api_key=427f17f9cb6a8ab5769eb309472022ca&watch_region=NL), and [here for tv shows](https://api.themoviedb.org/3/watch/providers/tv?api_key=427f17f9cb6a8ab5769eb309472022ca&watch_region=NL).<br>Don't forget to update the `&watch_region=` param to your own. | `8,337` (netflix, disney+)                                                                                                                                                                                                    |
| `ANGRY_BENDER_REGION`           | ✅         | An [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country code used for checking if requested media is available in this region.                                                                                                                                                                                                                                                                                 | `NL`                                                                                                                                                                                                                          |
| `ANGRY_BENDER_DISCORD_WEBHOOK`  | ✅         | The webhook for the channel that the bot will be posting to.<br>Channel settings → Integrations → Webhooks → New.<br>After creating, use the URL discord gives you for this value.                                                                                                                                                                                                                                       | `https://discord.com/api/webhooks/REPLACE/ME`                                                                                                                                                                                 |
| `ANGRY_BENDER_MESSAGE_TEMPLATE` | ❌         | The template the bot should send to the discord channel. The template variables used in the example are all the variables that exist.                                                                                                                                                                                                                                                                                    | `Hey {{user}}! Your request for {{media_title}} was still approved, but this is a kind reminder that {{media_title}} is available on {{streamer}} in {{country}}! Surely you have a login to this streaming service already?` |
| `ANGRY_BENDER_APPROVE`          | ❌         | Should the bot approve/reject requests? Not enabled by default.<br>If enabled, will approve a request if it's not blacklisted, and reject it otherwise.<br>Will only work if auto approval hasn't already been enabled in overseerr's permissions.                                                                                                                                                                       | `1`                                                                                                                                                                                                                           |
| `ANGRY_BENDER_PORT`             | ❌         | Configure a non-default port for angry bender's webhook to run on.                                                                                                                                                                                                                                                                                                                                                       | `5454`                                                                                                                                                                                                                        |

## Installation (docker - recommended)
- [docker compose example here]
- [docker run example here]

## Installation (node)
As mentioned before, use node v16+, anything below it isn't supported/cared about.   

- `cp .env .env.dist`
- `nano .env` (see above)
- `npm ci`
- `npm start`
- Now either never close your terminal, or use [pm2](https://pm2.keymetrics.io/) or something.   
  I don't really care, it's why I recommended docker.
