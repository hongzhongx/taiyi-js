module.exports = [
  {
    "roles": ["active", "owner"],
    "operation": "account_create",
    "params": [
      "fee",
      "creator",
      "new_account_name",
      "owner",
      "active",
      "posting",
      "memo_key",
      "json_metadata"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "account_update",
    "params": [
      "account",
      "owner",
      "active",
      "posting",
      "memo_key",
      "json_metadata"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "transfer",
    "params": [
      "from",
      "to",
      "amount",
      "memo"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "transfer_to_qi",
    "params": [
      "from",
      "to",
      "amount"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "withdraw_qi",
    "params": [
      "account",
      "qi"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "set_withdraw_qi_route",
    "params": [
      "from_account",
      "to_account",
      "percent",
      "auto_vest"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "delegate_qi",
    "params": [
      "delegator",
      "delegatee",
      "qi"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "siming_update",
    "params": [
      "owner",
      "url",
      "block_signing_key",
      "props",
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "siming_set_properties",
    "params": [
      "owner",
      "props",
      "extensions"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "account_siming_adore",
    "params": [
      "account",
      "siming",
      "approve"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "account_siming_proxy",
    "params": [
      "account",
      "proxy"
    ]
  },
  {
    "roles": ["owner"],
    "operation": "decline_adoring_rights",
    "params": [
      "account",
      "decline"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "custom",
    "params": [
      "required_auths",
      "id",
      "data"
    ]
  },
  {
    "roles": ["posting", "active", "owner"],
    "operation": "custom_json",
    "params": [
      "required_auths",
      "required_posting_auths",
      "id",
      "json"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "request_account_recovery",
    "params": [
      "recovery_account",
      "account_to_recover",
      "new_owner_authority",
      "extensions"
    ]
  },
  {
    "roles": ["owner"],
    "operation": "recover_account",
    "params": [
      "account_to_recover",
      "new_owner_authority",
      "recent_owner_authority",
      "extensions"
    ]
  },
  {
    "roles": ["owner"],
    "operation": "change_recovery_account",
    "params": [
      "account_to_recover",
      "new_recovery_account",
      "extensions"
    ]
  },
  {
    "roles": ["posting", "active", "owner"],
    "operation": "claim_reward_balance",
    "params": [
      "account",
      "reward_yang",
      "reward_qi",
      "reward_feigang"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "create_contract",
    "params": [
      "owner",
      "name",
      "data",
      "extensions"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "revise_contract",
    "params": [
      "reviser",
      "contract_name",
      "data",
      "extensions"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "release_contract",
    "params": [
      "owner",
      "contract_name"
    ]
  },
  {
    "roles": ["active", "owner"],
    "operation": "call_contract_function",
    "params": [
      "caller",
      "contract_name",
      "function_name",
      "value_list",
      "extensions"
    ]
  },
  {
    "roles": ["active"],
    "operation": "action_nfa",
    "params": [
      "caller",
      "id",
      "action",
      "value_list",
      "extensions"
    ]
  }
];
