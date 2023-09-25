/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  S_ResolveRaidUnitsSystem,
  S_ResolveRaidUnitsSystemInterface,
} from "../S_ResolveRaidUnitsSystem";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IWorld",
        name: "_world",
        type: "address",
      },
      {
        internalType: "address",
        name: "_components",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Ownable__NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "Ownable__NotTransitiveOwner",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "args",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "playerAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "battleEntity",
        type: "uint256",
      },
    ],
    name: "executeTyped",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200232b3803806200232b8339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b6120d580620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780636ad0ccab1461007a5780638da5cb5b1461008d578063f2fde38b146100ad575b600080fd5b61006461005f366004611a99565b6100c2565b6040516100719190611b2e565b60405180910390f35b610064610088366004611b91565b610346565b610095610383565b6040516001600160a01b039091168152602001610071565b6100c06100bb366004611bbd565b6103bb565b005b6060600080838060200190518101906100db9190611bda565b9150915061017f600160009054906101000a90046001600160a01b03166001600160a01b0316630d59332e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610135573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101599190611c08565b7fb8a52632f0fa53342d6f565f4dc61c9da5e2efc28b66119fedd7e968574a7470610411565b6001600160a01b0316336001600160a01b03161461020a5760405162461bcd60e51b815260206004820152603760248201527f535f5265736f6c766552616964556e69747353797374656d3a206f6e6c79205260448201527f61696453797374656d2063616e2063616c6c207468697300000000000000000060648201526084015b60405180910390fd5b60006102357fe640406de38b5823e93b424dea7e50f1ad48bbf64449bd5a2cb23e5979ef46256104f3565b604051636667bd4760e11b8152600481018490529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa15801561027d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102a19190611c25565b61030b5760405162461bcd60e51b815260206004820152603560248201527f535f5265736f6c766552616964556e69747353797374656d3a20626174746c65604482015274081a185cc81b9bdd081c995cdbdb1d9959081e595d605a1b6064820152608401610201565b600154610321906001600160a01b031683610510565b6040805160208101849052016040516020818303038152906040529350505050919050565b604080516001600160a01b038416602082015290810182905260609061037c9082016040516020818303038152906040526100c2565b9392505050565b60006103b67f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b0316331461040557604051632f7a8ee160e01b815260040160405180910390fd5b61040e81610cae565b50565b604051637defd0f560e11b81526004810182905260009081906001600160a01b0385169063fbdfa1ea90602401600060405180830381865afa15801561045b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104839190810190611cd6565b905080516000036104ca5760405162461bcd60e51b81526020600482015260116024820152701a59081b9bdd081c9959da5cdd195c9959607a1b6044820152606401610201565b6104eb816000815181106104e0576104e0611d0b565b602002602001015190565b949350505050565b6000805461050a906001600160a01b031683610411565b92915050565b6040516309e4fb4360e31b81527f54503ed0adc1ee183e210d2dafda9a19dbe669eaef7621753179cec7de6492f560048201526000906001600160a01b03841690634f27da1890602401602060405180830381865afa158015610577573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061059b9190611c08565b6001600160a01b0316630ff4c916836040518263ffffffff1660e01b81526004016105c891815260200190565b602060405180830381865afa1580156105e5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106099190611d21565b6040516309e4fb4360e31b81527fe640406de38b5823e93b424dea7e50f1ad48bbf64449bd5a2cb23e5979ef462560048201529091506000906001600160a01b03851690634f27da1890602401602060405180830381865afa158015610673573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106979190611c08565b6001600160a01b0316630ff4c916846040518263ffffffff1660e01b81526004016106c491815260200190565b600060405180830381865afa1580156106e1573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526107099190810190611db5565b6040516309e4fb4360e31b81527f36b0c3b8398693329455058d1e1551eb4ed06a51e8f6e8cffc5da55872caccd860048201529091506000906001600160a01b03861690634f27da1890602401602060405180830381865afa158015610773573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107979190611c08565b6001600160a01b0316630ff4c916856040518263ffffffff1660e01b81526004016107c491815260200190565b600060405180830381865afa1580156107e1573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526108099190810190611e66565b6040516309e4fb4360e31b81527ff9768ca34b9927c41f0ddbd0cce635ef12f645937c14ca934428e6a9c05e48da60048201529091506000906001600160a01b03871690634f27da1890602401602060405180830381865afa158015610873573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108979190611c08565b6001600160a01b0316630ff4c916866040518263ffffffff1660e01b81526004016108c491815260200190565b600060405180830381865afa1580156108e1573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109099190810190611e66565b825184519192506000911461091f578251610922565b81515b6040516309e4fb4360e31b81527f1637987787e4c0e1b376a0a4c44d9803d16014ee56d45bdca1e885d52368752460048201529091506000906001600160a01b03891690634f27da1890602401602060405180830381865afa15801561098c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109b09190611c08565b604051621326ab60e01b8152600160048201526001600160a01b039190911690621326ab90602401600060405180830381865afa1580156109f5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610a1d9190810190611cd6565b90506000610a2f898660000151610cb7565b865186519192509003610b5257610a47898489610cf6565b60005b866020015151811015610b4c57600086606001518281518110610a6f57610a6f611d0b565b602002602001015163ffffffff161115610b3a57610af38a8760000151858481518110610a9e57610a9e611d0b565b60200260200101518a602001518581518110610abc57610abc611d0b565b60200260200101518a606001518681518110610ada57610ada611d0b565b6020026020010151610aec9190611f3b565b6000610f59565b610b3a8a876000015184868581518110610b0f57610b0f611d0b565b60200260200101518b602001518681518110610b2d57610b2d611d0b565b60200260200101516113da565b80610b4481611f5f565b915050610a4a565b50610ca3565b60005b8251811015610ca157600086606001518281518110610b7657610b76611d0b565b602002602001015163ffffffff161115610bd257610bd28a8760000151858481518110610ba557610ba5611d0b565b602002602001015189606001518581518110610bc357610bc3611d0b565b60200260200101516000610f59565b600085606001518281518110610bea57610bea611d0b565b602002602001015163ffffffff161115610c8f57610c558a8760000151858481518110610c1957610c19611d0b565b60200260200101518a604001518581518110610c3757610c37611d0b565b602002602001015189606001518681518110610ada57610ada611d0b565b610c8f8a88600001518a868581518110610c7157610c71611d0b565b60200260200101518b604001518681518110610b2d57610b2d611d0b565b80610c9981611f5f565b915050610b55565b505b505050505050505050565b61040e816115a9565b604080516001600160a01b03841660208201529081018290526000906060015b60408051601f1981840301815291905280516020909101209392505050565b6040516309e4fb4360e31b81527f1637987787e4c0e1b376a0a4c44d9803d16014ee56d45bdca1e885d52368752460048201526000906001600160a01b03851690634f27da1890602401602060405180830381865afa158015610d5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d819190611c08565b604051621326ab60e01b8152600160048201526001600160a01b039190911690621326ab90602401600060405180830381865afa158015610dc6573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610dee9190810190611cd6565b6040516309e4fb4360e31b815260008051602061208083398151915260048201529091506000906001600160a01b03861690634f27da1890602401602060405180830381865afa158015610e46573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e6a9190611c08565b905060005b8251811015610f51576000610e9e848381518110610e8f57610e8f611d0b565b60200260200101518787611623565b604051636667bd4760e11b8152600481018290529091506001600160a01b0384169063cccf7a8e90602401602060405180830381865afa158015610ee6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f0a9190611c25565b15610f3e57610f3e878787878681518110610f2757610f27611d0b565b6020026020010151610f39888761165a565b61173a565b5080610f4981611f5f565b915050610e6f565b505050505050565b63ffffffff8216156113d3576040516309e4fb4360e31b81527f391ed979ad48ef48aa0e385aaffe280328c830054d2153bba1cf3da0b7bf45ab60048201526000906001600160a01b03871690634f27da1890602401602060405180830381865afa158015610fcc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ff09190611c08565b90506000610fff878787611962565b90506000611013868363ffffffff16611a0d565b604051636667bd4760e11b8152600481018290529091506001600160a01b0384169063cccf7a8e90602401602060405180830381865afa15801561105b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061107f9190611c25565b61108b575050506113d3565b6040516309e4fb4360e31b81527f4f2e352c22f4d6e8661eee4a98890fa6dfead6e74bc680ee4c52da1cc198d7c960048201526000906001600160a01b038a1690634f27da1890602401602060405180830381865afa1580156110f2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111169190611c08565b6040516307fa648b60e11b8152600481018490529091506000906001600160a01b03861690630ff4c91690602401600060405180830381865afa158015611161573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526111899190810190611f78565b516040516307fa648b60e11b8152600481018590529091506000906001600160a01b03871690630ff4c91690602401600060405180830381865afa1580156111d5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526111fd9190810190611f78565b60200151905060005b82518110156113cb5781818151811061122157611221611d0b565b602002602001015163ffffffff16600003156113b95760008983838151811061124c5761124c611d0b565b602002602001015161125e919061201f565b9050600061128585848151811061127757611277611d0b565b60200260200101518e611a0d565b9050891561131357856001600160a01b031663d923c3c482846112a88a8661165a565b6112b29190612047565b6040516001600160e01b031960e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b1580156112f657600080fd5b505af115801561130a573d6000803e3d6000fd5b505050506113b6565b61131d868261165a565b63ffffffff168263ffffffff161161135457856001600160a01b031663d923c3c4828461134a8a8661165a565b6112b29190611f3b565b604051633648f0f160e21b815260048101829052600060248201526001600160a01b0387169063d923c3c490604401600060405180830381600087803b15801561139d57600080fd5b505af11580156113b1573d6000803e3d6000fd5b505050505b50505b806113c381611f5f565b915050611206565b505050505050505b5050505050565b60006113e7838686611623565b905063ffffffff8216156114d8576040516309e4fb4360e31b815260008051602061208083398151915260048201526001600160a01b03871690634f27da1890602401602060405180830381865afa158015611447573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061146b9190611c08565b604051633648f0f160e21b81526004810183905263ffffffff841660248201526001600160a01b03919091169063d923c3c490604401600060405180830381600087803b1580156114bb57600080fd5b505af11580156114cf573d6000803e3d6000fd5b50505050610f51565b6040516309e4fb4360e31b815260008051602061208083398151915260048201526001600160a01b03871690634f27da1890602401602060405180830381865afa15801561152a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061154e9190611c08565b6001600160a01b0316634cc82215826040518263ffffffff1660e01b815260040161157b91815260200190565b600060405180830381600087803b15801561159557600080fd5b505af1158015610ca1573d6000803e3d6000fd5b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6040805160208082019590955280820193909352606080840192909252805180840390920182526080909201909152805191012090565b604051636667bd4760e11b8152600481018290526000906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa1580156116a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116c69190611c25565b6116d157600061037c565b6040516307fa648b60e11b8152600481018390526001600160a01b03841690630ff4c91690602401602060405180830381865afa158015611716573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061037c9190612064565b63ffffffff8116156113d3576000611753838686611623565b6040516309e4fb4360e31b815260008051602061208083398151915260048201529091506000906001600160a01b03881690634f27da1890602401602060405180830381865afa1580156117ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117cf9190611c08565b905060006117dd828461165a565b90508063ffffffff168463ffffffff1611156118615760405162461bcd60e51b815260206004820152603d60248201527f4c69625570646174655370616365526f636b3a20756e6974436f756e74206d7560448201527f7374206265206c657373207468616e2063757272556e6974436f756e740000006064820152608401610201565b61186f888887876000610f59565b600061187b8583611f3b565b63ffffffff161115611902576001600160a01b03821663d923c3c4846118a18785611f3b565b6040516001600160e01b031960e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b1580156118e557600080fd5b505af11580156118f9573d6000803e3d6000fd5b50505050611958565b604051634cc8221560e01b8152600481018490526001600160a01b03831690634cc8221590602401600060405180830381600087803b15801561194457600080fd5b505af11580156113cb573d6000803e3d6000fd5b5050505050505050565b60008061196f8385611a0d565b6040516309e4fb4360e31b81527fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e6004820152909150611a04906001600160a01b03871690634f27da1890602401602060405180830381865afa1580156119da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119fe9190611c08565b8261165a565b95945050505050565b6040805160208101849052908101829052600090606001610cd7565b634e487b7160e01b600052604160045260246000fd5b6040516080810167ffffffffffffffff81118282101715611a6257611a62611a29565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715611a9157611a91611a29565b604052919050565b60006020808385031215611aac57600080fd5b823567ffffffffffffffff80821115611ac457600080fd5b818501915085601f830112611ad857600080fd5b813581811115611aea57611aea611a29565b611afc601f8201601f19168501611a68565b91508082528684828501011115611b1257600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015611b5b57858101830151858201604001528201611b3f565b506000604082860101526040601f19601f8301168501019250505092915050565b6001600160a01b038116811461040e57600080fd5b60008060408385031215611ba457600080fd5b8235611baf81611b7c565b946020939093013593505050565b600060208284031215611bcf57600080fd5b813561037c81611b7c565b60008060408385031215611bed57600080fd5b8251611bf881611b7c565b6020939093015192949293505050565b600060208284031215611c1a57600080fd5b815161037c81611b7c565b600060208284031215611c3757600080fd5b8151801515811461037c57600080fd5b600067ffffffffffffffff821115611c6157611c61611a29565b5060051b60200190565b600082601f830112611c7c57600080fd5b81516020611c91611c8c83611c47565b611a68565b82815260059290921b84018101918181019086841115611cb057600080fd5b8286015b84811015611ccb5780518352918301918301611cb4565b509695505050505050565b600060208284031215611ce857600080fd5b815167ffffffffffffffff811115611cff57600080fd5b6104eb84828501611c6b565b634e487b7160e01b600052603260045260246000fd5b600060208284031215611d3357600080fd5b5051919050565b805163ffffffff81168114611d4e57600080fd5b919050565b600082601f830112611d6457600080fd5b81516020611d74611c8c83611c47565b82815260059290921b84018101918181019086841115611d9357600080fd5b8286015b84811015611ccb57611da881611d3a565b8352918301918301611d97565b600060208284031215611dc757600080fd5b815167ffffffffffffffff80821115611ddf57600080fd5b9083019060608286031215611df357600080fd5b604051606081018181108382111715611e0e57611e0e611a29565b60405282518152602083015182811115611e2757600080fd5b611e3387828601611d53565b602083015250604083015182811115611e4b57600080fd5b611e5787828601611d53565b60408301525095945050505050565b600060208284031215611e7857600080fd5b815167ffffffffffffffff80821115611e9057600080fd5b9083019060808286031215611ea457600080fd5b611eac611a3f565b82518152602083015182811115611ec257600080fd5b611ece87828601611c6b565b602083015250604083015182811115611ee657600080fd5b611ef287828601611d53565b604083015250606083015182811115611f0a57600080fd5b611f1687828601611d53565b60608301525095945050505050565b634e487b7160e01b600052601160045260246000fd5b63ffffffff828116828216039080821115611f5857611f58611f25565b5092915050565b600060018201611f7157611f71611f25565b5060010190565b600060208284031215611f8a57600080fd5b815167ffffffffffffffff80821115611fa257600080fd5b9083019060408286031215611fb657600080fd5b604051604081018181108382111715611fd157611fd1611a29565b604052825182811115611fe357600080fd5b611fef87828601611c6b565b82525060208301518281111561200457600080fd5b61201087828601611d53565b60208301525095945050505050565b63ffffffff81811683821602808216919082811461203f5761203f611f25565b505092915050565b63ffffffff818116838216019080821115611f5857611f58611f25565b60006020828403121561207657600080fd5b61037c82611d3a56fe8bd637b568ed540cabc10b49a9f3688fe5b7e4b706298b6cd07c2e1ed5600e93a26469706673582212200370a2c93a82a940e9955293254b40f8f9e90bc905ea571a7c97202923a1a86f64736f6c63430008130033";

type S_ResolveRaidUnitsSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: S_ResolveRaidUnitsSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class S_ResolveRaidUnitsSystem__factory extends ContractFactory {
  constructor(...args: S_ResolveRaidUnitsSystemConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<S_ResolveRaidUnitsSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<S_ResolveRaidUnitsSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): S_ResolveRaidUnitsSystem {
    return super.attach(address) as S_ResolveRaidUnitsSystem;
  }
  override connect(signer: Signer): S_ResolveRaidUnitsSystem__factory {
    return super.connect(signer) as S_ResolveRaidUnitsSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): S_ResolveRaidUnitsSystemInterface {
    return new utils.Interface(_abi) as S_ResolveRaidUnitsSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): S_ResolveRaidUnitsSystem {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as S_ResolveRaidUnitsSystem;
  }
}
