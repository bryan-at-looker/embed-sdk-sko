/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Looker Data Sciences, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

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