// The address of your Looker instance. Required.
export const looker_host = 'sko2020.dev.looker.com'
// A dashboard that the user can see. Set to 0 to disable dashboard.
export const dashboard_id = 5
// the name of the filter on the dashboard for state
export const dashboard_state_filter = 'State'
// api call to run for state dropdown
export const query_object = {
  "model": "thelook",
  "view": "order_items",
  "fields": [
    "this_period",
    "previous_period",
    "users.state",
    "period_over_period"
  ],
  "filters": {
    "order_items.previous_period_filter": "30 days",
    "order_items.count": ">10"
  },
  "sorts": ["this_period desc"],
  "limit": "10",
  "dynamic_fields": "[{\"measure\":\"this_period\",\"based_on\":\"order_items.total_sale_price\",\"label\":\"This Period\",\"value_format\":null,\"value_format_name\":null,\"_kind_hint\":\"measure\",\"_type_hint\":\"number\",\"filter_expression\":\"${order_items.previous_period} = \\\"This Period\\\"\"},{\"measure\":\"previous_period\",\"based_on\":\"order_items.total_sale_price\",\"label\":\"Previous Period\",\"value_format\":null,\"value_format_name\":null,\"_kind_hint\":\"measure\",\"_type_hint\":\"number\",\"filter_expression\":\"${order_items.previous_period} = \\\"Previous Period\\\"\"},{\"table_calculation\":\"period_over_period\",\"label\":\"Period Over Period\",\"expression\":\"${this_period} / ${previous_period} - 1\",\"value_format\":null,\"value_format_name\":\"percent_1\",\"_kind_hint\":\"measure\",\"_type_hint\":\"number\"}]"
}
// field name we will want to extract for dropdown
export const query_field_name = 'users.state'
// map the dashboard date filter to the query date filter
export const dashboard_date_filter = 'Date'
export const query_date_filter = 'order_items.previous_period_filter'
export const query_calculation = 'period_over_period'

export const logoUrl: string = 'https://lever-client-logos.s3.amazonaws.com/8409767c-5cbe-4597-9d88-193437980b30-1537395984831.png'

// export const apiDropdownQuery = {

//   "view": "order_items",
//   "fields": [
//       "this_period",
//       "previous_period",
//       "users.state"
//   ],
//   "filters": {
//       "order_items.previous_period_filter": "30 days",
//       "users.country": "USA"
//   },
//   "sorts": [
//       "period_over_period desc"
//   ],
//   "limit": "500",
//   "model": "thelook",
//   "dynamic_fields": "[{\"measure\":\"this_period\",\"based_on\":\"order_items.total_sale_price\",\"label\":\"This Period\",\"value_format\":null,\"value_format_name\":null,\"_kind_hint\":\"measure\",\"_type_hint\":\"number\",\"filter_expression\":\"${order_items.previous_period} = \\\"This Period\\\"\"},{\"measure\":\"previous_period\",\"based_on\":\"order_items.total_sale_price\",\"label\":\"Previous Period\",\"value_format\":null,\"value_format_name\":null,\"_kind_hint\":\"measure\",\"_type_hint\":\"number\",\"filter_expression\":\"${order_items.previous_period} = \\\"Previous Period\\\"\"},{\"table_calculation\":\"period_over_period\",\"label\":\"Period Over Period\",\"expression\":\"${this_period} / ${previous_period} - 1\",\"value_format\":null,\"value_format_name\":\"percent_1\",\"_kind_hint\":\"measure\",\"_type_hint\":\"number\"}]"
// }