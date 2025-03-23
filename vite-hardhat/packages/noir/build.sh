rm -rf target

echo "Compiling circuit..."
if ! nargo compile; then
    echo "Compilation failed. Exiting..."
    exit 1
fi

echo "Gate count:"
bb gates -b target/noirstarter.json | jq  '.functions[0].circuit_size'

# Create version-specific directory
mkdir -p "../vite/assets/jwt"

echo "Copying circuit.json to vite/assets/jwt..."
cp target/noirstarter.json "../vite/assets/jwt/circuit.json"

echo "Generating vkey..."
bb write_vk_ultra_honk -b ./target/noirstarter.json -o ./target/vk

echo "Generating vkey.json to vite/assets/jwt..."
node -e "const fs = require('fs'); fs.writeFileSync('../vite/assets/jwt/circuit-vkey.json', JSON.stringify(Array.from(Uint8Array.from(fs.readFileSync('./target/vk')))));"

echo "Done"
