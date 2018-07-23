import com.nhaarman.mockito_kotlin.mock
import com.nhaarman.mockito_kotlin.verify
import com.nhaarman.mockito_kotlin.whenever
import org.jetbrains.spek.api.Spek
import org.jetbrains.spek.api.dsl.describe
import org.jetbrains.spek.api.dsl.it
import java.time.LocalDate

object AcceptanceTest : Spek({

    describe("Account Service") {

        it("should print statement containing all transactions") {
            val console: Console = mock()
            val calendar: Calendar = mock()
            whenever(calendar.currentDate()).thenReturn(
                    LocalDate.of(2014, 4, 1),
                    LocalDate.of(2014, 4, 2),
                    LocalDate.of(2014, 4, 10))
            val account = AccountService(console, calendar)

            account.deposit(1000)
            account.withdraw(100)
            account.deposit(500)
            account.printStatement()

            verify(console).printLine("DATE | AMOUNT | BALANCE")
            verify(console).printLine("10/04/2014 | 500 | 1400")
            verify(console).printLine("02/04/2014 | -100 | 900")
            verify(console).printLine("01/04/2014 | 1000 | 1000")
        }

    }

})