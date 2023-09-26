/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  S_UpdatePlayerStorageSystem,
  S_UpdatePlayerStorageSystemInterface,
} from "../S_UpdatePlayerStorageSystem";

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
        name: "buildingEntity",
        type: "uint256",
      },
      {
        internalType: "enum EActionType",
        name: "actionType",
        type: "uint8",
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
  "0x60806040523480156200001157600080fd5b5060405162001f4b38038062001f4b8339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b611cf580620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe1461005157806327b450991461007a5780638da5cb5b1461008d578063f2fde38b146100ad575b600080fd5b61006461005f36600461182a565b6100c2565b60405161007191906118ce565b60405180910390f35b610064610088366004611923565b610a6b565b610095610aa1565b6040516001600160a01b039091168152602001610071565b6100c06100bb366004611965565b610ad9565b005b6060610164600160009054906101000a90046001600160a01b03166001600160a01b0316630d59332e6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561011a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061013e9190611982565b7f57247228bbd93ac6953378fea0f421ebc4978d448f7383f1a2816e6ca6e2894d610b2f565b6001600160a01b0316336001600160a01b031614806102285750600154604080516306ac999760e11b81529051610213926001600160a01b031691630d59332e9160048083019260209291908290030181865afa1580156101c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101ed9190611982565b7f70fd2d99c63cf9e9a219a7907c6a0bc55a0323de6daf9c9d0b03e2d7250d73d2610b2f565b6001600160a01b0316336001600160a01b0316145b806102d85750600154604080516306ac999760e11b815290516102c3926001600160a01b031691630d59332e9160048083019260209291908290030181865afa158015610279573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061029d9190611982565b7ff39d315320cdfe464ad36c5d26133acfadb3c7e2d9a6ac9e6bb331cb612f42a8610b2f565b6001600160a01b0316336001600160a01b0316145b806103885750600154604080516306ac999760e11b81529051610373926001600160a01b031691630d59332e9160048083019260209291908290030181865afa158015610329573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061034d9190611982565b7fd573ac88b34a4d827762c3f1e7dc53ea2b602480271c42f976cd9097a3985a01610b2f565b6001600160a01b0316336001600160a01b0316145b61044b5760405162461bcd60e51b815260206004820152607760248201527f535f557064617465506c6179657253746f7261676553797374656d3a204f6e6c60448201527f79204275696c6453797374656d2c20537061776e53797374656d2c205570677260648201527f6164654275696c64696e6753797374656d2c2044657374726f7953797374656d60848201527f2063616e2063616c6c20746869732066756e6374696f6e00000000000000000060a482015260c4015b60405180910390fd5b600080600084806020019051810190610464919061199f565b925092509250600061050c600160009054906101000a90046001600160a01b03166001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104e69190611982565b7f7562ebb298d855e68fb2922ace89e271e36c031fb473ee4be72f900215d523c5610b2f565b6001600160a01b0316630ff4c916846040518263ffffffff1660e01b815260040161053991815260200190565b602060405180830381865afa158015610556573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057a91906119d7565b9050600061061e600160009054906101000a90046001600160a01b03166001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f89190611982565b7fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e610b2f565b6001600160a01b0316630ff4c916856040518263ffffffff1660e01b815260040161064b91815260200190565b602060405180830381865afa158015610668573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061068c91906119f0565b905060006001600160a01b0386166001546040516309e4fb4360e31b81527f72887d78bbad0f2696fb431d6367da7b429df07154724db7df055e27fb64080f60048201529192506000916001600160a01b0390911690634f27da1890602401602060405180830381865afa158015610708573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072c9190611982565b90506000610740858563ffffffff16610c13565b6040516307fa648b60e11b8152600481018290529091506000906001600160a01b03841690630ff4c91690602401600060405180830381865afa15801561078b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526107b39190810190611a16565b905060005b8151811015610a5c5760006107fc600160009054906101000a90046001600160a01b0316878585815181106107ef576107ef611abc565b6020026020010151610c3f565b9050600061082c600160009054906101000a90046001600160a01b0316868686815181106107ef576107ef611abc565b905060018a600281111561084257610842611ad2565b0361089f5760006108638a61085860018c611afe565b63ffffffff16610c13565b9050610891600160009054906101000a90046001600160a01b0316828787815181106107ef576107ef611abc565b61089b9083611afe565b9150505b600154604080516306ac999760e11b81529051610934926001600160a01b031691630d59332e9160048083019260209291908290030181865afa1580156108ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061090e9190611982565b7fbfa4e94ac46519bd16654700fe5605b990ceb82f41218bfba1018857ba5e01c0610b2f565b6001600160a01b0316636ad0ccab8d86868151811061095557610955611abc565b60200260200101516040518363ffffffff1660e01b815260040161098e9291906001600160a01b03929092168252602082015260400190565b6000604051808303816000875af11580156109ad573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109d59190810190611b22565b506001548451610a47916001600160a01b03169089908790879081106109fd576109fd611abc565b6020026020010151600280811115610a1757610a17611ad2565b8e6002811115610a2957610a29611ad2565b14610a3d57610a388587611b99565b610cdd565b610a388587611afe565b50508080610a5490611bb6565b9150506107b8565b50505050505050505050919050565b6060610a99848484604051602001610a8593929190611bcf565b6040516020818303038152906040526100c2565b949350505050565b6000610ad47f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b03163314610b2357604051632f7a8ee160e01b815260040160405180910390fd5b610b2c8161124c565b50565b604051637defd0f560e11b81526004810182905260009081906001600160a01b0385169063fbdfa1ea90602401600060405180830381865afa158015610b79573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610ba19190810190611a16565b90508051600003610be85760405162461bcd60e51b81526020600482015260116024820152701a59081b9bdd081c9959da5cdd195c9959607a1b6044820152606401610442565b610c0981600081518110610bfe57610bfe611abc565b602002602001015190565b9150505b92915050565b604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b6040516309e4fb4360e31b81527f16b501788471b0e2be7833a8d54a049f02ca15b837831d34c5bc534a33e5a1f76004820152600090610a99906001600160a01b03861690634f27da1890602401602060405180830381865afa158015610caa573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cce9190611982565b610cd88486610c13565b611255565b6040516309e4fb4360e31b81527f16b501788471b0e2be7833a8d54a049f02ca15b837831d34c5bc534a33e5a1f760048201526000906001600160a01b03861690634f27da1890602401602060405180830381865afa158015610d44573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d689190611982565b6040516309e4fb4360e31b81527f72887d78bbad0f2696fb431d6367da7b429df07154724db7df055e27fb64080f60048201529091506000906001600160a01b03871690634f27da1890602401602060405180830381865afa158015610dd2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610df69190611982565b90506000610e048587610c13565b604051636667bd4760e11b8152600481018290529091506001600160a01b0384169063cccf7a8e90602401602060405180830381865afa158015610e4c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e709190611c12565b61112557604051636667bd4760e11b8152600481018790526060906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa158015610ebc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ee09190611c12565b15611083576040516307fa648b60e11b8152600481018890526001600160a01b03841690630ff4c91690602401600060405180830381865afa158015610f2a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610f529190810190611a16565b9050600081516001610f649190611c34565b67ffffffffffffffff811115610f7c57610f7c6117bb565b604051908082528060200260200182016040528015610fa5578160200160208202803683370190505b50905060005b8251811015610ffd57828181518110610fc657610fc6611abc565b6020026020010151828281518110610fe057610fe0611abc565b602090810291909101015280610ff581611bb6565b915050610fab565b50868183518151811061101257611012611abc565b6020908102919091010152604051634a3556e360e11b81526001600160a01b0385169063946aadc69061104b908b908590600401611c47565b600060405180830381600087803b15801561106557600080fd5b505af1158015611079573d6000803e3d6000fd5b5050505050611123565b604080516001808252818301909252906020808301908036833701905050905085816000815181106110b7576110b7611abc565b6020908102919091010152604051634a3556e360e11b81526001600160a01b0384169063946aadc6906110f0908a908590600401611c47565b600060405180830381600087803b15801561110a57600080fd5b505af115801561111e573d6000803e3d6000fd5b505050505b505b604051633648f0f160e21b81526004810182905263ffffffff851660248201526001600160a01b0384169063d923c3c490604401600060405180830381600087803b15801561117357600080fd5b505af1158015611187573d6000803e3d6000fd5b50506040516309e4fb4360e31b81527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f151064084560048201526000925061122091506001600160a01b038a1690634f27da1890602401602060405180830381865afa1580156111f6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061121a9190611982565b83611255565b90508463ffffffff168163ffffffff161115611242576112428888888861133c565b5050505050505050565b610b2c81611661565b604051636667bd4760e11b8152600481018290526000906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa15801561129d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112c19190611c12565b6112cc576000611335565b6040516307fa648b60e11b8152600481018390526001600160a01b03841690630ff4c91690602401602060405180830381865afa158015611311573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061133591906119f0565b9392505050565b6040516309e4fb4360e31b81527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f151064084560048201526000906001600160a01b03861690634f27da1890602401602060405180830381865afa1580156113a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113c79190611982565b6040516309e4fb4360e31b81527f8d5746953402e95fa35ce71ddaa7efe7922c48a307985b7d64ea3f27abcb14f960048201529091506000906001600160a01b03871690634f27da1890602401602060405180830381865afa158015611431573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114559190611982565b905060006114638587610c13565b905060006114718483611255565b9050600061147f84896116db565b6040516309e4fb4360e31b81527fd9603ec917f4576302b3c02b1fa235f8e01465fbf139aba994a05da60796f53e6004820152909150600090611517906001600160a01b038c1690634f27da1890602401602060405180830381865afa1580156114ed573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115119190611982565b896116db565b90508263ffffffff168763ffffffff161015611565576115378784611afe565b6115479063ffffffff1682611c95565b9050818111156115545750805b61155e8183611cac565b915061158e565b61156f8388611afe565b61157f9063ffffffff1682611c95565b905061158b8183611c34565b91505b604051631ab06ee560e01b8152600481018a9052602481018390526001600160a01b03861690631ab06ee590604401600060405180830381600087803b1580156115d757600080fd5b505af11580156115eb573d6000803e3d6000fd5b5050604051633648f0f160e21b81526004810187905263ffffffff8a1660248201526001600160a01b038916925063d923c3c49150604401600060405180830381600087803b15801561163d57600080fd5b505af1158015611651573d6000803e3d6000fd5b5050505050505050505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b604051636667bd4760e11b8152600481018290526000906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa158015611723573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117479190611c12565b611752576000611335565b6040516307fa648b60e11b8152600481018390526001600160a01b03841690630ff4c91690602401602060405180830381865afa158015611797573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061133591906119d7565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156117fa576117fa6117bb565b604052919050565b600067ffffffffffffffff82111561181c5761181c6117bb565b50601f01601f191660200190565b60006020828403121561183c57600080fd5b813567ffffffffffffffff81111561185357600080fd5b8201601f8101841361186457600080fd5b803561187761187282611802565b6117d1565b81815285602083850101111561188c57600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b838110156118c55781810151838201526020016118ad565b50506000910152565b60208152600082518060208401526118ed8160408501602087016118aa565b601f01601f19169190910160400192915050565b6001600160a01b0381168114610b2c57600080fd5b60038110610b2c57600080fd5b60008060006060848603121561193857600080fd5b833561194381611901565b925060208401359150604084013561195a81611916565b809150509250925092565b60006020828403121561197757600080fd5b813561133581611901565b60006020828403121561199457600080fd5b815161133581611901565b6000806000606084860312156119b457600080fd5b83516119bf81611901565b60208501516040860151919450925061195a81611916565b6000602082840312156119e957600080fd5b5051919050565b600060208284031215611a0257600080fd5b815163ffffffff8116811461133557600080fd5b60006020808385031215611a2957600080fd5b825167ffffffffffffffff80821115611a4157600080fd5b818501915085601f830112611a5557600080fd5b815181811115611a6757611a676117bb565b8060051b9150611a788483016117d1565b8181529183018401918481019088841115611a9257600080fd5b938501935b83851015611ab057845182529385019390850190611a97565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052601160045260246000fd5b63ffffffff828116828216039080821115611b1b57611b1b611ae8565b5092915050565b600060208284031215611b3457600080fd5b815167ffffffffffffffff811115611b4b57600080fd5b8201601f81018413611b5c57600080fd5b8051611b6a61187282611802565b818152856020838501011115611b7f57600080fd5b611b908260208301602086016118aa565b95945050505050565b63ffffffff818116838216019080821115611b1b57611b1b611ae8565b600060018201611bc857611bc8611ae8565b5060010190565b6001600160a01b0384168152602081018390526060810160038310611c0457634e487b7160e01b600052602160045260246000fd5b826040830152949350505050565b600060208284031215611c2457600080fd5b8151801515811461133557600080fd5b80820180821115610c0d57610c0d611ae8565b6000604082018483526020604081850152818551808452606086019150828701935060005b81811015611c8857845183529383019391830191600101611c6c565b5090979650505050505050565b8082028115828204841417610c0d57610c0d611ae8565b81810381811115610c0d57610c0d611ae856fea2646970667358221220b4db66f76cc3859b29c9f3bf5f03d685594080ab644476a983a857de1ececfe464736f6c63430008130033";

type S_UpdatePlayerStorageSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: S_UpdatePlayerStorageSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class S_UpdatePlayerStorageSystem__factory extends ContractFactory {
  constructor(...args: S_UpdatePlayerStorageSystemConstructorParams) {
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
  ): Promise<S_UpdatePlayerStorageSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<S_UpdatePlayerStorageSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): S_UpdatePlayerStorageSystem {
    return super.attach(address) as S_UpdatePlayerStorageSystem;
  }
  override connect(signer: Signer): S_UpdatePlayerStorageSystem__factory {
    return super.connect(signer) as S_UpdatePlayerStorageSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): S_UpdatePlayerStorageSystemInterface {
    return new utils.Interface(_abi) as S_UpdatePlayerStorageSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): S_UpdatePlayerStorageSystem {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as S_UpdatePlayerStorageSystem;
  }
}
