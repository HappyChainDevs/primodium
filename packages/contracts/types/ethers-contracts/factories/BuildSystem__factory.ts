/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { BuildSystem, BuildSystemInterface } from "../BuildSystem";

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
        internalType: "uint256",
        name: "blockType",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "int32",
            name: "x",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "y",
            type: "int32",
          },
        ],
        internalType: "struct Coord",
        name: "coord",
        type: "tuple",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620022c3380380620022c38339810160408190526200003491620001dc565b8181620000413362000149565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200021b565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8680549092161790555050505062000242565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001d957600080fd5b50565b60008060408385031215620001f057600080fd5b8251620001fd81620001c3565b60208401519092506200021081620001c3565b809150509250929050565b6000602082840312156200022e57600080fd5b81516200023b81620001c3565b9392505050565b61207180620002526000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a578063f2f9a0ab146100a7578063f2fde38b146100ba575b600080fd5b61006461005f366004611bb0565b6100cf565b6040516100719190611c63565b60405180910390f35b610082610cc3565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100646100b5366004611cde565b610d08565b6100cd6100c8366004611d5d565b610d5c565b005b6060600080838060200190518101906100e89190611d9a565b60008054929450909250906101339073ffffffffffffffffffffffffffffffffffffffff167f30f1c358b0a577824afcc8e464bcbd763eba254820a547b425765e75cc511f1e610dd8565b600080549192509061017b9073ffffffffffffffffffffffffffffffffffffffff167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c7540610dd8565b60008054919250906101c39073ffffffffffffffffffffffffffffffffffffffff167fefd95b731bdcc0cab498dd7b56526d6fc3bfdb6cf60ca7aa7080b8ffd6f093c7610dd8565b600080549192509061020b9073ffffffffffffffffffffffffffffffffffffffff167f3ee10300fdf6d2b8c2d0e95fa7b5b8c50aa50e011ba55c2da6a5bccfeafb0340610dd8565b60008054919250906102539073ffffffffffffffffffffffffffffffffffffffff167fdc3cacc2d15d28652a856c19dad6c52f89a9758d65cc63a93e584264f3cd5036610dd8565b600080549192509061029b9073ffffffffffffffffffffffffffffffffffffffff167f5ceb6515ed98d13c424cf71200ed3a18f9d8499e8d3e67d9ef7924b68de3e8cf610dd8565b905060006102de886040518060400160405280600881526020017f6275696c64696e67000000000000000000000000000000000000000000000000815250610f24565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff88169063cccf7a8e90602401602060405180830381865afa15801561034c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103709190611e09565b15610402576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603460248201527f5b4275696c6453797374656d5d2043616e6e6f74206275696c64206f6e20612060448201527f6e6f6e2d656d70747920636f6f7264696e61746500000000000000000000000060648201526084015b60405180910390fd5b61040b89610fb6565b610497576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603d60248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f72636865642074686520726571756972656420546563686e6f6c6f677900000060648201526084016103f9565b6104a4828487338d611052565b610556576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604960248201527f5b4275696c6453797374656d5d206275696c64206c696d69742072656163686560448201527f642e2075706772616465206d61696e2062617365206f722064657374726f792060648201527f6275696c64696e67730000000000000000000000000000000000000000000000608482015260a4016103f9565b7fa46f07eacbf4d6e00c069dad9b4c9bc8743bfbbc08b881083f59c909623871dd8914806105a357507f15acbad8bb5d229c84e3aaeb8cbd8e364b5d0451254865ef4b5f206d4df1a4c589145b806105cd57507f7c2b38e44a35ee8d16b0c3780dc10b14624e0dfc9c7d997bd7b2017018c0bdfd89145b806105f757507f02fcfa4b1578384291174d276cbf45b9ac04481dd20e0e1051d17c6fa0028ce389145b8061062157507fc21aa058984e15d171bb2700beb69b4647d2526ebb432e9a3aee422dd64f038f89145b8061064b57507f9d47592473d41327e0ccb0bb0dc69c74c6ac29b77beb0fc78a1c84d6f0bcf87b89145b610878577f2e6aeb9730616b6b2a8fcc7abab3fc9310bd984b40af25951e4bdc63a056b92d890161087857600080546106ba9073ffffffffffffffffffffffffffffffffffffffff167fe458f11f65f682a3ca2a47dc42132280325cc5080104dfc7fadff5901e10856e610dd8565b6040517fcccf7a8e00000000000000000000000000000000000000000000000000000000815233600482015290915073ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa158015610727573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061074b9190611e09565b156107d8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603d60248201527f5b4275696c6453797374656d5d2043616e6e6f74206275696c64206d6f72652060448201527f7468616e206f6e65206d61696e2062617365207065722077616c6c657400000060648201526084016103f9565b73ffffffffffffffffffffffffffffffffffffffff811663dcb14c2f336040517fffffffff0000000000000000000000000000000000000000000000000000000060e084901b16815260048101919091528b51600390810b602483015260208d0151900b6044820152606401600060405180830381600087803b15801561085e57600080fd5b505af1158015610872573d6000803e3d6000fd5b50505050505b6108818961107a565b61090d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603460248201527f5b4275696c6453797374656d5d20596f7520646f206e6f74206861766520746860448201527f65207265717569726564207265736f757263657300000000000000000000000060648201526084016103f9565b7f2e6aeb9730616b6b2a8fcc7abab3fc9310bd984b40af25951e4bdc63a056b92d89016109bb576040517f1ab06ee50000000000000000000000000000000000000000000000000000000081523360048201526024810182905273ffffffffffffffffffffffffffffffffffffffff861690631ab06ee590604401600060405180830381600087803b1580156109a257600080fd5b505af11580156109b6573d6000803e3d6000fd5b505050505b6109c5828a611116565b15610a705773ffffffffffffffffffffffffffffffffffffffff8316631ab06ee5336109f68633611246565b611246565b610a01906001611e5a565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015610a5757600080fd5b505af1158015610a6b573d6000803e3d6000fd5b505050505b6040517f1ab06ee5000000000000000000000000000000000000000000000000000000008152600481018290526001602482015273ffffffffffffffffffffffffffffffffffffffff861690631ab06ee590604401600060405180830381600087803b158015610adf57600080fd5b505af1158015610af3573d6000803e3d6000fd5b50506040517f1ab06ee500000000000000000000000000000000000000000000000000000000815260048101849052602481018c905273ffffffffffffffffffffffffffffffffffffffff8a169250631ab06ee59150604401600060405180830381600087803b158015610b6657600080fd5b505af1158015610b7a573d6000803e3d6000fd5b50505073ffffffffffffffffffffffffffffffffffffffff87169050631ab06ee582336040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015610bf357600080fd5b505af1158015610c07573d6000803e3d6000fd5b50506040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810184905243602482015273ffffffffffffffffffffffffffffffffffffffff87169250631ab06ee59150604401600060405180830381600087803b158015610c7957600080fd5b505af1158015610c8d573d6000803e3d6000fd5b5050505080604051602001610ca491815260200190565b6040516020818303038152906040529950505050505050505050919050565b6000610d037f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b6060610d538383604051602001610d3f9291909182528051600390810b60208085019190915290910151900b604082015260600190565b6040516020818303038152906040526100cf565b90505b92915050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610dcc576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610dd581611372565b50565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610e48573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610e8e9190810190611e6d565b90508051600003610efb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f74207265676973746572656400000000000000000000000000000060448201526064016103f9565b610f1c81600081518110610f1157610f11611f13565b602002602001015190565b949350505050565b6000826000015160e01b836020015160e01b83610f4090611f42565b604080517fffffffff0000000000000000000000000000000000000000000000000000000094851660208201529390921660248401527fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000016602883015201604051602081830303815290604052610d5390611f92565b600080548190610ffc9073ffffffffffffffffffffffffffffffffffffffff167f1203294d5b2b02e65b2344f70a790c2cf726d3822e7f267d74f37f3dbe44a344610dd8565b60008054919250906110449073ffffffffffffffffffffffffffffffffffffffff167f260499b7630a3093f2f4ce16a340a578c70fc65603511dac57ee1b24a87e1ecd610dd8565b9050610f1c8282863361137b565b600061105e8683611116565b15806110705750611070858585611543565b9695505050505050565b6000805481906110c09073ffffffffffffffffffffffffffffffffffffffff167f0842a184a814d4c9890dc4a7e03369a83e6e7490abc9f169e0062ff4011b8a23610dd8565b60008054919250906111089073ffffffffffffffffffffffffffffffffffffffff167ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f1510640845610dd8565b9050610f1c8282863361157a565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015611184573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111a89190611e09565b1580610d5357506040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa15801561121a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061123e9190611e09565b159392505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa1580156112b4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112d89190611e09565b6112e3576000610d53565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa15801561134e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d539190611fd7565b610dd581611a4a565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff86169063cccf7a8e90602401602060405180830381865afa1580156113e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061140d9190611e09565b158061153a57508373ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e6114db8773ffffffffffffffffffffffffffffffffffffffff16630ff4c916876040518263ffffffff1660e01b815260040161146e91815260200190565b602060405180830381865afa15801561148b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114af9190611fd7565b604080516020808201939093528082018890528151808203830181526060909101909152805191012090565b6040518263ffffffff1660e01b81526004016114f991815260200190565b602060405180830381865afa158015611516573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061153a9190611e09565b95945050505050565b6000806115508484611246565b9050600061155e8683611af6565b9050600061156c8786611afd565b919091109695505050505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff86169063cccf7a8e90602401602060405180830381865afa1580156115e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061160c9190611e09565b61161857506001610f1c565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905260009073ffffffffffffffffffffffffffffffffffffffff871690630ff4c91690602401600060405180830381865afa158015611686573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526116cc9190810190611e6d565b90506000815167ffffffffffffffff8111156116ea576116ea611b09565b604051908082528060200260200182016040528015611713578160200160208202803683370190505b5090506000825167ffffffffffffffff81111561173257611732611b09565b60405190808252806020026020018201604052801561175b578160200160208202803683370190505b50905060005b8351811015611a3b576117b8886109f186848151811061178357611783611f13565b60200260200101518a604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b8382815181106117ca576117ca611f13565b602002602001018181525050611824886109f18684815181106117ef576117ef611f13565b602002602001015189604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b82828151811061183657611836611f13565b60200260200101818152505081818151811061185457611854611f13565b602002602001015183828151811061186e5761186e611f13565b6020026020010151111561194b5760005b8181101561193d578873ffffffffffffffffffffffffffffffffffffffff16631ab06ee56118b887848151811061178357611783611f13565b8584815181106118ca576118ca611f13565b60200260200101516040518363ffffffff1660e01b81526004016118f8929190918252602082015260400190565b600060405180830381600087803b15801561191257600080fd5b505af1158015611926573d6000803e3d6000fd5b50505050808061193590611ff0565b91505061187f565b506000945050505050610f1c565b8773ffffffffffffffffffffffffffffffffffffffff16631ab06ee561197c8684815181106117ef576117ef611f13565b85848151811061198e5761198e611f13565b60200260200101518585815181106119a8576119a8611f13565b60200260200101516119ba9190612028565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015611a1057600080fd5b505af1158015611a24573d6000803e3d6000fd5b505050508080611a3390611ff0565b915050611761565b50600198975050505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6064610d56565b6000610d538383611246565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715611b5b57611b5b611b09565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715611ba857611ba8611b09565b604052919050565b60006020808385031215611bc357600080fd5b823567ffffffffffffffff80821115611bdb57600080fd5b818501915085601f830112611bef57600080fd5b813581811115611c0157611c01611b09565b611c31847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601611b61565b91508082528684828501011115611c4757600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015611c9057858101830151858201604001528201611c74565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b8060030b8114610dd557600080fd5b6000808284036060811215611cf257600080fd5b8335925060407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe082011215611d2657600080fd5b50611d2f611b38565b6020840135611d3d81611ccf565b81526040840135611d4d81611ccf565b6020820152919491935090915050565b600060208284031215611d6f57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114611d9357600080fd5b9392505050565b6000808284036060811215611dae57600080fd5b8351925060407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe082011215611de257600080fd5b50611deb611b38565b6020840151611df981611ccf565b81526040840151611d4d81611ccf565b600060208284031215611e1b57600080fd5b81518015158114611d9357600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820180821115610d5657610d56611e2b565b60006020808385031215611e8057600080fd5b825167ffffffffffffffff80821115611e9857600080fd5b818501915085601f830112611eac57600080fd5b815181811115611ebe57611ebe611b09565b8060051b9150611ecf848301611b61565b8181529183018401918481019088841115611ee957600080fd5b938501935b83851015611f0757845182529385019390850190611eee565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000815160208301517fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000080821693506018831015611f8a5780818460180360031b1b83161693505b505050919050565b80516020808301519190811015611fd1577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8160200360031b1b821691505b50919050565b600060208284031215611fe957600080fd5b5051919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361202157612021611e2b565b5060010190565b81810381811115610d5657610d56611e2b56fea264697066735822122024721c917c58df52ef24f73fb42b780d06f0d8bc33c45b09731b6c610f0e6dad64736f6c63430008130033";

type BuildSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BuildSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BuildSystem__factory extends ContractFactory {
  constructor(...args: BuildSystemConstructorParams) {
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
  ): Promise<BuildSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<BuildSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): BuildSystem {
    return super.attach(address) as BuildSystem;
  }
  override connect(signer: Signer): BuildSystem__factory {
    return super.connect(signer) as BuildSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BuildSystemInterface {
    return new utils.Interface(_abi) as BuildSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BuildSystem {
    return new Contract(address, _abi, signerOrProvider) as BuildSystem;
  }
}
