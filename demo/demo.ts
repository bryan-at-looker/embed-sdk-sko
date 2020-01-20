import { LookerEmbedSDK, LookerEmbedDashboard } from '../src/index'
import { lookerHost, dashboardId, dashboardStateFilter } from './demo_config'
const user = require('./demo_user.json')

LookerEmbedSDK.init(lookerHost, '/auth')


const setupDashboard = (dashboard: LookerEmbedDashboard) => {
  const dropdown = document.getElementById('select-dropdown')
  if (dropdown) {
    dropdown.addEventListener('change', (event) => { 
      dashboard.updateFilters({ [dashboardStateFilter]: (event.target as HTMLSelectElement).value }) 
      dashboard.run()
    })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (dashboardId) {
    LookerEmbedSDK.createDashboardWithId(dashboardId)
      .appendTo('#dashboard')
      .withClassName('looker-embed')
      .withFilters({[dashboardStateFilter]: 'California'})
      .withTheme( 'currency_white' )
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
