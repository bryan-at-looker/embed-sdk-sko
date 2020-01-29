import { LookerEmbedSDK, LookerEmbedDashboard } from '../src/index'
import { looker_host, dashboard_id } from './demo_config'
import {  dashboard_state_filter } from './demo_config'

const user = require('./demo_user.json')


LookerEmbedSDK.init(looker_host, '/auth')

const setupDashboard = async (dashboard: LookerEmbedDashboard) => {
  const dropdown = document.getElementById('select-dropdown')
  if (dropdown) {
    dropdown.addEventListener('change', (event) => {
      dashboard.updateFilters({ [dashboard_state_filter]: (event.target as HTMLSelectElement).value })
      dashboard.run()
    })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (dashboard_id) {
    LookerEmbedSDK.createDashboardWithId(dashboard_id)
      .appendTo('#dashboard')
      .withClassName('looker-embed')
      .withFilters({[dashboard_state_filter]: 'California'})
      .withTheme('sko')
      .on('page:properties:changed', changeHeight )
      .build()
      .connect()
      .then(setupDashboard)
      .catch((error: Error) => {
        console.error('Connection error', error)
      })
  } else {
    document.querySelector<HTMLDivElement>('#demo-dashboard')!.style.display = 'none'
  }

})

function changeHeight( event: any ) {
  console.log(event)
  const div = document.getElementById('dashboard')
  if (event && event.height && div) {
    div.style.height = `${event.height+15}px`
  }
}
