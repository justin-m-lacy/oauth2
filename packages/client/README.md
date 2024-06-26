# OAUTH2 SAMPLE SERVER

This is a simple reference server for implementing an OAuth2 authentication server
using typescript and express.

It includes a example route for authenticating with Discord.

More OAuth2 examples to follow.


## Environment

`SESSION_SECRET`

Secret for encrypting setting session cookies.

`HOST_URI`

URI without port of 'this' auth host. Used to redirect OAuth2 requests back to this server.

`HOST_PORT`

Host of 'this' auth host.

`SERVE_STATIC` [boolean]

Whether to serve static website files with this server. If true, website files are served from the path `STATIC_PATH` environment variable, or from `./`
 If false, the server behaves soley as an authentication server, and the static website may be served
 from another host.

`STATIC_PATH`

Path to static website files, if hosting static content.

`WEB_HOST`

URI of site actually serving files. Include both protocol and port number.

Separating WEB_HOST from auth host allows separating
the authenticating server and the file host for micro-architectures.
You must correctly configure Content-Security-Policy on the web host.



## Auth

### Discord

#### Discord Application

To use Discord OAuth2 Authentication you must first create a Discord application and enabled OAuth2.

[https://discord.com/developers/](https://discord.com/developers/)

[Discord OAuth2 Docs](https://discord.com/developers/docs/topics/oauth2)

#### Discord Variables

Store Discord authentication information in `src/auth/discord-auth.json`
This file should not be committed to any public repository.

Check Discord documentation to ensure the Discord API and AUTH endpoints are up to date.

```json
{
	"CLIENT_ID": string,
	"PUBLIC_KEY": string,
	"CLIENT_SECRET": string,
	"API_ENDPOINT": "https://discord.com/api/v10",
	"AUTH_ENDPOINT": "https://discord.com/oauth2/authorize",
	"TOKEN_ROUTE": "/oauth2/token",
	"SCOPE": string
}
```

`SCOPE`
	List of authorization scopes requested from Discord.