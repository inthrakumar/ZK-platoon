fn main(vehicles: pub [str<1>; 6], Vehicle_Response: [(str<1>, str<1>); 6], vehicle_name: pub str<1>){
    let mut adj_matrix: [[u8; 6]; 6] = [[0; 6]; 6];

    for i in 0..6 {
        let front = Vehicle_Response[i].0;
        let behind = Vehicle_Response[i].1;

        let vehicle_index = i;
        let front_index = find_index(front, vehicles);
        let behind_index = find_index(behind, vehicles);

        if front_index != -1 {
            adj_matrix[vehicle_index as u32][front_index as u32] = 1;
        }

        if behind_index != -1 {
            adj_matrix[vehicle_index as u32][behind_index as u32] = 1;
        }
    }

    let mut numerical_vehicle_response: [[i32; 2]; 6] = [[0; 2]; 6];
    for i in 0..6 {
        numerical_vehicle_response[i][0] = find_index(Vehicle_Response[i].0, vehicles);
        numerical_vehicle_response[i][1] = find_index(Vehicle_Response[i].1, vehicles);
    }

    let (_, element) = find_max_and_ele(numerical_vehicle_response, adj_matrix);

    let mut isVisited = get_platoon(numerical_vehicle_response, adj_matrix, element);
    assert(isVisited[find_index(vehicle_name, vehicles)] == 1 , "Assertion failed: Vehicle not found in platoon");
}

fn get_platoon(numerical_vehicle_response: [[i32; 2]; 6], adj_matrix: [[u8; 6]; 6], element: i32) -> [u8; 6] {
    let mut isVisited: [u8; 6] = [0; 6];
    let mut curr = element;
    for _ in 0..6 {
        let mut next= -1;
        if curr == -1 {
            
        } else {
            if isVisited[curr] == 1 {

            } else {
                next = numerical_vehicle_response[curr][1];
                if next == -1 {
                    if curr != -1 {
                        isVisited[curr] = 1;
                        curr = next;
                    }
                } else {
                    if adj_matrix[curr][next] == 1 {
                        if adj_matrix[next][curr] == 1 {
                            isVisited[curr] = 1;
                            curr = next;
                        } else {
                            next = -1;
                            isVisited[curr] = 1;
                            curr = next;
                        }
                    }
                }
            }
        }
    }

    isVisited
}

fn find_max_and_ele(numerical_vehicle_response: [[i32; 2]; 6], adj_matrix: [[u8; 6]; 6]) -> (i32, i32) {
    let mut max = 0;
    let mut element = -1;
    for i in 0..6 {
        let mut len = 0;
        let mut isVisited: [u8; 6] = [0; 6];
        let mut curr: i32 = i;

        for _ in 0..6 {
            let mut next= -1;
            if curr == -1 {
                
            } else {
                if isVisited[curr] == 1 {

                } else {
                    next = numerical_vehicle_response[curr][1];
                    if next == -1 {
                        if curr != -1 {
                            len = len + 1;
                            isVisited[curr] = 1;
                            curr = next;
                        }
                    } else {
                        if adj_matrix[curr][next] == 1 {
                            if adj_matrix[next][curr] == 1 {
                                isVisited[curr] = 1;
                                curr = next;
                                len = len + 1;
                            } else {
                                next = -1;
                                isVisited[curr] = 1;
                                curr = next;
                                len = len + 1;
                            }
                        }
                    }
                }
            }
        }
        if max < len {
            max = len;
            element = i;
        }
    }
    (max, element)
}

fn find_index(vehicle: str<1>, vehicles: [str<1>; 6]) -> i32 {
    let mut index: i32 = -1;
    if vehicle == "0" {
        -1
    }
    if vehicle == "1" {
        -1
    }
    for i in 0..6 {
        if vehicles[i] == vehicle {
            index = i as i32;
        }
    }
    index
}

#[test]
fn test_main() {
    let vehicles: [str<1>; 6] = ["A", "B", "C", "D", "E", "F"];

    let Vehicle_Response: [(str<1>, str<1>); 6] = [
        ("0", "B"),
        ("A", "C"),
        ("B", "F"),
        ("C", "E"),
        ("D", "F"),
        ("C", "1"),
    ];

    let vehicle_name: str<1> = "F";

    main(vehicles, Vehicle_Response, vehicle_name);

}

#[test]
fn test_main1() {
    let vehicles: [str<1>; 6] = ["A", "D", "C", "B", "E", "F"];

    let Vehicle_Response: [(str<1>, str<1>); 6] = [
        ("0", "B"),
        ("C", "E"),
        ("B", "F"),
        ("A", "C"),
        ("D", "F"),
        ("C", "1"),
    ];

    let vehicle_name: str<1> = "A";

    main(vehicles, Vehicle_Response, vehicle_name);
}

#[test]
fn test_main2() {
    let vehicles: [str<1>; 6] = ["A", "B", "C", "D", "E", "F"];

    let Vehicle_Response: [(str<1>, str<1>); 6] = [
        ("0", "1"),
        ("0", "C"),
        ("B", "D"),
        ("C", "E"),
        ("D", "F"),
        ("E", "1"),
    ];

    let vehicle_name: str<1> = "D";

    main(vehicles, Vehicle_Response, vehicle_name);
}

#[test(should_fail_with = "Assertion failed: Vehicle not found in platoon")]
fn test_main3() {
    let vehicles: [str<1>; 6] = ["A", "B", "C", "D", "E", "F"];

    let Vehicle_Response: [(str<1>, str<1>); 6] = [
        ("0", "1"),
        ("0", "C"),
        ("B", "D"),
        ("C", "E"),
        ("D", "F"),
        ("E", "1"),
    ];

    let vehicle_name: str<1> = "A";
    main(vehicles, Vehicle_Response, vehicle_name);
}


#[test(should_fail_with = "Assertion failed: Vehicle not found in platoon")]
fn test_main4(){
let vehicles: [str<1>; 6] = ["A", "B", "C", "D", "E", "F"];

    let Vehicle_Response: [(str<1>, str<1>); 6] = [
        ("0", "B"),
        ("A", "C"),
        ("B", "F"),
        ("C", "E"),
        ("D", "F"),
        ("C", "1"),
    ];

    let vehicle_name: str<1> = "D";

    main(vehicles, Vehicle_Response, vehicle_name);

}

#[test(should_fail_with = "Assertion failed: Vehicle not found in platoon")]
fn test_main5(){
let vehicles: [str<1>; 6] = ["A", "B", "C", "D", "E", "F"];

    let Vehicle_Response: [(str<1>, str<1>); 6] = [
        ("0", "B"),
        ("A", "C"),
        ("B", "D"),
        ("C", "E"),
        ("D", "F"),
        ("B", "1"),
    ];

    let vehicle_name: str<1> = "F";

    main(vehicles, Vehicle_Response, vehicle_name);

}

#[test(should_fail_with = "Assertion failed: Vehicle not found in platoon")]
fn test_main6(){
let vehicles: [str<1>; 6] = ["A", "B", "C", "D", "E", "F"];

    let Vehicle_Response: [(str<1>, str<1>); 6] = [
        ("0", "B"),
        ("A", "C"),
        ("B", "D"),
        ("C", "E"),
        ("C", "F"),
        ("E", "1"),
    ];

    let vehicle_name: str<1> = "E";

    main(vehicles, Vehicle_Response, vehicle_name);

}