import { PhoneNumberUtil } from "google-libphonenumber";
const phoneUtil = PhoneNumberUtil.getInstance();

export function getParsedInternationalByNumber(rawNumber: string) {
  try {
    const countryCode = phoneUtil.parse(rawNumber, "").getCountryCode() ?? 0;
    const id = phoneUtil.getRegionCodeForCountryCode(countryCode);
    const parsed = phoneUtil.parseAndKeepRawInput(rawNumber, id);
    const isPossibleNumber = phoneUtil.isPossibleNumber(parsed);
    const isValidNumberForRegion = phoneUtil.isValidNumberForRegion(parsed, id);
    return isValidNumberForRegion && isPossibleNumber;
  } catch (e: any) {
    return { error: e.message };
  }
}
