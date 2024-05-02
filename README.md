# OAuth2 Reference Client

Project includes two packages:

- Authorization client (Express.js server acting as OAuth2 client)

- Frontend Website. (Vue website)

It is a reference implementation of RFC 6749 Section 4.1:
[RFC 6749 4.1](https://www.rfc-editor.org/rfc/rfc6749#section-4.1)

## Auth client

Express.js server making OAuth2 authorization requests to an Authorization Server on behalf a User. It exchanges an authorization `grant code` for an `access token` from an Authorization Server.

Although this project runs as a server, for the purposes of the documentation it is referred to as the `client` because it makes Authorization requests as a client to OAuth2 authorization services such as Google or Discord.

This `client` may serve the static `website` as a dedicated backend, or operate as a standalone authorization client to which the `website` forwards its Authorization grants.

## Website

Website representing a user authenticating their identity with an Authorization Server. The `client` directs a user's Authentication request to the Authentication server, which redirects back to the `client` with an authorization `grant code`

For the purposes of documentation it is referred to as the `website` or the `User`


## Example Auth Flow:

- Website User requests login with Auth client using Discord Authentication.

- Auth Client redirects User to Discord authentication service

- User authenticates with Discord in browser.

- Discord redirects User to Auth Client with an authorization `grant code`.

- Auth Client uses authorization grant code to obtain a discord `access token`

- After obtaining and storing User's `access token`, Auth Client redirects User back
to Website