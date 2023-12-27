export type real = bigint | number | string;

export const factory = (precision: real = 2) => {
	const multiplier = Number(precision) * 100;
	const multiplier_bi = BigInt(multiplier);

	const bi = (arg: real): bigint => {
		return BigInt(Math.round(Number(arg) * multiplier));
	};

	const zero = bi(0);
	const one = bi(1);

	return {
		/** converts arg to large bigint */
		bi,
		/** @returns sum(args), @throws on bad input */
		add(...args: real[]) {
			return (
				Number(
					args.reduce((previous: bigint, current: real) => {
						return previous + bi(current);
					}, zero)
				) / multiplier
			);
		},
		get sum() {
			return this.add;
		},
		/** @returns base - sum(args), @throws on bad input */
		sub(base: real, ...args: real[]) {
			return (
				Number(
					args.reduce((previous: bigint, current: real) => {
						return previous - bi(current);
					}, BigInt(Math.round(Number(base) * multiplier)))
				) / multiplier
			);
		},
		/** @returns prod(args), @throws on bad input */
		mul(...args: real[]) {
			return (
				Number(
					args.reduce((previous: bigint, current: real) => {
						return (previous * bi(current)) / multiplier_bi;
					}, one)
				) / multiplier
			);
		},
		get prod() {
			return this.mul;
		} /** @returns base / prod(args), @throws on bad input */,
		div(base: real, ...args: real[]) {
			return (
				Number(
					args.reduce((previous: bigint, current: real) => {
						return (previous * multiplier_bi) / bi(current);
					}, bi(base))
				) / multiplier
			);
		},
	};
};

const prec2 = factory();

export default prec2;

const { add, bi, div, mul, prod, sub, sum } = prec2;

export { prec2, add, bi, div, mul, prod, sub, sum };
