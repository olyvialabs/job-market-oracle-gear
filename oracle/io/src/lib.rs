#![no_std]

use gmeta::{In, InOut, Metadata, Out};
use gstd::{prelude::*, ActorId, Decode, Encode, TypeInfo};

#[derive(Debug, Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum JobMarketAction {
    CreateVacancy {
        vacancyName: String,
        price: u128,
        category: u32,
        subcategory: u32,
        location: String,
        date: u64,
        vacancy_type: VacancyType,
        url: String,
        description: String
    },
    LikeVacancy { vacancy_id: u128 },
    CommentOnVacancy { vacancy_id: u128, comment: String },
}


#[derive(Debug, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum JobMarketEvent {
    CreateVacancy {
        vacancy_id: u128
    },
}

#[derive(Debug, Clone, Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct Like {
    pub user: ActorId,
    pub date: u64,
}

#[derive(Debug, Clone, Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct Comment {
    pub user: ActorId,
    pub comment: String,
    pub date: u64,
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
    pub vacancy_type: VacancyType,
    pub description: String,
    pub likes: Vec<Like>,
    pub comments: Vec<Comment>, 
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

impl Default for VacancyType {
    fn default() -> Self {
        VacancyType::Freelance
    }
}



#[derive(Debug, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct JobMarketState {
    pub vacancies: Vec<(u128, Vacancy)>,
    pub new_vacancy_id: u128
}


pub struct ContractMetadata;

impl Metadata for ContractMetadata {
    type Init = ();
    type Handle = InOut<JobMarketAction, JobMarketEvent>;
    type Reply = ();
    type Others = ();
    type Signal = ();
    type State = Out<JobMarketState>;
}