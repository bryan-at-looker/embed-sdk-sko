import { NodeSession, LookerSDK, NodeSettings, IEmbedSsoUrlParams } from '@looker/sdk'

const settings = new NodeSettings()
const session = new NodeSession(settings)
const sdk = new LookerSDK(session)
const path = require('path')

export function createSignedUrl (src: string, user: any, host: string) {
  return new Promise ( async (resolve, reject) => {
    // create the sso_url_params
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