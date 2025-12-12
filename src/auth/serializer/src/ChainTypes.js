var ChainTypes;

module.exports = ChainTypes = {};

ChainTypes.reserved_spaces = {
  relative_protocol_ids: 0,
  protocol_ids: 1,
  implementation_ids: 2
};

ChainTypes.operations= {
  account_create:        0,
  account_update:        1,

  transfer:              2,
  transfer_to_qi:        3,
  withdraw_qi:           4,
  set_withdraw_qi_route: 5,
  delegate_qi:           6,

  siming_update:         7,
  siming_set_properties: 8,
  account_siming_adore:  9,
  account_siming_proxy:  10,
  decline_adoring_rights:11,

  custom:                12,
  custom_json:           13,

  request_account_recovery: 14,
  recover_account:       15,
  change_recovery_account:  16,
      
  claim_reward_balance:  17,

  // contract
  create_contract:       18,
  revise_contract:       19,
  release_contract:      20,
  call_contract_function: 21,

  // nfa (non fungible asset)
  action_nfa:            22,

  //**** virtual operations below this point
  hardfork:              23,
  fill_qi_withdraw:      24,
  return_qi_delegation:  25,
  producer_reward:       26,

  nfa_symbol_create:        27,
  nfa_symbol_authority_change: 28,
  nfa_create:               29,
  nfa_transfer:             30,
  nfa_active_approve:       31,
  nfa_convert_resources:    32,
  nfa_asset_transfer:       33,
  nfa_deposit_withdraw:     34,

  reward_feigang:           35,
  reward_cultivation:       36,

  tiandao_year_change:      37,
  tiandao_month_change:     38,
  tiandao_time_change:      39,

  actor_talent_rule_create: 40,
  actor_create:             41,
  actor_born:               42,
  actor_talent_trigger:     43,
  actor_movement:           44,
  actor_grown:              45,
  actor_talk:               46,

  zone_create:              47,
  zone_type_change:         48,
  zone_connect:             49,

  narrate_log:              50,

  shutdown_siming:          51,

  create_proposal:          52,
  update_proposal_votes:    53,
  remove_proposal:          54,
  proposal_execute_operation:  55

};

//types.hpp
ChainTypes.object_type = {
  "null": 0,
  base: 1,
};
