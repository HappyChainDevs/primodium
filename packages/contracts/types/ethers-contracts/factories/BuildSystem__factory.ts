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
  "0x60806040523480156200001157600080fd5b50604051620039d1380380620039d183398101604081905262000034916200022c565b818162000041336200010f565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200026b565b600080546001600160a01b03199081166001600160a01b0393841690811790925560018054909116928516928317905562000105919062000183602090811b6200233217901c565b5050505062000292565b600062000126620001ef60201b620023c31760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8780546001600160a01b039384166001600160a01b0319918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b03811681146200022957600080fd5b50565b600080604083850312156200024057600080fd5b82516200024d8162000213565b6020840151909250620002608162000213565b809150509250929050565b6000602082840312156200027e57600080fd5b81516200028b8162000213565b9392505050565b61372f80620002a26000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a578063f2f9a0ab146100a7578063f2fde38b146100ba575b600080fd5b61006461005f366004613315565b6100cf565b60405161007191906133c8565b60405180910390f35b61008261223c565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100646100b5366004613443565b612281565b6100cd6100c83660046134c2565b6122b6565b005b6060600080838060200190518101906100e891906134f8565b60008054929450909250906101339073ffffffffffffffffffffffffffffffffffffffff167f49a4584d9706380e35459e1f31e673445371b5bac20aa516f8ba8650b18431066123e7565b600080549192509061017b9073ffffffffffffffffffffffffffffffffffffffff167f30f1c358b0a577824afcc8e464bcbd763eba254820a547b425765e75cc511f1e6123e7565b60008054919250906101c39073ffffffffffffffffffffffffffffffffffffffff167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c75406123e7565b600080549192509061020b9073ffffffffffffffffffffffffffffffffffffffff167f3ee10300fdf6d2b8c2d0e95fa7b5b8c50aa50e011ba55c2da6a5bccfeafb03406123e7565b60008054919250906102539073ffffffffffffffffffffffffffffffffffffffff167f260499b7630a3093f2f4ce16a340a578c70fc65603511dac57ee1b24a87e1ecd6123e7565b600080549192509061029b9073ffffffffffffffffffffffffffffffffffffffff167ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f15106408456123e7565b905060008673ffffffffffffffffffffffffffffffffffffffff1663bf3bf26a896040518263ffffffff1660e01b81526004016102d89190613567565b600060405180830381865afa1580156102f5573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261033b9190810190613588565b905080516000146103d3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603460248201527f5b4275696c6453797374656d5d2043616e6e6f74206275696c64206f6e20612060448201527f6e6f6e2d656d70747920636f6f7264696e61746500000000000000000000000060648201526084015b60405180910390fd5b7fa46f07eacbf4d6e00c069dad9b4c9bc8743bfbbc08b881083f59c909623871dd89148061042057507f15acbad8bb5d229c84e3aaeb8cbd8e364b5d0451254865ef4b5f206d4df1a4c589145b8061044a57507f7c2b38e44a35ee8d16b0c3780dc10b14624e0dfc9c7d997bd7b2017018c0bdfd89145b8061047457507f02fcfa4b1578384291174d276cbf45b9ac04481dd20e0e1051d17c6fa0028ce389145b8061049e57507f9d47592473d41327e0ccb0bb0dc69c74c6ac29b77beb0fc78a1c84d6f0bcf87b89145b15610530576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603960248201527f5b4275696c6453797374656d5d204465627567206275696c64696e677320617260448201527f65206e6f7420616c6c6f77656420746f206265206275696c740000000000000060648201526084016103ca565b611f4c565b7f2e6aeb9730616b6b2a8fcc7abab3fc9310bd984b40af25951e4bdc63a056b92d8901610745576000805461059b9073ffffffffffffffffffffffffffffffffffffffff167fe458f11f65f682a3ca2a47dc42132280325cc5080104dfc7fadff5901e10856e6123e7565b6040517fcccf7a8e00000000000000000000000000000000000000000000000000000000815233600482015290915073ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa158015610608573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061062c919061362e565b156106b9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603d60248201527f5b4275696c6453797374656d5d2043616e6e6f74206275696c64206d6f72652060448201527f7468616e206f6e65206d61696e2062617365207065722077616c6c657400000060648201526084016103ca565b6040517fdcb14c2f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff82169063dcb14c2f9061070d9033908d90600401613650565b600060405180830381600087803b15801561072757600080fd5b505af115801561073b573d6000803e3d6000fd5b5050505050611f4c565b7fae4bf9b0cea56d7abe77e850b446c874cf8b84a081e286bec3a38fca387c1d7f89016107995761052b827f88897217b7ca352fa62012bfb0aa451ebca6a6ff9208f9698f717331232152a7606433612533565b7fa23d1e8ee3ca4469243bbe16572d35969a79c221937efce820859a82b96585ad89016107ed5761052b827f88897217b7ca352fa62012bfb0aa451ebca6a6ff9208f9698f717331232152a7603233612533565b7fa17e13ed5573d44bb6c31de0ca200a9408b9a9d27140ee7a4bd4e8c437f43532890161091b5761083f837f235c0901ecb2d6be3116bd81303b4c1c88c7ea0f2bfbce19266cc8d1854d757f33612684565b6108cb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603460248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f726368656420506c6174696e67466163746f727900000000000000000000000060648201526084016103ca565b61052b827f88897217b7ca352fa62012bfb0aa451ebca6a6ff9208f9698f717331232152a760647f9182d0838cda5b8b8d04b7fdb048ae0d49c90dd4f4ef46ab0958cf6328dfb2ca6032336127c4565b7f686b79f3319ede76c69d24576b62bceeb3460b8f9cea7bad57b6a260be53eb068901610a495761096d837f4f040f57979596afd571cde8f3c29efd19e1326e0844c8426e782921dda5911033612684565b6109f9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603960248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f726368656420426173696342617474657279466163746f72790000000000000060648201526084016103ca565b61052b827f7deaae6bb7615fd1b4e86953f0141ba774ea3adbdd6e2ee244147bfb86aaace560147f9182d0838cda5b8b8d04b7fdb048ae0d49c90dd4f4ef46ab0958cf6328dfb2ca6032336127c4565b7f35da92fd100f97347b744295369046a467523ac692d291a0738a1ca30d5ee2c68901610b9a57610a9b837fea204a6ce29dba9c40f28e8975853a12b8cb6347ab8709032307f46064f0112c33612684565b610b27576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603b60248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f7263686564204b696e657469634d697373696c65466163746f7279000000000060648201526084016103ca565b61052b827f7deaae6bb7615fd1b4e86953f0141ba774ea3adbdd6e2ee244147bfb86aaace560647f17025afdea42119548a0a5f9ec0cdbdcb19e7a9f4b475913071021a3cdbb5bfd60327fbbf0e151801f18e0d112665520a2c0dc8c9590ce85e2851f7f78de30c4c6d51a600a336129c9565b7f3a4d8dc360a14145b642fb77fb0948bd80c2e2eb01d22218657c974b98c639648901610cc757610bec837fffd1fcb03374404e7de4d818d237d911fe2e1d80cf3879d71f2626b819d4b87533612684565b610c78576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f72636865642050726f6a656374696c654c61756e63686572000000000000000060648201526084016103ca565b61052b827f7deaae6bb7615fd1b4e86953f0141ba774ea3adbdd6e2ee244147bfb86aaace560647f416cd867e38826680c4261f20f5285dd44a10270a8118bdeec1383c9a089cf0481336127c4565b7f7c03320da83e439de71c1696b404fbacc53d2d8a0a4734b9db88590fd25651258901610e1857610d19837fb95924e6875f04c5a3a4f2d0229e2b96e1ed5a8d3e46cf904aef2780d874cb8a33612684565b610da5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603360248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f72636865642048617264656e65644472696c6c0000000000000000000000000060648201526084016103ca565b61052b827f416cd867e38826680c4261f20f5285dd44a10270a8118bdeec1383c9a089cf0460647f7deaae6bb7615fd1b4e86953f0141ba774ea3adbdd6e2ee244147bfb86aaace5600a7fbbf0e151801f18e0d112665520a2c0dc8c9590ce85e2851f7f78de30c4c6d51a6005336129c9565b7f32b37c391b455299fd771766ecb47b741bc2daf141a9c5ca58bbf01906bdf25f8901610f8c57610e6a837ffc26536609d31ba7df64ebe6672ae6bfb37e36e18e66208d8a58b89a70b633c833612684565b610ef6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f72636865642044656e73654d6574616c526566696e657279000000000000000060648201526084016103ca565b61052b827f6c4cf968092a55522769ad001f5a4d068bbdc6ea30a7d8f460833f83e9c9727c60327f416cd867e38826680c4261f20f5285dd44a10270a8118bdeec1383c9a089cf0460647f7deaae6bb7615fd1b4e86953f0141ba774ea3adbdd6e2ee244147bfb86aaace5601e7fbbf0e151801f18e0d112665520a2c0dc8c9590ce85e2851f7f78de30c4c6d51a600a33612c8c565b7f40e911ba600baf1e6d790e75adab097699d145aed1eef91057c1577929177de489016110dd57610fde837fd1c83bdf63c0b447986d120a774ab7ac5386de233bb9e439ba87c015cdd62b0033612684565b61106a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603c60248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f726368656420416476616e63656442617474657279466163746f72790000000060648201526084016103ca565b61052b827f6c4cf968092a55522769ad001f5a4d068bbdc6ea30a7d8f460833f83e9c9727c60967f416cd867e38826680c4261f20f5285dd44a10270a8118bdeec1383c9a089cf0460327fbbf0e151801f18e0d112665520a2c0dc8c9590ce85e2851f7f78de30c4c6d51a6014336129c9565b7fbdafcbe24f4e703f51ff58c70e95148801afa615e1bf67487b7747f82bf72a92890161122d5761112f837fd54023cead523bcfdb7c93c7143ba493534ec0f442756a4d1e6089ce015fc65933612684565b6111bb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603560248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f7263686564204869676854656d70466f756e647279000000000000000000000060648201526084016103ca565b61052b827ff22d62753c9bef149557affda667bdaa3aff1e69179b0c09e101bfc462bf4fae60327f5affe8a57277a7102b0bbaade99cebaf060fa104c6f9b2ef54bc3d0b5009e463817f19ddbba09381803c7aefa2731f58c344a8370583a0b53b4213e30ce69a4c85c06014336129c9565b7fec5b7e9ce45edb6538af2d52ef70875736a939902e29d32d3f4bb95c379a44d5890161137d5761127f837f87292eb387cbbcd9a9067691107c920d7d17fd8dfe1437fa5e832d66aedbacf633612684565b61130b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603f60248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f726368656420507265636973696f6e4d616368696e657279466163746f72790060648201526084016103ca565b61052b827fb533b87fd579e6a4bd7adf53c6573acece50e469a2a3480b5694a32c710af29160327f86e73de3ac620e292e280fd2df5d7acbc4c214f5d881d6a384e0de3ad7d91cd5817f19ddbba09381803c7aefa2731f58c344a8370583a0b53b4213e30ce69a4c85c0600a336129c9565b7fcd1907853155b3d2ce6ea6ada1b053832e83c1b31121e98a66cfc42e2a088d6289016114ab576113cf837ff13245ed83494d4c6fe95d3843c0970f02232874bb3f7cff30407434d0401eb133612684565b61145b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603c60248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f7263686564204972696469756d4472696c6c626974466163746f72790000000060648201526084016103ca565b61052b827f86e73de3ac620e292e280fd2df5d7acbc4c214f5d881d6a384e0de3ad7d91cd560327fcb4b1a16e996a77db534cc9953e3a609aaf28bd5d6665555df84fa08ffc034656005336127c4565b7fe9e48dffd496547e5dae41d617fc9075a75598b7ac63e38f961378ad710bedd989016115fb576114fd837fc4dbe14fc0f902efdf42c54f2c8cf5cd4d716e2a5eb275acc5beff21e1f5f1a933612684565b611589576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603d60248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f726368656420507265636973696f6e506e65756d617469634472696c6c00000060648201526084016103ca565b61052b827ff22d62753c9bef149557affda667bdaa3aff1e69179b0c09e101bfc462bf4fae60647f6c4cf968092a55522769ad001f5a4d068bbdc6ea30a7d8f460833f83e9c9727c817fcb4b1a16e996a77db534cc9953e3a609aaf28bd5d6665555df84fa08ffc034656005336129c9565b7f2759bc05ce7247533776bf1465353daa5c1b0ab7168a7f1480d2221f4a349eea890161174c5761164d837fa9cb069084fa4d92fd4210cdfeb9cdfc2024d4b88cc9ca025fee1218a909fd9633612684565b6116d9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603760248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f72636865642050656e65747261746f72466163746f727900000000000000000060648201526084016103ca565b61052b827f6c4cf968092a55522769ad001f5a4d068bbdc6ea30a7d8f460833f83e9c9727c60c87f7deaae6bb7615fd1b4e86953f0141ba774ea3adbdd6e2ee244147bfb86aaace560327f19ddbba09381803c7aefa2731f58c344a8370583a0b53b4213e30ce69a4c85c0600a336129c9565b7f0639fa347eb62f5175a2632f66ba513e772d5eac88988a8d4ade404f41a37f13890161189e5761179e837fe157609bd85da8e39a6f459aa0211b3efc77ae500757df7a10f6366fe0b7a65f33612684565b61182a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603f60248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f72636865642050656e6574726174696e674d697373696c65466163746f72790060648201526084016103ca565b61052b827f6c4cf968092a55522769ad001f5a4d068bbdc6ea30a7d8f460833f83e9c9727c61012c7f416cd867e38826680c4261f20f5285dd44a10270a8118bdeec1383c9a089cf0460647f19ddbba09381803c7aefa2731f58c344a8370583a0b53b4213e30ce69a4c85c0600f336129c9565b7fda9365807ba5c5ee234ae3ea6277aa8ffa5ffa598631932ef5a7c4fd7162c97589016119cb576118f0837f896a57760f9c98d29b2620819cea7ed21e44fbb91677668899fb4930870380fb33612684565b61197c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603a60248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f7263686564204d697373696c654c61756e6368436f6d706c657800000000000060648201526084016103ca565b61052b827f86e73de3ac620e292e280fd2df5d7acbc4c214f5d881d6a384e0de3ad7d91cd560647f6c4cf968092a55522769ad001f5a4d068bbdc6ea30a7d8f460833f83e9c9727c81336127c4565b7f304a91d15cb7babf8c0392b01bdd5a69c2364e4189380b1b194373021c652d478901611b1b57611a1d837fac9deee200a44d5f4210ac7c1da068ad17b9083e8a7f14172f6a25b4f3460d3133612684565b611aa9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603c60248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f72636865642048696768456e657267794c61736572466163746f72790000000060648201526084016103ca565b61052b827f411675c9d4275dfb3010259013ee279130ee32a3a7d9b6372c9b3a0cf2fe007c60327f5affe8a57277a7102b0bbaade99cebaf060fa104c6f9b2ef54bc3d0b5009e46360647f19ddbba09381803c7aefa2731f58c344a8370583a0b53b4213e30ce69a4c85c083336129c9565b7f3d6eee3e4fc13c94812898bd3b641c1ba38b8d0a323bfc9147cd9c70c2dc0a538901611c6c57611b6d837f187eed5b6ee1a8a71730c9ced07e70fc9a7b2e61ad2958ab8e225726ae5f5b4933612684565b611bf9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603f60248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f726368656420546865726d6f626172696357617268656164466163746f72790060648201526084016103ca565b61052b827f5affe8a57277a7102b0bbaade99cebaf060fa104c6f9b2ef54bc3d0b5009e46360c87f411675c9d4275dfb3010259013ee279130ee32a3a7d9b6372c9b3a0cf2fe007c60647fcb4b1a16e996a77db534cc9953e3a609aaf28bd5d6665555df84fa08ffc03465600a336129c9565b7fd767df16a593c30c6a66a29d7c70f4445ea59138ad58916c34684867859396cb8901611dbc57611cbe837f6af32c86ed1659c55ab853a935afe62bba1e42db9f98b210a164802c3e56824e33612684565b611d4a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603f60248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f726368656420546865726d6f62617269634d697373696c65466163746f72790060648201526084016103ca565b61052b827f411675c9d4275dfb3010259013ee279130ee32a3a7d9b6372c9b3a0cf2fe007c60647f86e73de3ac620e292e280fd2df5d7acbc4c214f5d881d6a384e0de3ad7d91cd5817fcb4b1a16e996a77db534cc9953e3a609aaf28bd5d6665555df84fa08ffc034656014336129c9565b7f7cab7eb400c7f57eb5563db5578f15875cf780008cb8b9a1e3f303db315efecd8901611eea57611e0e837f93db5cedec79d00f6b02e8013d875b5a214b76ef307fb53397239429d6c54cee33612684565b611e9a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603f60248201527f5b4275696c6453797374656d5d20596f752068617665206e6f7420726573656160448201527f7263686564204b696d6265726c697465436174616c797374466163746f72790060648201526084016103ca565b61052b827f411675c9d4275dfb3010259013ee279130ee32a3a7d9b6372c9b3a0cf2fe007c60c87fcb4b1a16e996a77db534cc9953e3a609aaf28bd5d6665555df84fa08ffc034656014336127c4565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f5b4275696c6453797374656d5d20496e76616c696420626c6f636b207479706560448201526064016103ca565b600154604080517f614bfa6e000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff169163614bfa6e9160048083019260209291908290030181865afa158015611fbc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611fe09190613677565b6040517fdcb14c2f00000000000000000000000000000000000000000000000000000000815290915073ffffffffffffffffffffffffffffffffffffffff80831691908a169063dcb14c2f9061203c9084908e90600401613650565b600060405180830381600087803b15801561205657600080fd5b505af115801561206a573d6000803e3d6000fd5b50506040517f1ab06ee500000000000000000000000000000000000000000000000000000000815260048101849052602481018e905273ffffffffffffffffffffffffffffffffffffffff8b169250631ab06ee59150604401600060405180830381600087803b1580156120dd57600080fd5b505af11580156120f1573d6000803e3d6000fd5b50505073ffffffffffffffffffffffffffffffffffffffff88169050631ab06ee582336040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561216a57600080fd5b505af115801561217e573d6000803e3d6000fd5b50506040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810184905243602482015273ffffffffffffffffffffffffffffffffffffffff89169250631ab06ee59150604401600060405180830381600087803b1580156121f057600080fd5b505af1158015612204573d6000803e3d6000fd5b505050508060405160200161221b91815260200190565b6040516020818303038152906040529b505050505050505050505050919050565b600061227c7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b60606122ad8383604051602001612299929190613650565b6040516020818303038152906040526100cf565b90505b92915050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314612326576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61232f8161300d565b50565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015612457573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261249d9190810190613588565b9050805160000361250a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f74207265676973746572656400000000000000000000000000000060448201526064016103ca565b61252b8160008151811061252057612520613690565b602002602001015190565b949350505050565b600061254d856125488685613016565b613016565b613096565b9050828110156125df576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f5b4275696c6453797374656d5d204e6f7420656e6f756768207265736f75726360448201527f657300000000000000000000000000000000000000000000000000000000000060648201526084016103ca565b73ffffffffffffffffffffffffffffffffffffffff8516631ab06ee56126058685613016565b61260f86856136bf565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561266557600080fd5b505af1158015612679573d6000803e3d6000fd5b505050505050505050565b6000806126918484613016565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff86169063cccf7a8e90602401602060405180830381865afa1580156126ff573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612723919061362e565b80156127b957506040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905273ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa158015612795573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127b9919061362e565b9150505b9392505050565b60006127d4876125488885613016565b905060006127e6886125488786613016565b9050858210806127f557508381105b15612882576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f5b4275696c6453797374656d5d204e6f7420656e6f756768207265736f75726360448201527f657300000000000000000000000000000000000000000000000000000000000060648201526084016103ca565b73ffffffffffffffffffffffffffffffffffffffff8816631ab06ee56128a88986613016565b6128b289866136bf565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561290857600080fd5b505af115801561291c573d6000803e3d6000fd5b505050508773ffffffffffffffffffffffffffffffffffffffff16631ab06ee5612947876125438790565b61295187856136bf565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b1580156129a757600080fd5b505af11580156129bb573d6000803e3d6000fd5b505050505050505050505050565b60006129d9896125488a85613016565b905060006129eb8a6125488986613016565b905060006129fd8b6125488887613016565b905088831080612a0c57508682105b80612a1657508481105b15612aa3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f5b4275696c6453797374656d5d204e6f7420656e6f756768207265736f75726360448201527f657300000000000000000000000000000000000000000000000000000000000060648201526084016103ca565b73ffffffffffffffffffffffffffffffffffffffff8b16631ab06ee5612ac98c87613016565b612ad38c876136bf565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015612b2957600080fd5b505af1158015612b3d573d6000803e3d6000fd5b505050508a73ffffffffffffffffffffffffffffffffffffffff16631ab06ee5612b688a6125438890565b612b728a866136bf565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015612bc857600080fd5b505af1158015612bdc573d6000803e3d6000fd5b505050508a73ffffffffffffffffffffffffffffffffffffffff16631ab06ee5612c07886125438890565b612c1188856136bf565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015612c6757600080fd5b505af1158015612c7b573d6000803e3d6000fd5b505050505050505050505050505050565b6000612c9c8b6125488c85613016565b90506000612cae8c6125488b86613016565b90506000612cc08d6125488a87613016565b90506000612cd28e6125488988613016565b90508b841080612ce157508983105b80612ceb57508782105b80612cf557508581105b15612d82576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f5b4275696c6453797374656d5d204e6f7420656e6f756768207265736f75726360448201527f657300000000000000000000000000000000000000000000000000000000000060648201526084016103ca565b73ffffffffffffffffffffffffffffffffffffffff8e16631ab06ee5612da88f88613016565b612db28f886136bf565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015612e0857600080fd5b505af1158015612e1c573d6000803e3d6000fd5b505050508d73ffffffffffffffffffffffffffffffffffffffff16631ab06ee5612e478d6125438990565b612e518d876136bf565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015612ea757600080fd5b505af1158015612ebb573d6000803e3d6000fd5b505050508d73ffffffffffffffffffffffffffffffffffffffff16631ab06ee5612ee68b6125438990565b612ef08b866136bf565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015612f4657600080fd5b505af1158015612f5a573d6000803e3d6000fd5b505050508d73ffffffffffffffffffffffffffffffffffffffff16631ab06ee5612f85896125438990565b612f8f89856136bf565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015612fe557600080fd5b505af1158015612ff9573d6000803e3d6000fd5b505050505050505050505050505050505050565b61232f816131c2565b6000828260405160200161305992919091825260601b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000016602082015260340190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081840301815291905280516020909101209392505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015613104573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190613128919061362e565b6131335760006122ad565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa15801561319e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122ad9190613677565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156132c0576132c061326e565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561330d5761330d61326e565b604052919050565b6000602080838503121561332857600080fd5b823567ffffffffffffffff8082111561334057600080fd5b818501915085601f83011261335457600080fd5b8135818111156133665761336661326e565b613396847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016132c6565b915080825286848285010111156133ac57600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b818110156133f5578581018301518582016040015282016133d9565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b8060030b811461232f57600080fd5b600080828403606081121561345757600080fd5b8335925060407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08201121561348b57600080fd5b5061349461329d565b60208401356134a281613434565b815260408401356134b281613434565b6020820152919491935090915050565b6000602082840312156134d457600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146127bd57600080fd5b600080828403606081121561350c57600080fd5b8351925060407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08201121561354057600080fd5b5061354961329d565b602084015161355781613434565b815260408401516134b281613434565b604081016122b08284805160030b8252602081015160030b60208301525050565b6000602080838503121561359b57600080fd5b825167ffffffffffffffff808211156135b357600080fd5b818501915085601f8301126135c757600080fd5b8151818111156135d9576135d961326e565b8060051b91506135ea8483016132c6565b818152918301840191848101908884111561360457600080fd5b938501935b8385101561362257845182529385019390850190613609565b98975050505050505050565b60006020828403121561364057600080fd5b815180151581146127bd57600080fd5b828152606081016127bd6020830184805160030b8252602081015160030b60208301525050565b60006020828403121561368957600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b818103818111156122b0577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220070185872edd847cdbcb3337e1cf8e873db204e41f9ae869f3a1a73fb7514b5164736f6c63430008110033";

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
