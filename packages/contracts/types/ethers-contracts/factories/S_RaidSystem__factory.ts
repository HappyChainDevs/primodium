/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { S_RaidSystem, S_RaidSystemInterface } from "../S_RaidSystem";

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
  "0x60806040523480156200001157600080fd5b5060405162002408380380620024088339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b6121b280620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780636ad0ccab1461007a5780638da5cb5b1461008d578063f2fde38b146100ad575b600080fd5b61006461005f366004611b96565b6100c2565b6040516100719190611c2b565b60405180910390f35b610064610088366004611c8e565b610215565b610095610254565b6040516001600160a01b039091168152602001610071565b6100c06100bb366004611cba565b61028c565b005b6060600080838060200190518101906100db9190611cd7565b9092509050600061010b7fe640406de38b5823e93b424dea7e50f1ad48bbf64449bd5a2cb23e5979ef46256102e2565b604051636667bd4760e11b8152600481018490529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa158015610153573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101779190611d05565b6101da5760405162461bcd60e51b815260206004820152602960248201527f535f5261696453797374656d3a20626174746c6520686173206e6f74207265736044820152681bdb1d9959081e595d60ba1b60648201526084015b60405180910390fd5b6001546101f0906001600160a01b0316836102f9565b6040805160208101849052016040516020818303038152906040529350505050919050565b604080516001600160a01b038416602082015290810182905260609061024b9082016040516020818303038152906040526100c2565b90505b92915050565b60006102877f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031633146102d657604051632f7a8ee160e01b815260040160405180910390fd5b6102df81610b1f565b50565b6000805461024e906001600160a01b031683610b28565b60006103058383610c0a565b90508063ffffffff1660000361031a57505050565b6040516309e4fb4360e31b81527ff9768ca34b9927c41f0ddbd0cce635ef12f645937c14ca934428e6a9c05e48da60048201526000906001600160a01b03851690634f27da1890602401602060405180830381865afa158015610381573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a59190611d27565b6001600160a01b0316630ff4c916846040518263ffffffff1660e01b81526004016103d291815260200190565b600060405180830381865afa1580156103ef573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104179190810190611e4e565b6040516309e4fb4360e31b81527f72887d78bbad0f2696fb431d6367da7b429df07154724db7df055e27fb64080f60048201529091506000906001600160a01b03861690634f27da1890602401602060405180830381865afa158015610481573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a59190611d27565b82516040516307fa648b60e11b81526001600160a01b039290921691630ff4c916916104d79160040190815260200190565b600060405180830381865afa1580156104f4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261051c9190810190611f0d565b905060008061052f878560000151610ef7565b9150915060006040518060600160405280858152602001835167ffffffffffffffff81111561056057610560611b26565b604051908082528060200260200182016040528015610589578160200160208202803683370190505b508152602001835167ffffffffffffffff8111156105a9576105a9611b26565b6040519080825280602002602001820160405280156105d2578160200160208202803683370190505b509052905063ffffffff831615806105e957508351155b156106df576040516309e4fb4360e31b81527f1b2fe01cda07de45f5d26ee59e97e01d843c2e77f9a6c8fbf6e356e3a05ec41160048201526001600160a01b03891690634f27da1890602401602060405180830381865afa158015610652573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106769190611d27565b6001600160a01b031663f2fb000a88836040518363ffffffff1660e01b81526004016106a3929190611f83565b600060405180830381600087803b1580156106bd57600080fd5b505af11580156106d1573d6000803e3d6000fd5b505050505050505050505050565b6040516309e4fb4360e31b81527f36b0c3b8398693329455058d1e1551eb4ed06a51e8f6e8cffc5da55872caccd860048201526000906001600160a01b038a1690634f27da1890602401602060405180830381865afa158015610746573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076a9190611d27565b6001600160a01b0316630ff4c916896040518263ffffffff1660e01b815260040161079791815260200190565b600060405180830381865afa1580156107b4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526107dc9190810190611e4e565b6040516309e4fb4360e31b81527fe2345e0a0b0692473011641fd6de0d8a8965064caa758ceb5da7f022d3dc369660048201529091506000906001600160a01b038b1690634f27da1890602401602060405180830381865afa158015610846573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061086a9190611d27565b905060005b8451811015610a2b57600085828151811061088c5761088c61201b565b602002602001015163ffffffff168a63ffffffff166108ab9190612047565b90506108bd63ffffffff88168261205e565b9050808683815181106108d2576108d261201b565b602002602001015163ffffffff161015610909578582815181106108f8576108f861201b565b602002602001015163ffffffff1690505b806000036109175750610a19565b8582815181106109295761092961201b565b6020026020010151856020015183815181106109475761094761201b565b602002602001019063ffffffff16908163ffffffff168152505080856040015183815181106109785761097861201b565b602002602001019063ffffffff16908163ffffffff16815250506109c3836109bd8a85815181106109ab576109ab61201b565b6020026020010151876000015161116f565b8361119b565b6109ec8c85600001518a85815181106109de576109de61201b565b602002602001015184611225565b50610a168c8a600001518a8581518110610a0857610a0861201b565b602002602001015184611326565b50505b80610a2381612080565b91505061086f565b506040516309e4fb4360e31b81527f1b2fe01cda07de45f5d26ee59e97e01d843c2e77f9a6c8fbf6e356e3a05ec41160048201526001600160a01b038b1690634f27da1890602401602060405180830381865afa158015610a90573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ab49190611d27565b6001600160a01b031663f2fb000a8a856040518363ffffffff1660e01b8152600401610ae1929190611f83565b600060405180830381600087803b158015610afb57600080fd5b505af1158015610b0f573d6000803e3d6000fd5b5050505050505050505050505050565b6102df816113fb565b604051637defd0f560e11b81526004810182905260009081906001600160a01b0385169063fbdfa1ea90602401600060405180830381865afa158015610b72573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610b9a9190810190611f0d565b90508051600003610be15760405162461bcd60e51b81526020600482015260116024820152701a59081b9bdd081c9959da5cdd195c9959607a1b60448201526064016101d1565b610c0281600081518110610bf757610bf761201b565b602002602001015190565b949350505050565b6040516309e4fb4360e31b81527f599ba4f498db499c3d65955cccdb49ec5849ea3e14dc235526a15d98a09e9644600482015260009081906001600160a01b03851690634f27da1890602401602060405180830381865afa158015610c73573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c979190611d27565b6040516309e4fb4360e31b81527f36b0c3b8398693329455058d1e1551eb4ed06a51e8f6e8cffc5da55872caccd860048201529091506000906001600160a01b03861690634f27da1890602401602060405180830381865afa158015610d01573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d259190611d27565b6040516307fa648b60e11b8152600481018690529091506000906001600160a01b03831690630ff4c91690602401600060405180830381865afa158015610d70573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610d989190810190611e4e565b90506000935060005b816020015151811015610eed5781606001518181518110610dc457610dc461201b565b602002602001015163ffffffff1660000315610edb576000610e0888846000015185602001518581518110610dfb57610dfb61201b565b6020026020010151611475565b9050846001600160a01b0316630ff4c916610e4685602001518581518110610e3257610e3261201b565b60200260200101518463ffffffff1661116f565b6040518263ffffffff1660e01b8152600401610e6491815260200190565b602060405180830381865afa158015610e81573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea59190612099565b83606001518381518110610ebb57610ebb61201b565b6020026020010151610ecd91906120b4565b610ed790876120dc565b9550505b80610ee581612080565b915050610da1565b5050505092915050565b6040516309e4fb4360e31b815260008051602061215d833981519152600482015260009060609082906001600160a01b03861690634f27da1890602401602060405180830381865afa158015610f51573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f759190611d27565b6040516309e4fb4360e31b81527f72887d78bbad0f2696fb431d6367da7b429df07154724db7df055e27fb64080f60048201529091506000906001600160a01b03871690634f27da1890602401602060405180830381865afa158015610fdf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110039190611d27565b6001600160a01b0316630ff4c916866040518263ffffffff1660e01b815260040161103091815260200190565b600060405180830381865afa15801561104d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526110759190810190611f0d565b9050805167ffffffffffffffff81111561109157611091611b26565b6040519080825280602002602001820160405280156110ba578160200160208202803683370190505b5092506000935060005b81518110156111655760006110f28383815181106110e4576110e461201b565b60200260200101518861116f565b90506110fe8482611522565b8583815181106111105761111061201b565b602002602001019063ffffffff16908163ffffffff168152505084828151811061113c5761113c61201b565b60200260200101518661114f91906120dc565b955050808061115d90612080565b9150506110c4565b5050509250929050565b604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b60006111a78484611522565b90506001600160a01b03841663d923c3c4846111c385856120dc565b6040516001600160e01b031960e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b15801561120757600080fd5b505af115801561121b573d6000803e3d6000fd5b5050505050505050565b6040516309e4fb4360e31b815260008051602061215d833981519152600482015260009081906001600160a01b03871690634f27da1890602401602060405180830381865afa15801561127c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112a09190611d27565b905060006112ae858761116f565b905060006112bd888888611602565b90508463ffffffff168163ffffffff1611156112ff576112f3888888886112e48888611522565b6112ee91906120dc565b6116d3565b60009350505050610c02565b611310888888846112e48888611522565b61131a8186612100565b98975050505050505050565b6040516309e4fb4360e31b815260008051602061215d833981519152600482015260009081906001600160a01b03871690634f27da1890602401602060405180830381865afa15801561137d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113a19190611d27565b905060006113af858761116f565b905060006113bd8383611522565b90508463ffffffff168163ffffffff1611156113ee576112f3888888886113e48888611522565b6112ee9190612100565b61131088888860006116d3565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b600080611482838561116f565b6040516309e4fb4360e31b81527fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e6004820152909150611517906001600160a01b03871690634f27da1890602401602060405180830381865afa1580156114ed573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115119190611d27565b82611522565b9150505b9392505050565b604051636667bd4760e11b8152600481018290526000906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa15801561156a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061158e9190611d05565b61159957600061024b565b6040516307fa648b60e11b8152600481018390526001600160a01b03841690630ff4c91690602401602060405180830381865afa1580156115de573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061024b9190612099565b6000806116108585856119ad565b6040516309e4fb4360e31b815260008051602061215d833981519152600482015290915060009061169f906001600160a01b03881690634f27da1890602401602060405180830381865afa15801561166c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116909190611d27565b61169a868861116f565b611522565b90508063ffffffff168263ffffffff16116116bf5760009250505061151b565b6116c98183612100565b9695505050505050565b6040516309e4fb4360e31b815260008051602061215d83398151915260048201526000906001600160a01b03861690634f27da1890602401602060405180830381865afa158015611728573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061174c9190611d27565b6040516309e4fb4360e31b81527f8d5746953402e95fa35ce71ddaa7efe7922c48a307985b7d64ea3f27abcb14f960048201529091506000906001600160a01b03871690634f27da1890602401602060405180830381865afa1580156117b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117da9190611d27565b905060006117e8858761116f565b905060006117f68483611522565b905060006118048489611a46565b6040516309e4fb4360e31b81527fd9603ec917f4576302b3c02b1fa235f8e01465fbf139aba994a05da60796f53e600482015290915060009061189c906001600160a01b038c1690634f27da1890602401602060405180830381865afa158015611872573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118969190611d27565b89611a46565b90508263ffffffff168763ffffffff1610156118ea576118bc8784612100565b6118cc9063ffffffff1682612047565b9050818111156118d95750805b6118e3818361211d565b9150611913565b6118f48388612100565b6119049063ffffffff1682612047565b90506119108183612130565b91505b604051631ab06ee560e01b8152600481018a9052602481018390526001600160a01b03861690631ab06ee590604401600060405180830381600087803b15801561195c57600080fd5b505af1158015611970573d6000803e3d6000fd5b5050604051633648f0f160e21b81526004810187905263ffffffff8a1660248201526001600160a01b038916925063d923c3c49150604401610ae1565b6040516309e4fb4360e31b81527f16b501788471b0e2be7833a8d54a049f02ca15b837831d34c5bc534a33e5a1f76004820152600090610c02906001600160a01b03861690634f27da1890602401602060405180830381865afa158015611a18573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a3c9190611d27565b61169a848661116f565b604051636667bd4760e11b8152600481018290526000906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa158015611a8e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ab29190611d05565b611abd57600061024b565b6040516307fa648b60e11b8152600481018390526001600160a01b03841690630ff4c91690602401602060405180830381865afa158015611b02573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061024b9190612143565b634e487b7160e01b600052604160045260246000fd5b6040516080810167ffffffffffffffff81118282101715611b5f57611b5f611b26565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715611b8e57611b8e611b26565b604052919050565b60006020808385031215611ba957600080fd5b823567ffffffffffffffff80821115611bc157600080fd5b818501915085601f830112611bd557600080fd5b813581811115611be757611be7611b26565b611bf9601f8201601f19168501611b65565b91508082528684828501011115611c0f57600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015611c5857858101830151858201604001528201611c3c565b506000604082860101526040601f19601f8301168501019250505092915050565b6001600160a01b03811681146102df57600080fd5b60008060408385031215611ca157600080fd5b8235611cac81611c79565b946020939093013593505050565b600060208284031215611ccc57600080fd5b813561151b81611c79565b60008060408385031215611cea57600080fd5b8251611cf581611c79565b6020939093015192949293505050565b600060208284031215611d1757600080fd5b8151801515811461151b57600080fd5b600060208284031215611d3957600080fd5b815161151b81611c79565b600067ffffffffffffffff821115611d5e57611d5e611b26565b5060051b60200190565b600082601f830112611d7957600080fd5b81516020611d8e611d8983611d44565b611b65565b82815260059290921b84018101918181019086841115611dad57600080fd5b8286015b84811015611dc85780518352918301918301611db1565b509695505050505050565b805163ffffffff81168114611de757600080fd5b919050565b600082601f830112611dfd57600080fd5b81516020611e0d611d8983611d44565b82815260059290921b84018101918181019086841115611e2c57600080fd5b8286015b84811015611dc857611e4181611dd3565b8352918301918301611e30565b600060208284031215611e6057600080fd5b815167ffffffffffffffff80821115611e7857600080fd5b9083019060808286031215611e8c57600080fd5b611e94611b3c565b82518152602083015182811115611eaa57600080fd5b611eb687828601611d68565b602083015250604083015182811115611ece57600080fd5b611eda87828601611dec565b604083015250606083015182811115611ef257600080fd5b611efe87828601611dec565b60608301525095945050505050565b600060208284031215611f1f57600080fd5b815167ffffffffffffffff811115611f3657600080fd5b610c0284828501611d68565b600081518084526020808501945080840160005b83811015611f7857815163ffffffff1687529582019590820190600101611f56565b509495945050505050565b8281526000602060408184015260a0830184516060604086015281815180845260c0870191508483019350600092505b80831015611fd35783518252928401926001929092019190840190611fb3565b50838701519350603f19925082868203016060870152611ff38185611f42565b935050506040850151818584030160808601526120108382611f42565b979650505050505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b808202811582820484141761024e5761024e612031565b60008261207b57634e487b7160e01b600052601260045260246000fd5b500490565b60006001820161209257612092612031565b5060010190565b6000602082840312156120ab57600080fd5b61024b82611dd3565b63ffffffff8181168382160280821691908281146120d4576120d4612031565b505092915050565b63ffffffff8181168382160190808211156120f9576120f9612031565b5092915050565b63ffffffff8281168282160390808211156120f9576120f9612031565b8181038181111561024e5761024e612031565b8082018082111561024e5761024e612031565b60006020828403121561215557600080fd5b505191905056fefba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f1510640845a2646970667358221220d26d4ba82e59812e75dd41a98d5775a040484aab37e7e543c50f567072532b9464736f6c63430008130033";

type S_RaidSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: S_RaidSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class S_RaidSystem__factory extends ContractFactory {
  constructor(...args: S_RaidSystemConstructorParams) {
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
  ): Promise<S_RaidSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<S_RaidSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): S_RaidSystem {
    return super.attach(address) as S_RaidSystem;
  }
  override connect(signer: Signer): S_RaidSystem__factory {
    return super.connect(signer) as S_RaidSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): S_RaidSystemInterface {
    return new utils.Interface(_abi) as S_RaidSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): S_RaidSystem {
    return new Contract(address, _abi, signerOrProvider) as S_RaidSystem;
  }
}
