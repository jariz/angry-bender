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
Configuration happens through env vars, see [here on how to configure them](./ENV_VARS.md].  

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
