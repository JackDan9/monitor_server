'use strict';

module.exports = app => {
  const { STRING, DATE, INTEGER, BOOLEAN } = app.Sequelize;

  const Issue = app.model.define('issue', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
  })
}
// data = Table_monitor_child_cses(
//   cse_id=self.format_cse_data(raw.get('id'), param=None),
//   cse_type=1,
//   cse_key=self.format_cse_data(raw.get('key'), param=None),
//   cse_parent_id=self.format_cse_data(raw.get('fields').get('customfield_10007'), param=None),
//   cse_summary=self.format_cse_data(raw.get('fields').get('summary'), param=None),
//   project_name=self.format_cse_data(raw.get('fields').get('customfield_11190'), param=None),
//   project_manager=self.format_cse_data(raw.get('fields').get('customfield_11275'), param='displayName'),
//   customer_name=self.format_cse_data(self.format_data(raw.get('fields').get('customfield_11191')), param=None),
//   customer_level=self.format_cse_data(self.format_data(raw.get('fields').get('customfield_11271')), param='value'),
//   inspection_frequency=self.format_cse_data(self.format_data(raw.get('fields').get('customfield_11258')), param='value'),
//   service_start_time=self.format_cse_data(raw.get('fields').get('customfield_11288'), param=None),
//   service_end_time=self.format_cse_data(raw.get('fields').get('customfield_11273'), param=None),
//   service_type=self.format_cse_data(self.format_data(raw.get('fields').get('customfield_11289')), param='value'),
//   service_area=self.format_cse_data(self.format_data(raw.get('fields').get('customfield_11303')), param='value'),
//   deploy_status=self.format_cse_data(raw.get('fields').get('customfield_11219'), param='value'),
//   env_type=self.format_cse_data(raw.get('fields').get('customfield_11220'), param='value'),
//   current_version=self.format_cse_data(raw.get('fields').get('customfield_11196'), param='name'),
//   implement_name=self.format_cse_data(raw.get('fields').get('customfield_11315'), param=None),
//   child_cse_extra_1=None,
//   child_cse_extra_2=None,
//   child_cse_extra_3=None,
//   created_at=datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
//   updated_at=datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
// )
