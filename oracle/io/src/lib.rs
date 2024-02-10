#![no_std]

use gmeta::{In, InOut, Metadata, Out};
use gstd::{prelude::*, ActorId, Decode, Encode, TypeInfo};

#[derive(Debug, Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum JobMarketAction {
    CreateVacancy {
        vacancyName: String,
        price: u128
    },
}


#[derive(Debug, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum JobMarketEvent {
    CreateVacancy {
        vacancy_id: u128
    },
}

#[derive(Debug, Default, Clone, Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct Vacancy {
    pub id: u128,
    pub date: u64,
    pub price: u128,
    pub vacancyName: String,
    pub category: u32,
    pub subcategory: u32,
    pub location: String,
    pub applicantsNumber: u32,
    pub creator_wallet: ActorId,
    pub url: String,
}

#[derive(Debug, Clone, Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum VacancyType {
    Freelance,
    Contractor,
    PartTime,
    FullTime,
}


#[derive(Debug, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct JobMarketState {
    pub vacancies: Vec<(u128, Vacancy)>,
    pub new_vacancy_id: u128
}


impl JobMarketState {}

pub struct ContractMetadata;

impl Metadata for ContractMetadata {
    type Init = ();
    type Handle = InOut<JobMarketAction, JobMarketEvent>;
    type Reply = ();
    type Others = ();
    type Signal = ();
    type State = Out<JobMarketState>;
}