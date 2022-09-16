import test from 'ava';

import {split} from '#module';

const macro = test.macro({
	exec(t, s, sep, maxsplit, expected) {
		t.deepEqual(expected, split(s, sep, maxsplit));
	},
	title(title, s, sep, maxsplit, expected) {
		return (
			title ??
			`split(${JSON.stringify(s)}, ${JSON.stringify(sep)}, ${JSON.stringify(
				maxsplit,
			)}) === ${JSON.stringify(expected)}`
		);
	},
});

test(macro, '1 2 3', undefined, undefined, ['1', '2', '3']);
test(macro, '1 2 3 4', undefined, undefined, ['1', '2', '3', '4']);
test(macro, '1 2 3', undefined, 1, ['1', '2 3']);
test(macro, '   1   2   3   ', undefined, undefined, ['1', '2', '3']);
test(macro, '', undefined, undefined, []);
test(macro, '  \t\n  \t', undefined, undefined, []);

test(macro, '1<>2<>3', '<>', undefined, ['1', '2', '3']);
test(macro, '1,,2', ',', undefined, ['1', '', '2']);

test(macro, '1,2,3', ',', undefined, ['1', '2', '3']);
test(macro, '1,2,3', ',', 1, ['1', '2,3']);
test(macro, '1,2,,3,', ',', undefined, ['1', '2', '', '3', '']);
test(macro, '', ',', undefined, ['']);

test(macro, ',1,2,3,', ',', 10, ['', '1', '2', '3', '']);

test('empty sep throws', (t) => {
	t.throws(() => split('123', ''), {message: /empty separator/});
});
