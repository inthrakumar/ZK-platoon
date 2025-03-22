export function uint8ArrayToHex(buffer: Uint8Array): string {
    const hex: string[] = [];
  
    buffer.forEach(function (i) {
      let h = i.toString(16);
      if (h.length % 2) {
        h = "0" + h;
      }
      hex.push(h);
    });
  
    return "0x" + hex.join("");
  }

  export async function generateInputs(vehicles: string[], Vehicle_Response: string[][], vehicle_name: string) {
    const validatedVehicleResponse = Vehicle_Response.map(res => 
      [String(res[0]), String(res[1])]
    );
  
    return {
      vehicles,
      vehicle_response: validatedVehicleResponse,
      vehicle_name,
    };
  }