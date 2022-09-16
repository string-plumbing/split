import {list} from '@iterable-iterator/list';
import _split from './_split.js';

/**
 * Split.
 *
 * @param {string} string
 * @param {string=} sep
 * @param {number=} maxsplit
 * @return {string[]}
 */
const split = (string, sep = undefined, maxsplit = undefined) =>
	list(_split(string, sep, maxsplit));

export default split;
