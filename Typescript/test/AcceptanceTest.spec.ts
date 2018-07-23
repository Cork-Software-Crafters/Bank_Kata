import { expect } from 'chai';
import sinon = require('sinon');
import { AccountService } from '../app/AccountService';
import { Console } from '../app/Console';
import { Calendar } from '../app/Calendar';

describe('Account Service', () => {

    it('should print statement containing all transactions', () => {
        let consoleSpy = new ConsoleSpy()
        let calendarStub = new CalendarStub();
        let account: AccountService = new AccountService(consoleSpy, calendarStub);

        account.deposit(1000);
        account.withdraw(100);
        account.deposit(500);
        account.printStatement();

        expect(consoleSpy.getPrintedLines()).to.deep.equals([
            'DATE | AMOUNT | BALANCE',
            '10/04/2014 | 500 | 1400',
            '02/04/2014 | -100 | 900',
            '01/04/2014 | 1000 | 1000'
        ]);
    });

});

class ConsoleSpy implements Console {
    private printedLines: string[] = [];

    printLine(line: string): void {
        this.printedLines.push(line)
    }

    getPrintedLines(): string[] {
        return this.printedLines;
    }
}

class CalendarStub implements Calendar {
    private stubbedDate: Date = new Date();

    currentDate(): Date {
        return this.stubbedDate;
    }

    protected setSubbedDate(date: Date) {
        this.stubbedDate = date;
    }
}
