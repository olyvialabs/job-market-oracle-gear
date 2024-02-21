#![no_std]

use io::*;
use gstd::{collections::HashMap, exec, msg, prelude::*, ActorId, String};


#[derive(Debug, Default)]
struct JobMarket {
    new_vacancy_id: u128,
    vacancies: HashMap<u128, Vacancy>,
}

impl From<JobMarket> for JobMarketState {
    fn from(value: JobMarket) -> Self {
        let JobMarket {
            new_vacancy_id,
            vacancies
        } = value;

        let vacancies = vacancies.into_iter().collect();

        Self {
            new_vacancy_id,
            vacancies
        }
    }
}
static mut JOB_MARKET: Option<JobMarket> = None;

impl JobMarket {
    async fn create_vacancy(
        &mut self,
        vacancyName: String,
        price: u128,
        category: u32,
        subcategory: u32,
        location: String,
        date: u64, 
        vacancy_type: VacancyType,
        url: String,
        description: String
    ) {

        let vacancy = Vacancy {
            id: self.new_vacancy_id,
            date, 
            price,
            vacancyName,
            category,
            subcategory,
            location,
            url,
            description,
            vacancy_type,
            ..Default::default()
        };

        self.vacancies.insert(self.new_vacancy_id, vacancy);

        msg::reply(
            JobMarketEvent::CreateVacancy {
                vacancy_id: self.new_vacancy_id,
            },
            0,
        )
        .unwrap();
        self.new_vacancy_id = self.new_vacancy_id.saturating_add(1);
    }

    async fn like_vacancy(&mut self, vacancy_id: u128) {
        let user = msg::source();
        let date = exec::block_timestamp();

        if let Some(vacancy) = self.vacancies.get_mut(&vacancy_id) {
            vacancy.likes.push(Like { user, date });
        }
    }

    async fn comment_on_vacancy(&mut self, vacancy_id: u128, comment_text: String) {
        let user = msg::source();
        let date = exec::block_timestamp();

        if let Some(vacancy) = self.vacancies.get_mut(&vacancy_id) {
            let comment = Comment {
                user,
                comment: comment_text,
                date,
            };
            vacancy.comments.push(comment);
        }
    }
}

#[no_mangle]
extern fn init() {
    let jobMarket = JobMarket::default();
    unsafe { JOB_MARKET = Some(jobMarket) };
}

#[gstd::async_main]
async fn main() {
    let action: JobMarketAction = msg::load().expect("Could not load JobMarketAction");
    let job_market: &mut JobMarket = unsafe { JOB_MARKET.get_or_insert(JobMarket::default()) };
    match action {
        JobMarketAction::CreateVacancy {
            vacancyName,
            price,
            category,
            subcategory,
            location,
            date,
            vacancy_type,
            url,
            description
        } => {
            job_market.create_vacancy(vacancyName, price, category, subcategory, location, date, vacancy_type, url, description).await;
        },
        JobMarketAction::LikeVacancy { vacancy_id } => {
            job_market.like_vacancy(vacancy_id).await;
        },
        JobMarketAction::CommentOnVacancy { vacancy_id, comment } => {
            job_market.comment_on_vacancy(vacancy_id, comment).await;
        },
    }
}

#[no_mangle]
extern fn state() {
    let jobMarket = unsafe { JOB_MARKET.take().expect("Unexpected error in taking state") };
    msg::reply::<JobMarketState>(jobMarket.into(), 0)
        .expect("Failed to encode or reply with `JobMarketState` from `state()`");
}