# OpenID Connect

OpenID Connect is a OAuth2 extension support by most identity providers.

## Configure OpenID Connect

To configure OIDC, you must set the following environment variables:

| Variable                         | Usage                                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `OIDC_CLIENT_ID`                 | Client ID from your identity provider.                                                                      |
| `OIDC_CLIENT_SECRET`             | Client secret from your identity provider.                                                                  |
| `OIDC_ADMIN_GROUP`               | Grant admin to users with this group configured in your identity provider. Tested with Authentik.           |
| `DISABLE_SIMPLE_AUTH` (optional) | Disable simple auth                                                                                         |
| `OIDC_USERNAME_CLAIM` (optional) | Change the field that Drop pulls the username claim from. Users are merged based on their usernames         |
| `OIDC_PROVIDER_NAME` (optional)  | Change the name of the oidc provider that is displayed on the sign-in page. Default is `external provider`. |

And then, you must configure **either**:

#### `OIDC_WELLKNOWN`: A unprotected endpoint that returns a OIDC well-known JSON. Fetched on startup

---

#### Individual endpoints

| Variable             | Usage                                                                     |
| -------------------- | ------------------------------------------------------------------------- |
| `OIDC_AUTHORIZATION` | Authorization endpoint. Usually ends with `authorize`.                    |
| `OIDC_TOKEN`         | Token endpoint. Usually ends with `token`.                                |
| `OIDC_USERINFO`      | Userinfo endpoint. Usually ends with `userinfo`.                          |
| `OIDC_SCOPES`        | Comma separated list of scopes. Requires, at least, `openid` and `email`. |

## Redirect URL

Drop uses the `EXTERNAL_URL` environment variable to create the callback URL: `$EXTERNAL_URL/auth/callback/oidc`.
