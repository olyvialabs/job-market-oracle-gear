const varaAddress = "wss://testnet.vara.network";
const ADDRESS = {
  NODE: varaAddress, //process.env.REACT_APP_NODE_ADDRESS as string,
};

const LOCAL_STORAGE = {
  ACCOUNT: "account",
};

const programIDFT =
  "0x6988226bee3a6a6aadd7eef7fa4215806524decdfe34e484e22d3dbf96c3ceda";

const programMeta =
  "00020000000100000000010600000000000000000107000000811048000808696f3c4a6f624d61726b6574416374696f6e00010c34437265617465566163616e637924012c766163616e63794e616d65040118537472696e6700011470726963650801107531323800012063617465676f72790c010c75333200012c73756263617465676f72790c010c7533320001206c6f636174696f6e040118537472696e670001106461746510010c753634000130766163616e63795f7479706514012c566163616e63795479706500010c75726c040118537472696e6700012c6465736372697074696f6e040118537472696e670000002c4c696b65566163616e6379040128766163616e63795f69640801107531323800010040436f6d6d656e744f6e566163616e6379080128766163616e63795f69640801107531323800011c636f6d6d656e74040118537472696e67000200000400000502000800000507000c0000050500100000050600140808696f2c566163616e63795479706500011024467265656c616e636500000028436f6e74726163746f72000100205061727454696d650002002046756c6c54696d6500030000180808696f384a6f624d61726b65744576656e7400010434437265617465566163616e6379040128766163616e63795f696408011075313238000000001c0808696f384a6f624d61726b657453746174650000080124766163616e636965732001505665633c28753132382c20566163616e6379293e0001386e65775f766163616e63795f69640801107531323800002000000224002400000408082800280808696f1c566163616e637900003801086964080110753132380001106461746510010c75363400011470726963650801107531323800012c766163616e63794e616d65040118537472696e6700012063617465676f72790c010c75333200012c73756263617465676f72790c010c7533320001206c6f636174696f6e040118537472696e670001406170706c6963616e74734e756d6265720c010c75333200013863726561746f725f77616c6c65742c011c4163746f72496400010c75726c040118537472696e67000130766163616e63795f7479706514012c566163616e63795479706500012c6465736372697074696f6e040118537472696e670001146c696b65733801245665633c4c696b653e000120636f6d6d656e74734001305665633c436f6d6d656e743e00002c10106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004003001205b75383b2033325d000030000003200000003400340000050300380000023c003c0808696f104c696b650000080110757365722c011c4163746f7249640001106461746510010c7536340000400000024400440808696f1c436f6d6d656e7400000c0110757365722c011c4163746f72496400011c636f6d6d656e74040118537472696e670001106461746510010c7536340000";

export { ADDRESS, LOCAL_STORAGE, programIDFT, programMeta, varaAddress };
