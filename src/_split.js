import {ValueError} from '@failure-abstraction/error';

export const WHITESPACE = /\s+/;

/**
 * _split.
 *
 * @param {string} string
 * @param {string=} sep
 * @param {number=} maxsplit
 * @return {IterableIterator<string>}
 */
export default function* _split(string, sep = undefined, maxsplit = undefined) {
	if (sep === '') {
		throw new ValueError('empty separator');
	}

	if (maxsplit === undefined) {
		maxsplit = -1;
	}

	if (sep === undefined) {
		let i = 0;

		while (maxsplit--) {
			const match = string.slice(i).match(WHITESPACE);

			if (match === null) {
				break;
			}

			const j = i + match.index;

			if (j > 0) {
				yield string.slice(i, j);
			}

			i = j + match[0].length;
		}

		if (i < string.length) {
			yield string.slice(i);
		}
	} else {
		let i = 0;

		const n = sep.length;

		while (maxsplit--) {
			const j = string.indexOf(sep, i);

			if (j === -1) {
				break;
			}

			yield string.slice(i, j);

			i = j + n;
		}

		yield string.slice(i);
	}
}
