import { SubstrateEvent } from "@subql/types";
import { Vacancy, VacancyType } from "../types";

export async function handleCreateVacancy(
  event: SubstrateEvent
): Promise<void> {
  const [
    vacancyName,
    price,
    category,
    subcategory,
    location,
    date,
    vacancyType,
    url,
    // Assuming additional fields like applicantsNumber and creator_wallet are available in the event
    applicantsNumber,
    creator_wallet,
  ] = event.event.data;

  const id = `${event.block.block.header.number.toString()}-${event.idx.toString()}`;

  // Convert necessary fields to match the expected types of the Vacancy constructor
  const vacancy = new Vacancy(
    id,
    BigInt(date.toString()), // Assuming date is a timestamp that fits BigInt representation
    BigInt(price.toString()), // Converting to BigInt
    vacancyName.toString(),
    Number(category.toString()), // Converting to Number
    Number(subcategory.toString()),
    location.toString(),
    Number(applicantsNumber.toString()), // Assuming this conversion is needed
    creator_wallet.toString(), // Assuming the creator_wallet is directly usable as a string
    url.toString(),
    vacancyType as unknown as VacancyType // Casting to VacancyType enum, assuming it's a valid enum value
  );

  await vacancy.save();
}
