
#![no_std]

use io::*;
use gstd::{ ActorId, prelude::*};

#[gmeta::metawasm]
pub mod metafns {
    pub type State = JobMarketState;

    pub fn vacancy_info(state: State, vacancy_id: u128) -> Vacancy {
        let (_, vacancy) = state
            .vacancies
            .iter()
            .find(|(id, _)| vacancy_id == *id)
            .expect("Invalid vacancy id");
        vacancy.clone()
    }
}