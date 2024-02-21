# Quickjobs/TrabajoRapido Job Market Vara Implementation

This repository is designed to offer a light seamless experience for both employers and job seekers, utilizing cutting-edge technology to facilitate a wide range of functionalities. By integrating the Vara smart contracts, our platform ensures transparency, efficiency, and security in job market operations.

## Key Features and Functionalities

This repository is equipped with a comprehensive set of features that cater to the needs of the modern job market:

- Vacancy Creation: Employers can easily create job vacancies, specifying requirements, responsibilities, and salary ranges.
- Vacancy Application: Job seekers can apply to vacancies with a simple click, submitting their qualifications and resumes.
- Vacancy Likes: Users can like vacancies, helping employers gauge the popularity and demand for specific positions.
- Likes Viewing: Both job seekers and employers can view the total likes for vacancies, enabling a better understanding of market trends.
- Vacancy Comments: Users can comment on vacancies, facilitating an open dialogue between employers and potential candidates.
- Comments Viewing: The platform allows for the viewing of comments, enriching the job search experience with community insights.
- Comprehensive Vacancy Listing: All vacancies are listed in an accessible format, making it easy for users to browse and find relevant opportunities.
- Salary Range Graphs: A unique feature where users can view graphical representations of salary ranges for various positions, aiding in transparent and informed decision-making.
- Full Integration with Vara: Our platform's backbone is the Vara smart contract integration, ensuring a decentralized, secure, and efficient job market ecosystem.

## Platform Architecture

To accommodate these features, this repository is structured into three main components:

- frontend: Developed using React with Chakra UI, the frontend serves as the face of our platform. It encompasses all the logic required to interact with the Vara smart contracts, including the insertion of vacancies, displaying salary ranges, applying for positions, and viewing comprehensive information about vacancies. The user-friendly interface ensures a smooth experience for all users.

- oracle: This Rust project is the core of our platform, containing the logic for implementing the Vara contract to store and manage job market information. It acts as a bridge between the blockchain and our application, facilitating secure and reliable data handling.

- oracle-indexer: Implemented as a Node project, the oracle-indexer connects to Subquery to index information regarding vacancies. This process makes it easier to interact with the platform as an API, enhancing performance and accessibility. By efficiently organizing data, the indexer ensures that users can quickly and easily access the information they need.

## Getting started

To get started, clone this repository, and on each repo it will have instructions to run each subproject.

## Support

If you encounter any issues or have questions about the frontend application, please refer to the project's documentation or contact the development team for assistance.
