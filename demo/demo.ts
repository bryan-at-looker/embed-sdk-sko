import { LookerEmbedSDK, LookerEmbedDashboard } from '../src/index'
import { lookerHost, dashboardId, dashboardStateFilter, query_object, query_field_name, dashboard_date_filter, query_date_filter } from './demo_config'
import { LookerSDK, IApiSettings, AuthToken, IError, CorsSession } from '@looker/sdk'

LookerEmbedSDK.init(lookerHost, '/auth')
document.addEventListener('DOMContentLoaded', embedSdkInit)

let sdk: LookerSDK
class EmbedSession extends CorsSession {
  async getToken() {
    console.log(document.location)
    const token = await sdk.ok(sdk.authSession.transport.request<AuthToken,IError>('GET', `${document.location.origin}/token`  ))
    return token
  }
}

const session = new EmbedSession({
  base_url: `https://${lookerHost}:19999`,
  api_version: '3.1'
} as IApiSettings)
sdk = new LookerSDK(session)

const setupDashboard = async (dashboard: LookerEmbedDashboard) => {
  const dropdown = document.getElementById('select-dropdown')
  if (dropdown) {
    dropdown.addEventListener('change', (event) => { 
      dashboard.updateFilters({ [dashboardStateFilter]: (event.target as HTMLSelectElement).value }) 
      dashboard.run()
    })
  }

  const me = await sdk.ok(sdk.me())
  console.log(me)
  const states = await sdk.ok(sdk.run_inline_query( 
    { 
      body: query_object,
      result_format: 'json'
    }
  ))
  addStateOptions(states)
}

function embedSdkInit () {
  if (dashboardId) {
    LookerEmbedSDK.createDashboardWithId(dashboardId)
      .appendTo('#dashboard')
      .withClassName('looker-embed')
      .withFilters({[dashboardStateFilter]: 'New York'})
      .withTheme( 'sko' )
      .on('page:properties:changed', changeHeight )
      .on('dashboard:filters:changed', filtersUpdates)
      .build()
      .connect()
      .then(setupDashboard)
      .catch((error: Error) => {
        console.error('Connection error', error)
      })
  } else {
    document.querySelector<HTMLDivElement>('#demo-dashboard')!.style.display = 'none'
  }
}

async function filtersUpdates( event: any ) {
  console.log(event)
  // instantiate elements, filters, and query objects
  const dashboard_filters: any = (event && event.dashboard && event.dashboard.dashboard_filters) ? event.dashboard && event.dashboard.dashboard_filters : undefined
  let dropdown = document.getElementById('select-dropdown')
  let new_filters = query_object.filters

  // update query object and run query
  
  if (dashboard_filters && ( dashboard_date_filter in dashboard_filters ) ) { // check to make sure our filter is in the changed
    if (dropdown) { // check to make sure we found our elements to update/keep
      new_filters = Object.assign(new_filters, { [query_date_filter]: dashboard_filters[dashboard_date_filter] })
      const states = await sdk.ok(sdk.run_inline_query( 
        { 
          body: Object.assign(query_object, { filters: new_filters }),
          result_format: 'json'
        }
      ))
      addStateOptions(states)
    }
  }
}

function changeHeight( event: any ) {
  console.log(event)
  const div = document.getElementById('dashboard')
  if (event && event.height && div) {
    div.style.height = `${event.height}px`
  }
}

function addStateOptions(data: any) {
  const dropdown = document.getElementById('select-dropdown')
  if (dropdown && data && data.length > 1) {
    data.forEach(function (row: any, i: number) {
      if (query_field_name && row[query_field_name]) {
        // create new option
        const new_option = document.createElement('option')
        new_option.value = row[query_field_name]
        new_option.innerHTML = `${i+1}) ${row[query_field_name]}`
        // replace or create the dropdown item
        if (dropdown.children[i+1]) {
          dropdown.children[i+1].replaceWith(new_option)
        } else {
          dropdown.appendChild(new_option)
        } 
      }
    })
  }
}