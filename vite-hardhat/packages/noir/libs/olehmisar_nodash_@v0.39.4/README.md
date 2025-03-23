# Nodash - Lodash for Noir

Nodash is a utility library for [Noir](https://github.com/noir-lang/noir) language.

## Installation

Put this into your Nargo.toml.

```toml
nodash = { git = "https://github.com/olehmisar/nodash/", tag = "v0.39.4" }
```

## Docs

### `sqrt`

```rs
use nodash::sqrt;

assert(sqrt(4 as u64) == 2);

// it floors the result
assert(sqrt(8 as u64) == 2);
```

### `clamp`

```rs
use nodash::clamp;

// if too small, return min
assert(clamp(1 as u64, 2 as u64, 3 as u64) == 2 as u64);
// if too big, return max
assert(clamp(4 as u64, 1 as u64, 3 as u64) == 3 as u64);
// if in range, return value
assert(clamp(2 as u64, 1 as u64, 3 as u64) == 2 as u64);
```

### `div_ceil`

Calculates `a / b` rounded up to the nearest integer.

```rs
use nodash::div_ceil;

assert(div_ceil(10 as u64, 3) == 4);
```

### `solidity::encode_with_selector`

Equivalent to `abi.encodeWithSelector` in Solidity.

```rs
use nodash::solidity::encode_with_selector;

let selector: u32 = 0xa9059cbb; // transfer(address,uint256)
let args: [Field; 2] = [
  0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045, // address
  123 // uint256
];
let encoded = encode_with_selector(selector, args);
// typeof encoded: [u8; 68]
```

### `field_to_hex`

Converts a `Field` to a hex string (without `0x` prefix).

```rs
let my_hash = 0x0d67824fead966192029093a3aa5c719f2b80262c4f14a5c97c5d70e4b27f2bf;
let expected = "0d67824fead966192029093a3aa5c719f2b80262c4f14a5c97c5d70e4b27f2bf";
assert_eq(field_to_hex(my_hash), expected);
```

### `str_to_u64`

Converts a string to a `u64`.

```rs
use nodash::str_to_u64;

assert(str_to_u64("02345678912345678912") == 02345678912345678912);
```

### `ord`

Returns the ASCII code of a single character.

```rs
use nodash::ord;

assert(ord("a") == 97);
```

### `ArrayExtensions`

#### `slice<L>(start: u32) -> [T; L]`

Returns a slice of the array, starting at `start` and ending at `start + L`. Panics if `start + L` is out of bounds.

```rs
use nodash::ArrayExtensions;

assert([1, 2, 3, 4, 5].slice::<3>(1) == [2, 3, 4]);
```

#### `concat`

Concatenates two arrays.

```rs
use nodash::ArrayExtensions;

assert([1, 2, 3].concat([4, 5]) == [1, 2, 3, 4, 5]);
```

#### `pad_start`

Pads the start of the array with a value.

```rs
use nodash::ArrayExtensions;

assert([1, 2, 3].pad_start::<5>(0) == [0, 0, 1, 2, 3]);
```

#### `pad_end`

Pads the end of the array with a value.

```rs
use nodash::ArrayExtensions;

assert([1, 2, 3].pad_end::<5>(0) == [1, 2, 3, 0, 0]);
```

#### `enumerate`

Returns an array of tuples, where each tuple contains the index and the value of the array element.

```rs
use nodash::ArrayExtensions;

assert(["a", "b", "c"].enumerate() == [(0, "a"), (1, "b"), (2, "c")]);
```

### `pack_bytes`

Packs `[u8; N]` into `[Field; N / 31 + 1]`. Useful, if you need to get a hash over bytes. I.e., `pedersen_hash(pack_bytes(bytes))` will be MUCH cheaper than `pedersen_hash(bytes)`.

```rs
use nodash::pack_bytes;

let bytes: [u8; 32] = [0; 32];
let packed = pack_bytes(bytes);
```
