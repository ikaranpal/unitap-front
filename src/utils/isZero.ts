/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export default function isZero(hexNumberString: string | bigint) {
	return /^0x0*$/.test(hexNumberString.toString()) || hexNumberString === BigInt(0);
}
