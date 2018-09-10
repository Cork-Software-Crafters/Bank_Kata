import { AccountService } from '../app/AccountService';
import { Console } from '../app/Console';
import { Calendar } from '../app/Calendar';
import { instance, mock, verify, when } from 'ts-mockito';

describe('Account Service', () => {

    it('should print statement containing all transactions', () => {
        const consoleSpy: Console = mock(Console);
        const calendarStub: Calendar = mock(Calendar);

        when(calendarStub.currentDate()).thenReturn(
            new Date('01/04/2014'),
            new Date('02/04/2014'),
            new Date('10/04/2014'));

        const account: AccountService = new AccountService(instance(consoleSpy), instance(calendarStub));

        account.deposit(1000);
        account.withdraw(100);
        account.deposit(500);
        account.printStatement();

        verify(consoleSpy.printLine('DATE | AMOUNT | BALANCE')).called();
        verify(consoleSpy.printLine('10/04/2014 | 500 | 1400')).called();
        verify(consoleSpy.printLine('02/04/2014 | -100 | 900')).called();
        verify(consoleSpy.printLine('01/04/2014 | 1000 | 1000')).called();
    });

});
