import types from "./types"
import SerializerImpl from "./serializer"

const {
    //id_type,
    //varint32, fixed_array, object_id_type, vote_id, address,
    uint8, uint16, int16, uint32, uint64, int64, uint128,
    string, string_binary, bytes, bool, array,
    // protocol_id_type,
    static_variant, map, set,
    public_key,
    time_point_sec,
    optional,
    asset,
    asset_symbol
} = types

const future_extensions = types.void
const hardfork_version_vote = types.void
const version = types.void

// Place-holder, their are dependencies on "operation" .. The final list of
// operations is not avialble until the very end of the generated code.
// See: operation.st_operations = ...
const operation = static_variant();
module.exports.operation = operation;

// For module.exports
const Serializer=function(operation_name, serilization_types_object){
    const s = new SerializerImpl(operation_name, serilization_types_object);
    return module.exports[operation_name] = s;
}

const authority = new Serializer(
    "authority",
    {
        weight_threshold: uint32,
        account_auths: map((string), (uint16)),
        key_auths: map((public_key), (uint16))
    }
);

const signed_transaction = new Serializer(
    "signed_transaction",
    {
        ref_block_num: uint16,
        ref_block_prefix: uint32,
        expiration: time_point_sec,
        operations: array(operation),
        extensions: set(future_extensions),
        signatures: array(bytes(65))
    }
);

const signed_block = new Serializer(
    "signed_block", 
    {
        previous: bytes(20),
        timestamp: time_point_sec,
        siming: string,
        transaction_merkle_root: bytes(20),
        extensions: set(static_variant([
            future_extensions,
            version,
            hardfork_version_vote
        ])),
        siming_signature: bytes(65),
        transactions: array(signed_transaction)
    }
);

const block_header = new Serializer(
    "block_header", 
    {
        previous: bytes(20),
        timestamp: time_point_sec,
        siming: string,
        transaction_merkle_root: bytes(20),
        extensions: set(static_variant([
            future_extensions,
            version,
            hardfork_version_vote
        ]))
    }
);

const signed_block_header = new Serializer(
    "signed_block_header", 
    {
        previous: bytes(20),
        timestamp: time_point_sec,
        siming: string,
        transaction_merkle_root: bytes(20),
        extensions: set(static_variant([
            future_extensions,
            version,
            hardfork_version_vote
        ])),
        siming_signature: bytes(65)
    }
);

const account_create = new Serializer(
    "account_create", 
    {
        fee: asset,
        creator: string,
        new_account_name: string,
        owner: authority,
        active: authority,
        posting: authority,
        memo_key: public_key,
        json_metadata: string
    }
);

const account_update = new Serializer(
    "account_update", 
    {
        account: string,
        owner: optional(authority),
        active: optional(authority),
        posting: optional(authority),
        memo_key: public_key,
        json_metadata: string
    }
);

const transfer = new Serializer(
    "transfer", 
    {
        from: string,
        to: string,
        amount: asset,
        memo: string
    }
);

const transfer_to_qi = new Serializer(
    "transfer_to_qi", 
    {
        from: string,
        to: string,
        amount: asset
    }
);

const withdraw_qi = new Serializer(
    "withdraw_qi", 
    {
        account: string,
        qi: asset
    }
);

const set_withdraw_qi_route = new Serializer(
    "set_withdraw_qi_route", 
    {
        from_account: string,
        to_account: string,
        percent: uint16,
        auto_vest: bool
    }
);

const delegate_qi = new Serializer(
    "delegate_qi", 
    {
        delegator: string,
        delegatee: string,
        qi: asset
    }
);

const price = new Serializer(
    "price",
    {
        base: asset,
        quote: asset
    }
);



const chain_properties = new Serializer(
    "chain_properties",
    {
        account_creation_fee: asset,
        maximum_block_size: uint32,
        proposal_adopted_votes_threshold: uint32
    }
);

const siming_update = new Serializer(
    "siming_update",
    {
        owner: string,
        url: string,
        block_signing_key: public_key,
        props: chain_properties,
        fee: asset
    }
);

const siming_set_properties = new Serializer(
    "siming_set_properties",
    {
        owner: string,
        props: string,
        extensions: set(future_extensions)
    }
);

const account_siming_adore = new Serializer(
    "account_siming_adore",
    {
        account: string,
        siming: string,
        approve: bool
    }
);

const account_siming_proxy = new Serializer(
    "account_siming_proxy",
    {
        account: string,
        proxy: string
    }
);

const decline_adoring_rights = new Serializer(
    "decline_adoring_rights",
    {
        account: string,
        decline: bool
    }
);

const custom = new Serializer(
    "custom", 
    {
        required_auths: set(string),
        id: uint16,
        data: bytes()
    }
);

const custom_json = new Serializer(
    "custom_json",
    {
        required_auths: set(string),
        required_posting_auths: set(string),
        id: string,
        json: string
    }
);

const request_account_recovery = new Serializer(
    "request_account_recovery", 
    {
        recovery_account: string,
        account_to_recover: string,
        new_owner_authority: authority,
        extensions: set(future_extensions)
    }
);

const recover_account = new Serializer(
    "recover_account",
    {
        account_to_recover: string,
        new_owner_authority: authority,
        recent_owner_authority: authority,
        extensions: set(future_extensions)
    }
);

const change_recovery_account = new Serializer(
    "change_recovery_account",
    {
        account_to_recover: string,
        new_recovery_account: string,
        extensions: set(future_extensions)
    }
);

const claim_reward_balance = new Serializer(
    "claim_reward_balance",
    {
        account: string,
        reward_yang: asset,
        reward_qi: asset,
        reward_feigang: asset
    }
);

const create_contract = new Serializer(
    "create_contract", 
    {
        owner: string,      // 合约创建者
        name: string,       // 合约名字
        data: string,       // 合约内容
        extensions: array(string)
    }
);

const revise_contract = new Serializer(
    "revise_contract", 
    {
        reviser: string,        // 合约创建者
        contract_name: string,  // 合约名字
        data: string,           // 合约内容
        extensions: array(string)
    }
);

const release_contract = new Serializer(
    "release_contract", 
    {
        owner: string,          // 合约创建者
        contract_name: string  // 合约名字
    }
);

const call_contract_function = new Serializer(
    "call_contract_function", 
    {
        caller: string,             // 合约调用者
        contract_name: string,      // 合约名
        function_name: string,      // 目标函数名
        value_list: array(string),  // 参数列表
        extensions: array(string)   // 以字符串表示的参数列表，用于不能实现 lua_types 的协议（比如taiyijs项目）
    }
);

const action_nfa = new Serializer(
    "action_nfa",
    {
        caller: string,             // nfa operator account name
        id: int64,                  // nfa id
        action: string,             // nfa action name
        value_list: array(string),  // nfa action function parameter value list
        extensions: array(string)   // 以字符串表示的参数列表，用于不能实现 lua_types 的协议（比如taiyijs项目）
    }
);

const hardfork = new Serializer(
    "hardfork",
    {
        hardfork_id: uint32
    }
);

const return_qi = new Serializer(
    "return_qi",
    {
        account: string,
        qi: asset
    }
);

const fill_qi_withdraw = new Serializer(
    "fill_qi_withdraw",
    {
        from_account: string,
        to_account: string,
        withdrawn: asset,
        deposited: asset
    }
);

const return_qi_delegation = new Serializer(
    "return_qi_delegation",
    {
        account: string,
        qi: asset
    }
);

const producer_reward = new Serializer(
    "producer_reward",
    {
        producer: string,
        reward: asset
    }
);

const nfa_symbol_create = new Serializer(
    "nfa_symbol_create",
    {
        creator: string,
        symbol: string,
        describe: string,
        default_contract: string,
        max_count: uint64,
        min_equivalent_qi: uint64,
        is_sbt: bool
    }
);

const nfa_symbol_authority_change = new Serializer(
    "nfa_symbol_authority_change",
    {
        creator: string,
        symbol: string,
        authority_account: string,
        authority_nfa_symbol: string
    }
);

const nfa_create = new Serializer(
    "nfa_create",
    {
        creator: string,
        symbol: string
    }
);

const nfa_transfer = new Serializer(
    "nfa_transfer",
    {
        from: string,
        to: string,
        id: int64
    }
);

const nfa_active_approve = new Serializer(
    "nfa_active_approve",
    {
        owner: string,
        active_account: string,
        id: int64
    }
);

const nfa_convert_resources = new Serializer(
    "nfa_convert_resources",
    {
        nfa: int64,
        owner: string,
        qi: asset,
        resource: asset,
        is_qi_to_resource: bool
    }
);

const nfa_asset_transfer = new Serializer(
    "nfa_asset_transfer",
    {
        from: int64,
        from_owner: string,
        to: int64,
        to_owner: string,
        amount: asset
    }
);

const nfa_deposit_withdraw = new Serializer(
    "nfa_deposit_withdraw",
    {
        nfa: int64,
        account: string,
        deposited: asset,
        withdrawn: asset
    }
);

const reward_feigang = new Serializer(
    "reward_feigang",
    {
        from: string,
        from_nfa: int64,
        to: string,
        qi: asset
    }
);

const reward_cultivation = new Serializer(
    "reward_cultivation",
    {
        account: string,
        nfa: int64,
        qi: asset
    }
);

const tiandao_year_change = new Serializer(
    "tiandao_year_change",
    {
        messager: string,
        years: uint32,
        months: uint32,
        times: uint32,
        live_num: uint32,
        dead_num: uint32,
        born_this_year: uint32,
        dead_this_year: uint32
    }
);

const tiandao_month_change = new Serializer(
    "tiandao_month_change",
    {
        messager: string,
        years: uint32,
        months: uint32,
        times: uint32,
    }
);

const tiandao_time_change = new Serializer(
    "tiandao_time_change",
    {
        messager: string,
        years: uint32,
        months: uint32,
        times: uint32,
    }
);

const actor_talent_rule_create = new Serializer(
    "actor_talent_rule_create",
    {
        creator: string,
        contract: string
    }
);

const actor_create = new Serializer(
    "actor_create",
    {
        creator: string,
        family_name: string,
        last_name: string,
        nfa: int64
    }
);

const actor_born = new Serializer(
    "actor_born",
    {
        owner: string,
        name: string,
        zone: string,
        nfa: int64
    }
);

const actor_talent_trigger = new Serializer(
    "actor_talent_trigger",
    {
        owner: string,
        name: string,
        nfa: int64,
        tid: int64,
        title: string,
        desc: string,
        age: uint32
    }
);

const actor_movement = new Serializer(
    "actor_movement",
    {
        owner: string,
        name: string,
        from_zone: string,
        to_zone: string,
        nfa: int64
    }
);

const actor_grown = new Serializer(
    "actor_grown",
    {
        owner: string,
        name: string,
        nfa: int64,
        years: uint32,
        months: uint32,
        days: uint32,
        tod: uint32,
        times: uint32,
        age: uint32,
        health: int64
    }
);

const actor_talk = new Serializer(
    "actor_talk",
    {
        v_years: uint32,
        v_months: uint32,
        v_days: uint32,
        v_tod: uint32,
        v_times: uint32,
        actor_owner: string,
        actor_nfa: int64,
        actor_name: string,
        target_owner: string,
        target_nfa: int64,
        target_name: string,
        content: string,
        favor_delta_actor: int64,
        favor_delta_target: int64
    }
);

const zone_create = new Serializer(
    "zone_create",
    {
        creator: string,
        name: string,
        nfa: int64
    }
);

const zone_type_change = new Serializer(
    "zone_type_change",
    {
        creator: string,
        name: string,
        nfa: int64,
        type: string
    }
);

const zone_connect = new Serializer(
    "zone_connect",
    {
        account: string,
        zone1: string,
        zone1_nfa: int64,
        zone2: string,
        zone2_nfa: int64
    }
);

const narrate_log = new Serializer(
    "narrate_log",
    {
        narrator: string,
        nfa: int64,
        years: uint32,
        months: uint32,
        days: uint32,
        tod: uint32,
        times: uint32,
        log: string
    }
);

const shutdown_siming = new Serializer(
    "shutdown_siming",
    {
        owner: string
    }
);

const create_proposal = new Serializer(
    "create_proposal",
    {
        creator: string,
        contract_name: string,
        function_name: string,
        value_list: array(string),
        end_date: time_point_sec,
        subject: string
    }
);

const update_proposal_votes = new Serializer(
    "update_proposal_votes",
    {
        voter: string,
        proposal_ids: set(int64),
        approve: bool
    }
);

const remove_proposal = new Serializer(
    "remove_proposal",
    {
        proposal_owner: string,
        proposal_ids: set(int64),
    }
);

const proposal_execute = new Serializer(
    "proposal_execute",
    {
        contract_name: string,
        function_name: string,
        value_list: array(string),
        subject: string
    }
);

operation.st_operations = [
    account_create,           //0
    account_update,           //1

    transfer,                 //2
    transfer_to_qi,           //3
    withdraw_qi,              //4
    set_withdraw_qi_route,    //5
    delegate_qi,              //6

    siming_update,            //7
    siming_set_properties,    //8
    account_siming_adore,     //9
    account_siming_proxy,     //10
    decline_adoring_rights,   //11

    custom,                   //12
    custom_json,              //13

    request_account_recovery, //14
    recover_account,          //15
    change_recovery_account,  //16
        
    claim_reward_balance,     //17

    // contract
    create_contract,          //18
    revise_contract,          //19
    release_contract,         //20
    call_contract_function,   //21

    // nfa (non fungible asset)
    action_nfa,               //22

    //**********************************************//
    //**** virtual operations below this point **** //
    //**********************************************//

    hardfork,                 //23
    fill_qi_withdraw,         //24
    return_qi_delegation,     //25
    producer_reward,          //26

    nfa_symbol_create,        //27
    nfa_symbol_authority_change, //28
    nfa_create,               //29
    nfa_transfer,             //30
    nfa_active_approve,       //31
    nfa_convert_resources,    //32
    nfa_asset_transfer,       //33
    nfa_deposit_withdraw,     //34

    reward_feigang,           //35
    reward_cultivation,       //36

    tiandao_year_change,      //37
    tiandao_month_change,     //38
    tiandao_time_change,      //39

    actor_talent_rule_create, //40
    actor_create,             //41
    actor_born,               //42
    actor_talent_trigger,     //43
    actor_movement,           //44
    actor_grown,              //45
    actor_talk,               //46

    zone_create,              //47
    zone_type_change,         //48
    zone_connect,             //49

    narrate_log,              //50

    shutdown_siming,          //51

    create_proposal,          //52
    update_proposal_votes,    //53
    remove_proposal,          //54
    proposal_execute          //55
  ];

const transaction = new Serializer(
    "transaction", {
    ref_block_num: uint16,
    ref_block_prefix: uint32,
    expiration: time_point_sec,
    operations: array(operation),
    extensions: set(future_extensions)
}
);

// Custom Types (do not over-write)

const encrypted_memo = new Serializer(
    "encrypted_memo",
    {from: public_key,
    to: public_key,
    nonce: uint64,
    check: uint32,
    encrypted: string_binary}
);
