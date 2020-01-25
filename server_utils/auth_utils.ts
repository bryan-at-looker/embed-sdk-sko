import { NodeSession, LookerSDK, NodeSettings, IEmbedSsoUrlParams } from '@looker/sdk'

const settings = new NodeSettings()
const session = new NodeSession(settings)
const sdk = new LookerSDK(session)
const path = require('path')

export function createSignedUrl (
  src: string,
  user: any,
  host: string
) {

  return new Promise ( async (resolve, reject) => {

    // create the object used to pass into create_sso_embed_url
    const sso_url_params: IEmbedSsoUrlParams = Object.assign(
      {
        target_url: `https://${path.join(host,src)}`
      }, 
      user
    )
  
    // send it to the Looker API to get a signed url
    const sso_obj = await sdk.ok(sdk.create_sso_embed_url(sso_url_params))

    // return the signed url back to the server
    resolve( sso_obj.url)
  })
}

export async function accessToken (external_user_id: string) {
  var user = await sdk.ok(sdk.user_for_credential('embed',external_user_id))
  if (user && user.id) {
    return await sdk.ok(sdk.login_user(user['id']))
  } else {
    return {}
  }
}