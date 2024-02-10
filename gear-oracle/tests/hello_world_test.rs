
use gtest::{Log, Program, System};

#[test]
fn hello_test() {
    let sys = System::new();
    sys.init_logger();
    let program = Program::current(&sys);
    let init = program.send(2, String::from("INIT MESSAGE"));
    assert!(!init.main_failed());

    let res = program.send(2, String::from("Hello"));
    let expected_log = Log::builder()
        .dest(2)
        .payload(String::from("Hello"));
    assert!(res.contains(&expected_log));
}
