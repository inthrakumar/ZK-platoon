rm -rf target

echo "Compiling contract: "
nargo execute

echo "Compiling circuit..."
if ! nargo compile; then
    echo "Compilation failed. Exiting..."
    exit 1
fi

echo "Gate count: "
bb gates -b target/zk_platoon.json | jq  '.functions[0].circuit_size'


mkdir -p "../simulator/assets/zk_platoon"

echo "Copying circuit.json to simulator/assets/zk_platoon..."
cp target/zk_platoon.json "../simulator/assets/zk_platoon/circuit.json"


echo "Generating Key: "
bb write_vk_ultra_keccak_honk -b ./target/zk_platoon.json

echo "Generating Contract: "
bb contract_ultra_honk

echo "copying to contracts/src/"
cp target/contract.sol "../contracts/src/"



echo "Generating vkey.json to simulator/assets/zk_platoon..."
node -e "const fs = require('fs'); fs.writeFileSync('../simulator/assets/zk_platoon/circuit-vkey.json', JSON.stringify(Array.from(Uint8Array.from(fs.readFileSync('./target/vk')))));"


echo "Done!"