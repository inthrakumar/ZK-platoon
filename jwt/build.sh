# Extract version from Nargo.toml
VERSION=1.0.0
echo "Circuit version: $VERSION"

rm -rf target

echo "Compiling circuit..."
if ! nargo compile; then
    echo "Compilation failed. Exiting..."
    exit 1
fi

echo "Gate count:"
bb gates -b target/lokii_jwt.json | jq  '.functions[0].circuit_size'

# Create version-specific directory
mkdir -p "../simulator/assets/jwt-$VERSION"

echo "Copying circuit.json to simulator/assets/jwt-$VERSION..."
cp target/lokii_jwt.json "../simulator/assets/jwt-$VERSION/circuit.json"

echo "Generating vkey..."
bb write_vk_ultra_honk -b ./target/lokii_jwt.json -o ./target/vk

echo "Generating vkey.json to simulator/assets/$VERSION..."
node -e "const fs = require('fs'); fs.writeFileSync('../simulator/assets/jwt-$VERSION/circuit-vkey.json', JSON.stringify(Array.from(Uint8Array.from(fs.readFileSync('./target/vk')))));"

echo "Done"
