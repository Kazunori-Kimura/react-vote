import { padLeft, formatLocalDatetime, clone } from '..';

interface IHoge {
    hoge: string;
    fuga: number;
}
interface ITest {
    foo: string;
    bar: number;
    hoges: IHoge[];
}

describe('utility methods', () => {
    it('padLeft(number)', () => {
        const result = padLeft(1);
        expect(result).toBe('01');
    });

    it('padLeft(number, "0", 3)', () => {
        const result = padLeft(2, '0', 3);
        expect(result).toBe('002');
    });

    it('padLeft(string)', () => {
        const result = padLeft('A');
        expect(result).toBe('0A');
    });

    it('padLeft(string, " ", 4)', () => {
        const result = padLeft('B', ' ', 4);
        expect(result).toBe('   B');
    });

    it('formatLocalDatetime', () => {
        // yyyy-mm-ddTHH:mm
        const result = formatLocalDatetime(new Date());
        expect(result.length).toBe(16);
    });

    it('clone<T>', () => {
        const data: ITest = {
            foo: 'foo1',
            bar: 1,
            hoges: [
                {
                    hoge: 'hoge',
                    fuga: 22,
                },
                {
                    hoge: 'hogehoge',
                    fuga: 23,
                },
            ],
        };

        const result = clone(data);
        expect(data).toEqual(result);
        expect(data).not.toBe(result);
    });
});
