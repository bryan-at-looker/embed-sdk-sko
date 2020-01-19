import { LookerEmbedSDK, LookerEmbedLook, LookerEmbedDashboard } from '../src/index'

import { lookerHost, dashboardId } from './demo_config'

LookerEmbedSDK.init(lookerHost, '/auth')

const setupDashboard = (dashboard: LookerEmbedDashboard) => {

}

document.addEventListener('DOMContentLoaded', function () {
  if (dashboardId) {
    LookerEmbedSDK.createDashboardWithId(dashboardId)
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
