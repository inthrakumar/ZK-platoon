fn main(vehicles: [u8; 8], Vehicle_Response: [(u8, u8, u8); 6], start_vehicle: u8) ->pub [u8; 8] {
    let mut visited: [bool; 8] = [false; 8]; // Visited array for each vehicle
    let mut result: [u8; 8] = [0; 8];  // Resulting DFS order
    let mut stack: [u8; 8] = [0; 8];   // Stack for DFS
    let mut stack_ptr = 0;            // Pointer for the stack
    let mut result_ptr = 0;           // Pointer for the result
    
    let mut start_idx = 0;
    for i in 0..8 {
        if vehicles[i] == start_vehicle {
            start_idx = i;
        }
    }
    
    stack[stack_ptr] = start_vehicle;
    stack_ptr += 1;
    
    let mut should_continue = true;
    for _ in 0..16 { 
        if should_continue {

         if stack_ptr > 0 {
            stack_ptr -= 1;
            let current_vehicle = stack[stack_ptr];
            
            let mut current_idx = 0;
            for i in 0..8 {
                if vehicles[i] == current_vehicle {
                    current_idx = i;
                }
            }
            
            if !visited[current_idx] {
                visited[current_idx] = true;
                result[result_ptr] = current_vehicle;
                result_ptr += 1;
                
                for i in 0..6 {
                    if Vehicle_Response[i].0 == current_vehicle {
                        let neighbor1 = Vehicle_Response[i].1;
                        let neighbor2 = Vehicle_Response[i].2;
                        stack[stack_ptr] = neighbor2; 
                        stack_ptr += 1;
                        stack[stack_ptr] = neighbor1;
                        stack_ptr += 1;
                    }
                }
            }
        } else {
            should_continue = false;
        }}
    }
    println(f" Result {result}");
    result
}

#[test]
fn test_main() {
    let vehicles: [u8; 8] = [0, 65, 66, 67, 68, 69, 70, 1]; // ASCII values for "0ABCDEF1"
    
    let Vehicle_Response = [
        (65, 0, 66),  // A(65) says its between 0 and B(66)
        (66, 65, 67), // B(66) says its between A(65) and C(67)
        (67, 66, 70), // C(67) says its between B(66) and F(70)
        (68, 67, 69), // D(68) says its between C(67) and E(69)
        (69, 68, 70), // E(69) says its between D(68) and F(70)
        (70, 69, 1),  // F(70) says its between E(69) and 1
    ];
    
    let vehicle_name = 70;  
    
    let result = main(vehicles, Vehicle_Response, vehicle_name);
    
    assert(result[0] == 70); // First element should be F(70)
}