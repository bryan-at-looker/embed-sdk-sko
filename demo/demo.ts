import { LookerEmbedSDK, LookerEmbedDashboard } from '../src/index'
import { looker_host, dashboard_id } from './demo_config'
const user = require('./demo_user.json')

LookerEmbedSDK.init(looker_host, '/auth')


const setupDashboard = (dashboard: LookerEmbedDashboard) => {

}

document.addEventListener('DOMContentLoaded', function () {
  if (dashboard_id) {
    LookerEmbedSDK.createDashboardWithId(dashboard_id)
      .appendTo('#dashboard')
      .withClassName('looker-embed')
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
